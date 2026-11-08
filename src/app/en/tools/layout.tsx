import { EnglishImageNavigation } from '@/components/EnglishImageNavigation'
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <div className="workspace-shell"><EnglishImageNavigation /><main className="workspace-content">{children}</main></div>
}
