<template>
  <section id="whom-signatures" class="py-32 bg-deep-black border-t border-stone-gray">
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-16">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ WHOM SIGNATURES</div>
        <h2 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          THE WHOM STUDY_
        </h2>
        <p class="text-gray-300 tracking-wide leading-relaxed max-w-3xl">
          WHOM SIGNATURES is our scripture-indexed collection. We trace every “whom” thread
          we can from Old Testament to New Testament—then translate that meaning into a minimal, wearable mark.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 mb-20">
        <div class="space-y-6">
          <h3 class="text-xl font-bold tracking-wide uppercase">What you’re wearing</h3>
          <ul class="space-y-3 text-sm text-gray-300 leading-relaxed">
            <li>
              <span class="text-gray-500">01</span>
              <span class="ml-3">A specific verse reference (rooted in context, not aesthetics).</span>
            </li>
            <li>
              <span class="text-gray-500">02</span>
              <span class="ml-3">A signature mark built from the verse’s “whom” focus (identity, mission, belonging).</span>
            </li>
            <li>
              <span class="text-gray-500">03</span>
              <span class="ml-3">A reminder: the question of “Whom?” always leads back to Christ.</span>
            </li>
          </ul>
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold tracking-wide uppercase">Verse index</h3>
          <p class="text-xs text-gray-500 tracking-wide leading-relaxed">
            Note: “whom” wording varies by translation. This index is curated; use the search link for a full list by your preferred translation.
          </p>

          <div class="grid sm:grid-cols-2 gap-3">
            <div
              v-for="v in verses"
              :key="v.ref"
              class="border border-stone-gray bg-black/30 px-4 py-3"
            >
              <div class="text-xs tracking-widest text-gray-500 uppercase">{{ v.testament }}</div>
              <div class="text-sm font-semibold tracking-wide uppercase mt-1">{{ v.ref }}</div>
              <div class="text-xs text-gray-400 mt-1 leading-snug">
                {{ v.note }}
              </div>
            </div>
          </div>

          <div class="pt-2">
            <a
              :href="allWhomSearchUrl"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center text-xs tracking-widest uppercase border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors"
            >
              View all “whom” results (by translation) →
            </a>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-end justify-between gap-6 mb-10">
          <div>
            <div class="text-xs tracking-widest text-gray-500">/ COLLECTION</div>
            <h3 class="text-2xl md:text-3xl font-black editorial-spacing mt-2">WHOM SIGNATURES</h3>
          </div>
          <a href="#shop" class="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
            Back to Shop ↑
          </a>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="text-gray-400 text-sm tracking-widest uppercase">Loading collection...</div>
        </div>
        <div v-else-if="error" class="text-center py-12">
          <div class="text-gray-400 text-sm mb-2">{{ error }}</div>
          <div class="text-xs text-gray-600">Unable to load WHOM SIGNATURES products</div>
        </div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
            v-for="(product, index) in visibleWhom"
            :key="product.id"
            :product="product"
            :index="index"
          />
        </div>

        <div v-if="whomProducts.length > 3" class="text-xs tracking-widest uppercase text-gray-600 flex items-center justify-between gap-6 mt-10">
          <span>Showing {{ visibleWhom.length }} of {{ whomProducts.length }}</span>
          <span v-if="loadingMore">Loading more…</span>
        </div>

        <div v-if="hasMore" ref="sentinelEl" class="h-10"></div>
        <div v-else-if="whomProducts.length > 3" class="h-2"></div>

        <div v-if="hasMore && !supportsObserver" class="mt-6">
          <button
            type="button"
            @click="loadMore"
            class="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs"
            aria-label="Load more WHOM SIGNATURES products"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ProductCard from './ProductCard.vue'
import { fetchCatalog } from '../services/catalog'
import { useInfiniteScrollPagination } from '../composables/useInfiniteScrollPagination'

const loading = ref(true)
const error = ref(null)
const products = ref([])

const props = defineProps({
  catalogProducts: {
    type: Array,
    default: null
  },
  filterText: {
    type: String,
    default: ''
  },
  sortKey: {
    type: String,
    default: 'default'
  }
})

const verses = [
  { testament: 'OT', ref: 'Isaiah 6:8', note: '“Whom shall I send?” — mission and calling.' },
  { testament: 'OT', ref: 'Zechariah 12:10', note: '“They shall look upon Me whom they have pierced.” — prophecy and recognition.' },
  { testament: 'OT', ref: 'Psalm 2:12', note: '“Blessed are all they that put their trust in Him.” — worship and allegiance.' },
  { testament: 'NT', ref: 'Matthew 16:15', note: '“Whom do you say that I am?” — identity and confession.' },
  { testament: 'NT', ref: 'John 8:54–55', note: '“My Father… of whom you say that He is your God.” — covenant and truth.' },
  { testament: 'NT', ref: 'John 15:26', note: '“Whom I will send to you from the Father.” — Spirit and witness.' },
  { testament: 'NT', ref: 'Hebrews 12:6', note: '“Whom the Lord loveth He chasteneth.” — formation and love.' },
  { testament: 'NT', ref: '1 Peter 2:7', note: '“Unto you… He is precious.” — value and belonging.' }
]

const allWhomSearchUrl =
  'https://www.biblegateway.com/quicksearch/?quicksearch=whom&version=KJV'

function productPrice(p) {
  const amount = Number.parseFloat(p?.priceRange?.minVariantPrice?.amount)
  return Number.isFinite(amount) ? amount : 0
}

function normalizeForSearch(input) {
  return String(input || '')
    .toUpperCase()
    .replace(/[–—−]/g, '-')
    .replace(/[^A-Z0-9]+/g, '')
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
    ...(p?.tags || [])
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

const whomProducts = computed(() => {
  const list = props.catalogProducts || products.value || []
  const base = list.filter(p => {
    const title = String(p?.title || '').toUpperCase()
    const isJohn326 =
      /\b(JOHN\s*3\s*:\s*26|JOHN\s*3\s*26|JOHN3\s*:\s*26|JOHN326|3\s*:\s*26|3\s*26)\b/.test(title)
    const isJohn316 =
      /\b(JOHN\s*3\s*:\s*16|JOHN\s*3\s*16|JOHN3\s*:\s*16|JOHN316|3\s*:\s*16|3\s*16)\b/.test(title)
    if (isJohn326 || isJohn316) return false

    const tags = (p?.tags || []).map(t => String(t ?? '').trim().toUpperCase()).filter(Boolean)
    if (tags.includes('WHOM SIGNATURES')) return true

    // Fallback inference: keep signatures visible even if tags are missing/misaligned
    if (title.startsWith('WHM-') || title.startsWith('WHM ')) return true
    if (/\bJOHN\s*8\b/.test(title) || /\bJOHN8\b/.test(title)) return true
    return false
  })
  const filtered = base.filter(p => matchesText(p, props.filterText))
  return sortProducts(filtered, props.sortKey)
})

const {
  visibleItems: visibleWhom,
  hasMore,
  loadingMore,
  sentinelEl,
  supportsObserver,
  reset,
  loadMore
} = useInfiniteScrollPagination(whomProducts, { batchSize: 3 })

const load = async () => {
  loading.value = true
  error.value = null
  try {
    const { products: catalogProducts } = await fetchCatalog()
    products.value = catalogProducts || []
  } catch (e) {
    error.value = e?.message || 'Unable to load collection'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!props.catalogProducts) load()
  else loading.value = false
})

watch(
  () => [props.filterText, props.sortKey, props.catalogProducts],
  () => reset()
)
</script>

