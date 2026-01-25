import { ref, computed } from 'vue'
import { CART_STORAGE_KEY } from '../config/api'
const whomJohn8BlackMockup = new URL(
  '../../WHM-ASSETS/checkout images/lat-unisex-fine-jersey-tee---6901-black-front-6975a1809f263.png',
  import.meta.url
).href

// Global cart state
const cart = ref({ items: [] })
const loading = ref(false)
const error = ref(null)

function isWhmJohn8Title(title) {
  const t = String(title || '').toUpperCase().replace(/[^A-Z0-9]+/g, '')
  return t.includes('WHM') && t.includes('JOHN8') && t.includes('5455')
}
function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] }
    // Patch legacy cart images for WHM John8 if the old asset was removed
    const items = parsed.items.map(i => {
      if (!i) return i
      const title = i.title
      const img = String(i.image || '')
      const usesOldMock =
        img.includes('lat-unisex-fine-jersey-tee---6901-black-front-69759e81482f4.png')
      if (isWhmJohn8Title(title) && (!i.image || usesOldMock)) {
        return { ...i, image: whomJohn8BlackMockup }
      }
      return i
    })
    return { items }
  } catch {
    return { items: [] }
  }
}

function persistCart(nextCart) {
  cart.value = nextCart
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart))
  } catch {
    // ignore quota errors
  }
}

function normalizeVariantId(id) {
  const s = String(id ?? '').trim().replace(/^#/, '')
  return s || null
}
export function useCart() {
  // Computed properties
  const cartCount = computed(() => {
    return (cart.value?.items || []).reduce((t, i) => t + (i.quantity || 0), 0)
  })

  const cartTotal = computed(() => {
    const total = (cart.value?.items || []).reduce((t, i) => {
      const p = typeof i.price === 'string' ? parseFloat(i.price) : i.price
      const q = i.quantity || 0
      return t + (Number.isFinite(p) ? p * q : 0)
    }, 0)
    return total.toFixed(2)
  })

  const cartItems = computed(() => {
    return cart.value?.items || []
  })

  // Load cart
  const loadCart = async () => {
    loading.value = true
    error.value = null
    try {
      persistCart(readCartFromStorage())
    } catch (err) {
      error.value = err.message
      console.error('Load cart error:', err)
    } finally {
      loading.value = false
    }
  }

  // Add to cart
  const addToCart = async (item, quantity = 1) => {
    loading.value = true
    error.value = null
    try {
      const syncVariantId = normalizeVariantId(item?.sync_variant_id ?? item?.syncVariantId ?? item?.id)
      if (!syncVariantId) {
        throw new Error('Invalid variant')
      }

      const next = readCartFromStorage()
      const idx = next.items.findIndex(i => normalizeVariantId(i.sync_variant_id) === syncVariantId)
      if (idx >= 0) {
        next.items[idx].quantity += quantity
      } else {
        next.items.push({
          sync_variant_id: syncVariantId,
          quantity,
          title: item?.title || 'Item',
          variantTitle: item?.variantTitle || '',
          price: item?.price || '0.00',
          currency: item?.currency || 'USD',
          image: item?.image || null
        })
      }

      persistCart(next)
      return true
    } catch (err) {
      error.value = err.message
      console.error('Add to cart error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Update quantity
  const updateQuantity = async (syncVariantId, quantity) => {
    loading.value = true
    error.value = null
    try {
      const id = normalizeVariantId(syncVariantId)
      const q = Number(quantity)
      const next = readCartFromStorage()
      const idx = next.items.findIndex(i => normalizeVariantId(i.sync_variant_id) === id)
      if (idx < 0) return true

      if (q <= 0) {
        next.items.splice(idx, 1)
      } else {
        next.items[idx].quantity = q
      }

      persistCart(next)
      return true
    } catch (err) {
      error.value = err.message
      console.error('Update quantity error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Remove from cart
  const removeItem = async (syncVariantId) => {
    loading.value = true
    error.value = null
    try {
      const id = normalizeVariantId(syncVariantId)
      const next = readCartFromStorage()
      next.items = next.items.filter(i => normalizeVariantId(i.sync_variant_id) !== id)
      persistCart(next)
      return true
    } catch (err) {
      error.value = err.message
      console.error('Remove item error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Create Stripe Checkout session (via Netlify Function)
  const startCheckout = async (recipient) => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          items: (cart.value?.items || []).map(i => ({
            sync_variant_id: i.sync_variant_id,
            quantity: i.quantity,
            image: i.image || null
          })),
          recipient
        })
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Checkout failed')
      if (data?.url) window.location.href = data.url
      return true
    } catch (err) {
      error.value = err.message
      console.error('Checkout error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    cart,
    cartCount,
    cartTotal,
    cartItems,
    loading,
    error,
    loadCart,
    addToCart,
    updateQuantity,
    removeItem,
    startCheckout
  }
}

