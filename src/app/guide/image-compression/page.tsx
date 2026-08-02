import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const pageTitle = 'JPG 이미지 용량 줄이는 방법 | JSTools'
const pageDescription =
  'JPG 이미지 용량이 커지는 이유, JPG PNG WebP 차이, 브라우저에서 이미지 압축 도구를 사용하는 방법을 정리한 가이드입니다.'
const pageUrl = absoluteUrl('/guide/image-compression')
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
    type: 'article',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
  },
}

function buildArticleSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: pageTitle,
    description: pageDescription,
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

export default function ImageCompressionGuidePage() {
  return (
    <article className="max-w-3xl mx-auto p-6 space-y-8">
      <JsonLd id="image-compression-guide-article-schema" data={buildArticleSchema()} />

      <header className="space-y-3">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            JSTools 홈
          </Link>
          <Link href="/guide" className="text-blue-600 hover:underline">
            가이드 목록
          </Link>
        </div>
        <h1 className="text-3xl font-bold">JPG 이미지 용량 줄이는 방법</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          JPG 이미지는 사진 공유, 블로그 업로드, 쇼핑몰 상세 페이지 등에 자주 쓰입니다. 하지만 원본 사진을 그대로
          사용하면 파일 용량이 커져 업로드와 페이지 로딩이 느려질 수 있습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">이미지 용량이 커지는 이유</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          이미지 파일 크기는 해상도, 색상 정보, 압축률, 저장 형식에 영향을 받습니다. 스마트폰이나 카메라로 찍은
          원본 사진은 가로세로 픽셀이 크고 화질 정보가 많이 들어 있어 웹에서 쓰기에는 불필요하게 큰 경우가 많습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>해상도가 클수록 저장해야 하는 픽셀 수가 늘어납니다.</li>
          <li>압축 품질을 높게 저장하면 화질은 좋지만 파일 용량도 커집니다.</li>
          <li>PNG처럼 투명도와 무손실 저장에 강한 형식은 사진에서 용량이 커질 수 있습니다.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JPG, PNG, WebP 차이</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">JPG</h3>
            <p className="mt-2 text-sm text-gray-700">사진에 적합하고 용량을 줄이기 쉽지만 투명 배경은 지원하지 않습니다.</p>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">PNG</h3>
            <p className="mt-2 text-sm text-gray-700">로고, 아이콘, 투명 배경 이미지에 좋지만 사진에서는 용량이 커질 수 있습니다.</p>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">WebP</h3>
            <p className="mt-2 text-sm text-gray-700">웹용 이미지에 적합하며 같은 품질에서 JPG나 PNG보다 작아지는 경우가 많습니다.</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">이미지 압축 방법</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          웹에서 사용할 이미지는 필요한 크기와 품질에 맞게 줄이는 것이 좋습니다. 사진을 보여주는 목적이라면 JPG나
          WebP로 저장하고, 투명 배경이 필요한 경우에는 PNG 또는 WebP를 고려할 수 있습니다.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>사용할 위치에 맞는 이미지 크기를 먼저 정합니다.</li>
          <li>사진은 JPG 또는 WebP 형식을 우선 검토합니다.</li>
          <li>압축 품질을 낮춰가며 화질과 용량의 균형을 확인합니다.</li>
          <li>압축 후 원본보다 용량이 커졌다면 원본 사용을 고려합니다.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JSTools 이미지 압축 도구 사용 방법</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JSTools 이미지 압축 도구는 JPG, PNG, WebP 파일을 브라우저에서 처리합니다. 파일은 서버로 업로드되지
          않으며, 여러 장을 한 번에 추가하고 개별 파일 또는 ZIP으로 다운로드할 수 있습니다.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>이미지를 드래그하거나 파일 선택 버튼으로 추가합니다.</li>
          <li>품질 슬라이더로 압축 강도를 조절합니다.</li>
          <li>결과 용량과 절감률을 확인합니다.</li>
          <li>개별 다운로드 또는 전체 ZIP 다운로드를 선택합니다.</li>
        </ol>
      </section>

      <section className="rounded-xl border bg-gray-50 p-5 text-center space-y-3">
        <h2 className="text-xl font-semibold">이미지를 바로 압축해 보세요</h2>
        <p className="text-sm text-gray-600">
          별도 설치 없이 브라우저에서 JPG, PNG, WebP 이미지를 압축할 수 있습니다.
        </p>
        <Link
          href="/tools/image/image-compressor"
          className="inline-block px-5 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          JSTools 이미지 압축 도구 사용하기
        </Link>
      </section>
    </article>
  )
}
