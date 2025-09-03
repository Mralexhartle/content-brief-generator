'use client'

import { useState, useEffect } from 'react'
import { FileText, Zap, User, LogOut } from 'lucide-react'
import { AuthModal } from './AuthModal'

interface User {
  email: string
  name: string
}

interface HeaderProps {
  user?: User | null
  onLogin?: (user: User) => void
  onLogout?: () => void
}

export function Header({ user, onLogin, onLogout }: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleLogin = (userData: User) => {
    onLogin?.(userData)
  }

  const handleLogout = async () => {
    const { createClientComponentClient } = await import('@/lib/supabase')
    const supabase = createClientComponentClient()

    await supabase.auth.signOut()
    onLogout?.()
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Content Brief Generator</h1>
                <p className="text-sm text-gray-500">AI-powered content briefs in seconds</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Zap className="h-4 w-4" />
                <span>Powered by AI</span>
              </div>

              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <User className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Start Free Trial
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </>
  )
}
