<template>
  <main class="pt-24 bg-deep-black min-h-screen">
    <section class="py-10 border-b border-stone-gray bg-black">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        <div>
          <div class="text-xs tracking-widest text-gray-500">/ PRODUCT</div>
          <h1 class="text-2xl md:text-4xl font-black editorial-spacing mt-2">
            {{ product?.title || 'PRODUCT_' }}
          </h1>
        </div>
        <RouterLink
          to="/collections"
          class="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
        >
          Back to collections →
        </RouterLink>
      </div>
    </section>

    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div v-if="loading" class="text-center py-20">
          <div class="text-gray-400 text-sm tracking-widest uppercase">Loading product...</div>
        </div>

        <div v-else-if="error" class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-1">/ Notice</div>
          <div class="text-sm text-gray-300">{{ error }}</div>
          <div class="mt-6 flex flex-wrap gap-4">
            <RouterLink
              to="/collections"
              class="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs"
            >
              Browse products
            </RouterLink>
          </div>
        </div>

        <div v-else class="grid lg:grid-cols-12 gap-10 items-start">
          <!-- Media -->
          <div class="lg:col-span-6">
            <div class="border border-stone-gray bg-black/30 overflow-hidden">
              <div v-if="imageUrl" class="aspect-[3/4] overflow-hidden">
                <img :src="imageUrl" :alt="product.title" class="w-full h-full object-cover" />
              </div>
              <div v-else class="aspect-[3/4] flex items-center justify-center bg-stone-gray">
                <span class="text-gray-700 text-xs tracking-widest uppercase">{{ product.title }}</span>
              </div>
            </div>
          </div>

          <!-- Details -->
          <div class="lg:col-span-6 space-y-8">
            <div class="space-y-3">
              <div class="text-xs tracking-widest uppercase text-gray-500">
                {{ productCollection }}
              </div>
              <div class="text-sm text-gray-300 tracking-wide leading-relaxed">
                {{ productDescription }}
              </div>
              <div class="text-lg text-gray-200 font-semibold tracking-wide">
                {{ formattedPrice }}
              </div>
            </div>

            <div class="border border-stone-gray bg-black/30 p-6 space-y-4">
              <div class="text-xs tracking-widest uppercase text-gray-500">/ Purchase</div>
              <button
                @click="handleAddToCart"
                :disabled="!isAvailable || addingToCart"
                class="w-full py-4 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ addingToCart ? 'Adding...' : isAvailable ? 'Add to Cart' : 'Out of Stock' }}
              </button>
              <div class="text-xs text-gray-600">
                Product URL: <span class="text-gray-500">{{ canonicalPath }}</span>
              </div>
            </div>

            <div v-if="(product?.tags || []).length" class="border border-stone-gray bg-black/30 p-6">
              <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ Tags</div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="t in product.tags"
                  :key="t"
                  class="px-3 py-1 border border-stone-gray text-xs tracking-widest uppercase text-gray-400"
                >
                  {{ t }}
                </span>
              </div>
            </div>

            <div class="text-xs text-gray-600">
              ID: <span class="text-gray-500">{{ product?.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { fetchCatalog } from '../services/catalog'
import { useCart } from '../composables/useCart'

const route = useRoute()
const { addToCart } = useCart()

const loading = ref(true)
const error = ref(null)
const product = ref(null)
const addingToCart = ref(false)

const productId = computed(() => String(route?.params?.id || '').trim())

const canonicalPath = computed(() => `/product/${encodeURIComponent(productId.value)}`)

const imageUrl = computed(() => {
  const p = product.value
  return p?.images?.[0]?.url || p?.thumbnail || null
})

const productCollection = computed(() => {
  const tags = product.value?.tags || []
  const collections = ['FAITH', 'PURPOSE', 'IDENTITY', 'WHOM SIGNATURES']
  const found = tags.find(tag => collections.includes(String(tag || '').toUpperCase()))
  return found || 'COLLECTION'
})

const productDescription = computed(() => {
  return String(product.value?.description || '').trim() || 'Details coming soon.'
})

const formattedPrice = computed(() => {
  const amount = product.value?.priceRange?.minVariantPrice?.amount || '0.00'
  const currency = product.value?.priceRange?.minVariantPrice?.currencyCode || 'USD'
  return `$${parseFloat(amount).toFixed(2)} ${currency !== 'USD' ? currency : ''}`
})

const isAvailable = computed(() => {
  return product.value?.variants?.[0]?.availableForSale !== false
})

const firstVariant = computed(() => product.value?.variants?.[0] || null)

const handleAddToCart = async () => {
  const v = firstVariant.value
  if (!v?.id || addingToCart.value) return

  addingToCart.value = true
  try {
    await addToCart(
      {
        sync_variant_id: String(v.id),
        title: product.value?.title || 'Item',
        variantTitle: v?.title || '',
        price: v?.priceV2?.amount || product.value?.priceRange?.minVariantPrice?.amount || '0.00',
        currency: v?.priceV2?.currencyCode || product.value?.priceRange?.minVariantPrice?.currencyCode || 'USD',
        image: imageUrl.value
      },
      1
    )
  } catch (e) {
    console.error('Add to cart failed:', e)
  } finally {
    addingToCart.value = false
  }
}

async function loadProduct() {
  loading.value = true
  error.value = null
  product.value = null

  try {
    const { products } = await fetchCatalog()
    const found = (products || []).find(p => String(p?.id || '') === productId.value)
    if (!found) throw new Error('Product not found')
    product.value = found
  } catch (e) {
    error.value = e?.message || 'Unable to load product'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>

