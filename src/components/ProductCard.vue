<template>
  <div class="group cursor-pointer" @click="handleProductClick">
    <div class="relative mb-4 overflow-hidden bg-stone-gray">
      <!-- Product Image -->
      <div v-if="productImage" class="aspect-[3/4] overflow-hidden">
        <img 
          :src="productImage" 
          :alt="product.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <!-- Placeholder if no image -->
      <div v-else class="aspect-[3/4] bg-stone-gray group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
        <span class="text-gray-600 text-xs tracking-widest uppercase">{{ product.title }}</span>
      </div>
      
      <!-- Product Code Overlay -->
      <div class="absolute top-4 left-4 text-xs tracking-widest text-white/70 bg-black/50 px-2 py-1">
        {{ productCode }}
      </div>

      <!-- Add to Cart Button (on hover) -->
      <div class="absolute bottom-0 left-0 right-0 bg-black/90 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button 
          @click.stop="handleAddToCart"
          :disabled="!isAvailable || addingToCart"
          class="w-full py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ addingToCart ? 'Adding...' : isAvailable ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>
    
    <div class="space-y-2">
      <div class="text-xs tracking-widest text-gray-500 uppercase">
        {{ productCollection }}
      </div>
      <h3 class="text-sm font-semibold tracking-wide uppercase group-hover:text-gray-400 transition-colors">
        {{ product.title }}
      </h3>
      <p class="text-sm text-gray-400">
        {{ formattedPrice }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCart } from '../composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const { addToCart } = useCart()
const addingToCart = ref(false)

// Get product image
const productImage = computed(() => {
  return props.product.images?.[0]?.url || null
})

// Get product code (using index)
const productCode = computed(() => {
  return `/${String(props.index + 1).padStart(3, '0')}`
})

// Get collection from tags
const productCollection = computed(() => {
  const tags = props.product.tags || []
  const collections = ['FAITH', 'PURPOSE', 'IDENTITY']
  const found = tags.find(tag => collections.includes(tag.toUpperCase()))
  return found || 'COLLECTION'
})

// Format price
const formattedPrice = computed(() => {
  const amount = props.product.priceRange?.minVariantPrice?.amount || '0.00'
  const currency = props.product.priceRange?.minVariantPrice?.currencyCode || 'USD'
  return `$${parseFloat(amount).toFixed(2)} ${currency !== 'USD' ? currency : ''}`
})

// Check availability
const isAvailable = computed(() => {
  return props.product.variants?.[0]?.availableForSale !== false
})

// Get first variant ID
const variantId = computed(() => {
  return props.product.variants?.[0]?.id
})

// Handle add to cart
const handleAddToCart = async () => {
  if (!variantId.value || addingToCart.value) return
  
  addingToCart.value = true
  try {
    const success = await addToCart(variantId.value, 1)
    if (success) {
      // Optional: Show success notification
      console.log('Added to cart:', props.product.title)
    }
  } catch (error) {
    console.error('Add to cart failed:', error)
  } finally {
    addingToCart.value = false
  }
}

// Handle product click (navigate to product page)
const handleProductClick = () => {
  // TODO: Navigate to product detail page
  console.log('Product clicked:', props.product.handle)
}
</script>


