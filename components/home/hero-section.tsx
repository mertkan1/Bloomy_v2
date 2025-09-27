'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles, MessageCircle } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-[#111827] leading-tight">
              A Gift Beyond Time
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-lg">
              Experience the art of digital floristry. Send an exclusive, limited edition floral video, 
              paired with a unique AI-crafted message, creating a memory that will never fade.
            </p>
          </div>
          
          <Link href="/select-flower">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#FF7AA2] to-[#FF9E66] text-white rounded-2xl px-8 py-4 text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Create a Gift
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="aspect-[1350/1080] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#FAF8F6] to-[#E5E7EB]">
            <Image
              src="https://images.unsplash.com/photo-1698849071904-090feee32e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYXJyYW5nZW1lbnQlMjBib3VxdWV0fGVufDF8fHx8MTc1Nzg3NzQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Elegant digital flower arrangement"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-[#FF7AA2]" />
          </motion.div>
          <motion.div 
            className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <MessageCircle className="w-6 h-6 text-[#FF9E66]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}