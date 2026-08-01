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

      <!-- Top Navbar -->
      <div class="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        
        <!-- ฝั่งซ้าย: ปุ่ม Back (ย้อนกลับไปหน้า Home) -->
        <div class="flex items-center gap-4">
          <router-link to="/" class="hover:bg-white/20 p-2 rounded-full transition" title="กลับหน้าหลัก">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
        </div>

        <!-- ฝั่งขวา: โลโก้ และ DMHAB -->
        <div class="flex items-center gap-2.5 cursor-default">
          <img src="/image_Logo.png" alt="DMHAB Logo" class="w-7 h-7 object-contain" />
          <span class="text-xl font-bold tracking-wide text-white">DMHAB</span>
        </div>
        </div>
      <!-- Hero Title -->
      <div class="container mx-auto px-10 pt-10 pb-28 relative z-10">
        <div class="border-l-4 border-white pl-4">
          <h1 class="text-3xl font-bold mb-2">Forgot Password</h1>
          <p class="text-sm text-white/80 italic">""ลืมรหัสผ่านเรื่องธรรมชาติ แต่ถ้าลืมดูแลสุขภาพ... อันนี้ยอมไม่ได้นะ!""</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <main class="flex-1 container mx-auto px-4 -mt-20 relative z-20 pb-16 flex justify-center">
      <div class="bg-white rounded-[2rem] shadow-xl w-full max-w-lg pt-14 pb-10 px-8 sm:px-12 relative">
        
        <!-- รูปไอคอนแม่กุญแจ/กุญแจ (ด้านบนกึ่งกลางฟอร์ม) -->
        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F1F5F9] rounded-full border-4 border-white shadow-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 text-[#349E8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h2 class="text-center text-xl font-bold text-gray-800 mb-2">ลืมรหัสผ่าน?</h2>
        <p class="text-center text-xs text-gray-500 mb-8 leading-relaxed">
          กรุณากรอกอีเมลที่ใช้สมัครบัญชี เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้คุณ
        </p>

        <form @submit.prevent="handleResetPassword" class="space-y-5">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Your email, e.g : johndoe@gmail.com" 
              required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" 
            />
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button 
              type="submit" 
              class="w-full bg-[#29CBAE] hover:bg-[#25B89D] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition transform active:scale-95 cursor-pointer"
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </div>
          
          <!-- Back to Login Link -->
          <div class="text-center pt-3">
            <p class="text-sm text-gray-600">
              นึกรหัสผ่านออกแล้ว? 
              <router-link to="/login" class="text-[#349E8D] font-bold hover:underline transition ml-1">
                กลับไปเข้าสู่ระบบ
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
            <li><a href="#" class="hover:text-white">Self-Care Resource Library</a></li>
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
          <h4 class="font-bold mb-4">Hotline</h4>
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

const isColorBlindMode = inject('isColorBlindMode')

const email = ref('')

const handleResetPassword = async () => {
  if (!email.value) return

  try {
    const response = await fetch('http://localhost:3000/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'เกิดข้อผิดพลาด')
    }

    alert(data.message)
    email.value = ''
  } catch (error) {
    alert(error.message)
  }
}
</script>