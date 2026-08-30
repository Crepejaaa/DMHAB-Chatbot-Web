<template>
  <div class="relative">
    <div v-if="authStore.isAuthenticated" class="relative profile-menu hidden sm:block">
      <button
        @click="showProfileMenu = !showProfileMenu"
        class="flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-3 py-1.5 text-white transition hover:bg-white/15"
        type="button"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
          {{ userInitial }}
        </div>
        <span class="hidden sm:inline">{{ authStore.displayName }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-if="showProfileMenu" class="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div class="border-b border-gray-100 px-4 py-3 text-left">
          <p class="text-xs text-gray-500">บัญชีของคุณ</p>
          <p class="mt-1 text-sm font-semibold text-gray-800">{{ authStore.displayName }}</p>
          <p class="text-xs text-gray-500">{{ authStore.userEmail }}</p>
        </div>

        <button
          type="button"
          @click="goToProfile"
          class="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#F3F4F6]"
        >
          <span>จัดการโปรไฟล์</span>
        </button>
        <button
          type="button"
          @click="goToAccount"
          class="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#F3F4F6]"
        >
          <span>จัดการข้อมูล</span>
        </button>

        <div class="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-700">
          <span class="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">Color Blindness</span>
          <button
            type="button"
            @click="toggleColorBlindMode"
            :class="isColorBlindMode ? 'bg-[#045F54]' : 'bg-slate-200'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300"
            aria-label="Toggle color blindness mode"
          >
            <span
              :class="isColorBlindMode ? 'translate-x-4 bg-white' : 'translate-x-1 bg-slate-700'"
              class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
            ></span>
          </button>
        </div>

        <button
          type="button"
          @click="handleLogout"
          class="flex w-full items-center justify-between border-t border-gray-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </div>

    <div v-else class="hidden sm:flex items-center gap-2">
      <button
        @click="$router.push('/login')"
        class="px-5 py-1.5 rounded-full border border-white/60 hover:bg-white/10 transition inline-flex items-center justify-center cursor-pointer text-white"
        type="button"
      >
        Login
      </button>

      <button
        @click="$router.push('/register')"
        class="px-5 py-1.5 bg-[#023832] hover:bg-[#01221E] text-white rounded-full font-medium transition shadow-sm"
        type="button"
      >
        Register
      </button>
    </div>

  </div>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isColorBlindMode = inject('isColorBlindMode', ref(false))
const showProfileMenu = ref(false)
const mobileMenuOpen = ref(false)

const userInitial = computed(() => {
  const name = authStore.displayName || 'U'
  return name.charAt(0).toUpperCase()
})

const toggleColorBlindMode = () => {
  isColorBlindMode.value = !isColorBlindMode.value
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const goToProfile = () => {
  showProfileMenu.value = false
  router.push('/profile')
}

const goToAccount = () => {
  showProfileMenu.value = false
  router.push('/account-settings')
}

const handleLogout = () => {
  authStore.logout()
  showProfileMenu.value = false
  router.push('/login')
}

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.profile-menu')
  if (dropdown && !dropdown.contains(event.target)) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
