import { ToolStructuredData } from '@/components/ToolStructuredData'
import { jsonFormatterTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(jsonFormatterTool)
}

export default function JsonFormatterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={jsonFormatterTool} />
      {children}
    </>
  )
}
