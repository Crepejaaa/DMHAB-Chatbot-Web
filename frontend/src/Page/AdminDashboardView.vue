<template>
  <div class="flex flex-col space-y-8">
    
    <!-- Top Bar -->
    <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
      <div>
        <h1 class="text-3xl font-extrabold text-[#1E293B] tracking-tight">แดชบอร์ดแอดมิน</h1>
        <p class="text-sm text-gray-500">ภาพรวมข้อมูลสถิติระบบ PhuenJaiZone</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-emerald-50 text-[#0D9488] font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border border-[#0D9488]/20 animate-pulse">
          <span class="w-2 h-2 rounded-full bg-[#0D9488]"></span>
          ระบบออนไลน์
        </div>
        <span class="text-xs text-gray-400 font-mono">วันที่: {{ currentDate }}</span>
      </div>
    </header>

    <!-- Stat Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- จำนวนผู้ใช้ทั้งหมด -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">จำนวนผู้ใช้ทั้งหมด</span>
          <div class="bg-emerald-50 p-2 rounded-lg text-[#0D9488]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ mockStats.totalUsers }}</span>
          <span class="text-xs font-medium text-emerald-600">+12% สัปดาห์นี้</span>
        </div>
      </div>

      <!-- จำนวนการประเมินสำเร็จ -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">การประเมินสำเร็จ</span>
          <div class="bg-teal-50 p-2 rounded-lg text-[#0D9488]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ mockStats.assessmentsCompleted }}</span>
          <span class="text-xs font-medium text-gray-500">ครั้งทั้งหมด</span>
        </div>
      </div>

      <!-- คะแนนประเมินเฉลี่ย -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">คะแนนประเมินเฉลี่ย</span>
          <div class="bg-amber-50 p-2 rounded-lg text-amber-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ mockStats.avgScore }} / 21</span>
          <span class="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">ปานกลาง</span>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Formatting date
const currentDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('th-TH', options)
})

// Statistics Overview
const mockStats = ref({
  totalUsers: 142,
  assessmentsCompleted: 3248,
  avgScore: '14.2'
})
</script>
