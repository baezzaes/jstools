import type { Metadata } from 'next'
import { metadata as datecalculatorMetadata } from './metadata'

export const metadata: Metadata = datecalculatorMetadata

export default function DatecalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}