// app/tools/page.tsx
import React from 'react'

export default function ToolsPage() {
  return (
    <div>
      <h1>도구 페이지</h1>
      {/* 페이지 내용 */}
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { tool: 'lotto-generator' },
    { tool: 'word-counter' },
    { tool: 'date-calculator' },
    { tool: 'password-generator' },
  ]
}
