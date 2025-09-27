'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Play } from 'lucide-react'

interface Flower {
  id: string
  name: string
  description: string
  price: number
  image: string
  isLimited?: boolean
  stock?: number
  totalStock?: number
}

interface LimitedFlowerCardProps {
  flower: Flower
  onSelect: (flower: Flower) => void
}

export function LimitedFlowerCard({ flower, onSelect }: LimitedFlowerCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="relative cursor-pointer group"
      onClick={() => onSelect(flower)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Badge className="absolute top-4 left-4 bg-[#FCD34D] text-[#92400E] z-10 px-3 py-1 rounded-full">
        LIMITED EDITION
      </Badge>
      
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
        <Image
          src={flower.image}
          alt={flower.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Video play indicator */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-[#111827] ml-1" />
            </div>
          </motion.div>
        )}
        
        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{flower.name}</h3>
          {flower.stock && flower.totalStock && (
            <p className="text-sm mb-2 opacity-90">
              {flower.stock} / {flower.totalStock} LEFT
            </p>
          )}
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-90">{flower.description}</p>
            <span className="text-2xl font-bold">${flower.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}