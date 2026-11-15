'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { dateCalculatorTool } from '@/data/tools'
import { trackToolExecute, trackToolView } from '@/lib/analytics'
import { differenceInDays, offsetDate } from '@/lib/dateCalculation'
import { DateWorkedExample } from '@/components/ToolWorkedExamples'

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
    return differenceInDays(startDate, endDate)
  }

  const getOffsetDate = () => {
    return offsetDate(baseDate, offset, direction)
  }

  return (
    <div className="tool-page space-y-6">
      <h1 className="text-2xl font-bold">날짜 계산기</h1>
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
          min={0}
          step={1}
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="border p-2 rounded w-24 mx-2"
          placeholder="일 수"
        />
        {getOffsetDate() && (
          <div className="mt-2">👉 결과 날짜: {getOffsetDate()}</div>
        )}
      </div>

      <p className="text-sm text-gray-600">일 수는 0 이상의 정수로 입력하세요. 0일 전·후는 기준일과 같습니다. 날짜만 계산하며 시각이나 영업일은 계산하지 않습니다.</p>
      <DateWorkedExample />
      <ToolSeoSections tool={dateCalculatorTool} />

    {/* 홈으로 돌아가기 */}
    <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← JSTools 홈으로
        </Link>
        </div>


    </div>
  )
}
