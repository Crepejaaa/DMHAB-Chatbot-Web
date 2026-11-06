<template>
  <div class="relative" ref="menuContainerRef">
    <div v-if="authStore.isAuthenticated" class="relative profile-menu hidden sm:block">
      <button
        @click="showProfileMenu = !showProfileMenu"
        class="flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-3 py-1.5 text-white transition hover:bg-white/15"
        type="button"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white overflow-hidden border border-white/40">
          <img v-if="authStore.profileImage" :src="authStore.profileImage" :alt="$t('profileMenu.profileAlt')" class="h-full w-full object-cover" />
          <span v-else>{{ userInitial }}</span>
        </div>
        <span class="hidden sm:inline">{{ authStore.displayName }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-if="showProfileMenu" class="absolute right-0 z-[999] mt-2 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div class="border-b border-gray-100 px-4 py-3 text-left flex items-center gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D9488]/10 text-sm font-bold text-[#0D9488] overflow-hidden border border-[#0D9488]/20">
            <img v-if="authStore.profileImage" :src="authStore.profileImage" :alt="$t('profileMenu.profileAlt')" class="h-full w-full object-cover" />
            <span v-else>{{ userInitial }}</span>
          </div>
          <div class="overflow-hidden">
            <p class="text-[11px] text-gray-500">{{ $t('profileMenu.yourAccount') }}</p>
            <p class="text-sm font-semibold text-gray-800 truncate">{{ authStore.displayName }}</p>
            <p class="text-xs text-gray-500 truncate">{{ authStore.userEmail }}</p>
          </div>
        </div>

        <button
          type="button"
          @click="goToProfile"
          class="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-[#F3F4F6]"
        >
          <span>{{ $t('profileMenu.manageProfile') }}</span>
        </button>

        <div class="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-700">
          <span class="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">{{ $t('nav.darkMode') }}</span>
          <button
            type="button"
            @click="toggleDarkMode"
            :class="isDarkMode ? 'bg-[#045F54]' : 'bg-slate-200'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300"
            :aria-label="$t('profileMenu.toggleDarkMode')"
          >
            <span
              :class="isDarkMode ? 'translate-x-4 bg-white' : 'translate-x-1 bg-slate-700'"
              class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
            ></span>
          </button>
        </div>

        <button
          type="button"
          @click="handleLogout"
          class="flex w-full items-center justify-between border-t border-gray-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <span>{{ $t('profileMenu.logout') }}</span>
        </button>
      </div>
    </div>

    <div v-else class="hidden sm:flex items-center gap-2">
      <button
        @click="$router.push('/login')"
        class="px-5 py-1.5 rounded-full border border-white/60 hover:bg-white/10 transition inline-flex items-center justify-center cursor-pointer text-white"
        type="button"
      >
        {{ $t('profileMenu.login') }}
      </button>

      <button
        @click="$router.push('/register')"
        class="px-5 py-1.5 bg-[#023832] hover:bg-[#01221E] text-white rounded-full font-medium transition shadow-sm"
        type="button"
      >
        {{ $t('profileMenu.register') }}
      </button>
    </div>

    <div class="relative sm:hidden">
      <button
        type="button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/5 text-white shadow-sm transition hover:bg-white/10"
        :aria-label="$t('profileMenu.openMenu')"
      >
        <span class="flex flex-col gap-1.5">
          <span class="mobile-menu-toggle-line h-0.5 w-5 rounded-full bg-white"></span>
          <span class="mobile-menu-toggle-line h-0.5 w-5 rounded-full bg-white"></span>
          <span class="mobile-menu-toggle-line h-0.5 w-5 rounded-full bg-white"></span>
        </span>
      </button>

      <div v-if="mobileMenuOpen" class="absolute right-0 top-12 z-[999] w-[min(88vw,320px)] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border shadow-2xl"
        :class="isDarkMode ? 'border-white/10 bg-[#0f172a] text-white' : 'border-gray-200 bg-white text-gray-800'">
        <div v-if="authStore.isAuthenticated" class="border-b px-4 py-3 text-left flex items-center gap-3" :class="isDarkMode ? 'border-white/10' : 'border-gray-100'">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold overflow-hidden border"
            :class="isDarkMode ? 'bg-white/20 text-white border-white/30' : 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20'">
            <img v-if="authStore.profileImage" :src="authStore.profileImage" :alt="$t('profileMenu.profileAlt')" class="h-full w-full object-cover" />
            <span v-else>{{ userInitial }}</span>
          </div>
          <div class="overflow-hidden">
            <p class="text-[10px] uppercase tracking-[0.25em]" :class="mutedCls">{{ $t('profileMenu.account') }}</p>
            <p class="mt-0.5 text-sm font-semibold truncate">{{ authStore.displayName }}</p>
            <p class="text-xs truncate" :class="mutedCls">{{ authStore.userEmail }}</p>
          </div>
        </div>

        <div class="space-y-1 p-3">
          <!-- Common Links (About, Service, Blog) -->
          <router-link
            to="/about"
            class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition" :class="itemCls"
            @click="mobileMenuOpen = false"
          >
            <span>{{ $t('nav.about') }}</span>
          </router-link>
          <router-link
            to="/services"
            class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition" :class="itemCls"
            @click="mobileMenuOpen = false"
          >
            <span>{{ $t('nav.services') }}</span>
          </router-link>
          <router-link
            to="/blog"
            class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition" :class="itemCls"
            @click="mobileMenuOpen = false"
          >
            <span>{{ $t('nav.blog') }}</span>
          </router-link>
          <router-link
            v-if="isAdmin"
            to="/admin"
            class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition"
            :class="isDarkMode ? 'text-[#5EEAD4] hover:bg-white/5' : 'text-[#0D9488] bg-[#0D9488]/5 border border-[#0D9488]/30 hover:bg-[#0D9488]/10'"
            @click="mobileMenuOpen = false"
          >
            <span>{{ $t('nav.admin') }}</span>
          </router-link>

          <div class="my-1 border-t" :class="isDarkMode ? 'border-white/10' : 'border-gray-100'"></div>

          <!-- Unauthenticated Links -->
          <button
            v-if="!authStore.isAuthenticated"
            type="button"
            @click="goToLogin"
            class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition" :class="itemCls"
          >
            <span>{{ $t('profileMenu.login') }}</span>
          </button>
          <button
            v-if="!authStore.isAuthenticated"
            type="button"
            @click="goToRegister"
            class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition" :class="itemCls"
          >
            <span>{{ $t('profileMenu.register') }}</span>
          </button>

          <!-- Authenticated Links -->
          <button
            v-if="authStore.isAuthenticated"
            type="button"
            @click="goToProfile"
            class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition" :class="itemCls"
          >
            <span>{{ $t('profileMenu.manageProfile') }}</span>
          </button>

          <div class="flex items-center justify-between rounded-xl px-3 py-3 text-sm">
            <span class="text-[10px] font-medium uppercase tracking-[0.2em]" :class="mutedCls">{{ $t('nav.darkMode') }}</span>
            <button
              type="button"
              @click="toggleDarkMode"
              :class="isDarkMode ? 'bg-[#16a085]' : 'bg-slate-200'"
              class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300"
            >
              <span
                :class="isDarkMode ? 'translate-x-4 bg-white' : 'translate-x-1 bg-slate-700'"
                class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
              ></span>
            </button>
          </div>

          <button
            v-if="authStore.isAuthenticated"
            type="button"
            @click="handleLogout"
            class="flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition"
            :class="isDarkMode ? 'border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/15' : 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'"
          >
            <span>{{ $t('profileMenu.logout') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isDarkMode = inject('isDarkMode', ref(false))
const showProfileMenu = ref(false)
const mobileMenuOpen = ref(false)
const menuContainerRef = ref(null)

const isAdmin = computed(() => authStore.user?.role === 'ADMIN' || localStorage.getItem('userRole') === 'ADMIN')
const itemCls = computed(() => (isDarkMode.value ? 'text-gray-200 hover:bg-white/5' : 'text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'))
const mutedCls = computed(() => (isDarkMode.value ? 'text-gray-400' : 'text-gray-500'))

const userInitial = computed(() => {
  const name = authStore.displayName || 'U'
  return name.charAt(0).toUpperCase()
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

const goToLogin = () => {
  mobileMenuOpen.value = false
  router.push('/login')
}

const goToRegister = () => {
  mobileMenuOpen.value = false
  router.push('/register')
}

const goToProfile = () => {
  showProfileMenu.value = false
  mobileMenuOpen.value = false
  router.push('/profile')
}


const handleLogout = () => {
  authStore.logout()
  showProfileMenu.value = false
  mobileMenuOpen.value = false
  router.push('/login')
}

const handleClickOutside = (event) => {
  if (menuContainerRef.value && !menuContainerRef.value.contains(event.target)) {
    showProfileMenu.value = false
    mobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
