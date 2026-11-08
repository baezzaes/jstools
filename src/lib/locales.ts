export const languagePairs = [
  ['/', '/en'],
  ['/tools/image/image-resizer', '/en/tools/image/image-resizer'],
  ['/tools/image/image-compressor', '/en/tools/image/image-compressor'],
  ['/tools/image/image-converter', '/en/tools/image/image-converter'],
  ['/guide/image-resize', '/en/guide/image-resize'],
  ['/about', '/en/about'],
  ['/privacy', '/en/privacy'],
  ['/contact', '/en/contact'],
] as const

export function languageAlternates(path: string) {
  const pair = languagePairs.find(pair => pair.some(url => url === path))
  return pair ? { ko: `https://jstools-app.vercel.app${pair[0] === '/' ? '' : pair[0]}`, en: `https://jstools-app.vercel.app${pair[1]}` } : undefined
}
