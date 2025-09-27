'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, Share2 } from 'lucide-react'

export function HowItWorksSection() {
  const steps = [
    {
      icon: Heart,
      title: 'Visit a Flower',
      description: 'We create gorgeous arrangements for every occasion. Browse our curated collection of exclusive digital blooms that captivate and inspire.',
    },
    {
      icon: Sparkles,
      title: 'AI Creates Messages',
      description: 'Our AI crafts personalized messages based on your theme, creating a unique experience that evolves with each passing day.',
    },
    {
      icon: Share2,
      title: 'Share Beautiful',
      description: 'Share your digital gift through QR codes, links, or direct email. Create lasting memories that can be treasured forever.',
    },
  ]

  return (
    <section className="px-8 py-16 bg-[#FAF8F6]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#111827] mb-4">How It Works</h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            A new way to send love
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#FF7AA2] to-[#FF9E66] rounded-full flex items-center justify-center mx-auto">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827]">{step.title}</h3>
              <p className="text-[#6B7280]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}