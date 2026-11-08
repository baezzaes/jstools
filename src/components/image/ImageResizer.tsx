'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import JSZip from 'jszip'
import Link from 'next/link'
import type { ImageToolProps } from '@/lib/image-locale'
import { createImageTranslator } from '@/lib/image-locale'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { UiIcon } from '@/components/UiIcon'
import { imageResizerTool } from '@/data/tools'
import { trackDownloadClick, trackToolExecute, trackToolResult, trackToolView, type ToolActionSource } from '@/lib/analytics'
import {
  downloadBlob,
  formatBytes,
  getImageFormatLabel,
  getImageOutputName,
  isSupportedImageFile,
  loadImage,
} from '@/lib/imageTools'

type ImageStatus = 'pending' | 'processing' | 'done' | 'error'
type ResizeMode = 'pixels' | 'percent'
type PixelAxis = 'width' | 'height'

type ImageItem = {
  id: string
  file: File
  name: string
  type: string
  originalSize: number
  originalWidth?: number
  originalHeight?: number
  resultWidth?: number
  resultHeight?: number
  originalUrl: string
  resizedBlob?: Blob
  resizedUrl?: string
  resizedSize?: number
  outputName?: string
  status: ImageStatus
  error?: string
}

type ResizeOptions = {
  mode: ResizeMode
  pixelWidth: string
  pixelHeight: string
  keepAspectRatio: boolean
  pixelAxis: PixelAxis
  percent: number
}

type ResizeAction = {
  itemIds: Set<string>
  cancelled: boolean
}

const MIN_DIMENSION = 1
const MAX_DIMENSION = 8000
const MAX_PIXELS = 32_000_000
const PERCENT_PRESETS = [25, 50, 75]

export default function ImageResizerPage({ messages, contentTool, locale = 'ko' }: ImageToolProps = {}) {
  const t = createImageTranslator(messages)
  function clampDimension(value: number) {
    return Math.min(MAX_DIMENSION, Math.max(MIN_DIMENSION, Math.round(value)))
  }

  function parseDimension(value: string) {
    const parsed = Number(value)
    if (!Number.isFinite(parsed)) return null
    return clampDimension(parsed)
  }

  function parsePercent(value: number) {
    if (!Number.isFinite(value)) return 100
    return Math.min(500, Math.max(1, Math.round(value)))
  }

  function isTooLarge(width: number, height: number) {
    return width * height > MAX_PIXELS
  }

  function getResizeDimensions(item: ImageItem, options: ResizeOptions) {
    if (!item.originalWidth || !item.originalHeight) {
      throw new Error(t("이미지 크기를 확인할 수 없습니다."))
    }

    if (options.mode === 'percent') {
      const ratio = parsePercent(options.percent) / 100
      return {
        width: clampDimension(item.originalWidth * ratio),
        height: clampDimension(item.originalHeight * ratio),
      }
    }

    const width = parseDimension(options.pixelWidth)
    const height = parseDimension(options.pixelHeight)

    if (!width && !height) {
      throw new Error(t("가로 또는 세로 크기를 입력해 주세요."))
    }

    if (options.keepAspectRatio) {
      if (options.pixelAxis === 'height' && height) {
        return {
          width: clampDimension((item.originalWidth / item.originalHeight) * height),
          height,
        }
      }

      const targetWidth = width || clampDimension((item.originalWidth / item.originalHeight) * (height as number))
      return {
        width: targetWidth,
        height: clampDimension((item.originalHeight / item.originalWidth) * targetWidth),
      }
    }

    return {
      width: width || item.originalWidth,
      height: height || item.originalHeight,
    }
  }

  async function resizeImage(file: File, width: number, height: number) {
    const image = await loadImage(file)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error(t("이미지를 처리할 수 없습니다."))
    }

    context.clearRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(new Error(t("이미지 크기 조절에 실패했습니다.")))
            return
          }
          resolve(result)
        },
        file.type,
        undefined
      )
    })

    return blob
  }

  const [items, setItems] = useState<ImageItem[]>([])
  const [resizeMode, setResizeMode] = useState<ResizeMode>('pixels')
  const [pixelWidth, setPixelWidth] = useState('')
  const [pixelHeight, setPixelHeight] = useState('')
  const [keepAspectRatio, setKeepAspectRatio] = useState(true)
  const [pixelAxis, setPixelAxis] = useState<PixelAxis>('width')
  const [percent, setPercent] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isZipping, setIsZipping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemsRef = useRef<ImageItem[]>([])
  const actionsRef = useRef(new Set<ResizeAction>())
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    const actions = actionsRef.current
    trackToolView(imageResizerTool)
    return () => {
      mountedRef.current = false
      actions.forEach((action) => { action.cancelled = true })
      actions.clear()
    }
  }, [])

  const completedItems = useMemo(
    () => items.filter((item) => item.status === 'done' && item.resizedBlob),
    [items]
  )
  const isProcessing = items.some((item) => item.status === 'processing' || item.status === 'pending')
  const options: ResizeOptions = { mode: resizeMode, pixelWidth, pixelHeight, keepAspectRatio, pixelAxis, percent }

  const updateItems = (updater: (current: ImageItem[]) => ImageItem[]) => {
    setItems((current) => {
      const next = updater(current)
      itemsRef.current = next
      return next
    })
  }

  const getCurrentOptions = (overrides: Partial<ResizeOptions> = {}): ResizeOptions => ({
    mode: resizeMode,
    pixelWidth,
    pixelHeight,
    keepAspectRatio,
    pixelAxis,
    percent,
    ...overrides,
  })

  const processItem = async (item: ImageItem, nextOptions = options) => {
    if (!isSupportedImageFile(item.file)) return false

    updateItems((current) =>
      current.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, status: 'processing', error: undefined }
          : currentItem
      )
    )

    try {
      const dimensions = getResizeDimensions(item, nextOptions)

      if (isTooLarge(dimensions.width, dimensions.height)) {
        throw new Error([(t("결과 크기는 최대") + ' '), (MAX_PIXELS.toLocaleString()), (' ' + t("픽셀까지 지원합니다."))].join(''))
      }

      const resizedBlob = await resizeImage(item.file, dimensions.width, dimensions.height)
      const resizedUrl = URL.createObjectURL(resizedBlob)

      updateItems((current) =>
        current.map((currentItem) => {
          if (currentItem.id !== item.id) return currentItem
          if (currentItem.resizedUrl) URL.revokeObjectURL(currentItem.resizedUrl)

          return {
            ...currentItem,
            resultWidth: dimensions.width,
            resultHeight: dimensions.height,
            resizedBlob,
            resizedUrl,
            resizedSize: resizedBlob.size,
            outputName: getImageOutputName(item.name, 'resized', resizedBlob.type || item.type),
            status: 'done',
            error: undefined,
          }
        })
      )
      return true
    } catch (error) {
      updateItems((current) =>
        current.map((currentItem) =>
          currentItem.id === item.id
            ? {
                ...currentItem,
                status: 'error',
                error: error instanceof Error ? error.message : t("이미지 처리 중 오류가 발생했습니다."),
              }
            : currentItem
        )
      )
      return false
    }
  }

  const processAction = async (actionItems: ImageItem[], nextOptions: ResizeOptions, actionSource: ToolActionSource) => {
    trackToolExecute(imageResizerTool, { actionSource, fileCount: actionItems.length })
    // Keep the existing attempt event for an apply with no supported files,
    // but do not report an empty action as a successful result.
    if (actionItems.length === 0) return

    const action: ResizeAction = { itemIds: new Set(actionItems.map((item) => item.id)), cancelled: false }
    actionsRef.current.add(action)
    try {
      // Capture this action's files/options; other batches cannot affect its counts.
      const outcomes = await Promise.all(actionItems.map((item) => processItem(item, nextOptions)))
      if (!mountedRef.current || action.cancelled) return

      const successCount = outcomes.filter(Boolean).length
      trackToolResult(imageResizerTool, {
        actionSource,
        fileCount: actionItems.length,
        successCount,
        failureCount: actionItems.length - successCount,
      })
    } finally {
      actionsRef.current.delete(action)
    }
  }

  const addFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList)
    const loadedItems: ImageItem[] = []
    let firstImageDimensions: { width: number; height: number } | null = null

    for (const file of files) {
      const baseItem: ImageItem = {
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        name: file.name,
        type: file.type,
        originalSize: file.size,
        originalUrl: URL.createObjectURL(file),
        status: isSupportedImageFile(file) ? 'pending' : 'error',
        error: isSupportedImageFile(file) ? undefined : t("JPG, JPEG, PNG, WEBP 파일만 지원합니다."),
      }

      if (!isSupportedImageFile(file)) {
        loadedItems.push(baseItem)
        continue
      }

      try {
        const image = await loadImage(file)
        const item = {
          ...baseItem,
          originalWidth: image.naturalWidth,
          originalHeight: image.naturalHeight,
        }

        firstImageDimensions ||= { width: image.naturalWidth, height: image.naturalHeight }
        loadedItems.push(item)
      } catch (error) {
        loadedItems.push({
          ...baseItem,
          status: 'error',
          error: error instanceof Error ? error.message : t("이미지 크기를 읽을 수 없습니다."),
        })
      }
    }

    const shouldUseFirstDimensions = itemsRef.current.length === 0 && Boolean(firstImageDimensions) && !pixelWidth && !pixelHeight
    const nextPixelWidth =
      shouldUseFirstDimensions && firstImageDimensions ? String(firstImageDimensions.width) : pixelWidth
    const nextPixelHeight =
      shouldUseFirstDimensions && firstImageDimensions ? String(firstImageDimensions.height) : pixelHeight

    if (shouldUseFirstDimensions) {
      setPixelWidth(nextPixelWidth)
      setPixelHeight(nextPixelHeight)
    }

    updateItems((current) => [...current, ...loadedItems])

    const nextOptions = getCurrentOptions({
      pixelWidth: nextPixelWidth,
      pixelHeight: nextPixelHeight,
    })
    const pendingItems = loadedItems.filter((item) => item.status === 'pending')
    if (pendingItems.length > 0) {
      void processAction(pendingItems, nextOptions, 'file_add')
    }
  }

  const removeItem = (id: string) => {
    actionsRef.current.forEach((action) => {
      if (action.itemIds.has(id)) action.cancelled = true
    })
    updateItems((current) => {
      const target = current.find((item) => item.id === id)
      if (target) {
        URL.revokeObjectURL(target.originalUrl)
        if (target.resizedUrl) URL.revokeObjectURL(target.resizedUrl)
      }
      return current.filter((item) => item.id !== id)
    })
  }

  const clearAll = () => {
    actionsRef.current.forEach((action) => { action.cancelled = true })
    updateItems((current) => {
      current.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl)
        if (item.resizedUrl) URL.revokeObjectURL(item.resizedUrl)
      })
      return []
    })
  }

  const applyResize = () => {
    const nextOptions = getCurrentOptions()
    void processAction(items.filter((item) => isSupportedImageFile(item.file)), nextOptions, 'apply')
  }

  const downloadAll = async () => {
    if (completedItems.length === 0) return
    setIsZipping(true)

    try {
      const zip = new JSZip()
      completedItems.forEach((item) => {
        zip.file(item.outputName || getImageOutputName(item.name, 'resized', item.type), item.resizedBlob as Blob)
      })

      const fileCount = Object.values(zip.files).filter((file) => !file.dir).length
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      trackDownloadClick(imageResizerTool, 'zip', { downloadType: 'zip', fileCount })
      downloadBlob(zipBlob, 'jstools-resized-images.zip')
    } finally {
      setIsZipping(false)
    }
  }

  const updatePixelWidth = (value: string) => {
    setPixelAxis('width')
    setPixelWidth(value)

    if (keepAspectRatio && items[0]?.originalWidth && items[0]?.originalHeight) {
      const width = parseDimension(value)
      if (width) {
        setPixelHeight(String(clampDimension((items[0].originalHeight / items[0].originalWidth) * width)))
      }
    }
  }

  const updatePixelHeight = (value: string) => {
    setPixelAxis('height')
    setPixelHeight(value)

    if (keepAspectRatio && items[0]?.originalWidth && items[0]?.originalHeight) {
      const height = parseDimension(value)
      if (height) {
        setPixelWidth(String(clampDimension((items[0].originalWidth / items[0].originalHeight) * height)))
      }
    }
  }

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.originalUrl)
        if (item.resizedUrl) URL.revokeObjectURL(item.resizedUrl)
      })
    }
  }, [])

  return (
    <div className="tool-page space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold">{t("이미지 크기 조절기")}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t("JPG, PNG, WEBP 이미지의 가로세로 크기를 브라우저 안에서 조절합니다. 업로드한 이미지는 서버로 전송되지 않으며 브라우저에서만 처리됩니다.")}</p>
      </header>

      <div className="resizer-workspace">
      <div className="resizer-controls">
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
        className={`resizer-upload ${isDragging ? 'is-dragging' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          aria-label={t("크기를 조절할 이미지 파일 선택")}
          className="hidden"
          onChange={(event) => {
            if (event.target.files) void addFiles(event.target.files)
            event.currentTarget.value = ''
          }}
        />
        <div className="space-y-3">
          <UiIcon name="image" className="mx-auto text-blue-700" />
          <h2 className="text-lg font-semibold">{t("이미지를 끌어다 놓으세요")}</h2>
          <p className="text-sm text-gray-600">{t("JPG, JPEG, PNG, WEBP 파일을 여러 장 선택할 수 있습니다.")}</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            {t("파일 선택")}</button>
          <p className="text-sm text-gray-600">{t("파일을 추가하면 현재 설정으로 자동 처리됩니다.")}</p>
        </div>
      </section>

      <section className="resizer-settings space-y-4">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">{t("크기 조절 설정")}</h2>
            <p className="text-sm text-gray-600">
              {t("원본보다 크게 확대하면 이미지가 흐려질 수 있습니다. 크기 조절은 압축 품질 설정과 별도로 동작합니다.")}</p>
          </div>
          <div className="resizer-modes" role="group" aria-label={t("크기 조절 기준")}>
            <button
              type="button"
              onClick={() => setResizeMode('pixels')}
              aria-pressed={resizeMode === 'pixels'}
              className={`rounded px-3 py-2 ${resizeMode === 'pixels' ? 'bg-black text-white' : 'text-gray-700'}`}
            >
              {t("픽셀 기준")}</button>
            <button
              type="button"
              onClick={() => setResizeMode('percent')}
              aria-pressed={resizeMode === 'percent'}
              className={`rounded px-3 py-2 ${resizeMode === 'percent' ? 'bg-black text-white' : 'text-gray-700'}`}
            >
              {t("퍼센트 기준")}</button>
          </div>
        </div>

        {resizeMode === 'pixels' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-sm">
                <span className="font-medium">{t("가로 크기(px)")}</span>
                <input
                  type="number"
                  min={MIN_DIMENSION}
                  max={MAX_DIMENSION}
                  value={pixelWidth}
                  onChange={(event) => updatePixelWidth(event.target.value)}
                  className="w-full rounded border px-3 py-2"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium">{t("세로 크기(px)")}</span>
                <input
                  type="number"
                  min={MIN_DIMENSION}
                  max={MAX_DIMENSION}
                  value={pixelHeight}
                  onChange={(event) => updatePixelHeight(event.target.value)}
                  className="w-full rounded border px-3 py-2"
                />
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={keepAspectRatio}
                onChange={(event) => setKeepAspectRatio(event.target.checked)}
              />
              {t("가로세로 비율 유지")}</label>
            <p className="text-xs text-gray-500">
              {t("비율 유지가 켜진 상태에서는 마지막으로 바꾼 가로 또는 세로 값을 기준으로 각 이미지의 원본 비율을 적용합니다.")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {PERCENT_PRESETS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPercent(value)}
                  className={`rounded border px-4 py-2 text-sm ${
                    percent === value ? 'border-black bg-black text-white' : 'border-gray-300'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
            <label className="block space-y-1 text-sm">
              <span className="font-medium">{t("직접 입력(%)")}</span>
              <input
                type="number"
                min={1}
                max={500}
                value={percent}
                onChange={(event) => setPercent(parsePercent(Number(event.target.value)))}
                className="w-full rounded border px-3 py-2 md:max-w-xs"
              />
            </label>
          </div>
        )}

        <p className="text-sm text-gray-600">{t("설정을 바꾼 뒤에는 ‘크기 적용’을 눌러 결과를 갱신하세요.")}</p>
        <div className="resizer-actions">
          <button
            type="button"
            onClick={applyResize}
            disabled={items.length === 0 || isProcessing}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            {t("크기 적용")}</button>
          {items.length === 0 && <p className="text-sm text-gray-600">{t("이미지를 추가하면 크기를 적용할 수 있습니다.")}</p>}
        </div>
      </section>
      </div>

      <section className="resizer-results space-y-4" aria-labelledby="resize-results-heading" aria-busy={isProcessing}>
        <div className="result-heading">
          <h2 id="resize-results-heading">{t("처리 결과")}</h2>
          <p className="text-sm text-gray-600" role="status">
            {isProcessing ? t("크기 조절 중...") : [(t("완료") + ' '), (completedItems.length), (t("개 · 오류") + ' '), (items.filter(item => item.status === 'error').length), t("개")].join('')}
          </p>
        </div>
        <div className="result-toolbar">
          <button
            type="button"
            onClick={downloadAll}
            disabled={completedItems.length === 0 || isZipping || isProcessing}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300 hover:bg-green-700 transition"
          >
            {isZipping ? t("ZIP 생성 중...") : t("전체 ZIP 다운로드")}
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={items.length === 0}
            className="secondary-button"
          >
            {t("전체 초기화")}</button>
        </div>

        {items.length === 0 ? (
          <div className="empty-results">
            <UiIcon name="image" />
            <h3 className="font-semibold text-gray-900">{t("아직 추가된 이미지가 없습니다.")}</h3>
            <p className="mt-2 text-sm">{t("파일을 선택하면 원본과 결과의 크기·용량을 비교할 수 있습니다.")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="file-result space-y-3">
                <div className="flex items-start gap-3">
                {/* Blob preview URLs are local-only and cannot be optimized by next/image. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.resizedUrl || item.originalUrl}
                  alt={["", (item.name), (' ' + t("미리보기"))].join('')}
                  className="h-14 w-14 rounded border object-contain"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <span className={`status-label ${item.status === 'error' ? 'error' : ''}`}>{item.status === 'done' ? t("✓ 완료") : item.status === 'error' ? t("! 오류") : t("처리 중")}</span>
                      <h3 className="font-semibold text-sm mt-1">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.type || t("알 수 없는 형식")}</p>
                      {item.status === 'done' && (
                        <p className="text-xs text-gray-500">
                          {t("결과 형식:")}{' '}{t(getImageFormatLabel(item.resizedBlob?.type || item.type))}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="self-start text-sm text-red-600 hover:underline"
                    >
                      {t("삭제")}</button>
                  </div>
                </div>
                </div>

                  {item.status === 'error' ? (
                    <p role="alert" className="rounded bg-red-50 p-2 text-sm text-red-600">{t(item.error || '이미지 처리 중 오류가 발생했습니다.')}</p>
                  ) : (
                    <div className="file-facts">
                      <div>
                        <strong className="block">{t("원본 크기")}</strong>
                        {item.originalWidth && item.originalHeight
                          ? `${item.originalWidth} x ${item.originalHeight}px`
                          : '-'}
                      </div>
                      <div>
                        <strong className="block">{t("결과 크기")}</strong>
                        {item.status === 'done' && item.resultWidth && item.resultHeight
                          ? `${item.resultWidth} x ${item.resultHeight}px`
                          : t("처리 중")}
                      </div>
                      <div>
                        <strong className="block">{t("원본 용량")}</strong>
                        {formatBytes(item.originalSize)}
                      </div>
                      <div>
                        <strong className="block">{t("결과 용량")}</strong>
                        {item.status === 'done' && item.resizedSize ? formatBytes(item.resizedSize) : t("처리 중")}
                      </div>
                      <div>
                        <strong className="block">{t("상태")}</strong>
                        {item.status === 'done' ? t("완료") : t("진행 중")}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={!item.resizedBlob || item.status !== 'done'}
                      onClick={() =>
                        item.resizedBlob && (() => {
                          trackDownloadClick(imageResizerTool, item.resizedBlob.type || item.outputName || item.type, {
                            downloadType: 'individual', fileCount: 1,
                          })
                          downloadBlob(item.resizedBlob, item.outputName || getImageOutputName(item.name, 'resized', item.type))
                        })()
                      }
                      className="px-3 py-2 text-sm bg-black text-white rounded disabled:bg-gray-300 hover:bg-gray-800 transition"
                    >
                      {t(getImageFormatLabel(item.resizedBlob?.type || item.type))} {t("다운로드")}</button>
                  </div>
              </div>
            ))}
          </div>
        )}
      </section>
      </div>

      <section className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="font-semibold text-gray-900">{t("개인정보 안내")}</h2>
        <p className="mt-2">
          {t("업로드한 이미지는 서버로 전송되지 않으며 브라우저에서만 처리됩니다. 미리보기와 다운로드 파일은 현재 화면에서 임시로 생성되고, 페이지를 닫거나 전체 초기화를 누르면 제거됩니다.")}</p>
      </section>

      <ToolSeoSections tool={contentTool || imageResizerTool} locale={locale} />

      <div className="text-center mt-8">
        <Link href={locale === 'en' ? '/en' : '/'} className="text-sm text-blue-600 hover:underline">
          {t("JSTools 홈으로")}</Link>
      </div>
    </div>
  )
}
