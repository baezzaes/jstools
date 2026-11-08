import type { ToolDefinition } from '@/data/tools'

export type Locale = 'ko' | 'en'
export type ImageToolProps = {
  locale?: Locale
  messages?: Record<string, string>
  contentTool?: ToolDefinition
}

// English dictionaries are supplied by English server pages only.
export function createImageTranslator(messages?: Record<string, string>) {
  return (text: string) => messages ? messages[text.trim().replace(/\s+/g, ' ')] ?? (/[가-힣]/.test(text) ? 'Unable to process this image.' : text) : text
}
