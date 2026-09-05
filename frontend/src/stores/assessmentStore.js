import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  const result = ref({
    score: 0,
    level: 'NORMAL', // NORMAL, MODERATE, SEVERE
  })

  const setAssessmentResult = (score, level) => {
    result.value.score = score
    result.value.level = level
  }

  return { result, setAssessmentResult }
})
