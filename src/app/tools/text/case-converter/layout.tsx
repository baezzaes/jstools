import { ToolStructuredData } from '@/components/ToolStructuredData'
import { caseConverterTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(caseConverterTool)
}

export default function CaseConverterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={caseConverterTool} />
      {children}
    </>
  )
}
