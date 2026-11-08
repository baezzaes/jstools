import { SiteDocument, baseMetadata } from '@/components/SiteDocument'
export const metadata = baseMetadata
export default function KoreanRoot({ children }: { children: React.ReactNode }) { return <SiteDocument lang="ko">{children}</SiteDocument> }
