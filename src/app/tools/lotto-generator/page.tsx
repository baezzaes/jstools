'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'  // Link import 추가

const feelings = ["행복함", "평온함", "불안함", "짜증남", "신남"]
const colors = ["빨강", "파랑", "노랑", "초록", "보라"]

export default function LottoGenerator() {
  const [selectedFeeling, setSelectedFeeling] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [favoriteNumber, setFavoriteNumber] = useState('')
  const [result, setResult] = useState<number[]>([])
  const [savedNumbers, setSavedNumbers] = useState<number[][]>([])

  // 로컬 저장소에서 저장된 번호 불러오기
  useEffect(() => {
    const storedNumbers = JSON.parse(localStorage.getItem('savedLottoNumbers') || '[]')
    setSavedNumbers(storedNumbers)
  }, [])

  const handleGenerate = () => {
    const numbers = new Set<number>()

    // 사용자 입력 반영
    if (!isNaN(Number(favoriteNumber))) {
      numbers.add(Number(favoriteNumber))
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
    while (numbers.size < 4 && bias.length > 0) {
      const rand = bias[Math.floor(Math.random() * bias.length)]
      numbers.add(rand)
    }

    // 랜덤 숫자 보완
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1)
    }

    setResult(Array.from(numbers).sort((a, b) => a - b))
  }

  // 번호 저장
  const saveNumber = () => {
    const newSavedNumbers = [...savedNumbers, result]
    setSavedNumbers(newSavedNumbers)
    localStorage.setItem('savedLottoNumbers', JSON.stringify(newSavedNumbers))
  }

  // 저장된 번호 삭제하기
  const deleteSavedNumber = (index: number) => {
    const updatedNumbers = [...savedNumbers]
    updatedNumbers.splice(index, 1)
    setSavedNumbers(updatedNumbers)
    localStorage.setItem('savedLottoNumbers', JSON.stringify(updatedNumbers))
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">🎯 운세 기반 로또 번호 추천기</h1>

      <div className="space-y-4 border p-4 rounded bg-gray-50">
        <div>
          <label className="font-semibold">1. 오늘 기분은?</label>
          <select
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
          <label className="font-semibold">2. 좋아하는 색은?</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">선택하세요</option>
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">3. 좋아하는 숫자 (선택)</label>
          <input
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

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← JSTools 홈으로</Link>
      </div>

      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
        광고 자리 (Google AdSense)
      </div>
    </div>
  )
}
