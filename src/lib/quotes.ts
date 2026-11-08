export type Quote = { quote: string; author: string }
type Failure = 'timeout' | 'network' | 'http' | 'invalid' | 'limit'

export class QuoteRequestError extends Error {
  constructor(public readonly kind: Failure) {
    super(kind)
    this.name = 'QuoteRequestError'
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validText(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max
}

export function parseQuote(value: unknown): Quote {
  if (!isRecord(value) || !validText(value.quote, 2000) || !validText(value.author, 200)) {
    throw new QuoteRequestError('invalid')
  }
  return { quote: value.quote.trim(), author: value.author.trim() }
}

export function parseQuotePool(value: unknown): Quote[] {
  // ZenQuotes also returns errors as a one-element array with a notice author.
  if (!Array.isArray(value) || value.length < 2 || value.length > 50) throw new QuoteRequestError('invalid')
  return value.map(item => {
    if (!isRecord(item)) throw new QuoteRequestError('invalid')
    return parseQuote({ quote: item.q, author: item.a })
  })
}

export function parseTranslation(value: unknown): string {
  if (!isRecord(value) || Number(value.responseStatus) !== 200 || value.quotaFinished === true || !isRecord(value.responseData)) {
    throw new QuoteRequestError('invalid')
  }
  const text = value.responseData.translatedText
  if (!validText(text, 6000) || !/[가-힣]/.test(text)) throw new QuoteRequestError('invalid')
  return text.trim()
}

export async function requestQuoteJson(url: string, signal: AbortSignal, options: RequestInit = {}): Promise<unknown> {
  const controller = new AbortController()
  let timedOut = false
  const abort = () => controller.abort()
  signal.addEventListener('abort', abort, { once: true })
  if (signal.aborted) abort()
  const timer = setTimeout(() => { timedOut = true; controller.abort() }, 8000)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal, credentials: 'omit', redirect: 'error' })
    if (!response.ok) throw new QuoteRequestError(response.status === 504 ? 'timeout' : 'http')
    if (!response.headers.get('content-type')?.includes('application/json')) throw new QuoteRequestError('invalid')
    const text = await response.text()
    if (text.length > 100_000) throw new QuoteRequestError('invalid')
    try { return JSON.parse(text) as unknown } catch { throw new QuoteRequestError('invalid') }
  } catch (error) {
    if (timedOut) throw new QuoteRequestError('timeout')
    if (signal.aborted) throw error
    if (error instanceof QuoteRequestError) throw error
    throw new QuoteRequestError('network')
  } finally {
    clearTimeout(timer)
    signal.removeEventListener('abort', abort)
  }
}

export async function translateQuote(text: string, signal: AbortSignal): Promise<string> {
  if (new TextEncoder().encode(text).length > 500) throw new QuoteRequestError('limit')
  const url = new URL('https://api.mymemory.translated.net/get')
  url.searchParams.set('q', text)
  url.searchParams.set('langpair', 'en|ko')
  return parseTranslation(await requestQuoteJson(url.toString(), signal))
}

export function quoteFailureMessage(error: unknown, translation = false): string {
  if (error instanceof QuoteRequestError && error.kind === 'timeout') return translation
    ? '번역 요청 시간이 초과되었습니다. 영어 원문은 그대로 볼 수 있습니다.'
    : '명언 요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.'
  if (error instanceof QuoteRequestError && error.kind === 'limit') return '이 명언은 번역 서비스의 문장 길이 한도를 넘었습니다. 영어 원문을 참고해 주세요.'
  return translation
    ? '한국어 번역을 불러오지 못했습니다. 서비스 이용 한도나 연결 상태에 따라 실패할 수 있습니다. 영어 원문은 그대로 볼 수 있습니다.'
    : '명언을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
}
