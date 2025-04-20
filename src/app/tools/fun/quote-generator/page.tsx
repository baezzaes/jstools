'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function QuoteGeneratorPage() {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [translated, setTranslated] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchQuote = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://api.quotable.io/random')
      const data = await res.json()
      setQuote(data.content)
      setAuthor(data.author)

      const translatedRes = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({
          q: data.content,
          source: 'en',
          target: 'ko',
          format: 'text',
        }),
      })
      const translatedData = await translatedRes.json()
      setTranslated(translatedData.translatedText)
    } catch (error) {
      console.error('명언 가져오기 실패:', error)
      setQuote('명언을 불러오는 데 실패했습니다.')
      setAuthor('')
      setTranslated('')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">💬 명언 생성기</h1>
      <p className="text-center text-gray-600">
        영어로 된 명언과 함께 한글 번역도 함께 제공합니다.
      </p>

      <div className="text-center">
        <button
          onClick={fetchQuote}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? '불러오는 중...' : '명언 생성하기'}
        </button>
      </div>

      {quote && (
        <div className="bg-gray-100 p-4 rounded space-y-3 text-center">
          <blockquote className="text-lg italic">"{quote}"</blockquote>
          <p className="text-sm text-gray-500">— {author}</p>
          <hr />
          <p className="text-base text-gray-800 font-medium">{translated}</p>
        </div>
      )}

      {/* 홈으로 돌아가기 */}
      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← JSTools 홈으로
        </Link>
      </div>

      {/* 광고 자리 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
        광고 영역 (Google AdSense 자리)
      </div>
    </div>
  )
}
