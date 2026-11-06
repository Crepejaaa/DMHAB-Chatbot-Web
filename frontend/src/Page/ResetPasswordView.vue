<template>
  <div :class="['page-dark-surface min-h-screen flex flex-col font-sans bg-[#FCFBF8] text-[#1E293B]', isDarkMode ? 'dark-mode-page' : '']">
    
    <!-- Header & Hero Section -->
    <div class="bg-gradient-to-r from-[#21776A] to-[#349E8D] text-white relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full">
          <path d="M0,50 Q25,80 50,50 T100,50" fill="none" stroke="white" stroke-width="0.5"/>
        </svg>
      </div>

      <!-- Top Navbar -->
      <div class="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <div class="flex items-center gap-4">
          <router-link to="/login" class="hover:bg-white/20 p-2 rounded-full transition" title="กลับไปหน้าเข้าสู่ระบบ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
        </div>

        <div class="flex items-center gap-2.5 cursor-default">
          <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-7 h-7 object-contain rounded-full" />
          <span class="text-xl font-bold tracking-wide text-white">PhuenJaiZone</span>
        </div>
      </div>

      <!-- Hero Title -->
      <div class="container mx-auto px-10 pt-10 pb-28 relative z-10">
        <div class="border-l-4 border-white pl-4">
          <h1 class="text-3xl font-bold mb-2">ตั้งรหัสผ่านใหม่</h1>
          <p class="text-sm text-white/80 italic">"กำหนดรหัสผ่านใหม่เพื่อความปลอดภัยของบัญชีคุณ"</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <main class="flex-1 container mx-auto px-4 -mt-20 relative z-20 pb-16 flex justify-center">
      <div class="bg-white rounded-[2rem] shadow-xl w-full max-w-lg pt-14 pb-10 px-8 sm:px-12 relative">
        
        <!-- ไอคอนแม่กุญแจด้านบน -->
        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F1F5F9] rounded-full border-4 border-white shadow-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-[#349E8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h2 class="text-center text-xl font-bold text-gray-800 mb-2">กำหนดรหัสผ่านใหม่</h2>
        <p class="text-center text-xs text-gray-500 mb-8 leading-relaxed">
          กรุณากรอกรหัสผ่านใหม่ความยาวอย่างน้อย 8 ตัวอักษร และยืนยันรหัสผ่านให้ตรงกัน
        </p>

        <!-- กรณีไม่พบ Token ใน URL -->
        <div v-if="!resetToken" class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
          <p class="text-sm font-semibold text-amber-700">
            ไม่พบรหัสยืนยัน (Token) สำหรับตั้งรหัสผ่านใหม่ หรือลิงก์ไม่สมบูรณ์
          </p>
          <router-link
            to="/forgot-password"
            class="inline-block px-5 py-2.5 bg-[#29CBAE] hover:bg-[#25B89D] text-white text-sm font-bold rounded-xl shadow-sm transition"
          >
            ขอรับลิงก์รีเซ็ตรหัสผ่านใหม่
          </router-link>
        </div>

        <form v-else @submit.prevent="handleConfirmReset" class="space-y-5">
          <!-- รหัสผ่านใหม่ -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">รหัสผ่านใหม่ (New Password)</label>
            <input
              v-model="newPassword"
              type="password"
              minlength="8"
              :disabled="isLoading"
              placeholder="กรอกรหัสผ่านใหม่ อย่างน้อย 8 ตัวอักษร"
              required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400 disabled:opacity-60"
            />
          </div>

          <!-- ยืนยันรหัสผ่านใหม่ -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">ยืนยันรหัสผ่านใหม่ (Confirm Password)</label>
            <input
              v-model="confirmPassword"
              type="password"
              minlength="8"
              :disabled="isLoading"
              placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
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
              :disabled="isLoading || !newPassword || !confirmPassword"
              :class="[
                'w-full font-bold py-3.5 px-4 rounded-xl shadow-md transition transform flex items-center justify-center gap-2',
                (isLoading || !newPassword || !confirmPassword)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                  : 'bg-[#29CBAE] hover:bg-[#25B89D] text-white active:scale-95 cursor-pointer'
              ]"
            >
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'กำลังบันทึกรหัสผ่านใหม่...' : 'บันทึกรหัสผ่านใหม่' }}</span>
            </button>
          </div>

          <!-- Back to Login Link -->
          <div class="text-center pt-3">
            <p class="text-sm text-gray-600">
              กลับไปยังหน้า
              <router-link to="/login" class="text-[#349E8D] font-bold hover:underline transition ml-1">
                เข้าสู่ระบบ
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
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">PhuenJaiZone</span>
          </div>
          <p class="text-white/70 text-xs leading-relaxed">
            ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ
          </p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Services</h4>
          <ul class="space-y-2 text-white/80 text-xs">
            <li><a href="#" class="hover:text-white">Daily Check-in</a></li>
            <li><a href="#" class="hover:text-white">Personalized Feedback</a></li>
            <li><router-link to="/blog" class="hover:text-white">Self-Care Resource Library</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Contact</h4>
          <ul class="space-y-2 text-white/80 text-xs">
            <li class="flex items-center gap-2">📞 +66 234 567</li>
            <li class="flex items-center gap-2">✉️ PhuenJaiZone@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Hotline</h4>
          <p class="text-white/80 text-xs">1323 (สายด่วนสุขภาพจิต)</p>
        </div>
      </div>
      <div class="container mx-auto px-6 mt-8 pt-6 border-t border-white/20 text-center text-white/60 text-xs">
        <p>© PhuenJaiZone 2024. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../api/axios'

const route = useRoute()
const router = useRouter()
const isDarkMode = inject('isDarkMode', ref(false))

const resetToken = computed(() => {
  const qToken = route.query.token
  const pToken = route.params.token
  const raw = Array.isArray(qToken) ? qToken[0] : (qToken || pToken || '')
  return typeof raw === 'string' ? raw.trim() : ''
})

const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleConfirmReset = async () => {
  if (isLoading.value) return
  errorMessage.value = ''
  successMessage.value = ''

  if (!resetToken.value) {
    errorMessage.value = 'ไม่พบรหัสยืนยัน (Token) กรุณาคลิกลิงก์จากอีเมลใหม่อีกครั้ง'
    return
  }

  if (newPassword.value.length < 8) {
    errorMessage.value = 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน'
    return
  }

  isLoading.value = true
  try {
    const response = await axios.post('/api/auth/reset-password', {
      token: resetToken.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value
    })

    const msg = response.data?.message || 'ตั้งรหัสผ่านใหม่สำเร็จ กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่ของคุณ'
    successMessage.value = msg
    alert(msg)
    router.push('/login')
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว กรุณาขอรีเซ็ตรหัสผ่านใหม่อีกครั้ง'
    errorMessage.value = errMsg
    alert(errMsg)
  } finally {
    isLoading.value = false
  }
}
</script>

