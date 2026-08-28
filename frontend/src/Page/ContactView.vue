<template>
  <div :class="['min-h-screen bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500 overflow-x-hidden', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Navbar (เหมือน HomeView) -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <button 
          @click="$router.back()" 
          class="hover:bg-white/20 p-2 rounded-full transition text-white" 
          title="ย้อนกลับ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div class="w-12 h-12 flex items-center justify-center">
          <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
        </div>
      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" class="hover:text-[#D1FAE5] transition">Home</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition">About</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition">Service</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">Blog</router-link>
      </div>
      
      <div class="flex gap-3 items-center text-sm">
        <div class="hidden md:flex items-center gap-2 mr-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" title="โหมดขาวดำสำหรับผู้ตาบอดสี">
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

        <button 
          @click="$router.push('/login')" 
          class="px-5 py-1.5 rounded-full border border-white/60 hover:bg-white/10 transition inline-flex items-center justify-center cursor-pointer text-white"
        >
          Login
        </button>
        
        <button
          @click="$router.push('/register')"
          class="px-5 py-1.5 bg-[#023832] hover:bg-[#01221E] text-white rounded-full font-medium transition shadow-sm"
        >
          Register
        </button>
      </div>
    </nav>

    <!-- 2. Hero Banner -->
    <section class="relative bg-gradient-to-br from-[#045F54] via-[#0D9488] to-[#059669] text-white overflow-hidden">
      <!-- ลวดลายพื้นหลัง -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/10"></div>
        <div class="absolute top-10 right-10 w-60 h-60 rounded-full border border-white/5"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">Contact Us</h1>
        <p class="text-sm md:text-base text-[#D1FAE5] max-w-2xl leading-relaxed scroll-anim opacity-0 translate-y-10 transition-all duration-1000 delay-200 ease-out">
          เริ่มต้นดูแลสุขภาพใจของตัวคุณและองค์กรเริ่มวันนี้ หากคุณมีข้อสงสัย แนะนำ ร้องเรียน หรือสนใจบริการแผนองค์กรประเมินสุขภาพจิตประจำวัน สามารถติดต่อความสามารถของเราพร้อมให้บริการครบ
        </p>
      </div>
    </section>

    <!-- 3. Contact Content Section -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 gap-12 items-start">

        <!-- ฝั่งซ้าย: ข้อมูลติดต่อ -->
        <div class="scroll-anim opacity-0 -translate-x-16 transition-all duration-1000 ease-out">
          <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-8 leading-snug">
            "เราพร้อมรับฟังทุกปัญหา<br>ของคุณ "
          </h2>

          <!-- Chatbot CTA Card -->
          <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow mb-10 max-w-sm">
            <div class="flex items-center justify-between gap-4">
              <div class="flex-1">
                <p class="text-sm font-medium text-[#1E293B]">แชทกับ น้องมุกห่วงใย แชทบอท</p>
              </div>
              <div class="w-8 h-8 flex items-center justify-center text-[#64748B] hover:text-[#1E293B] transition cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <button type="button" class="mt-4 bg-gradient-to-r from-[#0D9488] to-[#059669] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all cursor-pointer">
              เริ่มแชทเลย !
            </button>
          </div>

          <!-- ข้อมูลติดต่อ -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-[#0D9488]/10 rounded-full flex items-center justify-center text-[#0D9488]">
                📞
              </div>
              <span class="text-sm font-medium text-[#1E293B]">+14 5464 8272</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-[#0D9488]/10 rounded-full flex items-center justify-center text-[#0D9488]">
                ✉️
              </div>
              <span class="text-sm font-medium text-[#1E293B]">DMHAB@domain.com</span>
            </div>
          </div>
        </div>

        <!-- ฝั่งขวา: แบบฟอร์มติดต่อกลับ -->
        <div class="scroll-anim opacity-0 translate-x-16 transition-all duration-1000 delay-200 ease-out">
          <h2 class="text-2xl font-bold text-[#1E293B] mb-8 text-center">แบบฟอร์มติดต่อกลับ</h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#1E293B] mb-2">First Name</label>
                <input 
                  v-model="form.firstName"
                  @input="filterTextOnly('firstName')"
                  type="text" 
                  placeholder="Your first name" 
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition placeholder-[#94A3B8]"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#1E293B] mb-2">Last Name</label>
                <input 
                  v-model="form.lastName"
                  @input="filterTextOnly('lastName')"
                  type="text" 
                  placeholder="Your last name" 
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition placeholder-[#94A3B8]"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#1E293B] mb-2">Email</label>
                <input 
                  v-model="form.email"
                  @input="filterEmailOnly"
                  type="email" 
                  placeholder="email@domain.com" 
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition placeholder-[#94A3B8]"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#1E293B] mb-2">Phone</label>
                <input 
                  v-model="form.phone"
                  @input="filterNumberOnly"
                  type="tel" 
                  placeholder="+21 228xxxx" 
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition placeholder-[#94A3B8]"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-[#1E293B] mb-2">Subject</label>
              <textarea 
                v-model="form.subject"
                rows="5" 
                placeholder="Your message" 
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:border-[#0D9488] transition resize-none placeholder-[#94A3B8]"
              ></textarea>
            </div>

            <button 
              type="submit"
              class="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-8 py-3 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
            >
              Send message
            </button>
          </form>
        </div>

      </div>
    </section>

    <!-- 4. Footer (เหมือน HomeView) -->
    <footer class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 mt-10 scroll-anim opacity-0 transition-opacity duration-1000 ease-out">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <!-- โลโก้ Footer -->
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
            </div>
            <span class="font-bold text-lg">DMHAB</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">Services</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><a href="#" class="hover:underline">Daily Chatbot</a></li>
            <li><a href="#" class="hover:underline">Personalized Feedback</a></li>
            <li><router-link to="/blog" class="hover:underline">Self-Care Resource Library</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Contact</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 +14 234 567</li>
            <li>✉️ DMHAB@domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">Hotline</router-link>
          <p class="text-xs text-[#D1FAE5]">line: 1323 (โทรฟรี ตลอด 24 ชั่วโมง)</p>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 pt-6 flex flex-col items-center gap-4">
        <div class="flex gap-3">
          <a href="#" class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z"/></svg>
          </a>
          <a href="#" class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><polygon fill="#fff" points="9.545 15.568 15.818 12 9.545 8.432"/></svg>
          </a>
          <a href="#" class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
        </div>
        <p class="text-xs text-[#A7F3D0]">DMHAB@domain all right reserved</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { inject, ref, onMounted, onUnmounted } from 'vue'

const isColorBlindMode = inject('isColorBlindMode')

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: ''
})

const handleSubmit = () => {
  alert('ส่งข้อความเรียบร้อยแล้ว! ขอบคุณที่ติดต่อเรา')
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: ''
  }
}

// ฟังก์ชัน filter input
const filterTextOnly = (field) => {
  // อนุญาตเฉพาะตัวอักษร (ไทย, อังกฤษ) และช่องว่าง
  form.value[field] = form.value[field].replace(/[^a-zA-Zก-๙เแโใไำะัิีึืุูํ็่้๊๋ ]/g, '')
}

const filterEmailOnly = () => {
  // อนุญาตเฉพาะตัวอักษรภาษาอังกฤษ, ตัวเลข และอักขระพิเศษสำหรับ email (@._-+)
  form.value.email = form.value.email.replace(/[^a-zA-Z0-9@._\-+]/g, '')
}

const filterNumberOnly = () => {
  // อนุญาตเฉพาะตัวเลข
  form.value.phone = form.value.phone.replace(/[^0-9]/g, '')
}

// Scroll animation observer (เหมือน HomeView)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          'opacity-0', 
          'translate-y-10', 
          'translate-y-16', 
          '-translate-x-16', 
          'translate-x-16', 
          'scale-95'
        )
        entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1 
  })

  const animElements = document.querySelectorAll('.scroll-anim')
  animElements.forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
