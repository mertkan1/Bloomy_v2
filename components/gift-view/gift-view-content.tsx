'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Gift {
  id: string
  recipient_name: string
  sender_name: string
  message: string
  plan: string
  status: string
}

interface GiftViewContentProps {
  gift: Gift
}

export function GiftViewContent({ gift }: GiftViewContentProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-6xl">🌺</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              A Special Gift for {gift.recipient_name}
            </h1>
            
            <p className="text-gray-600 mb-4">
              From: {gift.sender_name}
            </p>
          </div>
          
          {!isRevealed ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                You have received a beautiful digital flower gift!
              </p>
              <Button 
                onClick={() => setIsRevealed(true)}
                size="lg"
                className="w-full"
              >
                Reveal Your Gift
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-lg text-gray-800 italic">
                  "{gift.message}"
                </p>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Plan: {gift.plan} days</p>
                <p>Status: {gift.status}</p>
              </div>
              
              <Button className="w-full">
                Accept Gift
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
