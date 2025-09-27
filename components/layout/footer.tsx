import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="px-8 py-16 bg-[#111827]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-white" />
            <span className="text-2xl font-semibold text-white">Bloomy</span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-[#6B7280] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-[#6B7280] hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-[#6B7280] hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/my-flowers" className="text-[#FF7AA2] hover:text-[#FF9E66] transition-colors">
              My Flowers
            </Link>
          </nav>
          
          <Link href="/select-flower">
            <Button className="bg-gradient-to-r from-[#FF7AA2] to-[#FF9E66] text-white rounded-2xl px-6 py-2 hover:shadow-lg transition-all duration-300">
              Start Creating
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#374151] text-center">
          <p className="text-[#6B7280]">
            © 2024 Bloomy. Crafting digital memories that last forever.
          </p>
        </div>
      </div>
    </footer>
  )
}