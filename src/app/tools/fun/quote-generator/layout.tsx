import { ToolStructuredData } from '@/components/ToolStructuredData'
import { quoteGeneratorTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(quoteGeneratorTool)
}

export default function QuoteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={quoteGeneratorTool} />
      {children}
    </>
  )
}
