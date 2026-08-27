<template>
  <div class="flex flex-col h-screen bg-gray-50">
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
      <form @submit.prevent="sendMessage" class="flex items-center space-x-2 max-w-4xl mx-auto">
        <input 
          v-model="newMessage" 
          type="text" 
          placeholder="พิมพ์ข้อความของคุณที่นี่..." 
          class="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
          required
        />
        <button 
          type="submit" 
          :disabled="!newMessage.trim()"
          class="p-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <span class="hidden sm:inline mr-2">ส่ง</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const chatContainer = ref(null)
const newMessage = ref('')

// Mock Messages Data
const messages = ref([
  {
    sender: 'BOT',
    text: 'สวัสดีค่ะ ฉันน้องมุกห่วงใย วันนี้คุณรู้สึกอย่างไรบ้างคะ อยากเล่าเรื่องอะไรให้ฉันฟังไหม',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    sender: 'USER',
    text: 'ช่วงนี้รู้สึกเครียดเรื่องงานนิดหน่อยครับ',
    timestamp: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    sender: 'BOT',
    text: 'เข้าใจเลยค่ะ เรื่องงานอาจทำให้เกิดความกดดันได้ ลองเล่าให้ฟังเพิ่มได้ไหมคะว่ามีเรื่องไหนที่ทำให้หนักใจเป็นพิเศษ',
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  }
])

const formatTime = (date) => {
  return new Intl.DateTimeFormat('th-TH', { hour: '2-digit', minute: '2-digit' }).format(date)
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  // User message
  messages.value.push({
    sender: 'USER',
    text: newMessage.value.trim(),
    timestamp: new Date()
  })

  newMessage.value = ''
  scrollToBottom()

  // Mock Bot reply after delay
  setTimeout(() => {
    messages.value.push({
      sender: 'BOT',
      text: 'รับทราบค่ะ เราพร้อมรับฟังเสมอนะคะ หากมีเรื่องใดไม่สบายใจ สามารถพิมพ์คุยต่อได้เลยค่ะ',
      timestamp: new Date()
    })
    scrollToBottom()
  }, 1000)
}

onMounted(() => {
  scrollToBottom()
})
</script>
