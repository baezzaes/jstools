import test from 'node:test'
import assert from 'node:assert/strict'
import JSZip from 'jszip'
import { generatePassword, secureRandomIndex } from '../src/lib/password.ts'
import { uniqueZipNames } from '../src/lib/zipNames.ts'
import { readSavedLottoNumbers } from '../src/lib/lottoStorage.ts'

const defaults = { length: 12, numbers: true, uppercase: true, lowercase: true, symbols: true, exampleMode: false }
for (const length of [4, 12, 32]) {
  test(`password length ${length} includes selected groups`, () => {
    for (let i = 0; i < 20; i++) {
      const password = generatePassword({ ...defaults, length })
      assert.equal(password.length, length)
      for (const expression of [/\d/, /[A-Z]/, /[a-z]/, /[^A-Za-z0-9]/]) assert.match(password, expression)
    }
  })
}
for (const length of [0, 3, 33, -1, 4.5, NaN, Infinity]) {
  test(`reject invalid password length ${length}`, () => assert.throws(() => generatePassword({ ...defaults, length }), /4~32/))
}
test('only selected characters appear; no-options is an error, not a generated result', () => {
  const options = { ...defaults, uppercase: false, lowercase: false, symbols: false }
  assert.match(generatePassword(options), /^\d{12}$/)
  assert.throws(() => generatePassword({ ...options, numbers: false }), /문자 옵션/)
})
test('no insecure fallback when Web Crypto is unavailable', () => {
  assert.throws(() => generatePassword(defaults, {}), /보안 난수/)
})
test('remainder values are rejected before index mapping', () => {
  const values = [0xffffffff, 4294967290, 19]
  let calls = 0
  const source = { getRandomValues(array) { array[0] = values[calls++]; return array } }
  assert.equal(secureRandomIndex(10, source), 9)
  assert.equal(calls, 3)
  for (const size of [0, -1, 1.5, Infinity]) assert.throws(() => secureRandomIndex(size))
})
test('example mode is separate from configurable account-password mode', () => {
  assert.match(generatePassword({ ...defaults, exampleMode: true }), /^(Tree|Cat|Dog|Moon|Sun|Book|Fire|Rain)\d{1,2}[!@#$](Tree|Cat|Dog|Moon|Sun|Book|Fire|Rain)$/)
})

for (const preferred of [
  ['sample.webp', 'sample.webp', 'sample.webp'],
  ['sample.webp', 'sample.webp', 'sample-2.webp', 'sample-3.webp', 'sample.webp'],
  ['sample.webp', 'sample.jpg', 'sample.png', 'sample.webp', 'sample-2.webp'],
  ['plain', 'plain', 'plain-2', '.hidden', '.hidden'],
  ['sample-2.webp', 'sample.webp', 'sample.webp', 'sample-2.webp'],
]) {
  test(`ZIP preserves all entries and input/content correspondence: ${preferred.join(', ')}`, async () => {
    const names = uniqueZipNames(preferred)
    assert.equal(new Set(names).size, preferred.length)
    const zip = new JSZip()
    names.forEach((name, index) => zip.file(name, `original index ${index}`))
    const loaded = await JSZip.loadAsync(await zip.generateAsync({ type: 'uint8array' }))
    assert.equal(Object.values(loaded.files).filter(f => !f.dir).length, preferred.length)
    for (const [index, name] of names.entries()) assert.equal(await loaded.file(name).async('string'), `original index ${index}`)
    preferred.forEach((name, index) => { if (preferred.indexOf(name) === index) assert.equal(names[index], name) })
  })
}
test('ZIP reserves numbered names before allocating duplicate suffixes', () => {
  assert.deepEqual(uniqueZipNames(['sample.webp', 'sample.webp', 'sample-2.webp', 'sample-3.webp']), ['sample.webp', 'sample-4.webp', 'sample-2.webp', 'sample-3.webp'])
})
test('lottery storage handles corruption without losing valid entries', () => {
  const valid = [1, 7, 14, 22, 33, 45]
  assert.deepEqual(readSavedLottoNumbers(null), { numbers: [], invalid: false })
  for (const raw of ['{', '{}', 'null', '42']) assert.deepEqual(readSavedLottoNumbers(raw), { numbers: [], invalid: true })
  const raw = JSON.stringify([valid, [1, 1, 2, 3, 4, 5], [0, 2, 3, 4, 5, 6], [1.5, 2, 3, 4, 5, 6], 'bad'])
  assert.deepEqual(readSavedLottoNumbers(raw), { numbers: [valid], invalid: true })
})
