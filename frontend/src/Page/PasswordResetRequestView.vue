<template>
  <main class="min-h-screen bg-[#FCFBF8] text-[#1E293B]">
    <header class="bg-gradient-to-r from-[#21776A] to-[#349E8D] px-6 py-5 text-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between">
        <router-link to="/forgot-password" class="rounded-full p-2 transition hover:bg-white/20" aria-label="กลับไปหน้าลืมรหัสผ่าน">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div class="flex items-center gap-2.5">
          <img src="/phuenjaizone-logo.jpg" alt="" class="h-7 w-7 rounded-full object-contain" />
          <span class="text-xl font-bold tracking-wide">PhuenJaiZone</span>
        </div>
      </div>
      <div class="mx-auto max-w-6xl border-l-4 border-white py-2 pl-4 sm:my-10">
        <h1 class="text-3xl font-bold">สถานะคำร้องรีเซ็ตรหัสผ่าน</h1>
        <p class="mt-1 text-sm text-white/80">ตรวจสอบผลการพิจารณาจากแอดมิน</p>
      </div>
    </header>

    <section class="mx-auto -mt-8 max-w-lg px-4 pb-16">
      <div class="rounded-[2rem] bg-white px-7 py-10 shadow-xl sm:px-12">
        <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full" :class="status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : status === 'REJECTED' ? 'bg-rose-50 text-rose-600' : 'bg-[#E8F7F4] text-[#218F80]'">
          <svg v-if="status === 'APPROVED'" class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 class="text-center text-xl font-bold">{{ statusTitle }}</h2>
        <p class="mt-2 text-center text-sm leading-relaxed text-gray-500">{{ statusMessage }}</p>
        <p v-if="lastChecked" class="mt-3 text-center text-xs text-gray-400">
          ตรวจสอบล่าสุด {{ lastChecked.toLocaleTimeString('th-TH') }}
        </p>

        <p v-if="errorMessage" role="alert" class="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{{ errorMessage }}</p>

        <button
          v-if="status === 'APPROVED'"
          type="button"
          :disabled="isLoading"
          class="mt-7 w-full rounded-xl bg-[#29CBAE] px-4 py-3.5 font-bold text-white shadow-md transition hover:bg-[#25B89D] disabled:cursor-wait disabled:opacity-60"
          @click="startPasswordReset"
        >
          {{ isLoading ? 'กำลังเตรียม...' : 'ไปตั้งรหัสผ่านใหม่' }}
        </button>
        <button
          v-else-if="status === 'PENDING'"
          type="button"
          :disabled="isLoading"
          class="mt-7 w-full rounded-xl border border-[#29CBAE] px-4 py-3 font-bold text-[#218F80] transition hover:bg-emerald-50 disabled:opacity-60"
          @click="checkStatus"
        >
          {{ isLoading ? 'กำลังตรวจสอบ...' : 'ตรวจสอบสถานะตอนนี้' }}
        </button>
        <router-link v-else to="/forgot-password" class="mt-7 inline-flex w-full justify-center rounded-xl border border-gray-200 px-4 py-3 font-bold text-gray-600 hover:bg-gray-50">
          ส่งคำร้องใหม่
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'

const router = useRouter()
const requestId = sessionStorage.getItem('passwordResetRequestId')
const requestToken = sessionStorage.getItem('passwordResetRequestToken')
const status = ref('PENDING')
const lastChecked = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
let pollingTimer

const statusTitle = computed(() => {
  if (status.value === 'APPROVED') return 'แอดมินอนุมัติคำขอแล้ว'
  if (status.value === 'REJECTED') return 'คำขอไม่ได้รับการอนุมัติ'
  if (status.value === 'COMPLETED') return 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว'
  return 'ส่งคำร้องให้แอดมินแล้ว'
})

const statusMessage = computed(() => {
  if (status.value === 'APPROVED') return 'การยืนยันรีเซ็ตรหัสผ่านได้รับแล้ว คุณสามารถไปตั้งรหัสผ่านใหม่ได้ทันที'
  if (status.value === 'REJECTED') return 'แอดมินยังไม่สามารถอนุมัติคำขอนี้ได้ หากคิดว่าเกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ'
  if (status.value === 'COMPLETED') return 'ตั้งรหัสผ่านใหม่สำเร็จแล้ว กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่'
  return 'คำร้องกำลังรอแอดมินตรวจสอบ หน้านี้จะตรวจสอบสถานะให้อัตโนมัติ'
})

const checkStatus = async () => {
  if (!requestId || !requestToken || isLoading.value) return
  isLoading.value = true
  try {
    const { data } = await axios.get(`/api/password-reset-requests/${requestId}/status`, {
      headers: { 'X-Reset-Request-Token': requestToken },
    })
    status.value = data.status
    if (data.status !== 'PENDING') clearInterval(pollingTimer)
    lastChecked.value = new Date()
    errorMessage.value = ''
  } catch (error) {
    console.error('Could not load reset request status:', error)
    errorMessage.value = error.response?.data?.error || 'ตรวจสอบสถานะไม่สำเร็จ กรุณาลองอีกครั้ง'
  } finally {
    isLoading.value = false
  }
}

const startPasswordReset = async () => {
  if (!requestId || !requestToken || isLoading.value) return
  isLoading.value = true
  errorMessage.value = ''
  try {
    const { data } = await axios.post(`/api/password-reset-requests/${requestId}/reset-token`, null, {
      headers: { 'X-Reset-Request-Token': requestToken },
    })
    sessionStorage.setItem('passwordResetToken', data.resetToken)
    await router.push('/reset-password')
  } catch (error) {
    console.error('Could not start password reset:', error)
    errorMessage.value = error.response?.data?.error || 'ไม่สามารถเริ่มตั้งรหัสผ่านใหม่ได้'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (!requestId || !requestToken) {
    router.replace('/forgot-password')
    return
  }
  checkStatus()
  pollingTimer = setInterval(checkStatus, 15000)
})

onUnmounted(() => clearInterval(pollingTimer))
</script>
