'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FAQSection() {
  const faqs = [
    {
      question: 'What exactly is a digital flower?',
      answer: 'A digital flower is a high-quality, exclusive video artwork (1350x1080) featuring beautiful floral arrangements. Each flower is carefully crafted by our artists and paired with AI-generated personalized messages that evolve daily.',
    },
    {
      question: 'How do the AI-generated messages work?',
      answer: 'Our advanced AI creates unique, personalized messages based on the theme you choose. Whether romantic, motivational, or friendly, each message is crafted to feel authentic and meaningful, updating daily throughout your chosen duration.',
    },
    {
      question: 'Are the digital flowers really limited edition?',
      answer: 'Yes! Our limited edition flowers are truly exclusive, with only 100 copies available. Once sold out, they\'re retired forever, making your gift truly unique and collectible.',
    },
    {
      question: 'How long do the daily messages continue?',
      answer: 'You can choose between 30-day or 365-day packages. This is a one-time purchase, and your recipient will receive new messages daily for your selected duration. No recurring charges or renewals.',
    },
  ]

  return (
    <section className="px-8 py-16 bg-[#FAF8F6]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#111827] mb-4">Frequently Asked Questions</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-white rounded-2xl px-6 border-0 shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-[#111827] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B7280] pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}