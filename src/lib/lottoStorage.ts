export function readSavedLottoNumbers(raw: string | null): { numbers: number[][]; invalid: boolean } {
  if (raw === null) return { numbers: [], invalid: false }
  try {
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return { numbers: [], invalid: true }
    const numbers = data.filter((entry): entry is number[] =>
      Array.isArray(entry) && entry.length === 6 && new Set(entry).size === 6 &&
      entry.every(value => Number.isInteger(value) && value >= 1 && value <= 45))
    return { numbers, invalid: numbers.length !== data.length }
  } catch {
    return { numbers: [], invalid: true }
  }
}
