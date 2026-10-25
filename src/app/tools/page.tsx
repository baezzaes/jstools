import type { Metadata } from 'next'
import Link from 'next/link'
import { tools } from '@/data/tools'
import { absoluteUrl } from '@/lib/seo'

const title = '무료 웹도구 목록 - 이미지, 텍스트, 날짜 계산 | JSTools'
const description = '이미지 크기 조절, 압축, 형식 변환, 글자 수 세기, 날짜 계산과 QR 코드 생성 도구를 찾아보세요.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/tools') },
  openGraph: { title, description, url: absoluteUrl('/tools'), siteName: 'JSTools', type: 'website', locale: 'ko_KR' },
  twitter: { card: 'summary', title, description },
}

export default function ToolsPage() {
  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <header className="space-y-3">
        <Link href="/" className="text-sm text-blue-600 hover:underline">JSTools 홈</Link>
        <h1 className="text-3xl font-bold">무료 웹도구 목록</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2" aria-label="도구 목록">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.path} className="block rounded-xl border p-4 space-y-2 hover:bg-blue-50">
            <h2 className="font-semibold">{tool.name}</h2>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </section>
      <Link href="/guide" className="text-blue-600 hover:underline">이미지 도구 사용 가이드</Link>
    </main>
  )
}
