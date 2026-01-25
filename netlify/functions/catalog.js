import { json, methodNotAllowed, serverError } from './_http.js'
import { getStoreProducts, getStoreProductById } from './_printful.js'

let cache = {
  ts: 0,
  products: null
}

const CACHE_MS = 60_000

const CUSTOM_PRODUCT_DESCRIPTIONS_BY_ID = new Map([
  [
    '415695270',
    'WHOM SIGNATURES. John 8:54–55. Ember-toned Christ portrait framed in radiant halo-lines with a controlled drip finish—minimal geometry, grand proclamation. Built for believers who move quiet but carry weight.'
  ]
])

function normalizeSizeToken(raw) {
  const s = String(raw || '').trim()
  if (!s) return null
  const n = s.toUpperCase().replace(/[\s_-]+/g, '')
  const map = {
    XS: 'XS',
    S: 'S',
    M: 'M',
    L: 'L',
    XL: 'XL',
    XXL: '2XL',
    '2XL': '2XL',
    XXXL: '3XL',
    '3XL': '3XL',
    XXXXL: '4XL',
    '4XL': '4XL',
    XXXXXL: '5XL',
    '5XL': '5XL'
  }
  return map[n] || null
}

function parseVariantSelectedOptions(variantName) {
  const raw = String(variantName || '').trim()
  if (!raw) return []

  // Printful store variant names are typically like: "Black / S"
  const parts = raw
    .split('/')
    .map(s => String(s || '').trim())
    .filter(Boolean)

  let size = null
  let colorParts = []

  for (const p of parts) {
    const maybeSize = normalizeSizeToken(p)
    if (maybeSize && !size) {
      size = maybeSize
      continue
    }
    colorParts.push(p)
  }

  // If we didn't find size in parts, try last token by space (e.g., "Black S")
  if (!size && parts.length === 1) {
    const bySpace = raw.split(/\s+/).map(s => s.trim()).filter(Boolean)
    const last = bySpace[bySpace.length - 1]
    const maybeSize = normalizeSizeToken(last)
    if (maybeSize) {
      size = maybeSize
      colorParts = bySpace.slice(0, -1)
    }
  }

  const color = colorParts.join(' / ').trim() || null

  const selectedOptions = []
  if (color) selectedOptions.push({ name: 'Color', value: color })
  if (size) selectedOptions.push({ name: 'Size', value: size })
  return selectedOptions
}

function extractVariantImageUrl(v) {
  // Be defensive: Printful shapes vary by endpoint/version
  const direct = v?.preview_url || v?.thumbnail_url || v?.image_url || v?.image || null
  if (direct) return direct

  const files = Array.isArray(v?.files) ? v.files : []
  const f0 = files[0]
  if (f0?.preview_url) return f0.preview_url
  if (f0?.thumbnail_url) return f0.thumbnail_url
  if (f0?.url) return f0.url

  return null
}

function getQueryParams(event) {
  return event?.queryStringParameters || {}
}

function normalizeTag(tag) {
  return String(tag || '').trim()
}

function uniqTags(tags) {
  const out = []
  const seen = new Set()
  for (const t of tags || []) {
    const v = normalizeTag(t)
    const k = v.toUpperCase()
    if (!v || seen.has(k)) continue
    seen.add(k)
    out.push(v)
  }
  return out
}

function tagsForProductName(name) {
  const n = String(name || '').trim()
  const up = n.toUpperCase()
  const tags = []

  // Core collections by naming convention / keyword
  const keywordTags = [
    { tag: 'FAITH', re: /\bFAITH\b/ },
    { tag: 'PURPOSE', re: /\bPURPOSE\b/ },
    { tag: 'IDENTITY', re: /\bIDENTITY\b/ }
  ]
  for (const k of keywordTags) {
    if (k.re.test(up)) tags.push(k.tag)
  }

  // WHM signatures collection by naming convention
  if (up.startsWith('WHM-') || up.startsWith('WHM ')) {
    tags.push('WHOM SIGNATURES')
  }

  return uniqTags(tags)
}

function descriptionForProduct(id, name) {
  const idKey = String(id ?? '').trim()
  const custom = CUSTOM_PRODUCT_DESCRIPTIONS_BY_ID.get(idKey)
  if (custom) return custom

  const n = String(name || '').trim()
  const up = n.toUpperCase()

  if (up === 'WHM- JOHN8:54-55' || up === 'WHM- JOHN 8:54-55') {
    return 'WHOM SIGNATURES. John 8:54–55. Minimal mark, eternal meaning.'
  }

  return ''
}
function normalizeProduct(detail) {
  const p = detail?.result?.sync_product
  const variants = detail?.result?.sync_variants || []
  const prices = variants
    .map(v => parseFloat(v?.retail_price))
    .filter(n => Number.isFinite(n))
  const minPrice = prices.length ? Math.min(...prices) : 0
  const title = p?.name || 'Product'
  const id = String(p?.id ?? '')

  return {
    id,
    title,
    description: descriptionForProduct(id, title),
    thumbnail: p?.thumbnail_url || null,
    // Simple UI fields that mirror Shopify-ish shape used by components today
    tags: tagsForProductName(title),
    images: p?.thumbnail_url ? [{ url: p.thumbnail_url }] : [],
    priceRange: {
      minVariantPrice: {
        amount: String(minPrice),
        currencyCode: p?.currency || process.env.PRINTFUL_CURRENCY || 'USD'
      }
    },
    variants: variants.map(v => ({
      id: String(v?.id ?? '').replace(/^#/, ''), // Printful sync_variant_id
      title: v?.name || (v?.variant_id ? `Variant ${v.variant_id}` : 'Variant'),
      availableForSale: true,
      priceV2: {
        amount: String(v?.retail_price || '0.00'),
        currencyCode: p?.currency || process.env.PRINTFUL_CURRENCY || 'USD'
      },
      image: extractVariantImageUrl(v),
      selectedOptions: parseVariantSelectedOptions(v?.name),
      // Needed later for shipping quotes/order creation
      printful: {
        sync_variant_id: String(v?.id ?? '').replace(/^#/, ''),
        variant_id: v?.variant_id
      }
    }))
  }
}

export async function handler(event) {
  if (event.httpMethod !== 'GET') return methodNotAllowed(['GET'])

  try {
    const qp = getQueryParams(event)
    const q = String(qp?.q || '').trim()

    let normalized = cache.products
    if (!normalized || Date.now() - cache.ts >= CACHE_MS) {
      const list = await getStoreProducts()
      const products = list?.result || []

      const details = await Promise.all(
        products.map(p => getStoreProductById(p.id))
      )

      normalized = details.map(normalizeProduct).filter(p => p.id)
      cache = { ts: Date.now(), products: normalized }
    }

    const filtered = q
      ? normalized.filter(p => String(p?.title || '').toUpperCase().includes(q.toUpperCase()))
      : normalized

    const payload = {
      meta: {
        store_id: process.env.PRINTFUL_STORE_ID || null,
        total: normalized.length,
        returned: filtered.length,
        q: q || null
      },
      products: filtered
    }

    return json(200, payload)
  } catch (e) {
    return serverError(e?.message || 'Catalog error')
  }
}

