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
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">จัดการข้อมูล</h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] italic">"ตั้งค่าความเป็นส่วนตัวและการแจ้งเตือนให้เหมาะกับการใช้งานของคุณ"</p>
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
                <p class="text-sm font-semibold text-gray-800">การแจ้งเตือนทางอีเมล</p>
                <p class="text-xs text-gray-500">รับข้อมูลอัปเดตจากระบบ</p>
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
                <p class="text-sm font-semibold text-gray-800">โหมดเข้าถึงแบบสะดวก</p>
                <p class="text-xs text-gray-500">เพิ่มความง่ายสำหรับผู้ใช้งานที่ต้องการฟีเจอร์ที่เข้าถึงง่าย</p>
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
            <label class="block text-sm font-semibold text-gray-700 mb-2">ความเป็นส่วนตัว</label>
            <select v-model="privacy" class="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2BB7A8]">
              <option value="public">สาธารณะ</option>
              <option value="friends">เฉพาะคนที่รู้จัก</option>
              <option value="private">ส่วนตัว</option>
            </select>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">รหัสผ่านใหม่</label>
            <input v-model="password" type="password" placeholder="กรอกรหัสผ่านใหม่" class="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#2BB7A8]" />
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button type="button" @click="resetSettings" class="rounded-2xl bg-[#F87171] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#EF4444]">
            รีเซ็ต
          </button>
          <button type="button" @click="saveSettings" class="rounded-2xl bg-[#2BB7A8] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#1FA79B]">
            บันทึกข้อมูล
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
import { inject, ref } from 'vue'
import ProfileMenu from '../components/ProfileMenu.vue'

const isColorBlindMode = inject('isColorBlindMode')

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
  alert('บันทึกการตั้งค่าข้อมูลเรียบร้อยแล้ว')
}
</script>
