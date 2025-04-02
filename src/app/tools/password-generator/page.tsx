'use client'

import { useState } from 'react'

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(12)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState('')

  const generatePassword = () => {
    let charset = ''
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
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
            />
            숫자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={() => setUseUppercase(!useUppercase)}
            />
            대문자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={() => setUseLowercase(!useLowercase)}
            />
            소문자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
            />
            특수문자 포함
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          비밀번호 생성
        </button>

        {password && (
          <div className="border p-3 rounded bg-white flex items-center justify-between">
            <span className="font-mono break-all">{password}</span>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-500 hover:underline"
            >
              복사
            </button>
          </div>
        )}
      </div>

      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
        광고 자리 (Google AdSense)
      </div>
    </div>
  )
}
