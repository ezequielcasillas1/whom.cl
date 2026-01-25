import { methodNotAllowed, serverError } from './_http.js'
import { getStoreProducts, getStoreProductById } from './_printful.js'

let cache = {
  ts: 0,
  xml: null
}

const CACHE_MS = 5 * 60_000

function header(event, name) {
  const h = event?.headers || {}
  return h?.[name] ?? h?.[String(name || '').toLowerCase()] ?? null
}

function siteOrigin(event) {
  const proto =
    header(event, 'x-forwarded-proto') ||
    header(event, 'X-Forwarded-Proto') ||
    'https'
  const host =
    header(event, 'x-forwarded-host') ||
    header(event, 'X-Forwarded-Host') ||
    header(event, 'host') ||
    header(event, 'Host')

  if (host) return `${proto}://${host}`
  return process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL || ''
}

function xmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function money(amount, currency) {
  const n = Number.parseFloat(amount)
  const cur = String(currency || 'USD').toUpperCase()
  const val = Number.isFinite(n) ? n.toFixed(2) : '0.00'
  return `${val} ${cur}`
}

function normalizeProduct(detail) {
  const p = detail?.result?.sync_product
  const variants = detail?.result?.sync_variants || []
  const prices = variants
    .map(v => Number.parseFloat(v?.retail_price))
    .filter(n => Number.isFinite(n))
  const minPrice = prices.length ? Math.min(...prices) : 0
  const title = p?.name || 'Product'

  return {
    id: String(p?.id ?? ''),
    title,
    description: String(p?.name || ''),
    thumbnail: p?.thumbnail_url || null,
    price: { amount: String(minPrice), currencyCode: p?.currency || process.env.PRINTFUL_CURRENCY || 'USD' }
  }
}

function itemXml(p, origin) {
  const title = String(p?.title || '').trim() || 'Product'
  const link = `${origin}/product/${encodeURIComponent(String(p?.id || '').trim() || title)}`
  const image = String(p?.thumbnail || '').trim()
  const description = String(p?.description || title).trim()

  return [
    '<item>',
    `<g:id>${xmlEscape(p?.id || title)}</g:id>`,
    `<title>${xmlEscape(title)}</title>`,
    `<description>${xmlEscape(description)}</description>`,
    `<link>${xmlEscape(link)}</link>`,
    image ? `<g:image_link>${xmlEscape(image)}</g:image_link>` : '',
    `<g:availability>in stock</g:availability>`,
    `<g:condition>new</g:condition>`,
    `<g:price>${xmlEscape(money(p?.price?.amount, p?.price?.currencyCode))}</g:price>`,
    `<g:brand>${xmlEscape(process.env.GOOGLE_FEED_BRAND || 'WHOM')}</g:brand>`,
    `<g:identifier_exists>false</g:identifier_exists>`,
    '</item>'
  ]
    .filter(Boolean)
    .join('')
}

function feedXml({ origin, items }) {
  const title = process.env.GOOGLE_FEED_TITLE || 'WHOM Clothing'
  const desc = process.env.GOOGLE_FEED_DESCRIPTION || 'WHOM Clothing product feed'

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    '<channel>',
    `<title>${xmlEscape(title)}</title>`,
    `<link>${xmlEscape(origin)}</link>`,
    `<description>${xmlEscape(desc)}</description>`,
    ...items,
    '</channel>',
    '</rss>'
  ].join('')
}

export async function handler(event) {
  if (event.httpMethod !== 'GET') return methodNotAllowed(['GET'])

  try {
    const origin = siteOrigin(event)
    if (!origin) {
      return serverError('Missing site origin (set SITE_URL/URL env or deploy behind forwarded host headers)')
    }

    if (cache.xml && Date.now() - cache.ts < CACHE_MS) {
      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/xml; charset=utf-8',
          'cache-control': 'public, max-age=300'
        },
        body: cache.xml
      }
    }

    const list = await getStoreProducts()
    const products = list?.result || []
    const details = await Promise.all(products.map(p => getStoreProductById(p.id)))
    const normalized = details.map(normalizeProduct).filter(p => p.id)

    const items = normalized.map(p => itemXml(p, origin))
    const xml = feedXml({ origin, items })

    cache = { ts: Date.now(), xml }

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': 'public, max-age=300'
      },
      body: xml
    }
  } catch (e) {
    return serverError(e?.message || 'Google feed error')
  }
}

