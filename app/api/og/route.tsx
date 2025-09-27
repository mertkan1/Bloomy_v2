import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const giftId = searchParams.get('giftId')

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'linear-gradient(45deg, #FF7AA2 0%, #FF9E66 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '60px',
              margin: '40px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              style={{
                fontSize: '72px',
                marginBottom: '20px',
              }}
            >
              🌸
            </div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              You have a special gift!
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#6B7280',
                textAlign: 'center',
                marginBottom: '32px',
              }}
            >
              A beautiful digital flower with personalized messages
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '20px',
                color: '#FF7AA2',
                fontWeight: '600',
              }}
            >
              <span>💝</span>
              <span>Bloomy</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}