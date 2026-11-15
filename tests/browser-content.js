/* eslint-disable @typescript-eslint/no-unused-expressions -- Function consumed by playwright-cli run-code. */
async (page) => {
  const base = new URL(page.url()).origin
  const results = []
  const check = (ok, message) => { if (!ok) throw new Error(message) }
  await page.context().route(/google-analytics\.com|googletagmanager\.com|googlesyndication\.com|doubleclick\.net|wcs\.naver\.net/, route => route.abort())
  const go = async path => { await page.goto(base + path); await page.waitForLoadState('networkidle') }
  await go('/tools/date/date-calculator')
  for (const [start, end, expected] of [['2024-02-28', '2024-03-01', 2], ['2024-03-01', '2024-02-28', -2], ['2024-03-01', '2024-03-01', 0]]) {
    await page.getByLabel('시작일', { exact: true }).fill(start)
    await page.getByLabel('종료일', { exact: true }).fill(end)
    await page.getByText(`👉 총 ${expected}일 차이`, { exact: true }).waitFor()
  }
  for (const [date, days, direction, expected] of [['2026-11-15', '0', 'after', '2026-11-15'], ['2026-11-15', '0', 'before', '2026-11-15'], ['2024-03-01', '1', 'before', '2024-02-29'], ['2026-01-31', '1', 'after', '2026-02-01']]) {
    await page.getByLabel('기준일', { exact: true }).fill(date)
    await page.getByLabel('일 수', { exact: true }).fill(days)
    await page.getByLabel('기준일 전후 방향', { exact: true }).selectOption(direction)
    await page.getByText(`👉 결과 날짜: ${expected}`, { exact: true }).waitFor()
  }
  results.push('date: zero both directions, leap day, month boundary, reverse/same-day difference')
  await go('/tools/text/word-counter')
  for (const [text, counts] of [['한글 JS\n\n😊', ['9', '6', '3', '2']], ['A\n\n \nB', ['6', '2', '2', '3']]]) {
    await page.locator('#word-counter-input').fill(text)
    check(JSON.stringify(await page.locator('.word-metrics dd').allTextContents()) === JSON.stringify(counts), 'Published word-count example')
  }
  results.push('word: mixed text, emoji, blank and space-only lines')
  await go('/tools/dev/json-formatter')
  await page.locator('#json-input').fill('{"name":"JSTools","items":[1,2]}')
  await page.getByRole('button', { name: '포맷팅', exact: true }).click()
  check(await page.getByLabel('정렬된 JSON 결과').inputValue() === '{\n  "name": "JSTools",\n  "items": [\n    1,\n    2\n  ]\n}', 'JSON output')
  for (const text of ['{"name":"JSTools",}', "{'name':'JSTools'}"]) {
    await page.locator('#json-input').fill(text)
    await page.getByRole('button', { name: '포맷팅', exact: true }).click()
    check(await page.locator('.tool-page .text-red-600').innerText() === '유효한 JSON 형식이 아닙니다.', 'JSON error')
    check(await page.getByLabel('정렬된 JSON 결과').count() === 0, 'Clear stale JSON output')
  }
  results.push('JSON: format, trailing comma, single quotes, stale-output cleared')
  await go('/tools/text/case-converter')
  await page.locator('#case-input').fill('hello JSTools 한글')
  for (const [button, expected] of [['대문자', 'HELLO JSTOOLS 한글'], ['소문자', 'hello jstools 한글'], ['Capitalize', 'Hello JSTools 한글'], ['Title Case', 'Hello Jstools 한글'], ['Swap Case', 'HELLO jstOOLS 한글']]) {
    await page.getByRole('button', { name: button, exact: true }).click()
    check(await page.locator('.tool-page pre').innerText() === expected, 'Case example ' + button)
  }
  results.push('case: all five modes')
  await go('/tools/utility/qrcode-generator')
  for (const text of ['JSTools sample', 'https://jstools-app.vercel.app/']) {
    await page.locator('#qr-input').fill(text)
    check(await page.locator('.tool-page svg').count() === 1, 'QR rendered')
  }
  check(await page.locator('.tool-page button').count() === 0, 'No advertised QR download')
  results.push('QR: text and URL SVG; physical camera not tested')
  const screens = []
  for (const width of [1280, 768, 390]) {
    await page.setViewportSize({ width, height: 900 })
    for (const slug of ['image-resize', 'image-compression', 'jpg-vs-webp']) {
      await go('/guide/' + slug)
      await page.locator('#worked-example').waitFor()
      for (const img of await page.locator('#worked-example img').all()) await img.scrollIntoViewIfNeeded()
      await page.waitForFunction(() => [...document.querySelectorAll('#worked-example img')].every(i => i.complete && i.naturalWidth > 0))
      check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Guide horizontal overflow ${slug} ${width}`)
      const target = `output/playwright/phase2/${new URL(base).hostname === '127.0.0.1' ? 'local' : 'production'}-${slug}-${width}.png`
      await page.locator('#worked-example').scrollIntoViewIfNeeded()
      await page.screenshot({ path: target })
      screens.push(target)
      check(await page.locator('a.guide-cta').count() >= 1, 'Guide CTA kept')
      for (const href of await page.locator('#worked-example a[href^="/examples/"]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))) {
        const r = await page.request.get(base + href)
        check(r.ok(), 'Published sample link ' + href)
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 })
  for (const path of ['/tools/dev/json-formatter', '/tools/text/word-counter', '/tools/text/case-converter', '/tools/date/date-calculator', '/tools/utility/qrcode-generator', '/about', '/en/about', '/contact', '/en/contact', '/en/guide/image-resize']) {
    await go(path)
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile overflow ' + path)
    for (const table of await page.locator('.table-scroll').all()) {
      const dimensions = await table.evaluate(el => ({ width: el.clientWidth, scroll: el.scrollWidth }))
      check(dimensions.scroll >= dimensions.width, 'Table scroll available')
    }
  }
  results.push('mobile overflow and table containers: ten pages')
  return { base, at: new Date().toISOString(), results, screens }
}
