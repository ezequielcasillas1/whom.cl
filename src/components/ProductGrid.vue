<template>
  <section id="shop" class="py-32 bg-deep-black">
    <div class="max-w-7xl mx-auto px-6">
      <!-- About Section -->
      <div id="about" class="mb-32 max-w-5xl mx-auto scroll-mt-24">
        <div class="text-xs tracking-widest mb-4 text-gray-500 uppercase">/ About</div>
        <h2 class="text-4xl md:text-6xl font-black editorial-spacing mb-6">
          MINIMAL → GRAND_
        </h2>
        <p class="text-sm md:text-base text-gray-300 leading-relaxed tracking-wide max-w-3xl">
          WHOM.CLOTHING is scripture-first graphic design: disciplined minimalism, editorial spacing, and bold marks
          that scale from quiet detail to statement piece.
        </p>

        <div class="mt-10 grid sm:grid-cols-3 gap-4">
          <div class="border border-stone-gray bg-black/30 p-5">
            <div class="text-[11px] tracking-widest uppercase text-gray-500 mb-2">01 / TYPE</div>
            <div class="text-sm text-gray-200 tracking-wide leading-relaxed">
              Clean typography. Heavy restraint. Meaning carried by space.
            </div>
          </div>
          <div class="border border-stone-gray bg-black/30 p-5">
            <div class="text-[11px] tracking-widest uppercase text-gray-500 mb-2">02 / MARK</div>
            <div class="text-sm text-gray-200 tracking-wide leading-relaxed">
              Minimal geometry—built to read from a distance.
            </div>
          </div>
          <div class="border border-stone-gray bg-black/30 p-5">
            <div class="text-[11px] tracking-widest uppercase text-gray-500 mb-2">03 / WORD</div>
            <div class="text-sm text-gray-200 tracking-wide leading-relaxed">
              Scripture-indexed references. Faith, not aesthetic—first.
            </div>
          </div>
        </div>
      </div>
      
      <!-- Featured Products -->
      <div class="mb-16">
        <h2 class="text-4xl md:text-6xl font-black mb-12 editorial-spacing">
          FEATURED PIECES
        </h2>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="text-gray-400 text-sm tracking-widest uppercase">Loading products...</div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-gray-400 text-sm mb-4">{{ error }}</div>
        <div class="text-xs text-gray-600">Showing sample products</div>
      </div>
      
      <!-- Products Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <ProductCard 
          v-for="(product, index) in visibleFeatured" 
          :key="product.id"
          :product="product"
          :index="index"
        />
      </div>

      <div v-if="displayProducts.length > 3" class="text-xs tracking-widest uppercase text-gray-600 flex items-center justify-between gap-6 mb-10">
        <span>Showing {{ visibleFeatured.length }} of {{ displayProducts.length }}</span>
        <span v-if="loadingMore">Loading more…</span>
      </div>

      <div v-if="hasMore" ref="sentinelEl" class="h-10"></div>
      <div v-else-if="displayProducts.length > 3" class="h-2"></div>

      <div v-if="hasMore && !supportsObserver" class="mt-6">
        <button
          type="button"
          @click="loadMore"
          class="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs"
          aria-label="Load more products"
        >
          Load more
        </button>
      </div>
      
      <!-- Call to Action -->
      <div class="text-center">
        <a href="#more" class="inline-flex items-center text-sm tracking-widest uppercase border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors">
          Explore More →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import ProductCard from './ProductCard.vue'
import { fetchCatalog } from '../services/catalog'
import { useInfiniteScrollPagination } from '../composables/useInfiniteScrollPagination'

const products = ref([])
const loading = ref(true)
const error = ref(null)

// Sample fallback products
const sampleProducts = [
  {
    id: 1,
    title: 'FAITH TACTICAL JACKET',
    priceRange: { minVariantPrice: { amount: '189.00', currencyCode: 'USD' } },
    handle: 'faith-tactical-jacket',
    tags: ['FAITH'],
    images: []
  },
  {
    id: 2,
    title: 'PURPOSE OVERSIZED HOODIE',
    priceRange: { minVariantPrice: { amount: '129.00', currencyCode: 'USD' } },
    handle: 'purpose-oversized-hoodie',
    tags: ['PURPOSE'],
    images: []
  },
  {
    id: 3,
    title: 'IDENTITY TECHWEAR VEST',
    priceRange: { minVariantPrice: { amount: '149.00', currencyCode: 'USD' } },
    handle: 'identity-techwear-vest',
    tags: ['IDENTITY'],
    images: []
  },
  {
    id: 4,
    title: 'BELIEVER UTILITY CARGO',
    priceRange: { minVariantPrice: { amount: '159.00', currencyCode: 'USD' } },
    handle: 'believer-utility-cargo',
    tags: ['FAITH'],
    images: []
  },
  {
    id: 5,
    title: 'COVENANT BASE LAYER',
    priceRange: { minVariantPrice: { amount: '79.00', currencyCode: 'USD' } },
    handle: 'covenant-base-layer',
    tags: ['PURPOSE'],
    images: []
  },
  {
    id: 6,
    title: 'REDEEMED FIELD JACKET',
    priceRange: { minVariantPrice: { amount: '199.00', currencyCode: 'USD' } },
    handle: 'redeemed-field-jacket',
    tags: ['IDENTITY'],
    images: []
  }
]

// Load products from Shopify
const loadProducts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const { products: catalogProducts } = await fetchCatalog()
    products.value = catalogProducts || []
  } catch (err) {
    console.error('Failed to load products:', err)
    error.value = 'Unable to load products'
    products.value = sampleProducts
  } finally {
    loading.value = false
  }
}

// Display products (Shopify or fallback)
const displayProducts = computed(() => {
  return products.value.length > 0 ? products.value : sampleProducts
})

const {
  visibleItems: visibleFeatured,
  hasMore,
  loadingMore,
  sentinelEl,
  supportsObserver,
  reset,
  loadMore
} = useInfiniteScrollPagination(displayProducts, { batchSize: 3 })

onMounted(() => {
  loadProducts()
})

watch(displayProducts, () => reset())
</script>


