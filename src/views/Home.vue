<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative h-screen">
      <div class="absolute inset-0">
        <img 
          :src="heroImages[currentImageIndex]" 
          alt="Hero Background"
          class="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>
      
      <div class="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          探索世界的美好
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-2xl">
          发现令人惊叹的目的地，创造难忘的回忆
        </p>
        
        <!-- Quick Search -->
        <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="目的地"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800"
            />
            <input
              type="date"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800"
            />
            <input
              type="number"
              placeholder="人数"
              min="1"
              class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800"
            />
            <button class="btn-primary">
              🔍 搜索
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Destinations Section -->
    <section id="destinations" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">热门目的地</h2>
          <p class="text-gray-600 text-lg">精选全球最受欢迎的旅游胜地</p>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              activeFilter === filter
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
          >
            {{ filter }}
          </button>
        </div>

        <!-- Sort -->
        <div class="flex justify-end mb-6">
          <select 
            v-model="sortOption"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="popular">最热门</option>
            <option value="price-low">价格从低到高</option>
            <option value="price-high">价格从高到低</option>
            <option value="rating">评分最高</option>
          </select>
        </div>

        <!-- Destination Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="destination in destinations"
            :key="destination.id"
            class="card cursor-pointer"
            @click="goToBooking(destination.id)"
          >
            <div class="relative h-64 overflow-hidden">
              <img 
                :src="destination.image" 
                :alt="destination.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                <span class="text-yellow-500">⭐</span>
                <span class="font-semibold ml-1">{{ destination.rating }}</span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ destination.name }}</h3>
              <p class="text-gray-600 mb-4">📍 {{ destination.location }}</p>
              <p class="text-gray-700 mb-4 line-clamp-2">{{ destination.shortDescription }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in destination.tags.slice(0, 3)"
                  :key="tag"
                  class="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm"
                >
                  {{ tag }}
                </span>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-3xl font-bold text-primary-600">¥{{ destination.price }}</span>
                  <span class="text-gray-500 text-sm ml-1">/人</span>
                </div>
                <button class="btn-secondary text-sm py-2 px-4">
                  查看详情 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">用户评价</h2>
          <p class="text-gray-600 text-lg">听听旅行者们的真实体验</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="bg-gray-50 rounded-xl p-6 shadow-lg"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 flex items-center justify-center text-white text-xl font-bold">
                {{ review.userName.charAt(0) }}
              </div>
              <div class="ml-4">
                <h4 class="font-semibold text-gray-900">{{ review.userName }}</h4>
                <div class="text-yellow-500">
                  {{ '⭐'.repeat(review.rating) }}
                </div>
              </div>
            </div>
            <p class="text-gray-700 italic">"{{ review.comment }}"</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Destination } from '../types/destination'

const router = useRouter()

// Hero images from Unsplash
const heroImages = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
]

const currentImageIndex = ref(0)
const activeFilter = ref('全部')
const sortOption = ref('popular')

const filters = ['全部', '海滨', '山区', '城市', '自然', '文化']

const destinations = ref<Destination[]>([
  {
    id: '1',
    name: '马尔代夫',
    location: '印度洋',
    description: '世界顶级海岛度假胜地',
    shortDescription: '碧海蓝天，白沙滩，奢华水上别墅，完美的蜜月之地',
    price: 12999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    images: [],
    tags: ['海滨', '度假', '蜜月'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [],
  },
  {
    id: '2',
    name: '瑞士阿尔卑斯',
    location: '瑞士',
    description: '壮丽的雪山风光',
    shortDescription: '令人叹为观止的雪山景色，滑雪天堂，童话般的小镇',
    price: 15999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    images: [],
    tags: ['山区', '滑雪', '自然'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [],
  },
  {
    id: '3',
    name: '京都',
    location: '日本',
    description: '古都文化之旅',
    shortDescription: '千年古都，传统日式庭院，樱花季节美不胜收',
    price: 5999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    images: [],
    tags: ['文化', '城市', '历史'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [],
  },
  {
    id: '4',
    name: '冰岛',
    location: '北欧',
    description: '冰与火之国',
    shortDescription: '神奇的极光，壮观的冰川，温泉和火山的完美结合',
    price: 18999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80',
    images: [],
    tags: ['自然', '极光', '冒险'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [],
  },
  {
    id: '5',
    name: '巴厘岛',
    location: '印度尼西亚',
    description: '热带天堂',
    shortDescription: '美丽的海滩，丰富的文化，瑜伽和冥想的圣地',
    price: 6999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    images: [],
    tags: ['海滨', '度假', '文化'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [],
  },
  {
    id: '6',
    name: '圣托里尼',
    location: '希腊',
    description: '爱琴海明珠',
    shortDescription: '标志性的蓝白建筑，浪漫的日落，爱琴海的美景',
    price: 13999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    images: [],
    tags: ['海滨', '浪漫', '文化'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [],
  },
])

const reviews = [
  {
    id: '1',
    userName: '张三',
    rating: 5,
    comment: '马尔代夫之旅太棒了！海水清澈见底，酒店服务一流，真是完美的蜜月之旅！',
  },
  {
    id: '2',
    userName: '李四',
    rating: 5,
    comment: '瑞士的雪山美得让人窒息，滑雪体验超赞，强烈推荐！',
  },
  {
    id: '3',
    userName: '王五',
    rating: 4,
    comment: '京都的文化底蕴深厚，寺庙和庭院都很美，下次还想再去！',
  },
]

// Auto-rotate hero images
let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const goToBooking = (id: string) => {
  router.push(`/detail/${id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
