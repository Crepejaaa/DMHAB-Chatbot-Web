import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  const result = ref({
    score: 0,
    level: 'NORMAL', // NORMAL, MODERATE, SEVERE
    q2Answers: {},
    q9Answers: {},
    q8Answers: {},
    q9Score: 0,
    q8Score: 0,
    needsQ9: false,
    needsQ8: false,
  })

  const setAssessmentResult = (score, level) => {
    result.value.score = score
    result.value.level = level
  }

  const setFullResult = (data) => {
    Object.assign(result.value, data)
  }

  return { result, setAssessmentResult, setFullResult }
})
