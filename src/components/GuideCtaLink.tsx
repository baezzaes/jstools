'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { trackGuideCtaClick } from '@/lib/analytics'

type GuideCtaLinkProps = {
  href: string
  guideName: string
  targetTool: string
  targetUrl: string
  className?: string
  children: ReactNode
}

export function GuideCtaLink({
  href,
  guideName,
  targetTool,
  targetUrl,
  className,
  children,
}: GuideCtaLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          trackGuideCtaClick({ guideName, targetTool, targetUrl })
        } catch {
          // Analytics must never block navigation.
        }
      }}
    >
      {children}
    </Link>
  )
}
