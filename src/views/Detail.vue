<template>
  <div class="detail-page bg-gray-50">
    <!-- Back Button -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <button 
          @click="router.back()"
          class="flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          ← 返回
        </button>
      </div>
    </div>

    <!-- Hero Image Section -->
    <section class="relative h-96">
      <img 
        :src="destination.image" 
        :alt="destination.name"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="container mx-auto">
          <h1 class="text-5xl font-bold text-white mb-3 drop-shadow-lg">{{ destination.name }}</h1>
          <p class="text-2xl text-white/95 mb-4 drop-shadow">📍 {{ destination.location }}</p>
          <div class="flex items-center gap-4">
            <div class="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span class="text-yellow-500 text-xl">⭐</span>
              <span class="font-bold text-gray-900 ml-2 text-lg">{{ destination.rating }}</span>
              <span class="text-gray-600 ml-1">({{ destination.reviews?.length || 0 }} 评价)</span>
            </div>
            <div class="bg-primary-600/90 backdrop-blur-sm px-6 py-2 rounded-full">
              <span class="text-white font-bold text-xl">¥{{ destination.price.toLocaleString() }}</span>
              <span class="text-white/90 ml-1">起/人</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">目的地简介</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-6">{{ destination.description }}</p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tag in destination.tags"
                :key="tag"
                class="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 rounded-full font-medium"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Highlights -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">🌟 行程亮点</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li 
                v-for="(highlight, index) in highlights" 
                :key="index" 
                class="flex items-start bg-gradient-to-br from-accent-50 to-white p-4 rounded-xl border border-accent-100"
              >
                <span class="text-accent-500 text-2xl mr-3">✓</span>
                <span class="text-gray-700 text-base">{{ highlight }}</span>
              </li>
            </ul>
          </div>

          <!-- Includes & Excludes -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">💰 费用说明</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="text-accent-500 mr-2">✅</span>
                  费用包含
                </h3>
                <ul class="space-y-3">
                  <li 
                    v-for="(item, index) in includes" 
                    :key="index" 
                    class="flex items-start text-gray-700 bg-accent-50 p-3 rounded-lg"
                  >
                    <span class="text-accent-500 mr-2 mt-1">•</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="text-red-500 mr-2">❌</span>
                  费用不含
                </h3>
                <ul class="space-y-3">
                  <li 
                    v-for="(item, index) in excludes" 
                    :key="index" 
                    class="flex items-start text-gray-700 bg-red-50 p-3 rounded-lg"
                  >
                    <span class="text-red-500 mr-2 mt-1">•</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Itinerary -->
          <div class="bg-white rounded-2xl shadow-lg p-8" v-if="itinerary.length > 0">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">📅 行程安排</h2>
            <div class="space-y-6">
              <div 
                v-for="day in itinerary" 
                :key="day.day"
                class="border-l-4 border-primary-500 pl-6 pb-6 relative"
              >
                <div class="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary-500 border-4 border-white shadow-md"></div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  Day {{ day.day }}: {{ day.title }}
                </h3>
                <p class="text-gray-600 mb-3">{{ day.description }}</p>
                <ul class="space-y-2">
                  <li 
                    v-for="(activity, index) in day.activities" 
                    :key="index"
                    class="flex items-start text-gray-700"
                  >
                    <span class="text-accent-500 mr-2">→</span>
                    {{ activity }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="bg-white rounded-2xl shadow-lg p-8" v-if="destination.reviews && destination.reviews.length > 0">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">💬 用户评价</h2>
            <div class="space-y-6">
              <div
                v-for="review in destination.reviews"
                :key="review.id"
                class="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center">
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
                  <span class="text-gray-500 text-sm">{{ review.date }}</span>
                </div>
                <p class="text-gray-700 italic">"{{ review.comment }}"</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Booking Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            <div class="mb-6">
              <div class="flex items-baseline mb-2">
                <span class="text-4xl font-bold text-primary-600">¥{{ destination.price.toLocaleString() }}</span>
                <span class="text-gray-500 ml-2">/人起</span>
              </div>
              <p class="text-gray-600 text-sm">根据套餐类型和人数变化</p>
            </div>

            <!-- Quick Info -->
            <div class="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div class="flex items-center text-gray-700">
                <span class="text-2xl mr-3">⏰</span>
                <span>建议游玩 5-7 天</span>
              </div>
              <div class="flex items-center text-gray-700">
                <span class="text-2xl mr-3">✈️</span>
                <span>含往返机票</span>
              </div>
              <div class="flex items-center text-gray-700">
                <span class="text-2xl mr-3">🏨</span>
                <span>含酒店住宿</span>
              </div>
              <div class="flex items-center text-gray-700">
                <span class="text-2xl mr-3">🎫</span>
                <span>含景点门票</span>
              </div>
            </div>

            <!-- Book Now Button -->
            <button 
              @click="goToBooking"
              class="w-full btn-primary text-lg py-4 mb-4"
            >
              立即预订
            </button>

            <p class="text-gray-500 text-sm text-center">
              🔒 安全支付 • 可退款
            </p>

            <!-- Contact Info -->
            <div class="mt-6 pt-6 border-t border-gray-200 text-center">
              <p class="text-gray-600 text-sm mb-2">需要帮助？</p>
              <p class="text-primary-600 font-semibold">📞 400-123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Destinations -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">相似推荐</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="related in relatedDestinations"
            :key="related.id"
            class="card cursor-pointer"
            @click="viewDestination(related.id)"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="related.image" 
                :alt="related.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-lg">
                <span class="text-yellow-500 text-sm">⭐</span>
                <span class="font-semibold text-sm ml-1">{{ related.rating }}</span>
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ related.name }}</h3>
              <p class="text-gray-600 mb-3">📍 {{ related.location }}</p>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-2xl font-bold text-primary-600">¥{{ related.price.toLocaleString() }}</span>
                  <span class="text-gray-500 text-sm">/人</span>
                </div>
                <span class="text-primary-600 font-medium">查看 →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Destination, ItineraryDay } from '../types/destination'

const route = useRoute()
const router = useRouter()

// Mock destination data - In a real app, fetch from API based on route.params.id
const destinations: Destination[] = [
  {
    id: '1',
    name: '马尔代夫',
    location: '印度洋',
    description: '马尔代夫是世界顶级的海岛度假胜地，拥有令人惊叹的碧海蓝天、洁白细腻的沙滩和奢华的水上别墅。这里是蜜月旅行的完美选择，也是放松身心的理想之地。在这里，你可以享受潜水、浮潜、冲浪等水上运动，也可以在沙滩上悠闲地晒太阳，享受世界级的SPA服务。',
    shortDescription: '碧海蓝天，白沙滩，奢华水上别墅，完美的蜜月之地',
    price: 12999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
    ],
    tags: ['海滨', '度假', '蜜月', '潜水', '豪华'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [
      {
        id: '1',
        userName: '张三',
        userAvatar: '',
        rating: 5,
        comment: '马尔代夫之旅太棒了！海水清澈见底，酒店服务一流，真是完美的蜜月之旅！',
        date: '2024-01-15',
      },
    ],
  },
  {
    id: '2',
    name: '瑞士阿尔卑斯',
    location: '瑞士',
    description: '瑞士阿尔卑斯山脉以其壮丽的雪山景色而闻名于世，是滑雪爱好者的天堂。这里有童话般的小镇、清澈的湖泊和令人叹为观止的山景。',
    shortDescription: '令人叹为观止的雪山景色，滑雪天堂，童话般的小镇',
    price: 15999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80',
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
    description: '京都是日本的千年古都，拥有丰富的历史文化遗产。传统的日式庭院、古老的寺庙和神社、樱花季节的美景都让人流连忘返。',
    shortDescription: '千年古都，传统日式庭院，樱花季节美不胜收',
    price: 5999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
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
    description: '冰岛被誉为"冰与火之国"，这里有神奇的北极光、壮观的冰川、活跃的火山和舒适的温泉。独特的自然景观让人终生难忘。',
    shortDescription: '神奇的极光，壮观的冰川，温泉和火山的完美结合',
    price: 18999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&q=80',
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
    description: '巴厘岛是印度尼西亚最受欢迎的旅游目的地，拥有美丽的海滩、丰富的文化和独特的宗教氛围。这里也是瑜伽和冥想的圣地。',
    shortDescription: '美丽的海滩，丰富的文化，瑜伽和冥想的圣地',
    price: 6999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
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
    description: '圣托里尼是爱琴海上的一颗明珠，以其标志性的蓝白建筑、浪漫的日落和迷人的海景而闻名。这里是情侣度假的理想之地。',
    shortDescription: '标志性的蓝白建筑，浪漫的日落，爱琴海的美景',
    price: 13999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80',
    images: [],
    tags: ['海滨', '浪漫', '文化'],
    highlights: [],
    includes: [],
    excludes: [],
    itinerary: [],
    reviews: [],
  },
]

// Find destination by ID
const destination = computed(() => {
  const id = route.params.id as string
  return destinations.find(d => d.id === id) || destinations[0]
})

// Mock data for highlights, includes, excludes
const highlights = [
  '入住豪华水上别墅，享受私人泳池',
  '浮潜或深潜，探索丰富的海洋生物',
  '享受世界级的水疗服务',
  '品尝新鲜的海鲜和当地美食',
  '观赏壮丽的日出和日落',
  '参加各种水上运动活动',
]

const includes = [
  '往返机票（经济舱）',
  '酒店住宿（含早餐）',
  '机场接送服务',
  '中文导游服务',
  '旅游保险',
]

const excludes = [
  '签证费用',
  '个人消费',
  '午餐和晚餐',
  '小费',
  '额外的旅游活动',
]

const itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: '抵达马尔代夫',
    description: '从国内出发，抵达马尔代夫国际机场，专车接送至酒店',
    activities: [
      '办理入住手续',
      '熟悉酒店环境',
      '海滩散步，欣赏日落',
    ],
  },
  {
    day: 2,
    title: '海岛探索',
    description: '开始精彩的海岛之旅',
    activities: [
      '早餐后浮潜活动',
      '午餐享用海鲜大餐',
      '下午参加水上运动',
      '晚上沙滩BBQ',
    ],
  },
  {
    day: 3,
    title: '自由活动',
    description: '完全自由的一天，可以选择休闲或冒险',
    activities: [
      '可选：深潜体验',
      '可选：SPA按摩',
      '可选：浮潜或冲浪',
      '晚餐和自由活动',
    ],
  },
]

// Related destinations (exclude current one)
const relatedDestinations = computed(() => {
  return destinations.filter(d => d.id !== destination.value.id).slice(0, 3)
})

const goToBooking = () => {
  router.push(`/booking/${destination.value.id}`)
}

const viewDestination = (id: string) => {
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
</style>
