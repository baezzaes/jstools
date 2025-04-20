'use client'

import { useState } from 'react'
import Link from 'next/link'

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

      {/* 설명 섹션 */}
      <section className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold">이 도구에 대해</h2>
        <p>
          <strong>Word & Character Counter</strong>는 입력한 텍스트의 글자 수, 단어 수, 줄 수를
          실시간으로 분석해주는 간단하고 직관적인 도구입니다. 블로그 작성, 과제 제출,
          트위터 글쓰기처럼 글자 수 제한이 있는 경우에 특히 유용합니다.
        </p>
        <p>
          글자 수는 공백 포함과 제외 버전으로 모두 제공되며, 단어 수는 공백 기준으로 자동 계산됩니다.
          줄 수도 함께 확인할 수 있어, 다양한 텍스트 분석 작업에 활용할 수 있습니다.
        </p>
        <p>
          이 도구는 <strong>설치나 로그인 없이</strong> 누구나 자유롭게 사용할 수 있으며,
          JSTools는 앞으로도 더 많은 유용한 도구들을 제공할 예정입니다.
        </p>
      </section>


      {/* 홈으로 돌아가기 */}
      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← JSTools 홈으로
        </Link>
        </div>

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
