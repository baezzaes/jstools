/* eslint-disable @typescript-eslint/no-unused-expressions -- Function consumed by playwright-cli run-code. */
async (page) => {
  const base = new URL(page.url()).origin
  const out = `output/playwright/phase2/${new URL(base).hostname === '127.0.0.1' ? 'local' : 'production'}`
  await page.context().route(/google-analytics\.com|googletagmanager\.com|googlesyndication\.com|doubleclick\.net|wcs\.naver\.net/, route => route.abort())
  const source = await page.request.get(base + '/examples/image-workflows/original.png')
  if (!source.ok()) throw new Error('Published original sample unavailable')
  const file = { name: 'jstools-sample.png', mimeType: 'image/png', buffer: await source.body() }
  const save = async (name, button) => { const pending = page.waitForEvent('download'); await button.click(); await (await pending).saveAs(`${out}-example-${name}`) }
  await page.goto(base + '/tools/image/image-resizer')
  await page.locator('input[type=file]').setInputFiles(file)
  await page.getByRole('button', { name: 'PNG 다운로드', exact: true }).waitFor()
  await page.getByLabel('가로세로 비율 유지', { exact: true }).uncheck()
  await page.getByLabel('가로 크기(px)', { exact: true }).fill('160')
  await page.getByLabel('세로 크기(px)', { exact: true }).fill('200')
  await page.getByRole('button', { name: '크기 적용', exact: true }).click()
  await page.waitForFunction(() => document.querySelector('.file-result')?.innerText.includes('160 x 200px'))
  await save('resized.png', page.getByRole('button', { name: 'PNG 다운로드', exact: true }))
  await page.goto(base + '/tools/image/image-compressor')
  await page.locator('input[type=file]').setInputFiles(file)
  await page.getByRole('button', { name: 'WebP 다운로드', exact: true }).waitFor()
  await save('compressed-75.webp', page.getByRole('button', { name: 'WebP 다운로드', exact: true }))
  await page.getByLabel('이미지 압축 품질', { exact: true }).fill('40')
  await page.getByRole('button', { name: '품질 적용', exact: true }).click()
  await save('compressed-40.webp', page.getByRole('button', { name: 'WebP 다운로드', exact: true }))
  await page.goto(base + '/tools/image/image-converter')
  await page.locator('input[type=file]').setInputFiles(file)
  await page.getByRole('button', { name: 'WebP 다운로드', exact: true }).waitFor()
  await save('converted.webp', page.getByRole('button', { name: 'WebP 다운로드', exact: true }))
  await page.getByRole('button', { name: 'JPG', exact: true }).click()
  await page.getByRole('button', { name: 'JPG 다운로드', exact: true }).waitFor()
  await save('converted.jpg', page.getByRole('button', { name: 'JPG 다운로드', exact: true }))
  return { base, finishedAt: new Date().toISOString(), originalBytes: file.buffer.length, downloaded: 5, destination: out + '-example-*', note: 'Decode and measure actual files separately; download completion alone does not verify format or dimensions.' }
}
