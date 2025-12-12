<template>
  <div class="min-h-screen bg-black">
    <Navigation />
    <HeroSection />
    <CollectionsShowcase />
    <ProductGrid />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
import HeroSection from './components/HeroSection.vue'
import CollectionsShowcase from './components/CollectionsShowcase.vue'
import ProductGrid from './components/ProductGrid.vue'
import Footer from './components/Footer.vue'
</script>

