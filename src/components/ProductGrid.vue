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
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <ProductCard 
          v-for="product in products" 
          :key="product.id"
          :product="product"
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
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([
  {
    id: 1,
    name: 'FAITH TACTICAL JACKET',
    price: '$189.00',
    code: '/001',
    collection: 'FAITH'
  },
  {
    id: 2,
    name: 'PURPOSE OVERSIZED HOODIE',
    price: '$129.00',
    code: '/002',
    collection: 'PURPOSE'
  },
  {
    id: 3,
    name: 'IDENTITY TECHWEAR VEST',
    price: '$149.00',
    code: '/003',
    collection: 'IDENTITY'
  },
  {
    id: 4,
    name: 'BELIEVER UTILITY CARGO',
    price: '$159.00',
    code: '/004',
    collection: 'FAITH'
  },
  {
    id: 5,
    name: 'COVENANT BASE LAYER',
    price: '$79.00',
    code: '/005',
    collection: 'PURPOSE'
  },
  {
    id: 6,
    name: 'REDEEMED FIELD JACKET',
    price: '$199.00',
    code: '/006',
    collection: 'IDENTITY'
  }
])
</script>

