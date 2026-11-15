'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { quoteGeneratorTool } from '@/data/tools'
import { parseQuote, quoteFailureMessage, QuoteRequestError, requestQuoteJson, translateQuote, type Quote } from '@/lib/quotes'

export default function QuoteGeneratorPage() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [translated, setTranslated] = useState('')
  const [phase, setPhase] = useState<'idle' | 'quote' | 'translation'>('idle')
  const [error, setError] = useState('')
  const [translationError, setTranslationError] = useState('')
  const [translationRetryable, setTranslationRetryable] = useState(true)
  const requestRef = useRef<AbortController | null>(null)
  const loading = phase !== 'idle'

  useEffect(() => () => requestRef.current?.abort(), [])

  const fetchTranslation = async (text: string, controller: AbortController) => {
    setPhase('translation')
    setTranslationRetryable(true)
    try {
      const result = await translateQuote(text, controller.signal)
      if (!controller.signal.aborted) setTranslated(result)
    } catch (failure) {
      if (!controller.signal.aborted) {
        setTranslationError(quoteFailureMessage(failure, true))
        setTranslationRetryable(!(failure instanceof QuoteRequestError && failure.kind === 'limit'))
      }
    }
  }

  const fetchQuote = async () => {
    if (requestRef.current) return
    const controller = new AbortController()
    requestRef.current = controller
    setPhase('quote')
    setQuote(null)
    setTranslated('')
    setError('')
    setTranslationError('')
    try {
      const result = parseQuote(await requestQuoteJson('/api/quotes', controller.signal))
      if (controller.signal.aborted) return
      setQuote(result)
      await fetchTranslation(result.quote, controller)
    } catch (failure) {
      if (!controller.signal.aborted) setError(quoteFailureMessage(failure))
    } finally {
      if (!controller.signal.aborted) setPhase('idle')
      if (requestRef.current === controller) requestRef.current = null
    }
  }

  const retryTranslation = async () => {
    if (requestRef.current || !quote) return
    const controller = new AbortController()
    requestRef.current = controller
    setTranslationError('')
    try { await fetchTranslation(quote.quote, controller) } finally {
      if (!controller.signal.aborted) setPhase('idle')
      if (requestRef.current === controller) requestRef.current = null
    }
  }

  return (
    <div className="tool-page space-y-6">
      <h1 className="text-2xl font-bold">명언 생성기</h1>
      <p className="text-center text-gray-600">
        영어로 된 명언과 함께 한글 번역도 함께 제공합니다.
      </p>

      <div className="text-center">
        <button
          onClick={fetchQuote}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          disabled={loading}
        >
          {phase === 'quote' ? '명언 불러오는 중...' : phase === 'translation' ? '번역하는 중...' : error ? '명언 다시 시도' : quote ? '다른 명언 보기' : '명언 생성하기'}
        </button>
      </div>

      <p className="text-sm text-gray-600" role="status">{phase === 'quote' ? '영어 명언을 가져오고 있습니다.' : phase === 'translation' ? '한국어 번역을 가져오고 있습니다. 영어 원문을 먼저 확인할 수 있습니다.' : ''}</p>
      {error && <div className="quote-error" role="alert"><h2 className="font-semibold">명언을 가져오지 못했습니다</h2><p>{error}</p></div>}
      {quote && (
        <section className="quote-result space-y-5" aria-label="명언 결과">
          <blockquote lang="en">&ldquo;{quote.quote}&rdquo;<cite>— {quote.author}</cite></blockquote>
          {translated && <div className="border-t pt-4"><h2 className="font-semibold">한국어 번역</h2><p lang="ko" className="mt-2">{translated}</p><p className="text-sm text-gray-600 mt-2">자동 번역은 참고용입니다. 원문과 함께 확인하세요.</p></div>}
          {translationError && <div className="quote-translation-note" role="alert"><h2 className="font-semibold">번역을 확인하지 못했습니다</h2><p>{translationError}</p>{translationRetryable && <button type="button" className="btn mt-3" disabled={loading} onClick={retryTranslation}>번역 다시 시도</button>}</div>}
        </section>
      )}

      <p className="text-sm text-gray-600">명언 제공: <a href="https://zenquotes.io/" className="text-blue-700 underline">ZenQuotes</a> · 자동 번역: <a href="https://mymemory.translated.net/" className="text-blue-700 underline">MyMemory</a>. 저자는 제공자에 표시된 정보이며 원출처·저자와 번역을 운영자가 개별 검증한 것은 아닙니다. 외부 서비스의 연결 상태와 무료 이용 한도에 따라 제공이 제한될 수 있습니다.</p>

      <ToolSeoSections tool={quoteGeneratorTool} />

      {/* 홈으로 돌아가기 */}
      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← JSTools 홈으로
        </Link>
      </div>

    </div>
  )
}
