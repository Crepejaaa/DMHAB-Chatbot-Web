<template>
  <!-- เพิ่ม :class เพื่อผูกกับตัวแปร isColorBlindMode ถ้าเป็น true จะใช้คลาส grayscale ของ Tailwind -->
  <div :class="['min-h-screen bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Navbar -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center font-bold text-white border border-white/40"></div>
        <span class="text-xl font-bold tracking-wide">DMHAB</span>
      </div>
      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <a href="#" class="hover:text-cyan-100 transition">Home</a>
        <a href="#" class="hover:text-cyan-100 transition">About</a>
        <a href="#" class="hover:text-cyan-100 transition">Service</a>
        <a href="#" class="hover:text-cyan-100 transition">Blog</a>
      </div>
      
      <div class="flex gap-3 items-center text-sm">
        
        <!-- สวิตช์เลื่อน เปิด/ปิด โหมดขาวดำ (Grayscale Mode) -->
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

        <button class="px-5 py-1.5 rounded-full border border-white/60 hover:bg-white/10 transition">Login</button>
        <button class="px-5 py-1.5 bg-dmihab-dark hover:bg-emerald-900 text-white rounded-full font-medium transition shadow-sm">Register</button>
      </div>
    </nav>

    <!-- 2. Hero Section -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 class="text-4xl font-extrabold text-dmihab-text leading-tight mb-4">
          Daily Mental Health<br />Assessment Bot
        </h1>
        <p class="text-dmihab-muted mb-8 text-base">
          แชทบอทประเมินสุขภาพจิตประจำวัน ใช้งานง่าย ปลอดภัย เป็นเพื่อนที่อุ่นใจให้กับคุณทุกวัน
        </p>
        <button class="px-8 py-3 bg-gradient-to-r from-dmihab-primary to-dmihab-emerald hover:opacity-90 text-white rounded-full font-semibold shadow-md transition">
          เริ่มต้นใช้งาน
        </button>
      </div>
      <div class="flex justify-center">
        <!-- รูปหมอและหัวใจ -->
        <div class="w-80 h-64 bg-white/60 border-2 border-dashed border-dmihab-primary/30 rounded-2xl flex items-center justify-center text-dmihab-primary font-medium">
          [รูปภาพ ]
        </div>
      </div>
    </section>

    <!-- 3. Features Highlight Section -->
    <section class="max-w-6xl mx-auto px-6 py-12 text-center">
      <h2 class="text-xl md:text-2xl font-bold mb-10 text-dmihab-text">
        "ทำไมแชทบอทของเราถึงเป็นเพื่อนคู่คิดด้านสุขภาพจิตที่ดีที่สุดของคุณ"
      </h2>
      
      <div class="grid md:grid-cols-3 gap-6 items-stretch">
        <!-- Card 1 -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div class="text-3xl mb-4">❤️</div>
          <h3 class="font-bold text-lg mb-2">การดูแลแบบเฉพาะบุคคล</h3>
          <p class="text-xs text-dmihab-muted">แนวทางการบำบัดให้ตอบโจทย์ปัญหาและเป้าหมายของแต่ละบุคคล</p>
        </div>

        <!-- Card 2 (Highlighted Gradient) -->
        <div class="bg-gradient-to-b from-[#0D9488] to-[#059669] text-white p-8 rounded-2xl shadow-lg transform md:-translate-y-2 flex flex-col items-center justify-center">
          <div class="text-3xl mb-4">✨</div>
          <h3 class="font-bold text-lg mb-2">พูดคุยได้ 24 ชั่วโมง</h3>
          <p class="text-xs text-cyan-100">มีบริการให้คำปรึกษาออนไลน์ที่เลือกเวลาได้ตามสะดวก</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div class="text-3xl mb-4">🛡️</div>
          <h3 class="font-bold text-lg mb-2">พื้นที่ปลอดภัย</h3>
          <p class="text-xs text-dmihab-muted">การันตีการเก็บรักษาความลับของคุณจะปลอดภัยในบรรยากาศที่สบายใจ</p>
        </div>
      </div>
    </section>

    <!-- 4. About Us / Doctor Section -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div class="flex justify-center">
        <div class="w-72 h-72 bg-white/60 border-2 border-dashed border-dmihab-primary/30 rounded-2xl flex items-center justify-center text-dmihab-primary font-medium">
          [รูปภาพ]
        </div>
      </div>
      <div>
        <span class="text-xs font-semibold text-dmihab-primary uppercase tracking-wider">About Us</span>
        <h2 class="text-2xl font-bold mt-2 mb-4 leading-snug">
          "เราคือพื้นที่ปลอดภัยในรูปแบบแชทบอท ที่พร้อมรับฟังเช็คอินอารมณ์และ
ช่วยคุณดูแลสุขภาพจิตในชีวิตประจำวันตลอด 24 ชั่วโมงเพราะเราเชื่อว่าทุกความรู้สึกของคุณมีความหมาย"
        </h2>
        <button class="px-6 py-2 bg-dmihab-primary hover:bg-dmihab-dark text-white rounded-full font-medium text-sm transition shadow-sm mt-2">
          อ่านต่อ
        </button>
      </div>
    </section>

    <!-- 5. App Banner Section -->
    <section class="max-w-6xl mx-auto px-6 py-12">
      <div class="bg-white text-[#1E293B] border border-gray-100 rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-xl">
        <!-- ฝั่งซ้าย: รูปจำลองแอปมือถือ -->
        <div class="p-8 md:p-12 flex items-center justify-center bg-[#FAF9F5]">
          <div class="w-48 h-80 bg-white border-2 border-dashed border-[#0D9488]/40 rounded-3xl flex items-center justify-center text-[#0D9488] font-medium shadow-sm">
            [รูปตัวแชท]
          </div>
        </div>
        <!-- ฝั่งขวา: ข้อความสีดำอ่านง่าย -->
        <div class="p-8 md:p-12 flex flex-col justify-center">
          <h2 class="text-2xl font-bold mb-6 leading-relaxed text-[#1E293B]">
            การใช้แชทบอทวิเคราะห์และประเมินสุขภาพจิต เพื่อยกระดับคุณภาพชีวิตในทุกๆ วัน
          </h2>
          <div class="space-y-4 text-sm">
            <div class="flex items-center gap-3 bg-[#FAF9F5] p-3 rounded-xl border border-gray-100">
              <span class="bg-[#0D9488]/10 p-2 rounded-lg text-[#0D9488]">🩺</span>
              <span class="font-medium text-[#1E293B]">Professional Assessment</span>
            </div>
            <div class="flex items-center gap-3 bg-[#FAF9F5] p-3 rounded-xl border border-gray-100">
              <span class="bg-[#0D9488]/10 p-2 rounded-lg text-[#0D9488]">💡</span>
              <span class="font-medium text-[#1E293B]">Real-time Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Footer -->
    <footer class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 mt-20">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold"></div>
            <span class="font-bold text-lg">DMHAB</span>
          </div>
          <p class="text-xs text-cyan-100 leading-relaxed">ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">Services</h4>
          <ul class="space-y-2 text-xs text-cyan-100">
            <li><a href="#" class="hover:underline">Daily Chatbot</a></li>
            <li><a href="#" class="hover:underline">Personalized Feedback</a></li>
            <li><a href="#" class="hover:underline">Self-Care Resource Library</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Contact</h4>
          <ul class="space-y-2 text-xs text-cyan-100">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ DMHAB@Domain.com</li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Hotline</h4>
          <p class="text-xs text-cyan-100">สายด่วนสุขภาพจิต 1323</p>
        </div>
      </div>
      <div class="text-center text-xs text-cyan-200 pt-6">
        © 2026 DMHAB. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// ตัวแปรสำหรับเก็บสถานะการเปิด/ปิดโหมดขาวดำ
const isColorBlindMode = ref(false)
</script>