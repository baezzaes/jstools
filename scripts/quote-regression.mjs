// Uses Node's built-in test runner and the project's existing TypeScript compiler.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

const source = fs.readFileSync(new URL('../src/lib/quotes.ts', import.meta.url), 'utf8')
const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
const { parseQuote, parseQuotePool, parseTranslation, requestQuoteJson, translateQuote } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))
const signal = () => new AbortController().signal
const json = value => new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } })

test('provider batch requires real, non-empty quote/author pairs', () => {
  assert.equal(parseQuotePool([{ q: 'one', a: 'A' }, { q: 'two', a: 'B' }]).length, 2)
  assert.throws(() => parseQuotePool([{ q: 'rate limit notice', a: 'zenquotes.io' }]))
  assert.throws(() => parseQuotePool([{ q: 'one', a: '' }, { q: 'two', a: 'B' }]))
  assert.throws(() => parseQuote({ quote: 'text', author: ' ' }))
})

test('translation rejects quota notices, errors, empty/non-Korean data', () => {
  assert.equal(parseTranslation({ responseStatus: 200, responseData: { translatedText: ' 번역 결과 ' } }), '번역 결과')
  for (const data of [
    { responseStatus: 429, responseData: { translatedText: '오늘 한도를 넘었습니다' } },
    { responseStatus: 200, quotaFinished: true, responseData: { translatedText: '안내' } },
    { responseStatus: 200, responseData: { translatedText: '' } },
    { responseStatus: 200, responseData: { translatedText: 'ERROR' } },
  ]) assert.throws(() => parseTranslation(data))
})

test('HTTP, HTML and malformed JSON are distinct from successful data', async t => {
  for (const response of [new Response('bad', { status: 503 }), new Response('<html>error</html>'), new Response('{broken', { headers: { 'content-type': 'application/json' } })]) {
    t.mock.method(globalThis, 'fetch', async () => response)
    await assert.rejects(requestQuoteJson('/api/quotes', signal()))
    t.mock.restoreAll()
  }
})

test('network rejection is reported without automatic retries', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => { throw new TypeError('offline') })
  await assert.rejects(requestQuoteJson('/api/quotes', signal()), e => e.kind === 'network')
  assert.equal(mock.mock.callCount(), 1)
})

test('eight-second deadline aborts an outstanding request', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  t.mock.method(globalThis, 'fetch', (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true })
  }))
  const request = requestQuoteJson('/api/quotes', signal())
  const rejected = assert.rejects(request, e => e.kind === 'timeout')
  t.mock.timers.tick(8000)
  await rejected
})

test('unmount cancellation propagates without becoming a timeout', async t => {
  t.mock.method(globalThis, 'fetch', (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true })
  }))
  const controller = new AbortController()
  const request = requestQuoteJson('/api/quotes', controller.signal)
  controller.abort()
  await assert.rejects(request, e => e.name === 'AbortError')
})

test('translation uses fixed HTTPS endpoint and refuses over-500-byte text before fetch', async t => {
  const mock = t.mock.method(globalThis, 'fetch', async () => json({ responseStatus: 200, responseData: { translatedText: '확인된 번역' } }))
  await assert.rejects(translateQuote('가'.repeat(167), signal()), e => e.kind === 'limit')
  assert.equal(mock.mock.callCount(), 0)
  assert.equal(await translateQuote('Hello', signal()), '확인된 번역')
  const url = new URL(mock.mock.calls[0].arguments[0])
  assert.equal(url.origin, 'https://api.mymemory.translated.net')
  assert.equal(url.pathname, '/get')
  assert.equal(url.searchParams.get('q'), 'Hello')
  assert.equal(url.searchParams.get('langpair'), 'en|ko')
})
