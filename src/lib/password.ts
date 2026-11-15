export type PasswordOptions = {
  length: number
  numbers: boolean
  uppercase: boolean
  lowercase: boolean
  symbols: boolean
  exampleMode: boolean
}

type RandomSource = Pick<Crypto, 'getRandomValues'>

// Reject the incomplete remainder before mapping to an index (no modulo bias).
export function secureRandomIndex(size: number, source: RandomSource = globalThis.crypto): number {
  if (!Number.isSafeInteger(size) || size < 1 || size > 0x100000000) throw new Error('잘못된 문자 범위입니다.')
  if (!source?.getRandomValues) throw new Error('이 브라우저에서는 보안 난수를 사용할 수 없습니다. 최신 HTTPS 브라우저에서 다시 시도하세요.')
  const limit = Math.floor(0x100000000 / size) * size
  const value = new Uint32Array(1)
  do { source.getRandomValues(value) } while (value[0] >= limit)
  return value[0] % size
}

export function generatePassword(options: PasswordOptions, source: RandomSource = globalThis.crypto): string {
  const pick = (text: string) => text[secureRandomIndex(text.length, source)]
  if (options.exampleMode) {
    // Deliberately labelled as an example, not an account password or passphrase.
    const words = ['Tree', 'Cat', 'Dog', 'Moon', 'Sun', 'Book', 'Fire', 'Rain']
    return `${words[secureRandomIndex(words.length, source)]}${secureRandomIndex(100, source)}${pick('!@#$')}${words[secureRandomIndex(words.length, source)]}`
  }
  if (!Number.isInteger(options.length) || options.length < 4 || options.length > 32) {
    throw new Error('비밀번호 길이는 4~32 사이의 정수로 입력하세요.')
  }
  const groups = [
    options.numbers ? '0123456789' : '',
    options.uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
    options.lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '',
    options.symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '',
  ].filter(Boolean)
  if (groups.length === 0) throw new Error('문자 옵션을 하나 이상 선택하세요.')
  const charset = groups.join('')
  const result = groups.map(pick)
  while (result.length < options.length) result.push(pick(charset))
  // Each selected group appears at least once; randomize where it appears.
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomIndex(i + 1, source)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result.join('')
}
