<template>
  <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-4 sm:px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100] transition-colors duration-300">
    <!-- Brand / Logo & Optional Back Button -->
    <div class="flex items-center gap-2 sm:gap-3">
      <button
        v-if="showBack"
        type="button"
        @click="handleBack"
        class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50"
        title="ย้อนกลับ"
        aria-label="ย้อนกลับ"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
          <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col">
          <span class="text-lg md:text-xl font-bold tracking-wide leading-tight group-hover:text-emerald-100 transition-colors">PhuenJaiZone</span>
          <span class="text-[10px] text-emerald-100/80 -mt-0.5 hidden sm:inline">เพื่อนใจโซน</span>
        </div>
      </router-link>
    </div>

    <!-- Desktop Navigation Links (Priority Ordered) -->
    <!-- Requirement: 1. ทำแบบประเมิน/แชทบอท [ให้เด่นที่สุด] -> 2. ประวัติ -> 3. บทความ -->
    <div class="hidden md:flex gap-4 lg:gap-6 items-center text-sm font-medium">
      <!-- 1. Highlighted Primary Action: ทำแบบประเมิน & แชทบอท (เด่นที่สุด) -->
      <div class="flex items-center gap-1.5 p-1 bg-black/15 rounded-full border border-white/25 shadow-inner">
        <router-link
          to="/assessment"
          class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 text-teal-950 font-bold shadow-md hover:shadow-lg hover:from-emerald-300 hover:to-teal-200 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-xs lg:text-sm"
          active-class="ring-2 ring-white ring-offset-2 ring-offset-[#0D9488]"
        >
          <span class="text-base leading-none">📝</span>
          <span>ทำแบบประเมิน</span>
          <span class="ml-0.5 px-1.5 py-0.2 bg-teal-900/20 text-[10px] rounded-full uppercase tracking-wider font-extrabold hidden lg:inline">ด่วน</span>
        </router-link>

        <router-link
          to="/chat"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white hover:bg-white/15 transition-all text-xs lg:text-sm font-medium"
          active-class="bg-white/25 font-bold shadow-sm"
        >
          <span class="text-base leading-none">💬</span>
          <span>แชทบอท</span>
        </router-link>
      </div>

      <!-- 2. ประวัติ (Daily Check-in / History) -->
      <router-link
        to="/daily-checkin"
        class="flex items-center gap-1.5 hover:text-[#D1FAE5] transition py-1"
        active-class="text-white font-bold underline decoration-2 underline-offset-4"
      >
        <span>📋</span>
        <span>ประวัติ</span>
      </router-link>

      <!-- 3. บทความ (Articles / Blog) -->
      <router-link
        to="/blog"
        class="flex items-center gap-1.5 hover:text-[#D1FAE5] transition py-1"
        active-class="text-white font-bold underline decoration-2 underline-offset-4"
      >
        <span>📰</span>
        <span>บทความ</span>
      </router-link>

      <!-- Secondary Links -->
      <router-link
        to="/"
        exact
        class="hover:text-[#D1FAE5] transition py-1"
        active-class="text-white font-bold underline decoration-2 underline-offset-4"
      >
        หน้าหลัก
      </router-link>

      <router-link
        to="/services"
        class="hover:text-[#D1FAE5] transition py-1"
        active-class="text-white font-bold underline decoration-2 underline-offset-4"
      >
        บริการ
      </router-link>

      <router-link
        to="/about"
        class="hover:text-[#D1FAE5] transition py-1"
        active-class="text-white font-bold underline decoration-2 underline-offset-4"
      >
        เกี่ยวกับเรา
      </router-link>

      <router-link
        v-if="isAdmin"
        to="/admin"
        class="hover:text-[#D1FAE5] transition py-1 text-amber-200"
        active-class="text-amber-100 font-bold underline decoration-2 underline-offset-4"
      >
        Admin
      </router-link>
    </div>

    <!-- Right Controls: Dark Mode Toggle, Profile/Auth, Hamburger Menu -->
    <div class="flex gap-2 sm:gap-3 items-center text-sm">
      <!-- Dark Mode Switch (Desktop) -->
      <div class="hidden lg:flex items-center gap-2 bg-black/15 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" title="สลับโหมดมืด / สว่าง">
        <span class="text-xs font-semibold text-white">Dark Mode</span>
        <button
          @click="toggleDarkMode"
          :class="isDarkMode ? 'bg-white' : 'bg-[#045F54]'"
          class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-white/30"
          type="button"
          aria-label="Toggle Dark Mode"
        >
          <span
            :class="isDarkMode ? 'translate-x-4 bg-[#1E293B]' : 'translate-x-1 bg-white'"
            class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
          ></span>
        </button>
      </div>

      <!-- Profile Menu (Desktop / Auth Controls) -->
      <ProfileMenu :show-mobile-menu="false" />

      <!-- Mobile Hamburger Button (< md) -->
      <button
        type="button"
        @click="mobileNavOpen = !mobileNavOpen"
        class="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white shadow-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
        :aria-expanded="mobileNavOpen"
        aria-label="เปิดเมนูนำทาง"
      >
        <span class="sr-only">เปิดเมนูนำทาง</span>
        <!-- Animated Hamburger Icon -->
        <div class="w-5 h-4 relative flex flex-col justify-between">
          <span
            class="h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-left"
            :class="{ 'rotate-45 translate-x-0.5 -translate-y-0.5': mobileNavOpen }"
          ></span>
          <span
            class="h-0.5 w-full bg-white rounded-full transition-all duration-200"
            :class="{ 'opacity-0': mobileNavOpen }"
          ></span>
          <span
            class="h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-left"
            :class="{ '-rotate-45 translate-x-0.5 translate-y-0.5': mobileNavOpen }"
          ></span>
        </div>
      </button>
    </div>
  </nav>

  <!-- Mobile Drawer Overlay & Sheet (< md) -->
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="mobileNavOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] md:hidden"
      @click="mobileNavOpen = false"
    ></div>
  </transition>

  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div
      v-if="mobileNavOpen"
      class="fixed top-16 left-3 right-3 z-[160] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-3xl border border-white/20 bg-[#0F172A]/95 backdrop-blur-xl text-white shadow-2xl p-5 md:hidden"
    >
      <!-- Header inside mobile menu -->
      <div class="flex items-center justify-between pb-3 border-b border-white/10">
        <div class="flex items-center gap-2">
          <img src="/phuenjaizone-logo.jpg" alt="Logo" class="w-7 h-7 rounded-full object-contain" />
          <span class="font-bold text-sm text-emerald-200">เมนูนำทาง PhuenJaiZone</span>
        </div>
        <button
          type="button"
          @click="mobileNavOpen = false"
          class="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
          aria-label="ปิดเมนู"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Priority 1: ทำแบบประเมิน / แชทบอท (เด่นที่สุดบนมือถือ) -->
      <div class="pt-4 pb-3">
        <p class="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-2">บริการหลักด้านสุขภาพจิต</p>
        
        <router-link
          to="/assessment"
          @click="mobileNavOpen = false"
          class="flex items-center justify-between p-3.5 mb-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-[#059669] text-white font-bold shadow-lg shadow-emerald-900/30 active:scale-[0.98] transition-transform"
        >
          <div class="flex items-center gap-3">
            <span class="text-2xl p-1 bg-white/20 rounded-xl">📝</span>
            <div>
              <div class="text-base font-extrabold flex items-center gap-1.5">
                ทำแบบประเมินสุขภาพจิต
                <span class="text-[10px] bg-white text-teal-900 px-1.5 py-0.5 rounded-full font-black">ด่วน</span>
              </div>
              <p class="text-xs text-emerald-100 font-normal">คัดกรอง 2Q/9Q/8Q รู้ผลทันทีใน 2 นาที</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <router-link
          to="/chat"
          @click="mobileNavOpen = false"
          class="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 active:scale-[0.98] transition-all"
        >
          <div class="flex items-center gap-3">
            <span class="text-2xl p-1 bg-white/10 rounded-xl">💬</span>
            <div>
              <div class="text-sm font-bold text-white">พูดคุยกับแชทบอท</div>
              <p class="text-xs text-gray-300">พื้นที่รับฟังและช่วยจัดการอารมณ์ 24 ชม.</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <!-- Priority 2 & 3: ประวัติ และ บทความ -->
      <div class="py-2 border-t border-white/10 space-y-1">
        <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1 pt-1">ติดตาม & เรียนรู้</p>

        <!-- 2. ประวัติ -->
        <router-link
          to="/daily-checkin"
          @click="mobileNavOpen = false"
          class="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-white transition"
          active-class="bg-emerald-500/20 text-emerald-300 font-bold"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-lg">📋</span>
            <span>ประวัติสุขภาพจิตและการเช็คอิน</span>
          </span>
          <span class="text-xs text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">บันทึกรายวัน</span>
        </router-link>

        <!-- 3. บทความ -->
        <router-link
          to="/blog"
          @click="mobileNavOpen = false"
          class="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-white transition"
          active-class="bg-emerald-500/20 text-emerald-300 font-bold"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-lg">📰</span>
            <span>บทความความรู้ด้านสุขภาพจิต</span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <!-- Other Pages -->
      <div class="py-2 border-t border-white/10 space-y-1">
        <p class="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1 pt-1">หน้าอื่นๆ</p>

        <router-link
          to="/"
          exact
          @click="mobileNavOpen = false"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
        >
          <span>🏠</span>
          <span>หน้าหลัก (Home)</span>
        </router-link>

        <router-link
          to="/services"
          @click="mobileNavOpen = false"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
        >
          <span>🩺</span>
          <span>บริการทั้งหมด (Services)</span>
        </router-link>

        <router-link
          to="/activity-tracker"
          @click="mobileNavOpen = false"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
        >
          <span>🧘</span>
          <span>กิจกรรมผ่อนคลาย (Activities)</span>
        </router-link>

        <router-link
          to="/about"
          @click="mobileNavOpen = false"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
        >
          <span>ℹ️</span>
          <span>เกี่ยวกับเรา (About Us)</span>
        </router-link>

        <router-link
          to="/contact"
          @click="mobileNavOpen = false"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
        >
          <span>📞</span>
          <span>ติดต่อเรา (Contact)</span>
        </router-link>

        <router-link
          v-if="isAdmin"
          to="/admin"
          @click="mobileNavOpen = false"
          class="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-amber-300 hover:bg-white/10 transition"
        >
          <span>🛡️</span>
          <span>Admin Dashboard</span>
        </router-link>
      </div>

      <!-- Settings & Auth in Mobile Menu -->
      <div class="pt-3 border-t border-white/10 flex flex-col gap-2">
        <div class="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5">
          <span class="text-xs font-semibold text-gray-300">Dark Mode</span>
          <button
            type="button"
            @click="toggleDarkMode"
            :class="isDarkMode ? 'bg-[#10B981]' : 'bg-slate-700'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            <span
              :class="isDarkMode ? 'translate-x-6 bg-white' : 'translate-x-1 bg-gray-300'"
              class="inline-block h-4 w-4 transform rounded-full transition-transform duration-300"
            ></span>
          </button>
        </div>

        <div v-if="!authStore.isAuthenticated" class="grid grid-cols-2 gap-2 mt-1">
          <button
            type="button"
            @click="goToRoute('/login')"
            class="w-full py-2.5 rounded-xl border border-white/30 text-white font-medium text-sm hover:bg-white/10 text-center"
          >
            เข้าสู่ระบบ
          </button>
          <button
            type="button"
            @click="goToRoute('/register')"
            class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm text-center shadow"
          >
            สมัครสมาชิก
          </button>
        </div>

        <div v-else class="space-y-1 mt-1">
          <router-link
            to="/profile"
            @click="mobileNavOpen = false"
            class="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-gray-200 hover:bg-white/10"
          >
            <span>👤 บัญชีผู้ใช้: {{ authStore.displayName }}</span>
            <span class="text-xs text-emerald-400">แก้ไข</span>
          </router-link>
          <button
            type="button"
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 text-sm font-semibold hover:bg-red-500/20"
          >
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, inject, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ProfileMenu from './ProfileMenu.vue'
import { useAuthStore } from '../stores/authStore'

const props = defineProps({
  showBack: {
    type: Boolean,
    default: false
  },
  backTo: {
    type: String,
    default: '/'
  }
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isDarkMode = inject('isDarkMode', ref(false))

const mobileNavOpen = ref(false)

const isAdmin = computed(() => {
  return authStore.user?.role === 'ADMIN' || localStorage.getItem('userRole') === 'ADMIN'
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push(props.backTo)
  }
}

const goToRoute = (path) => {
  mobileNavOpen.value = false
  router.push(path)
}

const handleLogout = () => {
  authStore.logout()
  mobileNavOpen.value = false
  router.push('/login')
}

// Close mobile navigation on route change
watch(
  () => route.fullPath,
  () => {
    mobileNavOpen.value = false
  }
)
</script>
