'use client'

import { useState, useEffect } from 'react'
import { Header } from './Header'
import { TopicInput } from './TopicInput'
import { BriefResults } from './BriefResults'
import { LoadingSpinner } from './LoadingSpinner'

export interface ContentBrief {
  title: string
  description: string
  keywords: string[]
  outline: Array<{
    section: string
    description: string
    wordCount: number
  }>
  seoRecommendations: {
    titleTag: string
    metaDescription: string
    headings: string[]
    targetKeywords: string[]
  }
  competitorInsights: Array<{
    title: string
    url: string
    wordCount: number
    headings: string[]
  }>
}

interface User {
  email: string
  name: string
}

export function ContentBriefGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [brief, setBrief] = useState<ContentBrief | null>(null)
  const [currentStep, setCurrentStep] = useState<'input' | 'results'>('input')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from Supabase on component mount
    const checkUser = async () => {
      const { createClientComponentClient } = await import('@/lib/supabase')
      const supabase = createClientComponentClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({
          email: user.email!,
          name: user.user_metadata?.name || user.email!.split('@')[0]
        })
      }
    }

    checkUser()
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleGenerateBrief = async (topic: string) => {
    setIsLoading(true)
    setCurrentStep('results')

    // Simulate API call - in production this would call your AI service
    setTimeout(() => {
      const mockBrief: ContentBrief = {
        title: `Complete Guide to ${topic} in 2024`,
        description: `A comprehensive guide covering everything you need to know about ${topic}, including best practices, tools, and real-world examples.`,
        keywords: [
          topic.toLowerCase(),
          `${topic} guide`,
          `${topic} tutorial`,
          `${topic} best practices`,
          `${topic} tools`
        ],
        outline: [
          {
            section: `Introduction to ${topic}`,
            description: `Define what ${topic} is and why it matters`,
            wordCount: 250
          },
          {
            section: `Getting Started with ${topic}`,
            description: `Step-by-step guide to begin working with ${topic}`,
            wordCount: 400
          },
          {
            section: `Best Practices for ${topic}`,
            description: `Essential tips and techniques for success`,
            wordCount: 350
          },
          {
            section: `Tools and Resources`,
            description: `Recommended tools, software, and learning resources`,
            wordCount: 300
          },
          {
            section: `Common Challenges and Solutions`,
            description: `Address typical problems and how to overcome them`,
            wordCount: 350
          },
          {
            section: `Conclusion`,
            description: `Summary and next steps for mastering ${topic}`,
            wordCount: 200
          }
        ],
        seoRecommendations: {
          titleTag: `Complete Guide to ${topic} - Best Practices & Tools 2024`,
          metaDescription: `Learn everything about ${topic} with this comprehensive guide. Discover best practices, tools, and real-world examples to master ${topic} in 2024.`,
          headings: [
            `What is ${topic}?`,
            `How to Get Started with ${topic}`,
            `${topic} Best Practices`,
            `Essential ${topic} Tools`
          ],
          targetKeywords: [
            topic.toLowerCase(),
            `${topic} tutorial`,
            `${topic} guide 2024`,
            `${topic} best practices`
          ]
        },
        competitorInsights: [
          {
            title: `${topic} Complete Guide`,
            url: `https://example.com/${topic.toLowerCase()}-guide`,
            wordCount: 2500,
            headings: ['Introduction', 'Getting Started', 'Advanced Techniques']
          },
          {
            title: `Mastering ${topic} in 2024`,
            url: `https://example.com/mastering-${topic.toLowerCase()}`,
            wordCount: 1800,
            headings: ['Basics', 'Tools', 'Best Practices']
          }
        ]
      }

      setBrief(mockBrief)
      setIsLoading(false)
    }, 3000)
  }

  const handleNewBrief = () => {
    setBrief(null)
    setCurrentStep('input')
  }

  return (
    <div className="min-h-screen">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : currentStep === 'input' ? (
          <TopicInput onGenerate={handleGenerateBrief} />
        ) : (
          <BriefResults brief={brief!} onNewBrief={handleNewBrief} />
        )}
      </div>
    </div>
  )
}
