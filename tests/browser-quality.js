/* eslint-disable @typescript-eslint/no-unused-expressions -- Executed as a function by playwright-cli run-code. */
async (page) => {
  const base = page.url().startsWith('http') ? new URL(page.url()).origin : 'http://127.0.0.1:3104'
  const local = new URL(base).hostname === '127.0.0.1'
  const out = `output/playwright/quality-20261115/${local ? 'local' : 'production'}`
  const results = []
  const check = (value, message) => { if (!value) throw new Error(message) }
  await page.context().route(/google-analytics\.com|googletagmanager\.com|googlesyndication\.com|doubleclick\.net|wcs\.naver\.net/, route => route.abort())
  const go = async path => { await page.goto(base + path); await page.waitForLoadState('networkidle') }
  const save = async (name, button) => {
    const pending = page.waitForEvent('download')
    await button.click()
    const download = await pending
    await download.saveAs(`${out}-${name}`)
  }

  await go('/tools/security/password-generator')
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__qualityCopy = text } } }))
  await page.getByRole('button', { name: '비밀번호 생성', exact: true }).click()
  const password = await page.locator('.font-mono').innerText()
  check(password.length === 12, 'Default password length')
  await page.getByRole('button', { name: '복사', exact: true }).click()
  await page.getByText('복사 완료!', { exact: true }).waitFor()
  check(await page.evaluate(value => window.__qualityCopy === value, password), 'Copy must contain only generated value')
  // Browser API mocks verify UI success/failure, without changing the OS clipboard.
  if (local) {
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('test clipboard denial') } } }))
    await page.getByRole('button', { name: '복사', exact: true }).click()
    await page.getByRole('alert').filter({ hasText: '복사하지 못했습니다' }).waitFor()
    check(await page.getByText('복사 완료!', { exact: true }).count() === 0, 'Failed copy must not report success')
    for (let i = 0; i < 4; i++) await page.locator('input[type=checkbox]').nth(i).uncheck()
    await page.getByRole('button', { name: '비밀번호 생성', exact: true }).click()
    await page.getByRole('alert').filter({ hasText: '문자 옵션' }).waitFor()
    check(await page.getByRole('button', { name: '복사', exact: true }).count() === 0, 'No copy for invalid configuration')
    await page.locator('input[type=checkbox]').nth(0).check()
    for (const length of ['4', '32']) {
      await page.locator('#password-length').fill(length)
      await page.getByRole('button', { name: '비밀번호 생성', exact: true }).click()
      const value = await page.locator('.font-mono').innerText()
      check(value.length === Number(length) && /^\d+$/.test(value), 'Boundary length and digits-only')
    }
    for (const length of ['3', '33', '4.5', '']) {
      await page.locator('#password-length').fill(length)
      await page.getByRole('button', { name: '비밀번호 생성', exact: true }).click()
      await page.getByRole('alert').filter({ hasText: '4~32' }).waitFor()
      check(await page.getByRole('button', { name: '복사', exact: true }).count() === 0, 'Invalid length cannot be copied')
    }
    await page.getByRole('checkbox', { name: '기억하기 쉬운 예시 모드 (계정용 사용 금지)', exact: true }).check()
    await page.getByRole('button', { name: '비밀번호 생성', exact: true }).click()
    await page.getByRole('note').waitFor()
    check(await page.locator('#password-length').isDisabled(), 'Example mode disables length')
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: `${out}-password-mobile.png`, fullPage: true })
  results.push({ name: 'password', defaultLength: 12, copy: 'browser API mock', localInvalidAndBoundaryCases: local })

  await page.setViewportSize({ width: 1280, height: 900 })
  await page.evaluate(() => localStorage.setItem('savedLottoNumbers', '{broken'))
  await go('/tools/fun/lotto-generator')
  await page.getByRole('status').filter({ hasText: '읽을 수 없는' }).waitFor()
  check(await page.locator('#lotto-color').count() === 0, 'Unused color input removed')
  await page.locator('#lotto-feeling').selectOption('평온함')
  await page.locator('#lotto-number').fill('7')
  await page.getByRole('button', { name: '번호 추천 받기', exact: true }).click()
  await page.getByRole('button', { name: '저장하기', exact: true }).click()
  await page.reload()
  await page.getByRole('heading', { name: '저장된 번호', exact: true }).waitFor()
  await page.getByRole('button', { name: '삭제', exact: true }).click()
  check(await page.getByRole('heading', { name: '저장된 번호', exact: true }).count() === 0, 'Stored item deleted')
  if (local) {
    await page.locator('#lotto-number').fill('1.5')
    await page.getByRole('button', { name: '번호 추천 받기', exact: true }).click()
    await page.locator('.tool-page [role=alert]').waitFor()
    await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error('test quota denial') } })
    await page.locator('#lotto-number').fill('7')
    await page.getByRole('button', { name: '번호 추천 받기', exact: true }).click()
    await page.getByRole('button', { name: '저장하기', exact: true }).click()
    await page.getByRole('status').filter({ hasText: '저장하지 못했습니다' }).waitFor()
  }
  results.push({ name: 'lotto', corruptStorage: true, saveReloadDelete: true, localStorageFailure: local })

  await go('/tools/image/image-resizer')
  const samples = await page.evaluate(async () => {
    const make = async (name, type, width, height, color) => {
      const c = document.createElement('canvas'); c.width = width; c.height = height
      const context = c.getContext('2d'); context.fillStyle = color; context.fillRect(20, 20, width - 40, height - 40)
      const data = c.toDataURL(type, 0.9).split(',')[1]
      return { name, mimeType: type, data, width, height }
    }
    return Promise.all([
      make('sample.png', 'image/png', 320, 240, '#ff0000'),
      make('sample.png', 'image/png', 400, 300, '#00ff00'),
      make('sample-resized-2.png', 'image/png', 480, 360, '#0000ff'),
      make('sample.jpg', 'image/jpeg', 360, 280, '#ffff00'),
      make('sample.webp', 'image/webp', 420, 320, '#ff00ff'),
    ])
  })
  const files = samples.map(({ name, mimeType, data }) => ({ name, mimeType, buffer: Buffer.from(data, 'base64') }))
  await page.locator('input[type=file]').setInputFiles(files)
  await page.waitForFunction(() => document.querySelector('.tool-page').innerText.includes('완료 5개'))
  await page.getByLabel('가로세로 비율 유지', { exact: true }).uncheck()
  await page.getByLabel('가로 크기(px)', { exact: true }).fill('160')
  await page.getByLabel('세로 크기(px)', { exact: true }).fill('200')
  await page.getByRole('button', { name: '크기 적용', exact: true }).click()
  await page.waitForFunction(() => [...document.querySelectorAll('.file-result')].filter(e => e.innerText.includes('160 x 200px')).length === 5)
  await save('resizer-individual.png', page.getByRole('button', { name: 'PNG 다운로드', exact: true }).first())
  await save('resizer.zip', page.getByRole('button', { name: '전체 ZIP 다운로드', exact: true }))
  results.push({ name: 'resizer', completed: 5, download: 'individual + ZIP', order: samples.map(s => ({ name: s.name, width: s.width, height: s.height })) })

  await go('/tools/image/image-converter')
  await page.locator('input[type=file]').setInputFiles(files)
  await page.waitForFunction(() => [...document.querySelectorAll('button')].filter(e => e.innerText === 'WebP 다운로드' && !e.disabled).length === 4)
  await save('converter.zip', page.getByRole('button', { name: '전체 ZIP 다운로드', exact: true }))
  results.push({ name: 'converter-ZIP', completed: 4, sameFormatErrors: 1 })
  await page.getByRole('button', { name: '전체 초기화', exact: true }).click()
  await page.locator('input[type=file]').setInputFiles(files[0])
  await page.getByRole('button', { name: 'WebP 다운로드', exact: true }).waitFor()
  await save('transparent.webp', page.getByRole('button', { name: 'WebP 다운로드', exact: true }))
  await page.getByRole('button', { name: 'JPG', exact: true }).click()
  await page.getByRole('button', { name: 'JPG 다운로드', exact: true }).waitFor()
  await save('white.jpg', page.getByRole('button', { name: 'JPG 다운로드', exact: true }))
  await page.getByRole('button', { name: 'PNG', exact: true }).click()
  await page.waitForFunction(() => document.querySelector('.tool-page').innerText.includes('원본과 다른 형식을 선택'))
  await page.getByRole('button', { name: '전체 초기화', exact: true }).click()
  await page.locator('input[type=file]').setInputFiles(files[4])
  await page.getByRole('button', { name: 'PNG 다운로드', exact: true }).waitFor()
  await save('transparent.png', page.getByRole('button', { name: 'PNG 다운로드', exact: true }))
  results.push({ name: 'converter-formats', JPG: true, PNG: true, WebP: true, sameFormatError: true })

  await go('/tools/fun/quote-generator')
  await page.getByRole('button', { name: '명언 생성하기', exact: true }).click()
  await page.waitForFunction(() => !document.querySelector('.tool-page button').disabled, undefined, { timeout: 25000 })
  const actual = { quote: await page.locator('blockquote').count() === 1, translated: await page.locator('.quote-result p[lang=ko]').count() === 1 }
  check(actual.quote && actual.translated, 'Real quote and translation must be received; do not substitute a mock success')
  results.push({ name: 'quote-real-provider', ...actual })
  if (local) {
    let mode = 'quote-failure'
    await page.route('**/api/quotes', route => route.fulfill({ status: mode === 'quote-failure' ? 503 : mode === 'timeout' ? 504 : 200, contentType: 'application/json', body: mode === 'invalid' ? '{}' : JSON.stringify({ quote: 'Synthetic audit fixture.', author: 'Test fixture' }) }))
    await page.route('https://api.mymemory.translated.net/get?**', route => route.abort())
    for (const current of ['quote-failure', 'translation-failure', 'timeout', 'invalid']) {
      mode = current
      await go('/tools/fun/quote-generator')
      await page.getByRole('button', { name: '명언 생성하기', exact: true }).click()
      await page.locator('.tool-page [role=alert]').waitFor()
      const quoteCount = await page.locator('blockquote').count()
      check(quoteCount === (current === 'translation-failure' ? 1 : 0), 'Quote preserved only for translation failure')
      check(await page.locator('.quote-result p[lang=ko]').count() === 0, 'No empty translation presented as success')
      results.push({ name: 'quote-mock-' + current, quoteCount, message: await page.locator('.tool-page [role=alert]').innerText() })
    }
    await page.unroute('**/api/quotes')
    await page.unroute('https://api.mymemory.translated.net/get?**')
  }
  return { base, finishedAt: new Date().toISOString(), results }
}
