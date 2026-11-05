<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">
    <!-- 1. Navbar -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          @click="$router.options.history.state?.back ? $router.back() : $router.push('/')"
          class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center"
          :title="$t('common.backHome')"
          :aria-label="$t('common.backHome')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <router-link to="/" class="flex items-center gap-1.5 sm:gap-2">
          <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
            <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
          </div>
          <span class="text-xl font-bold tracking-wide">PhuenJaiZone</span>
        </router-link>
      </div>

      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" class="hover:text-[#D1FAE5] transition">{{ $t('nav.home') }}</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition">{{ $t('nav.about') }}</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition">{{ $t('nav.services') }}</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">{{ $t('nav.blog') }}</router-link>
      </div>

      <div class="flex items-center gap-3 text-sm">
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

    <!-- 2. Header Banner -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <div class="container mx-auto px-6 lg:px-10 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">{{ $t('accountSettings.title') }}</h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] italic">{{ $t('accountSettings.quote') }}</p>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
      <div class="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6 md:p-10">
        <div class="space-y-6">
          <div class="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ $t('accountSettings.emailNotifTitle') }}</p>
                <p class="text-xs text-gray-500">{{ $t('accountSettings.emailNotifDesc') }}</p>
              </div>
              <button
                type="button"
                @click="notifications = !notifications"
                :class="notifications ? 'bg-[#2BB7A8]' : 'bg-gray-300'"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors"
              >
                <span :class="notifications ? 'translate-x-6' : 'translate-x-1'" class="inline-block h-5 w-5 rounded-full bg-white transition-transform"></span>
              </button>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ $t('accountSettings.accessTitle') }}</p>
                <p class="text-xs text-gray-500">{{ $t('accountSettings.accessDesc') }}</p>
              </div>
              <button
                type="button"
                @click="accessMode = !accessMode"
                :class="accessMode ? 'bg-[#2BB7A8]' : 'bg-gray-300'"
                class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors"
              >
                <span :class="accessMode ? 'translate-x-6' : 'translate-x-1'" class="inline-block h-5 w-5 rounded-full bg-white transition-transform"></span>
              </button>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('accountSettings.privacy') }}</label>
            <select v-model="privacy" class="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2BB7A8]">
              <option value="public">{{ $t('accountSettings.privacyPublic') }}</option>
              <option value="friends">{{ $t('accountSettings.privacyFriends') }}</option>
              <option value="private">{{ $t('accountSettings.privacyPrivate') }}</option>
            </select>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('accountSettings.newPassword') }}</label>
            <input v-model="password" type="password" :placeholder="$t('accountSettings.newPasswordPlaceholder')" class="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2BB7A8]" />
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button type="button" @click="resetSettings" class="rounded-2xl bg-[#F87171] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#EF4444]">
            {{ $t('accountSettings.reset') }}
          </button>
          <button type="button" @click="saveSettings" class="rounded-2xl bg-[#2BB7A8] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#1FA79B]">
            {{ $t('accountSettings.save') }}
          </button>
        </div>
      </div>
    </main>

    <footer class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <div class="flex items-center gap-1 mb-3">
            <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-10 h-10 object-contain rounded-full" />
            <span class="font-bold text-lg">PhuenJaiZone</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">{{ $t('common.footerDesc') }}</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerServices') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>{{ $t('common.footerService1') }}</li>
            <li>{{ $t('common.footerService2') }}</li>
            <li>{{ $t('common.footerService3') }}</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerContact') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 +123 456 789</li>
            <li>✉️ PhuenJaiZone@domain.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerHotline') }}</h4>
          <p class="text-xs text-[#D1FAE5]">{{ $t('common.hotlineText') }}</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">{{ $t('contact.rights') }}</div>
    </footer>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import ProfileMenu from '../components/ProfileMenu.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isDarkMode = inject('isDarkMode')

const notifications = ref(true)
const accessMode = ref(false)
const privacy = ref('friends')
const password = ref('')

const resetSettings = () => {
  notifications.value = true
  accessMode.value = false
  privacy.value = 'friends'
  password.value = ''
}

const saveSettings = () => {
  alert(t('accountSettings.saved'))
}
</script>
