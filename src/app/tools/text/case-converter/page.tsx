'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { caseConverterTool } from '@/data/tools'

export default function CaseConverterPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const toUpperCase = () => setResult(text.toUpperCase())
  const toLowerCase = () => setResult(text.toLowerCase())
  const toCapitalize = () =>
    setResult(text.replace(/\b\w/g, (c) => c.toUpperCase()))
  const toTitleCase = () =>
    setResult(
      text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
  const toSwapCase = () =>
    setResult(
      text
        .split('')
        .map((c) =>
          c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
        )
        .join('')
    )

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">🔁 대소문자 변환기</h1>

      <textarea
        className="w-full border p-3 rounded-md shadow-sm text-sm"
        rows={6}
        placeholder="텍스트를 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <button onClick={toUpperCase} className="btn">대문자</button>
        <button onClick={toLowerCase} className="btn">소문자</button>
        <button onClick={toCapitalize} className="btn">Capitalize</button>
        <button onClick={toTitleCase} className="btn">Title Case</button>
        <button onClick={toSwapCase} className="btn">Swap Case</button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <strong>결과:</strong>
        <pre className="whitespace-pre-wrap mt-2 text-sm">{result}</pre>
      </div>

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← JSTools 홈으로
        </Link>
      </div>

      <ToolSeoSections tool={caseConverterTool} />


      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
              <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7836056065911594"
          data-ad-slot="1234567890"   // 없으면 자동광고
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
        }} />
      </div>
    </div>
  )
}
