<template>
  <main id="top" class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ COLLECTIONS</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          SHOP BY COLLECTION_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed max-w-3xl">
          Explore the WHOM collections. Each tag is a lane; each piece is a statement.
        </p>
      </div>
    </section>

    <section class="py-20 bg-deep-black">
      <div class="max-w-7xl mx-auto px-6">
        <div v-if="loading" class="text-center py-20">
          <div class="text-gray-400 text-sm tracking-widest uppercase">Loading collections...</div>
        </div>

        <div v-else class="space-y-16">
          <!-- Error banner (still render page with fallback products) -->
          <div v-if="error" class="border border-stone-gray bg-black/30 px-6 py-4">
            <div class="text-xs tracking-widest uppercase text-gray-500 mb-1">/ Notice</div>
            <div class="text-sm text-gray-300">{{ error }}</div>
            <div class="text-xs text-gray-600 mt-1">Showing fallback products.</div>
          </div>

          <!-- Controls -->
          <div class="border border-stone-gray bg-black/30 p-6">
            <div class="grid lg:grid-cols-12 gap-4 items-end">
              <div class="lg:col-span-6">
                <label class="block text-xs tracking-widest uppercase text-gray-500 mb-2">Search</label>
                <input
                  v-model="searchText"
                  type="text"
                  placeholder="Search collections or products..."
                  class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide text-white placeholder:text-gray-600 focus:outline-none focus:border-white"
                />
              </div>

              <div class="lg:col-span-3">
                <label class="block text-xs tracking-widest uppercase text-gray-500 mb-2">Sort collections</label>
                <select
                  v-model="collectionSortKey"
                  class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide text-white focus:outline-none focus:border-white"
                >
                  <option value="featured">Featured</option>
                  <option value="count_desc">Most items</option>
                  <option value="count_asc">Least items</option>
                  <option value="name_asc">Name (A–Z)</option>
                  <option value="name_desc">Name (Z–A)</option>
                </select>
              </div>

              <div class="lg:col-span-3">
                <label class="block text-xs tracking-widest uppercase text-gray-500 mb-2">Sort products</label>
                <select
                  v-model="productSortKey"
                  class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide text-white focus:outline-none focus:border-white"
                >
                  <option value="default">Default</option>
                  <option value="price_asc">Price (low → high)</option>
                  <option value="price_desc">Price (high → low)</option>
                  <option value="name_asc">Name (A–Z)</option>
                  <option value="name_desc">Name (Z–A)</option>
                </select>
              </div>

              <div class="lg:col-span-12 pt-2 flex flex-wrap items-center gap-6">
                <label class="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-gray-400">
                  <input v-model="hideEmptyCollections" type="checkbox" class="accent-white" />
                  Hide empty collections
                </label>
                <div class="text-xs tracking-widest uppercase text-gray-500">
                  {{ filteredProductsAll.length }} items matched
                </div>
              </div>
            </div>
          </div>

          <!-- Collections overview -->
          <section class="space-y-8">
            <div class="flex items-end justify-between gap-6">
              <div>
                <div class="text-xs tracking-widest text-gray-500">/ OVERVIEW</div>
                <h2 class="text-2xl md:text-3xl font-black editorial-spacing mt-2">ALL COLLECTIONS</h2>
              </div>
              <div class="text-xs tracking-widest uppercase text-gray-500">
                {{ visibleCollections.length }} shown
              </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                v-for="c in visibleCollections"
                :key="c.id"
                :href="`#${c.id}`"
                class="border border-stone-gray bg-black/30 p-6 hover:border-white transition-colors"
              >
                <div class="text-xs tracking-widest text-gray-500">/ COLLECTION</div>
                <div class="mt-3 text-lg font-black tracking-wider uppercase">{{ c.title }}</div>
                <div class="mt-2 text-xs text-gray-400 leading-relaxed">
                  {{ c.description }}
                </div>
                <div class="mt-4 flex items-center justify-between text-xs tracking-widest uppercase text-gray-500">
                  <span>{{ c.count }} items</span>
                  <span>View →</span>
                </div>
              </a>
            </div>
          </section>

          <!-- FAITH / PURPOSE / IDENTITY -->
          <section
            v-for="c in nonWhomCollections"
            :key="c.id"
            :id="c.id"
            class="border-t border-stone-gray pt-12 scroll-mt-24"
          >
            <div class="flex items-end justify-between gap-6 mb-10">
              <div>
                <div class="text-xs tracking-widest text-gray-500">/ COLLECTION</div>
                <h2 class="text-2xl md:text-3xl font-black editorial-spacing mt-2">{{ c.title }}</h2>
                <p class="text-sm text-gray-400 tracking-wide leading-relaxed mt-3 max-w-3xl">
                  {{ c.description }}
                </p>
              </div>
              <a href="#top" class="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
                Top ↑
              </a>
            </div>

            <div v-if="c.filteredProducts.length === 0" class="text-gray-500 text-sm">
              No products matched your filters.
            </div>
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductCard
                v-for="(product, index) in c.filteredProducts"
                :key="product.id"
                :product="product"
                :index="index"
              />
            </div>
          </section>

          <!-- WHOM SIGNATURES (verse index + products, filterable) -->
          <WhomSignaturesSection
            :catalog-products="products"
            :filter-text="searchText"
            :sort-key="productSortKey"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCatalog } from '../services/catalog'
import ProductCard from '../components/ProductCard.vue'
import WhomSignaturesSection from '../components/WhomSignaturesSection.vue'

const route = useRoute()

const loading = ref(true)
const error = ref(null)
const products = ref([])

const searchText = ref('')
const hideEmptyCollections = ref(false)
const collectionSortKey = ref('featured')
const productSortKey = ref('default')

const COLLECTIONS = [
  {
    id: 'faith',
    key: 'FAITH',
    title: 'FAITH',
    description: 'Believe without seeing. Pieces rooted in trust and built for the walk.'
  },
  {
    id: 'purpose',
    key: 'PURPOSE',
    title: 'PURPOSE',
    description: 'Intentional design for intentional living. Direction, discipline, and mission.'
  },
  {
    id: 'identity',
    key: 'IDENTITY',
    title: 'IDENTITY',
    description: 'Know who you are in Christ. Transformation, renewal, and belonging.'
  },
  {
    id: 'whom-signatures',
    key: 'WHOM SIGNATURES',
    title: 'WHOM SIGNATURES',
    description: 'Scripture-indexed marks. Minimal statements built from the “whom” thread.'
  }
]

// Sample fallback products (used when /api/catalog is unavailable in dev)
const sampleProducts = [
  {
    id: 'sample-1',
    title: 'FAITH TACTICAL JACKET',
    description: '',
    priceRange: { minVariantPrice: { amount: '189.00', currencyCode: 'USD' } },
    handle: 'faith-tactical-jacket',
    tags: ['FAITH'],
    images: []
  },
  {
    id: 'sample-2',
    title: 'PURPOSE OVERSIZED HOODIE',
    description: '',
    priceRange: { minVariantPrice: { amount: '129.00', currencyCode: 'USD' } },
    handle: 'purpose-oversized-hoodie',
    tags: ['PURPOSE'],
    images: []
  },
  {
    id: 'sample-3',
    title: 'IDENTITY TECHWEAR VEST',
    description: '',
    priceRange: { minVariantPrice: { amount: '149.00', currencyCode: 'USD' } },
    handle: 'identity-techwear-vest',
    tags: ['IDENTITY'],
    images: []
  },
  {
    id: 'sample-4',
    title: 'WHM- JOHN 8:54-55',
    description: 'WHOM SIGNATURES. John 8:54–55. Minimal mark, eternal meaning.',
    priceRange: { minVariantPrice: { amount: '49.00', currencyCode: 'USD' } },
    handle: 'whm-john-8-54-55',
    tags: ['WHOM SIGNATURES'],
    images: []
  }
]

function productPrice(p) {
  const amount = Number.parseFloat(p?.priceRange?.minVariantPrice?.amount)
  return Number.isFinite(amount) ? amount : 0
}

function inferredTags(p) {
  const title = String(p?.title || '').toUpperCase()
  const tags = [...(p?.tags || [])].map(t => String(t || ''))
  const set = new Set(tags.map(t => t.toUpperCase()))

  if (!set.has('FAITH') && /\bFAITH\b/.test(title)) set.add('FAITH')
  if (!set.has('PURPOSE') && /\bPURPOSE\b/.test(title)) set.add('PURPOSE')
  if (!set.has('IDENTITY') && /\bIDENTITY\b/.test(title)) set.add('IDENTITY')
  if (!set.has('WHOM SIGNATURES') && (title.startsWith('WHM-') || title.startsWith('WHM '))) set.add('WHOM SIGNATURES')

  return [...set]
}

function normalizeForSearch(input) {
  return String(input || '')
    .toUpperCase()
    .replace(/[–—−]/g, '-') // normalize unicode dashes
    .replace(/[^A-Z0-9]+/g, '') // drop punctuation/spaces
}

function queryTokens(q) {
  const raw = String(q || '')
    .toUpperCase()
    .replace(/[–—−]/g, '-')
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim()
  if (!raw) return []
  return raw.split(/\s+/).filter(Boolean).map(t => normalizeForSearch(t)).filter(Boolean)
}

function matchesText(p, q) {
  const tokens = queryTokens(q)
  if (!tokens.length) return true
  const hay = normalizeForSearch([
    p?.title,
    p?.description,
    ...(inferredTags(p) || [])
  ]
    .join(' '))
  return tokens.every(t => hay.includes(t))
}

function sortProducts(list, sortKey) {
  const key = String(sortKey || 'default')
  const out = [...(list || [])]
  if (key === 'name_asc') out.sort((a, b) => String(a?.title || '').localeCompare(String(b?.title || '')))
  else if (key === 'name_desc') out.sort((a, b) => String(b?.title || '').localeCompare(String(a?.title || '')))
  else if (key === 'price_asc') out.sort((a, b) => productPrice(a) - productPrice(b))
  else if (key === 'price_desc') out.sort((a, b) => productPrice(b) - productPrice(a))
  return out
}

function sortCollections(list, sortKey) {
  const key = String(sortKey || 'featured')
  const out = [...(list || [])]
  if (key === 'name_asc') out.sort((a, b) => a.title.localeCompare(b.title))
  else if (key === 'name_desc') out.sort((a, b) => b.title.localeCompare(a.title))
  else if (key === 'count_asc') out.sort((a, b) => a.count - b.count)
  else if (key === 'count_desc') out.sort((a, b) => b.count - a.count)
  // featured keeps declared order
  return out
}

function productsInCollection(key) {
  const k = String(key || '').toUpperCase()
  return (products.value || []).filter(p => {
    const tags = inferredTags(p)
    return tags.some(t => String(t).toUpperCase() === k)
  })
}

const filteredProductsAll = computed(() => {
  const q = searchText.value
  const base = products.value || []
  return sortProducts(base.filter(p => matchesText(p, q)), productSortKey.value)
})

const collectionsWithCounts = computed(() => {
  const q = searchText.value
  return COLLECTIONS.map(c => {
    const inCollection = productsInCollection(c.key)
    const count = inCollection.length
    const filtered = sortProducts(inCollection.filter(p => matchesText(p, q)), productSortKey.value)
    return { ...c, count, filteredProducts: filtered }
  })
})

const visibleCollections = computed(() => {
  const q = normalizeForSearch(searchText.value)
  const base = collectionsWithCounts.value
    .filter(c => (hideEmptyCollections.value ? c.count > 0 : true))
    .filter(c => {
      // When searching, only show collections with matching products
      if (q) return (c.filteredProducts || []).length > 0
      return true
    })

  return sortCollections(base, collectionSortKey.value)
})

const nonWhomCollections = computed(() => {
  return visibleCollections.value
    .filter(c => c.key.toUpperCase() !== 'WHOM SIGNATURES')
    .map(c => ({
      ...c,
      filteredProducts: c.filteredProducts
    }))
})

const load = async () => {
  loading.value = true
  error.value = null
  try {
    const { products: catalogProducts } = await fetchCatalog()
    products.value = catalogProducts || []
  } catch (e) {
    error.value = e?.message || 'Unable to load catalog'
    products.value = sampleProducts
  } finally {
    loading.value = false
  }
}

function applyQuerySearch(q) {
  const v = String(q || '').trim()
  if (v) searchText.value = v
}

onMounted(() => {
  applyQuerySearch(route?.query?.q)
  load()
})

watch(
  () => route?.query?.q,
  q => applyQuerySearch(q)
)
</script>

