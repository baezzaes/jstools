import type { Metadata } from 'next'
import { metadata as passwordgeneratorMetadata } from './metadata'

export const metadata: Metadata = passwordgeneratorMetadata

export default function PasswordgeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}