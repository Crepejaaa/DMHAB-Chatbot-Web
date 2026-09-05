<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isColorBlindMode ? 'grayscale' : '']">
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-4 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <nav class="w-full flex items-center justify-between mb-10 relative z-10">
        <div class="flex items-center gap-3">
          <router-link to="/" class="hover:bg-white/20 p-2 rounded-full transition" title="กลับหน้าหลัก">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
          <router-link to="/" class="flex items-center gap-2">
            <img src="/image_Logo.png" alt="DMHAB Logo" class="w-10 h-10 object-contain" />
            <span class="text-xl font-bold tracking-wide">DMHAB</span>
          </router-link>
        </div>

        <div class="hidden md:flex gap-8 items-center text-sm font-medium">
          <router-link to="/" class="hover:text-[#D1FAE5] transition">Home</router-link>
          <router-link to="/about" class="hover:text-[#D1FAE5] transition">About</router-link>
          <router-link to="/services" class="hover:text-[#D1FAE5] transition">Services</router-link>
          <router-link to="/blog" class="hover:text-[#D1FAE5] transition">Blog</router-link>
        </div>

        <div class="flex items-center gap-3 text-sm">
          <div class="hidden md:flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" title="โหมดขาวดำสำหรับผู้ตาบอดสี">
            <span class="text-xs font-semibold text-white">Color Blindness</span>
            <button
              @click="isColorBlindMode = !isColorBlindMode"
              :class="isColorBlindMode ? 'bg-white' : 'bg-[#045F54]'"
              class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-white/30"
            >
              <span
                :class="isColorBlindMode ? 'translate-x-4 bg-[#1E293B]' : 'translate-x-1 bg-white'"
                class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
              ></span>
            </button>
          </div>

          <ProfileMenu />
        </div>
      </nav>

      <div class="container mx-auto px-6 lg:px-10 pt-6 pb-20 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Edit Account</h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] italic">"Define yourself. ไม่ใช่เรื่องง่าย แต่คือการเริ่มต้นที่ดีของทุกคน"</p>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
      <div class="bg-white rounded-[2rem] shadow-lg border border-gray-100 px-6 py-8 md:px-10 md:py-10">
        <div class="flex justify-center mb-8">
          <div class="relative">
            <img
              :src="profileImage"
              alt="profile"
              class="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button
              type="button"
              class="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#E2E8F0] text-gray-700 shadow-md hover:bg-[#CBD5E1]"
              title="อัปโหลดรูปภาพ"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.9A5.5 5.5 0 0117.5 9H17a4 4 0 110 8H7zm5-7V5m0 0l-2 2m2-2l2 2" />
              </svg>
            </button>
          </div>
        </div>

        <div class="space-y-5">
          <div class="rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3">
            <label class="block text-sm font-semibold text-gray-700 mb-1">ชื่อ-นามสกุล</label>
            <input v-model="form.name" class="w-full bg-transparent text-lg font-medium text-gray-800 outline-none" placeholder="กรอกชื่อของคุณ" />
          </div>

          <div class="rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3">
            <label class="block text-sm font-semibold text-gray-700 mb-1">อีเมล</label>
            <input v-model="form.email" type="email" class="w-full bg-transparent text-lg font-medium text-gray-800 outline-none" placeholder="name@example.com" />
          </div>

          <div class="rounded-xl border border-gray-200 bg-[#F8FAFC] px-4 py-3">
            <label class="block text-sm font-semibold text-gray-700 mb-1">เบอร์โทร</label>
            <input v-model="form.phone" type="tel" class="w-full bg-transparent text-lg font-medium text-gray-800 outline-none" placeholder="0812345678" />
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button type="button" @click="cancelEdit" class="rounded-2xl bg-[#F87171] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#EF4444]">
            ยกเลิก
          </button>
          <button type="button" @click="saveProfile" class="rounded-2xl bg-[#2BB7A8] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#1FA79B]">
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </div>
    </main>

    <footer class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <div class="flex items-center gap-1 mb-3">
            <img src="/image_Logo.png" alt="DMHAB Logo" class="w-10 h-10 object-contain" />
            <span class="font-bold text-lg">DMHAB</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">Services</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>Daily Chatbot</li>
            <li>Personalized Feedback</li>
            <li>Self-Care Resource Library</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Contact</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 +123 456 789</li>
            <li>✉️ DMHAB@domain.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Hotline</h4>
          <p class="text-xs text-[#D1FAE5]">สายด่วนสุขภาพจิต 1323</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">DMHAB@domain all right reserved</div>
    </footer>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import ProfileMenu from '../components/ProfileMenu.vue'

const isColorBlindMode = inject('isColorBlindMode')
const authStore = useAuthStore()

const profileImage = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'

const form = ref({
  name: authStore.user?.name || authStore.displayName || 'ผู้ใช้งาน',
  email: authStore.user?.email || authStore.userEmail || 'user@example.com',
  phone: authStore.user?.phone || '0812345678'
})

const saveProfile = () => {
  authStore.updateUserProfile({
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone
  })

  alert('บันทึกโปรไฟล์เรียบร้อยแล้ว')
}

const cancelEdit = () => {
  const currentUser = authStore.user || {}
  form.value = {
    name: currentUser.name || authStore.displayName || 'ผู้ใช้งาน',
    email: currentUser.email || authStore.userEmail || 'user@example.com',
    phone: currentUser.phone || '0812345678'
  }
}

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
  if (storedUser) {
    form.value = {
      name: storedUser.name || storedUser.email?.split('@')[0] || 'ผู้ใช้งาน',
      email: storedUser.email || form.value.email,
      phone: storedUser.phone || form.value.phone
    }
  }
})
</script>
