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
            href="/tools/text/word-counter"
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
            href="/tools/date/date-calculator"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>

        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">🔐 랜덤 비밀번호 생성기</h2>
          <p className="text-sm text-gray-600">
            원하는 길이와 옵션에 따라 보안성 높은 비밀번호를 생성합니다.
          </p>
          <a
            href="/tools/security/password-generator"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>

        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">🎯 운세 기반 로또 번호 추천기</h2>
          <p className="text-sm text-gray-600">
            기분과 색상, 좋아하는 숫자에 기반하여 로또 번호를 추천합니다.
          </p>
          <a
            href="/tools/fun/lotto-generator"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>  
        
        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">📱 QR 코드 생성기</h2>
          <p className="text-sm text-gray-600">
            입력한 텍스트나 URL을 QR 코드로 변환해주는 도구입니다.
          </p>
          <a
            href="/tools/utility/qrcode-generator"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>  

        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">🔠 텍스트 대소문자 변환기</h2>
          <p className="text-sm text-gray-600">
            입력한 문장의 대소문자를 한 번에 변환해주는 간단한 텍스트 도구입니다.
          </p>
          <a
            href="/tools/text/case-converter"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>

        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">🧩 JSON 포맷터</h2>
          <p className="text-sm text-gray-600">
            복잡한 JSON 데이터를 보기 좋게 정렬해주는 개발자용 유틸리티 도구입니다.
          </p>
          <a
            href="/tools/dev/json-formatter"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>

        <div className="border rounded-xl p-4 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold">💬 명언 생성기</h2>
          <p className="text-sm text-gray-600">
            영감을 주는 영어 명언과 함께 자동 번역된 한글 해석도 제공합니다.
          </p>
          <a
            href="/tools/fun/quote-generator"
            className="inline-block mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            사용하기
          </a>
        </div>

                   

      </section>

      {/* 광고 영역 */}
      <div className="border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 rounded-xl">
              <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7836056065911594"
          data-ad-slot="1234567890"   // 없으면 자동광고
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
        }} />
      </div>

      <footer className="text-center text-xs text-gray-400 mt-10">
        © 2025 JSTools. Made by Jason.
      </footer>
    </div>
  );
}
