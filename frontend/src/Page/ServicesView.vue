<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">

    <!-- 1. Navbar -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">

        <router-link to="/" class="flex items-center gap-1.5 sm:gap-2">
          <!-- โลโก้ Navbar -->
          <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
            <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
          </div>
          <span class="text-xl font-bold tracking-wide">{{ $t('common.brand') }}</span>
        </router-link>
      </div>
      
      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" exact class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.home') }}</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.about') }}</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.services') }}</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.blog') }}</router-link>
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

    <!-- 2. Green Banner Header -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-4 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <!-- Background Decorative Curve Line -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <!-- Page Title Header -->
      <div class="container mx-auto px-6 lg:px-10 pt-6 pb-20 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              {{ $t('services.title') }}
            </h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed italic">
              {{ $t('services.heroLine1') }}<br />
              {{ $t('services.heroLine2') }}<br />
              {{ $t('services.heroLine3') }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. Main Services Content -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-6 py-16">
      <div class="text-center">
        <h4 class="text-sm font-bold text-[#0D9488] mb-2 uppercase tracking-wider">{{ $t('services.title') }}</h4>
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-14">{{ $t('services.sectionTitle') }}</h2>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <!-- Render Cards from Data -->
          <div 
            v-for="(service, index) in servicesList" 
            :key="index"
            class="bg-[#4b4b4b] rounded-[2rem] aspect-[4/3] flex flex-col items-center justify-center p-8 text-white shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl md:text-2xl font-bold mb-4">{{ service.title }}</h3>
            <p class="text-gray-300 text-sm mb-8 text-center px-4">{{ service.description }}</p>
            
            <!-- ปุ่มเข้าใช้งาน หรือ ดูรายละเอียด -->
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <router-link 
                v-if="service.route"
                :to="service.route" 
                class="bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md inline-block"
              >
                {{ service.buttonText || $t('services.getStarted') }}
              </router-link>
              <router-link 
                :to="'/services/' + service.id" 
                :class="service.route ? 'text-xs text-gray-300 hover:text-white underline underline-offset-4 transition' : 'bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white px-8 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md inline-block'"
              >
                {{ service.route ? $t('services.viewDetails') : (service.buttonText || $t('services.seeDetail')) }}
              </router-link>
            </div>
            
          </div>
        </div>
      </div>
    </main>

    <!-- 3. Footer -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <!-- โลโก้ Footer -->
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

  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import ProfileMenu from '../components/ProfileMenu.vue'
import AdminNavLink from '../components/AdminNavLink.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ดึง State ควบคุมโหมดตาบอดสีที่ Provide มาจาก Component หลัก (App.vue)
const isDarkMode = inject('isDarkMode')

// ข้อมูลสำหรับวนลูปสร้างการ์ด (ช่วยให้โค้ดส่วน Template สะอาดขึ้น)
const servicesList = computed(() => ([
  {
    id: 'daily-checkin',
    title: t('services.cards.dailyCheckin.title'),
    description: t('services.cards.dailyCheckin.description'),
    route: '/daily-checkin',
    buttonText: t('services.cards.dailyCheckin.button')
  },
  {
    id: 'assessment',
    title: t('services.cards.assessment.title'),
    description: t('services.cards.assessment.description'),
    route: '/assessment',
    buttonText: t('services.cards.assessment.button')
  },
  {
    id: 'listening-space',
    title: t('services.cards.listeningSpace.title'),
    description: t('services.cards.listeningSpace.description'),
    route: '/chat', // นำทางไปหน้าแชท (ตามไฟล์ ChatView.vue ในโฟลเดอร์)
    buttonText: t('services.getStarted') // เปลี่ยนคำบนปุ่มเฉพาะการ์ดนี้
  },
  {
    id: 'relaxation',
    title: t('services.cards.relaxation.title'),
    description: t('services.cards.relaxation.description'),
    route: '/activity-tracker',
    buttonText: t('services.cards.relaxation.button')
  }
]))
</script>