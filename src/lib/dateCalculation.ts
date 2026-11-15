// Date-only arithmetic: UTC avoids local daylight-saving changes in calendar offsets.
function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null
}

export function differenceInDays(start: string, end: string): number | null {
  const first = parseDate(start)
  const last = parseDate(end)
  return first && last ? (last.getTime() - first.getTime()) / 86400000 : null
}

export function offsetDate(value: string, days: number, direction: string): string | null {
  const date = parseDate(value)
  if (!date || !Number.isSafeInteger(days) || days < 0 || !['after', 'before'].includes(direction)) return null
  date.setUTCDate(date.getUTCDate() + (direction === 'after' ? days : -days))
  if (!Number.isFinite(date.getTime())) return null
  const result = date.toISOString().split('T')[0]
  return /^\d{4}-\d{2}-\d{2}$/.test(result) ? result : null
}
