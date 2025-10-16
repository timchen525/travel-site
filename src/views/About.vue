<template>
  <div class="about">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-primary-600 to-accent-600">
      <div class="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80" 
          alt="About Us"
          class="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div class="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
          关于我们
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl">
          让每一次旅行都成为难忘的回忆
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">我们的使命</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            探索世界旅游网站致力于为全球旅行者提供最优质、最便捷的旅游服务。我们相信，每一次旅行都是一次心灵的探索，每一个目的地都有独特的故事等待发现。
          </p>
          <p class="text-lg text-gray-700 leading-relaxed">
            通过精心策划的旅游路线和贴心的服务，我们希望能够帮助您发现世界的美好，创造属于自己的独特回忆。
          </p>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">我们的价值观</h2>
          <p class="text-gray-600 text-lg">指导我们前进的核心理念</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="value in values"
            :key="value.id"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="text-5xl mb-4 text-center">{{ value.icon }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">{{ value.title }}</h3>
            <p class="text-gray-600 text-center">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
          <p class="text-gray-600 text-lg">我们的优势让您的旅程更加完美</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="card"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="space-y-2"
          >
            <div class="text-5xl font-bold">{{ stat.value }}</div>
            <div class="text-lg opacity-90">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">我们的团队</h2>
          <p class="text-gray-600 text-lg">专业的旅游顾问为您服务</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div
            v-for="member in team"
            :key="member.id"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="aspect-square bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
              <div class="text-6xl text-white">{{ member.avatar }}</div>
            </div>
            <div class="p-6 text-center">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
              <p class="text-primary-600 font-medium mb-3">{{ member.role }}</p>
              <p class="text-gray-600 text-sm">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-center text-white">
          <h2 class="text-4xl font-bold mb-4">准备开始您的旅程了吗？</h2>
          <p class="text-xl mb-8 opacity-90">
            联系我们的旅游顾问，为您量身定制完美的旅行计划
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/" class="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              浏览目的地
            </router-link>
            <a href="#contact" class="btn-primary bg-accent-500 hover:bg-accent-600 border-0">
              联系我们
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Value {
  id: string
  icon: string
  title: string
  description: string
}

interface Feature {
  id: string
  icon: string
  title: string
  description: string
}

interface Stat {
  id: string
  value: string
  label: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  description: string
}

const values = ref<Value[]>([
  {
    id: '1',
    icon: '🌟',
    title: '专业服务',
    description: '多年旅游行业经验，专业团队为您服务',
  },
  {
    id: '2',
    icon: '💎',
    title: '品质保证',
    description: '精选优质资源，确保每一次旅行都完美无瑕',
  },
  {
    id: '3',
    icon: '🤝',
    title: '用心服务',
    description: '以客户为中心，用心对待每一位旅行者',
  },
  {
    id: '4',
    icon: '🌍',
    title: '全球网络',
    description: '覆盖全球热门目的地，资源丰富多样',
  },
])

const features = ref<Feature[]>([
  {
    id: '1',
    icon: '✈️',
    title: '精选路线',
    description: '每条旅游路线都经过精心策划和实地考察，确保您获得最佳体验。',
  },
  {
    id: '2',
    icon: '🏨',
    title: '优质住宿',
    description: '精选当地高品质酒店和民宿，让您的住宿体验舒适安心。',
  },
  {
    id: '3',
    icon: '👨‍✈️',
    title: '专业导游',
    description: '经验丰富的当地导游，深入了解每个目的地的文化历史。',
  },
  {
    id: '4',
    icon: '💰',
    title: '透明价格',
    description: '明码标价，无隐藏费用，让您消费明明白白。',
  },
  {
    id: '5',
    icon: '🛡️',
    title: '安全保障',
    description: '完善的旅游保险和应急措施，确保您的旅途安全无虞。',
  },
  {
    id: '6',
    icon: '📞',
    title: '24/7客服',
    description: '全天候客户服务，随时为您解决旅途中的各种问题。',
  },
])

const stats = ref<Stat[]>([
  {
    id: '1',
    value: '50,000+',
    label: '满意客户',
  },
  {
    id: '2',
    value: '200+',
    label: '旅游目的地',
  },
  {
    id: '3',
    value: '4.8/5',
    label: '平均评分',
  },
  {
    id: '4',
    value: '10+',
    label: '年经验',
  },
])

const team = ref<TeamMember[]>([
  {
    id: '1',
    name: '张经理',
    role: '旅游总监',
    avatar: '👨‍💼',
    description: '拥有15年旅游行业经验，专注于打造高品质旅游产品。',
  },
  {
    id: '2',
    name: '李顾问',
    role: '高级旅游顾问',
    avatar: '👩‍💼',
    description: '资深旅游规划师，擅长定制个性化旅游方案。',
  },
  {
    id: '3',
    name: '王专员',
    role: '客户服务经理',
    avatar: '👨‍💻',
    description: '用心服务每一位客户，确保旅行体验完美无瑕。',
  },
])
</script>

<style scoped>
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
