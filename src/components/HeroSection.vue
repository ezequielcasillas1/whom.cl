<template>
  <section class="relative min-h-screen flex items-center justify-center pt-20">
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black via-deep-black to-black opacity-90"></div>
    
    <!-- Content -->
    <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
      <div class="mb-8">
        <h1 class="text-7xl md:text-9xl font-black mb-6 editorial-spacing leading-none">
          /FAITH MEETS
          <br />
          FUNCTION
        </h1>
      </div>
      
      <div class="max-w-3xl mx-auto mb-12">
        <p class="text-lg md:text-xl text-gray-300 tracking-wide leading-relaxed uppercase">
          Modern apparel designed for believers who walk with purpose.
          <br />
          Intentional. Minimal. Bold.
        </p>
      </div>
      
      <div class="mb-16">
        <a href="#collections" 
           class="inline-block px-12 py-4 border border-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider text-sm font-semibold">
          Explore Collections →
        </a>
      </div>
      
      <div class="text-xs tracking-widest uppercase text-gray-500">
        / Shop by Collections
      </div>
    </div>
    
    <!-- Floating product preview -->
    <div class="absolute bottom-20 right-10 hidden lg:block opacity-20 hover:opacity-100 transition-opacity duration-500">
      <div class="w-64 h-80 bg-stone-gray"></div>
    </div>
  </section>
</template>

<script setup>
</script>

