import type { Metadata } from 'next'
import { metadata as wordcounterMetadata } from './metadata'

export const metadata: Metadata = wordcounterMetadata

export default function WordcounterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}