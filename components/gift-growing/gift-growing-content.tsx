'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function GiftGrowingContent() {
  const [daysLeft, setDaysLeft] = useState(7)
  const [currentMessage, setCurrentMessage] = useState('Your flower is growing beautifully!')

  useEffect(() => {
    // Simulate growing process
    const timer = setInterval(() => {
      setDaysLeft(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-4xl">🌸</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Flower is Growing!</h1>
            <p className="text-gray-600">Days remaining: {daysLeft}</p>
          </div>
          
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4">{currentMessage}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((7 - daysLeft) / 7) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <Button className="w-full">
            View Full Gift
          </Button>
        </Card>
      </div>
    </div>
  )
}
