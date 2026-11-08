import ImageResizer from '@/components/image/ImageResizer'
import messages from '@/data/en/image-resizer-ui.json'
import { englishImageTools } from '@/data/en/image-tools'
import { ToolStructuredData } from '@/components/ToolStructuredData'
import { generateToolMetadata } from '@/lib/seo'
const tool = englishImageTools[0]
export const metadata = generateToolMetadata(tool)
export default function Page() { return <><ToolStructuredData tool={tool} /><ImageResizer locale="en" messages={messages} contentTool={tool} /></> }
