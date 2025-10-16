<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="text-3xl">🌏</div>
          <span class="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            探索世界
          </span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-primary-500 transition-colors">
            主页
          </router-link>
          <a href="#destinations" class="text-gray-700 hover:text-primary-500 transition-colors">
            目的地
          </a>
          <router-link to="/about" class="text-gray-700 hover:text-primary-500 transition-colors">
            关于我们
          </router-link>
          <a href="#contact" class="text-gray-700 hover:text-primary-500 transition-colors">
            联系我们
          </a>
        </div>

        <!-- Search Bar (Desktop) -->
        <div class="hidden lg:flex items-center">
          <div class="relative">
            <input
              type="text"
              placeholder="搜索目的地..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMenu"
          class="md:hidden text-gray-700 focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden mt-4 pb-4 space-y-3">
        <router-link to="/" class="block text-gray-700 hover:text-primary-500 transition-colors">
          主页
        </router-link>
        <a href="#destinations" class="block text-gray-700 hover:text-primary-500 transition-colors">
          目的地
        </a>
        <router-link to="/about" class="block text-gray-700 hover:text-primary-500 transition-colors">
          关于我们
        </router-link>
        <a href="#contact" class="block text-gray-700 hover:text-primary-500 transition-colors">
          联系我们
        </a>
        <!-- Mobile Search -->
        <div class="relative mt-3">
          <input
            type="text"
            placeholder="搜索目的地..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
