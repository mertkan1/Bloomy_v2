import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { giftData, plan, recipientEmail, deliveryDate } = body

    // Validate required fields
    if (!giftData || !plan || !recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get plan pricing
    const planPricing = {
      '30': { price: 1999, tokens: 100 }, // $19.99 in cents
      '365': { price: 4999, tokens: 1000 } // $49.99 in cents
    }

    const selectedPlan = planPricing[plan as keyof typeof planPricing]
    if (!selectedPlan) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Digital Flower Gift - ${plan} Days`,
              description: `Beautiful digital flower with ${plan} days of AI-generated messages`,
              images: [giftData.flower?.image || 'https://images.unsplash.com/photo-1698849071904-090feee32e73'],
            },
            unit_amount: selectedPlan.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/purchase`,
      metadata: {
        userId: user.id,
        plan,
        recipientEmail,
        deliveryDate: deliveryDate || new Date().toISOString().split('T')[0],
        giftData: JSON.stringify(giftData),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}