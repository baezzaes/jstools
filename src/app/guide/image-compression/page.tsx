import type { Metadata } from 'next'
import Link from 'next/link'
import { GuideCtaLink } from '@/components/GuideCtaLink'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const pageTitle = '사진 용량 줄이는 방법 - JPG 이미지 압축 무료 도구 | JSTools'
const pageDescription =
  '사진과 JPG 이미지 용량을 줄이는 방법을 알아보세요. 품질 손상을 줄이고 무료 온라인 이미지 압축 도구로 파일 크기를 줄일 수 있습니다.'
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
        <h1 className="text-3xl font-bold">사진 용량 줄이는 방법 - JPG 이미지 압축 가이드</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          사진 파일이 너무 커서 업로드가 느리거나 첨부가 되지 않는 경우가 있습니다. JPG 이미지 압축, 해상도 조절,
          WebP 변환을 적절히 사용하면 화질 손실을 줄이면서 파일 크기를 관리할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">사진 용량이 커지는 이유</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          최근 스마트폰 카메라는 고해상도 사진을 기본으로 저장합니다. 원본 사진은 픽셀 수가 많고 색상 정보도 많이
          담고 있어 선명하지만, 웹 업로드나 메신저 첨부에는 부담스러운 파일이 될 수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>스마트폰 카메라 해상도가 높아지면서 원본 사진의 픽셀 수가 커졌습니다.</li>
          <li>원본 JPG는 촬영 정보를 많이 보존하기 때문에 파일 용량이 커질 수 있습니다.</li>
          <li>웹사이트, 블로그, 쇼핑몰에 큰 사진을 그대로 올리면 로딩 속도와 업로드 시간이 느려집니다.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JPG 이미지 용량을 줄이는 방법</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JPG 용량을 줄이는 핵심은 화질과 파일 크기의 균형입니다. 무조건 가장 낮은 품질로 압축하기보다, 실제로 보여줄
          크기와 용도에 맞춰 조절하는 것이 좋습니다.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">이미지 품질 조절</h3>
            <p className="mt-2 text-sm text-gray-700">
              압축 품질을 낮추면 파일 크기가 줄어듭니다. 너무 낮추면 흐림이나 깨짐이 보일 수 있습니다.
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">해상도 변경</h3>
            <p className="mt-2 text-sm text-gray-700">
              실제 표시 크기보다 큰 사진은 가로세로 픽셀을 줄이면 용량이 크게 줄어들 수 있습니다.
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <h3 className="font-semibold">WebP 변환</h3>
            <p className="mt-2 text-sm text-gray-700">
              웹에서 사용할 이미지라면 WebP로 변환해 더 작은 파일로 저장할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JPG, PNG, WebP 차이</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 font-semibold">형식</th>
                <th className="p-3 font-semibold">적합한 용도</th>
                <th className="p-3 font-semibold">장점</th>
                <th className="p-3 font-semibold">주의점</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">JPG</td>
                <td className="p-3">사진, 블로그 이미지</td>
                <td className="p-3">사진 용량을 줄이기 쉬움</td>
                <td className="p-3">투명 배경을 지원하지 않음</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">PNG</td>
                <td className="p-3">로고, 아이콘, 투명 배경</td>
                <td className="p-3">선명한 이미지와 투명도 유지</td>
                <td className="p-3">사진에서는 용량이 커질 수 있음</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-900">WebP</td>
                <td className="p-3">웹사이트 이미지</td>
                <td className="p-3">작은 용량과 좋은 화질 균형</td>
                <td className="p-3">일부 오래된 환경에서는 확인 필요</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JSTools 이미지 압축기 사용 방법</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JSTools 이미지 압축기는 브라우저에서 JPG, PNG, WebP 이미지를 처리합니다. 선택한 이미지는 서버로 업로드되지
          않으며, 압축 결과를 개별 파일 또는 ZIP으로 다운로드할 수 있습니다.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>이미지 선택 버튼을 누르거나 사진 파일을 끌어다 놓습니다.</li>
          <li>품질을 조절하고 압축 결과를 확인합니다.</li>
          <li>압축된 파일을 개별 다운로드하거나 전체 ZIP으로 다운로드합니다.</li>
        </ol>
      </section>

      <section className="rounded-xl border bg-gray-50 p-5 text-center space-y-3">
        <h2 className="text-xl font-semibold">사진 용량을 바로 줄여보세요</h2>
        <p className="text-sm text-gray-600">
          설치 없이 브라우저에서 JPG, PNG, WebP 이미지를 압축할 수 있습니다.
        </p>
        <GuideCtaLink
          href="/tools/image/image-compressor"
          guideName="사진 용량 줄이는 방법"
          targetTool="이미지 용량 줄이기"
          targetUrl="/tools/image/image-compressor"
          className="inline-block px-5 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          이미지 용량 줄이기 바로가기
        </GuideCtaLink>
      </section>

      <section className="rounded-xl border p-5 space-y-3">
        <h2 className="text-xl font-semibold">관련 가이드</h2>
        <div className="grid gap-2 text-sm">
          <Link href="/guide/jpg-vs-webp" className="text-blue-600 hover:underline">
            JPG와 WebP 차이 보기
          </Link>
          <Link href="/guide/image-resize" className="text-blue-600 hover:underline">
            이미지 크기 조절 방법 보기
          </Link>
        </div>
      </section>
    </article>
  )
}
