import { ToolStructuredData } from '@/components/ToolStructuredData'
import { dateCalculatorTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(dateCalculatorTool)
}

export default function DatecalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={dateCalculatorTool} />
      {children}
    </>
  )
}
