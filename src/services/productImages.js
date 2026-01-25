// Centralized product image overrides / helpers.
// Keep UI consistent across cards, product page, cart, and Stripe checkout.

// WHM- JOHN8:54-55 mockups (bundled in repo)
const whmJohn8BlackMockup = new URL(
  '../../WHM-ASSETS/Product Id/WHMSIG-SHIRTS/WHM-JOHN8-/lat-unisex-fine-jersey-tee---6901-black-front-69766ce69bb16.png',
  import.meta.url
).href
const whmJohn8CoyoteBrownMockup = new URL(
  '../../WHM-ASSETS/Product Id/WHMSIG-SHIRTS/WHM-JOHN8-/lat-unisex-fine-jersey-tee---6901-coyote-brown-front-69766ce69f84a.png',
  import.meta.url
).href
const whmJohn8NaturalMockup = new URL(
  '../../WHM-ASSETS/Product Id/WHMSIG-SHIRTS/WHM-JOHN8-/lat-unisex-fine-jersey-tee---6901-natural-front-69766ce6a1405.png',
  import.meta.url
).href
const whmJohn8NavyMockup = new URL(
  '../../WHM-ASSETS/Product Id/WHMSIG-SHIRTS/WHM-JOHN8-/lat-unisex-fine-jersey-tee---6901-navy-front-69766ce6a3ae1.png',
  import.meta.url
).href
const whmJohn8WhiteMockup = new URL(
  '../../WHM-ASSETS/Product Id/WHMSIG-SHIRTS/WHM-JOHN8-/lat-unisex-fine-jersey-tee---6901-white-front-69766ce6a5272.png',
  import.meta.url
).href

function normalizeKey(raw) {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '')
}

const WHM_JOHN8_MOCKUPS_BY_COLOR_KEY = {
  BLACK: whmJohn8BlackMockup,
  NAVY: whmJohn8NavyMockup,
  WHITE: whmJohn8WhiteMockup,
  NATURAL: whmJohn8NaturalMockup,
  COYOTEBROWN: whmJohn8CoyoteBrownMockup,
  // Common alias users expect
  BEIGE: whmJohn8NaturalMockup
}

// Explicit per-product overrides (by Printful sync_product id).
const IMAGE_OVERRIDES_BY_ID = {
  // WHM- JOHN8:54-55
  '415695270': {
    primary: whmJohn8BlackMockup,
    byColorKey: WHM_JOHN8_MOCKUPS_BY_COLOR_KEY,
    images: [
      whmJohn8BlackMockup,
      whmJohn8CoyoteBrownMockup,
      whmJohn8NaturalMockup,
      whmJohn8NavyMockup,
      whmJohn8WhiteMockup
    ]
  }
}

function normalizeTitleKey(title) {
  return String(title || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '')
}

function getOverrideByTitle(title) {
  // Backstop for when IDs change but naming stays stable.
  const k = normalizeTitleKey(title)
  if (k.includes('WHM') && k.includes('JOHN8') && k.includes('5455')) {
    return {
      primary: whmJohn8BlackMockup,
      byColorKey: WHM_JOHN8_MOCKUPS_BY_COLOR_KEY,
      images: [
        whmJohn8BlackMockup,
        whmJohn8CoyoteBrownMockup,
        whmJohn8NaturalMockup,
        whmJohn8NavyMockup,
        whmJohn8WhiteMockup
      ]
    }
  }
  return null
}

export function getProductImageOverride(product) {
  const id = String(product?.id ?? '').trim()
  if (id && IMAGE_OVERRIDES_BY_ID[id]) return IMAGE_OVERRIDES_BY_ID[id]
  return getOverrideByTitle(product?.title) || null
}

function getVariantImageUrl(variant) {
  const direct = variant?.image || variant?.imageUrl || variant?.preview || null
  if (direct) return direct
  const files = Array.isArray(variant?.files) ? variant.files : []
  const f0 = files[0]
  return f0?.preview_url || f0?.thumbnail_url || f0?.url || null
}

function getSelectedOptionValue(variant, optionName) {
  const opts = variant?.selectedOptions || []
  const found = opts.find(
    o => normalizeKey(o?.name) === normalizeKey(optionName)
  )
  return found?.value ? String(found.value) : null
}

export function getPrimaryProductImageUrl(product, selectedVariant = null) {
  const override = getProductImageOverride(product)
  if (override) {
    const color = getSelectedOptionValue(selectedVariant, 'Color')
    const colorKey = normalizeKey(color)
    if (colorKey && override?.byColorKey?.[colorKey]) {
      return override.byColorKey[colorKey]
    }
    if (override?.primary) return override.primary
  }

  const variantUrl = getVariantImageUrl(selectedVariant)
  if (variantUrl) return variantUrl

  return product?.images?.[0]?.url || product?.thumbnail || null
}

export function getProductImageUrls(product) {
  const override = getProductImageOverride(product)
  if (override?.images?.length) return override.images

  const urls = (product?.images || [])
    .map(i => i?.url)
    .filter(Boolean)

  if (urls.length) return urls
  if (product?.thumbnail) return [product.thumbnail]
  return []
}

