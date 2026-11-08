export function GuideContents({ sections, mobile = false, locale = 'ko' }: { sections: { id: string; title: string }[]; mobile?: boolean; locale?: 'ko' | 'en' }) {
  return <nav className={mobile ? 'mobile-toc' : 'reading-toc'} aria-label={locale === 'en' ? 'On this page' : mobile ? '이 가이드의 목차' : '가이드 목차'}>
    <h2 className="font-semibold">{locale === 'en' ? 'On this page' : '이 글에서 확인할 내용'}</h2>
    {sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
  </nav>
}
