import Link from 'next/link'
import { tools } from '@/data/tools'
import { guideLinks, toolGroups, toolSummaries } from '@/data/navigation'
import { UiIcon } from './UiIcon'

export function ToolDirectory() {
  const imageGroup = toolGroups[0]
  const otherGroups = toolGroups.slice(1)
  return <>
    <nav className="category-links" aria-label="도구 분류 바로가기">{toolGroups.map(group => <Link key={group.id} href={`#${group.id}`}>{group.label}</Link>)}</nav>
    <div className="directory-sections">
      <section id={imageGroup.id} className="directory-group" aria-labelledby="image-heading">
        <div className="section-heading"><h2 id="image-heading"><UiIcon name={imageGroup.icon} />{imageGroup.label}</h2><span>4개 도구</span></div>
        <div className="tool-card-grid image-card-grid">{imageGroup.tools.map(id => {
          const tool = tools.find(item => item.id === id)!
          return <Link key={id} href={tool.path} className="tool-card"><span className="card-icon"><UiIcon name={imageGroup.icon} /></span><div className="tool-card-copy"><h3>{tool.name}</h3><p>{toolSummaries[id]}</p></div><UiIcon name="arrow" className="card-arrow" /></Link>
        })}</div>
      </section>
      <section className="directory-group" aria-labelledby="other-tools-heading">
        <div className="section-heading"><h2 id="other-tools-heading"><UiIcon name="tool" />텍스트·계산·생활 도구</h2><span>8개 도구</span></div>
        <div className="tool-card-grid other-tool-grid">{otherGroups.flatMap(group => group.tools.map((id, index) => {
          const tool = tools.find(item => item.id === id)!
          return <Link key={id} id={index === 0 ? group.id : undefined} href={tool.path} className="tool-card"><span className="card-icon"><UiIcon name={group.icon} /></span><div className="tool-card-copy"><span className="tool-category-label">{group.label}</span><h3>{tool.name}</h3><p>{toolSummaries[id]}</p></div><UiIcon name="arrow" className="card-arrow" /></Link>
        }))}</div>
      </section>
      <section className="directory-group" aria-labelledby="home-guides-heading">
        <div className="section-heading"><h2 id="home-guides-heading"><UiIcon name="book" />도구 활용 가이드</h2><Link href="/guide">전체 보기 →</Link></div>
        <div className="guide-card-grid">{guideLinks.map(guide => <Link key={guide.href} href={guide.href} className="guide-card"><UiIcon name="book" /><h3>{guide.title}</h3><p>{guide.description}</p><span>가이드 읽기 →</span></Link>)}</div>
      </section>
    </div>
  </>
}
