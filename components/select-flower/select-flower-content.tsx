'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LimitedFlowerCard } from './limited-flower-card'
import { StandardFlowerSlider } from './standard-flower-slider'
import { useGiftStore } from '@/lib/store/gift-store'
import { RotateCcw } from 'lucide-react'

const flowers = {
  romantic: [
    {
      id: 'elegant-bouquet',
      name: 'Elegant Bouquet',
      description: 'A sophisticated arrangement that captures eternal love',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1698849071904-090feee32e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYXJyYW5nZW1lbnQlMjBib3VxdWV0fGVufDF8fHx8MTc1ODM5NjUwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      isLimited: true,
      stock: 8,
      totalStock: 100
    },
    {
      id: 'crimson-rose',
      name: 'Crimson Rose',
      description: 'Symbolizes love',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1660585468452-514ed1977f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjcmltc29uJTIwcm9zZSUyMGZsb3dlcnxlbnwxfHx8fDE3NTc4NzgyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'pink-passion',
      name: 'Pink Passion',
      description: 'Gentle romance and affection',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1616256637735-ce3d74829b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwZmxvd2VyJTIwbW90aXZhdGlvbnxlbnwxfHx8fDE3NTc4NzgyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ],
  motivation: [
    {
      id: 'sunrise-energy',
      name: 'Sunrise Energy',
      description: 'Ignites inspiration and drive',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1616256637735-ce3d74829b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwZmxvd2VyJTIwbW90aXZhdGlvbnxlbnwxfHx8fDE3NTc4NzgyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isLimited: true,
      stock: 15,
      totalStock: 100
    },
    {
      id: 'golden-strength',
      name: 'Golden Strength',
      description: 'Empowers with confidence',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1662339846435-4143254cd54e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBmcmllbmRzaGlwJTIweWVsbG93fGVufDF8fHx8MTc1Nzg3ODIyOXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ],
  friendship: [
    {
      id: 'sunny-friendship',
      name: 'Sunny Friendship',
      description: 'Celebrates true companionship',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1662339846435-4143254cd54e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBmcmllbmRzaGlwJTIweWVsbG93fGVufDF8fHx8MTc1Nzg3ODIyOXww&ixlib=rb-4.1.0&q=80&w=1080',
      isLimited: true,
      stock: 22,
      totalStock: 100
    },
    {
      id: 'cheerful-daisy',
      name: 'Cheerful Daisy',
      description: 'Brings joy and laughter',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1616256637735-ce3d74829b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwZmxvd2VyJTIwbW90aXZhdGlvbnxlbnwxfHx8fDE3NTc4NzgyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ],
  celebration: [
    {
      id: 'festive-bouquet',
      name: 'Festive Bouquet',
      description: 'Perfect for special occasions',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1559720738-78a58d915d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhlcmVhbCUyMHdoaXRlJTIwZmxvd2VyJTIwYmxvb218ZW58MXx8fHwxNTc4NzgyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isLimited: true,
      stock: 5,
      totalStock: 100
    },
    {
      id: 'party-bloom',
      name: 'Party Bloom',
      description: 'Celebrates life\'s moments',
      price: 27.99,
      image: 'https://images.unsplash.com/photo-1660585468452-514ed1977f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjcmltc29uJTIwcm9zZSUyMGZsb3dlcnxlbnwxfHx8fDE3NTc4NzgyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ]
}

export function SelectFlowerContent() {
  const router = useRouter()
  const { setGiftData } = useGiftStore()
  const [activeCategory, setActiveCategory] = useState<keyof typeof flowers>('romantic')
  const [currentStandardIndex, setCurrentStandardIndex] = useState(1)

  const categories = [
    { id: 'romantic', label: 'Romantic' },
    { id: 'motivation', label: 'Motivation' },
    { id: 'friendship', label: 'Friendship' },
    { id: 'celebration', label: 'Celebration' }
  ]

  const currentFlowers = flowers[activeCategory]
  const limitedFlower = currentFlowers.find(f => f.isLimited) || currentFlowers[0]
  const standardFlowers = currentFlowers.filter(f => !f.isLimited)
  const currentStandardFlower = standardFlowers[currentStandardIndex % standardFlowers.length]

  // Auto-rotate standard flowers every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStandardIndex(prev => prev + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [standardFlowers.length])

  const handleSelectFlower = (flower: any) => {
    setGiftData({ flower })
    router.push('/craft-gift')
  }

  const handleRefresh = () => {
    setCurrentStandardIndex(prev => prev + 1)
  }

  return (
    <div className="px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-[#111827] mb-4">Select a Flower</h1>
          <p className="text-lg text-[#6B7280]">
            Select an exclusive digital flower and let our AI craft the perfect message.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id as keyof typeof flowers)
                  setCurrentStandardIndex(0)
                }}
                className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#FF7AA2] to-[#FF9E66] text-white shadow-md'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F8F9FA]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Flower Selection Grid */}
        <motion.div 
          className="grid lg:grid-cols-5 gap-8 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Limited Edition - Left Side (3 columns) */}
          <div className="lg:col-span-3">
            <LimitedFlowerCard 
              flower={limitedFlower} 
              onSelect={handleSelectFlower}
            />
          </div>

          {/* Standard Flowers - Right Side (2 columns) */}
          <div className="lg:col-span-2">
            <StandardFlowerSlider
              flower={currentStandardFlower}
              onSelect={handleSelectFlower}
              onRefresh={handleRefresh}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}