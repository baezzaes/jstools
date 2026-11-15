import Image from 'next/image'

const root = '/examples/image-workflows/'
function Sample({ file, label, width = 640, height = 480 }: { file: string; label: string; width?: number; height?: number }) {
  return <figure className="min-w-0 space-y-2"><div className="rounded-lg border p-2" style={{ backgroundColor: '#e5e7eb', backgroundImage: 'conic-gradient(#fff 25%, transparent 0 50%, #fff 0 75%, transparent 0)', backgroundSize: '20px 20px' }}><Image src={root + file} alt={label} width={width} height={height} unoptimized className="mx-auto h-auto max-w-full" /></div><figcaption className="text-sm">{label} · <a href={root + file} download className="text-blue-600 underline">원본 파일로 확인</a></figcaption></figure>
}
function Conditions() {
  return <p className="text-sm text-gray-600">샘플 출처: JSTools에서 직접 만든 도형·문자 테스트 일러스트(개인정보·외부 사진 없음). 검토일: 2026-11-15. Windows Chromium 157에서 실제 도구로 처리·다운로드한 파일을 열어 규격·형식·용량·투명도를 확인했습니다. 바이트는 파일 자체의 크기이며, 이 한 사례가 모든 사진의 결과를 대표하지는 않습니다.</p>
}
function ResultsTable({ headings, rows }: { headings: string[]; rows: string[][] }) {
  return <><p className="table-scroll-hint">표가 넓으면 좌우로 움직여 모든 항목을 확인하세요.</p><div className="table-scroll" role="region" tabIndex={0} aria-label="실제 다운로드 결과 비교표, 가로 스크롤 가능"><table className="w-full min-w-[600px] text-left text-sm"><thead><tr>{headings.map(h => <th className="p-3" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(r => <tr className="border-t" key={r[0]}>{r.map((v, i) => <td className="p-3" key={i}>{v}</td>)}</tr>)}</tbody></table></div></>
}

export function ResizeWorkedExample() {
 return <section id="worked-example" className="space-y-4"><h2 className="text-2xl font-semibold">실측 사례: 640×480 PNG를 160×200으로 변경</h2><Conditions /><ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed"><li>아래 원본 PNG(640×480)를 내려받아 이미지 크기 조절기의 ‘파일 선택’에서 추가했습니다.</li><li>‘픽셀 기준’에서 ‘가로세로 비율 유지’를 해제하고 가로 160, 세로 200을 입력한 뒤 ‘크기 적용’을 눌렀습니다.</li><li>‘PNG 다운로드’로 받은 파일을 열어 실제 160×200 픽셀인지 확인했습니다. 원본의 4:3 비율이 4:5로 바뀌어 원이 세로로 길어졌습니다. 사진 속 얼굴도 이와 같이 왜곡될 수 있습니다.</li></ol><div className="grid gap-4 sm:grid-cols-2"><Sample file="original.png" label="원본 640×480: 흰색 원과 빨간 정사각형" /><Sample file="resized.png" label="결과 160×200: 비율 해제로 길어진 원과 사각형" width={160} height={200} /></div><p className="text-sm leading-relaxed">왜곡을 피하려면 먼저 필요한 부분을 4:5 비율로 자른 뒤 크기를 줄이세요. 아래 자르기 설명처럼 현재 자르기 도구에는 4:5 숫자 입력·프리셋이 없어 자유 선택 영역의 규격을 확인해야 합니다. 정밀한 비율 입력이 필요하면 해당 기능이 있는 편집기를 먼저 사용하세요. 내려받은 자르기 결과는 리사이저에서 다시 선택해야 합니다.</p><p className="text-sm leading-relaxed">다운로드 후 Windows에서는 파일의 ‘속성 → 자세히’에서 너비·높이를, 다른 기기에서는 이미지 뷰어의 정보·세부정보에서 픽셀 규격을 확인하세요. 화면에서 보이는 크기나 파일명의 숫자만으로 판단하지 말고 실제 너비 160·높이 200인지 확인합니다. 제출처의 파일 형식·KB 제한은 별도 조건입니다.</p></section>
}

export function CompressionWorkedExample() {
 return <section id="worked-example" className="space-y-4"><h2 className="text-2xl font-semibold">실측 사례: 같은 PNG를 두 품질로 압축해 비교</h2><Conditions /><p className="text-sm leading-relaxed">640×480 PNG를 ‘파일 선택’으로 추가해 기본 품질 75로 자동 처리했습니다. 결과를 받은 뒤 품질을 40으로 낮추고 ‘품질 적용’을 눌러 다시 다운로드했습니다. 두 결과 모두 픽셀은 그대로이고 형식은 WebP입니다.</p><ResultsTable headings={['파일 / 설정', '형식', '픽셀 크기', '실제 바이트', '원본 대비 감소율']} rows={[
 ['원본','PNG','640×480','184,044','—'],['압축 품질 75','WebP','640×480','7,268','96.05%'],['압축 품질 40','WebP','640×480','5,382','97.08%']]} /><p className="text-sm leading-relaxed">감소율 = (원본 바이트 − 결과 바이트) ÷ 원본 바이트 × 100, 소수 둘째 자리 반올림입니다. 이 사례에서는 둘 다 작아졌지만, 단순 도형과 투명 여백이 있는 일러스트의 결과로 사진에 동일한 감소율을 기대할 수는 없습니다. PNG→WebP 저장 방식 변경도 함께 일어났으므로 같은 형식의 압축률 비교가 아닙니다.</p><div className="grid gap-4 sm:grid-cols-2"><Sample file="original.png" label="압축 전 PNG: 글자·세로 선·그라데이션 비교 기준" /><Sample file="compressed-40.webp" label="품질 40 WebP: 글자 주변과 색 경계 변화 확인" /></div><p className="text-sm leading-relaxed">파일을 원래 배율로 열어 비교하니 품질 40 결과에서 글자 주변과 가는 선의 경계에 번짐·색 얼룩이 보였습니다. 작은 미리보기만으로 판단하지 말고 제출할 크기에서도 확인하세요. <a href={root + 'compressed-75.webp'} className="text-blue-600 underline">품질 75 결과</a>도 열어 원본과 비교할 수 있습니다. 품질 수치는 화질 보존율이 아니며 압축으로 잃은 정보가 이후 변환으로 복원되지는 않습니다.</p></section>
}

export function FormatWorkedExample() {
 return <section id="worked-example" className="space-y-4"><h2 className="text-2xl font-semibold">실측 사례: 투명 PNG를 JPG와 WebP로 저장</h2><Conditions /><p className="text-sm leading-relaxed">같은 투명 PNG를 이미지 변환기에 추가하고 WebP 결과를 받은 뒤 JPG를 선택했습니다. JPG 배경색은 기본 ‘흰색’을 사용했습니다. 픽셀 크기는 모두 640×480입니다. 아래 체크무늬는 투명 영역을 구분하기 위한 페이지 배경이며 이미지에 들어 있지 않습니다.</p><ResultsTable headings={['파일', '실제 형식', '실제 바이트', '모서리 확인', '사용 조건']} rows={[
 ['원본','PNG','184,044','투명 (alpha 0)','투명 원본 보관·다시 편집'],['JPG 변환','JPEG','24,268','흰색 (RGB 255/255/255)','JPG만 받는 제출처, 배경 확인'],['WebP 변환','WebP','12,672','투명 (alpha 0)','투명 배경과 WebP를 허용하는 웹 용도']]} /><div className="grid gap-4 sm:grid-cols-3"><Sample file="original.png" label="원본 PNG: 모서리가 투명" /><Sample file="converted.jpg" label="JPG: 투명 영역을 흰색으로 채움" /><Sample file="converted.webp" label="WebP: 모서리 투명도 유지" /></div><p className="text-sm leading-relaxed">JPG의 흰 배경은 투명하지 않습니다. 나중에 PNG로 저장해도 자동으로 투명해지지 않습니다. WebP도 이 변환에서는 손실 압축되므로 투명도가 남았다는 것과 원본 픽셀 정보가 모두 유지된다는 것은 다릅니다. 원본을 보관하고 제출처의 허용 형식과 실제 결과를 함께 확인하세요. 이 샘플에서는 WebP가 작았지만 모든 이미지에서 가장 작은 형식이라는 뜻은 아닙니다.</p></section>
}
