export const toolGroups = [
  { id: 'image', label: '이미지 도구', icon: 'image', tools: ['image-resizer', 'image-compressor', 'image-converter', 'image-cropper'] },
  { id: 'text', label: '텍스트 도구', icon: 'text', tools: ['word-counter', 'case-converter'] },
  { id: 'date', label: '날짜 도구', icon: 'calendar', tools: ['date-calculator'] },
  { id: 'dev', label: '개발 도구', icon: 'code', tools: ['json-formatter'] },
  { id: 'security', label: '보안 도구', icon: 'shield', tools: ['password-generator'] },
  { id: 'utility', label: 'QR·생활', icon: 'grid', tools: ['qrcode-generator'] },
  { id: 'fun', label: '재미 도구', icon: 'spark', tools: ['lotto-generator', 'quote-generator'] },
] as const

export const toolSummaries: Record<string, string> = {
  'image-resizer': '가로세로 픽셀 또는 퍼센트로 사진 크기를 바꿉니다.',
  'image-compressor': '품질을 조절하고 원본과 결과 용량을 비교합니다.',
  'image-converter': 'JPG·PNG·WebP를 다른 이미지 형식으로 저장합니다.',
  'image-cropper': '사진에서 필요한 영역을 선택해 잘라냅니다.',
  'word-counter': '공백 포함·제외 글자 수, 단어 수, 줄 수를 확인합니다.',
  'case-converter': '영문을 대문자·소문자·Title Case 등으로 바꿉니다.',
  'date-calculator': '두 날짜의 차이와 기준일 전후 날짜를 계산합니다.',
  'json-formatter': 'JSON을 정렬하고 문법 오류를 확인합니다.',
  'password-generator': '길이와 포함할 문자 옵션으로 비밀번호를 만듭니다.',
  'qrcode-generator': '입력한 텍스트나 URL을 QR 코드로 표시합니다.',
  'lotto-generator': '기분·색상·선호 숫자를 바탕으로 재미로 번호를 추천합니다.',
  'quote-generator': '영어 명언과 한국어 번역을 함께 확인합니다.',
}

export const guideLinks = [
  { href: '/guide/image-resize', title: '사진 픽셀 크기 변경 가이드', description: '정확한 규격과 가로세로 비율을 맞추는 방법' },
  { href: '/guide/image-compression', title: '사진 용량 줄이기 가이드', description: '품질 조절과 크기·형식 변경을 선택하는 기준' },
  { href: '/guide/jpg-vs-webp', title: 'JPG·PNG·WebP 차이', description: '투명 배경과 제출 조건에 맞는 이미지 형식' },
]
