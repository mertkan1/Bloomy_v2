'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-provider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Globe, LogIn, LogOut, Loader as Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function Header() {
  const { user, loading, signInWithEmail, signOut } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async () => {
    if (!loginEmail || !loginEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoggingIn(true)
    try {
      await signInWithEmail(loginEmail)
      toast.success('Magic link sent to your email!')
      setShowLoginModal(false)
      setLoginEmail('')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Failed to send magic link')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully!')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to sign out')
    }
  }

  if (loading) {
    return (
      <header className="px-8 py-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-[#FF7AA2]" />
          <span className="text-2xl font-semibold text-[#111827]">Bloomy</span>
        </div>
        <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
      </header>
    )
  }

  return (
    <header className="px-8 py-6 flex items-center justify-between bg-white">
      <Link href="/" className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-[#FF7AA2]" />
        <span className="text-2xl font-semibold text-[#111827]">Bloomy</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-[#6B7280] hover:text-[#111827] transition-colors">
          Home
        </Link>
        <Link href="/select-flower" className="text-[#6B7280] hover:text-[#111827] transition-colors">
          Send a Gift
        </Link>
        <Link href="/my-flowers" className="text-[#FF7AA2] hover:text-[#FF9E66] transition-colors font-medium">
          My Flowers
        </Link>
        <Link href="/about" className="text-[#6B7280] hover:text-[#111827] transition-colors">
          About
        </Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <Globe className="w-5 h-5 text-[#6B7280] cursor-pointer hover:text-[#111827] transition-colors" />
        
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6B7280]">Welcome, {user.email?.split('@')[0]}</span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <Link href="/select-flower">
              <Button className="bg-gradient-to-r from-[#FF7AA2] to-[#FF9E66] text-white rounded-2xl px-6 py-2 hover:shadow-lg transition-all duration-300">
                Send Flowers
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl font-bold text-[#111827]">
                    Sign in to Bloomy
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="border-[#E5E7EB] rounded-xl focus:border-[#FF7AA2] focus:ring-[#FF7AA2]"
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                  </div>
                  <Button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full bg-gradient-to-r from-[#FF7AA2] to-[#FF9E66] text-white rounded-xl py-3 hover:shadow-lg transition-all duration-300"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending magic link...
                      </>
                    ) : (
                      'Send magic link'
                    )}
                  </Button>
                  <p className="text-sm text-[#6B7280] text-center">
                    We'll send you a magic link to sign in instantly
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            
            <Link href="/select-flower">
              <Button className="bg-gradient-to-r from-[#FF7AA2] to-[#FF9E66] text-white rounded-2xl px-6 py-2 hover:shadow-lg transition-all duration-300">
                Send Flowers
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}