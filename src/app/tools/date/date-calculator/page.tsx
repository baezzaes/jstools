'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [baseDate, setBaseDate] = useState('')
  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState('after')

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

      {/* 날짜 차이 계산 */}
      <div className="border p-4 rounded space-y-2 bg-gray-50">
        <h2 className="font-semibold">🧮 날짜 간 차이 계산</h2>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        ~
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded ml-2"
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
          value={baseDate}
          onChange={(e) => setBaseDate(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="after">후</option>
          <option value="before">전</option>
        </select>
        <input
          type="number"
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="border p-2 rounded w-24 mx-2"
          placeholder="일 수"
        />
        {getOffsetDate() && (
          <div className="mt-2">👉 결과 날짜: {getOffsetDate()}</div>
        )}
      </div>

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
