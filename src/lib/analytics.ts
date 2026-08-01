import type { ToolDefinition } from '@/data/tools'

type AnalyticsParameters = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, parameters?: AnalyticsParameters) => void
    dataLayer?: unknown[]
    __jstoolsTrackedViews?: Set<string>
  }
}

function getToolCategory(tool: ToolDefinition) {
  return tool.path.split('/')[2] || 'tools'
}

export function getFileType(value?: string) {
  if (!value) return 'file'
  if (['jpg', 'jpeg', 'png', 'webp', 'zip'].includes(value)) {
    return value === 'jpeg' ? 'jpg' : value
  }
  if (value === 'image/jpeg') return 'jpg'
  if (value === 'image/png') return 'png'
  if (value === 'image/webp') return 'webp'
  if (value === 'application/zip') return 'zip'

  const extension = value.match(/\.([a-z0-9]+)$/i)?.[1]
  return extension ? extension.toLowerCase() : 'file'
}

export function trackEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters)
    return
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(['event', eventName, parameters])
}

export function trackToolView(tool: ToolDefinition) {
  if (typeof window !== 'undefined') {
    window.__jstoolsTrackedViews = window.__jstoolsTrackedViews || new Set<string>()
    if (window.__jstoolsTrackedViews.has(tool.path)) return
    window.__jstoolsTrackedViews.add(tool.path)
  }

  trackEvent('tool_view', {
    tool_name: tool.name,
    tool_category: getToolCategory(tool),
    tool_url: tool.path,
  })
}

export function trackToolExecute(tool: ToolDefinition) {
  trackEvent('tool_execute', {
    tool_name: tool.name,
    tool_category: getToolCategory(tool),
  })
}

export function trackDownloadClick(tool: ToolDefinition, fileType: string) {
  trackEvent('download_click', {
    tool_name: tool.name,
    file_type: getFileType(fileType),
  })
}

export function trackCopyClick(tool: ToolDefinition) {
  trackEvent('copy_click', {
    tool_name: tool.name,
  })
}
