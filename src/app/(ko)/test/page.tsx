'use client'

import { useState } from 'react'

export default function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-xl mx-auto mt-20 text-center space-y-6">
      <h1 className="text-2xl font-bold">🧪 Test Page</h1>
      <p>이 페이지는 테스트용으로 만들었습니다.</p>

      <div className="text-lg">
        현재 카운트: <strong>{count}</strong>
      </div>

      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        +1 증가
      </button>
    </div>
  )
}
