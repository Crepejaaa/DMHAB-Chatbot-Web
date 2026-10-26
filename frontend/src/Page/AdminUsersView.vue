<template>
  <div class="flex flex-col space-y-8">
    
    <!-- Top Bar -->
    <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
      <div>
        <h1 class="text-3xl font-extrabold text-[#1E293B] tracking-tight">จัดการผู้ใช้งาน</h1>
        <p class="text-sm text-gray-500">จัดการบัญชีผู้ใช้ที่ลงทะเบียนและปรับเปลี่ยนบทบาทในระบบ</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-400 font-mono">วันที่: {{ currentDate }}</span>
      </div>
    </header>

    <!-- User Accounts Table -->
    <section class="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 flex flex-col space-y-6">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-[#1E293B]">รายชื่อผู้ใช้งาน</h2>
          <p class="text-xs text-gray-500">ค้นหาและจัดการบัญชีผู้ใช้ทั้งหมดในระบบ</p>
        </div>
        <!-- Search bar -->
        <div class="relative w-full sm:w-64">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ค้นหาชื่อ, อีเมล..." 
            class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th class="pb-3 pr-4">ผู้ใช้งาน</th>
              <th class="pb-3 px-4">สิทธิ์</th>
              <th class="pb-3 px-4">วันที่สมัคร</th>
              <th class="pb-3 pl-4 text-right">การจัดการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-[#FAF9F5]/40 transition">
              <td class="py-4 pr-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D9488]/20 to-[#059669]/10 flex items-center justify-center font-bold text-[#0D9488] text-sm">
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <span class="font-bold text-gray-800 block">{{ user.username }}</span>
                    <span class="text-xs text-gray-400">{{ user.email }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span 
                  :class="user.role === 'ADMIN' ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'bg-gray-100 text-gray-600'" 
                  class="px-2.5 py-0.5 rounded-full text-xs font-bold inline-block border border-transparent"
                >
                  {{ user.role === 'ADMIN' ? 'แอดมิน' : 'ผู้ใช้งาน' }}
                </span>
              </td>
              <td class="py-4 px-4 text-xs text-gray-500">{{ user.joined }}</td>
              <td class="py-4 pl-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="toggleUserRole(user)" 
                    class="px-3 py-1 bg-[#FAF9F5] border border-gray-200 hover:border-[#0D9488]/30 hover:bg-[#0D9488]/5 rounded-lg text-xs font-medium text-gray-700 hover:text-[#0D9488] transition cursor-pointer"
                  >
                    เปลี่ยนสิทธิ์
                  </button>
                  <button 
                    @click="deleteUser(user.id)" 
                    class="p-1 hover:bg-rose-50 text-gray-400 hover:text-[#E11D48] rounded-lg transition cursor-pointer"
                    title="ลบผู้ใช้"
                  >
                    <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="4" class="py-8 text-center text-gray-400 text-sm">
                ไม่พบผู้ใช้งานที่ตรงกับคำค้นหา
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Change Role Confirm Modal -->
    <Transition name="modal">
      <div v-if="isRoleConfirmOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="isRoleConfirmOpen = false"></div>
        <div class="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
          <div class="w-14 h-14 bg-[#0D9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-[#0D9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 mb-2">ยืนยันการเปลี่ยนสิทธิ์?</h3>
          <p v-if="userToChangeRole" class="text-sm text-gray-500 mb-6">
            คุณต้องการเปลี่ยนสิทธิ์ของ <strong>{{ userToChangeRole.username }}</strong><br/>
            จาก <span class="font-bold">{{ userToChangeRole.role === 'ADMIN' ? 'แอดมิน' : 'ผู้ใช้งาน' }}</span> เป็น <span class="font-bold text-[#0D9488]">{{ userToChangeRole.role === 'ADMIN' ? 'ผู้ใช้งาน' : 'แอดมิน' }}</span> ใช่หรือไม่?
          </p>
          <div class="flex gap-3">
            <button @click="isRoleConfirmOpen = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer">
              ยกเลิก
            </button>
            <button @click="executeChangeRole" class="flex-1 py-2.5 bg-gradient-to-r from-[#045F54] to-[#0D9488] hover:opacity-90 text-white rounded-xl text-sm font-bold transition shadow-md cursor-pointer">
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import axios from 'axios'

const triggerSuccessToast = inject('triggerSuccessToast')

// Formatting date
const currentDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('th-TH', options)
})

// Change Role confirm
const isRoleConfirmOpen = ref(false)
const userToChangeRole = ref(null)

// Search Query model
const searchQuery = ref('')

// User Account list data (เชื่อมต่อตาราง User ในฐานข้อมูล Neon)
const mockUsers = ref([
  { id: 1, username: 'Ohm Dev', email: 'ohm.dev@phuenjaizone.com', role: 'ADMIN', joined: '10 ม.ค. 2026' },
  { id: 2, username: 'Somying', email: 'somying@gmail.com', role: 'USER', joined: '22 ก.พ. 2026' },
  { id: 3, username: 'Naphatsorn', email: 'naphat@gmail.com', role: 'USER', joined: '01 มี.ค. 2026' }
])

// ดึงรายชื่อผู้ใช้จริงจากตาราง User ในฐานข้อมูล
const fetchUsers = async () => {
  try {
    const res = await axios.get('/api/admin/users')
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      mockUsers.value = res.data.map(u => ({
        id: u.id,
        username: u.username || `ผู้ใช้ #${u.id}`,
        email: u.email || 'ไม่มีอีเมล',
        role: u.role || 'USER',
        joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) : 'ไม่ระบุ'
      }))
    }
  } catch (err) {
    console.warn('Could not fetch users from backend, using fallback:', err)
  }
}

onMounted(() => {
  fetchUsers()
})

// Computed filtered user list
const filteredUsers = computed(() => {
  if (!searchQuery.value) return mockUsers.value
  const query = searchQuery.value.toLowerCase().trim()
  return mockUsers.value.filter(user => 
    user.username.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query)
  )
})

// Action: Toggle user roles between USER and ADMIN
const toggleUserRole = (user) => {
  userToChangeRole.value = user
  isRoleConfirmOpen.value = true
}

// สร้างฟังก์ชันใหม่: สำหรับเปลี่ยน Role จริงๆ เมื่อผู้ใช้กดยืนยันบน Pop-Up
const executeChangeRole = () => {
  if (userToChangeRole.value) {
    const newRole = userToChangeRole.value.role === 'ADMIN' ? 'USER' : 'ADMIN'
    userToChangeRole.value.role = newRole
    triggerSuccessToast(`เปลี่ยนสิทธิ์เป็น ${newRole === 'ADMIN' ? 'แอดมิน' : 'ผู้ใช้งาน'} สำเร็จ`)
  }
  isRoleConfirmOpen.value = false
  userToChangeRole.value = null
}

// Action: Delete user
const deleteUser = (id) => {
  mockUsers.value = mockUsers.value.filter(user => user.id !== id)
}
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
