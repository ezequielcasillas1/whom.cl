import { ref, computed } from 'vue'
import { getCart, addToCart as addToCartAPI, removeFromCart, updateCartLine, getCartCount } from '../services/shopify'

// Global cart state
const cart = ref(null)
const loading = ref(false)
const error = ref(null)

export function useCart() {
  // Computed properties
  const cartCount = computed(() => {
    if (!cart.value) return 0
    return cart.value.lines.edges.reduce((total, { node }) => total + node.quantity, 0)
  })

  const cartTotal = computed(() => {
    if (!cart.value) return '0.00'
    return cart.value.cost.totalAmount.amount
  })

  const cartItems = computed(() => {
    if (!cart.value) return []
    return cart.value.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      variantId: node.merchandise.id,
      title: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      price: node.merchandise.priceV2.amount,
      currency: node.merchandise.priceV2.currencyCode,
      image: node.merchandise.product.images.edges[0]?.node.url,
      handle: node.merchandise.product.handle
    }))
  })

  // Load cart
  const loadCart = async () => {
    loading.value = true
    error.value = null
    try {
      cart.value = await getCart()
    } catch (err) {
      error.value = err.message
      console.error('Load cart error:', err)
    } finally {
      loading.value = false
    }
  }

  // Add to cart
  const addToCart = async (variantId, quantity = 1) => {
    loading.value = true
    error.value = null
    try {
      cart.value = await addToCartAPI(variantId, quantity)
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
  const updateQuantity = async (lineId, quantity) => {
    loading.value = true
    error.value = null
    try {
      await updateCartLine(lineId, quantity)
      await loadCart()
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
  const removeItem = async (lineId) => {
    loading.value = true
    error.value = null
    try {
      await removeFromCart(lineId)
      await loadCart()
      return true
    } catch (err) {
      error.value = err.message
      console.error('Remove item error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Get checkout URL
  const checkoutUrl = computed(() => cart.value?.checkoutUrl || '')

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
    checkoutUrl
  }
}

