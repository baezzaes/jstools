import { ToolStructuredData } from '@/components/ToolStructuredData'
import { passwordGeneratorTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(passwordGeneratorTool)
}

export default function PasswordgeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={passwordGeneratorTool} />
      {children}
    </>
  )
}
