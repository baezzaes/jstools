import type { Metadata } from 'next'
import { metadata as lottogeneratorMetadata } from './metadata'

export const metadata: Metadata = lottogeneratorMetadata

export default function LottogeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}