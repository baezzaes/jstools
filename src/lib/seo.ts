import type { Metadata } from 'next'
import type { ToolDefinition, ToolFaq } from '@/data/tools'

export const SITE_URL = 'https://jstools-app.vercel.app'
export const SITE_NAME = 'JSTools'

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function generateToolMetadata(tool: ToolDefinition): Metadata {
  const url = absoluteUrl(tool.path)

  return {
    metadataBase: new URL(SITE_URL),
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary',
      title: tool.title,
      description: tool.description,
    },
  }
}

export function buildToolSchema(tool: ToolDefinition) {
  const url = absoluteUrl(tool.path)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#webapplication`,
    name: tool.name,
    url,
    description: tool.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: 'ko-KR',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function buildBreadcrumbSchema(tool: ToolDefinition) {
  const url = absoluteUrl(tool.path)

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: SITE_NAME,
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.categoryName,
        item: absoluteUrl(tool.categoryPath),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: url,
      },
    ],
  }
}

export function buildFaqSchema(tool: ToolDefinition) {
  const url = absoluteUrl(tool.path)

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: tool.content.faq.map((item: ToolFaq) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
