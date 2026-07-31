export type ToolFaq = {
  question: string
  answer: string
}

export type RelatedTool = {
  href: string
  title: string
  description: string
}

export type ToolContent = {
  introHeading: string
  description: string[]
  howTo: string[]
  faq: ToolFaq[]
}

export type ToolDefinition = {
  id: string
  name: string
  title: string
  description: string
  path: string
  categoryName: string
  categoryPath: string
  keywords: string[]
  content: ToolContent
  relatedTools: RelatedTool[]
}

const related = {
  wordCounter: {
    href: '/tools/text/word-counter',
    title: '글자 수 세기',
    description: '텍스트의 글자 수, 단어 수, 줄 수를 실시간으로 계산합니다.',
  },
  caseConverter: {
    href: '/tools/text/case-converter',
    title: '대소문자 변환기',
    description: '영문 텍스트를 대문자, 소문자, Title Case 등으로 변환합니다.',
  },
  jsonFormatter: {
    href: '/tools/dev/json-formatter',
    title: 'JSON 포맷터',
    description: 'JSON 데이터를 보기 좋게 정렬하고 구조를 확인합니다.',
  },
  qrCodeGenerator: {
    href: '/tools/utility/qrcode-generator',
    title: 'QR 코드 생성기',
    description: '텍스트나 URL을 QR 코드로 빠르게 변환합니다.',
  },
  imageCompressor: {
    href: '/tools/image/image-compressor',
    title: '이미지 용량 줄이기',
    description: 'JPG, PNG, WEBP 이미지를 브라우저에서 압축합니다.',
  },
  imageResizer: {
    href: '/tools/image/image-resizer',
    title: '이미지 크기 조절기',
    description: 'JPG, PNG, WEBP 이미지의 픽셀과 사이즈를 브라우저에서 변경합니다.',
  },
  imageConverter: {
    href: '/tools/image/image-converter',
    title: '이미지 변환기',
    description: 'JPG, PNG, WebP 이미지 파일 형식을 브라우저에서 변환합니다.',
  },
  imageCropper: {
    href: '/tools/image/image-cropper',
    title: '이미지 자르기',
    description: '사진에서 원하는 영역만 선택해 브라우저에서 자릅니다.',
  },
  dateCalculator: {
    href: '/tools/date/date-calculator',
    title: '날짜 계산기',
    description: '두 날짜의 차이와 기준일 전후 날짜를 계산합니다.',
  },
  passwordGenerator: {
    href: '/tools/security/password-generator',
    title: '랜덤 비밀번호 생성기',
    description: '길이와 옵션을 선택해 보안성 높은 비밀번호를 생성합니다.',
  },
  lottoGenerator: {
    href: '/tools/fun/lotto-generator',
    title: '로또 번호 추천기',
    description: '기분, 색상, 선호 숫자를 바탕으로 재미있는 번호를 추천합니다.',
  },
  quoteGenerator: {
    href: '/tools/fun/quote-generator',
    title: '명언 생성기',
    description: '영어 명언과 한국어 번역을 함께 확인합니다.',
  },
} satisfies Record<string, RelatedTool>

export const wordCounterTool: ToolDefinition = {
  id: 'word-counter',
  name: '글자 수 세기',
  title: '글자 수 세기 - 단어 수, 공백 제외 글자 수 계산 | JSTools',
  description:
    '텍스트를 입력하면 글자 수, 공백 제외 글자 수, 단어 수, 줄 수를 실시간으로 계산하는 무료 Word Counter 도구입니다.',
  path: '/tools/text/word-counter',
  categoryName: '텍스트 도구',
  categoryPath: '/tools',
  keywords: [
    '글자 수 세기',
    '단어 수 세기',
    '공백 제외 글자 수',
    '텍스트 카운터',
    'word counter',
    'character counter',
    'JSTools',
  ],
  content: {
    introHeading: '글자 수 세기 소개',
    description: [
      '글자 수 세기는 입력한 텍스트의 길이를 빠르게 확인하는 무료 온라인 도구입니다. 별도 설치나 로그인 없이 브라우저에서 바로 사용할 수 있으며, 입력 내용은 현재 화면에서만 계산됩니다.',
      '글자 수는 공백 포함과 공백 제외 기준을 함께 보여주고, 단어 수는 공백 기준으로 자동 계산합니다. 줄 수까지 같이 확인할 수 있어 짧은 문구부터 긴 문서 초안까지 간단히 점검할 수 있습니다.',
    ],
    howTo: [
      '텍스트 입력창에 확인할 문장을 붙여넣거나 직접 입력합니다.',
      '입력과 동시에 글자 수, 공백 제외 글자 수, 단어 수, 줄 수를 확인합니다.',
      '필요한 기준에 맞춰 문장을 줄이거나 늘린 뒤 다시 결과를 확인합니다.',
    ],
    faq: [
      {
        question: '공백 제외 글자 수는 어떻게 계산하나요?',
        answer: '띄어쓰기, 줄바꿈, 탭 같은 공백 문자를 제외하고 남은 문자만 계산합니다.',
      },
      {
        question: '단어 수는 어떤 기준으로 세나요?',
        answer: '공백으로 구분된 텍스트 묶음을 단어로 계산합니다. 여러 칸의 공백은 하나의 구분자로 처리합니다.',
      },
      {
        question: '입력한 텍스트가 저장되나요?',
        answer: '아니요. 이 페이지는 입력한 텍스트를 화면에서 즉시 계산하며 별도로 저장하지 않습니다.',
      },
    ],
  },
  relatedTools: [related.caseConverter, related.jsonFormatter, related.qrCodeGenerator],
}

export const caseConverterTool: ToolDefinition = {
  id: 'case-converter',
  name: '대소문자 변환기',
  title: '대소문자 변환기 - 영문 텍스트 케이스 변환 | JSTools',
  description:
    '입력한 영문 텍스트를 대문자, 소문자, Capitalize, Title Case, Swap Case 형식으로 빠르게 변환하는 무료 도구입니다.',
  path: '/tools/text/case-converter',
  categoryName: '텍스트 도구',
  categoryPath: '/tools',
  keywords: ['대소문자 변환기', '대문자 변환', '소문자 변환', 'Title Case', '텍스트 변환', 'JSTools'],
  content: {
    introHeading: '대소문자 변환기 소개',
    description: [
      '대소문자 변환기는 입력한 텍스트를 여러 영문 케이스 형식으로 빠르게 바꿔주는 도구입니다. 반복적인 편집 작업을 줄이고 문서, 코드, 제목 작성 시 일관된 스타일을 유지하는 데 도움이 됩니다.',
      '대문자, 소문자, 단어 첫 글자 대문자, Title Case, Swap Case를 버튼으로 바로 적용할 수 있습니다.',
    ],
    howTo: [
      '변환할 텍스트를 입력창에 붙여넣습니다.',
      '원하는 변환 버튼을 선택합니다.',
      '결과 영역에 표시된 변환 텍스트를 확인하고 사용합니다.',
    ],
    faq: [
      {
        question: 'Title Case는 어떤 형식인가요?',
        answer: '각 단어의 첫 글자를 대문자로 바꾸고 나머지 글자는 소문자로 정리하는 형식입니다.',
      },
      {
        question: '한글도 변환되나요?',
        answer: '대소문자 개념이 있는 영문자를 중심으로 변환되며, 한글은 대부분 원래 형태로 유지됩니다.',
      },
      {
        question: '입력한 텍스트가 저장되나요?',
        answer: '아니요. 텍스트는 현재 브라우저 화면에서만 처리됩니다.',
      },
    ],
  },
  relatedTools: [related.wordCounter, related.jsonFormatter, related.qrCodeGenerator],
}

export const dateCalculatorTool: ToolDefinition = {
  id: 'date-calculator',
  name: '날짜 계산기',
  title: '날짜 계산기 - 날짜 차이와 기준일 전후 계산 | JSTools',
  description:
    '두 날짜 사이의 일수 차이를 계산하거나 기준일로부터 며칠 전후 날짜를 확인할 수 있는 무료 날짜 계산 도구입니다.',
  path: '/tools/date/date-calculator',
  categoryName: '날짜 도구',
  categoryPath: '/tools',
  keywords: ['날짜 계산기', '날짜 차이', '일수 계산', '기준일 계산', '며칠 후 날짜', 'JSTools'],
  content: {
    introHeading: '날짜 계산기 소개',
    description: [
      '날짜 계산기는 두 날짜 사이의 차이를 계산하거나 기준일로부터 며칠 전 또는 후의 날짜를 구하는 도구입니다.',
      '일정 관리, 프로젝트 마감일 계산, 기념일 확인처럼 날짜 기준이 필요한 작업에 활용할 수 있습니다.',
    ],
    howTo: [
      '날짜 차이를 계산하려면 시작일과 종료일을 입력합니다.',
      '기준일 전후 날짜를 계산하려면 기준일, 방향, 일 수를 입력합니다.',
      '입력 후 화면에 표시되는 일수 차이 또는 결과 날짜를 확인합니다.',
    ],
    faq: [
      {
        question: '날짜 차이는 어떤 단위로 계산되나요?',
        answer: '시작일과 종료일 사이의 차이를 일 단위로 계산합니다.',
      },
      {
        question: '기준일 이전 날짜도 계산할 수 있나요?',
        answer: '네. 방향 선택에서 전을 고르면 기준일보다 이전 날짜를 계산할 수 있습니다.',
      },
      {
        question: '시간까지 포함해서 계산하나요?',
        answer: '아니요. 현재 도구는 날짜 기준의 일수 차이만 계산합니다.',
      },
    ],
  },
  relatedTools: [related.wordCounter, related.passwordGenerator, related.qrCodeGenerator],
}

export const jsonFormatterTool: ToolDefinition = {
  id: 'json-formatter',
  name: 'JSON 포맷터',
  title: 'JSON 포맷터 - JSON 정렬 및 보기 좋게 변환 | JSTools',
  description:
    'JSON 문자열을 입력하면 들여쓰기와 줄바꿈을 적용해 보기 좋게 정렬하고 유효하지 않은 JSON 오류를 확인하는 개발자 도구입니다.',
  path: '/tools/dev/json-formatter',
  categoryName: '개발자 도구',
  categoryPath: '/tools',
  keywords: ['JSON 포맷터', 'JSON 정렬', 'JSON Formatter', 'JSON 보기', '개발자 도구', 'JSTools'],
  content: {
    introHeading: 'JSON 포맷터 소개',
    description: [
      'JSON 포맷터는 압축되거나 읽기 어려운 JSON 문자열을 보기 좋게 정렬하는 개발자용 도구입니다.',
      '입력한 JSON이 올바른 형식인지 확인하고, 들여쓰기된 결과를 통해 데이터 구조를 빠르게 파악할 수 있습니다.',
    ],
    howTo: [
      '입력창에 JSON 문자열을 붙여넣습니다.',
      '포맷팅 버튼을 누릅니다.',
      '정렬된 결과 또는 JSON 형식 오류 메시지를 확인합니다.',
    ],
    faq: [
      {
        question: '유효하지 않은 JSON도 정렬할 수 있나요?',
        answer: '아니요. JSON 문법이 올바르지 않으면 오류 메시지를 표시합니다.',
      },
      {
        question: '결과는 몇 칸 들여쓰기로 표시되나요?',
        answer: '읽기 쉬운 형태로 2칸 들여쓰기를 적용합니다.',
      },
      {
        question: 'JSON 데이터가 서버로 전송되나요?',
        answer: '아니요. 현재 화면에서 브라우저가 직접 처리합니다.',
      },
    ],
  },
  relatedTools: [related.caseConverter, related.wordCounter, related.qrCodeGenerator],
}

export const lottoGeneratorTool: ToolDefinition = {
  id: 'lotto-generator',
  name: '운세 기반 로또 번호 추천기',
  title: '운세 기반 로또 번호 추천기 - 재미있는 랜덤 번호 생성 | JSTools',
  description:
    '오늘의 기분, 좋아하는 색상, 선호 숫자를 바탕으로 재미있게 로또 번호를 추천받고 저장할 수 있는 랜덤 번호 도구입니다.',
  path: '/tools/fun/lotto-generator',
  categoryName: '재미 도구',
  categoryPath: '/tools',
  keywords: ['로또 번호 추천', '로또 번호 생성기', '운세 로또', '랜덤 번호', '행운 번호', 'JSTools'],
  content: {
    introHeading: '운세 기반 로또 번호 추천기 소개',
    description: [
      '운세 기반 로또 번호 추천기는 사용자의 감정, 좋아하는 색상, 선호 숫자 등 간단한 정보를 바탕으로 랜덤 요소를 결합해 번호를 추천하는 재미용 도구입니다.',
      '진지한 투자 목적보다는 일상 속 소소한 재미를 위한 도구로 활용할 수 있으며, 추천된 번호를 브라우저에 저장해 다시 확인할 수 있습니다.',
    ],
    howTo: [
      '오늘의 기분과 좋아하는 색을 선택합니다.',
      '원하는 경우 좋아하는 숫자를 입력합니다.',
      '번호 추천 받기를 눌러 결과를 확인하고 필요하면 저장합니다.',
    ],
    faq: [
      {
        question: '추천 번호는 당첨을 보장하나요?',
        answer: '아니요. 이 도구는 재미용 랜덤 번호 추천 도구이며 당첨을 보장하지 않습니다.',
      },
      {
        question: '저장한 번호는 어디에 보관되나요?',
        answer: '저장한 번호는 사용 중인 브라우저의 localStorage에 저장됩니다.',
      },
      {
        question: '좋아하는 숫자를 꼭 입력해야 하나요?',
        answer: '아니요. 좋아하는 숫자는 선택 사항이며 입력하지 않아도 번호를 추천받을 수 있습니다.',
      },
    ],
  },
  relatedTools: [related.quoteGenerator, related.dateCalculator, related.passwordGenerator],
}

export const passwordGeneratorTool: ToolDefinition = {
  id: 'password-generator',
  name: '랜덤 비밀번호 생성기',
  title: '랜덤 비밀번호 생성기 - 안전한 비밀번호 만들기 | JSTools',
  description:
    '길이, 숫자, 대소문자, 특수문자 옵션을 선택해 보안성 높은 랜덤 비밀번호를 생성하고 복사할 수 있는 무료 도구입니다.',
  path: '/tools/security/password-generator',
  categoryName: '보안 도구',
  categoryPath: '/tools',
  keywords: ['랜덤 비밀번호', '비밀번호 생성기', '보안 비밀번호', '암호 생성', '패스워드 생성', 'JSTools'],
  content: {
    introHeading: '랜덤 비밀번호 생성기 소개',
    description: [
      '랜덤 비밀번호 생성기는 문자, 숫자, 특수문자 조합과 길이를 선택해 복잡한 비밀번호를 만드는 도구입니다.',
      '회원가입, 계정 보안 강화, 암호 관리자 등록처럼 새 비밀번호가 필요할 때 빠르게 사용할 수 있습니다.',
    ],
    howTo: [
      '비밀번호 길이와 포함할 문자 옵션을 선택합니다.',
      '필요하면 기억하기 쉬운 비밀번호 모드를 켭니다.',
      '비밀번호 생성 버튼을 누르고 결과를 복사합니다.',
    ],
    faq: [
      {
        question: '기억하기 쉬운 비밀번호 모드는 무엇인가요?',
        answer: '영단어, 숫자, 특수문자를 조합해 상대적으로 기억하기 쉬운 형태의 비밀번호를 만드는 옵션입니다.',
      },
      {
        question: '생성한 비밀번호가 저장되나요?',
        answer: '아니요. 생성 결과는 현재 화면에만 표시되며 별도로 저장하지 않습니다.',
      },
      {
        question: '특수문자를 제외할 수 있나요?',
        answer: '네. 특수문자 포함 옵션을 끄면 특수문자 없이 비밀번호를 생성할 수 있습니다.',
      },
    ],
  },
  relatedTools: [related.qrCodeGenerator, related.jsonFormatter, related.wordCounter],
}

export const qrCodeGeneratorTool: ToolDefinition = {
  id: 'qrcode-generator',
  name: 'QR 코드 생성기',
  title: 'QR 코드 생성기 - 텍스트와 URL을 QR 코드로 변환 | JSTools',
  description:
    '텍스트나 URL을 입력하면 브라우저에서 즉시 QR 코드를 생성해주는 무료 QR 코드 생성 도구입니다.',
  path: '/tools/utility/qrcode-generator',
  categoryName: '유틸리티 도구',
  categoryPath: '/tools',
  keywords: ['QR 코드 생성기', 'QR 만들기', 'URL QR 코드', '텍스트 QR 코드', 'QR 변환', 'JSTools'],
  content: {
    introHeading: 'QR 코드 생성기 소개',
    description: [
      'QR 코드 생성기는 입력한 텍스트, URL, 연락처 등의 정보를 기반으로 실시간 QR 코드를 생성하는 도구입니다.',
      '웹사이트 링크 공유, 명함, 전단지, 와이파이 접속 정보 안내 등 다양한 상황에서 사용할 수 있습니다.',
    ],
    howTo: [
      'QR 코드로 변환할 텍스트나 URL을 입력합니다.',
      '입력과 동시에 화면에 생성되는 QR 코드를 확인합니다.',
      '필요한 곳에서 QR 코드를 스캔하거나 화면을 활용합니다.',
    ],
    faq: [
      {
        question: 'URL이 아닌 일반 텍스트도 QR 코드로 만들 수 있나요?',
        answer: '네. URL뿐 아니라 일반 텍스트도 QR 코드로 변환할 수 있습니다.',
      },
      {
        question: '입력한 내용이 저장되나요?',
        answer: '아니요. 입력한 내용은 현재 브라우저 화면에서만 QR 코드로 렌더링됩니다.',
      },
      {
        question: 'QR 코드는 언제 생성되나요?',
        answer: '텍스트나 URL을 입력하면 화면에서 바로 QR 코드가 생성됩니다.',
      },
    ],
  },
  relatedTools: [related.wordCounter, related.caseConverter, related.jsonFormatter],
}

export const quoteGeneratorTool: ToolDefinition = {
  id: 'quote-generator',
  name: '명언 생성기',
  title: '명언 생성기 - 영어 명언과 한국어 번역 보기 | JSTools',
  description:
    '영어 명언을 무작위로 불러오고 한국어 번역을 함께 확인할 수 있는 간단한 명언 생성 도구입니다.',
  path: '/tools/fun/quote-generator',
  categoryName: '재미 도구',
  categoryPath: '/tools',
  keywords: ['명언 생성기', '영어 명언', '한국어 번역 명언', '동기부여 문구', '랜덤 명언', 'JSTools'],
  content: {
    introHeading: '명언 생성기 소개',
    description: [
      '명언 생성기는 영어 명언을 무작위로 불러오고 한국어 번역을 함께 보여주는 도구입니다.',
      '짧은 동기부여 문구가 필요하거나 영어 표현과 한국어 의미를 함께 보고 싶을 때 사용할 수 있습니다.',
    ],
    howTo: [
      '명언 생성하기 버튼을 누릅니다.',
      '영어 명언과 작성자를 확인합니다.',
      '함께 표시되는 한국어 번역을 참고합니다.',
    ],
    faq: [
      {
        question: '명언은 어디에서 가져오나요?',
        answer: '페이지에서 외부 명언 API를 호출해 무작위 영어 명언을 가져옵니다.',
      },
      {
        question: '한국어 번역도 자동으로 표시되나요?',
        answer: '네. 명언을 가져온 뒤 번역 API를 호출해 한국어 번역을 함께 표시합니다.',
      },
      {
        question: '명언을 불러오지 못하면 어떻게 되나요?',
        answer: '외부 API 호출에 실패하면 실패 안내 문구를 표시합니다.',
      },
    ],
  },
  relatedTools: [related.lottoGenerator, related.wordCounter, related.caseConverter],
}

export const imageCompressorTool: ToolDefinition = {
  id: 'image-compressor',
  name: '이미지 용량 줄이기',
  title: '이미지 용량 줄이기 - JPG PNG WEBP 압축 | JSTools',
  description:
    'JPG, JPEG, PNG, WEBP 이미지를 서버 업로드 없이 브라우저에서 압축하고 개별 다운로드 또는 ZIP 다운로드할 수 있는 무료 이미지 압축 도구입니다. PNG는 품질 압축을 위해 WebP로 변환됩니다.',
  path: '/tools/image/image-compressor',
  categoryName: '이미지 도구',
  categoryPath: '/tools/image',
  keywords: [
    '이미지 용량 줄이기',
    '이미지 압축',
    'JPG 압축',
    'PNG 압축',
    'WEBP 압축',
    'Image Compressor',
    'JSTools',
  ],
  content: {
    introHeading: '이미지 용량 줄이기 소개',
    description: [
      '이미지 용량 줄이기는 JPG, JPEG, PNG, WEBP 파일을 브라우저 안에서 압축하는 무료 도구입니다. 파일은 서버로 업로드되지 않고 사용 중인 기기에서만 처리됩니다.',
      '여러 이미지를 한 번에 추가하고, 품질 슬라이더로 압축 강도를 조절한 뒤 개별 파일 또는 전체 ZIP 파일로 다운로드할 수 있습니다. PNG는 품질 설정이 적용되도록 WebP 파일로 저장됩니다.',
    ],
    howTo: [
      '이미지를 업로드 영역에 끌어다 놓거나 파일 선택 버튼으로 추가합니다.',
      '품질 슬라이더를 조절하고 필요하면 품질 적용 버튼으로 다시 압축합니다.',
      '결과 목록에서 원본 용량, 압축 후 용량, 절감률을 확인한 뒤 개별 또는 ZIP으로 다운로드합니다.',
    ],
    faq: [
      {
        question: '이미지가 서버로 업로드되나요?',
        answer: '아니요. 이 도구는 브라우저 내부에서만 이미지를 처리하며 서버로 업로드하지 않습니다.',
      },
      {
        question: '어떤 이미지 형식을 지원하나요?',
        answer: 'JPG, JPEG, PNG, WEBP 파일을 지원합니다. 그 외 형식은 오류로 표시됩니다.',
      },
      {
        question: 'PNG도 항상 용량이 줄어드나요?',
        answer: 'PNG는 브라우저에서 품질 값을 직접 적용하기 어렵기 때문에 WebP로 변환해 압축합니다. 이미지에 따라 결과가 원본보다 커질 수도 있으므로 압축 후 용량을 확인해 주세요.',
      },
    ],
  },
  relatedTools: [related.imageResizer, related.imageCropper, related.imageConverter],
}

export const imageResizerTool: ToolDefinition = {
  id: 'image-resizer',
  name: '이미지 크기 조절기',
  title: '이미지 크기 조절기 - 사진 픽셀과 사이즈 변경 | JSTools',
  description:
    'JPG, PNG, WEBP 이미지를 서버 업로드 없이 브라우저에서 크기 조절하고, 픽셀 또는 퍼센트 기준으로 여러 이미지를 한 번에 리사이즈할 수 있는 무료 도구입니다.',
  path: '/tools/image/image-resizer',
  categoryName: '이미지 도구',
  categoryPath: '/tools/image',
  keywords: [
    '이미지 크기 조절',
    '사진 크기 조절',
    '이미지 사이즈 변경',
    '사진 사이즈 줄이기',
    '이미지 픽셀 변경',
    '이미지 리사이즈',
    'JSTools',
  ],
  content: {
    introHeading: '이미지 크기 조절기 소개',
    description: [
      '이미지 크기 조절기는 JPG, JPEG, PNG, WEBP 파일의 가로세로 크기를 브라우저 안에서 변경하는 무료 도구입니다. 업로드한 이미지는 서버로 전송되지 않으며 사용 중인 기기에서만 처리됩니다.',
      '픽셀 기준으로 원하는 가로 또는 세로 크기를 지정하거나, 25%, 50%, 75% 및 직접 입력한 퍼센트 기준으로 여러 이미지를 한 번에 리사이즈할 수 있습니다.',
    ],
    howTo: [
      '이미지를 업로드 영역에 끌어다 놓거나 파일 선택 버튼으로 추가합니다.',
      '픽셀 기준 또는 퍼센트 기준 중 원하는 크기 조절 방식을 선택합니다.',
      '가로세로 비율 유지 여부와 크기 값을 확인한 뒤 크기 적용 버튼을 누릅니다.',
      '결과 목록에서 원본 크기, 결과 크기, 결과 형식을 확인하고 개별 파일 또는 전체 ZIP으로 다운로드합니다.',
    ],
    faq: [
      {
        question: '이미지가 서버로 업로드되나요?',
        answer: '아니요. 이 도구는 브라우저 내부에서만 이미지를 처리하며 서버로 업로드하지 않습니다.',
      },
      {
        question: 'PNG 투명 배경이 유지되나요?',
        answer: '네. PNG는 PNG 형식으로 출력해 투명 배경을 유지합니다.',
      },
      {
        question: '원본보다 크게 확대하면 화질이 좋아지나요?',
        answer: '아니요. 원본보다 크게 확대하면 픽셀 수는 늘어나지만 이미지가 흐려질 수 있습니다.',
      },
      {
        question: '여러 이미지의 원본 크기가 달라도 사용할 수 있나요?',
        answer: '네. 퍼센트 기준은 각 이미지의 원본 크기를 기준으로 적용하고, 픽셀 기준은 입력한 가로 또는 세로 값을 각 이미지에 맞게 적용합니다.',
      },
    ],
  },
  relatedTools: [related.imageCompressor, related.imageCropper, related.imageConverter],
}

export const imageConverterTool: ToolDefinition = {
  id: 'image-converter',
  name: '이미지 변환기',
  title: '이미지 변환기 - JPG PNG WebP 포맷 변환 | JSTools',
  description:
    'JPG, JPEG, PNG, WebP 이미지를 서버 업로드 없이 브라우저에서 변환하고, 개별 파일 또는 ZIP으로 다운로드할 수 있는 무료 이미지 포맷 변환 도구입니다.',
  path: '/tools/image/image-converter',
  categoryName: '이미지 도구',
  categoryPath: '/tools/image',
  keywords: [
    '이미지 변환',
    '이미지 포맷 변환',
    'JPG PNG 변환',
    'PNG JPG 변환',
    'WEBP JPG 변환',
    'JPG WEBP 변환',
    '사진 파일 형식 변환',
    'JSTools',
  ],
  content: {
    introHeading: '이미지 변환기 소개',
    description: [
      '이미지 변환기는 JPG, JPEG, PNG, WebP 파일을 브라우저 안에서 다른 이미지 형식으로 바꾸는 무료 도구입니다. 업로드한 이미지는 서버로 전송되지 않고 사용 중인 기기에서만 처리됩니다.',
      '여러 이미지를 한 번에 추가하고 하나의 출력 형식을 선택해 일괄 변환할 수 있습니다. 해상도와 비율은 유지되며, 변환 결과는 개별 파일 또는 ZIP 파일로 다운로드할 수 있습니다.',
    ],
    howTo: [
      '이미지를 업로드 영역에 끌어다 놓거나 파일 선택 버튼으로 추가합니다.',
      'JPG, PNG, WebP 중 원본과 다른 출력 형식을 선택합니다.',
      'JPG로 변환할 때는 투명 영역을 채울 배경색을 선택합니다.',
      '결과 목록에서 원본 형식, 결과 형식, 용량을 확인하고 개별 파일 또는 전체 ZIP으로 다운로드합니다.',
    ],
    faq: [
      {
        question: '이미지가 서버로 업로드되나요?',
        answer: '아니요. 이 도구는 브라우저 내부에서만 이미지를 처리하며 서버로 업로드하지 않습니다.',
      },
      {
        question: '어떤 형식으로 변환할 수 있나요?',
        answer: 'JPG, PNG, WebP 파일을 입력받아 JPG, PNG, WebP 중 원본과 다른 형식으로 변환할 수 있습니다.',
      },
      {
        question: '투명 배경은 유지되나요?',
        answer: 'PNG 또는 WebP로 출력하면 가능한 경우 투명 배경을 유지합니다. JPG는 투명을 지원하지 않아 선택한 배경색으로 채웁니다.',
      },
      {
        question: 'GIF, SVG, HEIC, AVIF도 변환할 수 있나요?',
        answer: '아니요. 현재 도구는 JPG, JPEG, PNG, WebP 형식만 지원합니다.',
      },
    ],
  },
  relatedTools: [related.imageCompressor, related.imageResizer, related.imageCropper],
}

export const imageCropperTool: ToolDefinition = {
  id: 'image-cropper',
  name: '이미지 자르기',
  title: '이미지 자르기 - 사진 원하는 영역 크롭 | JSTools',
  description:
    '자유 비율, 1:1, 4:3, 16:9 등 원하는 비율로 JPG, PNG, WebP 이미지를 브라우저에서 자르는 무료 도구입니다. 이미지는 서버로 업로드되지 않습니다.',
  path: '/tools/image/image-cropper',
  categoryName: '이미지 도구',
  categoryPath: '/tools/image',
  keywords: [
    '이미지 자르기',
    '사진 자르기',
    '이미지 크롭',
    '사진 원하는 부분 자르기',
    '정사각형 이미지 자르기',
    '증명사진 비율 자르기',
    'JSTools',
  ],
  content: {
    introHeading: '이미지 자르기 소개',
    description: [
      '이미지 자르기는 JPG, JPEG, PNG, WebP 파일에서 원하는 영역만 선택해 잘라내는 무료 도구입니다. 업로드한 이미지는 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.',
      '자유 비율부터 1:1, 4:3, 3:4, 16:9, 9:16 비율까지 선택할 수 있으며, 확대·축소를 조절해 필요한 부분을 더 정확히 선택할 수 있습니다.',
    ],
    howTo: [
      '이미지를 업로드 영역에 끌어다 놓거나 파일 선택 버튼으로 추가합니다.',
      '자르기 영역을 드래그해 이동하고 오른쪽 아래 핸들로 크기를 조절합니다.',
      '필요한 경우 자유, 1:1, 4:3, 16:9 등 자르기 비율과 확대·축소 값을 선택합니다.',
      '자르기 실행 버튼을 누른 뒤 결과 미리보기를 확인하고 다운로드합니다.',
    ],
    faq: [
      {
        question: '이미지가 서버로 업로드되나요?',
        answer: '아니요. 이 도구는 브라우저 내부에서만 이미지를 처리하며 서버로 업로드하지 않습니다.',
      },
      {
        question: '어떤 자르기 비율을 지원하나요?',
        answer: '자유 비율, 1:1, 4:3, 3:4, 16:9, 9:16 비율을 지원합니다.',
      },
      {
        question: 'PNG 투명 배경이 유지되나요?',
        answer: '네. PNG는 PNG 형식으로 출력해 투명 배경을 유지합니다.',
      },
      {
        question: '확대하면 이미지 품질이 좋아지나요?',
        answer: '아니요. 확대는 편집 화면에서 영역을 고르기 위한 기능이며 원본보다 높은 화질을 새로 만들지는 않습니다.',
      },
    ],
  },
  relatedTools: [related.imageResizer, related.imageCompressor, related.imageConverter],
}

export const tools = [
  wordCounterTool,
  caseConverterTool,
  dateCalculatorTool,
  jsonFormatterTool,
  lottoGeneratorTool,
  passwordGeneratorTool,
  qrCodeGeneratorTool,
  quoteGeneratorTool,
  imageCompressorTool,
  imageResizerTool,
  imageConverterTool,
  imageCropperTool,
]
