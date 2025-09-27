import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, dayIndex, regenerate = false } = body

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get order and check tokens
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Check if user has tokens for regeneration
    if (regenerate && order.tokens_remaining <= 0) {
      return NextResponse.json(
        { error: 'No tokens remaining' },
        { status: 400 }
      )
    }

    // Generate AI message (mock implementation)
    const themes = order.themes || []
    const recipientName = order.recipient_name
    const senderName = order.sender_name

    const messageTemplates = {
      romantik: [
        `My dearest ${recipientName}, with each passing day, my heart grows fonder of you. This flower blooms as my love does - endlessly and beautifully.`,
        `Beloved ${recipientName}, you are the sunshine that makes my world brighter. Every moment with you is a treasure I hold close to my heart.`,
      ],
      motivasyon: [
        `Dear ${recipientName}, remember that every challenge you face is just another opportunity to show your incredible strength. You've got this!`,
        `Champion ${recipientName}, your potential is limitless. Today is another chance to move closer to your dreams.`,
      ],
      espirili: [
        `Hey ${recipientName}! Life's too short for boring flowers, so here's a digital one that won't need watering (you're welcome!)`,
        `${recipientName}, if flowers had personalities, this one would definitely be the class clown. Just like you!`,
      ],
      default: [
        `Dear ${recipientName}, I hope this message finds you well. I wanted to send you a little something to brighten your day.`,
        `Hello beautiful ${recipientName}! Another day, another reason to smile. Remember that you bring so much joy to those around you.`,
      ]
    }

    const selectedTheme = themes.length > 0 ? themes[0] : 'default'
    const templateArray = messageTemplates[selectedTheme as keyof typeof messageTemplates] || messageTemplates.default
    const template = templateArray[dayIndex % templateArray.length]
    const generatedMessage = `${template}\n\nWith love,\n${senderName}`

    // Save message to database
    const { error: messageError } = await supabase
      .from('daily_messages')
      .upsert({
        order_id: orderId,
        day_index: dayIndex,
        content: generatedMessage,
        generated_by: 'ai',
        generated_at: new Date().toISOString(),
      })

    if (messageError) {
      console.error('Message save error:', messageError)
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      )
    }

    // Deduct token if regenerating
    if (regenerate) {
      const { error: tokenError } = await supabase
        .from('orders')
        .update({ 
          tokens_remaining: order.tokens_remaining - 1 
        })
        .eq('id', orderId)

      if (tokenError) {
        console.error('Token deduction error:', tokenError)
      }

      // Log AI event
      await supabase
        .from('ai_events')
        .insert({
          order_id: orderId,
          event_type: 'regenerate',
          day_index: dayIndex,
          tokens_used: 1,
        })
    }

    return NextResponse.json({
      message: generatedMessage,
      tokensRemaining: regenerate ? order.tokens_remaining - 1 : order.tokens_remaining,
    })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate message' },
      { status: 500 }
    )
  }
}