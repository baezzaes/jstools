import Link from 'next/link'

export function SiteFooter({ locale = 'ko' }: { locale?: 'ko' | 'en' }) {
  const en = locale === 'en'
  return (
    <footer className="site-footer">
      <nav aria-label={en ? 'Site information' : '사이트 안내'} className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        <Link href={en ? '/en/about' : '/about'} className="hover:underline">{en ? 'About' : '서비스 소개'}</Link>
        <Link href={en ? '/en/privacy' : '/privacy'} className="hover:underline">{en ? 'Privacy Policy' : '개인정보처리방침'}</Link>
        <Link href={en ? '/en/contact' : '/contact'} className="hover:underline">{en ? 'Contact' : '문의'}</Link>
      </nav>
      <p className="mt-4 text-xs">{en ? 'JSTools · Free tools in your browser' : 'JSTools · 브라우저에서 사용하는 무료 웹도구'}</p>
    </footer>
  )
}
