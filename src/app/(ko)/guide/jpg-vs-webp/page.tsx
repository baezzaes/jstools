import { GuideContents } from '@/components/GuideContents'
import { FormatWorkedExample } from '@/components/GuideWorkedExamples'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GuideCtaLink } from '@/components/GuideCtaLink'
import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const pageTitle = 'JPG·PNG·WebP 차이 - 투명 배경과 이미지 변환 방법 | JSTools'
const pageDescription =
  'JPG·PNG·WebP의 용도, 손실 압축과 투명 배경 차이를 비교합니다. JPG만 받는 제출 사이트와 투명 로고에 맞는 형식을 고르고, JPG 배경색을 선택해 변환하는 순서를 확인하세요.'
const pageUrl = absoluteUrl('/guide/jpg-vs-webp')
const publishedDate = '2026-08-02'
const modifiedDate = '2026-11-15'

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
    dateModified: modifiedDate,
  }
}

const contents = [{ id: "worked-example", title: "실제 파일로 확인한 작업 사례" }, {"id": "guide-section-1", "title": "JPG란?"}, {"id": "guide-section-2", "title": "PNG란? 투명 로고와 글자 이미지에 적합한 형식"}, {"id": "guide-section-3", "title": "WebP란?"}, {"id": "guide-section-4", "title": "JPG와 WebP 차이"}, {"id": "guide-section-5", "title": "JPG를 사용하면 좋은 경우"}, {"id": "guide-section-6", "title": "WebP를 사용하면 좋은 경우"}, {"id": "guide-section-7", "title": "제출 조건과 투명 배경에 맞춰 고르기"}, {"id": "guide-section-8", "title": "JPG·PNG·WebP를 변환하는 순서"}, {"id": "guide-section-9", "title": "용도에 맞는 이미지 형식으로 변환하기"}, {"id": "guide-section-10", "title": "이미지 용량 더 줄이기"}, {"id": "guide-section-11", "title": "관련 가이드"}]

export default function JpgVsWebpGuidePage() {
  return (
    <div className="reading-layout"><article className="reading-article space-y-8">
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
        <h1 className="text-3xl font-bold">JPG·PNG·WebP 차이 - 어떤 이미지 형식을 선택할까?</h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          JPG, PNG, WebP는 웹에서 자주 쓰이는 이미지 형식입니다. 어떤 형식이 더 좋다고 단정하기보다, 이미지 용도,
          호환성, 투명 배경 필요 여부, 파일 크기 목표를 함께 보고 선택하는 것이 좋습니다.
        </p>
        <GuideCtaLink
          href="/tools/image/image-converter"
          guideName="JPG와 WebP 차이"
          targetTool="이미지 변환기"
          targetUrl="/tools/image/image-converter"
          className="guide-cta"
        >
          이미지 형식 변환기 열기
        </GuideCtaLink>
      </header>
      <GuideContents sections={contents} mobile />
      <FormatWorkedExample />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold" id="guide-section-1">JPG란?</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JPG는 사진 저장에 널리 사용되는 손실 압축 이미지 형식입니다. 대부분의 브라우저, 운영체제, 편집 프로그램,
          오래된 장비에서도 열 수 있어 호환성이 매우 높습니다. 다만 투명 배경은 지원하지 않으며, 같은 파일을 반복해서
          저장하면 압축 과정에서 화질이 조금씩 떨어질 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold" id="guide-section-2">PNG란? 투명 로고와 글자 이미지에 적합한 형식</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          PNG는 무손실 압축과 투명도를 지원합니다. 로고, 아이콘, 화면 캡처처럼 글자와 선을 선명하게 보관하려는
          경우에 적합하지만, 복잡한 사진은 JPG보다 파일 용량이 클 수 있습니다. 브라우저에서 널리 지원되더라도
          제출 사이트가 PNG 첨부를 허용하는지는 별도로 확인해야 합니다.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          무손실은 저장할 때 이미지 정보를 잃지 않는다는 뜻입니다. 이미 손실된 JPG를 PNG로 바꾼다고 사라진
          세부 정보가 복원되거나 사진이 더 선명해지지는 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold" id="guide-section-3">WebP란?</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          WebP는 웹 이미지 전송 효율을 고려해 만들어진 이미지 형식입니다. 이미지 종류와 인코딩 설정에 따라 JPG보다
          더 작은 용량이 될 수 있고, 손실 압축과 무손실 압축을 모두 사용할 수 있습니다. 투명 배경도 지원할 수 있어
          웹사이트 이미지 최적화에 유용하지만, 일부 오래된 프로그램이나 환경에서는 호환성을 확인해야 할 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold" id="guide-section-4">JPG와 WebP 차이</h2>
        <p className="table-scroll-hint">표가 화면보다 넓으면 좌우로 움직여 모든 항목을 확인하세요.</p>
        <div className="table-scroll" tabIndex={0} role="region" aria-label="이미지 형식 비교표, 가로 스크롤 가능">
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
                <td className="p-3">많은 경우 더 작아질 수 있지만 항상 그런 것은 아닙니다.</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium text-gray-900">화질</td>
                <td className="p-3">사진 표현이 안정적이며 품질 조절이 쉽습니다.</td>
                <td className="p-3">비슷한 체감 화질에서 용량을 줄이기 유리한 경우가 있습니다.</td>
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
        <h2 className="text-2xl font-semibold" id="guide-section-5">JPG를 사용하면 좋은 경우</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JPG는 범용 호환성이 가장 중요한 상황에 적합합니다. 이메일 첨부, 오래된 프로그램이나 장비 사용, 사진을
          여러 환경에서 열어야 하는 경우에는 JPG가 더 안전한 선택일 수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>받는 사람이 어떤 기기나 프로그램을 쓰는지 알 수 없는 경우</li>
          <li>사진 파일을 이메일이나 문서에 첨부해야 하는 경우</li>
          <li>오래된 편집 프로그램, 인쇄 장비, 관리 시스템에서 열어야 하는 경우</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold" id="guide-section-6">WebP를 사용하면 좋은 경우</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          WebP는 웹사이트 속도 개선과 이미지 전송량 절감이 중요한 경우에 검토할 만합니다. 블로그, 쇼핑몰, 랜딩
          페이지처럼 여러 이미지를 노출하는 화면에서는 파일 크기를 줄이는 효과가 체감될 수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>웹사이트나 블로그 이미지의 로딩 속도를 개선하고 싶은 경우</li>
          <li>쇼핑몰 상세 이미지와 썸네일 파일 크기를 줄이고 싶은 경우</li>
          <li>투명 배경이 필요한 웹 이미지를 더 효율적으로 저장하고 싶은 경우</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold" id="guide-section-7">제출 조건과 투명 배경에 맞춰 고르기</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>JPG만 받는 지원서·첨부 사이트: PNG 또는 WebP 원본을 JPG로 변환하세요. 투명 영역은 선택한 배경색으로 채워집니다. 변환 후 용량과 픽셀 규격도 확인하세요.</li>
          <li>투명 로고를 문서나 디자인에 사용: PNG를 우선 검토하세요. 웹용이라면 투명도를 지원하는 WebP도 비교하되 사용 프로그램에서 열리는지 확인하세요.</li>
          <li>블로그·쇼핑몰용 사진: 업로드 서비스가 WebP를 받는다면 변환 결과의 화질과 용량을 원본과 비교하세요. JPG만 허용하면 JPG를 사용합니다.</li>
        </ul>
        <p className="text-sm text-gray-700 leading-relaxed">
          투명도가 없는 JPG를 PNG나 WebP로 변환해도 배경이 자동으로 제거되지는 않습니다. WebP 형식 자체는
          손실·무손실 저장을 지원하지만, JSTools 변환기에는 무손실 모드나 품질을 직접 고르는 옵션이 없습니다.
          JPG·WebP 출력은 손실이 생길 수 있으며, 형식 변환만으로 용량이 반드시 줄어들지는 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold" id="guide-section-8">JPG·PNG·WebP를 변환하는 순서</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          JSTools 이미지 변환기는 JPG, PNG, WebP 입력과 출력을 지원합니다. 이미지는 서버로 전송되지 않으며
          브라우저에서 처리됩니다. 픽셀 크기와 비율은 유지되므로 규격을 바꾸려면{' '}
          <Link href="/guide/image-resize" className="text-blue-600 hover:underline">이미지 크기 변경 방법</Link>을 확인하세요.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
          <li>‘출력 형식 선택’에서 JPG, PNG, WebP 중 원본과 다른 형식을 고릅니다. JPG를 WebP로 바꾸려면 WebP를 선택합니다.</li>
          <li>JPG 출력이라면 ‘JPG 배경색’에서 ‘흰색’, ‘검정’ 또는 ‘사용자 지정’ 색상을 정합니다. PNG·WebP 출력은 원본에 있던 투명 영역을 유지할 수 있습니다.</li>
          <li>‘파일 선택’으로 이미지를 추가합니다. 현재 설정으로 자동 변환됩니다. 파일을 추가한 뒤 출력 형식이나 JPG 배경색을 바꿔도 다시 처리됩니다.</li>
          <li>필요하면 ‘변환 적용’으로 현재 설정을 다시 적용합니다. ‘변환 결과’에서 형식과 용량을 확인하고 ‘JPG 다운로드’, ‘PNG 다운로드’ 또는 ‘WebP 다운로드’로 받습니다.</li>
          <li>여러 파일은 ‘전체 ZIP 다운로드’로 묶어 받습니다. 같은 형식의 원본은 변환 오류가 표시되므로 원본과 다른 출력 형식을 선택하세요.</li>
        </ol>
        <p className="text-sm text-gray-700 leading-relaxed">
          휴대폰에서도 ‘파일 선택’을 사용할 수 있으며 여러 장 선택은 기기의 파일 선택 화면에 따라 다릅니다.
          변환 목록은 최대 30개 파일, 각 이미지는 가로×세로 32,000,000픽셀까지 처리합니다. GIF, SVG, HEIC, AVIF는
          지원하지 않습니다. 큰 사진이 많아 느려지면 적은 수로 나누어 작업하세요.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          압축이나 크기 조절을 이어서 할 때 파일이 자동 전달되지는 않습니다. 결과를 다운로드하고 다음 도구에서
          다시 선택하세요. 투명 PNG를 유지해야 한다면 PNG가 WebP로 저장되는 압축기 대신{' '}
          <Link href="/tools/image/image-resizer" className="text-blue-600 hover:underline">이미지 크기 조절기</Link>에서
          픽셀을 줄이는 방법을 검토하세요. 필요 없는 영역은{' '}
          <Link href="/tools/image/image-cropper" className="text-blue-600 hover:underline">이미지 자르기</Link>로 정리할 수 있습니다.
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border bg-gray-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold" id="guide-section-9">용도에 맞는 이미지 형식으로 변환하기</h2>
          <p className="text-sm text-gray-600">이미지 형식을 바꿔 웹용 파일로 저장해 보세요.</p>
          <GuideCtaLink
            href="/tools/image/image-converter"
            guideName="JPG와 WebP 차이"
            targetTool="이미지 변환기"
            targetUrl="/tools/image/image-converter"
            className="guide-cta"
          >
            이미지 변환기 바로가기
          </GuideCtaLink>
        </div>
        <div className="rounded-xl border bg-gray-50 p-5 space-y-3">
          <h2 className="text-xl font-semibold" id="guide-section-10">이미지 용량 더 줄이기</h2>
          <p className="text-sm text-gray-600">형식 변환 후에도 용량 제한을 넘는다면 품질을 조절해 결과를 비교하세요.</p>
          <GuideCtaLink
            href="/tools/image/image-compressor"
            guideName="JPG와 WebP 차이"
            targetTool="이미지 용량 줄이기"
            targetUrl="/tools/image/image-compressor"
            className="guide-cta"
          >
            이미지 용량 더 줄이기
          </GuideCtaLink>
        </div>
      </section>

      <section className="rounded-xl border p-5 space-y-3">
        <h2 className="text-xl font-semibold" id="guide-section-11">관련 가이드</h2>
        <div className="grid gap-2 text-sm">
          <Link href="/guide/image-compression" className="text-blue-600 hover:underline">
            이미지 용량 줄이는 방법 보기
          </Link>
          <Link href="/guide/image-resize" className="text-blue-600 hover:underline">
            이미지 크기 조절 방법 보기
          </Link>
        </div>
      </section>
    </article><GuideContents sections={contents} /></div>
  )
}
