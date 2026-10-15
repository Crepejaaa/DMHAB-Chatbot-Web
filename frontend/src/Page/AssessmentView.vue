<template>
  <div :class="['assessment-page min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">

    <!-- 1. Navbar -->
    <AppNavbar :show-back="true" />

    <!-- 2. Green Banner Header with Timeframe Context -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-6 pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden shadow-md">
      <!-- Background Decorative Curve Line -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <!-- Page Title & Timeframe Header -->
      <div class="container mx-auto max-w-4xl relative z-10">
        <div class="flex gap-4 items-stretch mb-4">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-emerald-100 mb-2">
              <span>🩺 แบบคัดกรองมาตรฐาน กรมสุขภาพจิต (2Q / 9Q / 8Q)</span>
            </div>
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              แบบประเมินสุขภาพจิตเบื้องต้น
            </h1>
            <p class="text-xs sm:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed">
              สำรวจสภาวะอารมณ์และความเครียดของคุณอย่างรอบด้าน เพื่อเข้าใจตัวเองและรับคำแนะนำที่เหมาะสม
            </p>
          </div>
        </div>

        <!-- 3. Timeframe Context Highlight Box -->
        <div class="mt-4 p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-sm text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
              ⏱️
            </div>
            <div>
              <p class="text-xs font-extrabold uppercase tracking-wider text-amber-200">กรอบเวลาการประเมิน (Timeframe Context)</p>
              <p class="text-sm sm:text-base font-bold text-white">
                อ้างอิงจากความรู้สึกและพฤติกรรมของคุณ <span class="underline decoration-amber-300 decoration-2 font-black text-amber-100">"ในช่วง 2 สัปดาห์ที่ผ่านมา"</span>
              </p>
            </div>
          </div>
          <div class="text-[11px] bg-black/20 px-3 py-1.5 rounded-full text-emerald-100 shrink-0 self-end sm:self-auto font-medium">
            14 วันล่าสุด (Past 2 Weeks)
          </div>
        </div>

        <!-- Progress Indicator Bar -->
        <div class="mt-4 bg-black/20 p-3 rounded-2xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2 font-medium">
            <span>ความคืบหน้า:</span>
            <span class="font-bold text-amber-200">{{ answeredCount }} / {{ totalQuestions }} ข้อ</span>
            <span>({{ Math.round((answeredCount / totalQuestions) * 100) }}%)</span>
          </div>
          <div class="w-full sm:w-48 bg-white/20 rounded-full h-2.5 overflow-hidden">
            <div
              class="bg-gradient-to-r from-amber-300 to-emerald-300 h-2.5 rounded-full transition-all duration-300"
              :style="{ width: `${(answeredCount / totalQuestions) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <!-- 3. Main Content Container -->
    <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-8 pb-16">

      <!-- ==================== SECTION 1: 2Q ==================== -->
      <section class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div class="px-5 sm:px-8 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-[#0D9488] dark:text-emerald-300 font-extrabold text-xs rounded-full">ส่วนที่ 1: แบบคัดกรอง 2Q</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">2 ข้อ</span>
            </div>
            <!-- Timeframe Badge -->
            <span class="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <span>⏱️ กรอบเวลา:</span> ในช่วง 2 สัปดาห์ที่ผ่านมา
            </span>
          </div>
          <h2 class="text-base sm:text-lg font-bold text-[#1E293B] dark:text-gray-100">
            โปรดตอบคำถามต่อไปนี้ตามความเป็นจริงในช่วง 2 สัปดาห์ที่ผ่านมา
          </h2>
        </div>

        <!-- Desktop View (md:) -->
        <div class="hidden md:block overflow-x-auto px-8 py-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#F0FDF4] dark:bg-slate-800">
                <th class="text-left py-3.5 px-4 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 rounded-tl-xl">คำถาม</th>
                <th class="py-3.5 px-6 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 text-center w-28">
                  <div class="flex items-center justify-center gap-1">
                    <span>มี</span>
                    <button type="button" @click="activeModalTooltip = tooltipDefinitions['q2_yes']" class="text-gray-400 hover:text-teal-600 text-xs cursor-pointer" title="ดูคำอธิบาย">ℹ️</button>
                  </div>
                </th>
                <th class="py-3.5 px-6 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 text-center w-28 rounded-tr-xl">
                  <div class="flex items-center justify-center gap-1">
                    <span>ไม่มี</span>
                    <button type="button" @click="activeModalTooltip = tooltipDefinitions['q2_no']" class="text-gray-400 hover:text-teal-600 text-xs cursor-pointer" title="ดูคำอธิบาย">ℹ️</button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q2Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/50 dark:bg-slate-800/40'">
                <td class="py-4 px-4 border border-gray-200 dark:border-slate-700 text-[#374151] dark:text-gray-300 font-medium leading-relaxed">
                  <span class="font-bold text-[#0D9488]">{{ idx + 1 }}.</span> {{ q.text }}
                </td>
                <td class="py-4 border border-gray-200 dark:border-slate-700 text-center">
                  <!-- Touch Target: min 48px height, generous width -->
                  <button
                    type="button"
                    @click="q2Answers[q.id] = 1"
                    :class="[
                      'w-20 h-11 rounded-xl font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm cursor-pointer select-none active:scale-95',
                      q2Answers[q.id] === 1
                        ? 'bg-[#0D9488] text-white ring-4 ring-[#0D9488]/30 scale-105'
                        : 'bg-[#F1F5F9] dark:bg-slate-800 text-[#64748B] dark:text-gray-300 hover:bg-[#E2E8F0] dark:hover:bg-slate-700'
                    ]"
                  >
                    <span>มี</span>
                  </button>
                </td>
                <td class="py-4 border border-gray-200 dark:border-slate-700 text-center">
                  <button
                    type="button"
                    @click="q2Answers[q.id] = 0"
                    :class="[
                      'w-20 h-11 rounded-xl font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm cursor-pointer select-none active:scale-95',
                      q2Answers[q.id] === 0
                        ? 'bg-[#0D9488] text-white ring-4 ring-[#0D9488]/30 scale-105'
                        : 'bg-[#F1F5F9] dark:bg-slate-800 text-[#64748B] dark:text-gray-300 hover:bg-[#E2E8F0] dark:hover:bg-slate-700'
                    ]"
                  >
                    <span>ไม่มี</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card View (< md) with Large Touch Targets -->
        <div class="md:hidden p-4 space-y-4">
          <div
            v-for="(q, idx) in q2Questions"
            :key="'mob-q2-' + q.id"
            class="p-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/40"
          >
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
              <span class="font-bold text-[#0D9488]">{{ idx + 1 }}.</span> {{ q.text }}
            </p>
            <!-- Large Touch Target Buttons for Mobile -->
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="q2Answers[q.id] = 1"
                :class="[
                  'min-h-[48px] py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95 shadow-sm',
                  q2Answers[q.id] === 1
                    ? 'bg-[#0D9488] text-white ring-4 ring-[#0D9488]/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600'
                ]"
              >
                <span>✓ มี</span>
              </button>
              <button
                type="button"
                @click="q2Answers[q.id] = 0"
                :class="[
                  'min-h-[48px] py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95 shadow-sm',
                  q2Answers[q.id] === 0
                    ? 'bg-[#0D9488] text-white ring-4 ring-[#0D9488]/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600'
                ]"
              >
                <span>✗ ไม่มี</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== SECTION 2: 9Q ==================== -->
      <section class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div class="px-5 sm:px-8 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-[#0D9488] dark:text-emerald-300 font-extrabold text-xs rounded-full">ส่วนที่ 2: แบบประเมิน 9Q</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">9 ข้อ</span>
            </div>
            <!-- Timeframe Badge -->
            <span class="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <span>⏱️ กรอบเวลา:</span> ในช่วง 2 สัปดาห์ที่ผ่านมา
            </span>
          </div>
          <h2 class="text-base sm:text-lg font-bold text-[#1E293B] dark:text-gray-100">
            ในช่วง 2 สัปดาห์ที่ผ่านมา ท่านมีอาการต่อไปนี้บ่อยแค่ไหน
          </h2>

          <!-- Interactive Score Guide & Tooltips Banner (Requirement 3: Tooltips on Hover/Click) -->
          <div class="mt-4 p-4 rounded-2xl bg-teal-50/70 dark:bg-slate-800/60 border border-teal-200 dark:border-slate-700">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-[#0D9488] dark:text-emerald-300 flex items-center gap-1">
                <span>💡</span> คำอธิบายความหมายระดับคะแนน (แตะเพื่อดูรายละเอียด)
              </span>
              <span class="text-[10px] text-gray-400">Hover / Click ได้ทุกระดับ</span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="leg in q9Legend"
                :key="'guide-' + leg.val"
                type="button"
                @click="openScoreTooltip(leg.val)"
                class="p-2.5 rounded-xl border border-teal-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-left hover:border-[#0D9488] transition shadow-xs group cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-[#0D9488] text-white flex items-center justify-center text-xs font-black shrink-0">
                    {{ leg.val }}
                  </span>
                  <span class="text-xs font-bold text-gray-800 dark:text-gray-200">{{ leg.label }}</span>
                </div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{{ leg.desc }}</p>
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop View (md:) with Tooltips & Enlarged Touch Buttons -->
        <div class="hidden md:block overflow-x-auto px-8 py-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#F0FDF4] dark:bg-slate-800">
                <th class="text-left py-3.5 px-4 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 rounded-tl-xl">คำถาม</th>
                <th
                  v-for="leg in q9Legend"
                  :key="leg.val"
                  class="py-3.5 px-2 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 text-center w-24 relative"
                >
                  <div class="flex flex-col items-center group relative cursor-pointer" @click="openScoreTooltip(leg.val)">
                    <div class="flex items-center gap-1 font-bold">
                      <span>{{ leg.val }}</span>
                      <span class="text-[10px] text-teal-600">ℹ️</span>
                    </div>
                    <span class="text-[11px] font-normal text-gray-500 dark:text-gray-400">{{ leg.label }}</span>

                    <!-- Desktop Hover Tooltip -->
                    <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 bg-gray-900 text-white text-xs rounded-xl shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 text-left">
                      <p class="font-bold text-emerald-300">{{ leg.val }} คะแนน: {{ leg.label }}</p>
                      <p class="text-[11px] text-gray-300 mt-1">{{ leg.desc }}</p>
                      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q9Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/50 dark:bg-slate-800/40'">
                <td class="py-4 px-4 border border-gray-200 dark:border-slate-700 text-[#374151] dark:text-gray-300 leading-relaxed font-medium">
                  <span class="font-bold text-[#0D9488]">{{ idx + 1 }}.</span> {{ q.text }}
                </td>
                <td v-for="score in [0, 1, 2, 3]" :key="score" class="py-4 border border-gray-200 dark:border-slate-700 text-center">
                  <!-- Touch Target: min 48px x 48px -->
                  <div class="relative group/btn inline-block">
                    <button
                      type="button"
                      @click="q9Answers[q.id] = score"
                      :class="[
                        'w-12 h-12 rounded-2xl font-bold text-base transition-all flex items-center justify-center mx-auto shadow-sm cursor-pointer select-none active:scale-95',
                        q9Answers[q.id] === score
                          ? 'bg-[#0D9488] text-white ring-4 ring-[#0D9488]/30 scale-105'
                          : 'bg-[#F1F5F9] dark:bg-slate-800 text-[#64748B] dark:text-gray-300 hover:bg-[#E2E8F0] dark:hover:bg-slate-700'
                      ]"
                      :title="getTooltipText(score)"
                    >
                      {{ score }}
                    </button>
                    <!-- Hover Score Badge on table button -->
                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-900 text-white text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none z-30">
                      {{ q9Legend[score].label }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-[#F0FDF4] dark:bg-slate-800">
                <td class="py-4 px-4 border border-gray-200 dark:border-slate-700 font-bold text-right text-[#1E293B] dark:text-gray-200" colspan="1">
                  คะแนนรวมส่วนที่ 2 (9Q):
                </td>
                <td class="py-4 border border-gray-200 dark:border-slate-700 text-center font-black text-xl text-[#0D9488] dark:text-emerald-400" colspan="4">
                  {{ q9TotalScore }} / 27
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Mobile Card View (< md) with Large Touch Targets -->
        <div class="md:hidden p-4 space-y-4">
          <div
            v-for="(q, idx) in q9Questions"
            :key="'mob-q9-' + q.id"
            class="p-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/40"
          >
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
              <span class="font-bold text-[#0D9488]">{{ idx + 1 }}.</span> {{ q.text }}
            </p>

            <!-- Large Touch Targets: Grid of 4 options with min 48px touch area -->
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="leg in q9Legend"
                :key="'mob-opt-' + q.id + '-' + leg.val"
                type="button"
                @click="q9Answers[q.id] = leg.val"
                :class="[
                  'min-h-[48px] py-2.5 px-3 rounded-2xl font-semibold text-xs flex flex-col items-center justify-center transition-all cursor-pointer select-none active:scale-95 shadow-xs',
                  q9Answers[q.id] === leg.val
                    ? 'bg-[#0D9488] text-white ring-3 ring-[#0D9488]/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600'
                ]"
              >
                <span class="font-bold text-sm">{{ leg.val }}</span>
                <span class="text-[11px] opacity-90">{{ leg.label }}</span>
              </button>
            </div>
          </div>

          <!-- Total Score Mobile Card -->
          <div class="p-4 rounded-2xl bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700 flex items-center justify-between">
            <span class="font-bold text-sm text-gray-700 dark:text-gray-200">คะแนนรวมส่วนที่ 2 (9Q):</span>
            <span class="text-xl font-black text-[#0D9488] dark:text-emerald-400">{{ q9TotalScore }} / 27</span>
          </div>
        </div>
      </section>

      <!-- ==================== SECTION 3: 8Q ==================== -->
      <section class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
        <div class="px-5 sm:px-8 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-extrabold text-xs rounded-full">ส่วนที่ 3: แบบประเมิน 8Q</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">8 ข้อ (ประเมินความเสี่ยงเร่งด่วน)</span>
            </div>
            <!-- Timeframe Badge -->
            <span class="text-xs bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <span>⏱️ กรอบเวลา:</span> ในช่วง 1 เดือนที่ผ่านมา
            </span>
          </div>
          <h2 class="text-base sm:text-lg font-bold text-[#1E293B] dark:text-gray-100">
            ในช่วง 1 เดือนที่ผ่านมา มีเหตุการณ์หรือความคิดต่อไปนี้เกิดขึ้นหรือไม่
          </h2>
        </div>

        <!-- Desktop View (md:) -->
        <div class="hidden md:block overflow-x-auto px-8 py-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#FFF1F2] dark:bg-rose-950/30">
                <th class="text-left py-3.5 px-4 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 rounded-tl-xl" style="width:65%">คำถาม</th>
                <th class="py-3.5 px-4 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 text-center w-28">ไม่มี (0)</th>
                <th class="py-3.5 px-4 font-semibold text-[#1E293B] dark:text-gray-200 border border-gray-200 dark:border-slate-700 text-center w-28 rounded-tr-xl">มี</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q8Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/50 dark:bg-slate-800/40'">
                <td class="py-4 px-4 border border-gray-200 dark:border-slate-700 text-[#374151] dark:text-gray-300 leading-relaxed font-medium">
                  <span class="font-bold text-rose-600">{{ idx + 1 }}.</span> {{ q.text }}
                  <span v-if="q.sub" class="block text-xs text-gray-400 mt-1 italic">({{ q.sub }})</span>
                </td>
                <td class="py-4 border border-gray-200 dark:border-slate-700 text-center">
                  <button
                    type="button"
                    @click="q8Answers[q.id] = 0"
                    :class="[
                      'w-12 h-12 rounded-2xl font-bold text-base transition-all flex items-center justify-center mx-auto shadow-sm cursor-pointer select-none active:scale-95',
                      q8Answers[q.id] === 0
                        ? 'bg-[#0D9488] text-white ring-4 ring-[#0D9488]/30 scale-105'
                        : 'bg-[#F1F5F9] dark:bg-slate-800 text-[#64748B] dark:text-gray-300 hover:bg-[#E2E8F0] dark:hover:bg-slate-700'
                    ]"
                  >
                    0
                  </button>
                </td>
                <td class="py-4 border border-gray-200 dark:border-slate-700 text-center">
                  <button
                    type="button"
                    @click="q8Answers[q.id] = q.score"
                    :class="[
                      'w-12 h-12 rounded-2xl font-bold text-base transition-all flex items-center justify-center mx-auto shadow-sm cursor-pointer select-none active:scale-95',
                      q8Answers[q.id] === q.score
                        ? 'bg-rose-500 text-white ring-4 ring-rose-400/30 scale-105'
                        : 'bg-[#F1F5F9] dark:bg-slate-800 text-[#64748B] dark:text-gray-300 hover:bg-[#E2E8F0] dark:hover:bg-slate-700'
                    ]"
                  >
                    {{ q.score }}
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-[#FFF1F2] dark:bg-rose-950/30">
                <td class="py-4 px-4 border border-gray-200 dark:border-slate-700 font-bold text-right text-[#1E293B] dark:text-gray-200" colspan="1">คะแนนรวมส่วนที่ 3 (8Q):</td>
                <td class="py-4 border border-gray-200 dark:border-slate-700 text-center font-black text-xl text-rose-600" colspan="2">{{ q8TotalScore }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Mobile Card View (< md) with Large Touch Targets -->
        <div class="md:hidden p-4 space-y-4">
          <div
            v-for="(q, idx) in q8Questions"
            :key="'mob-q8-' + q.id"
            class="p-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/40"
          >
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 leading-relaxed">
              <span class="font-bold text-rose-600">{{ idx + 1 }}.</span> {{ q.text }}
            </p>
            <p v-if="q.sub" class="text-xs text-gray-400 mb-3 italic">({{ q.sub }})</p>

            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="q8Answers[q.id] = 0"
                :class="[
                  'min-h-[48px] py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95 shadow-sm',
                  q8Answers[q.id] === 0
                    ? 'bg-[#0D9488] text-white ring-4 ring-[#0D9488]/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600'
                ]"
              >
                <span>ไม่มี (0)</span>
              </button>
              <button
                type="button"
                @click="q8Answers[q.id] = q.score"
                :class="[
                  'min-h-[48px] py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none active:scale-95 shadow-sm',
                  q8Answers[q.id] === q.score
                    ? 'bg-rose-500 text-white ring-4 ring-rose-400/30 scale-[1.02]'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600'
                ]"
              >
                <span>มี (+{{ q.score }})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== SUBMIT SECTION ==================== -->
      <!-- Requirement 2: Expanded Submit Touch Target & Helper -->
      <div class="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-gray-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-100">
            <span>สถานะแบบประเมิน:</span>
            <span :class="isFormValid ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'">
              {{ isFormValid ? '✓ ตอบคำถามครบถ้วนแล้ว' : `ยังตอบไม่ครบ (เหลืออีก ${totalQuestions - answeredCount} ข้อ)` }}
            </span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            เมื่อส่งแบบประเมิน ระบบจะคำนวณคะแนนและสรุปผลพร้อมข้อเสนอแนะทันที
          </p>
        </div>

        <button
          type="button"
          @click="submitAssessment"
          :disabled="!isFormValid"
          class="w-full sm:w-auto min-h-[52px] px-10 py-4 bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] hover:from-[#034d44] hover:to-[#047857] text-white rounded-2xl font-extrabold text-base sm:text-lg shadow-xl shadow-teal-700/25 transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>ส่งแบบประเมินและดูผลลัพธ์</span>
          <span class="text-xl">&rarr;</span>
        </button>
      </div>

    </main>

    <!-- Score Details Modal / Tooltip Popover (for Click on Mobile & Detailed View) -->
    <div
      v-if="activeModalTooltip"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="activeModalTooltip = null"
    >
      <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-slate-800 text-left animate-fade-up">
        <div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">{{ activeModalTooltip.icon || 'ℹ️' }}</span>
            <h3 class="font-extrabold text-base text-gray-900 dark:text-white">{{ activeModalTooltip.title }}</h3>
          </div>
          <button
            type="button"
            @click="activeModalTooltip = null"
            class="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {{ activeModalTooltip.description }}
        </p>
        <div class="bg-teal-50 dark:bg-slate-800 p-3 rounded-xl text-xs text-teal-800 dark:text-teal-200">
          <span class="font-bold">ตัวอย่าง:</span> {{ activeModalTooltip.example }}
        </div>
        <button
          type="button"
          @click="activeModalTooltip = null"
          class="mt-5 w-full py-2.5 bg-[#0D9488] text-white font-bold text-sm rounded-xl hover:bg-[#045F54] transition cursor-pointer"
        >
          เข้าใจแล้ว
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <!-- โลโก้ Footer -->
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">PhuenJaiZone</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">Services</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><router-link to="/chat" class="hover:underline">Daily Chatbot</router-link></li>
            <li><router-link to="/daily-checkin" class="hover:underline">Personalized Feedback</router-link></li>
            <li><router-link to="/blog" class="hover:underline">Self-Care Resource Library</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Contact</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ PhuenJaiZone@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">Hotline</router-link>
          <p class="text-xs text-[#D1FAE5]">สายด่วนสุขภาพจิต 1323 (โทรฟรี 24 ชม.)</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        © 2026 PhuenJaiZone. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import { useAssessmentStore } from '../stores/assessmentStore'

const isDarkMode = inject('isDarkMode', ref(false))
const router = useRouter()
const assessmentStore = useAssessmentStore()

// ===== 2Q =====
const q2Questions = [
  { id: 1, text: 'ใน 2 สัปดาห์ที่ผ่านมา รู้สึกหม่นหมอง ไม่มีความสุข หรือสิ้นหวัง' },
  { id: 2, text: 'ใน 2 สัปดาห์ที่ผ่านมา รู้สึกเบื่อหน่าย ทำอะไรก็ไม่สนุกไม่เพลิดเพลิน' },
]
const q2Answers = ref({})

// ===== 9Q =====
const q9Legend = [
  { val: 0, label: 'ไม่มีเลย', desc: 'ไม่เคยมีอาการนี้เลยในช่วง 2 สัปดาห์' },
  { val: 1, label: 'เป็นบางวัน (1-7 วัน)', desc: 'มีอาการ 1 ถึง 7 วัน ไม่ถึงครึ่งหนึ่งของช่วงเวลา' },
  { val: 2, label: 'เป็นบ่อย (> 7 วัน)', desc: 'มีอาการมากกว่า 7 วันขึ้นไป' },
  { val: 3, label: 'เป็นทุกวัน', desc: 'มีอาการแทบทุกวันตลอด 2 สัปดาห์ที่ผ่านมา' },
]

const q9Questions = [
  { id: 1, text: 'เบื่อ ไม่สนใจอยากทำอะไร' },
  { id: 2, text: 'ไม่สบายใจ ซึมเศร้า ท้อแท้' },
  { id: 3, text: 'หลับยากหรือหลับๆ ตื่นๆ หรือหลับมากเกินไป' },
  { id: 4, text: 'เหนื่อยง่ายหรือไม่ค่อยมีแรง' },
  { id: 5, text: 'เบื่ออาหารหรือกินมากเกินไป' },
  { id: 6, text: 'รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลวหรือครอบครัวผิดหวัง' },
  { id: 7, text: 'สมาธิไม่ดี เวลาทำอะไรเช่น อ่านหนังสือพิมพ์ ดูโทรทัศน์ สิ่งที่ทำอยู่นั้นได้ยาก' },
  { id: 8, text: 'พูดช้า หรือทำอะไรช้าลงจนคนอื่นสังเกตได้ หรือกระสับกระส่ายจนไม่สามารถอยู่นิ่งได้มากกว่าปกติ' },
  { id: 9, text: 'คิดทำร้ายตนเอง หรือคิดว่าตายไปจะดีกว่าอยู่' },
]
const q9Answers = ref({})
const q9TotalScore = computed(() => Object.values(q9Answers.value).reduce((a, b) => a + b, 0))

// ===== 8Q =====
const q8Questions = [
  { id: 1, text: 'คิดอยากตาย หรือ คิดว่าตายไปจะดีกว่า', score: 1 },
  { id: 2, text: 'อยากทำร้ายร่างกายตนเอง หรือ ทำให้ตนเองบาดเจ็บ', score: 2 },
  { id: 3, text: 'คิดเรื่องการฆ่าตัวตายบ่อยแค่ไหน', sub: 'ถ้าตอบว่าคิดเรื่องการฆ่าตัวตาย (ในข้อ 1 หรือ 2 แล้ว) ... ท่านสามารถบอกได้ไหมว่า ท่านจะทำหรือไม่', score: 6 },
  { id: 4, text: 'มีแผนการที่จะฆ่าตัวตาย', score: 8 },
  { id: 5, text: 'ได้เตรียมการฆ่าตัวตาย หรือเตรียมการจะฆ่าตัวตายโดยตั้งใจวางแผนที่จะทำโดยตายจริง ๆ', score: 9 },
  { id: 6, text: 'ได้ทำร้ายตนเองจนเกิดบาดแผลหรืออันตรายถึงชีวิต', score: 4 },
  { id: 7, text: 'ได้เคยพยายามฆ่าตัวตาย/ตั้งใจให้ตายจริงๆ', score: 10 },
  { id: 8, text: 'คนรอบข้างที่คุณรู้จัก/แวดล้อมท่านฆ่าตัวตาย', score: 4 },
]
const q8Answers = ref({})
const q8TotalScore = computed(() => Object.values(q8Answers.value).reduce((a, b) => a + b, 0))

// ===== Tooltips System =====
const activeModalTooltip = ref(null)

const tooltipDefinitions = {
  score_0: {
    icon: '0️⃣',
    title: 'ระดับ 0: ไม่มีเลย',
    description: 'ในช่วง 2 สัปดาห์ที่ผ่านมา ท่านไม่มีความรู้สึกหรืออาการตามข้อคำถามดังกล่าวเกิดขึ้นเลยแม้แต่วันเดียว',
    example: 'เช่น รู้สึกกระปรี้กระเปร่า มีความสุขตามปกติ ไม่มีอารมณ์ดิ่งเลยตลอด 14 วัน'
  },
  score_1: {
    icon: '1️⃣',
    title: 'ระดับ 1: เป็นบางวัน (1 - 7 วัน)',
    description: 'มีอาการหรือความรู้สึกดังกล่าวเกิดขึ้นเป็นบางครั้งบางคราว นับรวมกันได้ประมาณ 1 ถึง 7 วัน (น้อยกว่ากึ่งหนึ่งของช่วงเวลา 2 สัปดาห์)',
    example: 'เช่น รู้สึกเบื่อหรือเหนื่อยล้าหลังเลิกงาน 2-3 วันในรอบสัปดาห์ แต่สามารถฟื้นตัวได้ในวันถัดไป'
  },
  score_2: {
    icon: '2️⃣',
    title: 'ระดับ 2: เป็นบ่อย (> 7 วัน)',
    description: 'มีอาการหรือความรู้สึกดังกล่าวเกิดขึ้นบ่อยครั้ง นับรวมแล้วมากกว่า 7 วันขึ้นไป (มากกว่าครึ่งหนึ่งของช่วงเวลา 2 สัปดาห์)',
    example: 'เช่น นอนไม่หลับหรือรู้สึกท้อแท้เกือบทุกวันติดต่อกันเกิน 1 สัปดาห์ เริ่มส่งผลต่อสมาธิและการทำงาน'
  },
  score_3: {
    icon: '3️⃣',
    title: 'ระดับ 3: เป็นทุกวัน',
    description: 'มีอาการหรือความรู้สึกดังกล่าวเกิดขึ้นแทบทุกวันหรือทุกวันต่อเนื่องตลอด 2 สัปดาห์ที่ผ่านมา ส่งผลกระทบอย่างมีนัยสำคัญต่อการใช้ชีวิต',
    example: 'เช่น หมดความสนใจในทุกสิ่งทุกอย่าง มีความคิดลบต่อเนื่องทุกวัน ไม่สามารถทำกิจวัตรตามปกติได้'
  },
  q2_yes: {
    icon: '🟢',
    title: 'ตัวเลือก "มี"',
    description: 'หมายถึงท่านเคยมีความรู้สึกหม่นหมอง สิ้นหวัง หรือเบื่อหน่ายอย่างน้อย 1 วันขึ้นไปในช่วง 2 สัปดาห์ที่ผ่านมา',
    example: 'หากรู้สึกว่ามีอาการตรงกับข้อคำถาม ให้เลือก "มี"'
  },
  q2_no: {
    icon: '⚪',
    title: 'ตัวเลือก "ไม่มี"',
    description: 'หมายถึงท่านไม่เคยมีความรู้สึกดังกล่าวเกิดขึ้นเลยในช่วง 2 สัปดาห์ที่ผ่านมา',
    example: 'หากจิตใจสดใสเป็นปกติ ไม่มีอาการหม่นหมอง ให้เลือก "ไม่มี"'
  }
}

const openScoreTooltip = (score) => {
  activeModalTooltip.value = tooltipDefinitions[`score_${score}`]
}

const getTooltipText = (score) => {
  return tooltipDefinitions[`score_${score}`]?.description || ''
}

// ===== Progress & Validation =====
const totalQuestions = 19

const answeredCount = computed(() => {
  return Object.keys(q2Answers.value).length + Object.keys(q9Answers.value).length + Object.keys(q8Answers.value).length
})

const isFormValid = computed(() => {
  const q2Done = q2Questions.every(q => q2Answers.value[q.id] !== undefined)
  const q9Done = q9Questions.every(q => q9Answers.value[q.id] !== undefined)
  const q8Done = q8Questions.every(q => q8Answers.value[q.id] !== undefined)
  return q2Done && q9Done && q8Done
})

// ===== Submit =====
const submitAssessment = () => {
  const q9Score = q9TotalScore.value
  const q8Score = q8TotalScore.value

  let level = 'NORMAL'
  if (q9Score >= 19 || q8Score >= 9) level = 'SEVERE'
  else if (q9Score >= 7) level = 'MODERATE'

  assessmentStore.setFullResult({
    score: q9Score,
    level,
    q2Answers: { ...q2Answers.value },
    q9Answers: { ...q9Answers.value },
    q8Answers: { ...q8Answers.value },
    q9Score,
    q8Score,
    needsQ9: Object.values(q2Answers.value).some(v => v === 1),
    needsQ8: q9Score >= 7,
  })

  router.push('/assessment-result')
}
</script>
