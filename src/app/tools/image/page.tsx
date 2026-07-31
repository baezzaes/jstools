import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { imageCompressorTool, imageConverterTool, imageResizerTool } from '@/data/tools'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const imageTools = [
  {
    tool: imageCompressorTool,
    description: '이미지 품질을 조절해 파일 용량을 줄이고 다운로드합니다.',
    features: ['JPG, PNG, WebP 압축', '용량 비교', '개별/ZIP 다운로드'],
    cta: '용량 줄이기',
  },
  {
    tool: imageResizerTool,
    description: '사진의 가로세로 픽셀을 원하는 크기나 비율로 변경합니다.',
    features: ['픽셀 기준 조절', '퍼센트 기준 조절', '비율 유지 옵션'],
    cta: '크기 조절하기',
  },
  {
    tool: imageConverterTool,
    description: 'JPG, PNG, WebP 이미지 파일 형식을 브라우저에서 변환합니다.',
    features: ['JPG 변환', 'PNG 변환', 'WebP 변환'],
    cta: '포맷 변환하기',
  },
]

const pageTitle = '이미지 도구 - 압축, 크기 조절, JPG PNG WebP 변환 | JSTools'
const pageDescription =
  '이미지 용량 줄이기, 사진 크기 조절, JPG·PNG·WebP 포맷 변환 도구를 브라우저에서 무료로 사용하세요. 이미지는 서버로 전송되지 않습니다.'
const pageUrl = absoluteUrl('/tools/image')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
  },
}

function buildBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '이미지 도구',
        item: pageUrl,
      },
    ],
  }
}

function buildItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#itemlist`,
    name: '이미지 도구',
    itemListElement: imageTools.map(({ tool }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: absoluteUrl(tool.path),
    })),
  }
}

export default function ImageToolsPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <JsonLd id="image-tools-breadcrumb-schema" data={buildBreadcrumbSchema()} />
      <JsonLd id="image-tools-itemlist-schema" data={buildItemListSchema()} />

      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">이미지 도구</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          이미지 압축, 크기 조절, 파일 형식 변환을 브라우저에서 바로 처리할 수 있습니다. 업로드한 이미지는
          서버로 전송되지 않습니다.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {imageTools.map(({ tool, description, features, cta }) => (
          <article key={tool.id} className="rounded-lg border p-4 space-y-4 bg-white">
            <div className="space-y-2">
              <p className="text-xs font-medium text-blue-600">이미지 도구</p>
              <h2 className="text-lg font-semibold">{tool.name}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link
              href={tool.path}
              className="inline-block rounded bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
            >
              {cta}
            </Link>
          </article>
        ))}
      </section>

      <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold text-gray-900">어떤 이미지 도구를 선택해야 하나요?</h2>
        <p>
          이미지 용량을 줄여 웹페이지나 메시지에 더 가볍게 올리고 싶다면 이미지 용량 줄이기를 사용하세요. 사진의
          가로세로 픽셀을 바꿔야 한다면 이미지 크기 조절기가 적합합니다.
        </p>
        <p>
          JPG, PNG, WebP처럼 파일 형식 자체를 바꿔야 할 때는 이미지 변환기를 사용하면 됩니다. 목적에 맞는 도구를
          선택하면 불필요한 화질 손실이나 작업 반복을 줄일 수 있습니다.
        </p>
      </section>

      <div className="text-center">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          JSTools 홈으로
        </Link>
      </div>
    </div>
  )
}
