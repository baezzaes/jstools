import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-10 max-w-4xl border-t px-4 py-6 text-center text-sm text-gray-600">
      <nav aria-label="사이트 안내" className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        <Link href="/about" className="hover:underline">서비스 소개</Link>
        <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
        <Link href="/contact" className="hover:underline">문의</Link>
      </nav>
      <p className="mt-4 text-xs">JSTools · 브라우저에서 사용하는 무료 웹도구</p>
    </footer>
  )
}
