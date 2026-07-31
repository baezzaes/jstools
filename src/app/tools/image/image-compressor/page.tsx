'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import JSZip from 'jszip'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { imageCompressorTool } from '@/data/tools'

type ImageStatus = 'pending' | 'processing' | 'done' | 'error'

type ImageItem = {
  id: string
  file: File
  name: string
  type: string
  originalSize: number
  originalUrl: string
  compressedBlob?: Blob
  compressedUrl?: string
  compressedSize?: number
  outputName?: string
  status: ImageStatus
  error?: string
}

const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}

function getSavings(originalSize: number, compressedSize?: number) {
  if (!compressedSize) return 0
  return Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
}

function getOutputName(fileName: string, type: string) {
  const baseName = fileName.replace(/\.[^.]+$/, '')
  const extension = type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg'
  return `${baseName}-compressed.${extension}`
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

async function loadImage(file: File) {
  const url = URL.createObjectURL(file)

  try {
    const image = new Image()
    image.src = url
    await image.decode()
    return image
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function compressImage(file: File, quality: number) {
  const image = await loadImage(file)
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('이미지를 처리할 수 없습니다.')
  }

  context.drawImage(image, 0, 0)

  const outputType = file.type === 'image/png' ? 'image/png' : file.type
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error('이미지 압축에 실패했습니다.'))
          return
        }
        resolve(result)
      },
      outputType,
      quality / 100
    )
  })

  return blob.size < file.size ? blob : file
}

export default function ImageCompressorPage() {
  const [items, setItems] = useState<ImageItem[]>([])
  const [quality, setQuality] = useState(75)
  const [isDragging, setIsDragging] = useState(false)
  const [isZipping, setIsZipping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemsRef = useRef<ImageItem[]>([])

  const completedItems = useMemo(
    () => items.filter((item) => item.status === 'done' && item.compressedBlob),
    [items]
  )

  const isProcessing = items.some((item) => item.status === 'processing' || item.status === 'pending')

  const updateItems = (updater: (current: ImageItem[]) => ImageItem[]) => {
    setItems((current) => {
      const next = updater(current)
      itemsRef.current = next
      return next
    })
  }

  const processItem = async (item: ImageItem, nextQuality: number) => {
    updateItems((current) =>
      current.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, status: 'processing', error: undefined }
          : currentItem
      )
    )

    try {
      const compressedBlob = await compressImage(item.file, nextQuality)
      const compressedUrl = URL.createObjectURL(compressedBlob)

      updateItems((current) =>
        current.map((currentItem) => {
          if (currentItem.id !== item.id) return currentItem
          if (currentItem.compressedUrl) URL.revokeObjectURL(currentItem.compressedUrl)

          return {
            ...currentItem,
            compressedBlob,
            compressedUrl,
            compressedSize: compressedBlob.size,
            outputName: getOutputName(item.name, compressedBlob.type || item.type),
            status: 'done',
            error: undefined,
          }
        })
      )
    } catch (error) {
      updateItems((current) =>
        current.map((currentItem) =>
          currentItem.id === item.id
            ? {
                ...currentItem,
                status: 'error',
                error: error instanceof Error ? error.message : '이미지 처리 중 오류가 발생했습니다.',
              }
            : currentItem
        )
      )
    }
  }

  const addFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList)
    const nextItems: ImageItem[] = files.map((file) => {
      const isSupported = SUPPORTED_TYPES.includes(file.type)

      return {
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        name: file.name,
        type: file.type,
        originalSize: file.size,
        originalUrl: URL.createObjectURL(file),
        status: isSupported ? 'pending' : 'error',
        error: isSupported ? undefined : 'JPG, JPEG, PNG, WEBP 파일만 지원합니다.',
      }
    })

    updateItems((current) => [...current, ...nextItems])
    nextItems.filter((item) => item.status === 'pending').forEach((item) => {
      void processItem(item, quality)
    })
  }

  const removeItem = (id: string) => {
    updateItems((current) => {
      const target = current.find((item) => item.id === id)
      if (target) {
        URL.revokeObjectURL(target.originalUrl)
        if (target.compressedUrl) URL.revokeObjectURL(target.compressedUrl)
      }
      return current.filter((item) => item.id !== id)
    })
  }

  const clearAll = () => {
    updateItems((current) => {
      current.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl)
        if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl)
      })
      return []
    })
  }

  const recompressAll = () => {
    items
      .filter((item) => SUPPORTED_TYPES.includes(item.type))
      .forEach((item) => {
        void processItem(item, quality)
      })
  }

  const downloadAll = async () => {
    if (completedItems.length === 0) return
    setIsZipping(true)

    try {
      const zip = new JSZip()
      completedItems.forEach((item) => {
        zip.file(item.outputName || getOutputName(item.name, item.type), item.compressedBlob as Blob)
      })

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      downloadBlob(zipBlob, 'jstools-compressed-images.zip')
    } finally {
      setIsZipping(false)
    }
  }

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl)
        if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl)
      })
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="space-y-3 text-center">
        <h1 className="text-2xl font-bold">이미지 용량 줄이기</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          JPG, PNG, WEBP 이미지를 브라우저 안에서 압축합니다. 파일은 서버로 업로드되지 않으며,
          여러 장을 한 번에 처리하고 ZIP으로 내려받을 수 있습니다.
        </p>
      </header>

      <section
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          addFiles(event.dataTransfer.files)
        }}
        className={`rounded-lg border-2 border-dashed p-6 text-center transition ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files) addFiles(event.target.files)
            event.currentTarget.value = ''
          }}
        />
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">이미지를 끌어다 놓으세요</h2>
          <p className="text-sm text-gray-600">JPG, JPEG, PNG, WEBP 파일을 여러 장 선택할 수 있습니다.</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            파일 선택
          </button>
        </div>
      </section>

      <section className="border rounded-lg p-4 space-y-3 bg-white">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold">품질 설정</h2>
            <p className="text-sm text-gray-600">낮출수록 용량은 줄어들지만 화질 손실이 커질 수 있습니다.</p>
          </div>
          <strong className="text-lg">{quality}%</strong>
        </div>
        <input
          type="range"
          min={40}
          max={100}
          step={5}
          value={quality}
          onChange={(event) => setQuality(Number(event.target.value))}
          className="w-full"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={recompressAll}
            disabled={items.length === 0 || isProcessing}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            품질 적용
          </button>
          <button
            type="button"
            onClick={downloadAll}
            disabled={completedItems.length === 0 || isZipping}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300 hover:bg-green-700 transition"
          >
            {isZipping ? 'ZIP 생성 중...' : '전체 ZIP 다운로드'}
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={items.length === 0}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-300 hover:bg-gray-800 transition"
          >
            전체 삭제
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">결과 리스트</h2>
          {isProcessing && <span className="text-sm text-blue-600">압축 진행 중...</span>}
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border p-4 text-center text-sm text-gray-500">
            아직 추가된 이미지가 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[96px_1fr]">
                {/* Blob preview URLs are local-only and cannot be optimized by next/image. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.compressedUrl || item.originalUrl}
                  alt={`${item.name} 미리보기`}
                  className="h-24 w-24 rounded border object-cover"
                />
                <div className="space-y-3 min-w-0">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.type || '알 수 없는 형식'}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="self-start text-sm text-red-600 hover:underline"
                    >
                      삭제
                    </button>
                  </div>

                  {item.status === 'error' ? (
                    <p className="rounded bg-red-50 p-2 text-sm text-red-600">{item.error}</p>
                  ) : (
                    <div className="grid gap-2 text-sm md:grid-cols-4">
                      <div>
                        <strong className="block">원본 용량</strong>
                        {formatBytes(item.originalSize)}
                      </div>
                      <div>
                        <strong className="block">압축 후</strong>
                        {item.status === 'done' && item.compressedSize
                          ? formatBytes(item.compressedSize)
                          : '처리 중'}
                      </div>
                      <div>
                        <strong className="block">절감률</strong>
                        {item.status === 'done' ? `${getSavings(item.originalSize, item.compressedSize)}%` : '-'}
                      </div>
                      <div>
                        <strong className="block">상태</strong>
                        {item.status === 'done' ? '완료' : '진행 중'}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={!item.compressedBlob || item.status !== 'done'}
                      onClick={() =>
                        item.compressedBlob &&
                        downloadBlob(item.compressedBlob, item.outputName || getOutputName(item.name, item.type))
                      }
                      className="px-3 py-2 text-sm bg-black text-white rounded disabled:bg-gray-300 hover:bg-gray-800 transition"
                    >
                      다운로드
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="font-semibold text-gray-900">개인정보 안내</h2>
        <p className="mt-2">
          선택한 이미지는 서버로 업로드되지 않습니다. 압축, 미리보기, 다운로드 파일 생성은 모두 현재 브라우저에서
          처리되며, 페이지를 닫거나 전체 삭제를 누르면 화면의 임시 데이터가 제거됩니다.
        </p>
      </section>

      <ToolSeoSections tool={imageCompressorTool} />

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          JSTools 홈으로
        </Link>
      </div>
    </div>
  )
}
