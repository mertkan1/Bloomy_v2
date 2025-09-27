import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/home/hero-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FAQSection } from '@/components/home/faq-section'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  )
}