'use client'

import { useState } from 'react'
import { Search, Sparkles, TrendingUp, Users } from 'lucide-react'

interface TopicInputProps {
  onGenerate: (topic: string) => void
}

export function TopicInput({ onGenerate }: TopicInputProps) {
  const [topic, setTopic] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      onGenerate(topic.trim())
    }
  }

  const exampleTopics = [
    'Content Marketing Strategy',
    'SEO Best Practices',
    'Social Media Marketing',
    'Email Marketing Automation',
    'Digital Marketing Analytics'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Generate SEO-Optimized Content Briefs
          <span className="text-indigo-600"> in Seconds</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform any topic into a comprehensive content brief with AI-powered research,
          competitor analysis, and SEO recommendations.
        </p>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic (e.g., 'Email Marketing Strategy', 'React Development', 'Digital Marketing')"
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!topic.trim()}
            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>Generate Content Brief</span>
          </button>
        </form>

        {/* Example Topics */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">Try these popular topics:</p>
          <div className="flex flex-wrap gap-2">
            {exampleTopics.map((example) => (
              <button
                key={example}
                onClick={() => setTopic(example)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="bg-indigo-100 p-3 rounded-lg w-fit mb-4">
            <Search className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Research</h3>
          <p className="text-gray-600">Analyzes top-performing content and extracts key insights automatically.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">SEO Optimization</h3>
          <p className="text-gray-600">Built-in keyword suggestions and optimization recommendations.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitor Analysis</h3>
          <p className="text-gray-600">Understand what works in your niche and how to outperform competitors.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">2M+</div>
            <div className="text-sm text-gray-500">Content Creators</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">30%</div>
            <div className="text-sm text-gray-500">Time Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">4.8★</div>
            <div className="text-sm text-gray-500">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}
