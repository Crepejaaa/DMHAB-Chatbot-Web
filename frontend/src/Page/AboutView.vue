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
          <router-link to="/about" class="text-white font-bold underline decoration-2 underline-offset-4">About</router-link>
          <router-link to="/services" class="hover:text-[#D1FAE5] transition">Services</router-link>
          <router-link to="/blog" class="hover:text-[#D1FAE5] transition">Blog</router-link>
        </div>

        <!-- ฝั่งขวาสุด: Color Blindness Toggle + Profile Menu -->
        <div class="flex gap-3 items-center text-sm">
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

          <ProfileMenu />
        </div>
      </nav>

      <!-- Page Title Header -->
      <div class="container mx-auto px-6 lg:px-10 pt-6 pb-20 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              About Us
            </h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed italic">
              "เพราะทุกความรู้สึกของคุณมีความหมาย"<br />
              เราคือพื้นที่ปลอดภัยในจอมือถือที่พร้อมอยู่เคียงข้างคุณในทุกๆ วัน<br />
              ไม่ว่าวันนี้คุณจะเจอเรื่องสุข เศร้า เหงา หรือเหนื่อยล้า
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. Main Content Container -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-6 py-16 space-y-20">

      <!-- Section 1: พันธกิจของเรา -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Illustration Left -->
        <div class="flex justify-center">
          <div class="w-full max-w-sm bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] rounded-3xl p-8 shadow-sm border border-sky-100 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-md transition">
            <svg class="w-48 h-64 text-[#0369A1] transition-transform duration-500 group-hover:scale-105" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Background elements -->
              <circle cx="100" cy="100" r="70" fill="white" fill-opacity="0.6"/>
              <path d="M40 240C40 200 70 170 100 170C130 170 160 200 160 240" stroke="#0284C7" stroke-width="8" stroke-linecap="round"/>
              <!-- Character body & head -->
              <circle cx="100" cy="90" r="30" fill="#0284C7"/>
              <path d="M85 140C85 125 115 125 115 140V180H85V140Z" fill="#0369A1"/>
              <!-- Heart held in hands -->
              <path d="M100 135 C100 135, 80 115, 80 100 C80 90, 90 82, 100 92 C110 82, 120 90, 120 100 C120 115, 100 135, 100 135 Z" fill="#EF4444"/>
              <!-- Leaves around -->
              <path d="M30 180Q50 160 30 140Q10 160 30 180Z" fill="#38BDF8" fill-opacity="0.7"/>
              <path d="M170 180Q190 160 170 140Q150 160 170 180Z" fill="#38BDF8" fill-opacity="0.7"/>
            </svg>
          </div>
        </div>

        <!-- Content Right -->
        <div class="space-y-4">
          <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B]">
            พันธกิจของเรา
          </h2>
          <div class="w-12 h-1 bg-[#0D9488] rounded-full"></div>
          <p class="text-sm md:text-base text-[#475569] leading-relaxed pt-2">
            เพื่อส่งเสริมสุขภาพจิตที่ดีในทุกๆ วัน -<br />
            เราสร้างแชทบอทนี้เพื่อช่วยให้คุณสำรวจและทำความเข้าใจอารมณ์ของคุณได้อย่างง่ายดาย<br />
            สนับสนุนเส้นทางสู่ความเป็นอยู่ที่ดีอย่างต่อเนื่อง
          </p>
        </div>
      </section>

      <!-- Section 2: จุดเด่นของแชทบอท -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Content Left on desktop -->
        <div class="space-y-4 order-2 md:order-1">
          <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B]">
            จุดเด่นของแชทบอท
          </h2>
          <div class="w-12 h-1 bg-[#0D9488] rounded-full"></div>
          <p class="text-sm md:text-base text-[#475569] leading-relaxed pt-2">
            สะดวก, สามารถประเมินและแนะนำแนวทางโดยใช้เวลาเพียงไม่กี่นาที<br />
            ผ่านแชทที่เข้าใจง่าย ข้อมูลของคุณปลอดภัย<br />
            และรับคำแนะนำในการดูแลตัวเองเบื้องต้น
          </p>
        </div>

        <!-- Illustration Right -->
        <div class="flex justify-center order-1 md:order-2">
          <div class="w-full max-w-sm bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] rounded-3xl p-8 shadow-sm border border-amber-100 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-md transition">
            <svg class="w-48 h-64 text-[#D97706] transition-transform duration-500 group-hover:scale-105" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Smartphone frame -->
              <rect x="50" y="30" width="110" height="200" rx="20" fill="#1E293B"/>
              <rect x="58" y="45" width="94" height="170" rx="10" fill="#F8FAFC"/>
              <!-- Chat bubbles -->
              <rect x="66" y="60" width="60" height="35" rx="10" fill="#38BDF8"/>
              <rect x="84" y="105" width="60" height="35" rx="10" fill="#F59E0B"/>
              <!-- Smiley Face on Chat -->
              <circle cx="100" cy="165" r="22" fill="#FBBF24"/>
              <circle cx="93" cy="160" r="3" fill="#78350F"/>
              <circle cx="107" cy="160" r="3" fill="#78350F"/>
              <path d="M92 172 C95 178, 105 178, 108 172" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- Section 3: ความมุ่งมั่นของเรา -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Illustration Left -->
        <div class="flex justify-center">
          <div class="w-full max-w-sm bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] rounded-3xl p-8 shadow-sm border border-emerald-100 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-md transition">
            <svg class="w-48 h-64 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Sun in background -->
              <circle cx="140" cy="70" r="32" fill="#F59E0B"/>
              <path d="M140 25 V15 M140 125 V115 M85 70 H95 M185 70 H195 M101 31 L108 38 M172 102 L179 109 M101 109 L108 102 M172 38 L179 31" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
              <!-- Clouds background -->
              <path d="M20 120 Q35 105 50 120 T80 120" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
              <path d="M120 135 Q135 125 150 135 T180 135" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
              <!-- Soil mound -->
              <path d="M70 175 C70 160 130 160 130 175 Z" fill="#78350F"/>
              <!-- Sprout Stem & Leaves -->
              <path d="M100 170 C100 145 98 125 98 115" stroke="#15803D" stroke-width="5" stroke-linecap="round"/>
              <!-- Left leaf -->
              <path d="M98 135 C70 115 55 125 65 140 C80 145 95 138 98 135 Z" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
              <!-- Right leaf -->
              <path d="M98 130 C125 110 140 120 130 135 C115 140 100 133 98 130 Z" fill="#4ADE80" stroke="#15803D" stroke-width="2.5"/>
              <!-- Hand holding -->
              <path d="M40 210 C50 175 80 175 105 180 C130 185 155 170 170 175 C180 180 170 195 150 205 C130 215 90 205 65 205" fill="#FDBA74" stroke="#7C2D12" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M35 220 L55 240" stroke="#15803D" stroke-width="12" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Content Right -->
        <div class="space-y-4">
          <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B]">
            ความมุ่งมั่นของเรา
          </h2>
          <div class="w-12 h-1 bg-[#0D9488] rounded-full"></div>
          <p class="text-sm md:text-base text-[#475569] leading-relaxed pt-2">
            มุ่งมั่นที่จะเติบโตไปพร้อมกับคุณ เราจะพัฒนาแชทบอทอย่าง<br />
            ต่อเนื่องเพื่อให้การสนับสนุนสุขภาพจิตมีประสิทธิภาพและเข้าถึงได้มากยิ่งขึ้น
          </p>
        </div>
      </section>

    </main>

    <!-- Footer -->
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
</script>
