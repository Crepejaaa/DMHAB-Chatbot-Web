<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">

    <!-- 1. Navbar (เหมือนหน้าอื่นๆ) -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-3">
        <router-link to="/services" class="hover:bg-white/20 p-2 rounded-full transition" :title="$t('serviceDetail.backToServices')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <router-link to="/" class="flex items-center gap-1">
          <div class="w-12 h-12 flex items-center justify-center">
            <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
          </div>
          <span class="text-xl font-bold tracking-wide">{{ $t('common.brand') }}</span>
        </router-link>
      </div>

      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" class="hover:text-[#D1FAE5] transition">{{ $t('nav.home') }}</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition">{{ $t('nav.about') }}</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition">{{ $t('nav.services') }}</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">{{ $t('nav.blog') }}</router-link>
        <AdminNavLink />
      </div>

      <div class="flex gap-3 items-center text-sm">
        <LanguageSwitcher />

        <div class="hidden md:flex items-center gap-2 mr-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" :title="$t('nav.darkModeTitle')">
          <span class="text-xs font-semibold text-white">{{ $t('nav.darkMode') }}</span>
          <button
            @click="isDarkMode = !isDarkMode"
            :class="isDarkMode ? 'bg-white' : 'bg-[#045F54]'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-white/30"
          >
            <span
              :class="isDarkMode ? 'translate-x-4 bg-[#1E293B]' : 'translate-x-1 bg-white'"
              class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
            ></span>
          </button>
        </div>

        <ProfileMenu />
      </div>
    </nav>

    <!-- 2. Hero Banner -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-16 px-6 lg:px-12 relative overflow-hidden">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>
      <div class="container mx-auto max-w-4xl relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-4xl">🎮</span>
              <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{{ $t('activity.title') }}</h1>
            </div>
            <p class="text-sm md:text-base text-[#D1FAE5] max-w-2xl leading-relaxed">{{ $t('activity.subtitle') }}</p>
          </div>
        </div>
      </div>
    </header>

    <!-- 3. Main Content: เกมจับคู่อารมณ์ -->
    <main class="flex-1 w-full max-w-4xl mx-auto px-6 py-10 -mt-8">
      <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">

        <!-- คำอธิบายวิธีเล่น + สถานะเกม -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <p class="text-sm text-[#64748B]">{{ $t('activity.instructions') }}</p>
          <div class="flex items-center gap-4 text-sm font-semibold text-[#1E293B] shrink-0">
            <span class="bg-[#0D9488]/10 text-[#0D9488] px-3 py-1 rounded-full">{{ $t('activity.movesLabel') }}: {{ moves }}</span>
            <span class="bg-[#0D9488]/10 text-[#0D9488] px-3 py-1 rounded-full">{{ $t('activity.matchedLabel') }}: {{ matchedPairIds.size }}/{{ totalPairs }}</span>
          </div>
        </div>

        <!-- กระดานการ์ด -->
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
          <button
            v-for="(card, index) in cards"
            :key="card.key"
            type="button"
            :disabled="isCardLocked(index)"
            @click="flipCard(index)"
            class="relative aspect-[3/4] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition-transform duration-300"
            :class="isFaceUp(index) ? '' : 'hover:-translate-y-0.5'"
          >
            <!-- ด้านหลังการ์ด (คว่ำ) -->
            <div
              v-if="!isFaceUp(index)"
              class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#059669] shadow-md flex items-center justify-center text-white text-2xl"
            >
              🧠
            </div>
            <!-- ด้านหน้าการ์ด (เปิด) -->
            <div
              v-else
              class="absolute inset-0 rounded-2xl border-2 flex items-center justify-center text-center p-2 text-xs sm:text-sm font-semibold leading-snug shadow-md"
              :class="matchedPairIds.has(card.pairId)
                ? 'bg-[#D1FAE5] border-[#059669] text-[#045F54]'
                : 'bg-white border-[#0D9488] text-[#1E293B]'"
            >
              {{ card.label }}
            </div>
          </button>
        </div>
      </div>
    </main>

    <!-- 4. Footer (เหมือนหน้าอื่นๆ) -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">{{ $t('common.brand') }}</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">{{ $t('common.footerDesc') }}</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('services.title') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><router-link to="/services" class="hover:underline">{{ $t('common.footerService1') }}</router-link></li>
            <li><router-link to="/services" class="hover:underline">{{ $t('common.footerService2') }}</router-link></li>
            <li><router-link to="/blog" class="hover:underline">{{ $t('common.footerService3') }}</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerContact') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ PhuenJaiZone@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">{{ $t('common.footerHotline') }}</router-link>
          <p class="text-xs text-[#D1FAE5]">{{ $t('common.hotlineText') }}</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        {{ $t('common.copyright') }}
      </div>
    </footer>

    <!-- 5. Popup เมื่อเล่นจบ -->
    <div
      v-if="isComplete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 sm:p-7 text-center border-t-4 border-[#059669] modal-surface">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] mb-4 text-3xl">
          🎉
        </div>
        <h3 class="text-lg sm:text-xl font-extrabold text-[#1E293B] mb-2">
          {{ $t('activity.completeTitle') }}
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {{ goToAssessmentNext ? $t('activity.completeDescNext') : $t('activity.completeDescDefault') }}
        </p>

        <div v-if="!goToAssessmentNext" class="flex flex-col sm:flex-row gap-3">
          <router-link
            to="/services"
            class="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors text-center"
          >
            {{ $t('activity.backToServices') }}
          </router-link>
          <button
            type="button"
            @click="resetGame"
            class="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#045F54] to-[#0D9488] hover:from-[#0D9488] hover:to-[#059669] text-white text-sm font-semibold shadow-md transition-all"
          >
            {{ $t('activity.playAgain') }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { inject, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProfileMenu from '../components/ProfileMenu.vue'
import AdminNavLink from '../components/AdminNavLink.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isDarkMode = inject('isDarkMode', false)

// ถ้ามาจากปุ่ม "เริ่มต้นใช้งาน" หน้าแรก (?next=assessment) ให้พาไปหน้าแบบประเมินอัตโนมัติเมื่อเล่นจบ
const goToAssessmentNext = computed(() => route.query.next === 'assessment')

// รายการคู่การ์ด (คำอารมณ์ <-> สถานการณ์) ดึงจากไฟล์ภาษา
const pairDefs = computed(() => {
  const pairs = t('activity.pairs', {}, { returnObjects: true })
  return Object.keys(pairs).map((pairId) => ({ pairId, ...pairs[pairId] }))
})
const totalPairs = computed(() => pairDefs.value.length)

const cards = ref([])
const flippedIndexes = ref([])
const matchedPairIds = ref(new Set())
const moves = ref(0)
const isLocked = ref(false)
let autoRedirectTimer = null

const shuffle = (arr) => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const buildCards = () => {
  const raw = pairDefs.value.flatMap((pair) => ([
    { key: pair.pairId + '-emotion', pairId: pair.pairId, label: pair.emotion },
    { key: pair.pairId + '-situation', pairId: pair.pairId, label: pair.situation }
  ]))
  cards.value = shuffle(raw)
}

const isFaceUp = (index) => flippedIndexes.value.includes(index) || matchedPairIds.value.has(cards.value[index]?.pairId)
const isCardLocked = (index) => isFaceUp(index) || isLocked.value

const flipCard = (index) => {
  if (isCardLocked(index) || isComplete.value) return

  flippedIndexes.value.push(index)

  if (flippedIndexes.value.length === 2) {
    moves.value++
    isLocked.value = true
    const [firstIdx, secondIdx] = flippedIndexes.value
    const isMatch = cards.value[firstIdx].pairId === cards.value[secondIdx].pairId

    if (isMatch) {
      matchedPairIds.value.add(cards.value[firstIdx].pairId)
      matchedPairIds.value = new Set(matchedPairIds.value)
      flippedIndexes.value = []
      isLocked.value = false
    } else {
      setTimeout(() => {
        flippedIndexes.value = []
        isLocked.value = false
      }, 800)
    }
  }
}

const isComplete = computed(() => totalPairs.value > 0 && matchedPairIds.value.size === totalPairs.value)

const resetGame = () => {
  flippedIndexes.value = []
  matchedPairIds.value = new Set()
  moves.value = 0
  isLocked.value = false
  buildCards()
}

onMounted(() => {
  buildCards()
})

// เมื่อเล่นจบและมาจากหน้าแรก ให้หน่วงเวลาสั้นๆ แล้วพาไปหน้าแบบประเมินอัตโนมัติ
const watchForAutoRedirect = () => {
  if (isComplete.value && goToAssessmentNext.value && !autoRedirectTimer) {
    autoRedirectTimer = setTimeout(() => {
      router.push('/assessment')
    }, 1800)
  }
}

watch(isComplete, () => {
  watchForAutoRedirect()
})

onUnmounted(() => {
  if (autoRedirectTimer) clearTimeout(autoRedirectTimer)
})
</script>