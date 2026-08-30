<template>
  <div class="flex flex-col h-screen bg-gray-50 relative">
    <!-- Header -->
    <header class="flex items-center px-4 py-3 bg-white shadow-sm shrink-0">
      <button @click="$router.push('/')" class="p-2 mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div class="flex items-center">
        <div class="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3 overflow-hidden">
          <span class="text-xl">🤖</span>
        </div>
        <div>
          <h1 class="text-lg font-semibold text-gray-900">น้องมุกห่วงใย</h1>
          <p class="text-xs text-green-500 flex items-center">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-1"></span> ออนไลน์
          </p>
        </div>
      </div>
    </header>

    <!-- Chat Area -->
    <main class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
      <div v-for="(msg, index) in messages" :key="index" class="flex" :class="msg.sender === 'USER' ? 'justify-end' : 'justify-start'">
        <!-- Bot Avatar -->
        <div v-if="msg.sender === 'BOT'" class="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2 shrink-0 self-end mb-1">
          <span class="text-sm">🤖</span>
        </div>
        
        <!-- Chat Bubble -->
        <div 
          class="max-w-[75%] px-4 py-2 rounded-2xl shadow-sm"
          :class="msg.sender === 'USER' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'"
        >
          <p class="text-sm md:text-base whitespace-pre-wrap">{{ msg.text }}</p>
          <p class="text-[10px] mt-1" :class="msg.sender === 'USER' ? 'text-indigo-200 text-right' : 'text-gray-400 text-right'">
            {{ formatTime(msg.timestamp) }}
          </p>
        </div>
      </div>
    </main>

    <!-- Input Area -->
    <footer class="bg-white border-t border-gray-200 p-3 sm:p-4 shrink-0">
      <div v-if="isCompleted" class="text-center text-sm text-gray-500 mb-2">
        การประเมินเสร็จสิ้นแล้ว ขอบคุณที่พูดคุยกับเรา
      </div>
      <form @submit.prevent="sendMessage" class="flex items-center space-x-2 max-w-4xl mx-auto">
        <input 
          v-model="newMessage" 
          type="text" 
          :placeholder="isCompleted ? 'การสนทนาจบลงแล้ว' : 'พิมพ์ข้อความของคุณที่นี่...'" 
          :disabled="isCompleted"
          class="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none disabled:opacity-60 disabled:bg-gray-200 disabled:cursor-not-allowed"
          required
        />
        <button 
          type="submit" 
          :disabled="!newMessage.trim() || isCompleted"
          class="p-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <span class="hidden sm:inline mr-2">ส่ง</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </footer>

    <!-- Emergency Modal (Crisis Trigger) -->
    <div v-if="isEmergency" class="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform transition-all border-t-4 border-rose-500">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-4">
          <svg class="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">คุณกำลังมีความเสี่ยงสูง</h3>
        <p class="text-sm text-gray-600 mb-6">
          เรารับรู้ถึงความรู้สึกของคุณและอยากให้คุณรู้ว่าคุณไม่ได้อยู่คนเดียว หากต้องการที่ปรึกษาอย่างเร่งด่วน โปรดติดต่อผู้เชี่ยวชาญทันที
        </p>
        <div class="flex flex-col space-y-3">
          <a href="tel:1323" class="w-full flex items-center justify-center px-4 py-3 bg-rose-600 text-white text-base font-medium rounded-xl hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            โทรสายด่วน 1323
          </a>
          <button @click="isEmergency = false" class="w-full px-4 py-3 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            ปิดหน้าต่างนี้
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const chatContainer = ref(null)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const newMessage = ref('')
const messages = ref([])

// State สำหรับจัดการ Crisis และสถานะการประเมิน
const isEmergency = ref(false)
const isCompleted = ref(false)

const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('th-TH', { hour: '2-digit', minute: '2-digit' }).format(date)
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const fetchMessages = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    const response = await axios.get(`${baseURL}/api/chat/sessions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.data && response.data.messages) {
      messages.value = response.data.messages
      
      // ดึงสถานะปัจจุบันของแชทมาเช็ค (ถ้ามี)
      if (response.data.assessment_status === 'COMPLETED') {
        isCompleted.value = true
      }
    }
    scrollToBottom()
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่')
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      console.error('Failed to load chat sessions:', error)
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์เพื่อดึงประวัติการแชทได้')
    }
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isCompleted.value) return

  const userText = newMessage.value.trim()
  
  messages.value.push({
    sender: 'USER',
    text: userText,
    timestamp: new Date().toISOString()
  })

  newMessage.value = ''
  scrollToBottom()

  try {
    const token = localStorage.getItem('token')
    
    const response = await axios.post(`${baseURL}/api/chat`, 
      { message: userText },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (response.data) {
      if (response.data.reply) {
        messages.value.push({
          sender: 'BOT',
          text: response.data.reply,
          timestamp: new Date().toISOString()
        })
      }

      // ตรวจสอบความเสี่ยงรุนแรง
      if (response.data.severity_level === 'SEVERE') {
        isEmergency.value = true
      }

      // ตรวจสอบสถานะการประเมิน
      if (response.data.assessment_status === 'COMPLETED') {
        isCompleted.value = true
      }
    }
    scrollToBottom()
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่')
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      console.error('Failed to send message:', error)
      alert('การส่งข้อความล้มเหลว กรุณาลองใหม่อีกครั้ง')
    }
  }
}

onMounted(() => {
  fetchMessages()
})
</script>
