import { ToolStructuredData } from '@/components/ToolStructuredData'
import { imageResizerTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(imageResizerTool)
}

export default function ImageResizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={imageResizerTool} />
      {children}
    </>
  )
}
