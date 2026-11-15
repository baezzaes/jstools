'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { lottoGeneratorTool } from '@/data/tools'
import { readSavedLottoNumbers } from '@/lib/lottoStorage'

const feelings = ["행복함", "평온함", "불안함", "짜증남", "신남"]

export default function LottoGenerator() {
  const [selectedFeeling, setSelectedFeeling] = useState('')
  const [favoriteNumber, setFavoriteNumber] = useState('')
  const [result, setResult] = useState<number[]>([])

  const [savedNumbers, setSavedNumbers] = useState<number[][]>([])
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = readSavedLottoNumbers(localStorage.getItem('savedLottoNumbers'))
        setSavedNumbers(stored.numbers)
        if (stored.invalid) setNotice('저장된 번호 중 읽을 수 없는 항목은 제외했습니다. 새 번호 생성은 계속 사용할 수 있습니다.')
      } catch {
        setNotice('브라우저 저장소를 읽을 수 없습니다. 번호 생성은 사용할 수 있습니다.')
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const handleGenerate = () => {
    setError('')
    if (favoriteNumber && (!Number.isInteger(Number(favoriteNumber)) || Number(favoriteNumber) < 1 || Number(favoriteNumber) > 45)) {
      setError('좋아하는 숫자는 1~45 사이의 정수로 입력하거나 비워 주세요.')
      return
    }
    const numbers: number[] = []

    // 사용자 입력 반영 (favoriteNumber가 비어있거나 0인 경우 추가하지 않음)
    if (favoriteNumber && !isNaN(Number(favoriteNumber)) && Number(favoriteNumber) >= 1 && Number(favoriteNumber) <= 45) {
      numbers.push(Number(favoriteNumber))
    }


    // 기분별 번호 편향
    const moodBias: Record<string, number[]> = {
      행복함: [7, 14, 21, 28, 35, 42],
      평온함: [3, 11, 19, 27, 36, 44],
      불안함: [2, 9, 18, 25, 34, 40],
      짜증남: [5, 13, 22, 31, 38, 45],
      신남: [1, 8, 17, 26, 33, 41],
    }

    const bias = moodBias[selectedFeeling] || []
    while (numbers.length < 4 && bias.length > 0) {
      const rand = bias[Math.floor(Math.random() * bias.length)]
      if (rand !== 0 && !numbers.includes(rand)) {
        numbers.push(rand)
      }
    }

    // 랜덤 숫자 보완 (0을 제외하고 1부터 45 사이의 숫자만 생성)
    while (numbers.length < 6) {
      const rand = Math.floor(Math.random() * 45) + 1 // 1부터 45 사이로만 랜덤
      if (!numbers.includes(rand)) {
        numbers.push(rand)
      }
    }

    setResult(numbers.sort((a, b) => a - b))
  }

  // 번호 저장
  const saveNumber = () => {
    if (result.length !== 6) return
    const newSavedNumbers = [...savedNumbers, result]
    try {
      localStorage.setItem('savedLottoNumbers', JSON.stringify(newSavedNumbers))
      setSavedNumbers(newSavedNumbers)
      setNotice('현재 브라우저에 번호를 저장했습니다.')
    } catch {
      setNotice('번호를 저장하지 못했습니다. 브라우저 저장 권한이나 남은 공간을 확인하세요.')
    }
  }

  // 저장된 번호 삭제하기
  const deleteSavedNumber = (index: number) => {
    const updatedNumbers = [...savedNumbers]
    updatedNumbers.splice(index, 1)
    try {
      localStorage.setItem('savedLottoNumbers', JSON.stringify(updatedNumbers))
      setSavedNumbers(updatedNumbers)
      setNotice('저장된 번호를 삭제했습니다.')
    } catch {
      setNotice('저장된 번호를 삭제하지 못했습니다. 브라우저 저장 권한을 확인하세요.')
    }
  }

  return (
    <div className="tool-page space-y-6">
      <h1 className="text-2xl font-bold">로또 번호 추천기</h1>
      <p className="text-sm text-gray-600">기분을 고르면 미리 정해진 후보 번호 일부를 섞습니다. 운세를 판단하거나 당첨 확률을 높이는 기능은 아니며, 재미로만 사용하세요.</p>

      <div className="space-y-4 border p-4 rounded bg-gray-50">
        <div>
          <label htmlFor="lotto-feeling" className="font-semibold">1. 오늘 기분은? (재미용 후보 선택)</label>
          <select
            id="lotto-feeling"
            value={selectedFeeling}
            onChange={(e) => setSelectedFeeling(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">선택하세요</option>
            {feelings.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lotto-number" className="font-semibold">2. 좋아하는 숫자 (선택)</label>
          <input
            id="lotto-number"
            type="number"
            min={1}
            max={45}
            value={favoriteNumber}
            onChange={(e) => setFavoriteNumber(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder="예: 7"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          번호 추천 받기
        </button>
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="text-sm text-gray-700">{notice}</p>}

      {result.length > 0 && (
        <div className="text-center text-xl mt-6">
          🎉 추천 번호: <strong>{result.join(', ')}</strong>
        </div>
      )}

      {/* 저장하기 버튼 */}
      {result.length > 0 && (
        <button
          onClick={saveNumber}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
        >
          저장하기
        </button>
      )}

      {/* 저장된 번호 보기 */}
      {savedNumbers.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">저장된 번호</h3>
          {savedNumbers.map((saved, index) => (
            <div key={index} className="p-2 border-b">
              <strong>{saved.join(', ')}</strong>
              <button onClick={() => deleteSavedNumber(index)} className="ml-2 text-red-500">삭제</button>
            </div>
          ))}
        </div>
      )}

      <ToolSeoSections tool={lottoGeneratorTool} />


      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← JSTools 홈으로</Link>
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
