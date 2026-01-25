import { json, methodNotAllowed, badRequest, serverError } from './_http.js'
import { getStoreVariantById, calculateShippingRates } from './_printful.js'

function requireEnv(name) {
  const val = process.env[name]
  if (!val) throw new Error(`Missing env var: ${name}`)
  return val
}

function stripeHeaders() {
  return {
    Authorization: `Bearer ${requireEnv('STRIPE_SECRET_KEY')}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

async function stripePostForm(path, params) {
  const res = await fetch(`https://api.stripe.com${path}`, {
    method: 'POST',
    headers: stripeHeaders(),
    body: params.toString()
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error?.message || `Stripe error (${res.status})`)
  }
  return data
}

function toCents(amount) {
  const n = typeof amount === 'string' ? parseFloat(amount) : amount
  if (!Number.isFinite(n)) return 0
  return Math.round(n * 100)
}

function pickShipping(rates, requestedId) {
  const arr = rates?.result || []
  if (!arr.length) return null
  if (requestedId) {
    const found = arr.find(r => String(r.id) === String(requestedId))
    if (found) return found
  }
  // Prefer cheapest if not specified
  return arr.reduce((min, r) => {
    const rp = parseFloat(r?.rate)
    const mp = parseFloat(min?.rate)
    if (!Number.isFinite(mp)) return r
    if (!Number.isFinite(rp)) return min
    return rp < mp ? r : min
  }, arr[0])
}

function normalizeSyncVariantId(id) {
  return String(id ?? '').trim().replace(/^#/, '')
}

function normalizeImageUrl(raw, siteUrl) {
  const s = String(raw ?? '').trim()
  if (!s) return null
  // Already absolute
  if (/^https?:\/\//i.test(s)) return s
  // Make absolute for Stripe
  const base = String(siteUrl || '').replace(/\/+$/, '')
  const path = s.startsWith('/') ? s : `/${s}`
  return `${base}${path}`
}

function resolveSiteUrl() {
  // Netlify provides URL/DEPLOY_PRIME_URL automatically. Prefer those.
  return (
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.SITE_URL ||
    'http://localhost:3000'
  )
}

function extractPrintfulVariantImage(result) {
  // Prefer variant-level mockup/preview images if available.
  const files = Array.isArray(result?.files) ? result.files : []
  const f0 = files[0]
  const fromFiles =
    f0?.preview_url ||
    f0?.thumbnail_url ||
    f0?.url ||
    null
  if (fromFiles) return fromFiles

  // Fallback to product image (may be design-only, but better than nothing)
  return result?.product?.image || null
}
export async function handler(event) {
  if (event.httpMethod !== 'POST') return methodNotAllowed(['POST'])

  let body
  try {
    body = event.body ? JSON.parse(event.body) : null
  } catch {
    return badRequest('Invalid JSON body')
  }

  const items = body?.items
  const recipient = body?.recipient

  if (!Array.isArray(items) || items.length === 0) {
    return badRequest('Missing items')
  }
  if (!recipient?.country_code) {
    return badRequest('Missing recipient.country_code')
  }

  try {
    const currency = process.env.PRINTFUL_CURRENCY || 'USD'
    const siteUrl = resolveSiteUrl()

    // Validate items server-side via Printful store variant endpoint
    const variantDetails = await Promise.all(
      items.map(async it => {
        const syncVariantId = normalizeSyncVariantId(it?.sync_variant_id ?? it?.syncVariantId ?? it?.id)
        const quantity = Number(it?.quantity ?? 1)
        if (!syncVariantId) {
          throw new Error('Invalid sync_variant_id')
        }
        if (!Number.isFinite(quantity) || quantity <= 0) {
          throw new Error('Invalid quantity')
        }
        const v = await getStoreVariantById(syncVariantId)
        const result = v?.result
        return {
          sync_variant_id: syncVariantId,
          quantity,
          name: result?.name || 'Item',
          retail_price: result?.retail_price || '0.00',
          variant_id: result?.variant_id,
          image:
            normalizeImageUrl(it?.image, siteUrl) ||
            normalizeImageUrl(extractPrintfulVariantImage(result), siteUrl) ||
            null
        }
      })
    )

    // Shipping quote needs Printful catalog variant_id
    const shippingRates = await calculateShippingRates({
      recipient: {
        name: recipient?.name,
        address1: recipient?.address1,
        address2: recipient?.address2,
        city: recipient?.city,
        state_code: recipient?.state_code,
        country_code: recipient?.country_code,
        zip: recipient?.zip
      },
      items: variantDetails.map(v => ({
        variant_id: v.variant_id,
        quantity: v.quantity
      })),
      currency
    })

    const selectedShipping = pickShipping(shippingRates, body?.shipping_rate_id)
    if (!selectedShipping) return serverError('No shipping rates returned')

    const params = new URLSearchParams()
    params.set('mode', 'payment')
    params.set('success_url', `${siteUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`)
    params.set('cancel_url', `${siteUrl}/?checkout=cancelled`)
    params.set('automatic_tax[enabled]', 'true')
    params.set('shipping_address_collection[allowed_countries][0]', String(recipient.country_code).toUpperCase())

    // Shipping option (fixed)
    params.set('shipping_options[0][shipping_rate_data][display_name]', selectedShipping.name || 'Shipping')
    params.set('shipping_options[0][shipping_rate_data][type]', 'fixed_amount')
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][amount]', String(toCents(selectedShipping.rate)))
    params.set('shipping_options[0][shipping_rate_data][fixed_amount][currency]', currency)

    // Session metadata used by webhook
    params.set('metadata[printful_shipping]', String(selectedShipping.id || ''))
    params.set('metadata[recipient_country]', String(recipient.country_code || ''))
    params.set('metadata[recipient_state]', String(recipient.state_code || ''))
    params.set('metadata[recipient_zip]', String(recipient.zip || ''))

    // Line items with inline price_data
    variantDetails.forEach((v, idx) => {
      params.set(`line_items[${idx}][quantity]`, String(v.quantity))
      params.set(`line_items[${idx}][price_data][currency]`, currency)
      params.set(`line_items[${idx}][price_data][unit_amount]`, String(toCents(v.retail_price)))
      params.set(`line_items[${idx}][price_data][product_data][name]`, v.name)
      if (v.image) {
        params.set(`line_items[${idx}][price_data][product_data][images][0]`, v.image)
      }
      params.set(`line_items[${idx}][price_data][product_data][metadata][printful_sync_variant_id]`, String(v.sync_variant_id))
      params.set(`line_items[${idx}][price_data][product_data][metadata][printful_variant_id]`, String(v.variant_id || ''))
    })

    const session = await stripePostForm('/v1/checkout/sessions', params)
    return json(200, { url: session.url, id: session.id })
  } catch (e) {
    return serverError(e?.message || 'Checkout session error')
  }
}

