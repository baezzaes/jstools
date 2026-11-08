import type { Metadata } from 'next'
import Link from 'next/link'
import { GuideCtaLink } from '@/components/GuideCtaLink'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const pageTitle = '사진 용량 줄이기 - JPG·PNG·WebP 압축 방법 | JSTools'
const pageDescription =
  '사진의 KB·MB 용량과 픽셀 크기 차이, 품질 적용 순서와 PNG의 WebP 저장 방식을 안내합니다. 압축 후에도 용량이 클 때 크기 조절·형식 변환을 선택하는 기준을 확인하세요.'
const pageUrl = absoluteUrl('/guide/image-compression')
const publishedDate = '2026-08-02'
const modifiedDate = '2026-11-08'

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
    dateModified: modifiedDate,
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
        <h1 className="text-3xl font-bold">사진 용량 줄이기 - JPG·PNG·WebP 압축 가이드</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          사진이 첨부 용량 제한을 넘었다면 먼저 제출할 곳의 허용 형식과 용량을 확인하세요. 품질을 조절해 압축할지,
          가로세로 픽셀을 줄일지, 다른 형식으로 저장할지에 따라 작업 순서가 달라집니다.
        </p>
        <GuideCtaLink
          href="/tools/image/image-compressor"
          guideName="사진 용량 줄이는 방법"
          targetTool="이미지 용량 줄이기"
          targetUrl="/tools/image/image-compressor"
          className="inline-block px-5 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          사진 용량 줄이기 시작
        </GuideCtaLink>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">KB·MB 용량과 픽셀 크기는 다릅니다</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          KB·MB는 파일이 차지하는 데이터의 양이고, 픽셀 크기는 사진의 가로와 세로에 담긴 점의 수입니다.
          같은 픽셀 크기여도 사진 내용, 저장 형식, 압축 품질에 따라 파일 용량은 달라집니다.
          이미지 압축기는 가로세로 픽셀을 유지하면서 품질과 저장 방식을 조정합니다.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          제출 조건이 가로·세로 px라면{' '}
          <Link href="/guide/image-resize" className="text-blue-600 hover:underline">이미지 크기 변경 가이드</Link>를,
          KB·MB 이하라면 아래 압축 순서를 확인하세요. 두 조건이 함께 있다면 픽셀 규격을 먼저 맞춘 뒤 용량을 확인합니다.
        </p>
      </section>

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
              압축 품질을 낮추면 파일 크기를 줄일 수 있습니다. 너무 낮추면 흐림이나 깨짐이 보일 수 있습니다.
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
              웹에서 사용할 이미지라면 WebP로 변환한 결과와 원본의 용량을 비교해 보세요.
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
                <td className="p-3">투명한 로고와 글자 이미지에 적합</td>
                <td className="p-3">이 압축기에서는 WebP로 저장됨</td>
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
          <li>‘파일 선택’으로 JPG, PNG, WebP 사진을 추가합니다. PC에서는 끌어다 놓아도 됩니다. 파일 추가 시 현재 품질로 자동 처리됩니다.</li>
          <li>‘결과 리스트’에서 원본 용량, 결과 용량과 결과 형식을 확인합니다. JPG는 JPG, WebP는 WebP로 처리되며 PNG는 WebP로 저장됩니다.</li>
          <li>더 줄여야 한다면 ‘품질 설정’을 낮추고 ‘품질 적용’을 누릅니다. 슬라이더를 움직이는 것만으로 기존 결과가 바뀌지는 않습니다.</li>
          <li>완료된 결과를 내려받아 글자, 윤곽선과 색 변화를 확인합니다. 품질 수치는 원본 대비 화질 보존율이나 용량 감소율을 뜻하지 않습니다.</li>
          <li>각 파일의 ‘JPG 다운로드’ 또는 ‘WebP 다운로드’를 누르거나 ‘전체 ZIP 다운로드’로 완료된 파일을 묶어 받습니다.</li>
        </ol>
        <p className="text-sm text-gray-700 leading-relaxed">
          JPG·WebP는 다시 압축한 파일이 원본보다 작지 않으면 원본 파일을 결과로 사용합니다. PNG는 WebP 변환 결과를
          사용하므로 원본보다 커질 수도 있습니다. 원본은 따로 보관하고 결과 용량을 비교하세요.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">압축 후에도 용량이 크다면</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>품질을 조금씩 낮춰 적용하고 확인하세요. 손실 압축에서는 세부 무늬나 작은 글자가 흐려지거나 경계에 얼룩이 생길 수 있습니다.</li>
          <li>
            필요한 크기보다 큰 사진은{' '}
            <Link href="/tools/image/image-resizer" className="text-blue-600 hover:underline">이미지 크기 조절기</Link>로 픽셀을 줄이세요.
            불필요한 주변 영역이 있다면{' '}
            <Link href="/tools/image/image-cropper" className="text-blue-600 hover:underline">이미지 자르기</Link>를 먼저 사용할 수 있습니다.
          </li>
          <li>
            제출할 곳이 허용한다면{' '}
            <Link href="/tools/image/image-converter" className="text-blue-600 hover:underline">이미지 변환기</Link>에서 형식을 바꿔 비교하세요.
            JPG 제출이 필수인 PNG 사진은 먼저 JPG로 변환한 뒤 압축합니다. 투명 배경은 JPG로 바꾸면 유지되지 않습니다.
          </li>
        </ul>
        <p className="text-sm text-gray-700 leading-relaxed">
          정확히 100KB 또는 500KB로 맞추는 목표 용량 입력 기능은 없습니다. 내려받은 실제 파일의 용량이 제출 제한
          이하인지 확인해야 하며, 특정 감소율이나 화질 유지를 보장하지 않습니다.
          도구 사이에 파일은 자동 전달되지 않으므로 결과를 다운로드한 뒤 다음 도구에서 다시 선택하세요.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">휴대폰과 여러 사진에서 사용하는 방법</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          휴대폰에서도 ‘파일 선택’으로 사진을 불러올 수 있습니다. 사진 선택 화면에서 여러 장 선택을 지원하면 한 번에
          추가하고 같은 품질을 적용할 수 있습니다. HEIC 사진은 지원하지 않으므로 JPG·PNG·WebP 파일을 준비하세요.
          사진마다 결과 용량은 다를 수 있으며, 많은 고해상도 사진을 처리하다 느려지면 적은 수로 나누어 작업하세요.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          ZIP은 완료된 결과를 묶어 받는 방법입니다. 이미지 품질을 추가로 조절하는 기능은 아니며, 휴대폰에서는
          다운로드한 ZIP을 파일 앱 등에서 풀어야 개별 사진을 사용할 수 있습니다.
          ZIP 안에서 결과 파일 이름이 겹치면 숫자 접미사를 붙여 각 파일을 따로 저장합니다.
        </p>
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
