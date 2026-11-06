import type { Metadata } from 'next'
import Link from 'next/link'
import { absoluteUrl } from '@/lib/seo'
import { privacyUpdatedAt, siteOperator } from '@/lib/site-info'

const title = '개인정보처리방침 | JSTools'
const description = 'JSTools의 도구 입력 처리, 브라우저 저장소, 이용 통계, 광고 쿠키와 개인정보 문의 방법을 안내합니다.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/privacy') },
  openGraph: { title, description, url: absoluteUrl('/privacy'), siteName: 'JSTools', type: 'website', locale: 'ko_KR' },
  twitter: { card: 'summary', title, description },
  robots: { index: Boolean(siteOperator.email), follow: true },
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6 text-gray-800">
      <header className="space-y-3">
        <Link href="/" className="text-sm text-blue-600 hover:underline">JSTools 홈</Link>
        <h1 className="text-3xl font-bold">개인정보처리방침</h1>
        <p className="text-sm text-gray-600">최종 수정일: {privacyUpdatedAt}</p>
        <p className="leading-relaxed">JSTools는 도구 이용에 필요한 입력과 사이트 방문 과정에서 처리되는 정보를 아래와 같이 안내합니다. 운영자는 {siteOperator.name}입니다.</p>
      </header>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">1. 도구에 입력한 파일과 내용</h2>
        <p>이미지 압축·크기 조절·형식 변환·자르기에 선택한 이미지는 현재 브라우저에서 처리하며, 이미지 처리 서버로 업로드하지 않습니다. 미리보기와 다운로드용 임시 파일은 페이지를 닫거나 도구의 초기화 기능을 사용할 때 해제됩니다. 다운로드한 파일은 이용자의 기기에 남습니다.</p>
        <p>글자 수, 대소문자 변환, 날짜 계산, QR 코드 생성, JSON 정렬과 비밀번호 생성의 입력·결과를 해당 계산을 위해 서버에 전송하거나 운영자 데이터베이스에 저장하지 않습니다. 기기에 남는 다운로드 파일, 클립보드와 브라우저 기록은 이용자가 직접 관리해야 합니다.</p>
        <p>이 설명은 도구의 파일·계산 내용에 대한 것입니다. 사이트 접속 정보, 이용 통계와 광고 요청은 아래 항목과 같이 별도로 처리될 수 있습니다.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">2. 브라우저에 저장되는 정보</h2>
        <p>로또 번호 추천기의 저장 기능을 사용하면 선택한 번호가 현재 브라우저의 localStorage에 저장됩니다. 저장 항목 삭제 기능이나 브라우저의 사이트 데이터 삭제 기능으로 지울 수 있으며, 직접 삭제하거나 브라우저가 데이터를 정리하기 전까지 남을 수 있습니다.</p>
        <p>통계·광고 제공자는 방문 측정, 광고 제공과 부정 사용 방지를 위해 쿠키 또는 유사한 식별 기술을 사용할 수 있습니다. 모든 저장 정보가 페이지를 닫는 즉시 삭제되는 것은 아닙니다.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">3. 사이트 이용 통계</h2>
        <p>서비스 개선과 유입 경로 확인을 위해 Google Analytics 4와 네이버 애널리틱스를 사용합니다. 방문한 페이지 주소, 유입 경로, 접속 시각, 브라우저·기기 환경, 도구 조회·실행·다운로드 버튼 클릭 등의 이용 정보가 처리될 수 있습니다.</p>
        <p>JSTools의 도구 이벤트에는 도구명·분류·도구 경로·파일 형식·가이드 링크 정보만 포함하며, 입력한 텍스트·날짜·비밀번호·QR 내용·파일명·이미지 내용은 이벤트 파라미터에 포함하지 않습니다. 페이지 주소와 UTM 같은 유입 정보는 기본 방문 측정에 포함될 수 있으므로 주소나 캠페인 값에 개인정보를 넣지 마세요.</p>
        <p>통계 제공자에게 전송되는 정보와 보관 방식은 해당 서비스의 정책과 계정 설정에 따라 달라집니다. Google의 정보 이용 방법은 <a href="https://policies.google.com/technologies/partner-sites?hl=ko" className="text-blue-600 underline">Google 파트너 사이트 정보 이용 안내</a>, 네이버의 기준은 <a href="https://policy.naver.com/policy/privacy.html" className="text-blue-600 underline">네이버 개인정보처리방침</a>에서 확인할 수 있습니다.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">4. Google 광고와 쿠키</h2>
        <p>JSTools에는 Google AdSense 광고 코드가 포함되어 있습니다. 실제 광고 게재 여부는 사이트 승인과 광고 제공 상태에 따라 달라집니다.</p>
        <p>Google을 포함한 외부 광고 제공업체는 이용자의 이 사이트 및 다른 사이트 방문 기록을 바탕으로 광고를 제공하기 위해 쿠키를 사용할 수 있습니다. Google의 광고 쿠키를 사용하면 Google과 그 파트너가 이 사이트 또는 인터넷의 다른 사이트 방문 정보를 바탕으로 개인 맞춤 광고를 제공할 수 있습니다.</p>
        <p><a href="https://myadcenter.google.com/" className="text-blue-600 underline">Google 내 광고 센터</a>에서 개인 맞춤 광고 설정을 관리하거나 해제할 수 있습니다. 다른 광고 제공업체의 설정은 <a href="https://www.aboutads.info/choices/" className="text-blue-600 underline">광고 선택 안내</a>에서도 확인할 수 있습니다. 광고 개인화 해제가 모든 광고나 모든 쿠키를 차단한다는 뜻은 아닙니다.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">5. 외부 요청과 서비스 제공자</h2>
        <p>사이트는 Vercel을 통해 제공됩니다. 페이지와 리소스를 전달하고 보안을 유지하는 과정에서 IP 주소, 요청 주소, 접속 시각과 기기·브라우저 정보 같은 요청 정보가 호스팅 제공자에게 처리될 수 있습니다. 자세한 사항은 <a href="https://vercel.com/legal/privacy-notice" className="text-blue-600 underline">Vercel 개인정보 안내</a>를 참고해 주세요.</p>
        <p>명언 생성기를 실행하면 외부 명언 서비스와 LibreTranslate 번역 서비스에 요청할 수 있으며, 번역 요청에는 불러온 명언 문장이 포함됩니다. 외부 서비스는 요청을 받는 과정에서 접속 정보 등을 처리할 수 있습니다.</p>
        <p>외부 제공자의 처리 환경에 따라 정보가 대한민국 밖의 서버에서 처리될 수 있습니다. 제공자별 처리·보관 조건은 각 서비스의 정책과 설정에 따릅니다.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">6. 이용자의 선택</h2>
        <p>브라우저 설정에서 쿠키와 사이트 데이터를 확인·삭제하거나 저장을 제한할 수 있습니다. 차단 시 로또 번호 저장이나 일부 사이트 기능에 영향을 줄 수 있습니다. 통계 수집은 <a href="https://tools.google.com/dlpage/gaoptout?hl=ko" className="text-blue-600 underline">Google Analytics 차단 도구</a>와 브라우저의 추적 방지 설정을 통해 제한할 수도 있습니다.</p>
        <p>기기나 브라우저를 바꾸면 쿠키·광고 선택 설정을 다시 적용해야 할 수 있습니다. 이미 보낸 통계나 외부 제공자가 처리하는 정보에 관한 요청은 해당 제공자의 안내도 함께 확인해 주세요.</p>
      </section>
      <section className="space-y-3 leading-relaxed">
        <h2 className="text-xl font-semibold">7. 문의와 방침 변경</h2>
        {siteOperator.email ? (
          <p className="break-words">개인정보 관련 문의: {siteOperator.name} · <a href={`mailto:${siteOperator.email}`} className="text-blue-600 underline">{siteOperator.email}</a></p>
        ) : (
          <p>운영자의 공개 문의 이메일을 준비하고 있습니다.</p>
        )}
        <p>문의 이메일로 제공한 회신 주소와 문의 내용은 문의 확인과 답변에 사용합니다. 비밀번호, 인증번호나 민감한 개인정보를 보내지 마세요. 처리 내역 확인·정정·삭제와 관련한 요청을 접수할 수 있습니다.</p>
        <p>서비스 또는 정보 처리 방식이 달라지면 이 페이지를 수정하고 상단의 수정일을 갱신합니다. 문의 방법은 <Link href="/contact" className="text-blue-600 underline">문의 페이지</Link>에서도 확인할 수 있습니다.</p>
      </section>
    </main>
  )
}
