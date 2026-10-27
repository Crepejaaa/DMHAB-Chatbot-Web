<template>
  <main class="min-h-screen bg-[#FCFBF8] text-[#1E293B]">
    <header class="bg-gradient-to-r from-[#21776A] to-[#349E8D] px-6 py-5 text-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between">
        <router-link to="/login" class="rounded-full p-2 transition hover:bg-white/20" aria-label="กลับไปเข้าสู่ระบบ">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div class="flex items-center gap-2.5">
          <img src="/phuenjaizone-logo.jpg" alt="" class="h-7 w-7 rounded-full object-contain" />
          <span class="text-xl font-bold tracking-wide">PhuenJaiZone</span>
        </div>
      </div>
      <div class="mx-auto max-w-6xl border-l-4 border-white py-2 sm:my-10">
        <h1 class="text-3xl font-bold">ตั้งรหัสผ่านใหม่</h1>
        <p class="mt-1 text-sm text-white/80">ตั้งรหัสผ่านใหม่เพื่อกลับเข้าใช้งานบัญชี</p>
      </div>
    </header>

    <section class="mx-auto -mt-8 max-w-lg px-4 pb-16">
      <div class="rounded-[2rem] bg-white px-7 py-10 shadow-xl sm:px-12">
        <template v-if="!isComplete">
          <h2 class="text-center text-xl font-bold">สร้างรหัสผ่านใหม่</h2>
          <p class="mt-2 text-center text-sm text-gray-500">รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร</p>

          <form class="mt-8 space-y-5" @submit.prevent="submitNewPassword">
            <div>
              <label for="new-password" class="mb-1 block text-sm font-bold text-gray-700">รหัสผ่านใหม่</label>
              <input
                id="new-password"
                v-model="password"
                type="password"
                autocomplete="new-password"
                minlength="8"
                required
                class="w-full rounded-xl border border-gray-200 bg-[#F1F5F9] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#349E8D]"
              />
            </div>
            <div>
              <label for="confirm-password" class="mb-1 block text-sm font-bold text-gray-700">ยืนยันรหัสผ่านใหม่</label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                autocomplete="new-password"
                minlength="8"
                required
                class="w-full rounded-xl border border-gray-200 bg-[#F1F5F9] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#349E8D]"
              />
            </div>
            <p v-if="errorMessage" role="alert" class="text-sm text-rose-600">{{ errorMessage }}</p>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full rounded-xl bg-[#29CBAE] px-4 py-3.5 font-bold text-white shadow-md transition hover:bg-[#25B89D] disabled:cursor-wait disabled:opacity-60"
            >
              {{ isLoading ? 'กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่' }}
            </button>
          </form>
        </template>
        <div v-else class="text-center">
          <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-xl font-bold">เปลี่ยนรหัสผ่านสำเร็จ</h2>
          <p class="mt-2 text-sm text-gray-500">เข้าสู่ระบบด้วยรหัสผ่านใหม่ได้เลย</p>
          <router-link to="/login" class="mt-6 inline-flex w-full justify-center rounded-xl bg-[#29CBAE] px-4 py-3.5 font-bold text-white shadow-md transition hover:bg-[#25B89D]">
            กลับไปเข้าสู่ระบบ
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'

const router = useRouter()
const resetToken = sessionStorage.getItem('passwordResetToken') || ''
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const isComplete = ref(false)
const errorMessage = ref('')

onMounted(() => {
  if (!resetToken) router.replace('/forgot-password')
})

const submitNewPassword = async () => {
  if (isLoading.value) return
  errorMessage.value = ''
  if (password.value.length < 8) {
    errorMessage.value = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'รหัสผ่านทั้งสองช่องไม่ตรงกัน'
    return
  }

  isLoading.value = true
  try {
    await axios.post('/api/reset-password', { resetToken, password: password.value })
    sessionStorage.removeItem('passwordResetToken')
    sessionStorage.removeItem('passwordResetRequestId')
    sessionStorage.removeItem('passwordResetRequestToken')
    isComplete.value = true
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'ตั้งรหัสผ่านใหม่ไม่สำเร็จ กรุณาส่งคำร้องใหม่'
  } finally {
    isLoading.value = false
  }
}
</script>
