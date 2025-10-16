<template>
  <div class="booking-page bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <button 
        @click="router.back()"
        class="flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        ← 返回
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Destination Details -->
        <div class="lg:col-span-2">
          <!-- Image Gallery -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div class="relative h-96">
              <img 
                :src="destination.image" 
                :alt="destination.name"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Destination Info -->
          <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div class="flex items-start justify-between mb-6">
              <div>
                <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ destination.name }}</h1>
                <p class="text-xl text-gray-600">📍 {{ destination.location }}</p>
              </div>
              <div class="text-right">
                <div class="flex items-center text-yellow-500 text-2xl mb-2">
                  ⭐ <span class="ml-2 font-bold">{{ destination.rating }}</span>
                </div>
                <p class="text-gray-500 text-sm">优秀评价</p>
              </div>
            </div>

            <p class="text-gray-700 text-lg mb-6">{{ destination.description }}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tag in destination.tags"
                :key="tag"
                class="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 rounded-full font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Highlights -->
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">🌟 行程亮点</h3>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li v-for="(highlight, index) in highlights" :key="index" class="flex items-start">
                  <span class="text-accent-500 mr-2">✓</span>
                  <span class="text-gray-700">{{ highlight }}</span>
                </li>
              </ul>
            </div>

            <!-- Includes & Excludes -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">✅ 费用包含</h4>
                <ul class="space-y-2">
                  <li v-for="(item, index) in includes" :key="index" class="flex items-start text-gray-700">
                    <span class="text-accent-500 mr-2">•</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-3">❌ 费用不含</h4>
                <ul class="space-y-2">
                  <li v-for="(item, index) in excludes" :key="index" class="flex items-start text-gray-700">
                    <span class="text-red-500 mr-2">•</span>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Booking Form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">预订信息</h2>

            <!-- Package Type -->
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">套餐类型</label>
              <select 
                v-model="bookingForm.packageType"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="economy">经济型 - ¥{{ destination.price }}</option>
                <option value="standard">标准型 - ¥{{ destination.price * 1.5 }}</option>
                <option value="luxury">豪华型 - ¥{{ destination.price * 2 }}</option>
              </select>
            </div>

            <!-- Date -->
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">出发日期</label>
              <input
                v-model="bookingForm.departureDate"
                type="date"
                :min="minDate"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <!-- Travelers -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-gray-700 font-medium mb-2">成人</label>
                <input
                  v-model.number="bookingForm.adults"
                  type="number"
                  min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label class="block text-gray-700 font-medium mb-2">儿童</label>
                <input
                  v-model.number="bookingForm.children"
                  type="number"
                  min="0"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <!-- Contact Info -->
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">联系人姓名</label>
              <input
                v-model="bookingForm.contactName"
                type="text"
                placeholder="请输入姓名"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">联系邮箱</label>
              <input
                v-model="bookingForm.contactEmail"
                type="email"
                placeholder="example@email.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">联系电话</label>
              <input
                v-model="bookingForm.contactPhone"
                type="tel"
                placeholder="请输入手机号"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <!-- Special Requests -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">特殊需求（可选）</label>
              <textarea
                v-model="bookingForm.specialRequests"
                rows="3"
                placeholder="请输入您的特殊需求..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>

            <!-- Price Summary -->
            <div class="border-t border-gray-200 pt-4 mb-6">
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">套餐价格</span>
                <span class="font-semibold">¥{{ packagePrice }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">人数</span>
                <span class="font-semibold">{{ totalTravelers }}人</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-primary-600 mt-4">
                <span>总计</span>
                <span>¥{{ totalPrice }}</span>
              </div>
            </div>

            <!-- Book Button -->
            <button 
              @click="handleBooking"
              class="w-full btn-primary text-lg"
            >
              立即预订
            </button>

            <p class="text-gray-500 text-sm text-center mt-4">
              🔒 安全支付 • 可退款政策
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Destination } from '../types/destination'
import type { BookingForm } from '../types/booking'

const route = useRoute()
const router = useRouter()

// Mock destination data (in real app, fetch from API)
const destination = ref<Destination>({
  id: route.params.id as string,
  name: '马尔代夫',
  location: '印度洋',
  description: '马尔代夫是世界顶级的海岛度假胜地，拥有令人惊叹的碧海蓝天、洁白细腻的沙滩和奢华的水上别墅。这里是蜜月旅行的完美选择，也是放松身心的理想之地。',
  shortDescription: '',
  price: 12999,
  rating: 4.9,
  image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
  images: [],
  tags: ['海滨', '度假', '蜜月', '潜水', '豪华'],
  highlights: [],
  includes: [],
  excludes: [],
  itinerary: [],
  reviews: [],
})

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

const bookingForm = ref<BookingForm>({
  travelers: [],
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  country: '',
  destinationId: route.params.id as string,
  packageType: 'economy',
  departureDate: '',
  adults: 2,
  children: 0,
  specialRequests: '',
})

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const packagePrice = computed(() => {
  const multipliers = {
    economy: 1,
    standard: 1.5,
    luxury: 2,
  }
  return Math.round(destination.value.price * multipliers[bookingForm.value.packageType])
})

const totalTravelers = computed(() => {
  return bookingForm.value.adults + bookingForm.value.children
})

const totalPrice = computed(() => {
  return packagePrice.value * totalTravelers.value
})

const handleBooking = () => {
  // Validate form
  if (!bookingForm.value.contactName || !bookingForm.value.contactEmail || !bookingForm.value.contactPhone || !bookingForm.value.departureDate) {
    alert('请填写所有必填信息')
    return
  }

  // In real app, send to API
  alert(`预订成功！\n目的地: ${destination.value.name}\n出发日期: ${bookingForm.value.departureDate}\n总价: ¥${totalPrice.value}`)
  
  // Redirect to home or confirmation page
  router.push('/')
}
</script>
