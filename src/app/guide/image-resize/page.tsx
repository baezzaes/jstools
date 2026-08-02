import type { Metadata } from 'next'
import Link from 'next/link'
import { GuideCtaLink } from '@/components/GuideCtaLink'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const pageTitle = '이미지 크기 조절 방법 - 사진 픽셀과 사이즈 변경 | JSTools'
const pageDescription =
  '이미지 크기와 파일 용량의 차이, 픽셀과 가로세로 비율의 의미를 알아보고 사진 사이즈를 픽셀 또는 퍼센트 기준으로 변경하는 방법을 확인하세요.'
const pageUrl = absoluteUrl('/guide/image-resize')
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

export default function ImageResizeGuidePage() {
  return (
    <article className="max-w-3xl mx-auto p-6 space-y-8">
      <JsonLd id="image-resize-guide-article-schema" data={buildArticleSchema()} />

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
          <Link href="/guide/jpg-vs-webp" className="text-blue-600 hover:underline">
            JPG와 WebP 차이
          </Link>
        </div>
        <h1 className="text-3xl font-bold">이미지 크기 조절 방법 - 사진 픽셀과 사이즈 변경 가이드</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          사진을 업로드하거나 문서에 넣을 때는 파일 용량뿐 아니라 가로와 세로 픽셀도 중요합니다. 이미지 크기와 용량의
          차이를 이해하면 목적에 맞는 사이즈로 더 쉽게 조절할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">이미지 크기와 파일 용량은 무엇이 다른가?</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          이미지 크기는 가로와 세로 픽셀 수를 의미합니다. 예를 들어 1920 x 1080 이미지는 가로 1920개, 세로 1080개의
          픽셀로 구성됩니다. 반면 파일 용량은 저장 공간에서 차지하는 크기이며 KB나 MB로 표시됩니다.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          픽셀을 줄이면 저장해야 할 정보가 줄어 파일 용량도 감소할 가능성이 큽니다. 다만{' '}
          <Link href="/guide/image-compression" className="text-blue-600 hover:underline">
            이미지 압축
          </Link>
          만 적용하면 파일 용량은 줄어도 원본 픽셀 크기는 그대로 유지될 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">이미지 픽셀이란?</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          이미지는 작은 점인 픽셀의 모음입니다. 1920 x 1080 같은 숫자는 화면을 이루는 가로와 세로 픽셀 수를 뜻합니다.
          픽셀 수가 많으면 큰 화면이나 인쇄에서 유리할 수 있지만, 항상 더 선명하게 보이는 것은 아닙니다. 실제 표시
          크기, 원본 품질, 압축 상태에 따라 체감 화질은 달라집니다.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          원본보다 크게 확대하면 없던 디테일이 생기지는 않습니다. 오히려 이미지가 흐려지거나 가장자리가 부드럽게
          번져 보일 수 있으므로, 크기 조절은 보통 축소 목적에 맞춰 사용하는 것이 좋습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">이미지 크기를 줄여야 하는 경우</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          이미지 크기 조절은 특정 규격에 맞추거나 화면에 필요한 만큼만 이미지를 줄이고 싶을 때 유용합니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>블로그와 홈페이지 이미지 업로드 전에 표시 크기에 맞게 줄이는 경우</li>
          <li>이메일 첨부 용량을 낮추고 전송 시간을 줄이고 싶은 경우</li>
          <li>쇼핑몰 상품 이미지를 같은 폭이나 높이로 정리해야 하는 경우</li>
          <li>문서 삽입용 사진이 너무 커서 문서가 무거워지는 경우</li>
          <li>프로필 또는 증명사진 제출 페이지의 안내 크기에 맞춰야 하는 경우</li>
          <li>모바일에서 이미지를 빠르게 표시해야 하는 경우</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">가로세로 비율을 유지해야 하는 이유</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          가로세로 비율은 이미지의 폭과 높이 관계입니다. 비율을 유지하지 않고 가로 또는 세로만 바꾸면 사진이 납작하게
          눌리거나 길게 늘어나 보일 수 있습니다. 원본 비율 유지 옵션을 켜면 한쪽 값을 바꿀 때 다른 쪽 값이 자동으로
          계산되어 자연스러운 형태를 유지합니다.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          다만 제출 규격이 정확한 가로와 세로 픽셀을 요구하는 경우에는 비율 유지 옵션을 끄고 직접 값을 입력해야 할 수
          있습니다. 이때 이미지가 찌그러지지 않는지 결과 미리보기를 확인하는 것이 좋습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">픽셀 기준과 퍼센트 기준의 차이</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 font-semibold">비교 항목</th>
                <th className="p-3 font-semibold">픽셀 기준</th>
                <th className="p-3 font-semibold">퍼센트 기준</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">설정 방식</td>
                <td className="p-3">가로 1200px, 세로 800px처럼 정확한 크기를 입력합니다.</td>
                <td className="p-3">원본의 50%, 75%처럼 비율을 기준으로 줄입니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">적합한 상황</td>
                <td className="p-3">업로드 규격이나 문서 삽입 크기가 정해져 있을 때 좋습니다.</td>
                <td className="p-3">여러 이미지를 같은 비율로 빠르게 축소할 때 좋습니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">장점</td>
                <td className="p-3">결과 크기를 정확히 예측할 수 있습니다.</td>
                <td className="p-3">원본 크기가 서로 다른 이미지도 같은 축소 흐름으로 처리할 수 있습니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">주의점</td>
                <td className="p-3">비율을 끄면 이미지가 찌그러질 수 있습니다.</td>
                <td className="p-3">정확한 최종 픽셀이 필요한 제출 규격에는 맞지 않을 수 있습니다.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-900">예시</td>
                <td className="p-3">가로 1200px로 줄여 블로그 본문 폭에 맞춥니다.</td>
                <td className="p-3">원본 사진 여러 장을 50%로 줄여 첨부 용량을 낮춥니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">JSTools 이미지 크기 조절기 사용 방법</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JSTools 이미지 크기 조절기는 JPG, PNG, WebP 이미지를 서버 업로드 없이 브라우저에서 처리합니다. 픽셀 기준과
          퍼센트 기준 중 하나를 선택하고 결과 크기를 확인한 뒤 다운로드할 수 있습니다.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>이미지를 선택하거나 업로드 영역에 끌어다 놓습니다.</li>
          <li>픽셀 또는 퍼센트 방식 중 하나를 선택합니다.</li>
          <li>가로세로 비율 유지 여부를 설정합니다.</li>
          <li>결과 크기를 확인합니다.</li>
          <li>조절된 이미지를 다운로드합니다.</li>
        </ol>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border bg-gray-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold">이미지 크기 조절하기</h2>
          <p className="text-sm text-gray-600">사진의 가로와 세로 픽셀을 목적에 맞게 바꿔 보세요.</p>
          <GuideCtaLink
            href="/tools/image/image-resizer"
            guideName="이미지 크기 조절 방법"
            targetTool="이미지 크기 조절기"
            targetUrl="/tools/image/image-resizer"
            className="inline-block px-5 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            이미지 크기 조절하기
          </GuideCtaLink>
        </div>
        <div className="rounded-xl border bg-gray-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold">이미지 용량 줄이기</h2>
          <p className="text-sm text-gray-600">픽셀 크기는 유지하고 파일 용량만 줄이고 싶다면 압축 도구를 사용하세요.</p>
          <GuideCtaLink
            href="/tools/image/image-compressor"
            guideName="이미지 크기 조절 방법"
            targetTool="이미지 용량 줄이기"
            targetUrl="/tools/image/image-compressor"
            className="inline-block px-5 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            이미지 용량 줄이기
          </GuideCtaLink>
        </div>
      </section>

      <section className="rounded-xl border p-5 space-y-3">
        <h2 className="text-xl font-semibold">관련 가이드</h2>
        <div className="grid gap-2 text-sm">
          <Link href="/guide/image-compression" className="text-blue-600 hover:underline">
            이미지 용량 줄이는 방법 보기
          </Link>
          <Link href="/guide/jpg-vs-webp" className="text-blue-600 hover:underline">
            JPG와 WebP 차이 보기
          </Link>
        </div>
      </section>
    </article>
  )
}
