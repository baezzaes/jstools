'use client'

import { useState } from 'react'

export default function ClientTestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-xl mx-auto mt-20 text-center space-y-4">
      <h1 className="text-2xl font-bold">🧪 클라이언트 컴포넌트</h1>
      <p>카운트: {count}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        +1
      </button>
    </div>
  )
}
