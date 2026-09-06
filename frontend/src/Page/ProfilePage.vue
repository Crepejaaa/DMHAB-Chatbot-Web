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
        <div class="flex flex-col items-center mb-8">
          <div class="relative group cursor-pointer" @click="triggerFileInput">
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
            <div class="h-28 w-28 rounded-full overflow-hidden border-4 border-[#0D9488]/30 shadow-md bg-gray-100 relative">
              <img
                :src="profileImage || defaultAvatar"
                alt="profile"
                class="h-full w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <button
              type="button"
              class="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#0D9488] text-white shadow-md hover:bg-[#045F54] transition cursor-pointer"
              title="เปลี่ยนรูปโปรไฟล์"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <div class="mt-4 flex flex-wrap gap-2 justify-center items-center">
            <button
              type="button"
              @click="triggerFileInput"
              class="text-xs px-3.5 py-1.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] hover:bg-[#0D9488]/20 font-medium transition cursor-pointer flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              อัปโหลดรูปภาพใหม่
            </button>
            <button
              v-if="profileImage"
              type="button"
              @click="resetToDefaultAvatar"
              class="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
            >
              ใช้รูปภาพเริ่มต้น
            </button>
          </div>

          <!-- รูปภาพ Avatar แนะนำให้เลือก -->
          <div class="mt-4 text-center">
            <p class="text-xs text-gray-500 mb-2">หรือเลือกรูปโปรไฟล์แนะนำ:</p>
            <div class="flex gap-2 justify-center">
              <button
                v-for="(avatarUrl, idx) in presetAvatars"
                :key="idx"
                type="button"
                @click="selectPresetAvatar(avatarUrl)"
                :class="profileImage === avatarUrl ? 'ring-2 ring-[#0D9488] scale-110' : 'hover:opacity-80'"
                class="h-9 w-9 rounded-full overflow-hidden border-2 border-white shadow-sm transition-all cursor-pointer"
              >
                <img :src="avatarUrl" :alt="'Preset ' + (idx + 1)" class="h-full w-full object-cover" />
              </button>
            </div>
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
          <button type="button" @click="cancelEdit" class="rounded-2xl bg-[#F87171] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#EF4444] cursor-pointer">
            ยกเลิก
          </button>
          <button type="button" @click="saveProfile" class="rounded-2xl bg-[#2BB7A8] px-4 py-3 text-base font-bold text-white shadow-md transition hover:bg-[#1FA79B] cursor-pointer">
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

const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'

const presetAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
]

const profileImage = ref(authStore.profileImage || defaultAvatar)
const fileInputRef = ref(null)

const form = ref({
  name: authStore.user?.name || authStore.displayName || 'ผู้ใช้งาน',
  email: authStore.user?.email || authStore.userEmail || 'user@example.com',
  phone: authStore.user?.phone || '0812345678'
})

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const handleFileUpload = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (JPG, PNG, WebP)')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => {
      // ปรับขนาดรูปภาพไม่ให้เกิน 300x300 เพื่อประหยัดพื้นที่ LocalStorage และโหลดไว
      const canvas = document.createElement('canvas')
      const maxSize = 300
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > maxSize) {
          height = Math.round((height * maxSize) / width)
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = Math.round((width * maxSize) / height)
          height = maxSize
        }
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      profileImage.value = canvas.toDataURL('image/jpeg', 0.85)
    }
    img.src = event.target?.result
  }
  reader.readAsDataURL(file)
}

const selectPresetAvatar = (url) => {
  profileImage.value = url
}

const resetToDefaultAvatar = () => {
  profileImage.value = defaultAvatar
}

const saveProfile = () => {
  authStore.updateUserProfile({
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    avatar: profileImage.value
  })

  alert('บันทึกข้อมูลและรูปโปรไฟล์เรียบร้อยแล้ว')
}

const cancelEdit = () => {
  const currentUser = authStore.user || {}
  profileImage.value = currentUser.avatar || defaultAvatar
  form.value = {
    name: currentUser.name || authStore.displayName || 'ผู้ใช้งาน',
    email: currentUser.email || authStore.userEmail || 'user@example.com',
    phone: currentUser.phone || '0812345678'
  }
}

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
  if (storedUser) {
    if (storedUser.avatar) {
      profileImage.value = storedUser.avatar
    }
    form.value = {
      name: storedUser.name || storedUser.email?.split('@')[0] || 'ผู้ใช้งาน',
      email: storedUser.email || form.value.email,
      phone: storedUser.phone || form.value.phone
    }
  } else if (authStore.profileImage) {
    profileImage.value = authStore.profileImage
  }
})
</script>
