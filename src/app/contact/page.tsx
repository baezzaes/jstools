import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/seo'
import { siteOperator } from '@/lib/site-info'

const title = '문의 및 오류 제보 | JSTools'
const description = 'JSTools 도구의 오류, 사용 관련 질문, 개인정보 문의를 안내합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/contact') },
  openGraph: { title, description, url: absoluteUrl('/contact'), siteName: 'JSTools', type: 'website', locale: 'ko_KR' },
  twitter: { card: 'summary', title, description },
  robots: { index: Boolean(siteOperator.email), follow: true },
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6 text-gray-800">
      <header className="space-y-3">
        <Link href="/" className="text-sm text-blue-600 hover:underline">JSTools 홈</Link>
        <h1 className="text-3xl font-bold">문의 및 오류 제보</h1>
        <p className="leading-relaxed">도구를 사용하면서 생긴 문제, 개선 의견과 개인정보 관련 문의를 받습니다.</p>
      </header>
      <section className="space-y-3 rounded-xl border p-5 leading-relaxed">
        <h2 className="text-xl font-semibold">운영자 연락처</h2>
        <p>운영자: {siteOperator.name}</p>
        {siteOperator.email ? (
          <p className="break-words">이메일: <a href={`mailto:${siteOperator.email}`} className="text-blue-600 underline">{siteOperator.email}</a></p>
        ) : (
          <p>공개 문의 이메일을 준비하고 있습니다.</p>
        )}
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">오류를 알려주실 때</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>사용한 도구의 이름 또는 페이지 주소</li>
          <li>사용한 기기와 브라우저, 오류가 발생한 순서</li>
          <li>기대한 결과와 실제 화면에 표시된 결과 또는 오류 메시지</li>
        </ul>
        <p>주민등록번호, 비밀번호, 인증번호나 개인 사진 원본은 보내지 마세요. 파일 관련 오류는 가능하면 개인정보가 없는 예시로 설명해 주세요.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">개인정보 관련 문의</h2>
        <p>문의에 필요한 범위에서만 이름이나 회신 주소를 보내 주세요. 이메일로 접수된 정보는 문의 확인과 답변을 위해 사용하며, 삭제나 처리 관련 요청도 같은 연락처로 보낼 수 있습니다.</p>
        <Link href="/privacy" className="text-blue-600 underline">개인정보처리방침 확인</Link>
      </section>
    </main>
  )
}
