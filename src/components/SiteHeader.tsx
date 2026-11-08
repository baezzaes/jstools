'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UiIcon } from './UiIcon'

export function SiteHeader() {
  const pathname = usePathname()
  const links = [
    { href: '/tools', label: '전체 도구', active: pathname.startsWith('/tools') && !pathname.startsWith('/tools/image') },
    { href: '/tools/image', label: '이미지 도구', active: pathname.startsWith('/tools/image') },
    { href: '/guide', label: '사용 가이드', active: pathname.startsWith('/guide') },
    { href: '/about', label: '서비스 소개', active: pathname === '/about' },
  ]
  return <header className="site-header">
    <a className="skip-link" href="#main-content">본문으로 바로가기</a>
    <div className="site-header-inner">
      <Link href="/" className="site-brand" aria-label="JSTools 홈"><UiIcon name="tool" />JSTools</Link>
      <nav aria-label="주요 메뉴">{links.map(link => <Link key={link.href} href={link.href} aria-current={link.active ? 'page' : undefined}>{link.label}</Link>)}</nav>
    </div>
  </header>
}
