<template>
  <div class="group cursor-pointer">
    <div class="relative mb-4 overflow-hidden">
      <!-- Product Image Placeholder -->
      <div class="aspect-[3/4] bg-stone-gray group-hover:scale-105 transition-transform duration-500"></div>
      
      <!-- Product Code Overlay -->
      <div class="absolute top-4 left-4 text-xs tracking-widest text-white/70">
        {{ product.code }}
      </div>
    </div>
    
    <div class="space-y-2">
      <div class="text-xs tracking-widest text-gray-500 uppercase">
        {{ product.collection }}
      </div>
      <h3 class="text-sm font-semibold tracking-wide uppercase group-hover:text-gray-400 transition-colors">
        {{ product.name }}
      </h3>
      <p class="text-sm text-gray-400">
        {{ product.price }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

