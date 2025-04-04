export const metadata = {
  title: "QR 코드 생성기 - JSTools",
  description: "텍스트나 URL을 입력하면 즉시 QR 코드를 생성해주는 간편한 QR 생성 도구입니다.",
  keywords: ["QR 코드", "QR 생성기", "QR 만들기", "QR코드 생성", "링크 QR", "JSTools"],
};



'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'  // react-qr-code 라이브러리 임포트
import Link from 'next/link'

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
      
      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
        광고 자리 (Google AdSense)
      </div>
    </div>
  )
}
