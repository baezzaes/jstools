import { ToolStructuredData } from '@/components/ToolStructuredData'
import { qrCodeGeneratorTool } from '@/data/tools'
import { generateToolMetadata } from '@/lib/seo'

export function generateMetadata() {
  return generateToolMetadata(qrCodeGeneratorTool)
}

export default function QrcodegeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolStructuredData tool={qrCodeGeneratorTool} />
      {children}
    </>
  )
}
