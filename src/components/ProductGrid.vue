<template>
  <section id="shop" class="py-32 bg-deep-black">
    <div class="max-w-7xl mx-auto px-6">
      <!-- About Section -->
      <div id="about" class="mb-32 max-w-5xl mx-auto scroll-mt-24">
        <div class="text-xs tracking-widest mb-4 text-gray-500 uppercase">/ About</div>
        <h2 class="text-4xl md:text-6xl font-black editorial-spacing mb-6">
          MAXIMAL → GRAND_
        </h2>
        <p class="text-sm md:text-base text-gray-300 leading-relaxed tracking-wide max-w-3xl">
          WHOM.CLOTHING is scripture-first graphic design: disciplined maximalism, editorial spacing, and bold marks
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
              Maximal geometry—built to read from a distance.
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

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex flex-wrap items-center justify-between gap-6 mb-10">
        <div class="text-xs tracking-widest uppercase text-gray-600">
          Page {{ page }} of {{ totalPages }}
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="prevPage"
            :disabled="page <= 1 || paging"
            class="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            Prev
          </button>
          <button
            type="button"
            @click="nextPage"
            :disabled="page >= totalPages || paging"
            class="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
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
import { ref, onMounted, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { fetchCatalog } from '../services/catalog'

const PAGE_SIZE = 4

const products = ref([]) // current page (server mode) or full sample list (fallback)
const serverTotal = ref(0)
const loading = ref(true)
const error = ref(null)
const paging = ref(false)
const page = ref(1)
const useFallback = ref(false)

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

function clampPage(p) {
  const n = Number.parseInt(String(p ?? ''), 10)
  return Number.isFinite(n) && n > 0 ? n : 1
}

const total = computed(() => {
  return useFallback.value ? sampleProducts.length : serverTotal.value
})

const totalPages = computed(() => {
  const t = total.value
  return t > 0 ? Math.ceil(t / PAGE_SIZE) : 1
})

const visibleFeatured = computed(() => {
  if (useFallback.value) {
    const start = (page.value - 1) * PAGE_SIZE
    return sampleProducts.slice(start, start + PAGE_SIZE)
  }
  return products.value || []
})

async function loadPage(p) {
  const target = clampPage(p)

  // Local pagination for fallback mode
  if (useFallback.value) {
    page.value = Math.min(target, totalPages.value)
    return
  }

  const offset = (target - 1) * PAGE_SIZE
  paging.value = true
  error.value = null
  try {
    const payload = await fetchCatalog({ limit: PAGE_SIZE, offset })
    products.value = payload?.products || []
    serverTotal.value = Number.parseInt(String(payload?.meta?.filtered_total ?? payload?.meta?.returned ?? '0'), 10) || 0

    // If user paged past end (e.g., catalog shrank), snap back.
    const maxPage = totalPages.value
    page.value = Math.min(target, maxPage)
    if (products.value.length === 0 && page.value > 1) {
      await loadPage(page.value - 1)
      return
    }
  } catch (err) {
    console.error('Failed to load products:', err)
    error.value = 'Unable to load products'
    useFallback.value = true
    page.value = 1
  } finally {
    paging.value = false
  }
}

const nextPage = () => loadPage(page.value + 1)
const prevPage = () => loadPage(page.value - 1)

// Initial load (page 1)
const loadInitial = async () => {
  loading.value = true
  error.value = null
  useFallback.value = false
  serverTotal.value = 0
  products.value = []
  page.value = 1

  try {
    const payload = await fetchCatalog({ limit: PAGE_SIZE, offset: 0 })
    products.value = payload?.products || []
    serverTotal.value = Number.parseInt(String(payload?.meta?.filtered_total ?? payload?.meta?.returned ?? '0'), 10) || 0
  } catch (err) {
    console.error('Failed to load products:', err)
    error.value = 'Unable to load products'
    useFallback.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadInitial()
})
</script>


