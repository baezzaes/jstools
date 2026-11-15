'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { WordWorkedExample } from '@/components/ToolWorkedExamples'
import { wordCounterTool } from '@/data/tools'
import { trackToolExecute, trackToolView } from '@/lib/analytics'

export default function WordCounterPage() {
  const [text, setText] = useState('')
  const hasTrackedExecute = useRef(false)

  useEffect(() => {
    trackToolView(wordCounterTool)
  }, [])

  const getWordCount = (input: string) =>
    input.trim().split(/\s+/).filter(Boolean).length

  const getCharCount = (input: string) => input.length

  const getCharCountNoSpaces = (input: string) =>
    input.replace(/\s/g, '').length

  const getLineCount = (input: string) =>
    input.split('\n').filter(Boolean).length

  return (
    <div className="tool-page space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold">{wordCounterTool.name}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          텍스트를 입력하면 글자 수, 공백 제외 글자 수, 단어 수, 줄 수를 실시간으로 계산합니다.
          블로그 글, 자기소개서, 과제, SNS 문구처럼 글자 수 제한이 있는 문장을 확인할 때 사용할 수 있습니다.
        </p>
      </header>

      <div className="word-workspace">
      <div className="word-input">
      <label htmlFor="word-counter-input">입력할 텍스트</label>
      <textarea
        id="word-counter-input"
        aria-label="글자 수를 계산할 텍스트"
        className="w-full border p-3 rounded-md shadow-sm text-base focus:outline-none focus:ring focus:border-blue-300"
        rows={10}
        placeholder="여기에 텍스트를 입력하세요."
        value={text}
        onChange={(e) => {
          if (!hasTrackedExecute.current && e.target.value.trim()) {
            trackToolExecute(wordCounterTool)
            hasTrackedExecute.current = true
          }
          setText(e.target.value)
        }}
      />
      </div>

      <section className="word-results" aria-label="글자 수 계산 결과">
        <h2>집계 결과</h2>
      <dl className="word-metrics">
        <div>
          <dt>글자 수(공백 포함)</dt>
          <dd>{getCharCount(text)}</dd>
        </div>
        <div>
          <dt>글자 수(공백 제외)</dt>
          <dd>{getCharCountNoSpaces(text)}</dd>
        </div>
        <div>
          <dt>단어 수</dt>
          <dd>{getWordCount(text)}</dd>
        </div>
        <div>
          <dt>줄 수(빈 줄 제외)</dt>
          <dd>{getLineCount(text)}</dd>
        </div>
      </dl>
      </section>
      </div>
      <p className="text-sm text-gray-600">입력과 동시에 계산됩니다. 줄 수는 완전히 빈 줄만 제외하며 공백만 있는 줄은 포함합니다. 일부 이모지는 여러 글자로 계산될 수 있으므로 제출처의 기준도 확인하세요.</p>

      <WordWorkedExample />
      <ToolSeoSections tool={wordCounterTool} />

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          JSTools 홈으로
        </Link>
      </div>

    </div>
  )
}
