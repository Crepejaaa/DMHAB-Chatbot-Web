<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" :class="{ 'grayscale': isColorBlindMode }">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="px-6 py-8 sm:p-10">
        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">ผลการประเมินของคุณ</h1>
        
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center h-32 w-32 rounded-full mb-4" :class="scoreColorClass">
            <span class="text-4xl font-bold text-white">{{ scoreText }}</span>
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">{{ suggestionTitle }}</h2>
          <p class="mt-4 text-lg text-gray-600">{{ suggestionDetail }}</p>
        </div>

        <div class="flex justify-center mt-8">
          <router-link to="/chat" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            พูดคุยกับน้องมุกห่วงใย
          </router-link>
        </div>
      </div>
    </div>

    <!-- Emergency Modal -->
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useAssessmentStore } from '../stores/assessmentStore'

const isColorBlindMode = inject('isColorBlindMode', ref(false))
const assessmentStore = useAssessmentStore()

// Use real data from store
const assessmentResult = computed(() => assessmentStore.result)

const showEmergencyModal = ref(false)

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
</script>
