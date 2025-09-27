'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const mockFlowers = [
  {
    id: 1,
    name: 'Rose Garden',
    recipient: 'Sarah',
    status: 'Growing',
    daysLeft: 5,
    color: 'pink'
  },
  {
    id: 2,
    name: 'Sunflower Field',
    recipient: 'John',
    status: 'Delivered',
    daysLeft: 0,
    color: 'yellow'
  },
  {
    id: 3,
    name: 'Lavender Dreams',
    recipient: 'Emma',
    status: 'Growing',
    daysLeft: 12,
    color: 'purple'
  },
]

export function MyFlowersContent() {
  const [activeTab, setActiveTab] = useState<'growing' | 'delivered'>('growing')

  const filteredFlowers = mockFlowers.filter(flower => 
    activeTab === 'growing' ? flower.status === 'Growing' : flower.status === 'Delivered'
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">My Flowers</h1>
          <p className="text-gray-600">
            Manage and track your digital flower gifts
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeTab === 'growing' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('growing')}
              className="px-6"
            >
              Growing ({mockFlowers.filter(f => f.status === 'Growing').length})
            </Button>
            <Button
              variant={activeTab === 'delivered' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('delivered')}
              className="px-6"
            >
              Delivered ({mockFlowers.filter(f => f.status === 'Delivered').length})
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlowers.map((flower) => (
            <Card key={flower.id} className="p-6">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  flower.color === 'pink' ? 'bg-pink-200' :
                  flower.color === 'yellow' ? 'bg-yellow-200' :
                  'bg-purple-200'
                }`}>
                  <span className="text-2xl">
                    {flower.color === 'pink' ? '🌹' :
                     flower.color === 'yellow' ? '🌻' : '💜'}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{flower.name}</h3>
                <p className="text-gray-600 mb-2">For: {flower.recipient}</p>
                
                <div className="flex items-center justify-center mb-4">
                  <Badge 
                    variant={flower.status === 'Growing' ? 'default' : 'secondary'}
                    className="mr-2"
                  >
                    {flower.status}
                  </Badge>
                  {flower.status === 'Growing' && (
                    <span className="text-sm text-gray-500">
                      {flower.daysLeft} days left
                    </span>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredFlowers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="text-xl font-semibold mb-2">No {activeTab} flowers</h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'growing' 
                ? "You don't have any flowers growing right now."
                : "You haven't delivered any flowers yet."
              }
            </p>
            <Button>Create New Gift</Button>
          </div>
        )}
      </div>
    </div>
  )
}
