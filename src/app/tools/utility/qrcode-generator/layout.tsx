import type { Metadata } from 'next'
import { metadata as qrcodegeneratorMetadata } from './metadata'

export const metadata: Metadata = qrcodegeneratorMetadata

export default function QrcodegeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}