import Link from 'next/link'
import type { ToolDefinition } from '@/data/tools'

type ToolSeoSectionsProps = {
  tool: ToolDefinition
}

export function ToolSeoSections({ tool }: ToolSeoSectionsProps) {
  return (
    <>
      <section className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold">{tool.content.introHeading}</h2>
        {tool.content.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold">사용방법</h2>
        <ol className="list-decimal space-y-2 pl-5">
          {tool.content.howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">자주 묻는 질문</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          {tool.content.faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-semibold text-gray-900">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">관련 도구</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {tool.relatedTools.map((relatedTool) => (
            <Link
              key={relatedTool.href}
              href={relatedTool.href}
              className="block rounded-md border p-3 text-sm hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <strong className="block text-gray-900">{relatedTool.title}</strong>
              <span className="mt-1 block text-gray-600">{relatedTool.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
