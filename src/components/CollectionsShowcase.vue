<template>
  <section id="collections" class="py-32 bg-black">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="mb-20">
        <h2 class="text-5xl md:text-7xl font-black mb-6 editorial-spacing">
          NEO FAITH_LIMITED EDITION COLLECTIONS
        </h2>
        <p class="text-sm tracking-widest uppercase text-gray-400">
          / Shop by Collections
        </p>
      </div>
      
      <!-- Collections Grid -->
      <div class="space-y-32">
        <!-- Collection 1: FAITH -->
        <div class="collection-item">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <div class="text-xs tracking-widest mb-4 text-gray-500">/001</div>
              <h3 class="text-6xl font-black mb-6 editorial-spacing">
                FAITH <span class="text-4xl text-gray-600">(12)</span>
              </h3>
              <p class="text-gray-300 tracking-wide leading-relaxed mb-8 max-w-md">
                BELIEVE WITHOUT SEEING. GARMENTS ROOTED IN TRUST, DESIGNED FOR THOSE WHO WALK BY FAITH.
              </p>
              <div class="text-xs text-gray-500 italic mb-6">
                "This is My beloved Son, in whom I am well pleased." — Matthew 3:17
              </div>
              <RouterLink :to="{ path: '/collections', hash: '#faith' }" class="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs">
                View Collection →
              </RouterLink>
            </div>
            <div class="order-1 md:order-2">
              <div class="aspect-square border border-stone-gray bg-black/30 p-4">
                <div v-if="loading" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  Loading…
                </div>
                <div v-else-if="previews.FAITH.length === 0" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  No items
                </div>
                <div v-else class="h-full grid grid-cols-2 gap-3">
                  <RouterLink
                    v-for="p in previews.FAITH"
                    :key="p.id"
                    :to="{ name: 'product', params: { id: String(p.id) } }"
                    class="group relative overflow-hidden border border-stone-gray bg-stone-gray/40"
                  >
                    <img
                      v-if="p._image"
                      :src="p._image"
                      :alt="p.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <span class="text-[10px] tracking-widest uppercase text-gray-600 px-2 text-center">{{ p.title }}</span>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1">
                      <div class="text-[10px] tracking-widest uppercase text-white/80 truncate">{{ p.title }}</div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Collection 2: PURPOSE -->
        <div class="collection-item">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2">
              <div class="aspect-square border border-stone-gray bg-black/30 p-4">
                <div v-if="loading" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  Loading…
                </div>
                <div v-else-if="previews.PURPOSE.length === 0" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  No items
                </div>
                <div v-else class="h-full grid grid-cols-2 gap-3">
                  <RouterLink
                    v-for="p in previews.PURPOSE"
                    :key="p.id"
                    :to="{ name: 'product', params: { id: String(p.id) } }"
                    class="group relative overflow-hidden border border-stone-gray bg-stone-gray/40"
                  >
                    <img
                      v-if="p._image"
                      :src="p._image"
                      :alt="p.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <span class="text-[10px] tracking-widest uppercase text-gray-600 px-2 text-center">{{ p.title }}</span>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1">
                      <div class="text-[10px] tracking-widest uppercase text-white/80 truncate">{{ p.title }}</div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="order-1">
              <div class="text-xs tracking-widest mb-4 text-gray-500">/002</div>
              <h3 class="text-6xl font-black mb-6 editorial-spacing">
                PURPOSE <span class="text-4xl text-gray-600">(8)</span>
              </h3>
              <p class="text-gray-300 tracking-wide leading-relaxed mb-8 max-w-md">
                INTENTIONAL DESIGN FOR INTENTIONAL LIVING. BUILT FOR BELIEVERS WHO MOVE WITH DIRECTION.
              </p>
              <div class="text-xs text-gray-500 italic mb-6">
                "Whom I shall send to you from the Father" — John 15:26
              </div>
              <RouterLink :to="{ path: '/collections', hash: '#purpose' }" class="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs">
                View Collection →
              </RouterLink>
            </div>
          </div>
        </div>
        
        <!-- Collection 3: IDENTITY -->
        <div class="collection-item">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <div class="text-xs tracking-widest mb-4 text-gray-500">/003</div>
              <h3 class="text-6xl font-black mb-6 editorial-spacing">
                IDENTITY <span class="text-4xl text-gray-600">(10)</span>
              </h3>
              <p class="text-gray-300 tracking-wide leading-relaxed mb-8 max-w-md">
                KNOW WHO YOU ARE IN CHRIST. APPAREL THAT REFLECTS TRANSFORMATION AND RENEWAL.
              </p>
              <div class="text-xs text-gray-500 italic mb-6">
                "But whom do you say that I am?" — Matthew 16:15
              </div>
              <RouterLink :to="{ path: '/collections', hash: '#identity' }" class="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs">
                View Collection →
              </RouterLink>
            </div>
            <div class="order-1 md:order-2">
              <div class="aspect-square border border-stone-gray bg-black/30 p-4">
                <div v-if="loading" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  Loading…
                </div>
                <div v-else-if="previews.IDENTITY.length === 0" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  No items
                </div>
                <div v-else class="h-full grid grid-cols-2 gap-3">
                  <RouterLink
                    v-for="p in previews.IDENTITY"
                    :key="p.id"
                    :to="{ name: 'product', params: { id: String(p.id) } }"
                    class="group relative overflow-hidden border border-stone-gray bg-stone-gray/40"
                  >
                    <img
                      v-if="p._image"
                      :src="p._image"
                      :alt="p.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <span class="text-[10px] tracking-widest uppercase text-gray-600 px-2 text-center">{{ p.title }}</span>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1">
                      <div class="text-[10px] tracking-widest uppercase text-white/80 truncate">{{ p.title }}</div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Collection 4: WHOM SIGNATURES -->
        <div class="collection-item">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2">
              <div class="aspect-square border border-stone-gray bg-black/30 p-4">
                <div v-if="loading" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  Loading…
                </div>
                <div v-else-if="previews['WHOM SIGNATURES'].length === 0" class="h-full flex items-center justify-center text-xs tracking-widest uppercase text-gray-500">
                  No items
                </div>
                <div v-else class="h-full grid grid-cols-2 gap-3">
                  <RouterLink
                    v-for="p in previews['WHOM SIGNATURES']"
                    :key="p.id"
                    :to="{ name: 'product', params: { id: String(p.id) } }"
                    class="group relative overflow-hidden border border-stone-gray bg-stone-gray/40"
                  >
                    <img
                      v-if="p._image"
                      :src="p._image"
                      :alt="p.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <span class="text-[10px] tracking-widest uppercase text-gray-600 px-2 text-center">{{ p.title }}</span>
                    </div>
                    <div class="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1">
                      <div class="text-[10px] tracking-widest uppercase text-white/80 truncate">{{ p.title }}</div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="order-1">
              <div class="text-xs tracking-widest mb-4 text-gray-500">/004</div>
              <h3 class="text-6xl font-black mb-6 editorial-spacing">
                WHOM SIGNATURES <span class="text-4xl text-gray-600">(—)</span>
              </h3>
              <p class="text-gray-300 tracking-wide leading-relaxed mb-8 max-w-md">
                LIMITED MARKS. SCRIPTURE-FIRST STATEMENTS. BUILT FOR THOSE WHO WEAR THE WORD WITHOUT COMPROMISE.
              </p>
              <div class="text-xs text-gray-500 italic mb-6">
                "My Father… of whom you say that He is your God." — John 8:54–55
              </div>
              <RouterLink :to="{ path: '/collections', hash: '#whom-signatures' }" class="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs">
                View Collection →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchCatalog } from '../services/catalog'
import { getPrimaryProductImageUrl } from '../services/productImages'

const loading = ref(true)
const products = ref([])

function normalizeTag(t) {
  return String(t ?? '').trim().toUpperCase()
}

function inferredTags(p) {
  const title = String(p?.title || '').toUpperCase()
  const tags = (p?.tags || []).map(normalizeTag).filter(Boolean)
  const set = new Set(tags)

  const isJohn326 =
    /\b(JOHN\s*3\s*:\s*26|JOHN\s*3\s*26|JOHN3\s*:\s*26|JOHN326|3\s*:\s*26|3\s*26)\b/.test(title)

  if (!set.has('FAITH') && /\bFAITH\b/.test(title)) set.add('FAITH')
  if (!set.has('PURPOSE') && /\bPURPOSE\b/.test(title)) set.add('PURPOSE')
  if (!set.has('IDENTITY') && /\bIDENTITY\b/.test(title)) set.add('IDENTITY')

  // Identity naming variants (John 3:16 / JOHN316 / 3:16)
  if (!set.has('IDENTITY')) {
    const identityVerse =
      /\b(JOHN\s*3\s*:\s*16|JOHN\s*3\s*16|JOHN3\s*:\s*16|JOHN316|3\s*:\s*16|3\s*16)\b/
    if (identityVerse.test(title)) set.add('IDENTITY')
  }

  // WHOM signatures by naming convention
  if (!isJohn326 && !set.has('WHOM SIGNATURES') && (title.startsWith('WHM-') || title.startsWith('WHM '))) set.add('WHOM SIGNATURES')
  if (!set.has('WHOM SIGNATURES') && (/\bJOHN\s*8\b/.test(title) || /\bJOHN8\b/.test(title))) set.add('WHOM SIGNATURES')

  return [...set]
}

function productsInCollection(key) {
  const k = String(key || '').toUpperCase()
  return (products.value || []).filter(p => inferredTags(p).some(t => normalizeTag(t) === k))
}

function withPreviewImage(p) {
  return { ...p, _image: getPrimaryProductImageUrl(p) }
}

const previews = computed(() => {
  const keys = ['FAITH', 'PURPOSE', 'IDENTITY', 'WHOM SIGNATURES']
  const out = {}
  for (const k of keys) {
    out[k] = productsInCollection(k).slice(0, 4).map(withPreviewImage)
  }
  return out
})

const load = async () => {
  loading.value = true
  try {
    const { products: catalogProducts } = await fetchCatalog()
    products.value = catalogProducts || []
  } catch (e) {
    // Keep UI clean: show "No items" in preview boxes
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.collection-item {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


