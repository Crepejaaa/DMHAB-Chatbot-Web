<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500 overflow-x-hidden', isDarkMode ? 'dark-mode-page' : '']">

    <!-- 1. Navbar (เหมือน HomeView) -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
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
        <router-link to="/services" class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.services') }}</router-link>
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
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-20 px-6 lg:px-12 relative overflow-hidden">
      <!-- Background Decorative -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
          <path d="M 0,350 C 150,200 350,500 500,350" fill="none" stroke="currentColor" stroke-width="4"/>
        </svg>
      </div>

      <div class="container mx-auto max-w-5xl relative z-10">


        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-4xl">{{ currentService.icon }}</span>
              <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {{ currentService.title }}
              </h1>
            </div>
            <p class="text-sm md:text-base text-[#D1FAE5] max-w-2xl leading-relaxed">
              {{ currentService.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 3. Main Content -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-6 py-16">

      <!-- Overview Section -->
      <section class="mb-16 scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">{{ $t('serviceDetail.overviewTitle') }}</h2>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <p class="text-[#64748B] leading-relaxed text-base whitespace-pre-line">{{ currentService.overview }}</p>
        </div>
      </section>

      <!-- Features Section -->
      <section class="mb-16 scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">{{ $t('serviceDetail.featuresTitle') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(feature, index) in currentService.features" 
            :key="index"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#0D9488]/30 transition-all duration-300 group"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-[#0D9488]/10 to-[#059669]/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {{ feature.icon }}
              </div>
              <div>
                <h3 class="font-bold text-[#1E293B] text-lg mb-1">{{ feature.title }}</h3>
                <p class="text-sm text-[#64748B] leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="mb-16 scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">{{ $t('serviceDetail.stepsTitle') }}</h2>
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0D9488] to-[#059669] hidden md:block"></div>
          
          <div class="space-y-8">
            <div 
              v-for="(step, index) in currentService.steps" 
              :key="index"
              class="flex items-start gap-6"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md relative z-10">
                {{ index + 1 }}
              </div>
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 hover:shadow-md transition-shadow duration-300">
                <h3 class="font-bold text-[#1E293B] text-lg mb-2">{{ step.title }}</h3>
                <p class="text-sm text-[#64748B] leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
          <div class="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 500 500" class="w-full h-full">
              <circle cx="100" cy="100" r="80" fill="currentColor"/>
              <circle cx="400" cy="400" r="120" fill="currentColor"/>
            </svg>
          </div>
          <div class="relative z-10">
            <h2 class="text-2xl md:text-3xl font-extrabold mb-4">{{ $t('serviceDetail.ctaTitle') }}</h2>
            <p class="text-[#D1FAE5] mb-8 max-w-xl mx-auto">{{ $t('serviceDetail.ctaText') }}</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <!-- ปุ่มสำหรับ daily-checkin -->
              <button
                v-if="currentService.id === 'daily-checkin' || route.params.id === 'daily-checkin'"
                @click="$router.push('/daily-checkin')"
                class="bg-white text-[#0D9488] px-8 py-3 rounded-full font-bold text-sm hover:bg-[#D1FAE5] transition shadow-md flex items-center gap-2 justify-center"
              >
                {{ $t('serviceDetail.btnCheckin') }}
              </button>

              <!-- ปุ่มพิเศษสำหรับ relaxation service -->
              <button
                v-else-if="currentService.id === 'relaxation' || route.params.id === 'relaxation'"
                @click="$router.push('/activity-tracker')"
                class="bg-white text-[#0D9488] px-8 py-3 rounded-full font-bold text-sm hover:bg-[#D1FAE5] transition shadow-md flex items-center gap-2 justify-center"
              >
                {{ $t('serviceDetail.btnRelaxation') }}
              </button>

              <!-- ปุ่มสำหรับ listening-space -->
              <button
                v-else-if="currentService.id === 'listening-space' || route.params.id === 'listening-space'"
                @click="$router.push('/chat')"
                class="bg-white text-[#0D9488] px-8 py-3 rounded-full font-bold text-sm hover:bg-[#D1FAE5] transition shadow-md flex items-center gap-2 justify-center"
              >
                {{ $t('serviceDetail.btnListening') }}
              </button>

              <!-- ปุ่มเริ่มต้นใช้งานสำหรับ assessment และอื่นๆ -->
              <button
                v-else
                @click="$router.push('/assessment')"
                class="bg-white text-[#0D9488] px-8 py-3 rounded-full font-bold text-sm hover:bg-[#D1FAE5] transition shadow-md"
              >
                {{ $t('serviceDetail.btnStart') }}
              </button>

              <router-link
                to="/services"
                class="border-2 border-white/60 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition"
              >
                {{ $t('serviceDetail.viewAll') }}
              </router-link>
            </div>
          </div>
        </div>
      </section>


    </main>

    <!-- 4. Footer (เหมือน HomeView) -->
    <footer class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 mt-10 scroll-anim opacity-0 transition-opacity duration-1000 ease-out">
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
            <li><a href="#" class="hover:underline">{{ $t('common.footerService1') }}</a></li>
            <li><a href="#" class="hover:underline">{{ $t('common.footerService2') }}</a></li>
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

  </div>
</template>

<script setup>
import { inject, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProfileMenu from '../components/ProfileMenu.vue'
import AdminNavLink from '../components/AdminNavLink.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isDarkMode = inject('isDarkMode')
const route = useRoute()
const router = useRouter()

// ข้อมูลรายละเอียดบริการทั้งหมด (keyed by id ที่ตรงกับ servicesList ใน ServicesView)
const servicesData = computed(() => ({
  'daily-checkin': {
    title: t('serviceDetail.data.dailyCheckin.title'),
    subtitle: t('serviceDetail.data.dailyCheckin.subtitle'),
    overview: t('serviceDetail.data.dailyCheckin.overview'),
    features: [
      { icon: '📝', title: t('serviceDetail.data.dailyCheckin.f1Title'), description: t('serviceDetail.data.dailyCheckin.f1Desc') },
      { icon: '📊', title: t('serviceDetail.data.dailyCheckin.f2Title'), description: t('serviceDetail.data.dailyCheckin.f2Desc') },
      { icon: '🔔', title: t('serviceDetail.data.dailyCheckin.f3Title'), description: t('serviceDetail.data.dailyCheckin.f3Desc') },
      { icon: '🔒', title: t('serviceDetail.data.dailyCheckin.f4Title'), description: t('serviceDetail.data.dailyCheckin.f4Desc') }
    ],
    steps: [
      { title: t('serviceDetail.data.dailyCheckin.s1Title'), description: t('serviceDetail.data.dailyCheckin.s1Desc') },
      { title: t('serviceDetail.data.dailyCheckin.s2Title'), description: t('serviceDetail.data.dailyCheckin.s2Desc') },
      { title: t('serviceDetail.data.dailyCheckin.s3Title'), description: t('serviceDetail.data.dailyCheckin.s3Desc') },
      { title: t('serviceDetail.data.dailyCheckin.s4Title'), description: t('serviceDetail.data.dailyCheckin.s4Desc') }
    ]
  },
  'assessment': {
    title: t('serviceDetail.data.assessment.title'),
    subtitle: t('serviceDetail.data.assessment.subtitle'),
    overview: t('serviceDetail.data.assessment.overview'),
    features: [
      { icon: '📄', title: t('serviceDetail.data.assessment.f1Title'), description: t('serviceDetail.data.assessment.f1Desc') },
      { icon: '⚡', title: t('serviceDetail.data.assessment.f2Title'), description: t('serviceDetail.data.assessment.f2Desc') },
      { icon: '📈', title: t('serviceDetail.data.assessment.f3Title'), description: t('serviceDetail.data.assessment.f3Desc') },
      { icon: '💡', title: t('serviceDetail.data.assessment.f4Title'), description: t('serviceDetail.data.assessment.f4Desc') }
    ],
    steps: [
      { title: t('serviceDetail.data.assessment.s1Title'), description: t('serviceDetail.data.assessment.s1Desc') },
      { title: t('serviceDetail.data.assessment.s2Title'), description: t('serviceDetail.data.assessment.s2Desc') },
      { title: t('serviceDetail.data.assessment.s3Title'), description: t('serviceDetail.data.assessment.s3Desc') },
      { title: t('serviceDetail.data.assessment.s4Title'), description: t('serviceDetail.data.assessment.s4Desc') }
    ]
  },
  'listening-space': {
    title: t('serviceDetail.data.listeningSpace.title'),
    subtitle: t('serviceDetail.data.listeningSpace.subtitle'),
    overview: t('serviceDetail.data.listeningSpace.overview'),
    features: [
      { icon: '🕐', title: t('serviceDetail.data.listeningSpace.f1Title'), description: t('serviceDetail.data.listeningSpace.f1Desc') },
      { icon: '🤗', title: t('serviceDetail.data.listeningSpace.f2Title'), description: t('serviceDetail.data.listeningSpace.f2Desc') },
      { icon: '🔐', title: t('serviceDetail.data.listeningSpace.f3Title'), description: t('serviceDetail.data.listeningSpace.f3Desc') },
      { icon: '🆘', title: t('serviceDetail.data.listeningSpace.f4Title'), description: t('serviceDetail.data.listeningSpace.f4Desc') }
    ],
    steps: [
      { title: t('serviceDetail.data.listeningSpace.s1Title'), description: t('serviceDetail.data.listeningSpace.s1Desc') },
      { title: t('serviceDetail.data.listeningSpace.s2Title'), description: t('serviceDetail.data.listeningSpace.s2Desc') },
      { title: t('serviceDetail.data.listeningSpace.s3Title'), description: t('serviceDetail.data.listeningSpace.s3Desc') },
      { title: t('serviceDetail.data.listeningSpace.s4Title'), description: t('serviceDetail.data.listeningSpace.s4Desc') }
    ]
  },
  'relaxation': {
    title: t('serviceDetail.data.relaxation.title'),
    subtitle: t('serviceDetail.data.relaxation.subtitle'),
    overview: t('serviceDetail.data.relaxation.overview'),
    features: [
      { icon: '🎯', title: t('serviceDetail.data.relaxation.f1Title'), description: t('serviceDetail.data.relaxation.f1Desc') },
      { icon: '🧘', title: t('serviceDetail.data.relaxation.f2Title'), description: t('serviceDetail.data.relaxation.f2Desc') },
      { icon: '📚', title: t('serviceDetail.data.relaxation.f3Title'), description: t('serviceDetail.data.relaxation.f3Desc') },
      { icon: '🏆', title: t('serviceDetail.data.relaxation.f4Title'), description: t('serviceDetail.data.relaxation.f4Desc') }
    ],
    steps: [
      { title: t('serviceDetail.data.relaxation.s1Title'), description: t('serviceDetail.data.relaxation.s1Desc') },
      { title: t('serviceDetail.data.relaxation.s2Title'), description: t('serviceDetail.data.relaxation.s2Desc') },
      { title: t('serviceDetail.data.relaxation.s3Title'), description: t('serviceDetail.data.relaxation.s3Desc') },
      { title: t('serviceDetail.data.relaxation.s4Title'), description: t('serviceDetail.data.relaxation.s4Desc') }
    ]
  }
}))

// หา service ปัจจุบันจาก route param
const currentService = computed(() => {
  const id = route.params.id
  const data = servicesData.value[id] || servicesData.value['daily-checkin']
  return { ...data, id: id || 'daily-checkin' }
})

// Scroll animation observer
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-10')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
  })

  const animElements = document.querySelectorAll('.scroll-anim')
  animElements.forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
