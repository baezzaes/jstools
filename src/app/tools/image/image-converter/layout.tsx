import { ToolStructuredData } from '@/components/ToolStructuredData'
import { imageConverterTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(imageConverterTool)
}

export default function ImageConverterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={imageConverterTool} />
      {children}
    </>
  )
}
