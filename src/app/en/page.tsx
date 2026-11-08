import Link from 'next/link'
import { EnglishImageNavigation } from '@/components/EnglishImageNavigation'
import { UiIcon } from '@/components/UiIcon'
import { englishImageTools } from '@/data/en/image-tools'
import { englishMetadata } from '@/lib/page-metadata'

export const metadata = englishMetadata('/en', 'JSTools — Free online image resizer, compressor and converter', 'Resize, compress and convert JPG, PNG and WebP images in your browser. Free image tools and a practical resizing guide, with no installation or login.')

export default function EnglishHome() {
  const summaries = ['Set width and height in pixels, or resize images by percentage.', 'Adjust quality and compare file sizes. PNG images are saved as WebP.', 'Convert JPG, PNG and WebP. Choose a background color for JPG output.']
  return <div className="workspace-shell"><EnglishImageNavigation /><main className="workspace-content">
    <header className="directory-header"><div className="directory-eyebrow">Free tools. No installation or login.</div><h1>Work on your images,<br />right in your browser.</h1><p>Resize dimensions, reduce file size or change formats. Start with these three image tools and a step-by-step guide.</p></header>
    <section id="image-tools" className="directory-group"><div className="section-heading"><h2><UiIcon name="image" />Image tools</h2><span>3 tools</span></div><div className="tool-card-grid">{englishImageTools.map((tool, index) => <Link key={tool.id} href={tool.path} className="tool-card"><span className="card-icon"><UiIcon name="image" /></span><div className="tool-card-copy"><h3>{tool.name}</h3><p>{summaries[index]}</p></div><UiIcon name="arrow" className="card-arrow" /></Link>)}</div></section>
    <section className="directory-group mt-8"><div className="section-heading"><h2><UiIcon name="book" />Image guide</h2></div><Link href="/en/guide/image-resize" className="guide-card"><h3>How to resize an image</h3><p>Understand pixels, keep proportions and create an exact 160 × 200 result.</p><span>Read the guide →</span></Link></section>
    <p className="mt-8 text-sm text-gray-600">Image processing runs in your browser. Hosting, analytics and advertising make separate network requests. <Link href="/en/privacy" className="text-blue-600 underline">Read our Privacy Policy</Link>.</p>
  </main></div>
}
