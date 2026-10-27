<template>
  <div v-if="authStore.isAuthenticated" class="relative">
    <button
      type="button"
      :class="variant === 'admin'
        ? 'relative flex min-h-11 items-center gap-2 rounded-xl border border-teal-800 bg-teal-800 px-4 text-white shadow-md transition hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
        : 'relative flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20'"
      aria-label="การแจ้งเตือน"
      :aria-expanded="isOpen"
      @click="toggleNotifications"
    >
      <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span v-if="variant === 'admin'" class="text-sm font-bold">การแจ้งเตือน</span>
      <span v-if="unreadCount" class="absolute -right-2 -top-2 min-w-5 rounded-full border-2 border-white bg-rose-600 px-1 text-center text-[10px] font-bold leading-4 text-white shadow">
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <section v-if="isOpen" class="absolute right-0 z-[150] mt-3 w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white text-left text-gray-800 shadow-2xl">
      <header class="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 class="font-bold">การแจ้งเตือน</h2>
        <button type="button" class="text-xs font-semibold text-teal-700 hover:underline" :disabled="isLoading" @click="fetchNotifications">
          รีเฟรช
        </button>
      </header>

      <p v-if="errorMessage" role="alert" class="m-3 rounded-lg bg-rose-50 p-3 text-xs text-rose-700">{{ errorMessage }}</p>
      <p v-if="isLoading && !notifications.length" class="px-4 py-8 text-center text-sm text-gray-500">กำลังโหลด...</p>
      <p v-else-if="!isLoading && !errorMessage && !notifications.length" class="px-4 py-8 text-center text-sm text-gray-500">ยังไม่มีการแจ้งเตือน</p>

      <ul v-else class="max-h-[min(70vh,30rem)] divide-y divide-gray-100 overflow-y-auto">
        <li v-for="item in notifications" :key="item.id" class="px-4 py-3" :class="{ 'bg-teal-50/50': !item.readAt }">
          <div class="flex gap-2">
            <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full" :class="item.readAt ? 'bg-gray-300' : 'bg-teal-500'"></span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold">{{ item.title }}</p>
              <p class="mt-1 break-words text-xs leading-relaxed text-gray-600">{{ item.message }}</p>
              <p v-if="isAdmin && item.passwordResetRequest?.user" class="mt-1 text-xs text-gray-500">
                บัญชี: {{ item.passwordResetRequest.user.username }} · {{ item.passwordResetRequest.user.email }}
              </p>

              <div v-if="isAdmin && item.type === 'PASSWORD_RESET_REQUEST' && item.passwordResetRequest?.status === 'PENDING'" class="mt-3 flex flex-wrap gap-2">
                <p class="mb-1 w-full text-xs leading-relaxed text-amber-700">
                  ก่อนอนุมัติ กรุณายืนยันตัวตนกับเจ้าของบัญชีผ่านช่องทางอื่น ผู้ส่งคำร้องจะสามารถตั้งรหัสผ่านใหม่ได้
                </p>
                <button
                  type="button"
                  :disabled="busyNotificationId === item.id"
                  class="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                  @click="reviewRequest(item, 'APPROVED')"
                >
                  {{ busyNotificationId === item.id ? 'กำลังบันทึก...' : 'อนุมัติ' }}
                </button>
                <button
                  type="button"
                  :disabled="busyNotificationId === item.id"
                  class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                  @click="reviewRequest(item, 'REJECTED')"
                >
                  ไม่อนุมัติ
                </button>
              </div>
              <button
                v-else-if="!isAdmin && item.type === 'PASSWORD_RESET_APPROVED' && item.passwordResetRequest?.status === 'APPROVED'"
                type="button"
                :disabled="busyNotificationId === item.id"
                class="mt-3 rounded-lg bg-teal-600 px-3 py-2 text-xs font-bold text-white hover:bg-teal-700 disabled:opacity-50"
                @click="startResetFromNotification(item)"
              >
                {{ busyNotificationId === item.id ? 'กำลังเตรียม...' : 'ไปตั้งรหัสผ่านใหม่' }}
              </button>
              <button
                v-if="!item.readAt"
                type="button"
                class="mt-2 block text-[11px] font-semibold text-gray-500 hover:text-teal-700"
                @click="markAsRead(item)"
              >
                ทำเครื่องหมายว่าอ่านแล้ว
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: value => ['default', 'admin'].includes(value),
  },
})
const variant = props.variant
const isAdmin = computed(() => authStore.user?.role === 'ADMIN')
const notifications = ref([])
const unreadCount = computed(() => notifications.value.filter(item => !item.readAt).length)
const isOpen = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const busyNotificationId = ref(null)
let refreshTimer

const fetchNotifications = async () => {
  if (!authStore.isAuthenticated) return
  isLoading.value = true
  try {
    const { data } = await axios.get('/api/notifications')
    if (!Array.isArray(data)) throw new Error('รูปแบบการแจ้งเตือนไม่ถูกต้อง')
    notifications.value = data
    errorMessage.value = ''
  } catch (error) {
    console.error('Could not load notifications:', error)
    errorMessage.value = error.response?.data?.error
      || (error.response ? `โหลดการแจ้งเตือนไม่สำเร็จ (HTTP ${error.response.status})` : 'เชื่อมต่อ API ไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ต')
  } finally {
    isLoading.value = false
  }
}

const toggleNotifications = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) await fetchNotifications()
}

const markAsRead = async (item) => {
  try {
    await axios.patch(`/api/notifications/${item.id}/read`)
    item.readAt = new Date().toISOString()
  } catch (error) {
    console.error('Could not mark notification as read:', error)
    errorMessage.value = error.response?.data?.error || 'อัปเดตการแจ้งเตือนไม่สำเร็จ'
  }
}

const reviewRequest = async (item, decision) => {
  const requestId = item.passwordResetRequest?.id
  if (!requestId || busyNotificationId.value) return
  if (
    decision === 'APPROVED' &&
    !window.confirm('กรุณายืนยันตัวตนของผู้ใช้ผ่านช่องทางอื่นก่อนอนุมัติ เพราะผู้ส่งคำร้องจะสามารถตั้งรหัสผ่านใหม่ได้')
  ) return
  busyNotificationId.value = item.id
  errorMessage.value = ''
  try {
    await axios.patch(`/api/admin/password-reset-requests/${requestId}`, { decision })
    await fetchNotifications()
  } catch (error) {
    console.error('Could not review password reset request:', error)
    errorMessage.value = error.response?.data?.error || 'บันทึกผลการพิจารณาไม่สำเร็จ'
  } finally {
    busyNotificationId.value = null
  }
}

const startResetFromNotification = async (item) => {
  busyNotificationId.value = item.id
  errorMessage.value = ''
  try {
    const { data } = await axios.post(`/api/notifications/${item.id}/reset-token`)
    sessionStorage.setItem('passwordResetToken', data.resetToken)
    await router.push('/reset-password')
  } catch (error) {
    console.error('Could not start password reset:', error)
    errorMessage.value = error.response?.data?.error || 'เริ่มตั้งรหัสผ่านใหม่ไม่สำเร็จ'
  } finally {
    busyNotificationId.value = null
  }
}

onMounted(() => {
  fetchNotifications()
  refreshTimer = setInterval(fetchNotifications, 30000)
})

onUnmounted(() => clearInterval(refreshTimer))
</script>
