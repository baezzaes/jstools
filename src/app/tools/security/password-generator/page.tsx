'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { passwordGeneratorTool } from '@/data/tools'

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(12)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [easyMode, setEasyMode] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = ''
    if (easyMode) {
      const words = ['Tree', 'Cat', 'Dog', 'Moon', 'Sun', 'Book', 'Fire', 'Rain']
      const symbols = ['!', '@', '#', '$']
      const word1 = words[Math.floor(Math.random() * words.length)]
      const word2 = words[Math.floor(Math.random() * words.length)]
      const number = Math.floor(Math.random() * 100)
      const symbol = symbols[Math.floor(Math.random() * symbols.length)]
      const easyPass = `${word1}${number}${symbol}${word2}`
      setPassword(easyPass)
      return
    }

    if (useNumbers) charset += '0123456789'
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!charset) return setPassword('옵션을 선택하세요')

    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      result += charset[randomIndex]
    }
    setPassword(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">🔐 랜덤 비밀번호 생성기</h1>

      <div className="border p-4 rounded bg-gray-50 space-y-4">
        <div className="flex items-center gap-2">
          <label className="w-32">비밀번호 길이:</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="border p-2 rounded w-24"
            min={4}
            max={32}
            disabled={easyMode}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
              disabled={easyMode}
            />
            숫자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={() => setUseUppercase(!useUppercase)}
              disabled={easyMode}
            />
            대문자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={() => setUseLowercase(!useLowercase)}
              disabled={easyMode}
            />
            소문자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
              disabled={easyMode}
            />
            특수문자 포함
          </label>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={easyMode}
            onChange={() => setEasyMode(!easyMode)}
          />
          기억하기 쉬운 비밀번호 모드
        </label>

        <button
          onClick={generatePassword}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          비밀번호 생성
        </button>

        {password && (
          <div className="border p-3 rounded bg-white flex items-center justify-between">
            <span className="font-mono break-all">{password}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-500 hover:underline"
              >
                복사
              </button>
              {copied && <span className="text-green-600 text-xs">복사 완료!</span>}
            </div>
          </div>
        )}
      </div>
      <ToolSeoSections tool={passwordGeneratorTool} />


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
