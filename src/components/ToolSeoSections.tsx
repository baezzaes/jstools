import Link from 'next/link'
import type { ToolDefinition } from '@/data/tools'

type ToolSeoSectionsProps = {
  tool: ToolDefinition
  locale?: 'ko' | 'en'
}

export function ToolSeoSections({ tool, locale = 'ko' }: ToolSeoSectionsProps) {
  const en = locale === 'en'
  return (
    <>
      <section className="seo-section space-y-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold">{tool.content.introHeading}</h2>
        {tool.content.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="seo-section space-y-4 text-sm text-gray-700 leading-relaxed">
        <h2 className="text-lg font-semibold">{en ? 'How to use' : '사용방법'}</h2>
        <ol className="list-decimal space-y-2 pl-5">
          {tool.content.howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="seo-section space-y-4">
        <h2 className="text-lg font-semibold">{en ? 'Frequently asked questions' : '자주 묻는 질문'}</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          {tool.content.faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-semibold text-gray-900">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="seo-section space-y-3">
        <h2 className="text-lg font-semibold">{en ? 'Related tools' : '관련 도구'}</h2>
        {en && <p className="text-sm text-gray-600">Download your result, then choose that file in the next tool. Files are not passed between tools. <Link href="/en/guide/image-resize" className="text-blue-600 underline">Image resizing guide</Link> · <Link href="/en/privacy" className="text-blue-600 underline">Privacy Policy</Link>. Switching languages starts a new page; selected files and results are not retained.</p>}
        {!en && tool.categoryPath === '/tools/image' && (
          <p className="text-sm text-gray-600">
            다음 작업을 할 때는 다운로드한 결과 파일을 해당 도구에서 선택해 주세요.
            {' '}<Link href="/guide/image-resize" className="text-blue-600 hover:underline">사진 크기 조절 방법</Link>
            {' · '}<Link href="/guide/image-compression" className="text-blue-600 hover:underline">용량 줄이기 가이드</Link>
          </p>
        )}
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
