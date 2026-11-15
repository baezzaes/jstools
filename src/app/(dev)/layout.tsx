import { SiteDocument, baseMetadata } from '@/components/SiteDocument'

export const metadata = { ...baseMetadata, robots: { index: false, follow: false } }

export default function DevelopmentRoot({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="ko" adsEnabled={false}>{children}</SiteDocument>
}
