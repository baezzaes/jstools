import { randomInt } from 'node:crypto'
import { unstable_cache } from 'next/cache'
import { parseQuotePool, QuoteRequestError, requestQuoteJson } from '@/lib/quotes'
import type { Quote } from '@/lib/quotes'

export const runtime = 'nodejs'
let pendingPool: Promise<Quote[]> | undefined

// Only this fixed provider is contacted. Cache a validated batch rather than
// forwarding each button click to the free provider's rate-limited endpoint.
const loadQuotes = unstable_cache(async () => {
  // Coalesce simultaneous cache misses within this server process.
  if (!pendingPool) pendingPool = (async () => {
    const data = await requestQuoteJson('https://zenquotes.io/api/quotes', new AbortController().signal, { cache: 'no-store' })
    return parseQuotePool(data)
  })().finally(() => { pendingPool = undefined })
  return pendingPool
}, ['zenquotes-pool-v1'], { revalidate: 7200 })

const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }

export async function GET() {
  try {
    const quotes = await loadQuotes()
    return Response.json(quotes[randomInt(quotes.length)], { headers })
  } catch (error) {
    const timeout = error instanceof QuoteRequestError && error.kind === 'timeout'
    return Response.json({ error: timeout ? 'quote_timeout' : 'quote_unavailable' }, { status: timeout ? 504 : 503, headers })
  }
}
