<template>
  <div :class="['min-h-screen flex flex-col font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page bg-[#0F172A]' : 'bg-[#F0FDF9]']">

    <!-- ========== Navbar ========== -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">
        <button type="button" @click="$router.push('/services/daily-checkin')"
          class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center" title="ย้อนกลับ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <router-link to="/" class="flex items-center gap-1.5 sm:gap-2">
          <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
            <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
          </div>
          <span class="text-xl font-bold tracking-wide">DMHAB</span>
        </router-link>
      </div>
      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" class="hover:text-[#D1FAE5] transition">Home</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition">About</router-link>
        <router-link to="/services" class="text-white font-bold underline decoration-2 underline-offset-4">Services</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">Blog</router-link>
      </div>
      <div class="flex gap-3 items-center text-sm">
        <div class="hidden md:flex items-center gap-2 mr-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
          <span class="text-xs font-semibold text-white">Dark Mode</span>
          <button @click="isDarkMode = !isDarkMode" :class="isDarkMode ? 'bg-white' : 'bg-[#045F54]'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-white/30">
            <span :class="isDarkMode ? 'translate-x-4 bg-[#1E293B]' : 'translate-x-1 bg-white'"
              class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"></span>
          </button>
        </div>
        <ProfileMenu />
      </div>
    </nav>

    <!-- ========== Hero Banner ========== -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-28 px-6 lg:px-12 relative overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 500 500" class="w-full h-full">
            <circle cx="350" cy="120" r="160" fill="currentColor"/>
            <circle cx="460" cy="420" r="100" fill="currentColor"/>
          </svg>
        </div>
        <!-- floating mood emojis -->
        <div v-for="(e, i) in floatingEmojis" :key="i"
          class="absolute text-2xl select-none pointer-events-none opacity-20 animate-float"
          :style="e.style">{{ e.emoji }}</div>
      </div>
      <div class="container mx-auto max-w-5xl relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-4xl">📝</span>
              <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">เช็คอินสุขภาพจิตรายวัน</h1>
            </div>
            <p class="text-sm md:text-base text-[#D1FAE5] max-w-2xl leading-relaxed">
              บันทึกและติดตามความรู้สึกประจำวัน เพื่อให้คุณรู้จักตัวเองมากขึ้นในทุกๆ วัน
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- ========== Main Content ========== -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 -mt-16 pb-16 space-y-8">

      <!-- ===== STEP 1 : Today Check-in Card ===== -->
      <section class="anim-fade-up">
        <div :class="['rounded-3xl shadow-xl overflow-hidden border', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100']">

          <!-- Card Header -->
          <div class="bg-gradient-to-r from-[#0D9488] to-[#059669] px-6 py-5 flex items-center justify-between">
            <div>
              <p class="text-[#D1FAE5] text-xs font-semibold uppercase tracking-wider mb-0.5">วันนี้</p>
              <h2 class="text-white font-extrabold text-lg">{{ todayFullDate }}</h2>
            </div>
            <div class="flex items-center gap-3">
              <span v-if="todayCheckin" class="flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                ✅ เช็คอินแล้ว
              </span>
              <span v-else class="flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                ⏳ ยังไม่ได้เช็คอิน
              </span>
            </div>
          </div>

          <div class="p-6 md:p-8">
            <!-- Mood Picker -->
            <div class="mb-8">
              <p :class="['text-sm font-bold mb-4', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
                😊 วันนี้คุณรู้สึกอย่างไร?
              </p>
              <div class="grid grid-cols-5 gap-2 md:gap-4">
                <button
                  v-for="mood in moodOptions"
                  :key="mood.id"
                  @click="selectMood(mood)"
                  :class="[
                    'flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group',
                    selectedMood?.id === mood.id
                      ? 'border-[#0D9488] shadow-lg scale-105 ' + (isDarkMode ? 'bg-[#0D9488]/30 text-white' : mood.bgSelected)
                      : isDarkMode
                        ? 'border-white/10 bg-white/5 text-gray-300 hover:border-[#0D9488]/50'
                        : 'border-gray-100 bg-gray-50/50 hover:border-[#0D9488]/40 hover:shadow-md'
                  ]"
                >
                  <span class="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110"
                    :class="selectedMood?.id === mood.id ? 'scale-125' : ''">
                    {{ mood.emoji }}
                  </span>
                  <span :class="['text-[10px] md:text-xs font-bold text-center leading-tight', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
                    {{ mood.label }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Mood Detail Sliders (appears after mood selection) -->
            <Transition name="slide-fade">
              <div v-if="selectedMood" class="mb-8 space-y-5">
                <p :class="['text-sm font-bold', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">📊 บอกรายละเอียดเพิ่มเติม</p>

                <div v-for="metric in moodMetrics" :key="metric.id" class="space-y-2">
                  <div class="flex justify-between items-center">
                    <label :class="['text-xs font-semibold flex items-center gap-1.5', isDarkMode ? 'text-white' : 'text-[#1E293B]']">
                      {{ metric.icon }} {{ metric.label }}
                    </label>
                    <span class="text-xs font-bold text-[#0D9488]">{{ metric.value }}/10</span>
                  </div>
                  <div class="relative">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      v-model="metric.value"
                      :class="['w-full h-2 rounded-full appearance-none cursor-pointer', isDarkMode ? 'bg-white/10' : 'bg-gray-100']"
                      :style="{ background: `linear-gradient(to right, #0D9488 ${(metric.value-1)*100/9}%, ${isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB'} ${(metric.value-1)*100/9}%)` }"
                    />
                  </div>
                  <div class="flex justify-between text-[10px]" :class="isDarkMode ? 'text-[#64748B]' : 'text-gray-400'">
                    <span>{{ metric.lowLabel }}</span>
                    <span>{{ metric.highLabel }}</span>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Note / Journal -->
            <div class="mb-6">
              <label :class="['text-sm font-bold mb-2 block', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
                📓 บันทึกสั้นๆ (ไม่บังคับ)
              </label>
              <textarea
                v-model="noteText"
                rows="3"
                placeholder="เล่าให้ฟังหน่อยว่าวันนี้เป็นอย่างไรบ้าง..."
                :class="[
                  'w-full px-4 py-3 rounded-2xl text-sm border transition-all duration-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#0D9488]',
                  isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder-[#64748B]' : 'bg-gray-50 border-gray-200 text-[#1E293B]'
                ]"
              ></textarea>
            </div>

            <!-- Tags / Activities -->
            <div class="mb-8">
              <p :class="['text-sm font-bold mb-3', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">🏷️ กิจกรรมที่ทำวันนี้</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in activityTags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  :class="[
                    'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer',
                    selectedTags.includes(tag)
                      ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-sm'
                      : isDarkMode
                        ? 'border-white/20 text-[#94A3B8] hover:border-[#0D9488]/50'
                        : 'border-gray-200 text-[#64748B] bg-white hover:border-[#0D9488]/40'
                  ]"
                >
                  {{ tag }}
                </button>
              </div>
            </div>

            <!-- Save Button -->
            <button
              type="button"
              @click="saveCheckin"
              class="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white hover:opacity-90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ todayCheckin ? 'อัปเดตการเช็คอินวันนี้' : 'บันทึกการเช็คอิน ✨' }}
            </button>
          </div>
        </div>
      </section>

      <!-- ===== STEP 2 : Stats Summary ===== -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4 anim-fade-up" style="animation-delay:.1s">
        <div v-for="stat in summaryStats" :key="stat.label"
          :class="['rounded-2xl p-5 border text-center transition-all hover:scale-105 duration-300', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100 shadow-sm']">
          <div class="text-3xl mb-1">{{ stat.icon }}</div>
          <div class="text-2xl font-black" :style="{ color: stat.color }">{{ stat.value }}</div>
          <div :class="['text-xs mt-0.5', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ stat.label }}</div>
        </div>
      </section>

      <!-- ===== STEP 3 : Mood Trend Chart ===== -->
      <section class="anim-fade-up" style="animation-delay:.2s">
        <div :class="['rounded-3xl border p-6 md:p-8', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100 shadow-sm']">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 :class="['font-extrabold text-lg', isDarkMode ? 'text-white' : 'text-[#1E293B]']">📈 แนวโน้มอารมณ์ 7 วัน</h2>
              <p :class="['text-xs mt-0.5', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">ติดตามสภาวะจิตใจของคุณย้อนหลัง 1 สัปดาห์</p>
            </div>
            <div class="flex gap-2">
              <button v-for="period in ['7 วัน','14 วัน','30 วัน']" :key="period"
                @click="selectedPeriod = period"
                :class="[
                  'text-xs px-3 py-1.5 rounded-full font-semibold border transition cursor-pointer',
                  selectedPeriod === period
                    ? 'bg-[#0D9488] border-[#0D9488] text-white'
                    : isDarkMode ? 'border-white/20 text-[#94A3B8] hover:border-[#0D9488]/50' : 'border-gray-200 text-[#64748B] hover:border-[#0D9488]/40'
                ]"
              >{{ period }}</button>
            </div>
          </div>

          <!-- Bar Chart -->
          <div class="flex items-end gap-2 md:gap-3 h-32 mb-3">
            <div v-for="(day, i) in chartData" :key="i" class="flex-1 flex flex-col items-center gap-1 group">
              <span class="text-xs font-bold text-[#0D9488] opacity-0 group-hover:opacity-100 transition-opacity">
                {{ day.score }}
              </span>
              <div class="w-full rounded-t-xl relative overflow-hidden transition-all duration-500 cursor-pointer"
                :style="{ height: (day.score / 5 * 100) + '%', minHeight: '8px', background: moodBarColor(day.score) }"
                @mouseenter="hoveredBar = i"
                @mouseleave="hoveredBar = null"
              >
                <div v-if="hoveredBar === i" class="absolute inset-0 bg-white/20"></div>
              </div>
              <span class="text-emoji text-lg">{{ day.emoji }}</span>
              <span :class="['text-[10px] font-semibold', isDarkMode ? 'text-[#64748B]' : 'text-gray-400']">{{ day.label }}</span>
            </div>
          </div>

          <!-- Legend -->
          <div class="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-4 border-t" :class="isDarkMode ? 'border-white/10' : 'border-gray-100'">
            <div v-for="mood in moodLegend" :key="mood.label" class="flex items-center gap-1.5">
              <div class="w-3 h-3 rounded-full" :style="{ background: mood.color }"></div>
              <span :class="['text-xs', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ mood.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== STEP 4 : History Log ===== -->
      <section class="anim-fade-up" style="animation-delay:.3s">
        <div :class="['rounded-3xl border p-6 md:p-8', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100 shadow-sm']">
          <h2 :class="['font-extrabold text-lg mb-5', isDarkMode ? 'text-white' : 'text-[#1E293B]']">📋 ประวัติการเช็คอิน</h2>

          <!-- Empty state -->
          <div v-if="checkinHistory.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-400">
            <span class="text-5xl mb-3">📭</span>
            <p class="text-sm font-semibold">ยังไม่มีประวัติ</p>
            <p class="text-xs mt-1">เริ่มเช็คอินวันแรกของคุณด้านบน</p>
          </div>

          <!-- History Timeline -->
          <div v-else class="space-y-3">
            <div v-for="(entry, idx) in checkinHistory.slice(0, showAllHistory ? 9999 : 5)" :key="idx"
              :class="[
                'rounded-2xl p-4 border flex items-start gap-4 transition-all duration-300 hover:shadow-md cursor-default',
                isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-[#F8FFFE] border-gray-100 hover:border-[#0D9488]/20'
              ]"
            >
              <!-- Emoji -->
              <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0', entry.mood.bgSelected]">
                {{ entry.mood.emoji }}
              </div>
              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <p :class="['font-bold text-sm', isDarkMode ? 'text-white' : 'text-[#1E293B]']">{{ entry.mood.label }}</p>
                    <p :class="['text-xs mt-0.5', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ entry.dateLabel }}</p>
                  </div>
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <div class="w-2 h-2 rounded-full" :style="{ background: moodBarColor(entry.score) }"></div>
                    <span class="text-xs font-bold text-[#0D9488]">คะแนน {{ entry.score }}/5</span>
                  </div>
                </div>
                <!-- Note -->
                <p v-if="entry.note" :class="['text-xs mt-2 italic leading-relaxed line-clamp-2', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
                  "{{ entry.note }}"
                </p>
                <!-- Tags -->
                <div v-if="entry.tags?.length" class="flex flex-wrap gap-1.5 mt-2">
                  <span v-for="tag in entry.tags" :key="tag"
                    class="text-[10px] px-2 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] font-semibold">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Show More -->
            <button v-if="checkinHistory.length > 5"
              @click="showAllHistory = !showAllHistory"
              :class="['w-full py-3 rounded-2xl text-sm font-semibold border transition cursor-pointer',
                isDarkMode ? 'border-white/10 text-[#94A3B8] hover:bg-white/5' : 'border-gray-100 text-[#64748B] hover:bg-gray-50']">
              {{ showAllHistory ? '▲ แสดงน้อยลง' : `▼ ดูทั้งหมด ${checkinHistory.length} รายการ` }}
            </button>
          </div>
        </div>
      </section>

      <!-- ===== STEP 4 : Recommendation ===== -->
      <section class="anim-fade-up" style="animation-delay:.4s">
        <div :class="['rounded-3xl border p-6 md:p-8', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100 shadow-sm']">
          <h2 :class="['font-extrabold text-lg mb-2', isDarkMode ? 'text-white' : 'text-[#1E293B]']">💡 คำแนะนำสำหรับคุณวันนี้</h2>
          <p :class="['text-xs mb-6', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
            {{ selectedMood ? 'แนะนำตามอารมณ์ที่บันทึก' : 'เช็คอินก่อนเพื่อรับคำแนะนำที่ตรงกับสภาวะของคุณ' }}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="rec in currentRecommendations" :key="rec.title"
              :class="['rounded-2xl p-5 border group hover:shadow-md transition-all duration-300 cursor-pointer',
                isDarkMode ? 'bg-white/5 border-white/10 hover:border-[#0D9488]/40' : 'bg-[#F8FFFE] border-gray-100 hover:border-[#0D9488]/30']">
              <div class="text-3xl mb-3">{{ rec.icon }}</div>
              <p :class="['font-bold text-sm mb-1', isDarkMode ? 'text-white' : 'text-[#1E293B]']">{{ rec.title }}</p>
              <p :class="['text-xs leading-relaxed', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ rec.desc }}</p>
              <router-link v-if="rec.link" :to="rec.link"
                class="mt-3 text-xs font-bold text-[#0D9488] hover:underline inline-flex items-center gap-1">
                ลองทำเลย →
              </router-link>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- ========== Success Toast ========== -->
    <Transition name="toast">
      <div v-if="showToast"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#0D9488] text-white px-6 py-4 rounded-2xl shadow-2xl min-w-[260px] justify-center">
        <span class="text-2xl">{{ toastEmoji }}</span>
        <div>
          <p class="font-bold text-sm">{{ toastTitle }}</p>
          <p class="text-xs text-[#D1FAE5]">{{ toastMsg }}</p>
        </div>
      </div>
    </Transition>

    <!-- ========== Footer ========== -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
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
            <li><router-link to="/daily-checkin" class="hover:underline">Daily Check-in</router-link></li>
            <li><router-link to="/activity-tracker" class="hover:underline">Activity Tracker</router-link></li>
            <li><router-link to="/blog" class="hover:underline">Self-Care Blog</router-link></li>
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
      <div class="text-center text-xs text-[#A7F3D0] pt-6">© 2026 DMHAB. All rights reserved.</div>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import ProfileMenu from '../components/ProfileMenu.vue'
import { useAuthStore } from '../stores/authStore'

const isDarkMode = inject('isDarkMode')
const authStore = useAuthStore()
const storageKey = computed(() => `dailyCheckin_${authStore.user?.email || 'guest'}`)

// ==================== Mood Options ====================
const moodOptions = [
  { id: 5, emoji: '😄', label: 'ดีมาก', score: 5, color: '#059669', bgSelected: 'bg-emerald-100' },
  { id: 4, emoji: '🙂', label: 'ดี',    score: 4, color: '#0D9488', bgSelected: 'bg-teal-100' },
  { id: 3, emoji: '😐', label: 'ปานกลาง', score: 3, color: '#F59E0B', bgSelected: 'bg-amber-100' },
  { id: 2, emoji: '😔', label: 'ไม่ค่อยดี', score: 2, color: '#F97316', bgSelected: 'bg-orange-100' },
  { id: 1, emoji: '😢', label: 'แย่', score: 1, color: '#E11D48', bgSelected: 'bg-rose-100' },
]

// ==================== Metric Sliders ====================
const moodMetrics = ref([
  { id: 'energy',  icon: '⚡', label: 'ระดับพลังงาน', value: 5, lowLabel: 'หมดแรง', highLabel: 'เต็มพลัง' },
  { id: 'stress',  icon: '😤', label: 'ระดับความเครียด', value: 5, lowLabel: 'ผ่อนคลาย', highLabel: 'เครียดมาก' },
  { id: 'social',  icon: '👥', label: 'อยากพบปะผู้คน', value: 5, lowLabel: 'อยากอยู่คนเดียว', highLabel: 'อยากพบเพื่อน' },
])

// ==================== Activity Tags ====================
const activityTags = [
  '🏃 ออกกำลังกาย', '📚 อ่านหนังสือ', '🎵 ฟังเพลง', '🧘 ทำสมาธิ',
  '🍳 ทำอาหาร', '🌿 รดน้ำต้นไม้', '🎨 งานศิลปะ', '🤝 พบปะเพื่อน',
  '🎮 เล่นเกม', '🛁 พักผ่อน', '✏️ เขียนไดอารี่', '🌅 ออกไปข้างนอก'
]

// ==================== State ====================
const selectedMood   = ref(moodOptions[1]) // Default to 'ดี' (🙂) so user can save immediately
const noteText       = ref('')
const selectedTags   = ref([])
const checkinHistory = ref([])
const todayCheckin   = ref(null)
const showAllHistory = ref(false)
const selectedPeriod = ref('7 วัน')
const hoveredBar     = ref(null)

// Toast
const showToast  = ref(false)
const toastTitle = ref('')
const toastMsg   = ref('')
const toastEmoji = ref('✅')
let toastTimer   = null

// ==================== Date Helpers ====================
const todayKey = computed(() => new Date().toDateString())

const todayFullDate = computed(() => {
  return new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

// ==================== Computed Stats ====================
const summaryStats = computed(() => {
  const streak = computeStreak()
  const avgScore = checkinHistory.value.length
    ? (checkinHistory.value.reduce((s, e) => s + e.score, 0) / checkinHistory.value.length).toFixed(1)
    : '—'
  const best = checkinHistory.value.reduce((b, e) => e.score > (b?.score || 0) ? e : b, null)
  return [
    { icon: '🔥', value: streak, label: 'วัน Streak', color: '#F59E0B' },
    { icon: '📅', value: checkinHistory.value.length, label: 'เช็คอินทั้งหมด', color: '#0D9488' },
    { icon: '📊', value: avgScore, label: 'คะแนนเฉลี่ย', color: '#8B5CF6' },
    { icon: '😊', value: best?.mood?.emoji || '—', label: 'อารมณ์ยอดนิยม', color: '#059669' },
  ]
})

// ==================== Chart ====================
const chartData = computed(() => {
  const days = selectedPeriod.value === '7 วัน' ? 7 : selectedPeriod.value === '14 วัน' ? 14 : 30
  const result = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i)
    const key = d.toDateString()
    const entry = checkinHistory.value.find(e => e.dateKey === key)
    const shortDay = d.toLocaleDateString('th-TH', { weekday: 'short' })
    result.push({
      label: i === 0 ? 'วันนี้' : shortDay,
      score: entry ? entry.score : 0,
      emoji: entry ? entry.mood.emoji : '·',
    })
  }
  return result
})

const moodLegend = [
  { label: 'ดีมาก', color: '#059669' },
  { label: 'ดี',    color: '#0D9488' },
  { label: 'ปานกลาง', color: '#F59E0B' },
  { label: 'ไม่ค่อยดี', color: '#F97316' },
  { label: 'แย่',   color: '#E11D48' },
]

// ==================== Recommendations ====================
const defaultRecs = [
  { icon: '🧘', title: 'ลองหายใจลึกๆ', desc: 'เทคนิค 4-7-8 ช่วยให้สงบได้ใน 2 นาที', link: '/activity-tracker' },
  { icon: '📝', title: 'เขียนสิ่งดีๆ 3 อย่าง', desc: 'การจดความขอบคุณเพิ่มความสุขได้จริง', link: '/activity-tracker' },
  { icon: '🌿', title: 'ออกไปรับแสงแดด', desc: 'แค่ 10 นาทีก็ช่วย Serotonin ได้', link: '/activity-tracker' },
]
const badRecs = [
  { icon: '🫂', title: 'คุยกับคนที่ไว้ใจ', desc: 'การระบายความในใจช่วยลดความกดดันได้มาก', link: '/chat' },
  { icon: '🎵', title: 'ฟังเพลงที่ชอบ', desc: 'ดนตรีช่วยปรับอารมณ์ได้อย่างน่าแปลกใจ' },
  { icon: '☎️', title: 'สายด่วน 1323', desc: 'มีคนรับสายตลอด 24 ชม. พร้อมรับฟังคุณเสมอ' },
]
const currentRecommendations = computed(() => {
  if (!selectedMood.value) return defaultRecs
  return selectedMood.value.score <= 2 ? badRecs : defaultRecs
})

// ==================== Floating Emoji ====================
const floatingEmojis = [
  { emoji: '😊', style: { top: '15%', left: '8%', animationDelay: '0s', animationDuration: '4s' } },
  { emoji: '🌱', style: { top: '30%', right: '6%', animationDelay: '0.7s', animationDuration: '5s' } },
  { emoji: '💚', style: { top: '65%', left: '12%', animationDelay: '1.2s', animationDuration: '3.5s' } },
  { emoji: '🧘', style: { top: '20%', left: '45%', animationDelay: '0.4s', animationDuration: '6s' } },
  { emoji: '✨', style: { top: '75%', right: '15%', animationDelay: '1.8s', animationDuration: '4.5s' } },
]

// ==================== Methods ====================
function selectMood(mood) {
  selectedMood.value = mood
  // reset metrics to a sensible default based on mood
  const base = mood.score >= 4 ? 7 : mood.score === 3 ? 5 : 3
  moodMetrics.value[0].value = base      // energy
  moodMetrics.value[1].value = 11 - base // stress (inverse)
  moodMetrics.value[2].value = base      // social
}

function toggleTag(tag) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
}

function saveCheckin() {
  if (!selectedMood.value) {
    selectedMood.value = moodOptions[1] // fallback to 'ดี'
  }

  const isUpdate = !!todayCheckin.value

  const entry = {
    dateKey: todayKey.value,
    dateLabel: todayFullDate.value,
    mood: selectedMood.value,
    score: selectedMood.value.score,
    note: noteText.value.trim(),
    tags: [...selectedTags.value],
    metrics: moodMetrics.value.map(m => ({ id: m.id, value: Number(m.value) })),
    savedAt: new Date().toISOString(),
  }

  // Remove existing entry for today if exists
  checkinHistory.value = checkinHistory.value.filter(e => e.dateKey !== todayKey.value)
  checkinHistory.value.unshift(entry)
  todayCheckin.value = entry

  persistData()
  triggerToast(
    isUpdate ? 'อัปเดตการเช็คอินสำเร็จ!' : 'บันทึกการเช็คอินสำเร็จ! 🎉',
    `อารมณ์วันนี้: ${selectedMood.value.emoji} ${selectedMood.value.label}`,
    '✅'
  )
}

function computeStreak() {
  if (!checkinHistory.value.length) return 0
  let streak = 0
  const d = new Date()
  for (let i = 0; i < 365; i++) {
    const key = new Date(d).toDateString()
    if (checkinHistory.value.find(e => e.dateKey === key)) {
      streak++
      d.setDate(d.getDate() - 1)
    } else break
  }
  return streak
}

function moodBarColor(score) {
  if (score >= 5) return '#059669'
  if (score === 4) return '#0D9488'
  if (score === 3) return '#F59E0B'
  if (score === 2) return '#F97316'
  return '#E11D48'
}

function triggerToast(title, msg, emoji = '✅') {
  if (toastTimer) clearTimeout(toastTimer)
  toastTitle.value = title
  toastMsg.value = msg
  toastEmoji.value = emoji
  showToast.value = true
  toastTimer = setTimeout(() => { showToast.value = false }, 3500)
}

// ==================== Persistence ====================
function persistData() {
  localStorage.setItem(storageKey.value, JSON.stringify({
    history: checkinHistory.value
  }))
}

function loadData() {
  try {
    const raw = localStorage.getItem(storageKey.value)
    if (!raw) {
      // seed demo data for first-time users
      seedDemoData()
      return
    }
    const data = JSON.parse(raw)
    checkinHistory.value = data.history || []
    todayCheckin.value = checkinHistory.value.find(e => e.dateKey === todayKey.value) || null

    if (todayCheckin.value) {
      selectedMood.value = todayCheckin.value.mood
      noteText.value = todayCheckin.value.note || ''
      selectedTags.value = todayCheckin.value.tags || []
      if (todayCheckin.value.metrics) {
        todayCheckin.value.metrics.forEach(m => {
          const target = moodMetrics.value.find(x => x.id === m.id)
          if (target) target.value = m.value
        })
      }
    } else {
      selectedMood.value = moodOptions[1]
    }
  } catch { /* ignore */ }
}

function seedDemoData() {
  const demos = [
    { offset: 6, moodId: 4, note: 'วันนี้ออกกำลังกายแล้วรู้สึกดีมากเลย', tags: ['🏃 ออกกำลังกาย'] },
    { offset: 5, moodId: 3, note: '', tags: [] },
    { offset: 4, moodId: 5, note: 'ได้คุยกับเพื่อนเก่า ดีใจมาก', tags: ['🤝 พบปะเพื่อน', '🎵 ฟังเพลง'] },
    { offset: 3, moodId: 2, note: 'งานเยอะ เหนื่อยหน่อย', tags: [] },
    { offset: 2, moodId: 4, note: 'วันหยุด ได้พักผ่อน', tags: ['🛁 พักผ่อน', '📚 อ่านหนังสือ'] },
    { offset: 1, moodId: 3, note: '', tags: ['🎮 เล่นเกม'] },
  ]
  demos.forEach(d => {
    const date = new Date(); date.setDate(date.getDate() - d.offset)
    const mood = moodOptions.find(m => m.id === d.moodId)
    checkinHistory.value.push({
      dateKey: date.toDateString(),
      dateLabel: date.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      mood,
      score: mood.score,
      note: d.note,
      tags: d.tags,
      metrics: [],
      savedAt: date.toISOString(),
    })
  })
  persistData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
@keyframes float {
  0%   { transform: translateY(0)    rotate(0deg);   opacity: .2; }
  50%  { transform: translateY(-14px) rotate(8deg);  opacity: .4; }
  100% { transform: translateY(0)    rotate(0deg);   opacity: .2; }
}
.animate-float { animation: float 4s ease-in-out infinite; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.anim-fade-up { animation: fade-up .6s ease-out both; }

/* Slide-fade for metric sliders */
.slide-fade-enter-active { transition: all .35s ease-out; }
.slide-fade-leave-active { transition: all .2s ease-in; }
.slide-fade-enter-from  { opacity: 0; transform: translateY(-10px); }
.slide-fade-leave-to    { opacity: 0; transform: translateY(-6px); }

/* Toast */
.toast-enter-active, .toast-leave-active { transition: all .4s cubic-bezier(.34,1.56,.64,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px) scale(.9); }

/* Range input custom style */
input[type="range"] { -webkit-appearance: none; appearance: none; }
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 18px; height: 18px; border-radius: 50%;
  background: #0D9488; cursor: pointer;
  box-shadow: 0 2px 6px rgba(13,148,136,.4);
  border: 2px solid white;
  transition: transform .2s;
}
input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }
</style>
