const PRINTFUL_API_BASE = 'https://api.printful.com'

function requireEnv(name) {
  const val = process.env[name]
  if (!val) throw new Error(`Missing env var: ${name}`)
  return val
}

function printfulHeaders() {
  const token = requireEnv('PRINTFUL_API_TOKEN')
  const storeId = process.env.PRINTFUL_STORE_ID

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  // Only required for account-level tokens.
  if (storeId) headers['X-PF-Store-Id'] = storeId

  return headers
}

async function printfulFetch(path, init = {}) {
  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...init,
    headers: { ...printfulHeaders(), ...(init.headers || {}) }
  })

  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }

  if (!res.ok) {
    const msg =
      (data && (data.result || data.error?.message)) ||
      `Printful error (${res.status})`
    throw new Error(msg)
  }

  return data
}

export async function getStoreProducts() {
  // List products in your Printful store (manual order platform/API store)
  return await printfulFetch('/store/products', { method: 'GET' })
}

export async function getStoreProductById(id) {
  return await printfulFetch(`/store/products/${id}`, { method: 'GET' })
}

export async function getStoreVariantById(syncVariantId) {
  return await printfulFetch(`/store/variants/${syncVariantId}`, { method: 'GET' })
}

export async function calculateShippingRates({ recipient, items, currency }) {
  const body = {
    recipient,
    items,
    ...(currency ? { currency } : {}),
    locale: 'en_US'
  }
  return await printfulFetch('/shipping/rates', {
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export async function createPrintfulOrder({ order, confirm = true }) {
  const qs = confirm ? '?confirm=1' : ''
  return await printfulFetch(`/orders${qs}`, {
    method: 'POST',
    body: JSON.stringify(order)
  })
}

export async function deleteStoreProduct(productId) {
  return await printfulFetch(`/store/products/${productId}`, { method: 'DELETE' })
}

