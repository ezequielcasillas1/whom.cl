import { json, badRequest, serverError, getRawBody, methodNotAllowed } from './_http.js'
import { createPrintfulOrder } from './_printful.js'
import crypto from 'crypto'

function requireEnv(name) {
  const val = process.env[name]
  if (!val) throw new Error(`Missing env var: ${name}`)
  return val
}

function stripeSecretKey() {
  return requireEnv('STRIPE_SECRET_KEY')
}

function stripeWebhookSecret() {
  return requireEnv('STRIPE_WEBHOOK_SECRET')
}

function parseStripeSignatureHeader(sigHeader) {
  const parts = String(sigHeader || '').split(',').map(s => s.trim())
  const out = { t: null, v1: [] }
  for (const p of parts) {
    const [k, v] = p.split('=')
    if (k === 't') out.t = v
    if (k === 'v1') out.v1.push(v)
  }
  return out
}

function timingSafeEqualHex(a, b) {
  try {
    const ba = Buffer.from(a, 'hex')
    const bb = Buffer.from(b, 'hex')
    if (ba.length !== bb.length) return false
    return crypto.timingSafeEqual(ba, bb)
  } catch {
    return false
  }
}

function verifyStripeSignature({ rawBody, sigHeader }) {
  const { t, v1 } = parseStripeSignatureHeader(sigHeader)
  if (!t || !v1.length) return false

  const payload = Buffer.isBuffer(rawBody)
    ? rawBody
    : Buffer.from(String(rawBody || ''), 'utf8')

  const signedPayload = Buffer.concat([
    Buffer.from(`${t}.`, 'utf8'),
    payload
  ])

  const expected = crypto
    .createHmac('sha256', stripeWebhookSecret())
    .update(signedPayload)
    .digest('hex')

  return v1.some(sig => timingSafeEqualHex(sig, expected))
}

async function stripeGet(path) {
  const res = await fetch(`https://api.stripe.com${path}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${stripeSecretKey()}` }
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error?.message || `Stripe error (${res.status})`)
  return data
}

function toPrintfulExternalId(stripeSessionId) {
  // Printful external_id max length is 32
  const s = String(stripeSessionId || '')
  return s.length <= 32 ? s : s.slice(0, 32)
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') return methodNotAllowed(['POST'])

  const sig =
    event.headers?.['stripe-signature'] || event.headers?.['Stripe-Signature']
  if (!sig) return badRequest('Missing Stripe-Signature header')

  const raw = getRawBody(event)
  if (!verifyStripeSignature({ rawBody: raw, sigHeader: sig })) {
    return badRequest('Webhook signature verification failed')
  }

  let evt
  try {
    const text = Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw || '')
    evt = JSON.parse(text)
  } catch (e) {
    return badRequest(`Invalid webhook JSON: ${e?.message || 'error'}`)
  }

  try {
    if (evt.type === 'checkout.session.completed') {
      const session = evt.data.object
      if (session.payment_status !== 'paid') {
        return json(200, { received: true, ignored: true })
      }

      const lineItems = await stripeGet(
        `/v1/checkout/sessions/${encodeURIComponent(session.id)}/line_items?limit=100&expand%5B%5D=data.price.product`
      )

      const items = (lineItems?.data || []).map(li => {
        const product = li?.price?.product
        const md = product?.metadata || {}
        const syncVariantId = String(md.printful_sync_variant_id ?? '').trim()
        return {
          sync_variant_id: syncVariantId,
          quantity: li.quantity || 1
        }
      }).filter(i => Boolean(i.sync_variant_id))

      const shipping = session.shipping_details
      const addr = shipping?.address || {}

      const order = {
        external_id: toPrintfulExternalId(session.id),
        shipping: session.metadata?.printful_shipping ? String(session.metadata.printful_shipping) : undefined,
        recipient: {
          name: shipping?.name,
          address1: addr.line1,
          address2: addr.line2,
          city: addr.city,
          state_code: addr.state,
          country_code: addr.country,
          zip: addr.postal_code,
          email: session.customer_details?.email
        },
        items
      }

      const created = await createPrintfulOrder({ order, confirm: true })
      return json(200, { received: true, printful: created?.result || true })
    }

    return json(200, { received: true })
  } catch (e) {
    return serverError(e?.message || 'Webhook handler error')
  }
}

