import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server-admin'
import { generateGiftCode } from '@/lib/utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session.metadata!

      const supabase = createClient()

      // Generate unique gift code
      const giftCode = generateGiftCode()

      // Create order record
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          id: crypto.randomUUID(),
          user_id: metadata.userId,
          gift_code: giftCode,
          plan: metadata.plan,
          recipient_email: metadata.recipientEmail,
          recipient_name: JSON.parse(metadata.giftData).recipientName,
          sender_name: JSON.parse(metadata.giftData).senderName,
          flower_id: JSON.parse(metadata.giftData).flower.id,
          themes: JSON.parse(metadata.giftData).selectedThemes || [],
          delivery_date: metadata.deliveryDate,
          status: 'active',
          tokens_remaining: metadata.plan === '365' ? 1000 : 100,
          stripe_session_id: session.id,
          amount_paid: session.amount_total,
        })
        .select()
        .single()

      if (orderError) {
        console.error('Order creation error:', orderError)
        return NextResponse.json(
          { error: 'Failed to create order' },
          { status: 500 }
        )
      }

      // Update limited flower stock if applicable
      const flowerData = JSON.parse(metadata.giftData).flower
      if (flowerData.isLimited) {
        await supabase.rpc('decrement_flower_stock', {
          flower_id: flowerData.id
        })
      }

      console.log('Order created successfully:', order.id)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}