import type { Metadata } from 'next'
import { metadata as caseConverterMetadata } from './metadata'

export const metadata: Metadata = caseConverterMetadata

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
