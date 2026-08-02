import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const pageTitle = 'JPG와 WebP 차이 - 이미지 형식 비교와 변환 방법 | JSTools'
const pageDescription =
  'JPG와 WebP의 파일 용량, 화질, 투명 배경, 호환성 차이를 비교하고 용도에 맞는 이미지 형식을 선택하는 방법을 알아보세요.'
const pageUrl = absoluteUrl('/guide/jpg-vs-webp')
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
    datePublished: publishedDate,
    dateModified: publishedDate,
  }
}

export default function JpgVsWebpGuidePage() {
  return (
    <article className="max-w-3xl mx-auto p-6 space-y-8">
      <JsonLd id="jpg-vs-webp-guide-article-schema" data={buildArticleSchema()} />

      <header className="space-y-3">
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            JSTools 홈
          </Link>
          <Link href="/guide" className="text-blue-600 hover:underline">
            가이드 목록
          </Link>
          <Link href="/guide/image-compression" className="text-blue-600 hover:underline">
            이미지 용량 줄이기 가이드
          </Link>
        </div>
        <h1 className="text-3xl font-bold">JPG와 WebP 차이 - 어떤 이미지 형식을 사용해야 할까?</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          JPG와 WebP는 모두 웹에서 자주 쓰이는 이미지 형식입니다. 어떤 형식이 더 좋다고 단정하기보다, 이미지의
          용도, 호환성, 투명 배경 필요 여부, 파일 크기 목표를 함께 보고 선택하는 것이 좋습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JPG란?</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JPG는 사진 저장에 널리 사용되는 손실 압축 이미지 형식입니다. 대부분의 브라우저, 운영체제, 편집 프로그램,
          오래된 장비에서도 열 수 있어 호환성이 매우 높습니다. 다만 투명 배경은 지원하지 않으며, 같은 파일을
          반복해서 저장하면 압축 과정에서 품질이 점차 떨어질 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">WebP란?</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          WebP는 웹 이미지 전송 효율을 고려해 만들어진 이미지 형식입니다. 이미지 종류와 인코딩 설정에 따라 JPG보다
          더 작은 용량이 될 수 있고, 손실 압축과 무손실 압축을 모두 사용할 수 있습니다. 투명 배경도 지원할 수 있어
          웹사이트 이미지 최적화에 유용하지만, 일부 오래된 프로그램이나 환경에서는 호환성을 확인해야 할 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JPG와 WebP 차이</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 font-semibold">비교 항목</th>
                <th className="p-3 font-semibold">JPG</th>
                <th className="p-3 font-semibold">WebP</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">파일 용량</td>
                <td className="p-3">사진 압축에 적합하지만 설정에 따라 용량이 커질 수 있습니다.</td>
                <td className="p-3">웹용 설정에서는 더 작아질 수 있지만 항상 그런 것은 아닙니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">화질</td>
                <td className="p-3">사진 표현에 안정적이며 품질 조절이 쉽습니다.</td>
                <td className="p-3">비슷한 체감 품질에서 용량을 줄이기 유리한 경우가 있습니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">투명 배경</td>
                <td className="p-3">지원하지 않습니다.</td>
                <td className="p-3">지원할 수 있습니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">브라우저 호환성</td>
                <td className="p-3">거의 모든 환경에서 안정적으로 열립니다.</td>
                <td className="p-3">현대 브라우저에서는 널리 지원되지만 오래된 환경은 확인이 필요합니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">사진 사용</td>
                <td className="p-3">사진 원본 공유와 범용 저장에 적합합니다.</td>
                <td className="p-3">웹 게시용 사진 최적화에 적합합니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">웹사이트 사용</td>
                <td className="p-3">호환성이 중요한 경우 안정적인 선택입니다.</td>
                <td className="p-3">페이지 속도와 전송량을 줄이고 싶을 때 유리할 수 있습니다.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-900">편집 프로그램 호환성</td>
                <td className="p-3">대부분의 편집 프로그램에서 바로 열 수 있습니다.</td>
                <td className="p-3">프로그램에 따라 가져오기나 저장 지원 여부가 다를 수 있습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JPG를 사용하면 좋은 경우</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JPG는 범용 호환성이 가장 중요한 상황에 적합합니다. 이메일 첨부, 오래된 프로그램이나 장비 사용, 사진
          원본을 여러 환경에서 열어야 하는 경우에는 JPG가 더 안전한 선택일 수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>받는 사람이 어떤 기기나 프로그램을 쓰는지 알 수 없는 경우</li>
          <li>사진 파일을 이메일이나 문서에 첨부해야 하는 경우</li>
          <li>오래된 편집 프로그램, 인쇄 장비, 관리 시스템에서 열어야 하는 경우</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">WebP를 사용하면 좋은 경우</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          WebP는 웹사이트 속도 개선과 이미지 전송량 절감이 중요한 경우에 검토할 만합니다. 블로그, 쇼핑몰, 랜딩
          페이지처럼 여러 이미지를 노출하는 화면에서는 파일 크기를 줄이는 효과가 체감될 수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>웹사이트나 블로그 이미지의 로딩 속도를 개선하고 싶은 경우</li>
          <li>쇼핑몰 상세 이미지나 썸네일 파일 크기를 줄이고 싶은 경우</li>
          <li>투명 배경이 필요한 웹 이미지를 더 효율적으로 저장하고 싶은 경우</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JPG를 WebP로 변환하는 방법</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JSTools 이미지 변환기를 사용하면 JPG 이미지를 브라우저에서 WebP로 변환할 수 있습니다. 이미지는 서버로
          전송되지 않으며, 결과 파일을 바로 다운로드할 수 있습니다.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>JPG 이미지를 선택합니다.</li>
          <li>출력 형식에서 WebP를 선택합니다.</li>
          <li>변환을 실행합니다.</li>
          <li>결과 파일을 다운로드합니다.</li>
        </ol>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border bg-gray-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold">JPG를 WebP로 변환하기</h2>
          <p className="text-sm text-gray-600">이미지 형식을 바꿔 웹용 파일로 저장해 보세요.</p>
          <Link
            href="/tools/image/image-converter"
            className="inline-block px-5 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            JPG를 WebP로 변환하기
          </Link>
        </div>
        <div className="rounded-xl border bg-gray-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold">이미지 용량 더 줄이기</h2>
          <p className="text-sm text-gray-600">이미 압축된 결과도 용도에 맞게 한 번 더 확인할 수 있습니다.</p>
          <Link
            href="/tools/image/image-compressor"
            className="inline-block px-5 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            이미지 용량 더 줄이기
          </Link>
        </div>
      </section>
    </article>
  )
}
