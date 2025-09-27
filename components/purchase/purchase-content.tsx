'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const plans = [
  { id: 'basic', name: 'Basic Plan', price: '$9.99', days: 7, features: ['7 days of messages', 'Basic flower animation'] },
  { id: 'premium', name: 'Premium Plan', price: '$19.99', days: 14, features: ['14 days of messages', 'Premium flower animation', 'Music selection'] },
  { id: 'deluxe', name: 'Deluxe Plan', price: '$29.99', days: 30, features: ['30 days of messages', 'Deluxe flower animation', 'Music selection', 'Custom messages'] },
]

export function PurchaseContent() {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Complete Your Purchase</h1>
          <p className="text-gray-600">Choose your plan and payment details</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Plan</h2>
            <div className="space-y-4">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-pink-500 bg-pink-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <span className="text-lg font-bold text-pink-600">{plan.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.days} days of messages</p>
                  <ul className="text-sm space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Payment Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="card">Card Number</Label>
                  <Input
                    id="card"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-pink-600">
                      {selectedPlanData?.price}
                    </span>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Complete Purchase
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
