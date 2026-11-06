<template>
  <div :class="['page-dark-surface min-h-screen flex flex-col font-sans bg-[#FCFBF8] text-[#1E293B]', isDarkMode ? 'dark-mode-page' : '']">
    
    <!-- Header & Hero Section (ส่วนแถบสีเขียวด้านบน) -->
    <div class="bg-gradient-to-r from-[#21776A] to-[#349E8D] text-white relative overflow-hidden">
      <!-- Background decorative line (จำลองเส้นโค้ง) -->
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full">
          <path d="M0,50 Q25,80 50,50 T100,50" fill="none" stroke="white" stroke-width="0.5"/>
        </svg>
      </div>

      <!-- Top Navbar -->
      <div class="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        
        <!-- ฝั่งซ้าย: ปุ่ม Back (ย้อนกลับไปหน้า Home) -->
        <div class="flex items-center gap-4">
          <router-link to="/" class="hover:bg-white/20 p-2 rounded-full transition" :title="$t('forgotPassword.backHome')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
        </div>

        <!-- ฝั่งขวา: โลโก้ และ PhuenJaiZone -->
        <div class="flex items-center gap-2.5 cursor-default">
          <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-7 h-7 object-contain rounded-full" />
          <span class="text-xl font-bold tracking-wide text-white">{{ $t('common.brand') }}</span>
        </div>
      </div>

      <!-- Hero Title -->
      <div class="container mx-auto px-10 pt-10 pb-28 relative z-10">
        <div class="border-l-4 border-white pl-4">
          <h1 class="text-3xl font-bold mb-2">{{ $t('forgotPassword.title') }}</h1>
          <p class="text-sm text-white/80 italic">{{ $t('forgotPassword.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <main class="flex-1 container mx-auto px-4 -mt-20 relative z-20 pb-16 flex justify-center">
      <div class="bg-white rounded-[2rem] shadow-xl w-full max-w-lg pt-14 pb-10 px-8 sm:px-12 relative">
        
        <!-- รูปไอคอนแม่กุญแจ/กุญแจ (ด้านบนกึ่งกลางฟอร์ม) -->
        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F1F5F9] rounded-full border-4 border-white shadow-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-[#349E8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h2 class="text-center text-xl font-bold text-gray-800 mb-2">{{ $t('forgotPassword.cardTitle') }}</h2>
        <p class="text-center text-xs text-gray-500 mb-8 leading-relaxed">
          {{ $t('forgotPassword.description') }}
        </p>

        <form @submit.prevent="handleResetPassword" class="space-y-5">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">{{ $t('forgotPassword.email') }}</label>
            <input 
              v-model="email" 
              type="email" 
              :disabled="isLoading"
              :placeholder="$t('forgotPassword.emailPlaceholder')" 
              required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400 disabled:opacity-60" 
            />
          </div>

          <!-- แจ้งเตือนสำเร็จ -->
          <div v-if="successMessage" class="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-center">
            <p class="text-sm font-semibold text-[#0D9488]">{{ successMessage }}</p>
          </div>

          <!-- แจ้งเตือนข้อผิดพลาด -->
          <div v-if="errorMessage" class="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-center">
            <p class="text-sm font-semibold text-rose-600">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isLoading || !email.trim()"
              :class="[
                'w-full font-bold py-3.5 px-4 rounded-xl shadow-md transition transform flex items-center justify-center gap-2',
                (isLoading || !email.trim())
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                  : 'bg-[#29CBAE] hover:bg-[#25B89D] text-white active:scale-95 cursor-pointer'
              ]"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'กำลังส่งลิงก์รีเซ็ตรหัสผ่าน...' : $t('forgotPassword.submit') }}</span>
            </button>
          </div>
          
          <!-- Back to Login Link -->
          <div class="text-center pt-3">
            <p class="text-sm text-gray-600">
              {{ $t('forgotPassword.remembered') }} 
              <router-link to="/login" class="text-[#349E8D] font-bold hover:underline transition ml-1">
                {{ $t('forgotPassword.backToLogin') }}
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </main>

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
          <p class="text-white/70 text-xs leading-relaxed">
            {{ $t('blog.footer.taglineLong') }}
          </p>
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
          <router-link to="/admin" class="font-bold mb-4 block hover:underline">{{ $t('common.footerHotline') }}</router-link>
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
import { ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from '../api/axios'

const { t } = useI18n()

const isDarkMode = inject('isDarkMode', ref(false))

const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleResetPassword = async () => {
  if (isLoading.value || !email.value.trim()) return

  isLoading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await axios.post('/api/auth/forgot-password', {
      email: email.value.trim()
    })

    const msg = response.data?.message || 'ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณเรียบร้อยแล้ว'
    successMessage.value = msg
    alert(msg)
    email.value = ''
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.message ||
      t('forgotPassword.genericError') ||
      'ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้ กรุณาลองใหม่อีกครั้ง'
    errorMessage.value = errMsg
    alert(errMsg)
  } finally {
    isLoading.value = false
  }
}
</script>
