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
  <img src="/image_Logo.png" alt="DMHAB Logo" class="w-10 h-10 object-contain" />
  <span class="text-xl font-bold tracking-wide text-white">DMHAB</span>
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
      <div class="bg-white rounded-[2rem] shadow-xl w-full max-w-lg pt-14 pb-10 px-8 sm:px-12 relative">
        
        <!-- รูปโปรไฟล์กล้อง (คลิกเพื่ออัปโหลด) -->
        <div 
          @click="triggerFileInput"
          class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-[#F1F5F9] rounded-full border-4 border-white shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-200 transition overflow-hidden group"
          title="อัปโหลดภาพโปรไฟล์"
        >
          <!-- แสดงภาพพรีวิวถ้ามีการเลือกรูปแล้ว -->
          <img v-if="imagePreview" :src="imagePreview" alt="Profile" class="w-full h-full object-cover" />
          
          <!-- ไอคอนกล้อง (แสดงตอนยังไม่มีรูป) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500 group-hover:text-[#349E8D] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <!-- Input File ที่ถูกซ่อนไว้ -->
        <input 
          type="file" 
          ref="fileInput" 
          class="hidden" 
          accept="image/*" 
          @change="handleImageUpload" 
        />

        <h2 class="text-center text-xl font-bold text-gray-800 mb-8">Register</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Name</label>
            <input v-model="form.name" type="text" placeholder="Your Name, e.g : John Doe" required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" placeholder="Your email, e.g : johndoe@gmail.com" required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
            <input v-model="form.phone" type="tel" placeholder="Your phone number," required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input v-model="form.password" type="password" placeholder="Your password, at least 8 character." required minlength="8"
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
            <input v-model="form.confirmPassword" type="password" placeholder="Re-type your password" required
              class="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#349E8D] outline-none placeholder-gray-400" />
          </div>

          <!-- Accept Terms -->
          <div class="flex items-center pt-2">
            <input id="terms" v-model="form.acceptTerms" type="checkbox" required
              class="w-5 h-5 bg-[#F1F5F9] border-gray-300 rounded text-[#349E8D] focus:ring-[#349E8D]" />
            <label for="terms" class="ml-2 text-sm text-gray-700 font-medium">ยอมรับเงื่อนไข</label>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button type="submit" class="w-full bg-[#29CBAE] hover:bg-[#25B89D] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition transform active:scale-95 cursor-pointer">
              Register
            </button>
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
import { ref } from 'vue'

// Refs สำหรับการอัปโหลดรูป
const fileInput = ref(null)
const imagePreview = ref(null)

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  profileImage: null // เพิ่ม object เก็บไฟล์รูปภาพสำหรับส่งไป Backend
})

// ฟังก์ชันจำลองการคลิกที่ input file เมื่อกดที่ไอคอนกล้อง
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// ฟังก์ชันจัดการเมื่อเลือกไฟล์รูปภาพ
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // เก็บไฟล์ลงในฟอร์มเพื่อเตรียมส่งไป API
    form.value.profileImage = file
    // สร้าง URL ชั่วคราวสำหรับแสดงรูปพรีวิวบนหน้าจอ
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleRegister = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน!")
    return
  }
  
  // เช็คว่ามีการใส่รูปไหม (เอาไว้สำหรับแจ้งเตือนทดสอบเฉยๆ)
  const hasImage = form.value.profileImage ? "พร้อมภาพโปรไฟล์" : "ไม่มีภาพโปรไฟล์"
  
  // โค้ดส่งข้อมูลไป Backend จะอยู่ตรงนี้ (ใช้ FormData ในการส่งแนบรูป)
  alert(`สมัครสมาชิกสำเร็จ! ยินดีต้อนรับคุณ ${form.value.name}\nสถานะรูป: ${hasImage}`)
}
</script>