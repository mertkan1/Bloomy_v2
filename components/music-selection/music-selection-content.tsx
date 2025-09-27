'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const musicOptions = [
  { id: 1, name: 'Classical Piano', duration: '3:24', mood: 'Calm' },
  { id: 2, name: 'Jazz Vibes', duration: '4:12', mood: 'Smooth' },
  { id: 3, name: 'Acoustic Guitar', duration: '3:45', mood: 'Peaceful' },
  { id: 4, name: 'Nature Sounds', duration: '5:00', mood: 'Relaxing' },
  { id: 5, name: 'Ambient Space', duration: '4:30', mood: 'Dreamy' },
  { id: 6, name: 'Soft Strings', duration: '3:15', mood: 'Elegant' },
]

export function MusicSelectionContent() {
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Music</h1>
          <p className="text-gray-600">
            Select a beautiful soundtrack for your digital flower gift
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {musicOptions.map((music) => (
            <Card 
              key={music.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedMusic === music.id 
                  ? 'ring-2 ring-pink-500 bg-pink-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedMusic(music.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{music.name}</h3>
                <Badge variant="secondary">{music.mood}</Badge>
              </div>
              <p className="text-sm text-gray-600">{music.duration}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-pink-400 h-1 rounded-full w-1/3"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="lg">
            Preview
          </Button>
          <Button 
            size="lg" 
            disabled={!selectedMusic}
            className="bg-pink-500 hover:bg-pink-600"
          >
            Continue with Selected Music
          </Button>
        </div>
      </div>
    </div>
  )
}
