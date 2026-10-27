<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" :class="{ 'dark-mode-page': isDarkMode }">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="px-6 py-8 sm:p-10">
        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">ผลการประเมินของคุณ</h1>
        
        <div class="text-center mb-8">
          <div class="inline-flex flex-col items-center justify-center h-32 w-32 rounded-full mb-4" :class="scoreColorClass">
            <span class="text-4xl font-bold text-white leading-none">{{ totalScore }}</span>
            <span class="text-xs font-medium text-white/90 mt-1">คะแนน</span>
          </div>
          <p class="text-xl font-bold text-gray-800 mb-3">{{ statusText }}</p>
          <h2 class="text-2xl font-semibold text-gray-800">{{ suggestionTitle }}</h2>
          <p class="mt-4 text-lg text-gray-600">{{ suggestionDetail }}</p>
        </div>

        <div class="flex justify-center mt-8">
          <!-- เปลี่ยนลิ้งก์ให้เรียกเปิด Terms Modal แทนการกดเข้าแชตตรงๆ เพื่อบังคับให้ยอมรับเงื่อนไขก่อน -->
          <button 
            @click="openTermsModal" 
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            พูดคุยกับน้องมุกห่วงใย
          </button>
        </div>
      </div>
    </div>

    <!-- Emergency Modal (โค้ดเดิมคงไว้) -->
    <div v-if="showEmergencyModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-rose-50 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 border-2 border-rose-500">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100">
              <svg class="h-6 w-6 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-rose-800" id="modal-title">คำเตือนฉุกเฉิน</h3>
              <div class="mt-2">
                <p class="text-sm text-rose-700">
                  ระบบพบว่าท่านอาจกำลังอยู่ในสภาวะที่มีความเครียดสูงหรือต้องการความช่วยเหลืออย่างเร่งด่วน 
                  กรุณาติดต่อสายด่วนสุขภาพจิต 1323 เพื่อรับคำปรึกษาจากผู้เชี่ยวชาญทันที
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 flex flex-col gap-3">
            <a href="tel:1323" class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:text-sm">
              โทร 1323 ตอนนี้
            </a>
            <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" @click="closeModal">
              รับทราบ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ส่วนที่เพิ่มใหม่: Terms & Privacy Consent Modal (ป๊อปอัปข้อตกลงและนโยบายความเป็นส่วนตัว) -->
    <div v-if="showTermsModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="terms-modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeTermsModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-2xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100">
              <svg class="h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.033C3.12 6.516 3 7.248 3 8c0 5.525 3.797 10.269 9 11.622 5.203-1.353 9-6.097 9-11.622 0-.752-.12-1.484-.382-2.016z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-xl font-bold text-gray-900" id="terms-modal-title">
                ข้อตกลงและเงื่อนไขการใช้งาน
              </h3>
              
              <!-- ข้อความนโยบายความเป็นส่วนตัวและคำเตือนสำคัญ -->
              <div class="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl text-left border border-gray-200 max-h-48 overflow-y-auto space-y-2">
                <p class="font-semibold text-gray-800">นโยบายความเป็นส่วนตัวและการให้ยินยอม:</p>
                <p>1. ระบบ PhuenJaiZone ให้ความสำคัญกับความเป็นส่วนตัว ข้อมูลการประเมินและการพูดคุยจะถูกเก็บรักษาเป็นความลับ</p>
                <p class="font-bold text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
                  ⚠️ เงื่อนไขสำคัญ: ระบบแชทบอทนี้มีจุดประสงค์เพื่อการคัดกรองและประเมินสภาวะอารมณ์เบื้องต้นเท่านั้น **ไม่ใช้สำหรับการวินิจฉัยทางการแพทย์ โรคทางจิตเวช และไม่มีการจ่ายยาเด็ดขาด**
                </p>
                <p>2. หากท่านมีภาวะเครียดรุนแรงหรือมีความคิดทำร้ายตนเอง กรุณาติดต่อสายด่วนสุขภาพจิต 1323 หรือพบแพทย์ผู้เชี่ยวชาญทันที</p>
              </div>

              <!-- Checkbox ยอมรับเงื่อนไข -->
              <div class="mt-5 flex items-center justify-center gap-2">
                <input 
                  type="checkbox" 
                  id="accept-terms" 
                  v-model="isAccepted" 
                  class="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                />
                <label for="accept-terms" class="text-sm font-medium text-gray-700 cursor-pointer select-none">
                  ยอมรับเงื่อนไขและนโยบายความเป็นส่วนตัว
                </label>
              </div>
            </div>
          </div>

          <!-- ปุ่มกดดำเนินการ -->
          <div class="mt-6 sm:mt-6 flex flex-col sm:flex-row-reverse gap-3">
            <button 
              type="button" 
              :disabled="!isAccepted"
              :class="[
                'w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-5 py-2.5 text-base font-medium text-white transition-all duration-200 sm:text-sm',
                isAccepted ? 'bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer' : 'bg-gray-300 cursor-not-allowed opacity-60'
              ]"
              @click="proceedToChat"
            >
              เข้าสู่หน้าพูดคุย
            </button>
            <button 
              type="button" 
              class="w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-5 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm cursor-pointer"
              @click="closeTermsModal"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAssessmentStore } from '../stores/assessmentStore'

const router = useRouter()
const isDarkMode = inject('isDarkMode', ref(false))
const assessmentStore = useAssessmentStore()

// Use real data from store
const assessmentResult = computed(() => assessmentStore.result)

const showEmergencyModal = ref(false)

// State สำหรับ Terms Modal
const showTermsModal = ref(false)
const isAccepted = ref(false)

const totalScore = computed(() => assessmentResult.value?.score ?? 0)

const scoreColorClass = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') return 'bg-green-500'
  if (assessmentResult.value.level === 'MODERATE') return 'bg-yellow-500'
  if (assessmentResult.value.level === 'SEVERE') return 'bg-rose-600'
  return 'bg-gray-500'
})

const scoreText = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') return 'ปกติ'
  if (assessmentResult.value.level === 'MODERATE') return 'ปานกลาง'
  if (assessmentResult.value.level === 'SEVERE') return 'รุนแรง'
  return 'ไม่ทราบผล'
})

const statusText = computed(() => {
  return `สถานะอยู่ในระดับ${scoreText.value}`
})

const suggestionTitle = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') return 'คุณมีสุขภาพจิตอยู่ในเกณฑ์ที่ดี'
  if (assessmentResult.value.level === 'MODERATE') return 'คุณอาจมีความเครียดสะสม ควรหาเวลาพักผ่อน'
  if (assessmentResult.value.level === 'SEVERE') return 'คุณต้องการการดูแลและคำปรึกษาโดยด่วน'
  return ''
})

const suggestionDetail = computed(() => {
  if (assessmentResult.value.level === 'NORMAL') return 'พยายามรักษาสมดุลในการใช้ชีวิตและหมั่นสำรวจอารมณ์ตนเองอย่างสม่ำเสมอ'
  if (assessmentResult.value.level === 'MODERATE') return 'ลองหากิจกรรมผ่อนคลายทำ หรือพูดคุยระบายความรู้สึกกับน้องมุกห่วงใยเพื่อลดความเครียด'
  if (assessmentResult.value.level === 'SEVERE') return 'ระบบแนะนำให้คุณติดต่อสายด่วน 1323 เพื่อรับคำแนะนำจากผู้เชี่ยวชาญ หรือพูดคุยกับน้องมุกห่วงใยในเบื้องต้น'
  return ''
})

onMounted(() => {
  if (assessmentResult.value.level === 'SEVERE') {
    showEmergencyModal.value = true
  }
})

const closeModal = () => {
  showEmergencyModal.value = false
}

// ฟังก์ชันเปิด-ปิด และดำเนินการสำหรับ Terms Modal
const openTermsModal = () => {
  showTermsModal.value = true
}

const closeTermsModal = () => {
  showTermsModal.value = false
  isAccepted.value = false // รีเซ็ตการติ๊กเมื่อปิด
}

const proceedToChat = () => {
  if (isAccepted.value) {
    showTermsModal.value = false
    router.push('/chat') // เปลี่ยนหน้าไปยังแชทบอท
  }
}
</script>