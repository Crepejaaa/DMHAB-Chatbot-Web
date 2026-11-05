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
            title="ย้อนกลับ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        <!-- ฝั่งขวา: โลโก้ และ PhuenJaiZone -->
        <div class="flex items-center gap-2.5 cursor-default">
          <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-10 h-10 object-contain rounded-full" />
          <span class="text-xl font-bold tracking-wide text-white">PhuenJaiZone</span>
        </div>

      </div>

      <!-- Hero Title -->
      <div class="container mx-auto px-10 pt-10 pb-28 relative z-10">
        <div class="border-l-4 border-white pl-4">
          <h1 class="text-3xl font-bold mb-2">Register</h1>
          <p class="text-sm text-white/80 italic">"เริ่มต้นดูแลตัวเองในแบบที่เป็นคุณ... เพราะคุณมีแค่คนเดียวในโลก"</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <main class="flex-1 container mx-auto px-4 -mt-20 relative z-20 pb-16 flex justify-center">
      <div class="bg-white rounded-[2rem] shadow-xl w-full max-w-lg pt-16 pb-10 px-8 sm:px-12 relative">

        <!-- วงกลมใหญ่ด้านบนสุด แสดงอวตารสัตว์ที่เลือก (แทนไอคอนกล้องเดิม) -->
        <div
          class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#F1F5F9] rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden transition-all duration-300"
          :title="selectedAvatarObj?.label || 'อวตารของคุณ'"
        >
          <img
            v-if="selectedAvatarObj"
            :src="selectedAvatarObj.src"
            :alt="selectedAvatarObj.label"
            class="w-full h-full object-cover transition-transform duration-300"
          />
        </div>

        <h2 class="text-center text-xl font-bold text-gray-800 mb-3">Register</h2>

        <!-- พื้นที่เลือก Avatar สัตว์น่ารัก 5 ตัว (Animal Avatar Selector) -->
        <div class="mb-6">
          <p class="text-center text-xs font-semibold text-gray-500 mb-3">
            เลือกอวตารประจำตัวของคุณ ({{ selectedAvatarObj?.label }})
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
            <label class="block text-sm font-bold text-gray-700 mb-1">Name</label>
            <input v-model="form.name" type="text" placeholder="Your Name, e.g : John Doe (ห้ามใส่ชื่อ-นามสกุลจริง)" required
              class="login-field register-field w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" placeholder="Your email, e.g : johndoe@gmail.com" required
              class="login-field register-field w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input v-model="form.password" type="password" placeholder="Your password, at least 8 character." required
              minlength="8"
              class="login-field register-field w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
            <input v-model="form.confirmPassword" type="password" placeholder="Re-type your password" required
              class="login-field register-field w-full rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-center pt-2">
            <p class="text-sm font-bold text-red-500">{{ errorMessage }}</p>
          </div>

          <!-- 📍 Checkbox ยอมรับเงื่อนไขการใช้งาน -->
          <div class="flex items-center gap-2 mt-4">
            <input 
              type="checkbox" 
              id="terms" 
              v-model="form.acceptTerms" 
              class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded transition-all cursor-pointer"
            />
            <label for="terms" class="text-sm text-gray-700 select-none">
              ฉันได้อ่านและยอมรับ
              <span 
                role="button"
                tabindex="0"
                @click.stop.prevent="openTermsModal"
                @keydown.enter.stop.prevent="openTermsModal"
                class="text-[#349E8D] underline hover:text-[#21776A] cursor-pointer font-semibold"
              >
                เงื่อนไขการใช้งาน
              </span>
            </label>
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
              <span v-if="isLoading">กำลังสมัครสมาชิก...</span>
              <span v-else>สมัครสมาชิก</span>
            </button>
          </div>
        </form>
      </div>
    </main>

    <!-- Overlay Modal แสดงรายละเอียดเงื่อนไขการใช้งาน -->
    <div
      v-if="showTermsModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      @click.self="closeTermsModal"
    >
      <div class="bg-white rounded-2xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all w-full max-w-lg border border-gray-100">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100">
            <svg class="h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.033C3.12 6.516 3 7.248 3 8c0 5.525 3.797 10.269 9 11.622 0-.752-.12-1.484-.382-2.016z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-4">
            <h3 class="text-xl font-bold text-gray-900" id="modal-title">
              เงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว
            </h3>
            <div class="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl text-left border border-gray-200 max-h-60 overflow-y-auto space-y-3">
              <p class="font-semibold text-gray-800">เงื่อนไขและข้อตกลงในการใช้งานระบบ PhuenJaiZone:</p>
              <p>1. การคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy):</p>
              <ul class="list-disc list-inside text-xs space-y-1 text-gray-600 mt-1 pl-1">
                <li>ระบบจัดเก็บข้อมูล (ชื่อนามแฝง, อีเมล, รูปอวตาร, ผลประเมิน) ไว้เป็นความลับอย่างปลอดภัยผ่านการเข้ารหัส HTTPS/SSL</li>
                <li>ข้อมูลทั้งหมดจะถูกนำไปใช้วิเคราะห์เพื่อติดตามสภาวะอารมณ์ของคุณเท่านั้น โดยไม่มีการเปิดเผยต่อบุคคลภายนอก</li>
                <li>คุณมีสิทธิในการเข้าถึง แก้ไข หรือร้องขอให้ลบข้อมูลส่วนตัวของคุณได้ตลอดเวลาผ่านส่วนตั้งค่าบัญชี</li>
              </ul>
              <p class="font-bold text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
                ข้อชี้แจงสำคัญ: ระบบแชทบอท PhuenJaiZone เป็นเพียงเครื่องมือประเมินและคัดกรองสภาวะอารมณ์เบื้องต้นเท่านั้น **ไม่ใช้สำหรับการวินิจฉัยโรคทางจิตเวชและไม่มีการจ่ายยาเด็ดขาด**
              </p>
              <p>2. หากท่านมีภาวะเครียดรุนแรงหรือมีความคิดทำร้ายตนเอง กรุณาติดต่อสายด่วนสุขภาพจิต 1323 หรือพบแพทย์ผู้เชี่ยวชาญทันที</p>
            </div>
          </div>
        </div>
        <div class="mt-6 flex flex-col sm:flex-row-reverse gap-2">
          <button 
            type="button" 
            class="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-5 py-2.5 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-sm cursor-pointer transition"
            @click="acceptAndClose"
          >
            ยอมรับ
          </button>
          <button 
            type="button" 
            class="w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-5 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm cursor-pointer transition"
            @click="closeTermsModal"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-[#21776A] to-[#349E8D] text-white py-10 text-sm">
      <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <!-- โลโก้ Footer -->
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">PhuenJaiZone</span>
          </div>
          <p class="text-white/70 text-xs leading-relaxed">ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ</p>
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { VueRecaptcha } from 'vue-recaptcha'

import dogAvatar from '../assets/avatars/dog.png'
import catAvatar from '../assets/avatars/cat.png'
import rabbitAvatar from '../assets/avatars/rabbit.png'
import bearAvatar from '../assets/avatars/bear.png'
import birdAvatar from '../assets/avatars/bird.png'

const router = useRouter()
const authStore = useAuthStore()
const isDarkMode = inject('isDarkMode', ref(false))
const isLoading = ref(false)

// รายการอวตารสัตว์ 5 ตัว
const avatarOptions = [
  { id: 'avatar_dog', label: 'สุนัข', src: dogAvatar },
  { id: 'avatar_cat', label: 'แมว', src: catAvatar },
  { id: 'avatar_rabbit', label: 'กระต่าย', src: rabbitAvatar },
  { id: 'avatar_bear', label: 'หมี', src: bearAvatar },
  { id: 'avatar_bird', label: 'นก', src: birdAvatar },
]

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
  errorMessage.value = 'ไม่สามารถโหลดหรือยืนยัน reCAPTCHA ได้ กรุณาลองใหม่อีกครั้ง'
}

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  avatar: 'avatar_dog'
})
const errorMessage = ref('')

const selectedAvatarObj = computed(() => {
  return avatarOptions.find((item) => item.id === form.value.avatar) || avatarOptions[0]
})

const selectAvatar = (avatarId) => {
  form.value.avatar = avatarId
}

// ตัวแปรและฟังก์ชันสำหรับ Modal เงื่อนไขการใช้งาน
const showTermsModal = ref(false)

const openTermsModal = () => {
  showTermsModal.value = true
}

const closeTermsModal = () => {
  showTermsModal.value = false
}

const acceptAndClose = () => {
  form.value.acceptTerms = true // ติ๊กถูกในช่อง checkbox ให้อัตโนมัติเมื่อกด "ยอมรับ"
  showTermsModal.value = false
}

const handleRegister = async () => {
  if (isLoading.value) return
  errorMessage.value = ''
  
  // เช็กว่าผู้ใช้ยอมรับเงื่อนไขแล้วหรือยัง
  if (!form.value.acceptTerms) {
    errorMessage.value = "กรุณายอมรับเงื่อนไขการใช้งานก่อนทำการสมัครสมาชิก"
    return
  }

  // เช็กว่าผู้ใช้ติ๊ก reCAPTCHA หรือยัง
  const token = recaptchaToken.value?.trim()
  if (!token) {
    errorMessage.value = "กรุณายืนยันตัวตนผ่าน reCAPTCHA ก่อนทำการสมัครสมาชิก"
    return
  }

  // เช็กรหัสผ่าน
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = "รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน!"
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
</style>
