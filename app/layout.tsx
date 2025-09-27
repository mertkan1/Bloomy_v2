import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bloomy - Digital Flower Gifts',
  description: 'Send beautiful digital flower gifts with AI-generated daily messages',
  keywords: ['digital flowers', 'gifts', 'AI messages', 'personalized'],
  openGraph: {
    title: 'Bloomy - Digital Flower Gifts',
    description: 'Send beautiful digital flower gifts with AI-generated daily messages',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}