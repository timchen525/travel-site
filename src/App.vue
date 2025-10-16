<template>
  <div id="app" class="min-h-screen">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
</script>
