<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page bg-[#0F172A] text-slate-100' : '']">

    <!-- 1. Navbar -->
    <AppNavbar :show-back="true" />

    <!-- 2. Header Banner -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden shadow-md">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <circle cx="350" cy="120" r="160" fill="currentColor"/>
          <circle cx="460" cy="420" r="100" fill="currentColor"/>
        </svg>
      </div>

      <div class="container mx-auto max-w-4xl relative z-10 text-center sm:text-left">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-emerald-100 mb-2">
          <span>📊 ผลการคัดกรองสุขภาพจิตเบื้องต้น</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          ผลการประเมินของคุณ
        </h1>
        <p class="text-xs sm:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed">
          ขอบคุณที่เปิดใจและสละเวลาดูแลสุขภาพจิตของตัวเอง การรู้เท่าทันอารมณ์คือจุดเริ่มต้นที่ดีเสมอ
        </p>
      </div>
    </header>

    <!-- 3. Main Content Container -->
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-6 pb-16">

      <!-- ==================== REQUIREMENT 4.1: Medical Disclaimer Alert Box ==================== -->
      <div class="p-5 sm:p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 shadow-md">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 dark:text-amber-200 flex items-center justify-center text-2xl shrink-0">
            ⚠️
          </div>
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-200 dark:bg-amber-900 px-2.5 py-0.5 rounded-full">
                ข้อควรทราบสำคัญทางการแพทย์
              </span>
            </div>
            <!-- Large prominent disclaimer headline -->
            <h2 class="text-base sm:text-lg font-black text-amber-950 dark:text-amber-100 leading-snug">
              "ระบบนี้เป็นเครื่องมือคัดกรองเบื้องต้น ไม่สามารถใช้วินิจฉัยโรคแทนแพทย์ได้"
            </h2>
            <p class="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 mt-2 leading-relaxed">
              แบบประเมินนี้จัดทำขึ้นเพื่อให้คุณตระหนักรู้ถึงสภาวะอารมณ์และความเครียดในช่วงเวลาที่ผ่านมาเท่านั้น
              หากคุณมีอาการเครียด วิตกกังวล หรือซึมเศร้าต่อเนื่องจนรบกวนชีวิตประจำวัน
              กรุณาติดต่อจิตแพทย์ นักจิตวิทยา หรือบุคลากรทางการแพทย์เพื่อรับการประเมินและการรักษาอย่างถูกต้อง
            </p>
          </div>
        </div>
      </div>

      <!-- ==================== REQUIREMENT 4.2: Emergency CTA (Condition: High Risk) ==================== -->
      <div
        v-if="isHighRisk"
        class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-50 via-rose-100/80 to-red-100 dark:from-rose-950/80 dark:via-red-950/60 dark:to-slate-900 border-2 border-rose-500 shadow-xl relative overflow-hidden"
      >
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-start gap-4 text-center md:text-left">
            <div class="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-rose-600/30 animate-bounce">
              🚨
            </div>
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs mb-2">
                <span>⚠️ สัญญาณเตือนเร่งด่วน (Urgent Support Needed)</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-black text-rose-950 dark:text-rose-100 tracking-tight leading-tight">
                คุณอาจกำลังอยู่ในภาวะที่มีความเสี่ยงสูง เราพร้อมอยู่เคียงข้างคุณ
              </h2>
              <p class="text-xs sm:text-sm text-rose-800 dark:text-rose-200 mt-2 leading-relaxed max-w-xl">
                หากคุณรู้สึกท่วมท้น หมดพลัง หรือมีความคิดทำร้ายตนเอง กรุณาอย่าเก็บความรู้สึกไว้คนเดียว
                มีผู้เชี่ยวชาญพร้อมรับฟัง ให้คำปรึกษา และช่วยเหลือคุณอย่างปลอดภัยตลอด 24 ชั่วโมง
              </p>
            </div>
          </div>

          <!-- Highlighted Red Warning Call Button -->
          <div class="flex flex-col gap-2 w-full md:w-auto shrink-0">
            <a
              href="tel:1323"
              class="w-full md:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white text-base sm:text-lg font-black rounded-2xl shadow-xl shadow-rose-600/35 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-3 cursor-pointer ring-4 ring-rose-400/40"
              title="โทรออกสายด่วน 1323 ทันที"
            >
              <span class="text-2xl animate-pulse">📞</span>
              <span>โทรสายด่วน 1323</span>
              <span class="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold ml-1">โทรฟรี 24 ชม.</span>
            </a>
            <p class="text-[11px] text-rose-700 dark:text-rose-300 text-center">
              สายด่วนสุขภาพจิต กรมสุขภาพจิต (ไม่มีค่าใช้จ่าย)
            </p>
          </div>
        </div>
      </div>

      <!-- Result Score Summary Card -->
      <div class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div class="p-6 sm:p-10">
          
          <div class="text-center mb-8">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">ระดับสภาวะอารมณ์ของคุณ</span>
            
            <div class="mt-4 flex justify-center">
              <div
                class="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full shadow-lg border-4 border-white dark:border-slate-800 transition-transform hover:scale-105"
                :class="scoreColorClass"
              >
                <span class="text-4xl font-black text-white leading-tight">{{ scoreText }}</span>
                <span class="text-xs font-semibold text-white/90 mt-1">
                  {{ assessmentResult.score !== undefined ? `${assessmentResult.score} คะแนน (9Q)` : '' }}
                </span>
              </div>
            </div>

            <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-6 tracking-tight">
              {{ suggestionTitle }}
            </h2>
            <p class="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              {{ suggestionDetail }}
            </p>
          </div>

          <!-- Score Breakdown Badges -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b border-gray-100 dark:border-slate-800 my-6">
            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">คะแนนแบบประเมินภาวะซึมเศร้า (9Q)</p>
                <p class="text-lg font-bold text-gray-800 dark:text-gray-100 mt-0.5">
                  {{ assessmentResult.q9Score ?? assessmentResult.score ?? 0 }} / 27 คะแนน
                </p>
              </div>
              <span class="text-2xl">🧠</span>
            </div>

            <div class="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">คะแนนแบบประเมินความเสี่ยงเร่งด่วน (8Q)</p>
                <p class="text-lg font-bold text-gray-800 dark:text-gray-100 mt-0.5" :class="assessmentResult.q8Score >= 9 ? 'text-rose-600' : ''">
                  {{ assessmentResult.q8Score ?? 0 }} คะแนน
                </p>
              </div>
              <span class="text-2xl">🛡️</span>
            </div>
          </div>

          <!-- Calm Hotline Info (shown if NOT high risk) -->
          <div v-if="!isHighRisk" class="p-4 rounded-2xl bg-teal-50 dark:bg-slate-800/80 border border-teal-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs sm:text-sm text-teal-900 dark:text-teal-200">
            <div class="flex items-center gap-2">
              <span class="text-xl">📞</span>
              <span>สายด่วนสุขภาพจิต 1323 พร้อมรับฟังและให้คำปรึกษาตลอด 24 ชั่วโมง (โทรฟรี)</span>
            </div>
            <a href="tel:1323" class="px-4 py-1.5 rounded-xl bg-[#0D9488] text-white font-bold text-xs hover:bg-[#045F54] transition shrink-0">
              โทร 1323
            </a>
          </div>

        </div>
      </div>

      <!-- ==================== REQUIREMENT 4.3: Next Step CTA (Chatbot Invitation) ==================== -->
      <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white shadow-xl relative overflow-hidden">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-start gap-4 text-center md:text-left">
            <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-3xl shrink-0 shadow-inner">
              💬
            </div>
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-emerald-100 font-extrabold text-xs mb-2">
                <span>ก้าวต่อไปของคุณ (Next Step)</span>
              </div>
              <h3 class="text-2xl font-black text-white tracking-tight">
                พูดคุยกับเพื่อนคู่คิด AI (PhuenJaiZone Bot)
              </h3>
              <p class="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed max-w-xl">
                ไม่ว่าคุณจะรู้สึกหนักใจ สับสน หรือต้องการใครสักคนคอยรับฟัง
                แชทบอทของเราพร้อมอยู่ข้างคุณ 24 ชั่วโมง ช่วยแนะนำวิธีผ่อนคลายและดูแลอารมณ์แบบส่วนตัว
              </p>
              
              <div class="flex flex-wrap gap-3 mt-4 text-xs text-emerald-200">
                <span class="flex items-center gap-1">🔒 เป็นส่วนตัว 100%</span>
                <span class="flex items-center gap-1">⏱️ พูดคุยได้ทันที</span>
                <span class="flex items-center gap-1">🌱 คำแนะนำดูแลใจ</span>
              </div>
            </div>
          </div>

          <!-- Highlighted Next Step CTA Button -->
          <div class="w-full md:w-auto shrink-0 flex flex-col items-center gap-2">
            <router-link
              to="/chat"
              class="w-full md:w-auto px-8 py-4 bg-white text-[#045F54] hover:bg-emerald-50 text-base sm:text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>💬 เริ่มพูดคุยกับแชทบอททันที</span>
              <span class="text-xl">&rarr;</span>
            </router-link>
            <span class="text-[11px] text-emerald-100">คลิกเพื่อเปิดห้องสนทนาได้เลย</span>
          </div>
        </div>
      </div>

      <!-- Action Shortcuts: Retry, Check-in, Home -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-4">
        <router-link
          to="/assessment"
          class="px-5 py-2.5 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition inline-flex items-center gap-1.5 shadow-xs"
        >
          <span>🔄</span>
          <span>ทำแบบประเมินใหม่อีกครั้ง</span>
        </router-link>

        <router-link
          to="/daily-checkin"
          class="px-5 py-2.5 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition inline-flex items-center gap-1.5 shadow-xs"
        >
          <span>📋</span>
          <span>เช็คอินอารมณ์ประจำวัน & บันทึกประวัติ</span>
        </router-link>

        <router-link
          to="/"
          class="px-5 py-2.5 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition inline-flex items-center gap-1.5 shadow-xs"
        >
          <span>🏠</span>
          <span>กลับหน้าแรก</span>
        </router-link>
      </div>

    </main>

    <!-- Emergency Modal (Auto-pops if High Risk, but dismissable) -->
    <div v-if="showEmergencyModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity" aria-hidden="true" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-rose-50 dark:bg-slate-900 rounded-3xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border-2 border-rose-500">
          <div>
            <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-3xl">
              🚨
            </div>
            <div class="mt-4 text-center">
              <h3 class="text-xl font-black text-rose-900 dark:text-rose-100" id="modal-title">
                คำเตือนฉุกเฉิน: พบระดับความเสี่ยงสูง
              </h3>
              <div class="mt-3">
                <p class="text-sm text-rose-800 dark:text-rose-200 leading-relaxed">
                  ผลการประเมินพบว่าท่านอาจกำลังเผชิญกับความเครียดรุนแรงหรือมีภาวะเสี่ยง 
                  กรุณาติดต่อสายด่วนสุขภาพจิต 1323 เพื่อรับคำแนะนำและความช่วยเหลือจากผู้เชี่ยวชาญทันที (โทรฟรีตลอด 24 ชม.)
                </p>
              </div>
            </div>
          </div>
          <div class="mt-6 flex flex-col gap-3">
            <a
              href="tel:1323"
              class="w-full inline-flex justify-center items-center gap-2 rounded-2xl shadow-lg px-5 py-3.5 bg-rose-600 text-base font-bold text-white hover:bg-rose-700 active:scale-95 transition-all"
            >
              <span>📞 โทร 1323 ทันที (โทรฟรี 24 ชม.)</span>
            </a>
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-2xl border border-gray-300 dark:border-slate-700 shadow-sm px-4 py-2.5 bg-white dark:bg-slate-800 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
              @click="closeModal"
            >
              รับทราบ / ดูรายละเอียดผลการประเมิน
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Footer -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <!-- โลโก้ Footer -->
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">PhuenJaiZone</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">Services</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><router-link to="/chat" class="hover:underline">Daily Chatbot</router-link></li>
            <li><router-link to="/daily-checkin" class="hover:underline">Personalized Feedback</router-link></li>
            <li><router-link to="/blog" class="hover:underline">Self-Care Resource Library</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Contact</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ PhuenJaiZone@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">Hotline</router-link>
          <p class="text-xs text-[#D1FAE5]">สายด่วนสุขภาพจิต 1323</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        © 2026 PhuenJaiZone. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import { useAssessmentStore } from '../stores/assessmentStore'

const isDarkMode = inject('isDarkMode', ref(false))
const assessmentStore = useAssessmentStore()

// Use real data from store
const assessmentResult = computed(() => assessmentStore.result)

const showEmergencyModal = ref(false)

// Requirement 4.2: High Risk Condition
const isHighRisk = computed(() => {
  return (
    assessmentResult.value.level === 'SEVERE' ||
    (assessmentResult.value.score !== undefined && assessmentResult.value.score >= 19) ||
    (assessmentResult.value.q8Score !== undefined && assessmentResult.value.q8Score >= 9)
  )
})

const scoreColorClass = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') return 'bg-emerald-500 shadow-emerald-500/30'
  if (assessmentResult.value.level === 'MODERATE') return 'bg-amber-500 shadow-amber-500/30'
  if (assessmentResult.value.level === 'SEVERE') return 'bg-rose-600 shadow-rose-600/30'
  return 'bg-gray-500'
})

const scoreText = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') return 'ปกติ'
  if (assessmentResult.value.level === 'MODERATE') return 'ปานกลาง'
  if (assessmentResult.value.level === 'SEVERE') return 'รุนแรง'
  return 'ไม่ทราบผล'
})

const suggestionTitle = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') return 'คุณมีสุขภาพจิตอยู่ในเกณฑ์ที่ดี'
  if (assessmentResult.value.level === 'MODERATE') return 'คุณอาจมีความเครียดสะสม ควรหาเวลาพักผ่อน'
  if (assessmentResult.value.level === 'SEVERE') return 'คุณต้องการการดูแลและคำปรึกษาโดยด่วน'
  return 'ผลการคัดกรองเบื้องต้น'
})

const suggestionDetail = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') {
    return 'พยายามรักษาสมดุลในการใช้ชีวิต หมั่นสำรวจอารมณ์ตนเองอย่างสม่ำเสมอ และดูแลสุขภาพกายควบคู่ไปด้วย'
  }
  if (assessmentResult.value.level === 'MODERATE') {
    return 'ลองหากิจกรรมผ่อนคลายทำ ออกกำลังกายเบาๆ หรือพูดคุยระบายความรู้สึกกับเพื่อนและแชทบอทน้องมุกเพื่อลดความเครียดสะสม'
  }
  if (assessmentResult.value.level === 'SEVERE') {
    return 'ระบบแนะนำให้คุณติดต่อสายด่วนสุขภาพจิต 1323 เพื่อรับคำแนะนำจากผู้เชี่ยวชาญ หรือปรึกษาแพทย์โดยตรง พร้อมทั้งพูดคุยกับแชทบอทเพื่อรับการประคับประคองใจในเบื้องต้น'
  }
  return 'แนะนำให้หมั่นสังเกตอารมณ์ตนเองอย่างต่อเนื่อง'
})

onMounted(() => {
  if (isHighRisk.value) {
    showEmergencyModal.value = true
  }
})

const closeModal = () => {
  showEmergencyModal.value = false
}
</script>
