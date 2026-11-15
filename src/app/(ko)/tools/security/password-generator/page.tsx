'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { passwordGeneratorTool } from '@/data/tools'
import { generatePassword as createPassword } from '@/lib/password'

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState('12')
  const [useNumbers, setUseNumbers] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [easyMode, setEasyMode] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [copyError, setCopyError] = useState('')

  const resetResult = () => {
    setPassword('')
    setCopied(false)
    setError('')
    setCopyError('')
  }

  const generatePassword = () => {
    setPassword('')
    setCopied(false)
    setError('')
    setCopyError('')
    try {
      setPassword(createPassword({ length: Number(length), numbers: useNumbers, uppercase: useUppercase, lowercase: useLowercase, symbols: useSymbols, exampleMode: easyMode }))
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : '비밀번호를 생성하지 못했습니다.')
    }
  }

  const copyToClipboard = async () => {
    if (!password) return
    setCopyError('')
    setCopied(false)
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyError('복사하지 못했습니다. 브라우저 권한을 확인하거나 결과를 직접 선택해 복사하세요.')
    }
  }

  return (
    <div className="tool-page space-y-6">
      <h1 className="text-2xl font-bold">랜덤 비밀번호 생성기</h1>

      <div className="border p-4 rounded bg-gray-50 space-y-4">
        <div className="flex items-center gap-2">
          <label htmlFor="password-length" className="w-32">비밀번호 길이:</label>
          <input
            id="password-length"
            type="number"
            value={length}
            onChange={(e) => { setLength(e.target.value); resetResult() }}
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
              onChange={() => { setUseNumbers(!useNumbers); resetResult() }}
              disabled={easyMode}
            />
            숫자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={() => { setUseUppercase(!useUppercase); resetResult() }}
              disabled={easyMode}
            />
            대문자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={() => { setUseLowercase(!useLowercase); resetResult() }}
              disabled={easyMode}
            />
            소문자 포함
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => { setUseSymbols(!useSymbols); resetResult() }}
              disabled={easyMode}
            />
            특수문자 포함
          </label>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={easyMode}
            onChange={() => { setEasyMode(!easyMode); resetResult() }}
          />
          기억하기 쉬운 예시 모드 (계정용 사용 금지)
        </label>
        {easyMode && <p className="text-sm text-amber-800" role="note">적은 수의 단어·숫자 조합을 보여주는 예시입니다. 실제 계정의 비밀번호로 사용하지 마세요. 길이와 문자 옵션은 이 모드에 적용되지 않습니다.</p>}
        {!easyMode && <p className="text-sm text-gray-600">4~32자, 선택한 문자 종류를 각각 하나 이상 포함합니다. Web Crypto 난수를 사용하지만 짧은 길이·단순한 옵션은 추측하기 쉬울 수 있습니다. 사이트별 요구 조건을 확인하세요.</p>}

        <button
          onClick={generatePassword}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          비밀번호 생성
        </button>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        {copyError && <p role="alert" className="text-sm text-red-700">{copyError}</p>}

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


    </div>
  )
}
