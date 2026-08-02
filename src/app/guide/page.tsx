import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const pageTitle = 'JSTools 가이드 - 이미지 최적화와 웹도구 사용법'
const pageDescription =
  '이미지 최적화, 파일 용량 줄이기, 웹도구 사용법을 쉽게 이해할 수 있는 JSTools 가이드 모음입니다.'
const pageUrl = absoluteUrl('/guide')
const publishedDate = '2026-08-02'

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

const guides = [
  {
    href: '/guide/image-compression',
    title: '이미지 용량 줄이는 방법',
    description: 'JPG 사진 용량을 줄이는 방법과 이미지 품질, 해상도, WebP 변환 기준을 정리합니다.',
    category: '이미지 최적화',
  },
  {
    href: '/guide/jpg-vs-webp',
    title: 'JPG와 WebP 차이',
    description: '파일 용량, 화질, 투명 배경, 호환성을 비교하고 용도에 맞는 이미지 형식을 고르는 기준을 정리합니다.',
    category: '이미지 형식',
  },
  {
    href: '/guide/image-resize',
    title: '이미지 크기 조절 방법',
    description: '사진 픽셀과 가로세로 비율을 이해하고 픽셀 또는 퍼센트 기준으로 사이즈를 바꾸는 방법을 정리합니다.',
    category: '이미지 크기',
  },
]

function buildArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: pageTitle,
    description: pageDescription,
    url: pageUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <JsonLd id="guide-article-schema" data={buildArticleSchema()} />

      <header className="space-y-3 text-center">
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          JSTools 홈으로
        </Link>
        <h1 className="text-3xl font-bold">JSTools 가이드</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          웹도구를 더 쉽게 사용하기 위한 짧고 실용적인 가이드입니다. 먼저 이미지 최적화와 파일 관리에 필요한 내용을
          정리합니다.
        </p>
      </header>

      <section className="grid gap-4">
        {guides.map((guide) => (
          <article key={guide.href} className="border rounded-xl p-4 shadow-sm space-y-3 bg-white">
            <p className="text-xs font-medium text-blue-600">{guide.category}</p>
            <h2 className="text-xl font-semibold">{guide.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{guide.description}</p>
            <Link
              href={guide.href}
              className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              가이드 보기
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="font-semibold text-gray-900">이미지 최적화가 중요한 이유</h2>
        <p className="mt-2">
          이미지 용량과 크기를 적절히 관리하면 페이지 로딩 속도, 공유 편의성, 저장 공간 관리가 좋아집니다. 목적에 맞는
          형식과 조정 방식을 선택하면 화질 손실을 줄이면서 파일을 다루기 쉬워집니다.
        </p>
      </section>
    </div>
  )
}
