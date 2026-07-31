'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'  // react-qr-code 라이브러리 임포트
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { qrCodeGeneratorTool } from '@/data/tools'

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">📱 QR 코드 생성기</h1>

      <div className="space-y-4 border p-4 rounded bg-gray-50">
        <div>
          <label className="font-semibold">QR 코드로 변환할 텍스트나 URL을 입력하세요:</label>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mt-1"
            placeholder="여기에 입력하세요..."
          />
        </div>

        <div className="text-center mt-4">
          {/* QR 코드 출력 */}
          {inputText && (
            <QRCode value={inputText} size={256} />
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        {/* Link 컴포넌트로 홈으로 이동 */}
        <Link href="/" className="text-sm text-blue-600 hover:underline">← JSTools 홈으로</Link>
      </div>

      <ToolSeoSections tool={qrCodeGeneratorTool} />


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
