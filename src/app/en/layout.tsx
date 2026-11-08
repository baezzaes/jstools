import { SiteDocument, baseMetadata } from '@/components/SiteDocument'
export const metadata = { ...baseMetadata, title: 'JSTools — Free online image tools', description: 'Resize, compress and convert images in your browser.' }
export default function EnglishRoot({ children }: { children: React.ReactNode }) { return <SiteDocument lang="en">{children}</SiteDocument> }
