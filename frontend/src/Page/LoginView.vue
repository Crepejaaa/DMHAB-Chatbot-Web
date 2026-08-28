<template>
  <div class="min-h-screen flex flex-col font-sans bg-[#FCFBF8] text-[#1E293B]">
    
    <!-- Header & Hero Section (ส่วนแถบสีเขียวด้านบน) -->
    <div class="bg-gradient-to-r from-[#21776A] to-[#349E8D] text-white relative overflow-hidden">
      <!-- Background decorative line (จำลองเส้นโค้ง) -->
      <div class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full">
          <path d="M0,50 Q25,80 50,50 T100,50" fill="none" stroke="white" stroke-width="0.5"/>
        </svg>
      </div>

      <!-- Top Navbar (ปรับให้ตรงกับ Register) -->
      <div class="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        
        <!-- ฝั่งซ้าย: ปุ่ม Back (ย้อนกลับ) -->
        <div class="flex items-center gap-4">
          <button 
            @click="$router.back()" 
            class="hover:bg-white/20 p-2 rounded-full transition text-white" 
            title="ย้อนกลับ"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        <!-- ฝั่งขวา: โลโก้ และ DMHAB -->
        <div class="flex items-center gap-2.5 cursor-default">
            <img src="/image_Logo.png" alt="DMHAB Logo" class="w-10 h-10 object-contain" />
            <span class="text-xl font-bold tracking-wide text-white">DMHAB</span>
        </div>
      </div>

      <!-- Hero Title -->
      <div class="container mx-auto px-10 pt-10 pb-28 relative z-10">
        <div class="border-l-4 border-white pl-4">
          <h1 class="text-3xl font-bold mb-2">Login</h1>
          <p class="text-sm text-white/80 italic">"โปรดเข้าสู่ระบบเพื่อเข้ารับประสบการณ์ที่ดีของคุณ"</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <main class="flex-1 container mx-auto px-4 -mt-20 relative z-20 pb-16 flex justify-center">
      <div class="bg-white rounded-[2rem] shadow-xl w-full max-w-lg pt-14 pb-10 px-8 sm:px-12 relative">
        
        <!-- รูปโปรไฟล์ผู้ใช้ (ไอคอนคน ด้านบนกึ่งกลางฟอร์ม) -->
        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F1F5F9] rounded-full border-4 border-white shadow-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#349E8D]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>

        <h2 class="text-center text-xl font-bold text-gray-800 mb-8">Login to your account</h2>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" placeholder="Your email, e.g : johndoe@gmail.com" required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input v-model="form.password" type="password" placeholder="Enter your password" required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Remember me & Forgot Password -->
          <div class="flex items-center justify-between pt-1">
            <div class="flex items-center">
              <input id="remember" v-model="form.rememberMe" type="checkbox"
                class="w-5 h-5 bg-[#F1F5F9] border-gray-300 rounded text-[#349E8D] focus:ring-[#349E8D]" />
              <label for="remember" class="ml-2 text-sm text-gray-700 font-medium">จดจำฉันไว้</label>
            </div>
            
            <!-- Link ไปหน้า forgot-password -->
            <router-link to="/forgot-password" class="text-sm text-[#21776A] hover:text-[#185B51] font-bold hover:underline transition">
              ลืมรหัสผ่าน?
            </router-link>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-center pt-2">
            <p class="text-sm font-bold text-red-500">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button type="submit" class="w-full bg-[#29CBAE] hover:bg-[#25B89D] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition transform active:scale-95 cursor-pointer">
              Login
            </button>
          </div>
          
          <!-- Not a member link -->
          <div class="text-center pt-2">
            <p class="text-sm text-gray-600">ยังไม่มีบัญชีใช่ไหม? 
              <router-link to="/register" class="text-[#349E8D] font-bold hover:underline">สมัครสมาชิกที่นี่</router-link>
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
              <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
            </div>
            <span class="font-bold text-lg">DMHAB</span>
          </div>
          <p class="text-white/70 text-xs leading-relaxed">
            We are dedicated to providing the best mental health resources and support for everyone.
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
            <li class="flex items-center gap-2">✉️ DMHAB@gmail.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-4 block hover:underline">Hotline</router-link>
          <p class="text-white/80 text-xs">1323 (สายด่วนสุขภาพจิต)</p>
        </div>
      </div>
      <div class="container mx-auto px-6 mt-8 pt-6 border-t border-white/20 text-center text-white/60 text-xs">
        <p>© DMHAB 2024. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const isColorBlindMode = inject('isColorBlindMode', ref(false))

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  if (!form.value.email || !form.value.password) {
    errorMessage.value = 'กรุณากรอกอีเมลและรหัสผ่านก่อนเข้าสู่ระบบ'
    return
  }

  const result = await authStore.login(form.value.email.trim(), form.value.password)
  
  if (result.success) {
    router.push('/')
  } else {
    errorMessage.value = result.message
  }
}
</script>