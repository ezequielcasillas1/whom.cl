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

              <div v-if="hasVariantOptions" class="space-y-4">
                <div v-if="colorOptions.length" class="space-y-2">
                  <div class="text-[11px] tracking-widest uppercase text-gray-500">Color</div>
                  <select
                    v-model="selectedColor"
                    class="w-full bg-black/40 border border-stone-gray px-3 py-3 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                  >
                    <option v-for="c in colorOptions" :key="c" :value="c">{{ c }}</option>
                  </select>
                </div>

                <div v-if="sizeOptions.length" class="space-y-2">
                  <div class="text-[11px] tracking-widest uppercase text-gray-500">Size</div>
                  <select
                    v-model="selectedSize"
                    class="w-full bg-black/40 border border-stone-gray px-3 py-3 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-white/30"
                  >
                    <option v-for="s in sizeOptions" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>

                <div v-if="!selectedVariant" class="text-xs text-gray-500">
                  Please select a valid combination.
                </div>
              </div>

              <button
                @click="handleAddToCart"
                :disabled="!isAvailable || addingToCart || !selectedVariant"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { fetchCatalog } from '../services/catalog'
import { useCart } from '../composables/useCart'
import { getPrimaryProductImageUrl } from '../services/productImages'

const route = useRoute()
const { addToCart } = useCart()

const loading = ref(true)
const error = ref(null)
const product = ref(null)
const addingToCart = ref(false)

const productId = computed(() => String(route?.params?.id || '').trim())

const canonicalPath = computed(() => `/product/${encodeURIComponent(productId.value)}`)

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

function getSelectedOptionValue(variant, optionName) {
  const opts = variant?.selectedOptions || []
  const found = opts.find(o => String(o?.name || '').toLowerCase() === String(optionName || '').toLowerCase())
  return found?.value ? String(found.value) : null
}

const selectedColor = ref(null)
const selectedSize = ref(null)

const optionsIndex = computed(() => {
  const map = new Map()
  const variants = product.value?.variants || []
  for (const v of variants) {
    const opts = v?.selectedOptions || []
    for (const o of opts) {
      const name = String(o?.name || '').trim()
      const value = String(o?.value || '').trim()
      if (!name || !value) continue
      const key = name.toLowerCase()
      if (!map.has(key)) map.set(key, new Set())
      map.get(key).add(value)
    }
  }
  return map
})

const colorOptions = computed(() => {
  const set = optionsIndex.value.get('color')
  return set ? Array.from(set) : []
})

const sizeOptions = computed(() => {
  const set = optionsIndex.value.get('size')
  const arr = set ? Array.from(set) : []
  const order = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']
  arr.sort((a, b) => {
    const ia = order.indexOf(String(a).toUpperCase())
    const ib = order.indexOf(String(b).toUpperCase())
    if (ia === -1 && ib === -1) return String(a).localeCompare(String(b))
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
  })
  return arr
})

const hasVariantOptions = computed(() => colorOptions.value.length > 1 || sizeOptions.value.length > 1)

watch(
  () => product.value,
  p => {
    if (!p) return
    if (!selectedColor.value && colorOptions.value.length) selectedColor.value = colorOptions.value[0]
    if (!selectedSize.value && sizeOptions.value.length) selectedSize.value = sizeOptions.value[0]
  },
  { immediate: true }
)

const selectedVariant = computed(() => {
  const variants = product.value?.variants || []
  if (!variants.length) return null

  const needsColor = colorOptions.value.length > 0
  const needsSize = sizeOptions.value.length > 0

  if (!needsColor && !needsSize) return variants[0]

  return (
    variants.find(v => {
      const c = getSelectedOptionValue(v, 'Color')
      const s = getSelectedOptionValue(v, 'Size')
      const okColor = !needsColor || (selectedColor.value && c === selectedColor.value)
      const okSize = !needsSize || (selectedSize.value && s === selectedSize.value)
      return okColor && okSize
    }) || null
  )
})

const imageUrl = computed(() => {
  // If the combination is invalid (no matching variant), still show the color-selected image.
  const pseudoVariant =
    selectedVariant.value ||
    {
      selectedOptions: [
        ...(selectedColor.value ? [{ name: 'Color', value: selectedColor.value }] : []),
        ...(selectedSize.value ? [{ name: 'Size', value: selectedSize.value }] : [])
      ]
    }

  return getPrimaryProductImageUrl(product.value, pseudoVariant)
})

const isAvailable = computed(() => {
  return selectedVariant.value?.availableForSale !== false
})

const handleAddToCart = async () => {
  const v = selectedVariant.value
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
  selectedColor.value = null
  selectedSize.value = null

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

