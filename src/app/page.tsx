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

        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">📅 날짜 계산기</h2>
          <p className="text-sm text-gray-600">
            두 날짜 사이의 차이를 계산하거나, 기준일로부터 며칠 전/후 날짜를 계산합니다.
          </p>
          <a
            href="/tools/date-calculator"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
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
