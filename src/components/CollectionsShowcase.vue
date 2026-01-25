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
              <div class="aspect-square bg-stone-gray"></div>
            </div>
          </div>
        </div>
        
        <!-- Collection 2: PURPOSE -->
        <div class="collection-item">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2">
              <div class="aspect-square bg-stone-gray"></div>
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
              <div class="aspect-square bg-stone-gray"></div>
            </div>
          </div>
        </div>

        <!-- Collection 4: WHOM SIGNATURES -->
        <div class="collection-item">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2">
              <div class="aspect-square bg-stone-gray"></div>
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
import { RouterLink } from 'vue-router'
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


