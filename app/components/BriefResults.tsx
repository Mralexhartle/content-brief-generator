'use client'

import { useState } from 'react'
import {
  FileText,
  Download,
  Share2,
  Copy,
  CheckCircle,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  ArrowLeft,
  Eye
} from 'lucide-react'
import type { ContentBrief } from './ContentBriefGenerator'

interface BriefResultsProps {
  brief: ContentBrief
  onNewBrief: () => void
}

export function BriefResults({ brief, onNewBrief }: BriefResultsProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const exportToPDF = async () => {
    const { exportBriefToPDF } = await import('../utils/pdfExport')
    exportBriefToPDF(brief)
  }

  const totalWordCount = brief.outline.reduce((sum, section) => sum + section.wordCount, 0)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onNewBrief}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Generate New Brief</span>
          </button>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Brief Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">Sections</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{brief.outline.length}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Word Count</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalWordCount.toLocaleString()}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Keywords</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{brief.keywords.length}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">SEO Score</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">85%</div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{brief.title}</h1>
          <p className="text-lg text-gray-600">{brief.description}</p>
        </div>
      </div>

      {/* Content Structure */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Content Structure</h2>
        </div>

        <div className="space-y-4">
          {brief.outline.map((section, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{section.section}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {section.wordCount} words
                </span>
              </div>
              <p className="text-gray-600">{section.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Recommendations */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Target className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">SEO Recommendations</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Title Tag</h3>
            <div className="bg-gray-50 p-4 rounded-lg relative">
              <p className="text-sm text-gray-700 font-medium">{brief.seoRecommendations.titleTag}</p>
              <button
                onClick={() => copyToClipboard(brief.seoRecommendations.titleTag, 'title')}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
              >
                {copiedSection === 'title' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Meta Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg relative">
              <p className="text-sm text-gray-700">{brief.seoRecommendations.metaDescription}</p>
              <button
                onClick={() => copyToClipboard(brief.seoRecommendations.metaDescription, 'meta')}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
              >
                {copiedSection === 'meta' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {brief.seoRecommendations.targetKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Suggested Headings</h3>
          <div className="space-y-2">
            {brief.seoRecommendations.headings.map((heading, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <span className="text-indigo-600 font-medium">H{index + 2}:</span>
                <span className="text-gray-700">{heading}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Insights */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Users className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Competitor Insights</h2>
        </div>

        <div className="space-y-4">
          {brief.competitorInsights.map((competitor, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{competitor.title}</h3>
                  <a
                    href={competitor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Article</span>
                  </a>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {competitor.wordCount.toLocaleString()} words
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Headings Used:</h4>
                <div className="flex flex-wrap gap-1">
                  {competitor.headings.map((heading, hIndex) => (
                    <span
                      key={hIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {heading}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
