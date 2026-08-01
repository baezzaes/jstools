'use client'

import { PointerEvent, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ToolSeoSections } from '@/components/ToolSeoSections'
import { imageCropperTool } from '@/data/tools'
import { trackDownloadClick, trackToolExecute, trackToolView } from '@/lib/analytics'
import {
  createCanvasBlob,
  downloadBlob,
  formatBytes,
  getImageFormatLabel,
  getImageOutputName,
  isSupportedImageFile,
  loadImage,
} from '@/lib/imageTools'

type AspectOption = 'free' | '1:1' | '4:3' | '3:4' | '16:9' | '9:16'
type DragMode = 'move' | 'resize'

type CropRect = {
  x: number
  y: number
  width: number
  height: number
}

type LoadedImage = {
  file: File
  name: string
  type: string
  size: number
  width: number
  height: number
  originalUrl: string
}

type CroppedResult = {
  blob: Blob
  url: string
  width: number
  height: number
  fileName: string
}

const ASPECT_OPTIONS: AspectOption[] = ['free', '1:1', '4:3', '3:4', '16:9', '9:16']
const CANVAS_WIDTH = 900
const CANVAS_HEIGHT = 560
const MIN_CROP_SIZE = 24
const MAX_PIXELS = 32_000_000

function getAspectRatio(option: AspectOption) {
  if (option === '1:1') return 1
  if (option === '4:3') return 4 / 3
  if (option === '3:4') return 3 / 4
  if (option === '16:9') return 16 / 9
  if (option === '9:16') return 9 / 16
  return null
}

function getAspectLabel(option: AspectOption) {
  return option === 'free' ? '자유' : option
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getInitialCropRect(imageWidth: number, imageHeight: number, aspect: AspectOption): CropRect {
  const ratio = getAspectRatio(aspect)
  let width = imageWidth * 0.72
  let height = imageHeight * 0.72

  if (ratio) {
    if (width / height > ratio) {
      width = height * ratio
    } else {
      height = width / ratio
    }
  }

  return {
    x: (imageWidth - width) / 2,
    y: (imageHeight - height) / 2,
    width,
    height,
  }
}

function constrainCropRect(rect: CropRect, imageWidth: number, imageHeight: number): CropRect {
  const width = clamp(rect.width, MIN_CROP_SIZE, imageWidth)
  const height = clamp(rect.height, MIN_CROP_SIZE, imageHeight)
  return {
    x: clamp(rect.x, 0, imageWidth - width),
    y: clamp(rect.y, 0, imageHeight - height),
    width,
    height,
  }
}

function resizeCropRect(rect: CropRect, nextWidth: number, nextHeight: number, imageWidth: number, imageHeight: number) {
  return constrainCropRect(
    {
      ...rect,
      width: nextWidth,
      height: nextHeight,
    },
    imageWidth,
    imageHeight
  )
}

export default function ImageCropperPage() {
  const [loadedImage, setLoadedImage] = useState<LoadedImage | null>(null)
  const [cropRect, setCropRect] = useState<CropRect | null>(null)
  const [aspect, setAspect] = useState<AspectOption>('free')
  const [zoom, setZoom] = useState(1)
  const [result, setResult] = useState<CroppedResult | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [dragState, setDragState] = useState<{
    mode: DragMode
    pointerId: number
    startX: number
    startY: number
    startRect: CropRect
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageElementRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    trackToolView(imageCropperTool)
  }, [])

  const imageMetrics = useMemo(() => {
    if (!loadedImage) return null
    const baseScale = Math.min(CANVAS_WIDTH / loadedImage.width, CANVAS_HEIGHT / loadedImage.height, 1)
    const scale = baseScale * zoom
    const drawWidth = loadedImage.width * scale
    const drawHeight = loadedImage.height * scale
    return {
      scale,
      x: (CANVAS_WIDTH - drawWidth) / 2,
      y: (CANVAS_HEIGHT - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    }
  }, [loadedImage, zoom])

  const displayCropRect = useMemo(() => {
    if (!cropRect || !imageMetrics) return null
    return {
      x: imageMetrics.x + cropRect.x * imageMetrics.scale,
      y: imageMetrics.y + cropRect.y * imageMetrics.scale,
      width: cropRect.width * imageMetrics.scale,
      height: cropRect.height * imageMetrics.scale,
    }
  }, [cropRect, imageMetrics])

  const resetResult = () => {
    setResult((current) => {
      if (current) URL.revokeObjectURL(current.url)
      return null
    })
  }

  const clearAll = () => {
    if (loadedImage) URL.revokeObjectURL(loadedImage.originalUrl)
    resetResult()
    setLoadedImage(null)
    setCropRect(null)
    setZoom(1)
    setAspect('free')
    setError('')
    imageElementRef.current = null
  }

  const loadFile = async (file: File) => {
    setError('')
    resetResult()

    if (!isSupportedImageFile(file)) {
      setError('JPG, JPEG, PNG, WEBP 파일만 지원합니다.')
      return
    }
    if (file.size === 0) {
      setError('0바이트 파일은 자를 수 없습니다.')
      return
    }

    try {
      const image = await loadImage(file)
      if (image.naturalWidth * image.naturalHeight > MAX_PIXELS) {
        setError(`이미지는 최대 ${MAX_PIXELS.toLocaleString()} 픽셀까지 처리할 수 있습니다.`)
        return
      }

      if (loadedImage) URL.revokeObjectURL(loadedImage.originalUrl)
      const originalUrl = URL.createObjectURL(file)
      const nextImage = {
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        width: image.naturalWidth,
        height: image.naturalHeight,
        originalUrl,
      }

      const viewImage = new Image()
      viewImage.src = originalUrl
      await viewImage.decode()
      imageElementRef.current = viewImage
      setLoadedImage(nextImage)
      setCropRect(getInitialCropRect(nextImage.width, nextImage.height, aspect))
      setZoom(1)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : '이미지 디코딩에 실패했습니다.')
    }
  }

  const handleFiles = (fileList: FileList | File[]) => {
    const file = Array.from(fileList).find((item) => item instanceof File)
    if (!file) {
      setError('이미지 파일을 선택해 주세요.')
      return
    }
    void loadFile(file)
  }

  const updateAspect = (nextAspect: AspectOption) => {
    setAspect(nextAspect)
    resetResult()
    if (!loadedImage || !cropRect) return

    const ratio = getAspectRatio(nextAspect)
    if (!ratio) {
      setCropRect(constrainCropRect(cropRect, loadedImage.width, loadedImage.height))
      return
    }

    let width = cropRect.width
    let height = width / ratio
    if (height > loadedImage.height) {
      height = loadedImage.height
      width = height * ratio
    }
    if (width > loadedImage.width) {
      width = loadedImage.width
      height = width / ratio
    }

    setCropRect(
      constrainCropRect(
        {
          x: cropRect.x + (cropRect.width - width) / 2,
          y: cropRect.y + (cropRect.height - height) / 2,
          width,
          height,
        },
        loadedImage.width,
        loadedImage.height
      )
    )
  }

  const getPointerImagePoint = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !imageMetrics) return null
    const bounds = canvasRef.current.getBoundingClientRect()
    const canvasX = ((event.clientX - bounds.left) / bounds.width) * CANVAS_WIDTH
    const canvasY = ((event.clientY - bounds.top) / bounds.height) * CANVAS_HEIGHT
    return {
      x: (canvasX - imageMetrics.x) / imageMetrics.scale,
      y: (canvasY - imageMetrics.y) / imageMetrics.scale,
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!loadedImage || !cropRect || !imageMetrics) return
    const point = getPointerImagePoint(event)
    if (!point) return

    const resizeThreshold = MIN_CROP_SIZE / imageMetrics.scale
    const nearResizeHandle =
      point.x >= cropRect.x + cropRect.width - resizeThreshold &&
      point.x <= cropRect.x + cropRect.width + resizeThreshold &&
      point.y >= cropRect.y + cropRect.height - resizeThreshold &&
      point.y <= cropRect.y + cropRect.height + resizeThreshold

    const insideCrop =
      point.x >= cropRect.x &&
      point.x <= cropRect.x + cropRect.width &&
      point.y >= cropRect.y &&
      point.y <= cropRect.y + cropRect.height

    if (!insideCrop && !nearResizeHandle) return

    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Some automated or older touch environments can fail pointer capture.
    }
    setDragState({
      mode: nearResizeHandle ? 'resize' : 'move',
      pointerId: event.pointerId,
      startX: point.x,
      startY: point.y,
      startRect: cropRect,
    })
  }

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!dragState || !loadedImage) return
    const point = getPointerImagePoint(event)
    if (!point) return
    resetResult()

    const deltaX = point.x - dragState.startX
    const deltaY = point.y - dragState.startY

    if (dragState.mode === 'move') {
      setCropRect(
        constrainCropRect(
          {
            ...dragState.startRect,
            x: dragState.startRect.x + deltaX,
            y: dragState.startRect.y + deltaY,
          },
          loadedImage.width,
          loadedImage.height
        )
      )
      return
    }

    const ratio = getAspectRatio(aspect)
    let nextWidth = dragState.startRect.width + deltaX
    let nextHeight = dragState.startRect.height + deltaY
    if (ratio) {
      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        nextHeight = nextWidth / ratio
      } else {
        nextWidth = nextHeight * ratio
      }
    }

    setCropRect(resizeCropRect(dragState.startRect, nextWidth, nextHeight, loadedImage.width, loadedImage.height))
  }

  const handlePointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    if (dragState?.pointerId === event.pointerId) {
      setDragState(null)
    }
  }

  const cropImage = async () => {
    if (!loadedImage || !cropRect || !imageElementRef.current || isProcessing) return
    trackToolExecute(imageCropperTool)
    setError('')
    setIsProcessing(true)
    resetResult()

    try {
      const sx = Math.round(cropRect.x)
      const sy = Math.round(cropRect.y)
      const sw = Math.max(1, Math.round(cropRect.width))
      const sh = Math.max(1, Math.round(cropRect.height))

      if (sw < 2 || sh < 2) {
        throw new Error('자르기 영역이 너무 작습니다.')
      }

      const outputCanvas = document.createElement('canvas')
      outputCanvas.width = sw
      outputCanvas.height = sh
      const context = outputCanvas.getContext('2d')
      if (!context) {
        throw new Error('이미지를 처리할 수 없습니다.')
      }

      if (loadedImage.type === 'image/jpeg') {
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, sw, sh)
      } else {
        context.clearRect(0, 0, sw, sh)
      }

      context.drawImage(imageElementRef.current, sx, sy, sw, sh, 0, 0, sw, sh)
      const blob = await createCanvasBlob(
        outputCanvas,
        loadedImage.type,
        loadedImage.type === 'image/jpeg' || loadedImage.type === 'image/webp' ? 0.92 : undefined
      )
      const url = URL.createObjectURL(blob)
      setResult({
        blob,
        url,
        width: sw,
        height: sh,
        fileName: getImageOutputName(loadedImage.name, 'cropped', blob.type || loadedImage.type),
      })
    } catch (cropError) {
      setError(cropError instanceof Error ? cropError.message : '이미지 자르기에 실패했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    context.fillStyle = '#f8fafc'
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    if (!loadedImage || !imageElementRef.current || !imageMetrics || !displayCropRect) {
      context.fillStyle = '#64748b'
      context.font = '24px sans-serif'
      context.textAlign = 'center'
      context.fillText('이미지를 선택해 주세요', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
      return
    }

    context.drawImage(imageElementRef.current, imageMetrics.x, imageMetrics.y, imageMetrics.width, imageMetrics.height)
    context.fillStyle = 'rgba(15, 23, 42, 0.55)'
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    context.clearRect(displayCropRect.x, displayCropRect.y, displayCropRect.width, displayCropRect.height)
    context.drawImage(
      imageElementRef.current,
      cropRect?.x || 0,
      cropRect?.y || 0,
      cropRect?.width || loadedImage.width,
      cropRect?.height || loadedImage.height,
      displayCropRect.x,
      displayCropRect.y,
      displayCropRect.width,
      displayCropRect.height
    )
    context.strokeStyle = '#ffffff'
    context.lineWidth = 4
    context.strokeRect(displayCropRect.x, displayCropRect.y, displayCropRect.width, displayCropRect.height)
    context.fillStyle = '#ffffff'
    context.fillRect(displayCropRect.x + displayCropRect.width - 18, displayCropRect.y + displayCropRect.height - 18, 18, 18)
    context.strokeStyle = '#111827'
    context.lineWidth = 2
    context.strokeRect(displayCropRect.x + displayCropRect.width - 18, displayCropRect.y + displayCropRect.height - 18, 18, 18)
  }, [cropRect, displayCropRect, imageMetrics, loadedImage])

  useEffect(() => {
    return () => {
      if (loadedImage) URL.revokeObjectURL(loadedImage.originalUrl)
      if (result) URL.revokeObjectURL(result.url)
    }
  }, [loadedImage, result])

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <header className="space-y-3 text-center">
        <h1 className="text-2xl font-bold">이미지 자르기</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          JPG, PNG, WebP 이미지를 원하는 영역으로 자릅니다. 업로드한 이미지는 서버로 전송되지 않으며
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
          handleFiles(event.dataTransfer.files)
        }}
        className={`rounded-lg border-2 border-dashed p-6 text-center transition ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-label="자를 이미지 파일 선택"
          className="hidden"
          onChange={(event) => {
            if (event.target.files) handleFiles(event.target.files)
            event.currentTarget.value = ''
          }}
        />
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">이미지를 선택하세요</h2>
          <p className="text-sm text-gray-600">JPG, JPEG, PNG, WEBP 파일 1장을 선택할 수 있습니다.</p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            파일 선택
          </button>
        </div>
      </section>

      {error && <p className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</p>}

      <section className="border rounded-lg p-4 space-y-4 bg-white">
        <div className="space-y-2">
          <h2 className="font-semibold">자르기 편집</h2>
          <p className="text-sm text-gray-600">
            자르기 영역을 드래그해 이동하고 오른쪽 아래 핸들을 잡아 크기를 조절하세요. 원본보다 확대해도 새 화질이
            생기지는 않습니다.
          </p>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="block w-full max-h-[560px] touch-none rounded border bg-gray-50"
        />

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold">자르기 비율</h3>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              {ASPECT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateAspect(option)}
                  className={`rounded border px-3 py-2 text-sm ${
                    aspect === option ? 'border-black bg-black text-white' : 'border-gray-300'
                  }`}
                >
                  {getAspectLabel(option)}
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-2 text-sm">
            <span className="font-semibold">확대·축소 {Math.round(zoom * 100)}%</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(event) => {
                setZoom(Number(event.target.value))
                resetResult()
              }}
              aria-label="이미지 확대 축소"
              className="w-full"
            />
          </label>
        </div>

        <div className="grid gap-3 text-sm md:grid-cols-3">
          <div>
            <strong className="block">원본 크기</strong>
            {loadedImage ? `${loadedImage.width} x ${loadedImage.height}px` : '-'}
          </div>
          <div>
            <strong className="block">선택 영역</strong>
            {cropRect ? `${Math.round(cropRect.width)} x ${Math.round(cropRect.height)}px` : '-'}
          </div>
          <div>
            <strong className="block">결과 크기</strong>
            {result ? `${result.width} x ${result.height}px` : '-'}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={cropImage}
            disabled={!loadedImage || !cropRect || isProcessing}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 hover:bg-blue-700 transition"
          >
            {isProcessing ? '자르는 중...' : '자르기 실행'}
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            새 이미지 선택
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={!loadedImage && !result}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:bg-gray-300 hover:bg-gray-800 transition"
          >
            전체 초기화
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">결과 미리보기</h2>
        {result ? (
          <div className="rounded-lg border p-4 space-y-3">
            {/* Blob preview URLs are local-only and cannot be optimized by next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.url} alt="자른 이미지 미리보기" className="max-h-80 rounded border object-contain" />
            <div className="grid gap-2 text-sm md:grid-cols-3">
              <div>
                <strong className="block">결과 크기</strong>
                {result.width} x {result.height}px
              </div>
              <div>
                <strong className="block">결과 용량</strong>
                {formatBytes(result.blob.size)}
              </div>
              <div>
                <strong className="block">결과 형식</strong>
                {getImageFormatLabel(result.blob.type)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                trackDownloadClick(imageCropperTool, result.blob.type || result.fileName)
                downloadBlob(result.blob, result.fileName)
              }}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              다운로드
            </button>
          </div>
        ) : (
          <div className="rounded-lg border p-4 text-center text-sm text-gray-500">
            자르기를 실행하면 결과 이미지가 여기에 표시됩니다.
          </div>
        )}
      </section>

      <section className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="font-semibold text-gray-900">개인정보 안내</h2>
        <p className="mt-2">
          업로드한 이미지는 서버로 전송되지 않으며 브라우저에서만 처리됩니다. 자르기, 미리보기, 다운로드 파일 생성은
          현재 브라우저에서만 이루어집니다.
        </p>
      </section>

      <ToolSeoSections tool={imageCropperTool} />

      <div className="text-center mt-8">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          JSTools 홈으로
        </Link>
      </div>
    </div>
  )
}
