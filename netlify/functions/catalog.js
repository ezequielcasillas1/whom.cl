import { json, methodNotAllowed, serverError } from './_http.js'
import { getStoreProducts, getStoreProductById } from './_printful.js'

let cache = {
  ts: 0,
  data: null
}

const CACHE_MS = 60_000

function normalizeProduct(detail) {
  const p = detail?.result?.sync_product
  const variants = detail?.result?.sync_variants || []
  const prices = variants
    .map(v => parseFloat(v?.retail_price))
    .filter(n => Number.isFinite(n))
  const minPrice = prices.length ? Math.min(...prices) : 0

  return {
    id: String(p?.id ?? ''),
    title: p?.name || 'Product',
    thumbnail: p?.thumbnail_url || null,
    // Simple UI fields that mirror Shopify-ish shape used by components today
    tags: [],
    images: p?.thumbnail_url ? [{ url: p.thumbnail_url }] : [],
    priceRange: {
      minVariantPrice: {
        amount: String(minPrice),
        currencyCode: p?.currency || process.env.PRINTFUL_CURRENCY || 'USD'
      }
    },
    variants: variants.map(v => ({
      id: String(v?.id ?? ''), // Printful sync_variant_id
      title: v?.name || (v?.variant_id ? `Variant ${v.variant_id}` : 'Variant'),
      availableForSale: true,
      priceV2: {
        amount: String(v?.retail_price || '0.00'),
        currencyCode: p?.currency || process.env.PRINTFUL_CURRENCY || 'USD'
      },
      // Needed later for shipping quotes/order creation
      printful: {
        sync_variant_id: v?.id,
        variant_id: v?.variant_id
      }
    }))
  }
}

export async function handler(event) {
  if (event.httpMethod !== 'GET') return methodNotAllowed(['GET'])

  try {
    if (cache.data && Date.now() - cache.ts < CACHE_MS) {
      return json(200, cache.data)
    }

    const list = await getStoreProducts()
    const products = list?.result || []

    const details = await Promise.all(
      products.map(p => getStoreProductById(p.id))
    )

    const normalized = details.map(normalizeProduct).filter(p => p.id)

    const payload = { products: normalized }
    cache = { ts: Date.now(), data: payload }

    return json(200, payload)
  } catch (e) {
    return serverError(e?.message || 'Catalog error')
  }
}

