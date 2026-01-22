<template>
  <nav class="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-stone-gray">
    <div class="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
      <div class="text-xl font-bold tracking-wide editorial-spacing">
        WHOM.CLOTHING_®
      </div>
      
      <div class="hidden md:flex space-x-8 text-sm tracking-wide uppercase">
        <a href="#shop" class="hover:text-gray-400 transition-colors">Shop</a>
        <a href="#collections" class="hover:text-gray-400 transition-colors">Collections</a>
        <a href="#about" class="hover:text-gray-400 transition-colors">About</a>
      </div>
      
      <div class="flex items-center space-x-6 text-sm tracking-wide uppercase">
        <a href="#account" class="hover:text-gray-400 transition-colors">Account</a>
        <button 
          @click="toggleCart"
          class="hover:text-gray-400 transition-colors relative"
        >
          Bag ({{ cartCount }})
          <span v-if="cartCount > 0" class="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></span>
        </button>
      </div>
    </div>

    <!-- Mini Cart Dropdown -->
    <div 
      v-if="showCart" 
      class="absolute top-full right-0 w-96 bg-black border-l border-b border-stone-gray shadow-2xl"
      @click.stop
    >
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-sm font-bold uppercase tracking-wider">Your Cart</h3>
          <button @click="showCart = false" class="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8 text-gray-500 text-xs">
          Loading...
        </div>

        <!-- Empty Cart -->
        <div v-else-if="cartItems.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-sm mb-4">Your cart is empty</p>
          <button 
            @click="showCart = false"
            class="text-xs uppercase tracking-wider border border-gray-600 px-6 py-2 hover:border-white transition-colors"
          >
            Continue Shopping
          </button>
        </div>

        <!-- Cart Items -->
        <div v-else>
          <div class="space-y-4 mb-6 max-h-64 overflow-y-auto">
            <div 
              v-for="item in cartItems" 
              :key="item.sync_variant_id"
              class="flex gap-4 pb-4 border-b border-stone-gray"
            >
              <div class="w-20 h-20 bg-stone-gray flex-shrink-0">
                <img 
                  v-if="item.image" 
                  :src="item.image" 
                  :alt="item.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-xs font-semibold uppercase truncate">{{ item.title }}</h4>
                <p class="text-xs text-gray-500 mt-1">{{ item.variantTitle }}</p>
                <p class="text-xs text-gray-400 mt-1">${{ item.price }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <button 
                    @click="updateQuantity(item.sync_variant_id, item.quantity - 1)"
                    class="text-xs px-2 py-1 border border-gray-600 hover:border-white"
                  >
                    -
                  </button>
                  <span class="text-xs">{{ item.quantity }}</span>
                  <button 
                    @click="updateQuantity(item.sync_variant_id, item.quantity + 1)"
                    class="text-xs px-2 py-1 border border-gray-600 hover:border-white"
                  >
                    +
                  </button>
                  <button 
                    @click="removeItem(item.sync_variant_id)"
                    class="text-xs text-gray-500 hover:text-white ml-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Total -->
          <div class="border-t border-stone-gray pt-4 mb-6">
            <div class="flex justify-between text-sm font-bold uppercase">
              <span>Total</span>
              <span>${{ cartTotal }}</span>
            </div>
          </div>

          <!-- Shipping (minimal for quote) -->
          <div class="border-t border-stone-gray pt-4 mb-4 space-y-3">
            <div class="grid grid-cols-3 gap-2">
              <input
                v-model="shipCountry"
                maxlength="2"
                placeholder="US"
                class="bg-black border border-stone-gray px-3 py-2 text-xs uppercase tracking-wider"
              />
              <input
                v-model="shipState"
                maxlength="3"
                placeholder="CA"
                class="bg-black border border-stone-gray px-3 py-2 text-xs uppercase tracking-wider"
              />
              <input
                v-model="shipZip"
                maxlength="12"
                placeholder="ZIP"
                class="bg-black border border-stone-gray px-3 py-2 text-xs uppercase tracking-wider"
              />
            </div>
            <div class="text-[10px] text-gray-500 tracking-widest uppercase">
              Used to quote shipping before Stripe checkout.
            </div>
          </div>

          <!-- Checkout Button -->
          <button
            @click="onCheckout"
            class="block w-full text-center py-3 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-wider text-xs font-semibold"
          >
            Checkout →
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCart } from '../composables/useCart'

const { cartCount, cartItems, cartTotal, loading, loadCart, updateQuantity, removeItem, startCheckout } = useCart()
const showCart = ref(false)
const shipCountry = ref('US')
const shipState = ref('')
const shipZip = ref('')

const toggleCart = () => {
  showCart.value = !showCart.value
}

// Close cart when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (showCart.value && !e.target.closest('nav')) {
      showCart.value = false
    }
  })
}

onMounted(() => {
  loadCart()
})

const onCheckout = async () => {
  await startCheckout({
    country_code: (shipCountry.value || '').toUpperCase(),
    state_code: (shipState.value || '').toUpperCase(),
    zip: shipZip.value || ''
  })
}
</script>

<style scoped>
</style>


