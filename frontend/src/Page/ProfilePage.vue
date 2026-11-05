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
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">{{ $t('profile.title') }}</h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] italic">{{ $t('profile.quote') }}</p>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
      <div class="bg-white rounded-[2rem] shadow-lg border border-gray-100 px-6 py-8 md:px-10 md:py-10">
        <!-- ส่วนแสดงผลอวตารหลัก (Profile Preview) และ Animal Avatar Selector 5 ตัว -->
        <div class="flex flex-col items-center mb-8">
          <!-- วงกลมใหญ่แสดงอวตารสัตว์ที่เลือก -->
          <div
            class="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-[#0D9488]/30 shadow-md bg-[#F1F5F9] flex items-center justify-center transition-all duration-300"
            :title="selectedAvatarObj?.label || $t('profile.avatarTitle')"
          >
            <img
              v-if="selectedAvatarObj"
              :src="selectedAvatarObj.src"
              :alt="selectedAvatarObj.label"
              class="h-full w-full object-cover transition-transform duration-300"
            />
          </div>

          <!-- Animal Avatar Selector (สุนัข, แมว, กระต่าย, หมี, นก) -->
          <div class="mt-5 text-center">
            <p class="text-xs sm:text-sm font-semibold text-gray-500 mb-3">
              {{ $t('profile.avatarChoose', { label: selectedAvatarObj?.label }) }}
            </p>
            <div class="flex items-center justify-center gap-3 sm:gap-4">
              <button
                v-for="item in avatarOptions"
                :key="item.id"
                type="button"
                @click="selectAvatar(item.id)"
                :title="item.label"
                :aria-label="item.label"
                :class="[
                  'relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none',
                  form.avatar === item.id
                    ? 'ring-4 ring-[#0D9488] ring-offset-2 scale-110 shadow-md'
                    : 'opacity-75 hover:opacity-100 hover:scale-105 ring-1 ring-gray-200'
                ]"
              >
                <img :src="item.src" :alt="item.label" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <div class="rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3">
            <label class="block text-sm font-semibold text-gray-700 mb-1">{{ $t('profile.nameLabel') }}</label>
            <input v-model="form.name" class="w-full bg-transparent text-lg font-medium text-gray-800 outline-none" :placeholder="$t('profile.namePlaceholder')" />
          </div>

          <div class="rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3">
            <label class="block text-sm font-semibold text-gray-700 mb-1">{{ $t('profile.emailLabel') }}</label>
            <input v-model="form.email" type="email" class="w-full bg-transparent text-lg font-medium text-gray-800 outline-none" placeholder="name@example.com" />
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            :disabled="isSaving"
            @click="cancelEdit"
            class="rounded-2xl bg-[#F87171] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#EF4444] cursor-pointer disabled:opacity-60"
          >
            {{ $t('profile.cancel') }}
          </button>
          <button
            type="button"
            :disabled="isSaving"
            @click="saveProfile"
            class="rounded-2xl bg-[#2BB7A8] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#1FA79B] cursor-pointer disabled:opacity-60"
          >
            {{ isSaving ? $t('profile.saving') : $t('profile.save') }}
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
      <div class="text-center text-xs text-[#A7F3D0] pt-6">{{ $t('common.copyright') }}</div>
    </footer>
  </div>
</template>

<script setup>
import { inject, ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import ProfileMenu from '../components/ProfileMenu.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

import dogAvatar from '../assets/avatars/dog.png'
import catAvatar from '../assets/avatars/cat.png'
import rabbitAvatar from '../assets/avatars/rabbit.png'
import bearAvatar from '../assets/avatars/bear.png'
import birdAvatar from '../assets/avatars/bird.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isDarkMode = inject('isDarkMode')
const authStore = useAuthStore()
const isSaving = ref(false)

// รายการอวตารสัตว์ 5 ตัว (เหมือนในหน้า RegisterView.vue)
const avatarOptions = computed(() => ([
  { id: 'avatar_dog', label: t('profile.avatarDog'), src: dogAvatar },
  { id: 'avatar_cat', label: t('profile.avatarCat'), src: catAvatar },
  { id: 'avatar_rabbit', label: t('profile.avatarRabbit'), src: rabbitAvatar },
  { id: 'avatar_bear', label: t('profile.avatarBear'), src: bearAvatar },
  { id: 'avatar_bird', label: t('profile.avatarBird'), src: birdAvatar },
]))

const normalizeAvatarId = (value) => {
  if (typeof value === 'string' && avatarOptions.value.some((item) => item.id === value)) {
    return value
  }
  return 'avatar_dog'
}

const form = ref({
  name: authStore.user?.name || authStore.user?.username || authStore.displayName || t('auth.defaultUser'),
  email: authStore.user?.email || authStore.userEmail || 'user@example.com',
  avatar: normalizeAvatarId(authStore.user?.avatar || authStore.user?.avatarUrl)
})

const selectedAvatarObj = computed(() => {
  return avatarOptions.value.find((item) => item.id === form.value.avatar) || avatarOptions.value[0]
})

const selectAvatar = (avatarId) => {
  form.value.avatar = avatarId
}

const saveProfile = async () => {
  if (isSaving.value) return
  isSaving.value = true
  try {
    const result = await authStore.updateUserProfile({
      name: form.value.name.trim(),
      username: form.value.name.trim(),
      email: form.value.email.trim(),
      avatar: form.value.avatar,
      avatarUrl: form.value.avatar
    })

    if (result?.success === false) {
      alert(result.message || t('auth.profileUpdateFailed'))
      return
    }

    alert(t('auth.profileSaved'))
  } finally {
    isSaving.value = false
  }
}

const cancelEdit = () => {
  const currentUser = authStore.user || {}
  form.value = {
    name: currentUser.name || currentUser.username || authStore.displayName || t('auth.defaultUser'),
    email: currentUser.email || authStore.userEmail || 'user@example.com',
    avatar: normalizeAvatarId(currentUser.avatar || currentUser.avatarUrl)
  }
}

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
  const sourceUser = storedUser || authStore.user || {}
  form.value = {
    name: sourceUser.name || sourceUser.username || sourceUser.email?.split('@')[0] || t('auth.defaultUser'),
    email: sourceUser.email || form.value.email,
    avatar: normalizeAvatarId(sourceUser.avatar || sourceUser.avatarUrl)
  }
})
</script>
