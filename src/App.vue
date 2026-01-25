<template>
  <div class="min-h-screen bg-black">
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
</script>


