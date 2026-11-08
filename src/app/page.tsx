import { ToolDirectory } from '@/components/ToolDirectory'
import { ToolNavigation } from '@/components/ToolNavigation'
import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

const title = 'JSTools - 이미지 크기 조절, 글자수 계산기, 날짜 계산기'
const description = '이미지 크기 조절과 압축, 글자수 세기, 날짜 계산, QR 코드 생성을 무료로 이용하세요. 설치나 로그인 없이 브라우저에서 바로 사용할 수 있습니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/') },
  openGraph: { title, description, url: absoluteUrl('/'), siteName: 'JSTools', type: 'website', locale: 'ko_KR' },
  twitter: { card: 'summary', title, description },
}

export default function Home() {
  return (
    <div className="workspace-shell">
      <ToolNavigation />
      <main className="workspace-content">
        <header className="directory-header">
          <div className="directory-eyebrow">설치 없이 바로 사용하는 웹도구</div>
          <h1>필요한 도구를<br />바로 사용하세요</h1>
          <p>이미지 편집부터 글자 수와 날짜 계산까지. 설치나 로그인 없이 사용하는 한국어 무료 웹도구 모음입니다.</p>
        </header>
        <ToolDirectory />
      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
              <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7836056065911594"
          data-ad-slot="1234567890"   // 없으면 자동광고
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
        }} />
      </div>

      </main>
    </div>
  )
}
