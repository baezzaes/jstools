import { ToolNavigation } from '@/components/ToolNavigation'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace-shell">
      <ToolNavigation />
      <div className="workspace-content">{children}</div>
    </div>
  )
}
