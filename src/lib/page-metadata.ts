import type { Metadata } from 'next'
import { absoluteUrl } from './seo'
import { languageAlternates } from './locales'

export function englishMetadata(path: string, title: string, description: string, article = false): Metadata {
  return {
    title, description, alternates: { canonical: absoluteUrl(path), languages: languageAlternates(path) },
    openGraph: { title, description, url: absoluteUrl(path), siteName: 'JSTools', type: article ? 'article' : 'website', locale: 'en_US' },
    twitter: { card: 'summary', title, description },
  }
}
