'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { dateCalculatorTool } from '@/data/tools'
import { trackToolExecute, trackToolView } from '@/lib/analytics'

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [baseDate, setBaseDate] = useState('')
  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState('after')
  const trackedCalculations = useRef(new Set<string>())

  useEffect(() => { trackToolView(dateCalculatorTool) }, [])

  useEffect(() => {
    // 입력 중이 아니라 결과가 표시되는 시점에 모드별 한 번만 기록합니다.
    const modes = [startDate && endDate ? 'difference' : '', baseDate && Number.isFinite(offset) && offset !== 0 ? 'offset' : '']
    for (const mode of modes) {
      if (mode && !trackedCalculations.current.has(mode)) {
        trackToolExecute(dateCalculatorTool)
        trackedCalculations.current.add(mode)
      }
    }
  }, [startDate, endDate, baseDate, offset])

  const getDiffResult = () => {
    if (!startDate || !endDate) return null
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getOffsetDate = () => {
    if (!baseDate || !offset) return null
    const base = new Date(baseDate)
    const result = new Date(base)
    result.setDate(base.getDate() + (direction === 'after' ? offset : -offset))
    return result.toISOString().split('T')[0]
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">📅 날짜 계산기</h1>
      <p className="text-sm text-gray-600">두 날짜 사이의 일수 또는 기준일에서 며칠 전·후 날짜를 계산합니다. D-day는 오늘과 목표일을 입력해 확인하세요.</p>

      {/* 날짜 차이 계산 */}
      <div className="border p-4 rounded space-y-2 bg-gray-50">
        <h2 className="font-semibold">🧮 날짜 간 차이 계산</h2>
        <input
          type="date"
          aria-label="시작일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto text-base"
        />
        ~
        <input
          type="date"
          aria-label="종료일"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto text-base"
        />
        {getDiffResult() !== null && (
          <div className="mt-2">👉 총 {getDiffResult()}일 차이</div>
        )}
      </div>

      {/* 기준일 + n일 계산 */}
      <div className="border p-4 rounded space-y-2 bg-gray-50">
        <h2 className="font-semibold">➕ 기준일로부터 날짜 계산</h2>
        <input
          type="date"
          aria-label="기준일"
          value={baseDate}
          onChange={(e) => setBaseDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto text-base"
        />
        <select
          aria-label="기준일 전후 방향"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="after">후</option>
          <option value="before">전</option>
        </select>
        <input
          type="number"
          aria-label="일 수"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="border p-2 rounded w-24 mx-2"
          placeholder="일 수"
        />
        {getOffsetDate() && (
          <div className="mt-2">👉 결과 날짜: {getOffsetDate()}</div>
        )}
      </div>

      <ToolSeoSections tool={dateCalculatorTool} />

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
