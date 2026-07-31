import { ToolStructuredData } from '@/components/ToolStructuredData'
import { lottoGeneratorTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(lottoGeneratorTool)
}

export default function LottogeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={lottoGeneratorTool} />
      {children}
    </>
  )
}
