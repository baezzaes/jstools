import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/seo'

const title = '서비스 소개 | JSTools'
const description = 'JSTools의 무료 이미지·텍스트·날짜 도구와 서비스 운영 원칙을 소개합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/about') },
  openGraph: { title, description, url: absoluteUrl('/about'), siteName: 'JSTools', type: 'website', locale: 'ko_KR' },
  twitter: { card: 'summary', title, description },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6 text-gray-800">
      <header className="space-y-3">
        <Link href="/" className="text-sm text-blue-600 hover:underline">JSTools 홈</Link>
        <h1 className="text-3xl font-bold">JSTools 소개</h1>
        <p className="leading-relaxed">JSTools는 일상에서 반복되는 간단한 작업을 설치와 로그인 없이 처리할 수 있도록 만든 무료 웹도구 모음입니다.</p>
      </header>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">필요한 작업에 맞는 도구</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><Link href="/tools/image" className="text-blue-600 underline">이미지 도구</Link>: 사진 픽셀 크기 조절, 파일 압축, JPG·PNG·WebP 변환과 자르기</li>
          <li><Link href="/tools/text/word-counter" className="text-blue-600 underline">글자 수 세기</Link>: 공백 포함·제외 글자 수, 단어 수와 줄 수 확인</li>
          <li><Link href="/tools/date/date-calculator" className="text-blue-600 underline">날짜 계산기</Link>: 두 날짜의 차이와 기준일 전후 날짜 계산</li>
          <li><Link href="/tools" className="text-blue-600 underline">전체 도구</Link>: QR 코드 생성, JSON 정렬, 영문 대소문자 변환 등</li>
        </ul>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">파일과 입력 내용의 처리</h2>
        <p>이미지 도구는 선택한 파일을 현재 브라우저에서 처리합니다. 글자 수, 날짜, QR 코드와 JSON 도구의 입력 내용도 해당 도구의 계산을 위해 서버에 업로드하지 않습니다. 로또 번호 저장 기능은 사용한 기기의 브라우저 저장소를 이용합니다.</p>
        <p>사이트 이용 통계와 광고에는 외부 서비스가 사용됩니다. 명언 생성기는 외부 명언·번역 서비스에 요청할 수 있습니다. 자세한 내용은 <Link href="/privacy" className="text-blue-600 underline">개인정보처리방침</Link>에서 확인할 수 있습니다.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">사용할 때 확인해 주세요</h2>
        <p>도구마다 지원 형식과 계산 기준이 다릅니다. 이미지 변환 후에는 규격과 결과를 확인하고, 글자 수나 날짜를 제출 용도로 사용할 때는 제출 기관의 기준과 함께 확인해 주세요. 로또 번호 추천은 재미를 위한 기능이며 당첨을 보장하지 않습니다.</p>
        <p>오류나 설명이 부족한 부분은 <Link href="/contact" className="text-blue-600 underline">문의 페이지</Link>로 알려주세요. 이미지 작업 방법은 <Link href="/guide" className="text-blue-600 underline">사용 가이드</Link>에서도 확인할 수 있습니다.</p>
      </section>
    </main>
  )
}
