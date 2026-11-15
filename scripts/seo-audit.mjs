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
const ads = await get('/ads.txt')
assert.equal(ads.response.status, 200, 'ads.txt must be publicly available')
assert.equal(ads.html.trim(), 'google.com, pub-7836056065911594, DIRECT, f08c47fec0942fa0', 'ads.txt publisher')
if (process.env.SEO_STRICT === '1') {
  const titles = new Set()
  const descriptions = new Set()
  const englishPaths = locs.map(url => new URL(url).pathname).filter(path => path === '/en' || path.startsWith('/en/'))
  const pairs = englishPaths.map(en => ({ en, ko: en.slice(3) || '/' }))
  assert.equal(englishPaths.length, 8, 'English rollout must contain exactly the 8 implemented public pages')
  const sitemapPaths = new Set(locs.map(url => new URL(url).pathname))
  const checkedSamples = new Set()
  const isSample = link => /^\/examples\/image-workflows\/[a-z0-9-]+\.(?:png|jpg|webp)$/.test(link)
  pairs.forEach(pair => assert(sitemapPaths.has(pair.ko), `Missing Korean counterpart: ${pair.ko}`))
  for (const url of locs) {
    const path = new URL(url).pathname
    const { response, html } = await get(path)
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
    const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/)?.[1]
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
    assert.equal(response.status, 200, path)
    const adLoaders = [...html.matchAll(/<script\b[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^>]*>/g)].map(match => match[0])
    assert.equal(adLoaders.length, 1, `Exactly one common AdSense loader: ${path}`)
    assert(adLoaders[0].includes('client=ca-pub-7836056065911594'), `AdSense publisher: ${path}`)
    assert(/\basync(?:\s|=)/.test(adLoaders[0]) && /crossorigin="anonymous"/i.test(adLoaders[0]), `Asynchronous cross-origin ad loader: ${path}`)
    assert(!/data-ad-slot=|<ins\b[^>]*class="[^"]*adsbygoogle/.test(html), `Unexpected manual ad unit: ${path}`)
    assert(!/adsbygoogle\s*=\s*window\.adsbygoogle/.test(html), `Unexpected manual ad initialization: ${path}`)
    assert(!/광고 자리|광고 영역|광고.*Google AdSense.*자리/.test(html), `Ad placeholder: ${path}`)
    const english = path === '/en' || path.startsWith('/en/')
    assert.equal(html.match(/<html[^>]*lang="([^"]+)"/)?.[1], english ? 'en' : 'ko', `Initial HTML language: ${path}`)
    assert.equal((html.match(/<html\b/g) || []).length, 1, `Duplicate html: ${path}`)
    assert.equal((html.match(/<body\b/g) || []).length, 1, `Duplicate body: ${path}`)
    const pair = pairs.find(pair => pair.en === path || pair.ko === path)
    const alternates = Object.fromEntries([...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*hrefLang="([^"]+)"[^>]*href="([^"]+)"/gi)].map(match => [match[1], match[2]]))
    if (pair) {
      assert.deepEqual(alternates, { ko: pair.ko === '/' ? origin : origin + pair.ko, en: origin + pair.en }, `Reciprocal/self hreflang: ${path}`)
    } else assert.equal(Object.keys(alternates).length, 0, `Untranslated page has hreflang: ${path}`)
    assert(html.includes(`property="og:locale" content="${english ? 'en_US' : 'ko_KR'}"`), `OG locale: ${path}`)
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
    if (english) {
      assert(links.every(link => sitemapPaths.has(link) || isSample(link)), `Unpublished internal link on ${path}`)
      const meta = (attribute, name) => html.match(new RegExp(`<meta[^>]*${attribute}="${name}"[^>]*content="([^"]+)"`))?.[1]
      assert.equal(meta('property', 'og:title'), title, `OG title inheritance: ${path}`)
      assert.equal(meta('property', 'og:description'), description, `OG description inheritance: ${path}`)
      assert.equal(meta('property', 'og:url'), canonical, `OG URL inheritance: ${path}`)
      assert.equal(meta('name', 'twitter:title'), title, `Twitter title inheritance: ${path}`)
      assert.equal(meta('name', 'twitter:description'), description, `Twitter description inheritance: ${path}`)
      for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
        const schema = JSON.parse(match[1])
        assert.equal(schema.inLanguage, 'en', `Schema language: ${path}`)
        if (schema.url) assert.equal(schema.url, origin + path, `Schema URL: ${path}`)
      }
    }
    for (const link of new Set(links)) {
      if (isSample(link)) {
        if (!checkedSamples.has(link)) {
          const sample = await fetch(base + link, { signal: AbortSignal.timeout(30000) })
          assert.equal(sample.status, 200, `Sample download: ${link}`)
          assert(/^image\/(png|jpeg|webp)(?:;|$)/.test(sample.headers.get('content-type') || ''), `Sample image type: ${link}`)
          assert((await sample.arrayBuffer()).byteLength > 0, `Empty sample: ${link}`)
          checkedSamples.add(link)
        }
        continue
      }
      assert(locs.some(loc => new URL(loc).pathname === link), `Link outside canonical sitemap: ${path} -> ${link}`)
    }
  }
  console.log(JSON.stringify({ checkedCanonicalPages: locs.length, uniqueTitlesAndDescriptions: true, initialHtmlTextAndInternalLinks: 'pass' }))
  for (const path of ['/test', '/test/client', '/test/server']) {
    const { response, html } = await get(path)
    assert.equal(response.status, process.env.SEO_TEST_MODE === 'development' ? 200 : 404, `Development-only route: ${path}`)
    assert(/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), path)
    assert(!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'), `Ads on development route: ${path}`)
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
