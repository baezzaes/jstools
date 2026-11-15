// Reserve original names before allocating suffixes, so an existing "-2"
// entry keeps its name. Results stay in the input order, without overwriting.
export function uniqueZipNames(preferredNames: readonly string[]): string[] {
  const reserved = new Set(preferredNames)
  const used = new Set<string>()
  return preferredNames.map(preferred => {
    let name = preferred
    let suffix = 2
    const dot = preferred.lastIndexOf('.')
    const base = dot > 0 ? preferred.slice(0, dot) : preferred
    const extension = dot > 0 ? preferred.slice(dot) : ''
    while (used.has(name)) {
      do { name = `${base}-${suffix++}${extension}` } while (reserved.has(name) || used.has(name))
    }
    used.add(name)
    return name
  })
}
