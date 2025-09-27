'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw } from 'lucide-react'

interface Flower {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface StandardFlowerSliderProps {
  flower: Flower
  onSelect: (flower: Flower) => void
  onRefresh: () => void
}

export function StandardFlowerSlider({ flower, onSelect, onRefresh }: StandardFlowerSliderProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="space-y-4">
      <motion.div 
        className="relative bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl overflow-hidden cursor-pointer group aspect-[4/3] shadow-lg"
        onClick={() => onSelect(flower)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
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
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-[#111827] ml-1" />
            </div>
          </motion.div>
        )}
        
        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{flower.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-90">{flower.description}</p>
            <span className="text-lg font-bold">${flower.price}</span>
          </div>
        </div>

        {/* Progress bar for auto-rotation */}
        <div className="absolute top-4 left-4 right-4">
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button
          onClick={onRefresh}
          className="w-16 h-16 bg-[#111827] text-white rounded-full hover:bg-[#374151] transition-colors duration-300 shadow-lg"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}