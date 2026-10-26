<template>
  <div :class="['admin-page min-h-screen bg-[#FAF9F5] font-sans text-[#1E293B] flex flex-col md:flex-row transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">
    
    <!-- Sidebar Navigation -->
    <aside class="w-full md:w-64 bg-gradient-to-b from-[#045F54] via-[#0D9488] to-[#059669] text-white flex flex-col shadow-xl md:min-h-screen md:sticky md:top-0">
      <!-- Sidebar Header / Logo -->
      <div class="p-6 flex items-center gap-3 border-b border-white/10">
        <div class="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl p-1">
          <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain rounded-full" />
        </div>
        <div>
          <span class="text-lg font-bold tracking-wide block">PhuenJaiZone</span>
          <span class="text-xs text-[#D1FAE5]/80">ระบบจัดการแอดมิน</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 p-4 space-y-1">
        <router-link 
          to="/admin" 
          exact
          :class="currentRoute === 'admin-dashboard' ? 'bg-white/15 text-white font-medium shadow-sm' : 'text-[#D1FAE5] hover:bg-white/5 hover:text-white'"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path>
          </svg>
          แดชบอร์ด
        </router-link>
        <router-link 
          to="/admin/users"
          :class="currentRoute === 'admin-users' ? 'bg-white/15 text-white font-medium shadow-sm' : 'text-[#D1FAE5] hover:bg-white/5 hover:text-white'"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          จัดการผู้ใช้งาน
        </router-link>
        <router-link 
          to="/admin/articles"
          :class="currentRoute === 'admin-articles' ? 'bg-white/15 text-white font-medium shadow-sm' : 'text-[#D1FAE5] hover:bg-white/5 hover:text-white'"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          บทความและบล็อก
        </router-link>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-white/10 space-y-4">
        <!-- Dark mode toggle in sidebar -->
        <div class="flex items-center justify-between bg-black/15 p-3 rounded-xl border border-white/10">
          <div class="text-xs font-semibold">โหมดมืด</div>
          <button
            @click="isDarkMode = !isDarkMode"
            :class="isDarkMode ? 'bg-white' : 'bg-[#045F54]'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none border border-white/20"
          >
            <span
              :class="isDarkMode ? 'translate-x-4 bg-[#1E293B]' : 'translate-x-1 bg-white'"
              class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
            ></span>
          </button>
        </div>

        <button @click="$router.push('/')" class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-white/30 hover:bg-white/10 transition text-sm font-semibold cursor-pointer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          กลับหน้าหลัก
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10 flex flex-col space-y-8 overflow-y-auto">
      <router-view />
    </main>

    <!-- Success Toast -->
    <Transition name="toast">
      <div v-if="showSuccessToast" class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-[#0D9488] text-white px-5 py-3.5 rounded-2xl shadow-2xl">
        <span class="text-xl">✅</span>
        <div>
          <p class="font-bold text-sm">{{ toastMessage }}</p>
          <p class="text-xs text-[#D1FAE5]">ระบบบันทึกข้อมูลเรียบร้อยแล้ว</p>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, inject, provide, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.name)

// Inject global dark mode state from App.vue
const isDarkMode = inject('isDarkMode', ref(false))

// Toast system (shared across admin pages)
const showSuccessToast = ref(false)
const toastMessage = ref('')
let toastTimer = null

function triggerSuccessToast(message) {
  toastMessage.value = message
  if (toastTimer) clearTimeout(toastTimer)
  showSuccessToast.value = true
  toastTimer = setTimeout(() => { showSuccessToast.value = false }, 3000)
}

// Provide toast function to child routes
provide('triggerSuccessToast', triggerSuccessToast)
provide('isDarkMode', isDarkMode)
</script>

<style scoped>
/* Scrollbar custom style */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(13, 148, 136, 0.2);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(13, 148, 136, 0.4);
}

/* Toast transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
</style>
