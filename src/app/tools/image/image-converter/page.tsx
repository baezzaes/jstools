'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import JSZip from 'jszip'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { imageConverterTool } from '@/data/tools'
import { trackDownloadClick, trackToolExecute, trackToolView } from '@/lib/analytics'
import {
  downloadBlob,
  formatBytes,
  getImageFormatFromMime,
  getImageFormatLabel,
  getImageMimeType,
  getImageOutputName,
  isSupportedImageFile,
  loadImage,
  type ImageOutputFormat,
} from '@/lib/imageTools'

type ImageStatus = 'pending' | 'processing' | 'done' | 'error'
type JpgBackgroundMode = 'white' | 'black' | 'custom'

type ImageItem = {
  id: string
  file: File
  name: string
  type: string
  originalSize: number
  originalWidth?: number
  originalHeight?: number
  originalUrl: string
  convertedBlob?: Blob
  convertedUrl?: string
  convertedSize?: number
  outputName?: string
  outputFormat?: ImageOutputFormat
  status: ImageStatus
  error?: string
}

const MAX_FILES = 30
const MAX_PIXELS = 32_000_000
const OUTPUT_FORMATS: ImageOutputFormat[] = ['jpg', 'png', 'webp']

function getBackgroundColor(mode: JpgBackgroundMode, customColor: string) {
  if (mode === 'black') return '#000000'
  if (mode === 'custom') return customColor || '#ffffff'
  return '#ffffff'
}

function isSameFormat(item: ImageItem, outputFormat: ImageOutputFormat) {
  return getImageFormatFromMime(item.type) === outputFormat
}

function hasTooManyPixels(width?: number, height?: number) {
  return Boolean(width && height && width * height > MAX_PIXELS)
}

async function convertImage(file: File, outputFormat: ImageOutputFormat, backgroundColor: string) {
  const image = await loadImage(file)
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('이미지를 처리할 수 없습니다.')
  }

  if (outputFormat === 'jpg') {
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  context.drawImage(image, 0, 0)

  const mimeType = getImageMimeType(outputFormat)
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result || result.size === 0) {
          reject(new Error('이미지 변환에 실패했습니다.'))
          return
        }
        resolve(result)
      },
      mimeType,
      outputFormat === 'jpg' || outputFormat === 'webp' ? 0.92 : undefined
    )
  })

  return blob
}

export default function ImageConverterPage() {
  const [items, setItems] = useState<ImageItem[]>([])
  const [outputFormat, setOutputFormat] = useState<ImageOutputFormat>('webp')
  const [jpgBackgroundMode, setJpgBackgroundMode] = useState<JpgBackgroundMode>('white')
  const [customBackgroundColor, setCustomBackgroundColor] = useState('#ffffff')
  const [isDragging, setIsDragging] = useState(false)
  const [isZipping, setIsZipping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemsRef = useRef<ImageItem[]>([])

  useEffect(() => {
    trackToolView(imageConverterTool)
  }, [])

  const completedItems = useMemo(
    () => items.filter((item) => item.status === 'done' && item.convertedBlob),
    [items]
  )
  const isProcessing = items.some((item) => item.status === 'processing' || item.status === 'pending')
  const jpgBackgroundColor = getBackgroundColor(jpgBackgroundMode, customBackgroundColor)

  const updateItems = (updater: (current: ImageItem[]) => ImageItem[]) => {
    setItems((current) => {
      const next = updater(current)
      itemsRef.current = next
      return next
    })
  }

  const processItem = async (
    item: ImageItem,
    nextOutputFormat = outputFormat,
    nextBackgroundColor = jpgBackgroundColor
  ) => {
    if (!isSupportedImageFile(item.file)) return

    updateItems((current) =>
      current.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, status: 'processing', error: undefined }
          : currentItem
      )
    )

    try {
      if (item.originalSize === 0) {
        throw new Error('0바이트 파일은 변환할 수 없습니다.')
      }
      if (!item.originalWidth || !item.originalHeight) {
        throw new Error('이미지 크기를 확인할 수 없습니다.')
      }
      if (hasTooManyPixels(item.originalWidth, item.originalHeight)) {
        throw new Error(`이미지는 최대 ${MAX_PIXELS.toLocaleString()} 픽셀까지 처리할 수 있습니다.`)
      }
      if (isSameFormat(item, nextOutputFormat)) {
        throw new Error('원본과 다른 형식을 선택해주세요.')
      }

      const convertedBlob = await convertImage(item.file, nextOutputFormat, nextBackgroundColor)
      const convertedUrl = URL.createObjectURL(convertedBlob)

      updateItems((current) =>
        current.map((currentItem) => {
          if (currentItem.id !== item.id) return currentItem
          if (currentItem.convertedUrl) URL.revokeObjectURL(currentItem.convertedUrl)

          return {
            ...currentItem,
            convertedBlob,
            convertedUrl,
            convertedSize: convertedBlob.size,
            outputFormat: nextOutputFormat,
            outputName: getImageOutputName(item.name, 'converted', convertedBlob.type || getImageMimeType(nextOutputFormat)),
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
                outputFormat: nextOutputFormat,
                error: error instanceof Error ? error.message : '이미지 변환 중 오류가 발생했습니다.',
              }
            : currentItem
        )
      )
    }
  }

  const processAll = (
    nextOutputFormat = outputFormat,
    nextBackgroundColor = jpgBackgroundColor,
    nextItems = items
  ) => {
    nextItems
      .filter((item) => isSupportedImageFile(item.file))
      .forEach((item) => {
        void processItem(item, nextOutputFormat, nextBackgroundColor)
      })
  }

  const addFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((file) => file instanceof File)
    const availableSlots = Math.max(0, MAX_FILES - itemsRef.current.length)
    const selectedFiles = files.slice(0, availableSlots)
    const loadedItems: ImageItem[] = []

    if (selectedFiles.length === 0 && files.length > 0) {
      return
    }

    for (const file of selectedFiles) {
      const baseItem: ImageItem = {
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        name: file.name,
        type: file.type,
        originalSize: file.size,
        originalUrl: URL.createObjectURL(file),
        status: isSupportedImageFile(file) && file.size > 0 ? 'pending' : 'error',
        error:
          file.size === 0
            ? '0바이트 파일은 변환할 수 없습니다.'
            : isSupportedImageFile(file)
              ? undefined
              : 'JPG, JPEG, PNG, WEBP 파일만 지원합니다. GIF, SVG, HEIC, AVIF는 지원하지 않습니다.',
      }

      if (!isSupportedImageFile(file) || file.size === 0) {
        loadedItems.push(baseItem)
        continue
      }

      try {
        const image = await loadImage(file)
        loadedItems.push({
          ...baseItem,
          originalWidth: image.naturalWidth,
          originalHeight: image.naturalHeight,
        })
      } catch (error) {
        loadedItems.push({
          ...baseItem,
          status: 'error',
          error: error instanceof Error ? error.message : '이미지 디코딩에 실패했습니다.',
        })
      }
    }

    updateItems((current) => [...current, ...loadedItems])
    if (loadedItems.some((item) => item.status === 'pending')) {
      trackToolExecute(imageConverterTool)
    }
    processAll(outputFormat, jpgBackgroundColor, loadedItems)
  }

  const changeOutputFormat = (nextFormat: ImageOutputFormat) => {
    setOutputFormat(nextFormat)
    processAll(nextFormat, getBackgroundColor(jpgBackgroundMode, customBackgroundColor))
  }

  const changeJpgBackgroundMode = (nextMode: JpgBackgroundMode) => {
    setJpgBackgroundMode(nextMode)
    if (outputFormat === 'jpg') {
      processAll('jpg', getBackgroundColor(nextMode, customBackgroundColor))
    }
  }

  const changeCustomBackgroundColor = (value: string) => {
    setJpgBackgroundMode('custom')
    setCustomBackgroundColor(value)
    if (outputFormat === 'jpg') {
      processAll('jpg', value)
    }
  }

  const removeItem = (id: string) => {
    updateItems((current) => {
      const target = current.find((item) => item.id === id)
      if (target) {
        URL.revokeObjectURL(target.originalUrl)
        if (target.convertedUrl) URL.revokeObjectURL(target.convertedUrl)
      }
      return current.filter((item) => item.id !== id)
    })
  }

  const clearAll = () => {
    updateItems((current) => {
      current.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl)
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl)
      })
      return []
    })
  }

  const convertAll = () => {
    trackToolExecute(imageConverterTool)
    processAll(outputFormat, jpgBackgroundColor)
  }

  const downloadAll = async () => {
    if (completedItems.length === 0) return
    setIsZipping(true)

    try {
      const zip = new JSZip()
      const usedNames = new Map<string, number>()

      completedItems.forEach((item) => {
        const preferredName =
          item.outputName || getImageOutputName(item.name, 'converted', item.convertedBlob?.type || item.type)
        const count = usedNames.get(preferredName) || 0
        usedNames.set(preferredName, count + 1)
        const fileName = count === 0 ? preferredName : preferredName.replace(/(\.[^.]+)$/, `-${count + 1}$1`)
        zip.file(fileName, item.convertedBlob as Blob)
      })

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      trackDownloadClick(imageConverterTool, 'zip')
      downloadBlob(zipBlob, 'jstools-converted-images.zip')
    } finally {
      setIsZipping(false)
    }
  }

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl)
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl)
      })
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="space-y-3 text-center">
        <h1 className="text-2xl font-bold">이미지 변환기</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          JPG, PNG, WebP 이미지를 원하는 형식으로 변환합니다. 업로드한 이미지는 서버로 전송되지 않으며
          브라우저에서만 처리됩니다.
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
          void addFiles(event.dataTransfer.files)
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
          aria-label="변환할 이미지 파일 선택"
          className="hidden"
          onChange={(event) => {
            if (event.target.files) void addFiles(event.target.files)
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

      <section className="border rounded-lg p-4 space-y-4 bg-white">
        <div>
          <h2 className="font-semibold">출력 형식 선택</h2>
          <p className="mt-1 text-sm text-gray-600">
            해상도와 비율은 유지됩니다. 용량을 더 줄이고 싶다면 이미지 용량 줄이기 도구를 사용하세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {OUTPUT_FORMATS.map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => changeOutputFormat(format)}
              className={`rounded border px-4 py-2 text-sm ${
                outputFormat === format ? 'border-black bg-black text-white' : 'border-gray-300'
              }`}
            >
              {getImageFormatLabel(getImageMimeType(format))}
            </button>
          ))}
        </div>

        {outputFormat === 'jpg' && (
          <div className="rounded-md border bg-gray-50 p-3 space-y-3">
            <div>
              <h3 className="text-sm font-semibold">JPG 배경색</h3>
              <p className="mt-1 text-xs text-gray-600">
                JPG는 투명 배경을 지원하지 않습니다. 투명 영역을 채울 배경색을 선택하세요.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => changeJpgBackgroundMode('white')}
                className={`rounded border px-3 py-2 text-sm ${
                  jpgBackgroundMode === 'white' ? 'border-black bg-white text-black' : 'border-gray-300 bg-white'
                }`}
              >
                흰색
              </button>
              <button
                type="button"
                onClick={() => changeJpgBackgroundMode('black')}
                className={`rounded border px-3 py-2 text-sm ${
                  jpgBackgroundMode === 'black' ? 'border-black bg-black text-white' : 'border-gray-300 bg-black text-white'
                }`}
              >
                검정
              </button>
              <label className="flex items-center gap-2 rounded border border-gray-300 px-3 py-2 text-sm">
                사용자 지정
                <input
                  type="color"
                  value={customBackgroundColor}
                  onChange={(event) => changeCustomBackgroundColor(event.target.value)}
                  onClick={() => changeJpgBackgroundMode('custom')}
                  aria-label="JPG 사용자 지정 배경색"
                  className="h-6 w-8"
                />
              </label>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={convertAll}
            disabled={items.length === 0 || isProcessing}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            변환 적용
          </button>
          <button
            type="button"
            onClick={downloadAll}
            disabled={completedItems.length === 0 || isZipping || isProcessing}
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
            전체 초기화
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">변환 결과</h2>
          {isProcessing && <span className="text-sm text-blue-600">변환 중...</span>}
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
                  src={item.convertedUrl || item.originalUrl}
                  alt={`${item.name} 미리보기`}
                  className="h-24 w-24 rounded border object-cover"
                />
                <div className="space-y-3 min-w-0">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-500">원본 형식: {getImageFormatLabel(item.type)}</p>
                      {item.status === 'done' && (
                        <p className="text-xs text-gray-500">
                          결과 형식: {getImageFormatLabel(item.convertedBlob?.type || getImageMimeType(outputFormat))}
                        </p>
                      )}
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
                    <div className="grid gap-2 text-sm md:grid-cols-5">
                      <div>
                        <strong className="block">원본 크기</strong>
                        {item.originalWidth && item.originalHeight
                          ? `${item.originalWidth} x ${item.originalHeight}px`
                          : '-'}
                      </div>
                      <div>
                        <strong className="block">원본 용량</strong>
                        {formatBytes(item.originalSize)}
                      </div>
                      <div>
                        <strong className="block">결과 용량</strong>
                        {item.status === 'done' && item.convertedSize ? formatBytes(item.convertedSize) : '처리 중'}
                      </div>
                      <div>
                        <strong className="block">변환 상태</strong>
                        {item.status === 'done' ? '완료' : '진행 중'}
                      </div>
                      <div>
                        <strong className="block">출력</strong>
                        {getImageFormatLabel(item.convertedBlob?.type || getImageMimeType(outputFormat))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={!item.convertedBlob || item.status !== 'done'}
                      onClick={() =>
                        item.convertedBlob && (() => {
                          trackDownloadClick(imageConverterTool, item.convertedBlob.type || item.outputName || getImageMimeType(outputFormat))
                          downloadBlob(
                            item.convertedBlob,
                            item.outputName ||
                              getImageOutputName(item.name, 'converted', item.convertedBlob.type || getImageMimeType(outputFormat))
                          )
                        })()
                      }
                      className="px-3 py-2 text-sm bg-black text-white rounded disabled:bg-gray-300 hover:bg-gray-800 transition"
                    >
                      {getImageFormatLabel(item.convertedBlob?.type || getImageMimeType(outputFormat))} 다운로드
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
          업로드한 이미지는 서버로 전송되지 않으며 브라우저에서만 처리됩니다. 변환, 미리보기, 다운로드 파일 생성은
          현재 브라우저에서만 이루어집니다.
        </p>
      </section>

      <ToolSeoSections tool={imageConverterTool} />

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          JSTools 홈으로
        </Link>
      </div>
    </div>
  )
}
