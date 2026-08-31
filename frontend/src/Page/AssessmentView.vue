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
          <a href="#" class="hover:text-[#D1FAE5] transition">Services</a>
          <a href="#" class="hover:text-[#D1FAE5] transition">Blog</a>
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
      <div class="container mx-auto px-10 pt-10 pb-28 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              แบบประเมินสุขภาพจิตเบื้องต้น
            </h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed">
              เพื่อนคู่คิดดิจิทัล เพื่อชีวิตที่ดีของคุณ<br />
              เช็กอารมณ์และความเครียดสั้นๆ ผ่านบทสนทนาที่เป็นมิตร สะท้อนสภาวะจิตใจประจำวัน
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. Main Content Container -->
    <main class="flex-1 w-full max-w-4xl mx-auto px-6 -mt-6 relative z-20 space-y-10">

      <!-- Section 1: Daily Quick Check-in -->
      <section class="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 class="text-xl font-bold text-[#1E293B] mb-2">
          รูปแบบที่ 1: คำถามประจำวัน (Daily Quick Check-in)
        </h2>
        <hr class="border-gray-200 mb-6" />

        <p class="text-base font-semibold text-[#1E293B] mb-6">
          คำถาม: "วันนี้โดยรวมแล้ว คุณรู้สึกอย่างไรบ้าง?"
        </p>

        <!-- Emoji Radio Scale -->
        <div class="space-y-4 max-w-lg">
          <label 
            v-for="(option, idx) in moodOptions" 
            :key="idx"
            class="flex items-center gap-4 p-3 rounded-2xl cursor-pointer hover:bg-[#FAF9F5] transition group border border-transparent hover:border-gray-200"
          >
            <span class="text-3xl transform group-hover:scale-110 transition-transform">{{ option.emoji }}</span>
            <input 
              type="radio" 
              name="daily-mood" 
              :value="option.value" 
              v-model="selectedMood"
              class="w-4 h-4 text-[#0D9488] focus:ring-[#0D9488] cursor-pointer" 
            />
            <span class="text-sm font-medium text-[#1E293B]">({{ option.label }})</span>
          </label>
        </div>
      </section>

      <!-- Section 2: Mental Health Screening -->
      <section class="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 class="text-xl font-bold text-[#1E293B] mb-2">
          รูปแบบที่ 2: ชุดคำถามคัดกรองเบื้องต้น (Mental Health Screening)
        </h2>
        <hr class="border-gray-200 mb-6" />
        <p class="text-base font-semibold text-[#1E293B] mb-6">
          0 = ไม่เลย
          1 = เฉยๆ
          2 = มีบ้าง
          3 = มาก
        </p>
        <!-- Screening Questions List -->
        <div class="space-y-8">
          <div 
            v-for="(q, index) in screeningQuestions" 
            :key="q.id"
            class="space-y-3"
          >
            <p class="text-sm font-semibold text-[#1E293B]">
              {{ index + 1 }}. {{ q.text }}
            </p>

            <!-- Score Options (0-3) -->
            <div class="flex flex-wrap gap-3">
              <button
                v-for="score in [0, 1, 2, 3]"
                :key="score"
                type="button"
                @click="screeningAnswers[q.id] = score"
                :class="[
                  'w-10 h-10 rounded-full font-bold text-sm transition-all flex items-center justify-center shadow-sm',
                  screeningAnswers[q.id] === score 
                    ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105' 
                    : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                ]"
              >
                {{ score }}
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-10 text-right">
          <button 
            @click="submitAssessment"
            :disabled="!isFormValid"
            class="px-8 py-3 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl font-medium shadow-md hover:shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
          >
            ส่งแบบประเมิน
          </button>
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
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '../stores/assessmentStore'

// ดึง State ควบคุมโหมดตาบอดสีที่ Provide มาจาก Component หลัก (App.vue)
const isColorBlindMode = inject('isColorBlindMode')
const router = useRouter()
const assessmentStore = useAssessmentStore()

// State คำตอบ
const selectedMood = ref(null)
const screeningAnswers = ref({})

// ตรวจสอบว่าผู้ใช้ตอบครบทั้งรูปแบบที่ 1 และ 2 แล้วหรือยัง
const isFormValid = computed(() => {
  return selectedMood.value !== null && Object.keys(screeningAnswers.value).length === screeningQuestions.length
})

// ตัวเลือกรูปแบบที่ 1 (Emoji)
const moodOptions = [
  { label: 'เครียด/เศร้ามาก', value: 'เครียด/เศร้ามาก' },
  { label: 'กังวล', value: 'กังวล' },
  { label: 'เฉยๆ/ปกติ', value: 'เฉยๆ/ปกติ' },
  { label: 'ดี/โอเค', value: 'ดี/โอเค' },
  { label: 'มีความสุขมาก/พลังเต็มเปี่ยม', value: 'มีความสุขมาก/พลังเต็มเปี่ยม' }
]

// ชุดคำถามรูปแบบที่ 2
const screeningQuestions = [
  { id: 1, text: 'เบื่อ ทำอะไรๆ ก็ไม่สนุก ไม่เพลิดเพลิน' },
  { id: 2, text: 'ไม่สบายใจ หดหู่ หรือท้อแท้' },
  { id: 3, text: 'หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากเกินไป' },
  { id: 4, text: 'เหนื่อยง่าย หรือไม่ค่อยมีแรง' }
]

const submitAssessment = () => {
  // คำนวณคะแนนรวม
  let totalScore = 0
  for (const id in screeningAnswers.value) {
    totalScore += screeningAnswers.value[id]
  }

  // ประเมินระดับ (ตัวอย่าง: >= 8 คือ SEVERE, >= 4 คือ MODERATE)
  let level = 'NORMAL'
  if (totalScore >= 8) {
    level = 'SEVERE'
  } else if (totalScore >= 4) {
    level = 'MODERATE'
  }

  // เก็บผลลัพธ์ลง Store
  assessmentStore.setAssessmentResult(totalScore, level)

  // เปลี่ยนหน้าไปแสดงผล
  router.push('/assessment-result')
}
</script>