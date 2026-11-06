<template>
  <div :class="['login-page register-page page-dark-surface min-h-screen flex flex-col font-sans bg-[#FCFBF8] text-[#1E293B]', isDarkMode ? 'dark-mode-page' : '']">

    <!-- Header & Hero Section (ส่วนแถบสีเขียวด้านบน) -->
    <div class="bg-gradient-to-r from-[#21776A] to-[#349E8D] text-white relative overflow-hidden">
      <!-- Background decorative line (จำลองเส้นโค้ง) -->
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full">
          <path d="M0,50 Q25,80 50,50 T100,50" fill="none" stroke="white" stroke-width="0.5" />
        </svg>
      </div>
  
      <!-- Top Navbar -->
      <div class="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">

        <!-- ฝั่งซ้าย: ปุ่ม Back (ย้อนกลับ) -->
        <div class="flex items-center gap-4">
          <button 
            @click="$router.back()" 
            class="hover:bg-white/20 p-2 rounded-full transition text-white" 
            :title="$t('register.back')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        <!-- ฝั่งขวา: โลโก้ และ PhuenJaiZone -->
        <div class="flex items-center gap-2.5 cursor-default">
          <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-10 h-10 object-contain rounded-full" />
          <span class="text-xl font-bold tracking-wide text-white">{{ $t('common.brand') }}</span>
        </div>

      </div>

      <!-- Hero Title -->
      <div class="container mx-auto px-10 pt-10 pb-28 relative z-10">
        <div class="border-l-4 border-white pl-4">
          <h1 class="text-3xl font-bold mb-2">{{ $t('register.title') }}</h1>
          <p class="text-sm text-white/80 italic">{{ $t('register.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <main class="flex-1 container mx-auto px-4 -mt-20 relative z-20 pb-16 flex justify-center">
      <div class="bg-white rounded-[2rem] shadow-xl w-full max-w-lg pt-16 pb-10 px-8 sm:px-12 relative">

        <!-- วงกลมใหญ่ด้านบนสุด แสดงอวตารสัตว์ที่เลือก (แทนไอคอนกล้องเดิม) -->
        <div
          class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#F1F5F9] rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden transition-all duration-300"
          :title="selectedAvatarObj?.label || $t('register.yourAvatar')"
        >
          <img
            v-if="selectedAvatarObj"
            :src="selectedAvatarObj.src"
            :alt="selectedAvatarObj.label"
            class="w-full h-full object-cover transition-transform duration-300"
          />
        </div>

        <h2 class="text-center text-xl font-bold text-gray-800 mb-3">{{ $t('register.title') }}</h2>

        <!-- พื้นที่เลือก Avatar สัตว์น่ารัก 5 ตัว (Animal Avatar Selector) -->
        <div class="mb-6">
          <p class="text-center text-xs font-semibold text-gray-500 mb-3">
            {{ $t('register.avatarPrompt', { label: selectedAvatarObj?.label }) }}
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
                  ? 'ring-4 ring-[#29CBAE] ring-offset-2 scale-110 shadow-md'
                  : 'opacity-75 hover:opacity-100 hover:scale-105 ring-1 ring-gray-200'
              ]"
            >
              <img :src="item.src" :alt="item.label" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">{{ $t('register.name') }}</label>
            <input v-model="form.name" type="text" :placeholder="$t('register.namePlaceholder')" required
              class="login-field register-field w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">{{ $t('register.email') }}</label>
            <input v-model="form.email" type="email" :placeholder="$t('register.emailPlaceholder')" required
              class="login-field register-field w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">{{ $t('register.password') }}</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('register.passwordPlaceholder')"
                required
                minlength="8"
                class="login-field register-field w-full rounded-xl pl-4 pr-11 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                :title="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
                :aria-label="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-[#21776A] transition-colors cursor-pointer focus:outline-none"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">{{ $t('register.confirmPassword') }}</label>
            <div class="relative">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :placeholder="$t('register.confirmPlaceholder')"
                required
                class="login-field register-field w-full rounded-xl pl-4 pr-11 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                :title="showConfirmPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
                :aria-label="showConfirmPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
                class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-[#21776A] transition-colors cursor-pointer focus:outline-none"
              >
                <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-center pt-2">
            <p class="text-sm font-bold text-red-500">{{ errorMessage }}</p>
          </div>

          <!-- 📍 Checkbox ยอมรับเงื่อนไขการใช้งาน (คลิกกล่องหรือข้อความเพื่อเปิด Modal เสมอ ยกเว้นติ๊กถูกอยู่แล้วจะกดเอาออกได้) -->
          <div class="flex items-center gap-2.5 mt-4">
            <input 
              type="checkbox" 
              id="terms" 
              :checked="form.acceptTerms" 
              @click.prevent="handleTermsCheckboxClick"
              class="h-4 w-4 accent-[#0D9488] text-teal-600 focus:ring-teal-500 border-gray-300 rounded transition-all cursor-pointer shrink-0"
            />
            <a
              href="#"
              @click.prevent="openTermsModal"
              class="text-sm text-[#21776A] hover:text-[#045F54] underline underline-offset-4 decoration-[#349E8D] cursor-pointer font-semibold select-none transition-colors"
            >
              {{ $t('register.acceptTerms') }}
            </a>
          </div>

          <!-- Google reCAPTCHA v2 (แบบ Checkbox) -->
          <div class="flex justify-center pt-2">
            <VueRecaptcha
              ref="recaptchaWidget"
              :sitekey="siteKey"
              :load-recaptcha-script="true"
              @verify="onRecaptchaVerify"
              @expired="onRecaptchaExpired"
              @error="onRecaptchaError"
            />
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button 
              type="submit"
              :disabled="!recaptchaToken || isLoading"
              :class="[
                'w-full font-bold py-3.5 px-4 rounded-xl shadow-md transition transform flex items-center justify-center gap-2',
                (!recaptchaToken || isLoading)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                  : 'bg-[#29CBAE] hover:bg-[#25B89D] text-white active:scale-95 cursor-pointer'
              ]"
            >
              <span v-if="isLoading">{{ $t('register.registering') }}</span>
              <span v-else>{{ $t('register.title') }}</span>
            </button>
          </div>
        </form>
      </div>
    </main>

    <!-- Overlay Modal แสดงรายละเอียดเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว -->
    <Transition name="terms-modal">
      <div
        v-if="showTermsModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-[2px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click.self="closeTermsModal"
      >
        <div class="bg-white rounded-[1.75rem] px-6 pt-7 pb-6 text-left overflow-hidden shadow-2xl w-full max-w-lg border border-gray-100">
          <!-- Icon โล่สีเขียวมิ้นต์ด้านบน -->
          <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-[#CCFBF1]">
            <svg class="h-7 w-7 text-[#0D9488]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.033C3.12 6.516 3 7.248 3 8c0 5.525 3.797 10.269 9 11.622 0-.752-.12-1.484-.382-2.016z" />
            </svg>
          </div>

          <!-- หัวข้อ Modal -->
          <div class="mt-4 text-center">
            <h3 class="text-xl font-extrabold text-[#1E293B]" id="modal-title">
              {{ $t('register.modal.title') }}
            </h3>

            <!-- กล่องเนื้อหาเงื่อนไข (Scrollable) -->
            <div class="mt-4 text-sm text-gray-600 bg-[#F8FAFC] p-4 rounded-2xl text-left border border-gray-200 max-h-64 overflow-y-auto space-y-3 leading-relaxed">
              <p class="font-bold text-[#1E293B]">{{ $t('register.modal.intro') }}</p>
              <p class="font-medium text-gray-700">{{ $t('register.modal.privacyHeading') }}</p>
              <ul class="list-disc list-inside text-xs sm:text-sm space-y-1.5 text-gray-600 pl-1">
                <li>{{ $t('register.modal.privacy1') }}</li>
                <li>{{ $t('register.modal.privacy2') }}</li>
                <li>{{ $t('register.modal.privacy3') }}</li>
              </ul>
              <p class="font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs sm:text-sm leading-relaxed">
                {{ $t('register.modal.disclaimer') }}
              </p>
              <p class="text-xs sm:text-sm text-gray-700">
                {{ $t('register.modal.emergency') }}
              </p>
            </div>
          </div>

          <!-- ปุ่มด้านล่าง: 'ปิด' (ซ้าย) และ 'ยอมรับ' (ขวา) -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <button 
              type="button" 
              class="w-full inline-flex justify-center items-center rounded-full border border-gray-300 shadow-xs px-5 py-2.5 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D9488] cursor-pointer transition"
              @click="closeTermsModal"
            >
              {{ $t('register.modal.close') }}
            </button>
            <button 
              type="button" 
              class="w-full inline-flex justify-center items-center rounded-full border border-transparent shadow-sm px-5 py-2.5 bg-[#0D9488] hover:bg-[#045F54] text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D9488] cursor-pointer transition"
              @click="acceptAndClose"
            >
              {{ $t('register.modal.accept') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-[#21776A] to-[#349E8D] text-white py-10 text-sm">
      <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <!-- โลโก้ Footer -->
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">{{ $t('common.brand') }}</span>
          </div>
          <p class="text-white/70 text-xs leading-relaxed">{{ $t('common.footerDesc') }}</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">{{ $t('common.footerServices') }}</h4>
          <ul class="space-y-2 text-white/80 text-xs">
            <li><a href="#" class="hover:text-white">{{ $t('common.footerCheckin') }}</a></li>
            <li><a href="#" class="hover:text-white">{{ $t('common.footerService2') }}</a></li>
            <li><router-link to="/blog" class="hover:text-white">{{ $t('common.footerService3') }}</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">{{ $t('common.footerContact') }}</h4>
          <ul class="space-y-2 text-white/80 text-xs">
            <li class="flex items-center gap-2">📞 +66 234 567</li>
            <li class="flex items-center gap-2">✉️ PhuenJaiZone@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">{{ $t('common.footerHotline') }}</h4>
          <p class="text-white/80 text-xs">{{ $t('blog.footer.hotlineLine') }}</p>
        </div>
      </div>
      <div class="container mx-auto px-6 mt-8 pt-6 border-t border-white/20 text-center text-white/60 text-xs">
        <p>{{ $t('blog.footer.rightsAuth') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { VueRecaptcha } from 'vue-recaptcha'

import dogAvatar from '../assets/avatars/dog.png'
import catAvatar from '../assets/avatars/cat.png'
import rabbitAvatar from '../assets/avatars/rabbit.png'
import bearAvatar from '../assets/avatars/bear.png'
import birdAvatar from '../assets/avatars/bird.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const authStore = useAuthStore()
const isDarkMode = inject('isDarkMode', ref(false))
const isLoading = ref(false)

// รายการอวตารสัตว์ 5 ตัว
const avatarOptions = computed(() => ([
  { id: 'avatar_dog', label: t('register.avatars.dog'), src: dogAvatar },
  { id: 'avatar_cat', label: t('register.avatars.cat'), src: catAvatar },
  { id: 'avatar_rabbit', label: t('register.avatars.rabbit'), src: rabbitAvatar },
  { id: 'avatar_bear', label: t('register.avatars.bear'), src: bearAvatar },
  { id: 'avatar_bird', label: t('register.avatars.bird'), src: birdAvatar },
]))

// ตัวแปรและฟังก์ชันสำหรับ Google reCAPTCHA v2 (ดึงจาก Environment Variable เท่านั้น ไม่ใช้ Hardcode Fallback)
const siteKey = (import.meta.env.VITE_RECAPTCHA_SITE_KEY || '')
  .trim()
  .replace(/^["']|["']$/g, '')

console.log(
  'Current Site Key:',
  siteKey ? siteKey.substring(0, 5) + '...' + siteKey.slice(-5) : '(empty)'
)

const recaptchaToken = ref('')
const recaptchaWidget = ref(null)

const onRecaptchaVerify = (token) => {
  recaptchaToken.value = typeof token === 'string' ? token.trim() : ''
  errorMessage.value = ''
}

const onRecaptchaExpired = () => {
  recaptchaToken.value = ''
}

const onRecaptchaError = () => {
  recaptchaToken.value = ''
  errorMessage.value = t('register.errors.recaptcha')
}

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  avatar: 'avatar_dog'
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')

const selectedAvatarObj = computed(() => {
  return avatarOptions.value.find((item) => item.id === form.value.avatar) || avatarOptions.value[0]
})

const selectAvatar = (avatarId) => {
  form.value.avatar = avatarId
}

// ตัวแปรและฟังก์ชันสำหรับ Modal เงื่อนไขการใช้งาน
const showTermsModal = ref(false)

const openTermsModal = () => {
  showTermsModal.value = true
}

const handleTermsCheckboxClick = (event) => {
  // ข้อยกเว้น: หาก Checkbox ติ๊กถูกอยู่แล้ว ให้สามารถกดเอาเครื่องหมายถูกออก (Uncheck) ได้ตามปกติ
  if (form.value.acceptTerms) {
    form.value.acceptTerms = false
    if (event?.target) {
      event.target.checked = false
    }
    return
  }

  // หากยังไม่ได้ติ๊กถูก ห้ามติ๊กถูกเองโดยเด็ดขาด และบังคับเปิด Modal เงื่อนไขการใช้งานขึ้นมาเสมอ
  form.value.acceptTerms = false
  if (event?.target) {
    event.target.checked = false
  }
  openTermsModal()
}

const closeTermsModal = () => {
  showTermsModal.value = false
}

const acceptAndClose = () => {
  form.value.acceptTerms = true // วิธีเดียวที่ทำให้ Checkbox ติ๊กถูกได้ คือต้องกดปุ่ม "ยอมรับ" ใน Modal เท่านั้น
  errorMessage.value = ''
  showTermsModal.value = false
}

const handleRegister = async () => {
  if (isLoading.value) return
  errorMessage.value = ''
  
  // เช็กว่าผู้ใช้ยอมรับเงื่อนไขแล้วหรือยัง
  if (!form.value.acceptTerms) {
    errorMessage.value = t('register.errors.acceptTerms')
    return
  }

  // เช็กว่าผู้ใช้ติ๊ก reCAPTCHA หรือยัง
  const token = recaptchaToken.value?.trim()
  if (!token) {
    errorMessage.value = t('register.errors.needRecaptcha')
    return
  }

  // เช็กรหัสผ่าน
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = t('register.errors.passwordMismatch')
    return
  }

  const userData = {
    name: form.value.name.trim(),
    username: form.value.name.trim(),
    email: form.value.email.trim(),
    password: form.value.password,
    confirmPassword: form.value.confirmPassword,
    avatar: form.value.avatar,
    avatarUrl: form.value.avatar,
    recaptchaToken: token
  }

  isLoading.value = true
  try {
    const result = await authStore.register(userData)

    if (result.success) {
      alert(result.message)
      router.push('/login')
    } else {
      errorMessage.value = result.message
      // รีเซ็ต Token และ Widget หากเกิดข้อผิดพลาดในการสมัคร (เพราะ Token ของ Google ใช้ได้ครั้งเดียว)
      recaptchaToken.value = ''
      if (recaptchaWidget.value?.reset) {
        recaptchaWidget.value.reset()
      }
    }
  } finally {
    isLoading.value = false
  }
}
</script>
<style>
.register-page .register-field,
.register-page .register-field:focus {
  background-color: #f1f5f9 !important;
  color: #1e293b !important;
  -webkit-text-fill-color: #1e293b !important;
  border: none !important;
  color-scheme: light !important;
}

.register-page .register-field::placeholder {
  color: #94a3b8 !important;
  -webkit-text-fill-color: #94a3b8 !important;
  opacity: 1 !important;
}

.dark-mode .register-page .register-field,
.dark-mode .register-page .register-field:focus {
  background-color: #1e293b !important;
  color: #f8fafc !important;
  -webkit-text-fill-color: #f8fafc !important;
  border: 1px solid #64748b !important;
  color-scheme: dark !important;
}

.dark-mode .register-page .register-field::placeholder {
  color: #cbd5e1 !important;
  -webkit-text-fill-color: #cbd5e1 !important;
  opacity: 1 !important;
}

.terms-modal-enter-active,
.terms-modal-leave-active {
  transition: opacity 0.2s ease;
}

.terms-modal-enter-from,
.terms-modal-leave-to {
  opacity: 0;
}
</style>
