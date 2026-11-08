import ImageConverter from '@/components/image/ImageConverter'
import messages from '@/data/en/image-converter-ui.json'
import { englishImageTools } from '@/data/en/image-tools'
import { ToolStructuredData } from '@/components/ToolStructuredData'
import { generateToolMetadata } from '@/lib/seo'
const tool = englishImageTools[2]
export const metadata = generateToolMetadata(tool)
export default function Page() { return <><ToolStructuredData tool={tool} /><ImageConverter locale="en" messages={messages} contentTool={tool} /></> }
