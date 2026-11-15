# 기능·신뢰성 회귀 검사

추가 테스트 프레임워크 없이 Node.js 22.14 이상과 기존 JSZip을 사용합니다.

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
npm.cmd exec tsc -- --noEmit
$env:SEO_STRICT='1'
node scripts/seo-audit.mjs http://127.0.0.1:3104
```

빌드 후 `npm.cmd run start -- --port 3104 --hostname 127.0.0.1`로 실행합니다.
Node 22에서는 타입 제거의 experimental/module-type 경고가 나올 수 있습니다.
사이트의 CommonJS 설정에 영향을 주는 package type 변경은 하지 않습니다.

## 실제 Chromium 흐름

기존 Playwright CLI가 있는 환경에서 실행합니다. 새로운 프레임워크 설치는 필요하지 않습니다.

```powershell
New-Item -ItemType Directory -Force output/playwright/quality-20261115 | Out-Null
npx.cmd --offline --package @playwright/cli playwright-cli -s=quality open about:blank --headed
npx.cmd --offline --package @playwright/cli playwright-cli -s=quality run-code --filename tests/browser-quality.js
npx.cmd --offline --package @playwright/cli playwright-cli -s=quality close
```

about:blank에서 시작하면 기본 로컬 주소 3104를 검사합니다. 기존 HTTP 페이지에서 시작하면 해당 origin을 검사합니다.
분석·광고 도메인은 테스트 컨텍스트에서 차단합니다. 명언·번역 제공자는 차단하지 않습니다.
로컬에서는 명언 정상 수신 후 503·번역 네트워크 실패·HTTP504·비정상 응답을 모의합니다.
운영 origin에서는 모의 API 실패 및 비밀번호 경계 테스트를 건너뛰고 대표 흐름을 확인합니다.

비밀번호 복사 성공/권한 거절은 브라우저 Clipboard API 모의로 검증하며 OS 클립보드를 덮어쓰지 않습니다.
로또 테스트는 격리된 테스트 브라우저의 저장소에만 손상 데이터를 넣고 생성·저장·새로고침·삭제를 확인합니다.
이미지 샘플은 테스트 탭의 canvas에서 생성합니다. 같은 이름/다른 내용의 PNG, 기존 숫자 이름, JPG와 WebP를 사용합니다.
ZIP과 이미지 다운로드는 output에 저장됩니다. ZIP 실제 엔트리 수·규격·형식·내용 대응·투명도는 다운로드 파일을 별도로 디코딩해 확인합니다.
단위 테스트는 실제 JSZip 왕복으로 이름·엔트리 수·인덱스별 원래 내용 보존을 검사합니다.

개발용 경로는 `npm.cmd run dev -- --port 3105`에서 200/noindex/광고 없음,
프로덕션 빌드에서는 404/noindex/광고 없음이 기대값입니다.
`SEO_TEST_MODE=development`는 개발 서버의 SEO 검사에만 사용하는 옵션이며 운영 차단을 해제하는 설정이 아닙니다.

## 2차 콘텐츠 사례 확인

프로덕션 빌드의 로컬 서버를 연 뒤 기존 Playwright CLI로 해당 주소에 이동하고 실행합니다.

```powershell
npx.cmd --offline --package @playwright/cli playwright-cli -s=phase2 open http://127.0.0.1:3104 --headed
npx.cmd --offline --package @playwright/cli playwright-cli -s=phase2 run-code --filename tests/browser-content.js
```

날짜 0일·윤년·월말·역순, 글자수 2종, JSON 정상/오류, 대소문자 5종, QR 표시, 세 가이드의 1280/768/390px 화면·샘플 링크·가로 넘침을 확인합니다. 캡처는 `output/playwright/phase2/`에 저장하며 실제 이미지를 별도로 열어 검토해야 합니다. QR의 물리 카메라 스캔은 이 검사에 포함되지 않습니다. 분석·광고 요청은 테스트 탭에서 차단합니다.

공개 예시 파일은 `public/examples/image-workflows/`에 있습니다. 원본은 직접 그린 640×480 투명 PNG이며 브라우저에서 받은 리사이즈·압축·변환 결과입니다. 조건·측정값과 검토 범위는 `docs/adsense-phase2-result.md`에 기록합니다. 기존 `browser-quality.js`는 1차 ZIP·비밀번호·로또·명언 회귀 검증에 계속 사용합니다.
