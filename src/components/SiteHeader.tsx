'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UiIcon } from './UiIcon'
import { languagePairs } from '@/lib/locales'
import type { Locale } from '@/lib/image-locale'

export function SiteHeader({ locale = 'ko' }: { locale?: Locale }) {
  const pathname = usePathname()
  const english = locale === 'en'
  const pair = languagePairs.find(pair => pair.some(url => url === pathname))
  const links = english ? [
    { href: '/en#image-tools', label: 'Image tools', active: pathname.startsWith('/en/tools/') },
    { href: '/en/guide/image-resize', label: 'Resize guide', active: pathname.startsWith('/en/guide/') },
    { href: '/en/about', label: 'About', active: pathname === '/en/about' },
  ] : [
    { href: '/tools', label: '전체 도구', active: pathname.startsWith('/tools') && !pathname.startsWith('/tools/image') },
    { href: '/tools/image', label: '이미지 도구', active: pathname.startsWith('/tools/image') },
    { href: '/guide', label: '사용 가이드', active: pathname.startsWith('/guide') },
    { href: '/about', label: '서비스 소개', active: pathname === '/about' },
  ]
  return <header className="site-header">
    <a className="skip-link" href="#main-content">{english ? 'Skip to content' : '본문으로 바로가기'}</a>
    <div className="site-header-inner">
      <Link href={english ? '/en' : '/'} className="site-brand" aria-label={english ? 'JSTools home' : 'JSTools 홈'}><UiIcon name="tool" />JSTools</Link>
      <nav aria-label={english ? 'Main navigation' : '주요 메뉴'}>{links.map(link => <Link key={link.href} href={link.href} aria-current={link.active ? 'page' : undefined}>{link.label}</Link>)}</nav>
      <nav className="language-switch" aria-label={english ? 'Language. Switching pages clears selected files and results.' : '언어 전환 시 선택한 파일과 결과는 유지되지 않습니다.'}>
        <a href={pair?.[0] || '/'} hrefLang="ko" lang="ko" aria-current={!english ? 'page' : undefined} title="언어 전환 시 파일·입력·결과는 유지되지 않습니다.">한국어</a>
        <a href={pair?.[1] || '/en'} hrefLang="en" lang="en" aria-current={english ? 'page' : undefined} title="Switching languages clears selected files, inputs and results.">{!english && !pair ? 'English home' : 'English'}</a>
      </nav>
    </div>
  </header>
}
