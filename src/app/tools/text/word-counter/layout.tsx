import { ToolStructuredData } from '@/components/ToolStructuredData'
import { wordCounterTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(wordCounterTool)
}

export default function WordcounterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={wordCounterTool} />
      {children}
    </>
  )
}
