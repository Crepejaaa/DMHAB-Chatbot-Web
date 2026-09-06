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
    <main class="flex-1 w-full max-w-4xl mx-auto px-6 -mt-6 relative z-20 space-y-10 pb-16">

      <!-- ===== Section 2Q ===== -->
      <section class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 pt-8 pb-4">
          <h2 class="text-lg font-bold text-[#1E293B] mb-1">โปรดตอบคำถามต่อไปนี้ตามความเป็นจริงในช่วง 2 สัปดาห์ที่ผ่านมา</h2>
        </div>

        <div class="overflow-x-auto px-8 pb-8">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#F0FDF4]">
                <th class="text-left py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 rounded-tl-lg">คำถาม</th>
                <th class="py-3 px-6 font-semibold text-[#1E293B] border border-gray-200 text-center w-24">มี</th>
                <th class="py-3 px-6 font-semibold text-[#1E293B] border border-gray-200 text-center w-24 rounded-tr-lg">ไม่มี</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q2Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'">
                <td class="py-4 px-4 border border-gray-200 text-[#374151] leading-relaxed">{{ idx + 1 }}. {{ q.text }}</td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q2Answers[q.id] = 1"
                    :class="[
                      'w-14 h-9 rounded-full font-bold text-xs transition-all flex items-center justify-center mx-auto shadow-sm',
                      q2Answers[q.id] === 1
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >มี</button>
                </td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q2Answers[q.id] = 0"
                    :class="[
                      'w-14 h-9 rounded-full font-bold text-xs transition-all flex items-center justify-center mx-auto shadow-sm',
                      q2Answers[q.id] === 0
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >ไม่มี</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===== Section 9Q ===== -->
      <section class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 pt-8 pb-4">
          <h2 class="text-lg font-bold text-[#1E293B] mb-2">ในช่วง 2 สัปดาห์ที่ผ่านมา ท่านมีอาการต่อไปนี้บ่อยแค่ไหน</h2>

          <!-- Score Legend -->
          <div class="flex flex-wrap gap-3 mb-6">
            <span v-for="leg in q9Legend" :key="leg.val" class="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <span class="inline-flex w-7 h-7 rounded-full bg-[#F1F5F9] items-center justify-center font-bold text-[#0D9488]">{{ leg.val }}</span>
              {{ leg.label }}
            </span>
          </div>
        </div>

        <div class="overflow-x-auto px-8 pb-8">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#F0FDF4]">
                <th class="text-left py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 rounded-tl-lg">คำถาม</th>
                <th v-for="leg in q9Legend" :key="leg.val" class="py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 text-center w-20">{{ leg.val }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q9Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'">
                <td class="py-4 px-4 border border-gray-200 text-[#374151] leading-relaxed">{{ idx + 1 }}. {{ q.text }}</td>
                <td v-for="score in [0, 1, 2, 3]" :key="score" class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q9Answers[q.id] = score"
                    :class="[
                      'w-9 h-9 rounded-full font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm',
                      q9Answers[q.id] === score
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >{{ score }}</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-[#F0FDF4]">
                <td class="py-3 px-4 border border-gray-200 font-semibold text-right text-[#1E293B]" colspan="1">คะแนนรวมทั้งหมด</td>
                <td class="py-3 border border-gray-200 text-center font-bold text-[#0D9488]" colspan="4">{{ q9TotalScore }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <!-- ===== Section 8Q ===== -->
      <section class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 pt-8 pb-4">
          <h2 class="text-lg font-bold text-[#1E293B] mb-1">ในช่วง 1 เดือนที่ผ่านมา มีเหตุการณ์ต่อไปนี้เกิดขึ้นหรือไม่</h2>
        </div>

        <div class="overflow-x-auto px-8 pb-8">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#FFF1F2]">
                <th class="text-left py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 rounded-tl-lg" style="width:65%">คำถาม</th>
                <th class="py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 text-center">ไม่มี</th>
                <th class="py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 text-center rounded-tr-lg">มี</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q8Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'">
                <td class="py-4 px-4 border border-gray-200 text-[#374151] leading-relaxed">
                  <span class="font-semibold">{{ idx + 1 }}.</span> {{ q.text }}
                  <span v-if="q.sub" class="block text-xs text-gray-400 mt-1 italic">({{ q.sub }})</span>
                </td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q8Answers[q.id] = 0"
                    :class="[
                      'w-9 h-9 rounded-full font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm',
                      q8Answers[q.id] === 0
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >0</button>
                </td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q8Answers[q.id] = q.score"
                    :class="[
                      'w-9 h-9 rounded-full font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm',
                      q8Answers[q.id] === q.score
                        ? 'bg-rose-500 text-white ring-2 ring-rose-400/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >{{ q.score }}</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-[#FFF1F2]">
                <td class="py-3 px-4 border border-gray-200 font-semibold text-right text-[#1E293B]" colspan="1">คะแนนรวมทั้งหมด</td>
                <td class="py-3 border border-gray-200 text-center font-bold text-rose-600" colspan="2">{{ q8TotalScore }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <!-- ===== Submit Button ===== -->
      <div class="text-right pb-2">
        <button
          @click="submitAssessment"
          :disabled="!isFormValid"
          class="px-10 py-3 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ส่งแบบประเมิน
        </button>
      </div>

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

const isColorBlindMode = inject('isColorBlindMode')
const router = useRouter()
const assessmentStore = useAssessmentStore()

// ===== 2Q =====
const q2Questions = [
  { id: 1, text: 'ใน 2 สัปดาห์ที่ผ่านมา รู้สึกหม่นหมอง ไม่มีความสุข หรือสิ้นหวัง' },
  { id: 2, text: 'ใน 2 สัปดาห์ที่ผ่านมา รู้สึกเบื่อหน่าย ทำอะไรก็ไม่สนุกไม่เพลิดเพลิน' },
]
const q2Answers = ref({})

// ===== 9Q =====
const q9Legend = [
  { val: 0, label: 'ไม่มีเลย' },
  { val: 1, label: 'เป็นบางวัน 1-7 วัน' },
  { val: 2, label: 'เป็นบ่อย > 7 วัน' },
  { val: 3, label: 'เป็นทุกวัน' },
]
const q9Questions = [
  { id: 1, text: 'เบื่อ ไม่สนใจอยากทำอะไร' },
  { id: 2, text: 'ไม่สบายใจ ซึมเศร้า ท้อแท้' },
  { id: 3, text: 'หลับยากหรือหลับๆ ตื่นๆ หรือหลับมากเกินไป' },
  { id: 4, text: 'เหนื่อยง่ายหรือไม่ค่อยมีแรง' },
  { id: 5, text: 'เบื่ออาหารหรือกินมากเกินไป' },
  { id: 6, text: 'รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลวหรือครอบครัวผิดหวัง' },
  { id: 7, text: 'สมาธิไม่ดี เวลาทำอะไรเช่น อ่านหนังสือพิมพ์ ดูโทรทัศน์ สิ่งที่ทำอยู่นั้นได้ยาก' },
  { id: 8, text: 'พูดช้า หรือทำอะไรช้าลงจนคนอื่นสังเกตได้ หรือกระสับกระส่ายจนไม่สามารถอยู่นิ่งได้มากกว่าปกติ' },
  { id: 9, text: 'คิดทำร้ายตนเอง หรือคิดว่าตายไปจะดีกว่าอยู่' },
]
const q9Answers = ref({})
const q9TotalScore = computed(() => Object.values(q9Answers.value).reduce((a, b) => a + b, 0))

// ===== 8Q =====
const q8Questions = [
  { id: 1, text: 'คิดอยากตาย หรือ คิดว่าตายไปจะดีกว่า', score: 1 },
  { id: 2, text: 'อยากทำร้ายร่างกายตนเอง หรือ ทำให้ตนเองบาดเจ็บ', score: 2 },
  { id: 3, text: 'คิดเรื่องการฆ่าตัวตายบ่อยแค่ไหน', sub: 'ถ้าตอบว่าคิดเรื่องการฆ่าตัวตาย (ในข้อ 1 หรือ 2 แล้ว) ... ท่านสามารถบอกได้ไหมว่า ท่านจะทำหรือไม่', score: 6 },
  { id: 4, text: 'มีแผนการที่จะฆ่าตัวตาย', score: 8 },
  { id: 5, text: 'ได้เตรียมการฆ่าตัวตาย หรือเตรียมการจะฆ่าตัวตายโดยตั้งใจวางแผนที่จะทำโดยตายจริง ๆ', score: 9 },
  { id: 6, text: 'ได้ทำร้ายตนเองจนเกิดบาดแผลหรืออันตรายถึงชีวิต', score: 4 },
  { id: 7, text: 'ได้เคยพยายามฆ่าตัวตาย/ตั้งใจให้ตายจริงๆ', score: 10 },
  { id: 8, text: 'คนรอบข้างที่คุณรู้จัก/แวดล้อมท่านฆ่าตัวตาย', score: 4 },
]
const q8Answers = ref({})
const q8TotalScore = computed(() => Object.values(q8Answers.value).reduce((a, b) => a + b, 0))

// ===== Validation =====
const isFormValid = computed(() => {
  const q2Done = q2Questions.every(q => q2Answers.value[q.id] !== undefined)
  const q9Done = q9Questions.every(q => q9Answers.value[q.id] !== undefined)
  const q8Done = q8Questions.every(q => q8Answers.value[q.id] !== undefined)
  return q2Done && q9Done && q8Done
})

// ===== Submit =====
const submitAssessment = () => {
  const q9Score = q9TotalScore.value
  const q8Score = q8TotalScore.value

  let level = 'NORMAL'
  if (q9Score >= 19 || q8Score >= 9) level = 'SEVERE'
  else if (q9Score >= 7) level = 'MODERATE'

  assessmentStore.setFullResult({
    score: q9Score,
    level,
    q2Answers: { ...q2Answers.value },
    q9Answers: { ...q9Answers.value },
    q8Answers: { ...q8Answers.value },
    q9Score,
    q8Score,
    needsQ9: Object.values(q2Answers.value).some(v => v === 1),
    needsQ8: q9Score >= 7,
  })

  router.push('/assessment-result')
}
</script>
