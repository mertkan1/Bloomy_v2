import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GiftViewContent } from '@/components/gift-view/gift-view-content'
import { getGiftByCode } from '@/lib/actions/gifts'

interface GiftPageProps {
  params: {
    code: string
  }
}

export async function generateMetadata({ params }: GiftPageProps): Promise<Metadata> {
  const gift = await getGiftByCode(params.code)
  
  if (!gift) {
    return {
      title: 'Gift Not Found - Bloomy',
    }
  }

  return {
    title: `A Special Gift for ${gift.recipient_name} - Bloomy`,
    description: `${gift.sender_name} has sent you a beautiful digital flower with ${gift.plan} days of personalized messages.`,
    openGraph: {
      title: `A Special Gift for ${gift.recipient_name}`,
      description: `${gift.sender_name} has sent you a beautiful digital flower`,
      images: [
        {
          url: `/api/og?giftId=${gift.id}`,
          width: 1200,
          height: 630,
          alt: 'Digital Flower Gift',
        },
      ],
    },
  }
}

export default async function GiftPage({ params }: GiftPageProps) {
  const gift = await getGiftByCode(params.code)
  
  if (!gift) {
    notFound()
  }

  return <GiftViewContent gift={gift} />
}