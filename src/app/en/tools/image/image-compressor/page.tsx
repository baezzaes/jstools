import ImageCompressor from '@/components/image/ImageCompressor'
import messages from '@/data/en/image-compressor-ui.json'
import { englishImageTools } from '@/data/en/image-tools'
import { ToolStructuredData } from '@/components/ToolStructuredData'
import { generateToolMetadata } from '@/lib/seo'
const tool = englishImageTools[1]
export const metadata = generateToolMetadata(tool)
export default function Page() { return <><ToolStructuredData tool={tool} /><ImageCompressor locale="en" messages={messages} contentTool={tool} /></> }
