<template>
  <div
    :class="[
      'topic-picker-page min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-colors duration-300',
      isDarkMode ? 'dark-mode-page' : ''
    ]"
  >
    <!-- Header / Navbar -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          @click="$router.push('/')"
          class="p-2 rounded-full hover:bg-black/15 transition-colors text-white flex items-center justify-center"
          :title="$t('chat.topicPicker.backHome')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <router-link to="/" class="flex items-center gap-2.5">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-emerald-200/50 shrink-0">
            <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-cover" />
          </div>
          <div>
            <span class="text-base sm:text-lg font-bold tracking-wide block leading-tight">PhuenJaiZone</span>
            <span class="text-[11px] text-emerald-100 block leading-tight">{{ $t('chat.botName') }}</span>
          </div>
        </router-link>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          v-if="recentSessionId"
          type="button"
          @click="openRecentHistory"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-black/15 hover:bg-black/25 text-white border border-emerald-200/30 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="hidden sm:inline">{{ $t('chat.topicPicker.historyBtn') }}</span>
          <span class="px-1.5 py-0.5 text-[11px] rounded-full bg-emerald-400/25 text-emerald-50">{{ historyCount }}</span>
        </button>

        <div class="bg-[#045F54] rounded-full">
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Intro Hero -->
      <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-[#045F54] border border-teal-200/80 text-xs sm:text-sm font-semibold mb-4 topic-badge">
          <!-- Line SVG Bot Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m-6 7a6 6 0 0112 0v3a3 3 0 01-3 3H9a3 3 0 01-3-3v-3z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 12v2a2 2 0 002 2M20 12v2a2 2 0 01-2 2M9.5 12.5h.01M14.5 12.5h.01M10 15.5c.6.5 1.3.75 2 .75s1.4-.25 2-.75" />
          </svg>
          <span>{{ $t('chat.topicPicker.badge') }}</span>
        </div>

        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E293B] leading-tight mb-3">
          {{ $t('chat.topicPicker.title') }}
        </h1>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          {{ $t('chat.topicPicker.subtitle') }}
        </p>
      </div>

      <!-- 8 Topic Cards Grid (ไม่มี "เรื่องอื่น ๆ") -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <button
          v-for="topic in topics"
          :key="topic.key"
          type="button"
          @click="selectTopic(topic.key)"
          class="topic-card group text-left bg-white rounded-2xl p-5 border border-teal-100 shadow-sm hover:shadow-lg hover:border-[#0D9488] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2"
        >
          <div>
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-100/70 border border-teal-200/60 flex items-center justify-center text-[#045F54] group-hover:from-[#0D9488] group-hover:to-[#059669] group-hover:text-white transition-all duration-200 mb-4 topic-icon-box">
              <!-- love -->
              <svg v-if="topic.key === 'love'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <!-- study -->
              <svg v-else-if="topic.key === 'study'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <!-- work -->
              <svg v-else-if="topic.key === 'work'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <!-- family -->
              <svg v-else-if="topic.key === 'family'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V19a1 1 0 001 1h12a1 1 0 001-1V9.5" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5l-2.4-2.3a1.6 1.6 0 012.25-2.25L12 12.1l.15-.15a1.6 1.6 0 012.25 2.25L12 16.5z" />
              </svg>
              <!-- money -->
              <svg v-else-if="topic.key === 'money'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h13a2 2 0 012 2v2h-4a2 2 0 000 4h4v4a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11h4v2h-4a1 1 0 010-2z" />
              </svg>
              <!-- friends -->
              <svg v-else-if="topic.key === 'friends'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <!-- self -->
              <svg v-else-if="topic.key === 'self'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 15l.9 2.1 2.1.9-2.1.9L18 21l-.9-2.1-2.1-.9 2.1-.9L18 15z" />
              </svg>
              <!-- sleep -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>

            <h2 class="text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#045F54] transition-colors mb-1.5">
              {{ $t(`chat.topics.${topic.key}.title`) }}
            </h2>
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {{ $t(`chat.topics.${topic.key}.desc`) }}
            </p>
          </div>

          <div class="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0D9488] group-hover:text-[#059669]">
            <span>{{ $t('chat.topicPicker.startHint') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const router = useRouter()
const isDarkMode = inject('isDarkMode', ref(false))

const topics = [
  { key: 'love' },
  { key: 'study' },
  { key: 'work' },
  { key: 'family' },
  { key: 'money' },
  { key: 'friends' },
  { key: 'self' },
  { key: 'sleep' }
]

const recentSessionId = ref(null)
const historyCount = ref(0)

const selectTopic = (topicKey) => {
  router.push({ path: '/chat', query: { topic: topicKey } })
}

const openRecentHistory = () => {
  if (recentSessionId.value) {
    router.push({ path: '/chat', query: { sessionId: String(recentSessionId.value), history: '1' } })
  }
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/login')
      return
    }
    const res = await axios.get('/api/chat/sessions/history')
    const list = res.data?.sessions || []
    historyCount.value = list.length
    if (list.length > 0) {
      recentSessionId.value = list[0].id
    }
  } catch (err) {
    console.warn('Could not preload session count:', err)
  }
})
</script>

<style scoped>
.dark-mode-page .topic-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
}
.dark-mode-page .topic-card:hover {
  border-color: #14b8a6 !important;
}
.dark-mode-page .topic-card p {
  color: #94a3b8 !important;
}
.dark-mode-page .topic-card h2 {
  color: #f1f5f9 !important;
}
.dark-mode-page .topic-badge {
  background-color: #134e4a !important;
  color: #ccfbf1 !important;
  border-color: #0f766e !important;
}
.dark-mode-page .topic-icon-box {
  background: #134e4a !important;
  color: #5eead4 !important;
  border-color: #0f766e !important;
}
</style>
