import assert from 'node:assert/strict'

const base = process.argv[2] || 'http://localhost:3002'
const origin = 'https://jstools-app.vercel.app'
const paths = ['/', '/guide/image-resize', '/tools/image/image-resizer', '/tools/image/image-compressor', '/tools/image/image-cropper', '/tools/date/date-calculator', '/tools/text/word-counter', '/tools/utility/qrcode-generator']
const get = async (path) => {
  const response = await fetch(base + path, { signal: AbortSignal.timeout(30000) })
  return { response, html: await response.text() }
}
const sitemap = await get('/sitemap.xml')
assert.equal(sitemap.response.status, 200)
const urls = await get('/sitemap-0.xml')
assert.equal(urls.response.status, 200)
const locs = [...urls.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
assert.equal(new Set(locs).size, locs.length)
assert(!locs.some((url) => /\/test(?:\/|$)|\/guide\/image-compress$/.test(url)))
console.log(JSON.stringify({ sitemapIndex: sitemap.html, sitemapUrls: locs }))
const robots = await get('/robots.txt')
assert.equal(robots.response.status, 200)
assert(robots.html.includes(`Sitemap: ${origin}/sitemap.xml`))
console.log(JSON.stringify({ robots: robots.html }))
if (process.env.SEO_STRICT === '1') {
  const titles = new Set()
  const descriptions = new Set()
  for (const url of locs) {
    const path = new URL(url).pathname
    const { response, html } = await get(path)
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
    const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/)?.[1]
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
    assert.equal(response.status, 200, path)
    assert(title && description && canonical, path)
    assert(!titles.has(title), `Duplicate title: ${path}`)
    assert(!descriptions.has(description), `Duplicate description: ${path}`)
    titles.add(title)
    descriptions.add(description)
    assert.equal(new URL(canonical).href, new URL(origin + path).href)
    assert(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), path)
    assert(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), path)
    assert(html.includes('property="og:title"') && html.includes('name="twitter:title"'), path)
    // Check text available in the initial HTML, excluding scripts and styles.
    const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] || ''
    const text = body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, '').trim()
    assert(text.length > 80, `Thin or missing initial HTML: ${path}`)
    const links = [...html.matchAll(/<a\b[^>]*href="(\/[^"?#]*)[^"\s]*"/g)].map(match => match[1])
    for (const link of new Set(links)) {
      assert(locs.some(loc => new URL(loc).pathname === link), `Link outside canonical sitemap: ${path} -> ${link}`)
    }
  }
  console.log(JSON.stringify({ checkedCanonicalPages: locs.length, uniqueTitlesAndDescriptions: true, initialHtmlTextAndInternalLinks: 'pass' }))
  for (const path of ['/test', '/test/client', '/test/server']) {
    const { html } = await get(path)
    assert(/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), path)
  }
  const redirect = await fetch(base + '/guide/image-compress', { redirect: 'manual' })
  assert.equal(redirect.status, 308)
  assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/guide/image-compression')
  console.log(JSON.stringify({ testNoindex: 'pass', oldGuideRedirect: redirect.status }))
}
for (const path of paths) {
  for (const suffix of ['', '?utm_source=naver&utm_medium=blog&utm_campaign=image_resize']) {
    const { response, html } = await get(path + suffix)
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
    const metaRobots = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/)?.[1]
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]
    const schema = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1])['@type'])
    const record = { path: path + suffix, status: response.status, title, canonical, metaRobots, headerRobots: response.headers.get('x-robots-tag'), h1, schema, inSitemap: locs.includes(origin + (path === '/' ? '' : path)) || locs.includes(origin + path) }
    console.log(JSON.stringify(record))
    assert.equal(response.status, 200)
    assert(title && h1)
    assert(!/noindex/i.test(`${metaRobots} ${record.headerRobots}`))
    assert(record.inSitemap)
    if (process.env.SEO_STRICT === '1') assert.equal(new URL(canonical).href, new URL(origin + path).href)
  }
}
