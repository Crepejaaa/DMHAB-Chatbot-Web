<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Green Banner Header & Navbar -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-4 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <!-- Background Decorative Curve Line -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <!-- Navbar -->
      <nav class="w-full flex items-center justify-between mb-10 relative z-10">
        <!-- ฝั่งซ้ายสุด: ปุ่มย้อนกลับ + โลโก้ -->
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

        <!-- ตรงกลาง: Menu Links -->
        <div class="hidden md:flex gap-8 items-center text-sm font-medium">
          <router-link to="/" class="hover:text-[#D1FAE5] transition">Home</router-link>
          <router-link to="/about" class="hover:text-[#D1FAE5] transition">About</router-link>
          <router-link to="/services" class="text-white font-bold underline decoration-2 underline-offset-4">Services</router-link>
          <a href="#" class="hover:text-[#D1FAE5] transition">Blog</a>
        </div>

        <!-- ฝั่งขวาสุด: Color Blindness Toggle + Login + Register -->
        <div class="flex gap-3 items-center text-sm">
          <!-- Toggle Color Blindness -->
          <div class="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" title="โหมดขาวดำสำหรับผู้ตาบอดสี">
            <span class="text-xs font-semibold text-white hidden sm:inline">Color Blindness</span>
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

          <router-link to="/login" class="px-5 py-1.5 rounded-full border border-white/60 hover:bg-white/10 transition">
            Login
          </router-link>
          <router-link to="/register" class="px-5 py-1.5 bg-[#023832] hover:bg-[#01221E] text-white rounded-full font-medium transition shadow-sm">
            Register
          </router-link>
        </div>
      </nav>

      <!-- Page Title Header -->
      <div class="container mx-auto px-6 lg:px-10 pt-6 pb-20 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Services
            </h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed italic">
              "บางครั้งความเครียดหรือความเศร้าก็สะสมโดยที่เราไม่รู้ตัว<br />
              การประเมินสุขภาพจิตเป็นประจำจะช่วยให้คุณรู้ตัวทัน<br />
              ก่อนที่ความเครียดจะส่งผลกระทบต่อชีวิตประจำวัน"
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. Main Services Content -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-6 py-16">
      <div class="text-center">
        <h4 class="text-sm font-bold text-[#0D9488] mb-2 uppercase tracking-wider">Services</h4>
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-14">"ให้เราช่วยดูแลใจคุณในทุกๆ วัน"</h2>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <!-- Render Cards from Data -->
          <div 
            v-for="(service, index) in servicesList" 
            :key="index"
            class="bg-[#4b4b4b] rounded-[2rem] aspect-[4/3] flex flex-col items-center justify-center p-8 text-white shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <h3 class="text-xl md:text-2xl font-bold mb-4">{{ service.title }}</h3>
            <p class="text-gray-300 text-sm mb-8 text-center px-4">{{ service.description }}</p>
            <router-link :to="'/services/' + service.id" class="bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white px-8 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md inline-block">
              See detail
            </router-link>
            <button class="bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white px-8 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md">
              See detail
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- 3. Footer -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
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
            <li><a href="#" class="hover:underline">Self-Care Resource Library</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Contact</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ DMHAB@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">Hotline</router-link>
          <p class="text-xs text-[#D1FAE5]">สายด่วนสุขภาพจิต 1323</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        © 2026 DMHAB. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { inject } from 'vue'

// ดึง State ควบคุมโหมดตาบอดสีที่ Provide มาจาก Component หลัก (App.vue)
const isColorBlindMode = inject('isColorBlindMode')

// ข้อมูลสำหรับวนลูปสร้างการ์ด (ช่วยให้โค้ดส่วน Template สะอาดขึ้น)
const servicesList = [
  {
    id: 'daily-checkin',
    title: 'เช็คอินสุขภาพจิตรายวัน',
    description: 'ระบบบันทึกและติดตามความรู้สึกประจำวัน'
  },
  {
    id: 'assessment',
    title: 'ประเมินสุขภาพจิตเบื้องต้น',
    description: 'แบบทดสอบความเครียด/ซึมเศร้าที่เป็นมาตรฐาน'
  },
  {
    id: 'listening-space',
    title: 'พื้นที่รับฟัง 24 ชั่วโมง',
    description: 'แชทพูดคุยระบายความรู้สึกแบบส่วนตัว'
  },
  {
    id: 'relaxation',
    title: 'แนะนำกิจกรรมผ่อนคลาย',
    description: 'แนะนำกิจกรรมและบทความที่เหมาะสมกับคุณ'
  }
]
</script>