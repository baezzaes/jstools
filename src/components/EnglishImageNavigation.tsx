import Link from 'next/link'
import { UiIcon } from './UiIcon'

export function EnglishImageNavigation() {
  return <aside className="tool-sidebar"><div className="tool-sidebar-content"><nav aria-label="Image tools"><p className="nav-caption">Image tools</p>
    <Link href="/en/tools/image/image-resizer"><UiIcon name="image" /><span>Image Resizer</span></Link>
    <Link href="/en/tools/image/image-compressor"><UiIcon name="image" /><span>Image Compressor</span></Link>
    <Link href="/en/tools/image/image-converter"><UiIcon name="image" /><span>Image Converter</span></Link>
  </nav><Link href="/en/guide/image-resize" className="sidebar-guide"><UiIcon name="book" />Resizing guide</Link></div></aside>
}
