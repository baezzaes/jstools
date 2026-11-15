function ExampleTable({ headings, rows }: { headings: string[]; rows: string[][] }) {
  return <><p className="table-scroll-hint">표가 넓으면 좌우로 움직여 모든 항목을 확인하세요.</p><div className="table-scroll" role="region" tabIndex={0} aria-label="입력과 결과 비교표, 가로 스크롤 가능"><table className="w-full min-w-[520px] text-left text-sm"><thead><tr>{headings.map(h => <th className="p-3" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr className="border-t" key={i}>{r.map((c, j) => <td key={j} className="p-3 whitespace-pre-wrap break-words">{c}</td>)}</tr>)}</tbody></table></div></>
}

export function JsonWorkedExample() {
  return <section className="seo-section space-y-4 text-sm leading-relaxed"><h2 className="text-lg font-semibold">정렬과 문법 수정은 다른 작업입니다</h2><p>입력 예시 <code>{'{"name":"JSTools","items":[1,2]}'}</code>를 넣고 ‘포맷팅’을 누르면 값은 유지하면서 줄바꿈과 두 칸 들여쓰기를 적용합니다.</p><pre className="overflow-x-auto rounded border p-3">{'{\n  "name": "JSTools",\n  "items": [\n    1,\n    2\n  ]\n}'}</pre><p><code>{'{"name":"JSTools",}'}</code>의 마지막 쉼표(trailing comma)나 <code>{"{'name':'JSTools'}"}</code>의 작은따옴표는 JSON 문법에서 오류입니다. 화면에는 ‘유효한 JSON 형식이 아닙니다.’가 표시되고 이전 결과는 지워집니다. 마지막 쉼표를 없애고 키와 문자열을 큰따옴표로 감싼 뒤 다시 실행하세요.</p><p>JSON 자동 복구 기능은 없습니다. 따옴표를 일괄 치환하면 문자열 내용까지 바뀔 수 있으므로 원래 데이터를 확인하며 수정하세요.</p></section>
}

export function WordWorkedExample() {
  return <section className="seo-section space-y-4 text-sm leading-relaxed"><h2 className="text-lg font-semibold">공백·줄바꿈·이모지에 따라 달라지는 계산</h2><p>아래 입력의 ↵는 실제 줄바꿈 한 번을 뜻합니다. 단어는 공백·탭·줄바꿈으로 나뉜 덩어리이며 한국어 형태소를 분석하지 않습니다.</p><ExampleTable headings={['실제 입력 (↵ = 줄바꿈)', '공백 포함', '공백 제외', '단어', '줄']} rows={[[ '한글 JS↵↵😊','9','6','3','2'],['A↵↵ ↵B','6','2','2','3']]} /><p>공백 포함은 JavaScript 문자열 길이(UTF-16 코드 단위)로, 띄어쓰기와 줄바꿈도 각각 포함합니다. 공백 제외는 띄어쓰기뿐 아니라 탭과 줄바꿈 같은 공백 문자를 제거합니다. 😊는 눈에 보이는 모양은 하나지만 이 기준에서는 2입니다. 조합된 이모지는 더 길게 계산될 수 있습니다.</p><p>줄 수는 완전히 빈 줄만 제외합니다. 두 번째 예시의 공백 하나만 있는 줄은 포함되어 3줄입니다. 제출 사이트가 보이는 문자, 바이트, 줄바꿈 또는 공백을 다르게 세면 결과가 달라질 수 있으므로 최종 제출창에서도 확인하세요. 바이트 계산과 맞춤법 검사는 제공하지 않습니다.</p></section>
}

export function DateWorkedExample() {
  return <section className="seo-section space-y-4 text-sm leading-relaxed"><h2 className="text-lg font-semibold">윤년·월말·0일 계산 예시</h2><ExampleTable headings={['입력', '결과', '확인할 기준']} rows={[
    ['2024-02-28 ~ 2024-03-01','2일','윤년의 2월 29일을 지남'],['2024-03-01 ~ 2024-02-28','-2일','종료일이 앞서면 음수'],['2026-01-31에서 1일 후','2026-02-01','월말 다음 날'],['2024-03-01에서 1일 전','2024-02-29','윤년의 전날'],['2026-11-15에서 0일 전 또는 후','2026-11-15','기준일 그대로']]} /><p>차이는 시작일을 포함해 세는 방식이 아닙니다. 같은 날짜는 0일이며, 2월 28일부터 3월 1일까지 양 끝을 포함한 기간을 원한다면 위 2일과 구별해야 합니다. 계산은 날짜만을 기준으로 하며 주말·공휴일도 포함합니다.</p><p>기준일 전·후의 일 수에는 0 이상의 정수를 입력하세요. 월 단위 더하기, 영업일, 시간·분 차이는 지원하지 않습니다. 마감 시각이나 기관의 D-day 포함 규칙은 별도로 확인하세요.</p></section>
}

export function CaseWorkedExample() {
 return <section className="seo-section space-y-4 text-sm leading-relaxed"><h2 className="text-lg font-semibold">같은 문장을 다섯 방식으로 변환하면</h2><p>입력: <code>hello JSTools 한글</code></p><ExampleTable headings={['버튼 / 모드', '실제 결과']} rows={[
 ['대문자 (UPPERCASE)','HELLO JSTOOLS 한글'],['소문자 (lowercase)','hello jstools 한글'],['Capitalize','Hello JSTools 한글'],['Title Case','Hello Jstools 한글'],['Swap Case','HELLO jstOOLS 한글']]} /><p>Capitalize는 단어 시작 글자를 대문자로 만들고 나머지 대소문자는 유지합니다. Title Case는 먼저 소문자로 바꾼 뒤 띄어쓰기로 나뉜 단어의 첫 글자를 대문자로 만듭니다. 줄바꿈은 띄어쓰기와 동일하게 처리하지 않으므로 여러 줄 입력은 결과를 확인하세요.</p><p>한글에는 영문식 대소문자가 없어 그대로 남습니다. JSTools 같은 브랜드명·약어·사람 이름의 올바른 표기나 영문 제목 문법을 자동으로 판별하지는 않습니다.</p></section>
}

export function QrWorkedExample() {
 return <section className="seo-section space-y-4 text-sm leading-relaxed"><h2 className="text-lg font-semibold">텍스트 QR과 주소 QR을 구별하세요</h2><p><code>JSTools sample</code>을 입력하면 그 문장을 담은 QR이 표시됩니다. 주소를 공유하려면 <code className="break-all">https://jstools-app.vercel.app/</code>처럼 전체 URL을 입력하세요. 이 도구는 입력에 https://를 자동으로 붙이거나 사이트의 안전성을 확인하지 않습니다.</p><p>https://는 웹 주소의 연결 방식을 명확히 합니다. 도메인만 넣으면 스캔 앱에 따라 일반 텍스트로 보이거나 다르게 해석될 수 있습니다. 실제 카메라로 열기 전 QR이 잘리지 않았는지, 배경과 구분되는지, 주변 여백이 남아 있는지 확인하고, 스캔 후에는 표시된 주소와 철자를 확인한 뒤 여세요.</p><p>화면에 QR을 생성하는 기능이며 파일 다운로드 버튼은 제공하지 않습니다. 생성되었다는 사실만으로 모든 휴대폰에서 스캔된다고 보장하지 않으므로 공유 전 사용할 기기로 확인하세요.</p><p>QR은 암호화나 접근 제한 수단이 아닙니다. QR을 본 사람이 내용을 읽을 수 있으므로 비밀번호, 인증번호, 개인 식별정보나 비공개 링크를 넣지 마세요.</p></section>
}
