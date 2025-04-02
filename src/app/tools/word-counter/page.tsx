'use client'

import { useState } from 'react'

export default function WordCounterPage() {
  const [text, setText] = useState('')

  const getWordCount = (input: string) =>
    input.trim().split(/\s+/).filter(Boolean).length

  const getCharCount = (input: string) => input.length

  const getCharCountNoSpaces = (input: string) =>
    input.replace(/\s/g, '').length

  const getLineCount = (input: string) =>
    input.split('\n').filter(Boolean).length

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">🔤 Word & Character Counter</h1>

      <textarea
        className="w-full border p-3 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:border-blue-300"
        rows={10}
        placeholder="여기에 텍스트를 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base bg-gray-50 p-4 rounded-md shadow-inner">
        <div>
          <strong>글자 수 (공백 포함):</strong>
          <div>{getCharCount(text)}</div>
        </div>
        <div>
          <strong>글자 수 (공백 제외):</strong>
          <div>{getCharCountNoSpaces(text)}</div>
        </div>
        <div>
          <strong>단어 수:</strong>
          <div>{getWordCount(text)}</div>
        </div>
        <div>
          <strong>줄 수:</strong>
          <div>{getLineCount(text)}</div>
        </div>
      </div>

      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
        광고 자리 (Google AdSense)
      </div>
    </div>
  )
}
