import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getGiftByCode(code: string) {
  const supabase = createClient()
  
  const { data: gift, error } = await supabase
    .from('orders')
    .select(`
      *,
      flowers (*)
    `)
    .eq('gift_code', code)
    .eq('status', 'active')
    .single()

  if (error) {
    console.error('Gift fetch error:', error)
    return null
  }

  return gift
}

export async function getDailyMessage(orderId: string, dayIndex: number) {
  const supabase = createClient()
  
  const { data: message, error } = await supabase
    .from('daily_messages')
    .select('*')
    .eq('order_id', orderId)
    .eq('day_index', dayIndex)
    .single()

  if (error) {
    console.error('Message fetch error:', error)
    return null
  }

  return message
}

export async function getUserGifts(userId: string) {
  const supabase = createClient()
  
  const { data: gifts, error } = await supabase
    .from('orders')
    .select(`
      *,
      flowers (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('User gifts fetch error:', error)
    return []
  }

  return gifts
}

export async function updateMessage(orderId: string, dayIndex: number, content: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('daily_messages')
    .upsert({
      order_id: orderId,
      day_index: dayIndex,
      content,
      generated_by: 'manual',
      updated_at: new Date().toISOString(),
    })

  if (error) {
    console.error('Message update error:', error)
    throw new Error('Failed to update message')
  }

  revalidatePath('/my-flowers')
}