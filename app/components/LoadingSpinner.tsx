import { Loader2, Sparkles } from 'lucide-react'

export function LoadingSpinner() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Sparkles className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Generating Your Content Brief</h3>
            <p className="text-gray-600">AI is analyzing top content, extracting insights, and creating your SEO-optimized brief...</p>
          </div>

          <div className="w-full max-w-md">
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-gray-500">This usually takes 15-30 seconds</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Researching</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Analyzing</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Optimizing</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-400">Finalizing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
