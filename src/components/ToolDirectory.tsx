import Link from 'next/link'
import { tools } from '@/data/tools'
import { guideLinks, toolGroups, toolSummaries } from '@/data/navigation'
import { UiIcon } from './UiIcon'

export function ToolDirectory() {
  return <>
    <nav className="category-links" aria-label="도구 분류 바로가기">{toolGroups.map(group => <Link key={group.id} href={`#${group.id}`}>{group.label}</Link>)}</nav>
    <div className="directory-sections">
      {toolGroups.map(group => <section id={group.id} key={group.id} className="directory-group" aria-labelledby={`${group.id}-heading`}>
        <div className="section-heading"><h2 id={`${group.id}-heading`}><UiIcon name={group.icon} />{group.label}</h2><span>{group.tools.length}개 도구</span></div>
        <div className="tool-card-grid">{group.tools.map(id => {
          const tool = tools.find(item => item.id === id)!
          return <Link key={id} href={tool.path} className="tool-card"><span className="card-icon"><UiIcon name={group.icon} /></span><div><h3>{tool.name}</h3><p>{toolSummaries[id]}</p></div><UiIcon name="arrow" className="card-arrow" /></Link>
        })}</div>
      </section>)}
      <section className="directory-group" aria-labelledby="home-guides-heading">
        <div className="section-heading"><h2 id="home-guides-heading"><UiIcon name="book" />도구 활용 가이드</h2><Link href="/guide">전체 보기 →</Link></div>
        <div className="guide-card-grid">{guideLinks.map(guide => <Link key={guide.href} href={guide.href} className="guide-card"><UiIcon name="book" /><h3>{guide.title}</h3><p>{guide.description}</p><span>가이드 읽기 →</span></Link>)}</div>
      </section>
    </div>
  </>
}
