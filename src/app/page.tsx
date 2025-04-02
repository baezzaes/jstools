export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">🧰 JSTools</h1>
        <p className="text-gray-600">작지만 유용한 웹도구 모음 플랫폼</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {/* Word & Character Counter Tool */}
        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">🔤 Word & Character Counter</h2>
          <p className="text-sm text-gray-600">
            글자 수, 단어 수, 줄 수를 실시간으로 계산해주는 텍스트 분석 도구입니다.
          </p>
          <a
            href="/tools/word-counter"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>

        {/* Placeholder for future tools */}
        <div className="border rounded-xl p-4 shadow-sm space-y-2 opacity-50">
          <h2 className="text-xl font-semibold">🧼 텍스트 정리 도구</h2>
          <p className="text-sm text-gray-600">
            줄 바꿈 제거, 공백 제거 등 간단한 텍스트 정리 기능 모음. (곧 추가 예정!)
          </p>
          <button
            disabled
            className="inline-block mt-2 px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
          >
            준비 중
          </button>
        </div>
      </section>

      {/* 광고 자리 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
        광고 영역 (Google AdSense 자리)
      </div>

      <footer className="text-center text-xs text-gray-400 mt-10">
        © 2025 JSTools. Made by Jason.
      </footer>
    </div>
  );
}
