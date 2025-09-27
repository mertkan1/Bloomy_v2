'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function CraftGiftContent() {
  const [message, setMessage] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Craft Your Gift</h1>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="recipient">Recipient Name</Label>
              <Input
                id="recipient"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient's name"
              />
            </div>
            
            <div>
              <Label htmlFor="sender">Your Name</Label>
              <Input
                id="sender"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Personal Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a heartfelt message..."
                rows={4}
              />
            </div>
            
            <Button className="w-full" size="lg">
              Create Gift
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
