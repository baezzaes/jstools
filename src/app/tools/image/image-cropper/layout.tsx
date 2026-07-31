import { ToolStructuredData } from '@/components/ToolStructuredData'
import { imageCropperTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(imageCropperTool)
}

export default function ImageCropperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={imageCropperTool} />
      {children}
    </>
  )
}
