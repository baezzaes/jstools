'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code'  // react-qr-code 라이브러리 임포트
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { QrWorkedExample } from '@/components/ToolWorkedExamples'
import { qrCodeGeneratorTool } from '@/data/tools'
import { trackToolExecute, trackToolView } from '@/lib/analytics'

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState('')
  const hasTrackedExecute = useRef(false)

  useEffect(() => { trackToolView(qrCodeGeneratorTool) }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasTrackedExecute.current && e.target.value.trim()) {
      trackToolExecute(qrCodeGeneratorTool)
      hasTrackedExecute.current = true
    }
    setInputText(e.target.value)
  }

  return (
    <div className="tool-page space-y-6">
      <h1 className="text-2xl font-bold">QR 코드 생성기</h1>

      <div className="space-y-4 border p-4 rounded bg-gray-50">
        <div>
          <label htmlFor="qr-input" className="font-semibold">QR 코드로 변환할 텍스트나 URL을 입력하세요:</label>
          <input
            id="qr-input"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-1 text-base"
            placeholder="여기에 입력하세요..."
          />
        </div>

        <div className="text-center mt-4">
          {/* QR 코드 출력 */}
          {inputText && (
            <QRCode value={inputText} size={256} style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }} />
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        {/* Link 컴포넌트로 홈으로 이동 */}
        <Link href="/" className="text-sm text-blue-600 hover:underline">← JSTools 홈으로</Link>
      </div>

      <QrWorkedExample />
      <ToolSeoSections tool={qrCodeGeneratorTool} />


    </div>
  )
}
