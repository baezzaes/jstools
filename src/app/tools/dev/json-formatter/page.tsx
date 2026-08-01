'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { jsonFormatterTool } from '@/data/tools'
import { trackToolExecute, trackToolView } from '@/lib/analytics'

export default function JsonFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    trackToolView(jsonFormatterTool)
  }, [])

  const formatJson = () => {
    trackToolExecute(jsonFormatterTool)
    try {
        const parsed = JSON.parse(input)
        const formatted = JSON.stringify(parsed, null, 2)
        setOutput(formatted)
        setError('')
      } catch {
        setError('유효한 JSON 형식이 아닙니다.')
        setOutput('')
      }          
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">🧩 JSON 포맷터</h1>
      <p className="text-sm text-gray-600 text-center">
        JSON 문자열을 보기 좋게 정렬해주는 도구입니다. 개발할 때 유용하게 사용할 수 있어요.
      </p>

      <textarea
        className="w-full border p-3 rounded-md shadow-sm text-sm font-mono h-40"
        placeholder="여기에 JSON을 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="text-center">
        <button
          onClick={formatJson}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          포맷팅
        </button>
      </div>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {output && (
        <textarea
          readOnly
          className="w-full border p-3 rounded-md shadow-sm text-sm font-mono bg-gray-50 h-60"
          value={output}
        />
      )}

      <ToolSeoSections tool={jsonFormatterTool} />

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← JSTools 홈으로
        </Link>
      </div>

      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
        광고 자리 (Google AdSense)
      </div>
    </div>
  )
}
