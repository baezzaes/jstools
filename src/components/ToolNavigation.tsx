'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { toolGroups } from '@/data/navigation'
import { UiIcon } from './UiIcon'

export function ToolNavigation() {
  const pathname = usePathname()
  const currentGroup = toolGroups.find(group => group.tools.some(id => pathname.endsWith('/' + id)))?.id || (pathname === '/tools/image' ? 'image' : undefined)
  return <aside className="tool-sidebar">
    <div className="tool-sidebar-content">
    <nav aria-label="도구 분류">
      <p className="nav-caption">도구 분류</p>
      {toolGroups.map(group => <Link key={group.id} href={`/tools#${group.id}`} aria-current={currentGroup === group.id ? 'location' : undefined}>
        <UiIcon name={group.icon} /><span>{group.label}</span>
      </Link>)}
    </nav>
    <Link href="/guide" className="sidebar-guide"><UiIcon name="book" />도구 활용 가이드</Link>
    </div>
  </aside>
}
