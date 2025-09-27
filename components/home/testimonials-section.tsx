'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'Designer',
      image: 'https://images.unsplash.com/photo-1720456485619-8ef428357cea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHdvbWFuJTIwcG9ydHJhaXQlMjB0ZXN0aW1vbmlhbHxlbnwxfHx8fDE3NTc4Nzc0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'Bloomy transformed how I express love to my family. The AI messages were so thoughtful and personal, it felt like having a poet write for me every day.',
    },
    {
      name: 'James Chen',
      role: 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTc3OTUxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'I sent a 365-day flower to my mother for her birthday. She calls me every morning to read the new message. It\'s brought us closer than ever before.',
    },
    {
      name: 'Sarah Wilson',
      role: 'Teacher',
      image: 'https://images.unsplash.com/photo-1745434159123-4908d0b9df94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTc4Nzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quote: 'The quality of the digital flowers is breathtaking. My partner was amazed by the attention to detail and the beautiful messages that accompanied each day.',
    },
  ]

  return (
    <section className="px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#111827] mb-4">What Our Users Say</h2>
          <p className="text-lg text-[#6B7280]">
            Real stories from those we've helped create meaningful moments
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827]">{testimonial.name}</h4>
                    <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-[#6B7280] leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}