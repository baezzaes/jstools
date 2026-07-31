import { ToolStructuredData } from '@/components/ToolStructuredData'
import { imageCompressorTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(imageCompressorTool)
}

export default function ImageCompressorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={imageCompressorTool} />
      {children}
    </>
  )
}
