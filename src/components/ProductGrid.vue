<template>
  <section id="shop" class="py-32 bg-deep-black">
    <div class="max-w-7xl mx-auto px-6">
      <!-- About Section -->
      <div class="mb-32 text-center max-w-4xl mx-auto">
        <div class="text-xs tracking-widest mb-8 text-gray-500">/ WHO ARE WE?</div>
        <p class="text-2xl md:text-3xl text-gray-200 leading-relaxed tracking-wide mb-12">
          OUR DESIGNS ARE INSPIRED BY SCRIPTURE AND MODERN FAITH,
          COMBINED WITH A MINIMALIST, INTENTIONAL AESTHETIC. WHOM.CLOTHING
          MERGES BELIEF AND FASHION TO CREATE APPAREL THAT SPEAKS
          PURPOSE INTO EVERYDAY WEAR.
        </p>
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
          v-for="(product, index) in displayProducts" 
          :key="product.id"
          :product="product"
          :index="index"
        />
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

onMounted(() => {
  loadProducts()
})
</script>


