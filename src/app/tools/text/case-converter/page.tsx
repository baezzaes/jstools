'use client'

import { useState } from 'react'
import Link from 'next/link'

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

      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold mt-8">📘 텍스트 대소문자 변환기란?</h2>
        <p>
          대소문자 변환기는 입력한 텍스트를 한 번에 소문자, 대문자, 문장 형태 등 다양한 형식으로 변환해주는 도구입니다.
          반복적인 편집 작업을 줄이고, 일관된 텍스트 스타일을 유지할 때 유용하게 사용됩니다.
        </p>
        <p>
          예를 들어, 전체 대문자 변환, 소문자 변환, 각 단어 첫 글자 대문자, 문장처럼 보이도록 변환 등 다양한 옵션을
          클릭 한 번으로 적용할 수 있어 글쓰기, 코딩, 문서 작성 등에 활용도가 높습니다.
        </p>
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
