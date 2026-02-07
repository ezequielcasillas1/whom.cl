function toInt(v) {
  const n = Number.parseInt(String(v ?? ''), 10)
  return Number.isFinite(n) ? n : null
}

export async function fetchCatalog(options = null) {
  const opts = options && typeof options === 'object' ? options : null
  const qs = new URLSearchParams()

  if (opts?.q) qs.set('q', String(opts.q))

  const limit = toInt(opts?.limit)
  const offset = toInt(opts?.offset)
  if (limit !== null) qs.set('limit', String(limit))
  if (offset !== null) qs.set('offset', String(offset))

  const url = qs.toString() ? `/api/catalog?${qs.toString()}` : '/api/catalog'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load catalog')
  return await res.json()
}

