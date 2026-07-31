import { JsonLd } from '@/components/JsonLd'
import type { ToolDefinition } from '@/data/tools'
import { buildBreadcrumbSchema, buildFaqSchema, buildToolSchema } from '@/lib/seo'

type ToolStructuredDataProps = {
  tool: ToolDefinition
}

export function ToolStructuredData({ tool }: ToolStructuredDataProps) {
  return (
    <>
      <JsonLd id={`${tool.id}-tool-schema`} data={buildToolSchema(tool)} />
      <JsonLd id={`${tool.id}-breadcrumb-schema`} data={buildBreadcrumbSchema(tool)} />
      <JsonLd id={`${tool.id}-faq-schema`} data={buildFaqSchema(tool)} />
    </>
  )
}
