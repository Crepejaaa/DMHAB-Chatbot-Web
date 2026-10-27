<template>
  <div class="inline-flex items-center" ref="containerRef">
    <!-- Trigger Button -->
    <button
      type="button"
      @click="openModal"
      :title="ariaLabel || title ? `${title} (คลิกเพื่อดูขั้นตอนและเงื่อนไข)` : 'คลิกเพื่อดูขั้นตอนและเงื่อนไขการทำแบบประเมิน'"
      :aria-label="ariaLabel || title || 'คำแนะนำการทำแบบประเมิน'"
      :class="[
        'group inline-flex items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer',
        variant === 'banner'
          ? 'px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-xs font-medium border border-white/40 backdrop-blur-md shadow-sm gap-1.5 active:scale-95'
          : variant === 'section'
          ? 'w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-300 shadow-xs active:scale-95'
          : variant === 'danger'
          ? 'w-6 h-6 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-300 shadow-xs active:scale-95'
          : 'w-6 h-6 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-300 shadow-xs active:scale-95'
      ]"
    >
      <!-- Question Mark Icon -->
      <svg
        v-if="iconType === 'question'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-3.5 h-3.5 shrink-0"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- Info Icon -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-3.5 h-3.5 shrink-0"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
          clip-rule="evenodd"
        />
      </svg>

      <!-- Optional text badge in banner mode -->
      <span v-if="badgeText" class="text-xs font-semibold whitespace-nowrap">{{ badgeText }}</span>
    </button>

    <!-- Centered Pop-up Modal (กลางหน้าจอ ทุกขนาดหน้าจอ ทั้ง PC และ Mobile) -->
    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          @click="handleBackdropClick"
        >
          <div
            class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 overflow-hidden transform transition-all text-slate-800 relative max-h-[90vh] flex flex-col"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="flex items-start justify-between pb-4 border-b border-slate-100 mb-4 gap-3">
              <div class="flex items-center gap-3">
                <span
                  :class="[
                    'w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm shadow-inner',
                    variant === 'danger'
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  ]"
                >
                  {{ iconType === 'question' ? '?' : 'i' }}
                </span>
                <div>
                  <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {{ title }}
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">คู่มือแนะนำขั้นตอนและข้อกำหนดการประเมิน</p>
                </div>
              </div>
              <button
                type="button"
                @click="close"
                class="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition active:scale-95 shrink-0"
                title="ปิด"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Mandatory Requirement Alert Banner (เงื่อนไขสำคัญ) -->
            <div class="mb-4 p-3.5 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-amber-900 text-xs sm:text-sm">
              <div class="flex items-center gap-2 font-bold mb-1 text-amber-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                เงื่อนไขสำคัญในการส่งแบบประเมิน
              </div>
              <p class="leading-relaxed text-[11px] sm:text-xs">
                ผู้ประเมิน<b>ต้องตอบคำถามให้ครบทุกข้อ</b> (ทั้ง 3 ส่วน: 2Q, 9Q และ 8Q) จึงจะสามารถกดปุ่ม <b>"ส่งแบบประเมิน"</b> ได้ หากตอบไม่ครบระบบจะไม่เปิดให้กดส่ง
              </p>
            </div>

            <!-- Modal Content / Body -->
            <div class="overflow-y-auto pr-1 pb-1 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <slot>
                <p v-if="content">{{ content }}</p>
              </slot>
            </div>

            <!-- Modal Footer -->
            <div class="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                @click="close"
                class="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl text-xs sm:text-sm font-semibold shadow hover:opacity-95 active:scale-[0.98] transition cursor-pointer"
              >
                เข้าใจแล้ว
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'คำแนะนำการทำแบบประเมิน'
  },
  content: {
    type: String,
    default: ''
  },
  iconType: {
    type: String,
    default: 'question' // 'question' | 'info'
  },
  badgeText: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'section' // 'section' | 'banner' | 'danger'
  },
  ariaLabel: {
    type: String,
    default: ''
  }
})

const containerRef = ref(null)
const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const handleBackdropClick = () => {
  close()
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active > div,
.modal-fade-leave-active > div {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}

.modal-fade-enter-from > div,
.modal-fade-leave-to > div {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
</style>
