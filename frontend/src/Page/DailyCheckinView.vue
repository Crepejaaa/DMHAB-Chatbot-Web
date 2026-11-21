<template>
  <div :class="['min-h-screen flex flex-col font-sans text-[#1E293B] transition-colors duration-500', isDarkMode ? 'dark-mode-page bg-[#0F172A] text-slate-100' : 'bg-[#F8FAF9]']">

    <!-- ========== 1. Top Navbar ========== -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          @click="$router.push('/services')"
          class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center"
          :title="$t('common.back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <router-link to="/" class="flex items-center gap-1.5 sm:gap-2">
          <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
            <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain rounded-full shadow-sm" />
          </div>
          <span class="text-xl font-bold tracking-wide">{{ $t('common.brand') }}</span>
        </router-link>
      </div>

      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" class="hover:text-[#D1FAE5] transition">{{ $t('nav.home') }}</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition">{{ $t('nav.about') }}</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition">{{ $t('nav.services') }}</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">{{ $t('nav.blog') }}</router-link>
        <AdminNavLink />
      </div>

      <div class="flex gap-3 items-center text-sm">
        <LanguageSwitcher />

        <div class="hidden md:flex items-center gap-2 mr-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" :title="$t('nav.darkModeTitle')">
          <span class="text-xs font-semibold text-white">{{ $t('nav.darkMode') }}</span>
          <button
            @click="isDarkMode = !isDarkMode"
            :class="isDarkMode ? 'bg-white' : 'bg-[#045F54]'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-white/30"
          >
            <span
              :class="isDarkMode ? 'translate-x-4 bg-[#1E293B]' : 'translate-x-1 bg-white'"
              class="inline-block h-3 w-3 transform rounded-full transition-transform duration-300"
            ></span>
          </button>
        </div>

        <ProfileMenu />
      </div>
    </nav>

    <!-- ========== 2. Hero Header ========== -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-24 px-6 lg:px-12 relative overflow-hidden shadow-sm">
      <div class="absolute inset-0 pointer-events-none opacity-10">
        <svg viewBox="0 0 800 400" class="w-full h-full object-cover">
          <path d="M 0,200 Q 200,80 400,200 T 800,200" fill="none" stroke="currentColor" stroke-width="12" />
          <circle cx="700" cy="100" r="140" fill="none" stroke="currentColor" stroke-width="8" />
          <circle cx="120" cy="300" r="90" fill="none" stroke="currentColor" stroke-width="6" />
        </svg>
      </div>

      <div class="container mx-auto max-w-5xl relative z-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex gap-4 items-start">
            <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-inner shrink-0 mt-1">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="m9 16 2 2 4-4" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-[#D1FAE5] border border-white/20">
                  {{ $t('checkin.today') }} • {{ todayShortDate }}
                </span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-400/20 text-[#D1FAE5] border border-emerald-300/30 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
                  Database Synced
                </span>
              </div>
              <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {{ $t('checkin.title') }}
              </h1>
              <p class="text-xs md:text-sm text-[#D1FAE5] max-w-xl mt-1 leading-relaxed">
                {{ $t('checkin.subtitle') }}
              </p>
            </div>
          </div>

          <!-- Quick Today Status Widget -->
          <div class="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 text-xs shrink-0 self-start md:self-auto shadow-sm">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="todayCheckin ? 'bg-emerald-400/25 text-emerald-200' : 'bg-amber-400/25 text-amber-200'">
              <svg v-if="todayCheckin" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else class="w-5 h-5 text-white animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12" />
              </svg>
            </div>
            <div>
              <p class="font-bold text-white text-sm">
                {{ todayCheckin ? $t('checkin.checkedIn') : $t('checkin.notCheckedIn') }}
              </p>
              <p class="text-[#D1FAE5] text-[11px] mt-0.5">
                <span v-if="todayCheckin">{{ getMoodLabel(todayCheckin.score) }} ({{ todayCheckin.score }}/5)</span>
                <span v-else>ใช้เวลาเพียง 1 นาทีเพื่อสำรวจใจ</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ========== 3. Main Content Container ========== -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 -mt-16 pb-16 space-y-8 relative z-20">

      <!-- ==================== STEP 1 : Today Check-in Form Card ==================== -->
      <section class="rounded-3xl shadow-xl overflow-hidden border transition-all duration-300"
        :class="isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-100'">

        <!-- Card Header Banner -->
        <div class="bg-gradient-to-r from-[#0D9488] to-[#059669] px-6 py-4 flex items-center justify-between text-white">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-[#D1FAE5]">{{ todayFullDate }}</p>
              <h2 class="font-extrabold text-base md:text-lg leading-tight">
                {{ todayCheckin ? $t('checkin.updateCheckin') : $t('checkin.howFeel') }}
              </h2>
            </div>
          </div>

          <!-- Status Pill -->
          <div class="flex items-center gap-2">
            <span v-if="todayCheckin" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/25">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
              {{ $t('checkin.checkedIn') }}
            </span>
            <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/25">
              <span class="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
              {{ $t('checkin.notCheckedIn') }}
            </span>
          </div>
        </div>

        <div class="p-6 md:p-8 space-y-8">

          <!-- 1. Mood Cards Selector (5 Levels - Clean SVG Icons) -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <label :class="['text-sm font-bold flex items-center gap-2', isDarkMode ? 'text-slate-200' : 'text-slate-800']">
                <span class="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                {{ $t('checkin.howFeel') }}
              </label>
              <span class="text-xs font-semibold text-[#0D9488]">
                {{ selectedMood ? selectedMood.label + ' (' + selectedMood.score + '/5)' : '' }}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4">
              <button
                v-for="mood in moodOptions"
                :key="mood.id"
                type="button"
                @click="selectMood(mood)"
                :class="[
                  'relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group text-center',
                  selectedMoodId === mood.id
                    ? (isDarkMode ? 'border-[#0D9488] bg-[#0D9488]/20 shadow-lg ring-2 ring-[#0D9488]/30 scale-[1.03]' : mood.activeClass + ' border-[#0D9488] shadow-md ring-2 ring-[#0D9488]/25 scale-[1.03]')
                    : (isDarkMode ? 'border-slate-700/60 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800' : 'border-slate-100 bg-slate-50/70 hover:border-slate-200 hover:bg-white hover:shadow-sm')
                ]"
              >
                <div v-if="selectedMoodId === mood.id"
                  class="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#0D9488] text-white flex items-center justify-center shadow-sm">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>

                <!-- Mood SVG Icon Container -->
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-2.5"
                  :style="{ color: mood.color, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : mood.iconBg }">
                  <!-- Mood 5: Great -->
                  <svg v-if="mood.id === 5" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 13.5c1.5 2 6.5 2 8 0" />
                    <path d="M8 9.5c.5-.8 1.5-.8 2 0" />
                    <path d="M14 9.5c.5-.8 1.5-.8 2 0" />
                  </svg>
                  <!-- Mood 4: Good -->
                  <svg v-else-if="mood.id === 4" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3" />
                    <line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3" />
                  </svg>
                  <!-- Mood 3: Okay -->
                  <svg v-else-if="mood.id === 3" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" y1="15" x2="16" y2="15" />
                    <line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3" />
                    <line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3" />
                  </svg>
                  <!-- Mood 2: Not Great -->
                  <svg v-else-if="mood.id === 2" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 16s-1.5-1.5-4-1.5-4 1.5-4 1.5" />
                    <line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3" />
                    <line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3" />
                  </svg>
                  <!-- Mood 1: Bad -->
                  <svg v-else class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 16c-1.5-2-6.5-2-8 0" />
                    <line x1="9" y1="10" x2="9.01" y2="10" stroke-width="3" />
                    <line x1="15" y1="10" x2="15.01" y2="10" stroke-width="3" />
                  </svg>
                </div>

                <span :class="['text-xs font-bold leading-tight', selectedMoodId === mood.id ? 'text-[#0D9488]' : (isDarkMode ? 'text-slate-300' : 'text-slate-700')]">
                  {{ mood.label }}
                </span>
                <span class="text-[10px] text-slate-400 mt-0.5">
                  {{ mood.score }}/5
                </span>
              </button>
            </div>

            <!-- Contextual Warm Feedback Quote -->
            <div class="mt-4 p-3.5 rounded-2xl border text-xs leading-relaxed flex items-center gap-3 transition-all duration-300"
              :class="isDarkMode ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-emerald-50/70 border-emerald-100 text-emerald-950'">
              <div class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" :style="{ color: selectedMood?.color }">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="flex-1 font-medium">
                {{ moodComfortMessage }}
              </p>
            </div>
          </div>

          <!-- 2. Detailed Dimension Sliders (Energy, Stress, Social) + คำอธิบายใต้แถบความเครียด -->
          <div class="space-y-4 pt-2 border-t" :class="isDarkMode ? 'border-slate-700/60' : 'border-slate-100'">
            <div class="flex items-center justify-between">
              <label :class="['text-sm font-bold flex items-center gap-2', isDarkMode ? 'text-slate-200' : 'text-slate-800']">
                <span class="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                {{ $t('checkin.moreDetail') }}
              </label>
              <span class="text-[11px] text-slate-400">ระดับ 1 - 10</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                v-for="metric in moodMetrics"
                :key="metric.id"
                :class="['p-4 rounded-2xl border space-y-2.5 transition-all flex flex-col justify-between', isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50/50 border-slate-100']"
              >
                <div class="space-y-2.5">
                  <div class="flex justify-between items-center">
                    <span :class="['text-xs font-bold flex items-center gap-1.5', isDarkMode ? 'text-slate-200' : 'text-slate-800']">
                      <!-- Zap Icon for Energy -->
                      <svg v-if="metric.id === 'energy'" class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                      <!-- Pulse / Brain for Stress -->
                      <svg v-else-if="metric.id === 'stress'" class="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                      <!-- Users for Social -->
                      <svg v-else class="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      {{ $t('checkin.metrics.' + metric.id) }}
                    </span>
                    <span class="text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#0D9488]/10 text-[#0D9488]">
                      {{ metric.value }}/10
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    v-model.number="metric.value"
                    class="w-full h-2 rounded-full appearance-none cursor-pointer"
                    :style="{
                      background: `linear-gradient(to right, #0D9488 ${(metric.value - 1) * 100 / 9}%, ${isDarkMode ? '#334155' : '#E2E8F0'} ${(metric.value - 1) * 100 / 9}%)`
                    }"
                  />

                  <div class="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>{{ $t('checkin.metrics.' + metric.id + 'Low') }}</span>
                    <span>{{ $t('checkin.metrics.' + metric.id + 'High') }}</span>
                  </div>
                </div>

                <!-- 2.4 คำอธิบายใต้แถบความเครียด -->
                <div
                  v-if="metric.id === 'stress'"
                  class="mt-3 pt-2.5 border-t text-[11px] leading-relaxed space-y-1"
                  :class="isDarkMode ? 'border-slate-700/70 text-slate-300' : 'border-slate-200/70 text-slate-600'"
                >
                  <p class="font-semibold flex items-start gap-1.5" :class="stressLevelColorClass(metric.value)">
                    <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>{{ stressDynamicText(metric.value) }}</span>
                  </p>
                  <p class="text-[10px] text-slate-400">
                    {{ $t('checkin.metrics.stressGuide') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Activities / Tags with SVG Icons -->
          <div class="space-y-3 pt-2 border-t" :class="isDarkMode ? 'border-slate-700/60' : 'border-slate-100'">
            <div class="flex items-center justify-between">
              <label :class="['text-sm font-bold flex items-center gap-2', isDarkMode ? 'text-slate-200' : 'text-slate-800']">
                <span class="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                {{ $t('checkin.activitiesToday') }}
              </label>
              <span class="text-[11px] text-slate-400">เลือกได้หลายข้อ</span>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in activityTagList"
                :key="tag.key"
                type="button"
                @click="toggleTag(tag.key)"
                :class="[
                  'px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all duration-200 cursor-pointer',
                  selectedTags.includes(tag.key)
                    ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-sm ring-1 ring-[#0D9488]/40 scale-[1.02]'
                    : isDarkMode
                      ? 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
                      : 'border-slate-200 text-slate-600 bg-white hover:border-[#0D9488]/40 hover:bg-slate-50'
                ]"
              >
                <span class="shrink-0" :class="selectedTags.includes(tag.key) ? 'text-white' : 'text-slate-500'">
                  <!-- 0: Exercise -->
                  <svg v-if="tag.key === '0'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="4" r="2"/><path d="m14 7-3 3-4-2-4 4"/><path d="m8 15 3 2 4-4 4 2"/>
                  </svg>
                  <!-- 1: Reading -->
                  <svg v-else-if="tag.key === '1'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  <!-- 2: Music -->
                  <svg v-else-if="tag.key === '2'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                  </svg>
                  <!-- 3: Meditation -->
                  <svg v-else-if="tag.key === '3'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="m4.93 4.93 1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>
                  </svg>
                  <!-- 4: Cooking -->
                  <svg v-else-if="tag.key === '4'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M6 2v20"/><path d="M9 2v4a3 3 0 0 1-3 3"/>
                  </svg>
                  <!-- 5: Gardening -->
                  <svg v-else-if="tag.key === '5'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2.5 1 4.5-.1 10.2A7 7 0 0 1 11 20z"/><path d="m2 21 7-7"/>
                  </svg>
                  <!-- 6: Art -->
                  <svg v-else-if="tag.key === '6'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.2 0-.9.7-1.7 1.7-1.7H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9.3-10-9.3z"/>
                  </svg>
                  <!-- 7: Meeting friends -->
                  <svg v-else-if="tag.key === '7'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  <!-- 8: Gaming -->
                  <svg v-else-if="tag.key === '8'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/>
                  </svg>
                  <!-- 9: Rest -->
                  <svg v-else-if="tag.key === '9'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                  </svg>
                  <!-- 10: Journaling -->
                  <svg v-else-if="tag.key === '10'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  <!-- 11: Outside -->
                  <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>
                  </svg>
                </span>
                <span>{{ tag.label }}</span>
              </button>
            </div>
          </div>

          <!-- 4. Reflection Note -->
          <div class="space-y-2 pt-2 border-t" :class="isDarkMode ? 'border-slate-700/60' : 'border-slate-100'">
            <div class="flex items-center justify-between">
              <label :class="['text-sm font-bold flex items-center gap-2', isDarkMode ? 'text-slate-200' : 'text-slate-800']">
                <span class="w-2 h-2 rounded-full bg-[#0D9488]"></span>
                {{ $t('checkin.noteLabel') }}
              </label>
              <span class="text-[11px] text-slate-400">{{ noteText.length }}/500</span>
            </div>

            <textarea
              v-model="noteText"
              rows="3"
              maxlength="500"
              :placeholder="$t('checkin.notePlaceholder')"
              :class="[
                'w-full px-4 py-3 rounded-2xl text-sm border transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40',
                isDarkMode ? 'bg-slate-800/60 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              ]"
            ></textarea>
          </div>

          <!-- 5. Submit / Save Button -->
          <div class="pt-2">
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div class="text-xs text-slate-400 flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                <span>{{ $t('checkin.cloudSaved') }}</span>
              </div>

              <button
                type="button"
                @click="saveCheckin"
                :disabled="isSaving"
                class="px-8 py-3.5 rounded-xl font-bold text-sm md:text-base text-white bg-gradient-to-r from-[#045F54] to-[#0D9488] hover:from-[#034d44] hover:to-[#0b8277] shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <svg v-if="isSaving" class="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {{ isSaving ? 'กำลังบันทึก...' : (todayCheckin ? $t('checkin.updateCheckin') : $t('checkin.saveCheckin')) }}
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- ==================== STEP 2 : Stats Overview Cards ==================== -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="stat in summaryStats"
          :key="stat.key"
          :class="['p-5 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] shadow-sm', isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-100']"
        >
          <div class="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" :style="{ backgroundColor: stat.bgColor, color: stat.color }">
            <svg v-if="stat.key === 'streak'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            <svg v-else-if="stat.key === 'total'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <svg v-else-if="stat.key === 'avg'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div class="text-2xl font-black" :style="{ color: stat.color }">{{ stat.value }}</div>
          <div :class="['text-xs mt-1 font-medium', isDarkMode ? 'text-slate-400' : 'text-slate-500']">{{ stat.label }}</div>
        </div>
      </section>

      <!-- ==================== STEP 3 : Mood Trend & Trajectory ==================== -->
      <section :class="['rounded-3xl border p-6 md:p-8 shadow-sm transition-all', isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-100']">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 :class="['font-extrabold text-lg flex items-center gap-2', isDarkMode ? 'text-white' : 'text-slate-800']">
              <svg class="w-5 h-5 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {{ $t('checkin.trendTitle') }}
            </h2>
            <p :class="['text-xs mt-0.5', isDarkMode ? 'text-slate-400' : 'text-slate-500']">{{ $t('checkin.trendDesc') }}</p>
          </div>
          <div class="flex gap-2">
            <button
              v-for="days in [7, 14, 30]"
              :key="days"
              type="button"
              @click="selectedDays = days"
              :class="[
                'text-xs px-3.5 py-1.5 rounded-full font-semibold border transition-all cursor-pointer',
                selectedDays === days
                  ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-sm'
                  : isDarkMode
                    ? 'border-slate-700 text-slate-400 hover:border-slate-600'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
              ]"
            >
              {{ $t('checkin.days', { n: days }) }}
            </button>
          </div>
        </div>

        <!-- Bar Chart Container -->
        <div class="flex items-end gap-2 md:gap-3 h-40 pt-4 pb-2 px-2 border-b" :class="isDarkMode ? 'border-slate-700/60' : 'border-slate-100'">
          <div v-for="(day, i) in chartData" :key="i" class="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
            <span class="text-[11px] font-bold text-[#0D9488] opacity-0 group-hover:opacity-100 transition-opacity">
              {{ day.score > 0 ? day.score + '/5' : '—' }}
            </span>
            <div
              class="w-full max-w-[36px] rounded-t-xl transition-all duration-500 relative cursor-pointer group-hover:brightness-110"
              :style="{
                height: day.score > 0 ? (day.score / 5 * 100) + '%' : '6px',
                background: day.score > 0 ? moodBarColor(day.score) : (isDarkMode ? '#334155' : '#E2E8F0')
              }"
              :title="day.label + (day.score > 0 ? ': ' + day.score + '/5' : ': ยังไม่มีข้อมูล')"
            ></div>
            <span :class="['text-[10px] font-semibold mt-1 truncate max-w-full text-center', day.isToday ? 'text-[#0D9488] font-bold' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')]">
              {{ day.label }}
            </span>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
          <div class="flex flex-wrap items-center gap-4">
            <div v-for="mood in moodLegend" :key="mood.score" class="flex items-center gap-1.5 text-xs">
              <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: mood.color }"></span>
              <span :class="isDarkMode ? 'text-slate-300' : 'text-slate-600'">{{ mood.label }}</span>
            </div>
          </div>
          <span class="text-[11px] text-slate-400">สเกลวัดระดับ 1 - 5</span>
        </div>
      </section>

      <!-- ==================== STEP 4 : Database Check-in History Log + ปุ่มลบประวัติ ==================== -->
      <section :class="['rounded-3xl border p-6 md:p-8 shadow-sm transition-all', isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-100']">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 :class="['font-extrabold text-lg flex items-center gap-2', isDarkMode ? 'text-white' : 'text-slate-800']">
              <svg class="w-5 h-5 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ $t('checkin.historyTitle') }}
            </h2>
            <p :class="['text-xs mt-0.5', isDarkMode ? 'text-slate-400' : 'text-slate-500']">
              ประวัติจากฐานข้อมูลของคุณ ({{ checkinHistory.length }} รายการ)
            </p>
          </div>

          <!-- Action buttons: Refresh + Clear All History (2.2 ปุ่มลบประวัติ) -->
          <div v-if="checkinHistory.length > 0" class="flex items-center gap-2">
            <button
              type="button"
              @click="refreshData"
              class="text-xs px-3 py-1.5 rounded-xl border border-[#0D9488]/30 text-[#0D9488] hover:bg-[#0D9488]/10 flex items-center gap-1.5 font-semibold transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              รีเฟรช
            </button>
            <button
              type="button"
              @click="showClearAllModal = true"
              class="text-xs px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white flex items-center gap-1.5 font-semibold transition cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {{ $t('checkin.clearAllHistory') }}
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="checkinHistory.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-3" :class="isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 :class="['text-sm font-bold', isDarkMode ? 'text-slate-300' : 'text-slate-700']">
            {{ $t('checkin.noHistory') }}
          </h3>
          <p class="text-xs text-slate-400 mt-1 max-w-sm">
            {{ $t('checkin.startFirst') }}
          </p>
          <button
            type="button"
            @click="scrollToForm"
            class="mt-4 px-4 py-2 text-xs font-bold text-white bg-[#0D9488] rounded-xl shadow-sm hover:bg-[#0b8277] transition cursor-pointer"
          >
            เช็คอินเลยตอนนี้
          </button>
        </div>

        <!-- History Cards List -->
        <div v-else class="space-y-3">
          <div
            v-for="entry in visibleHistory"
            :key="entry.id || entry.dateKey"
            :class="[
              'rounded-2xl p-4 border transition-all duration-200 hover:shadow-md flex items-start gap-3.5',
              isDarkMode ? 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600' : 'bg-[#FAFDFA] border-slate-200/80 hover:border-[#0D9488]/30'
            ]"
          >
            <!-- Mood SVG Icon Badge -->
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
              :style="{ backgroundColor: getMoodIconBg(entry.score), color: moodBarColor(entry.score) }"
            >
              <svg v-if="entry.score === 5" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M8 13.5c1.5 2 6.5 2 8 0" /><path d="M8 9.5c.5-.8 1.5-.8 2 0" /><path d="M14 9.5c.5-.8 1.5-.8 2 0" />
              </svg>
              <svg v-else-if="entry.score === 4" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3" /><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3" />
              </svg>
              <svg v-else-if="entry.score === 3" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="8" y1="15" x2="16" y2="15" /><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3" /><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3" />
              </svg>
              <svg v-else-if="entry.score === 2" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-1.5-4-1.5-4 1.5-4 1.5" /><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3" /><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3" />
              </svg>
              <svg v-else class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M16 16c-1.5-2-6.5-2-8 0" /><line x1="9" y1="10" x2="9.01" y2="10" stroke-width="3" /><line x1="15" y1="10" x2="15.01" y2="10" stroke-width="3" />
              </svg>
            </div>

            <!-- Content Area -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span :class="['font-extrabold text-sm', isDarkMode ? 'text-white' : 'text-slate-800']">
                      {{ getMoodLabel(entry.score) }}
                    </span>
                    <span class="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      :style="{ backgroundColor: getMoodIconBg(entry.score), color: moodBarColor(entry.score) }">
                      {{ $t('checkin.scoreOf5', { n: entry.score }) }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-400 mt-0.5">
                    {{ formatHistoryDate(entry.dateKey || entry.savedAt || entry.createdAt) }}
                  </p>
                </div>

                <!-- 2.2 ปุ่มลบประวัติรายรายการ -->
                <button
                  type="button"
                  @click="confirmDeleteEntry(entry)"
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-500/20 transition cursor-pointer shrink-0"
                  :title="$t('checkin.deleteEntry')"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>{{ $t('checkin.deleteEntry') }}</span>
                </button>
              </div>

              <!-- Note -->
              <p v-if="entry.note" :class="['text-xs mt-2 pl-2.5 border-l-2 leading-relaxed italic', isDarkMode ? 'border-[#0D9488] text-slate-300' : 'border-[#0D9488] text-slate-600']">
                "{{ entry.note }}"
              </p>

              <!-- Dimension tags & Activity pills -->
              <div class="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span v-if="entry.energy" class="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  {{ $t('checkin.metrics.energy') }}: {{ entry.energy }}/10
                </span>
                <span v-if="entry.stress" class="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  {{ $t('checkin.metrics.stress') }}: {{ entry.stress }}/10
                </span>
                <span v-if="entry.social" class="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  {{ $t('checkin.metrics.social') }}: {{ entry.social }}/10
                </span>

                <span
                  v-for="tagKey in entry.tags"
                  :key="tagKey"
                  class="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-[#0D9488]/10 text-[#0D9488]"
                >
                  {{ getTagLabel(tagKey) }}
                </span>
              </div>
            </div>
          </div>

          <button
            v-if="checkinHistory.length > 5"
            type="button"
            @click="showAllHistory = !showAllHistory"
            :class="[
              'w-full py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer mt-2',
              isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            ]"
          >
            {{ showAllHistory ? $t('checkin.showLess') : $t('checkin.showAll', { n: checkinHistory.length }) }}
          </button>
        </div>
      </section>

      <!-- ==================== STEP 4.5 : สิ่งเล็ก ๆ ที่ลองทำ (จากผลแบบวัดในแชท) ==================== -->
      <section
        id="my-activities-card"
        :class="['rounded-3xl border p-6 md:p-8 shadow-sm transition-all', isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-100']"
      >
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 :class="['font-extrabold text-lg flex items-center gap-2 mb-1', isDarkMode ? 'text-white' : 'text-slate-800']">
              <svg class="w-5 h-5 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ $t('checkin.myActivities.title') }}
            </h2>
            <p :class="['text-xs', isDarkMode ? 'text-slate-400' : 'text-slate-500']">
              {{ $t('checkin.myActivities.subtitle') }}
            </p>
          </div>

          <button
            type="button"
            @click="toggleActivityHistory"
            class="text-xs px-3.5 py-1.5 rounded-xl border border-[#0D9488]/30 text-[#0D9488] hover:bg-[#0D9488]/10 flex items-center gap-1.5 font-semibold transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ showActivityHistory ? $t('checkin.myActivities.hideHistoryBtn') : $t('checkin.myActivities.viewHistoryBtn') }}</span>
          </button>
        </div>

        <!-- กรณีโหลดไม่สำเร็จ -->
        <div
          v-if="myActivitiesLoadError"
          :class="['p-4 rounded-2xl border text-xs text-center', isDarkMode ? 'bg-rose-950/30 border-rose-800/50 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-600']"
        >
          {{ $t('checkin.myActivities.loadError') }}
        </div>

        <!-- กรณีสถานะว่าง -->
        <div
          v-else-if="myActivities.length === 0"
          class="flex flex-col items-center justify-center py-8 px-4 text-center rounded-2xl border border-dashed"
          :class="isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-teal-200/80 bg-teal-50/30'"
        >
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 bg-[#0D9488]/10 text-[#0D9488]">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <p :class="['text-xs sm:text-sm font-medium max-w-md leading-relaxed mb-4', isDarkMode ? 'text-slate-300' : 'text-slate-600']">
            {{ $t('checkin.myActivities.emptyText') }}
          </p>
          <button
            type="button"
            @click="$router.push('/chat/topics')"
            class="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#045F54] to-[#0D9488] hover:from-[#034d44] hover:to-[#0b8277] rounded-xl shadow-sm transition cursor-pointer inline-flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>{{ $t('checkin.myActivities.goToChatBtn') }}</span>
          </button>
        </div>

        <!-- รายการกิจกรรมที่กำลังทำอยู่ -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in myActivities"
            :key="item.id"
            :class="[
              'rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between gap-4',
              item.loggedToday
                ? (isDarkMode ? 'bg-emerald-950/25 border-emerald-700/60' : 'bg-emerald-50/50 border-emerald-200')
                : (isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-[#FAFDFA] border-slate-200/80')
            ]"
          >
            <div>
              <div class="flex items-start justify-between gap-2 mb-2">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488]">
                    {{ $t('checkin.myActivities.daysLeft', { n: getRemainingDays(item.expiresAt) }) }}
                  </span>
                  <span
                    class="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                    :class="item.loggedToday ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-slate-500/10 text-slate-600 dark:text-slate-300'"
                  >
                    {{ $t('checkin.myActivities.completedDays', { n: item.completedDaysCount || 0 }) }}
                  </span>
                </div>

                <!-- ปุ่มลบรายการ (เปิด Modal ยืนยัน) -->
                <button
                  type="button"
                  @click="openDeleteActivityModal(item)"
                  class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-rose-500 hover:text-white hover:bg-rose-500 border border-rose-500/20 transition cursor-pointer shrink-0"
                  :title="$t('checkin.myActivities.deleteBtn')"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>{{ $t('checkin.myActivities.deleteBtn') }}</span>
                </button>
              </div>

              <h3 :class="['font-bold text-sm sm:text-base mb-1.5', isDarkMode ? 'text-white' : 'text-slate-800']">
                {{ locale === 'en' ? (item.nameEn || item.nameTh) : (item.nameTh || item.nameEn) }}
              </h3>

              <p :class="['text-xs leading-relaxed', isDarkMode ? 'text-slate-300' : 'text-slate-600']">
                {{ locale === 'en' ? (item.howToEn || item.howToTh) : (item.howToTh || item.howToEn) }}
              </p>
            </div>

            <div class="space-y-3 pt-3 border-t" :class="isDarkMode ? 'border-slate-700/60' : 'border-slate-200/70'">
              <div v-if="item.source?.url" class="flex items-center justify-between gap-2 text-[11px]">
                <a
                  :href="item.source.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[#0D9488] hover:underline font-medium inline-flex items-center gap-1 truncate"
                >
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span class="truncate">{{ locale === 'en' ? (item.source.en || item.source.th) : (item.source.th || item.source.en) }}</span>
                </a>
              </div>

              <!-- ปุ่มติ๊ก "วันนี้ทำแล้ว" -->
              <button
                type="button"
                :disabled="Boolean(togglingActivityMap[item.id])"
                @click="toggleActivityLogToday(item)"
                :class="[
                  'w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                  item.loggedToday
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    : (isDarkMode ? 'bg-slate-700 hover:bg-[#0D9488] text-white border border-slate-600' : 'bg-white hover:bg-[#0D9488] text-[#045F54] hover:text-white border border-[#0D9488]')
                ]"
              >
                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path v-if="item.loggedToday" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  <circle v-else cx="12" cy="12" r="8" stroke-width="2" />
                </svg>
                <span>{{ item.loggedToday ? $t('checkin.myActivities.checkedTodayBtn') : $t('checkin.myActivities.checkTodayBtn') }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ส่วนแสดงประวัติกิจกรรมเมื่อกด "ดูประวัติ" -->
        <div
          v-if="showActivityHistory"
          class="mt-6 pt-5 border-t space-y-3"
          :class="isDarkMode ? 'border-slate-700/60' : 'border-slate-200/80'"
        >
          <h3 :class="['text-sm font-bold flex items-center gap-2', isDarkMode ? 'text-slate-200' : 'text-slate-700']">
            <svg class="w-4 h-4 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ $t('checkin.myActivities.historyTitle') }}</span>
          </h3>

          <div v-if="isLoadingActivityHistory" class="py-4 text-xs text-slate-400 text-center">
            {{ $t('checkin.myActivities.historyLoading') }}
          </div>

          <div v-else-if="activityHistoryLoadError" class="py-4 text-xs text-rose-500 text-center">
            {{ $t('checkin.myActivities.loadError') }}
          </div>

          <div v-else-if="myActivityHistory.length === 0" class="py-4 text-xs text-slate-400 text-center">
            {{ $t('checkin.myActivities.historyEmpty') }}
          </div>

          <div v-else class="space-y-2.5">
            <div
              v-for="hItem in myActivityHistory"
              :key="hItem.id"
              :class="[
                'rounded-xl p-3.5 border flex flex-col sm:flex-row sm:items-center justify-between gap-2',
                isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50/70 border-slate-200/70'
              ]"
            >
              <div class="min-w-0">
                <p :class="['text-xs sm:text-sm font-bold truncate', isDarkMode ? 'text-slate-200' : 'text-slate-800']">
                  {{ locale === 'en' ? (hItem.nameEn || hItem.nameTh) : (hItem.nameTh || hItem.nameEn) }}
                </p>
                <p class="text-[11px] text-slate-400 mt-0.5">
                  {{ formatActivityRange(hItem.assignedAt, hItem.expiresAt) }}
                </p>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488]">
                  {{ $t('checkin.myActivities.completedDays', { n: hItem.completedDaysCount || 0 }) }}
                </span>
                <span
                  class="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  :class="hItem.deletedAt ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'"
                >
                  {{ hItem.deletedAt ? $t('checkin.myActivities.statusDeleted') : $t('checkin.myActivities.statusExpired') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== STEP 5 : 2.5 คำแนะนำดึงจากรายการกิจกรรม (ACTIVITIES) ==================== -->
      <section :class="['rounded-3xl border p-6 md:p-8 shadow-sm transition-all', isDarkMode ? 'bg-[#1E293B] border-slate-700/60' : 'bg-white border-slate-100']">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 :class="['font-extrabold text-lg flex items-center gap-2 mb-1', isDarkMode ? 'text-white' : 'text-slate-800']">
              <svg class="w-5 h-5 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              {{ $t('checkin.recTitle') }}
            </h2>
            <p :class="['text-xs', isDarkMode ? 'text-slate-400' : 'text-slate-500']">
              {{ $t('checkin.recByMood') }}
            </p>
          </div>
          <span class="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] self-start sm:self-auto">
            WHO & กรมสุขภาพจิต
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="act in currentRecommendations"
            :key="act.key"
            :class="[
              'rounded-2xl p-5 border transition-all duration-300 hover:shadow-md flex flex-col justify-between group',
              isDarkMode ? 'bg-slate-800/40 border-slate-700/60 hover:border-[#0D9488]/40' : 'bg-[#FAFDFA] border-slate-100 hover:border-[#0D9488]/30'
            ]"
          >
            <div>
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-[#0D9488]/10 text-[#0D9488] group-hover:scale-105 transition-transform">
                <!-- Breathing / Body relaxation -->
                <svg v-if="act.key === 'deep_breathing' || act.key === 'progressive_muscle_relaxation'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <!-- Kindness / Self-compassion -->
                <svg v-else-if="act.key === 'being_kind_self' || act.key === 'being_kind_others' || act.key === 'making_room_feelings'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <!-- Mindfulness / Grounding / Meditation -->
                <svg v-else-if="act.key === 'grounding_5senses' || act.key === 'short_meditation' || act.key === 'unhooking_notice_thought'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/><path d="m4.93 4.93 1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2"/>
                </svg>
                <!-- Sleep / Wind down -->
                <svg v-else-if="act.key === 'wind_down_before_sleep'" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
                <!-- Default Activity Sparkle / Action -->
                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>

              <h3 :class="['font-bold text-sm mb-1.5', isDarkMode ? 'text-white' : 'text-slate-800']">
                {{ locale === 'en' ? act.nameEn : act.nameTh }}
              </h3>
              <p :class="['text-xs leading-relaxed', isDarkMode ? 'text-slate-300' : 'text-slate-600']">
                {{ locale === 'en' ? act.howToEn : act.howToTh }}
              </p>
            </div>

            <div class="mt-4 pt-3 border-t flex items-center justify-between gap-2" :class="isDarkMode ? 'border-slate-700/60' : 'border-slate-100'">
              <span class="text-[10px] text-slate-400 truncate" :title="locale === 'en' ? act.source?.en : act.source?.th">
                {{ locale === 'en' ? act.source?.en : act.source?.th }}
              </span>
              <a
                v-if="act.source?.url"
                :href="act.source.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-bold text-[#0D9488] hover:underline inline-flex items-center gap-1 shrink-0"
              >
                {{ $t('checkin.tryIt') }}
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- ========== Toast Notification (SVG Icon, No Emoji) ========== -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#0D9488] text-white px-5 py-3.5 rounded-2xl shadow-2xl min-w-[280px] max-w-md border border-white/20"
      >
        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p class="font-bold text-sm">{{ toastTitle }}</p>
          <p class="text-xs text-[#D1FAE5]">{{ toastMsg }}</p>
        </div>
      </div>
    </Transition>

    <!-- ========== Single Delete Confirmation Modal ========== -->
    <Transition name="fade">
      <div v-if="entryToDelete" class="fixed inset-0 z-[300] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div :class="['w-full max-w-sm rounded-2xl p-6 shadow-2xl border', isDarkMode ? 'bg-[#1E293B] border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-800']">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="font-extrabold text-base text-center mb-1">ลบประวัติการเช็คอิน</h3>
          <p class="text-xs text-center text-slate-400 mb-6">
            {{ $t('checkin.confirmDelete') }} ({{ formatHistoryDate(entryToDelete.dateKey || entryToDelete.savedAt) }})
          </p>
          <div class="flex gap-2">
            <button
              type="button"
              @click="entryToDelete = null"
              :class="['flex-1 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer', isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600']"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              @click="executeDelete"
              class="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition cursor-pointer"
            >
              ยืนยันการลบ
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ========== Clear All History Confirmation Modal ========== -->
    <Transition name="fade">
      <div v-if="showClearAllModal" class="fixed inset-0 z-[300] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div :class="['w-full max-w-sm rounded-2xl p-6 shadow-2xl border', isDarkMode ? 'bg-[#1E293B] border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-800']">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="font-extrabold text-base text-center mb-1">{{ $t('checkin.clearAllHistory') }}</h3>
          <p class="text-xs text-center text-slate-400 mb-6">
            {{ $t('checkin.confirmClearAll') }}
          </p>
          <div class="flex gap-2">
            <button
              type="button"
              @click="showClearAllModal = false"
              :class="['flex-1 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer', isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600']"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              @click="executeClearAll"
              class="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition cursor-pointer"
            >
              ยืนยันการลบทั้งหมด
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ========== Delete UserActivity Confirmation Modal ========== -->
    <Transition name="fade">
      <div v-if="activityToDelete" class="fixed inset-0 z-[300] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div :class="['w-full max-w-sm rounded-2xl p-6 shadow-2xl border', isDarkMode ? 'bg-[#1E293B] border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-800']">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="font-extrabold text-base text-center mb-1">{{ $t('checkin.myActivities.deleteModalTitle') }}</h3>
          <p class="text-xs text-center text-slate-400 mb-6">
            {{ $t('checkin.myActivities.deleteModalBody') }}
          </p>
          <div class="flex gap-2">
            <button
              type="button"
              :disabled="isDeletingActivity"
              @click="activityToDelete = null"
              :class="['flex-1 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer disabled:opacity-50', isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-600']"
            >
              {{ $t('checkin.myActivities.deleteModalCancel') }}
            </button>
            <button
              type="button"
              :disabled="isDeletingActivity"
              @click="executeDeleteActivity"
              class="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition cursor-pointer disabled:opacity-50"
            >
              {{ $t('checkin.myActivities.deleteModalConfirm') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ========== Footer (SVG Icons Instead of Emojis) ========== -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <div class="flex items-center gap-1.5 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">{{ $t('common.brand') }}</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">{{ $t('common.footerDesc') }}</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerServices') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><router-link to="/daily-checkin" class="hover:underline">{{ $t('common.footerCheckin') }}</router-link></li>
            <li><router-link to="/activity-tracker" class="hover:underline">{{ $t('common.footerActivity') }}</router-link></li>
            <li><router-link to="/blog" class="hover:underline">{{ $t('common.footerBlog') }}</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerContact') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>02-XXX-XXXX</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>PhuenJaiZone@Domain.com</span>
            </li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">{{ $t('common.footerHotline') }}</router-link>
          <p class="text-xs text-[#D1FAE5]">{{ $t('common.hotlineText') }}</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">{{ $t('common.copyright') }}</div>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import axios from '../api/axios'
import ProfileMenu from '../components/ProfileMenu.vue'
import AdminNavLink from '../components/AdminNavLink.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { useAuthStore } from '../stores/authStore'

const { t, locale } = useI18n()
const router = useRouter()
const isDarkMode = inject('isDarkMode', ref(false))
const authStore = useAuthStore()

// ==================== Mood Options (1-5, Pure SVG Icons) ====================
const moodOptions = computed(() => [
  { id: 5, score: 5, label: t('checkin.mood5'), color: '#059669', iconBg: '#ECFDF5', activeClass: 'bg-emerald-50/60' },
  { id: 4, score: 4, label: t('checkin.mood4'), color: '#0D9488', iconBg: '#F0FDFA', activeClass: 'bg-teal-50/60' },
  { id: 3, score: 3, label: t('checkin.mood3'), color: '#D97706', iconBg: '#FFFBEB', activeClass: 'bg-amber-50/60' },
  { id: 2, score: 2, label: t('checkin.mood2'), color: '#EA580C', iconBg: '#FFF7ED', activeClass: 'bg-orange-50/60' },
  { id: 1, score: 1, label: t('checkin.mood1'), color: '#E11D48', iconBg: '#FFF1F2', activeClass: 'bg-rose-50/60' },
])

const getMoodLabel = (scoreOrId) => {
  const id = Number(scoreOrId)
  if (id >= 1 && id <= 5) return t('checkin.mood' + id)
  return ''
}

const getMoodIconBg = (score) => {
  if (score >= 5) return '#ECFDF5'
  if (score === 4) return '#F0FDFA'
  if (score === 3) return '#FFFBEB'
  if (score === 2) return '#FFF7ED'
  return '#FFF1F2'
}

// ==================== Metric Sliders (1-10) + 2.4 คำอธิบายใต้แถบความเครียด ====================
const moodMetrics = ref([
  { id: 'energy', value: 6 },
  { id: 'stress', value: 4 },
  { id: 'social', value: 6 },
])

function stressDynamicText(val) {
  const v = Number(val) || 1
  if (v <= 3) return t('checkin.metrics.stressLevelLow')
  if (v <= 6) return t('checkin.metrics.stressLevelMid')
  if (v <= 8) return t('checkin.metrics.stressLevelHigh')
  return t('checkin.metrics.stressLevelCritical')
}

function stressLevelColorClass(val) {
  const v = Number(val) || 1
  if (v <= 3) return 'text-emerald-600 dark:text-emerald-400'
  if (v <= 6) return 'text-amber-600 dark:text-amber-400'
  if (v <= 8) return 'text-orange-600 dark:text-orange-400'
  return 'text-rose-600 dark:text-rose-400'
}

// ==================== Activity Tags (No Emojis) ====================
const tagKeyList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const activityTagList = computed(() => tagKeyList.map(k => ({ key: k, label: t('checkin.tags.' + k) })))

function getTagLabel(tag) {
  if (tagKeyList.includes(String(tag))) {
    return t('checkin.tags.' + tag)
  }
  return tag
}

// ==================== 2.5 คลังรายการกิจกรรมแนะนำ (ซิงค์กับ backend/src/data/activities.ts) ====================
const WHO_DWM = {
  th: 'WHO: Doing What Matters in Times of Stress (2020)',
  en: 'WHO: Doing What Matters in Times of Stress (2020)',
  url: 'https://www.who.int/publications/i/item/9789240003927',
}
const DMH_THAILAND = {
  th: 'กรมสุขภาพจิต กระทรวงสาธารณสุข — องค์ความรู้สุขภาพจิตสำหรับประชาชน',
  en: 'Thailand Department of Mental Health — public mental health knowledge resources',
  url: 'https://dmh.go.th',
}

const DEFAULT_ACTIVITIES = [
  {
    key: 'grounding_5senses',
    nameTh: 'หยั่งรากกับปัจจุบัน (Grounding)',
    nameEn: 'Grounding in the present moment',
    howToTh: 'เมื่อรู้สึกฟุ้งหรือจมกับความคิด ลองหยุดสักครู่แล้วสังเกตสิ่งที่เห็น ได้ยิน และรู้สึกได้ที่ตัวรอบตัวตอนนี้ อย่างละ 2-3 อย่าง เพื่อพาใจกลับมาอยู่กับปัจจุบัน',
    howToEn: 'When thoughts feel overwhelming, pause and notice a few things you can see, hear, and feel right now to bring your attention back to the present moment.',
    source: WHO_DWM,
    suggestedLevels: ['HIGH', 'VERY_HIGH', 'POOR'],
  },
  {
    key: 'unhooking_notice_thought',
    nameTh: 'ปลดเกี่ยวความคิด (Unhooking)',
    nameEn: 'Unhooking from difficult thoughts',
    howToTh: 'เมื่อมีความคิดลบวนซ้ำ ลองบอกตัวเองเบา ๆ ว่า "นี่คือความคิดหนึ่ง ไม่ใช่ความจริงทั้งหมด" แล้วปล่อยให้มันผ่านไปโดยไม่ต้องเถียงหรือเชื่อตามทันที',
    howToEn: 'When a troubling thought loops, gently remind yourself "this is just a thought, not the whole truth," and let it pass without arguing with it or buying into it right away.',
    source: WHO_DWM,
    suggestedLevels: ['MODERATE', 'HIGH', 'VERY_HIGH', 'POOR'],
  },
  {
    key: 'values_small_step',
    nameTh: 'ลงมือทำตามสิ่งที่ให้ความหมาย (Acting on your values)',
    nameEn: 'Acting on your values',
    howToTh: 'เลือกสิ่งเล็ก ๆ หนึ่งอย่างที่ตรงกับสิ่งที่คุณให้ความสำคัญในชีวิต (เช่น การเรียน ความสัมพันธ์ สุขภาพ) แล้วลงมือทำแค่ขั้นแรกเล็ก ๆ วันนี้',
    howToEn: 'Pick one thing that matters to you (studies, relationships, health) and take just one small first step toward it today.',
    source: WHO_DWM,
    suggestedLevels: ['LOW', 'MODERATE', 'GOOD'],
  },
  {
    key: 'making_room_feelings',
    nameTh: 'เปิดที่ว่างให้ความรู้สึก (Making room)',
    nameEn: 'Making room for difficult feelings',
    howToTh: 'ลองสังเกตความรู้สึกที่เกิดขึ้นตรง ๆ โดยไม่ต้องรีบผลักออกหรือเก็บกด แค่หายใจและบอกกับตัวเองว่ารู้สึกแบบนี้อยู่ได้ชั่วคราว',
    howToEn: 'Notice the feeling that is showing up without rushing to push it away or suppress it — just breathe and let yourself know it is okay to feel this way for a while.',
    source: WHO_DWM,
    suggestedLevels: ['MODERATE', 'HIGH', 'VERY_HIGH', 'POOR'],
  },
  {
    key: 'engaging_fully',
    nameTh: 'ทำสิ่งที่ทำอยู่อย่างเต็มที่ (Engaging)',
    nameEn: 'Engaging fully in what you are doing',
    howToTh: 'เลือกกิจกรรมหนึ่งอย่างที่ทำอยู่แล้ววันนี้ (กินข้าว เดิน อาบน้ำ) แล้วลองใส่ใจกับทุกขั้นตอนของมันอย่างเต็มที่ ไม่เร่งรีบหรือทำสองอย่างพร้อมกัน',
    howToEn: 'Pick one thing you are already doing today (eating, walking, showering) and give it your full attention, step by step, without rushing or multitasking.',
    source: WHO_DWM,
    suggestedLevels: ['LOW', 'MODERATE', 'GOOD'],
  },
  {
    key: 'being_kind_self',
    nameTh: 'ใจดีกับตัวเอง (Being kind)',
    nameEn: 'Being kind to yourself',
    howToTh: 'ลองพูดกับตัวเองในคำที่คุณจะพูดกับเพื่อนที่กำลังลำบาก แทนคำตำหนิตัวเอง และทำสิ่งเล็ก ๆ หนึ่งอย่างที่ดูแลตัวเองวันนี้',
    howToEn: 'Try talking to yourself the way you would talk to a friend who is struggling, instead of self-criticism, and do one small thing today that takes care of yourself.',
    source: WHO_DWM,
    suggestedLevels: ['MODERATE', 'HIGH', 'VERY_HIGH', 'POOR'],
  },
  {
    key: 'being_kind_others',
    nameTh: 'ใจดีกับคนรอบตัว (Being kind to others)',
    nameEn: 'Being kind to someone around you',
    howToTh: 'ลองทำสิ่งเล็ก ๆ ที่ใจดีให้คนรอบตัวหนึ่งคนวันนี้ เช่น ทักทาย ขอบคุณ หรือถามว่าเขาเป็นอย่างไร',
    howToEn: 'Do one small kind thing for someone around you today — a greeting, a thank-you, or simply asking how they are doing.',
    source: WHO_DWM,
    suggestedLevels: ['LOW', 'MODERATE', 'GOOD'],
  },
  {
    key: 'deep_breathing',
    nameTh: 'ฝึกหายใจเข้าออกลึก ๆ',
    nameEn: 'Slow, deep breathing',
    howToTh: 'หาที่นั่งสบาย หายใจเข้าทางจมูกช้า ๆ นับ 1-4 แล้วหายใจออกทางปากช้า ๆ นับ 1-4 ทำซ้ำสัก 5-10 รอบ',
    howToEn: 'Sit comfortably, breathe in slowly through your nose for a count of 4, then breathe out slowly through your mouth for a count of 4. Repeat for 5–10 rounds.',
    source: DMH_THAILAND,
    suggestedLevels: ['HIGH', 'VERY_HIGH', 'POOR'],
  },
  {
    key: 'progressive_muscle_relaxation',
    nameTh: 'ผ่อนคลายกล้ามเนื้อทีละส่วน',
    nameEn: 'Progressive muscle relaxation',
    howToTh: 'เกร็งกล้ามเนื้อส่วนใดส่วนหนึ่ง (เช่น มือ หรือไหล่) ไว้สัก 3-5 วินาที แล้วค่อย ๆ ผ่อนคลายช้า ๆ สัก 10-15 วินาที ทำสลับไปตามส่วนต่าง ๆ ของร่างกาย',
    howToEn: 'Tense one muscle group (like your hands or shoulders) for 3–5 seconds, then slowly release and relax for 10–15 seconds. Repeat for a few muscle groups.',
    source: DMH_THAILAND,
    suggestedLevels: ['HIGH', 'VERY_HIGH', 'POOR'],
  },
  {
    key: 'short_meditation',
    nameTh: 'นั่งสมาธิสั้น ๆ',
    nameEn: 'A short sitting meditation',
    howToTh: 'นั่งในที่เงียบสบาย หลับตา จดจ่อกับลมหายใจตัวเองสัก 3-5 นาที เมื่อมีความคิดแวบเข้ามาก็แค่สังเกตแล้วพากลับมาที่ลมหายใจ',
    howToEn: 'Sit somewhere quiet, close your eyes, and focus on your breath for 3–5 minutes. When a thought pops in, simply notice it and bring your attention back to your breath.',
    source: DMH_THAILAND,
    suggestedLevels: ['MODERATE', 'HIGH', 'VERY_HIGH', 'POOR'],
  },
  {
    key: 'enjoyable_activity',
    nameTh: 'ทำกิจกรรมที่ชอบสักนิด',
    nameEn: 'Do a small activity you enjoy',
    howToTh: 'เลือกกิจกรรมเล็ก ๆ ที่คุณชอบและทำได้ตอนนี้ เช่น ฟังเพลง วาดรูป เดินเล่น หรือทำอาหารง่าย ๆ ให้เวลากับมันสัก 10-15 นาที',
    howToEn: 'Pick a small activity you enjoy and can do right now — listening to music, drawing, taking a walk, or cooking something simple — and spend 10–15 minutes on it.',
    source: DMH_THAILAND,
    suggestedLevels: ['LOW', 'MODERATE', 'GOOD'],
  },
  {
    key: 'tidy_small_space',
    nameTh: 'จัดพื้นที่รอบตัวให้น่าอยู่ขึ้นนิดหนึ่ง',
    nameEn: 'Tidy up a small space around you',
    howToTh: 'เลือกมุมเล็ก ๆ ที่คุณใช้บ่อย (โต๊ะเรียน เตียง) จัดให้เป็นระเบียบสักเล็กน้อยภายใน 10 นาที',
    howToEn: 'Pick one small space you use often (a desk, your bed) and tidy it up a little within 10 minutes.',
    source: DMH_THAILAND,
    suggestedLevels: ['LOW', 'MODERATE', 'GOOD'],
  },
  {
    key: 'wind_down_before_sleep',
    nameTh: 'ผ่อนคลายก่อนเข้านอน',
    nameEn: 'Wind down before bedtime',
    howToTh: 'ก่อนนอนสัก 15-20 นาที ลองงดดูหน้าจอมือถือ หายใจลึก ๆ 2-3 รอบ หรือฟังเสียงเบา ๆ ที่ช่วยให้สงบ',
    howToEn: 'About 15–20 minutes before bed, try stepping away from screens, take a few slow deep breaths, or listen to calming, quiet sound.',
    source: DMH_THAILAND,
    suggestedLevels: ['MODERATE', 'HIGH', 'VERY_HIGH', 'POOR'],
  },
]

const activitiesCatalog = ref([...DEFAULT_ACTIVITIES])

// ==================== State ====================
const selectedMoodId    = ref(4)
const selectedMood      = computed(() => moodOptions.value.find(m => m.id === selectedMoodId.value) || moodOptions.value[1])
const noteText          = ref('')
const selectedTags      = ref([])
const checkinHistory    = ref([])
const todayCheckin      = ref(null)
const showAllHistory    = ref(false)
const selectedDays      = ref(7)
const isSaving          = ref(false)
const entryToDelete     = ref(null)
const showClearAllModal = ref(false)

// "สิ่งเล็ก ๆ ที่ลองทำ" (UserActivity) State
const myActivities             = ref([])
const myActivitiesToday        = ref('')
const myActivitiesLoadError    = ref(false)
const showActivityHistory      = ref(false)
const myActivityHistory        = ref([])
const isLoadingActivityHistory = ref(false)
const activityHistoryLoadError = ref(false)
const togglingActivityMap      = ref({})
const activityToDelete         = ref(null)
const isDeletingActivity       = ref(false)

function getRemainingDays(expiresAt) {
  if (!expiresAt) return 0
  const diffMs = new Date(expiresAt).getTime() - Date.now()
  return Math.max(1, Math.ceil(diffMs / (24 * 60 * 60 * 1000)))
}

function formatActivityRange(assignedAt, expiresAt) {
  const loc = locale.value === 'en' ? 'en-US' : 'th-TH'
  const fmt = (d) => {
    if (!d) return ''
    const dt = new Date(d)
    if (isNaN(dt.getTime())) return ''
    return dt.toLocaleDateString(loc, { day: 'numeric', month: 'short', year: 'numeric' })
  }
  return `${fmt(assignedAt)} – ${fmt(expiresAt)}`
}

async function toggleActivityLogToday(item) {
  if (!item || togglingActivityMap.value[item.id]) return
  togglingActivityMap.value = { ...togglingActivityMap.value, [item.id]: true }
  try {
    if (!item.loggedToday) {
      const res = await axios.post(`/api/activities/${item.id}/log`)
      item.loggedToday = true
      if (!res.data?.alreadyLogged) {
        item.completedDaysCount = (item.completedDaysCount || 0) + 1
      }
    } else {
      const res = await axios.delete(`/api/activities/${item.id}/log/today`)
      item.loggedToday = false
      const dec = res.data?.deletedCount ?? 1
      item.completedDaysCount = Math.max(0, (item.completedDaysCount || 1) - dec)
    }
  } catch (err) {
    console.error('Toggle activity log error:', err)
  } finally {
    togglingActivityMap.value = { ...togglingActivityMap.value, [item.id]: false }
  }
}

function openDeleteActivityModal(item) {
  activityToDelete.value = item
}

async function executeDeleteActivity() {
  const target = activityToDelete.value
  if (!target || isDeletingActivity.value) return
  isDeletingActivity.value = true
  try {
    await axios.delete(`/api/activities/${target.id}`)
    myActivities.value = myActivities.value.filter(a => a.id !== target.id)
    activityToDelete.value = null
    if (showActivityHistory.value) {
      await loadActivityHistory()
    }
  } catch (err) {
    console.error('Delete user activity error:', err)
  } finally {
    isDeletingActivity.value = false
  }
}

async function loadActivityHistory() {
  isLoadingActivityHistory.value = true
  activityHistoryLoadError.value = false
  try {
    const res = await axios.get('/api/activities/history')
    myActivityHistory.value = Array.isArray(res.data?.activities) ? res.data.activities : []
  } catch (err) {
    console.warn('Failed to load activity history:', err?.message || err)
    activityHistoryLoadError.value = true
  } finally {
    isLoadingActivityHistory.value = false
  }
}

async function toggleActivityHistory() {
  showActivityHistory.value = !showActivityHistory.value
  if (showActivityHistory.value) {
    await loadActivityHistory()
  }
}

// Toast state
const showToast  = ref(false)
const toastTitle = ref('')
const toastMsg   = ref('')
let toastTimer   = null

// ==================== Dates ====================
const getTodayKey = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const todayKey = computed(() => getTodayKey())

const todayFullDate = computed(() => {
  const loc = locale.value === 'en' ? 'en-US' : 'th-TH'
  return new Date().toLocaleDateString(loc, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

const todayShortDate = computed(() => {
  const loc = locale.value === 'en' ? 'en-US' : 'th-TH'
  return new Date().toLocaleDateString(loc, { month: 'short', day: 'numeric', year: 'numeric' })
})

function formatHistoryDate(dateInput) {
  if (!dateInput) return ''
  const d = new Date(dateInput)
  if (isNaN(d.getTime())) return String(dateInput)
  const loc = locale.value === 'en' ? 'en-US' : 'th-TH'
  return d.toLocaleDateString(loc, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

// ==================== Contextual Comfort Message ====================
const moodComfortMessage = computed(() => {
  const score = selectedMood.value?.score ?? 4
  if (score === 5) return 'ยินดีด้วยกับวันที่สดใสของคุณ! การบันทึกความสุขในวันนี้จะกลายเป็นพลังบวกในวันข้างหน้า'
  if (score === 4) return 'เป็นวันที่น่าพึงพอใจและราบรื่น ขอให้คุณมีความสุขกับช่วงเวลาสบายใจนี้'
  if (score === 3) return 'วันธรรมดาๆ ที่เรื่อยๆ สบายๆ เป็นส่วนหนึ่งของจังหวะชีวิตที่ดี ยินดีที่คุณได้สำรวจใจตัวเอง'
  if (score === 2) return 'วันที่อาจมีเรื่องเหนื่อยล้าหรือกังวล PhuenJaiZone ขอส่งกำลังใจให้คุณ ค่อยๆ ผ่อนคลายนะ'
  return 'หากวันนี้รู้สึกแย่หรือหนักหนา ไม่เป็นไรเลยที่จะยอมรับความรู้สึกนี้ ลองพักสักครู่และดูแลตนเองนะ'
})

// ==================== Stats Calculation ====================
const summaryStats = computed(() => {
  const streak = computeStreak()
  const total = checkinHistory.value.length
  const avg = total > 0
    ? (checkinHistory.value.reduce((s, e) => s + (Number(e.score) || 3), 0) / total).toFixed(1)
    : '—'

  let topMoodLabel = '—'
  if (total > 0) {
    const counts = {}
    checkinHistory.value.forEach(e => {
      const sc = Number(e.score) || 3
      counts[sc] = (counts[sc] || 0) + 1
    })
    const bestScore = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, 4)
    topMoodLabel = getMoodLabel(bestScore)
  }

  return [
    { key: 'streak', value: streak, label: t('checkin.stats.streak'), color: '#D97706', bgColor: '#FEF3C7' },
    { key: 'total', value: total, label: t('checkin.stats.total'), color: '#0D9488', bgColor: '#CCFBF1' },
    { key: 'avg', value: avg, label: t('checkin.stats.avg'), color: '#7C3AED', bgColor: '#EDE9FE' },
    { key: 'topMood', value: topMoodLabel, label: t('checkin.stats.topMood'), color: '#059669', bgColor: '#D1FAE5' },
  ]
})

function computeStreak() {
  if (!checkinHistory.value.length) return 0
  let streak = 0
  const d = new Date()

  const formatYMD = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  for (let i = 0; i < 365; i++) {
    const ymd = formatYMD(d)
    const match = checkinHistory.value.find(e => e.dateKey === ymd)
    if (match) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      if (i === 0) {
        d.setDate(d.getDate() - 1)
        continue
      }
      break
    }
  }
  return streak
}

// ==================== Chart Data ====================
const chartData = computed(() => {
  const days = selectedDays.value
  const loc = locale.value === 'en' ? 'en-US' : 'th-TH'
  const result = []

  const formatYMD = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const ymd = formatYMD(d)

    const entry = checkinHistory.value.find(e => e.dateKey === ymd)
    const shortDay = d.toLocaleDateString(loc, { weekday: 'short' })
    const isToday = i === 0

    result.push({
      label: isToday ? t('checkin.today') : shortDay,
      score: entry ? Number(entry.score) : 0,
      isToday,
      dateString: ymd,
    })
  }
  return result
})

const moodLegend = computed(() => [
  { score: 5, label: t('checkin.mood5'), color: '#059669' },
  { score: 4, label: t('checkin.mood4'), color: '#0D9488' },
  { score: 3, label: t('checkin.mood3'), color: '#D97706' },
  { score: 2, label: t('checkin.mood2'), color: '#EA580C' },
  { score: 1, label: t('checkin.mood1'), color: '#E11D48' },
])

function moodBarColor(score) {
  const sc = Number(score)
  if (sc >= 5) return '#059669'
  if (sc === 4) return '#0D9488'
  if (sc === 3) return '#D97706'
  if (sc === 2) return '#EA580C'
  return '#E11D48'
}

// ==================== 2.5 ดึงคำแนะนำจากรายการกิจกรรมตามอารมณ์และความเครียด ====================
const currentRecommendations = computed(() => {
  const list = activitiesCatalog.value.length ? activitiesCatalog.value : DEFAULT_ACTIVITIES
  const moodScore = selectedMood.value?.score ?? 4
  const stressVal = Number(moodMetrics.value.find(m => m.id === 'stress')?.value ?? 4)

  // จับคู่ระดับคะแนนตามเกณฑ์ใน activities.ts
  let targetLevel = 'GOOD'
  if (moodScore <= 2 || stressVal >= 8) {
    targetLevel = 'VERY_HIGH'
  } else if (moodScore === 3 || stressVal >= 5) {
    targetLevel = 'MODERATE'
  } else {
    targetLevel = 'LOW'
  }

  const matched = list.filter(a => Array.isArray(a.suggestedLevels) && a.suggestedLevels.includes(targetLevel))
  return (matched.length >= 3 ? matched : list).slice(0, 3)
})

// ==================== Visible History ====================
const visibleHistory = computed(() => {
  if (showAllHistory.value) return checkinHistory.value
  return checkinHistory.value.slice(0, 5)
})

// ==================== Form Actions ====================
function selectMood(mood) {
  selectedMoodId.value = mood.id
  const base = mood.score >= 4 ? 7 : mood.score === 3 ? 5 : 3
  moodMetrics.value[0].value = base      // energy
  moodMetrics.value[1].value = 11 - base // stress
  moodMetrics.value[2].value = base      // social
}

function toggleTag(tagKey) {
  if (selectedTags.value.includes(tagKey)) {
    selectedTags.value = selectedTags.value.filter(k => k !== tagKey)
  } else {
    selectedTags.value.push(tagKey)
  }
}

function scrollToForm() {
  window.scrollTo({ top: 120, behavior: 'smooth' })
}

// ==================== 2.1 บันทึกลงฐานข้อมูลเท่านั้น (บังคับล็อกอิน) ====================
async function saveCheckin() {
  if (!authStore.isAuthenticated) {
    router.replace('/login')
    return
  }
  if (isSaving.value) return
  isSaving.value = true

  const currentMood = selectedMood.value || moodOptions.value[1]
  const currentKey = todayKey.value
  const isUpdate = !!todayCheckin.value

  const payload = {
    dateKey: currentKey,
    moodScore: currentMood.score,
    moodLabel: currentMood.label,
    energy: Number(moodMetrics.value.find(m => m.id === 'energy')?.value ?? 5),
    stress: Number(moodMetrics.value.find(m => m.id === 'stress')?.value ?? 5),
    social: Number(moodMetrics.value.find(m => m.id === 'social')?.value ?? 5),
    note: noteText.value.trim(),
    tags: [...selectedTags.value],
  }

  try {
    const res = await axios.post('/api/checkin', payload)
    const saved = res.data?.checkin
    if (saved) {
      checkinHistory.value = checkinHistory.value.filter(e => e.dateKey !== currentKey && e.id !== saved.id)
      checkinHistory.value.unshift(saved)
      todayCheckin.value = saved
    }
    triggerToast(
      isUpdate ? t('checkin.toastUpdated') : t('checkin.toastSaved'),
      t('checkin.toastMood', { mood: `${currentMood.label} (${currentMood.score}/5)` })
    )
  } catch (err) {
    console.error('Save checkin error:', err)
    if (err.response?.status === 401 || err.response?.status === 403) {
      router.replace('/login')
      return
    }
    triggerToast('บันทึกไม่สำเร็จ', err.response?.data?.error || 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้ กรุณาลองอีกครั้ง')
  } finally {
    isSaving.value = false
  }
}

// ==================== 2.2 ลบประวัติ (รายรายการ และ ลบทั้งหมด) ====================
function confirmDeleteEntry(entry) {
  entryToDelete.value = entry
}

async function executeDelete() {
  const entry = entryToDelete.value
  if (!entry) return

  try {
    if (entry.id) {
      await axios.delete(`/api/checkin/${entry.id}`)
    }
    checkinHistory.value = checkinHistory.value.filter(e => e.id !== entry.id && e.dateKey !== entry.dateKey)
    if (todayCheckin.value && (todayCheckin.value.id === entry.id || todayCheckin.value.dateKey === entry.dateKey)) {
      todayCheckin.value = null
    }
    entryToDelete.value = null
    triggerToast(t('checkin.deleteSuccess'), 'นำรายการเช็คอินออกจากฐานข้อมูลเรียบร้อยแล้ว')
  } catch (err) {
    console.error('Delete checkin error:', err)
    triggerToast('ลบไม่สำเร็จ', err.response?.data?.error || 'เกิดข้อผิดพลาดในการลบข้อมูล')
  }
}

async function executeClearAll() {
  try {
    await axios.delete('/api/checkin')
    checkinHistory.value = []
    todayCheckin.value = null
    showClearAllModal.value = false
    triggerToast(t('checkin.deleteSuccess'), 'ล้างประวัติการเช็คอินทั้งหมดเรียบร้อยแล้ว')
  } catch (err) {
    console.error('Clear all checkin history error:', err)
    triggerToast('ลบไม่สำเร็จ', err.response?.data?.error || 'เกิดข้อผิดพลาดในการลบประวัติทั้งหมด')
  }
}

// ==================== Toast Handler ====================
function triggerToast(title, msg) {
  if (toastTimer) clearTimeout(toastTimer)
  toastTitle.value = title
  toastMsg.value = msg
  showToast.value = true
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 3500)
}

// ==================== Load Data from Database API ====================
async function loadData() {
  if (!authStore.isAuthenticated) {
    router.replace('/login')
    return
  }

  try {
    const [historyRes, actRes, myActRes] = await Promise.all([
      axios.get('/api/checkin/history'),
      axios.get('/api/checkin/activities').catch(() => null),
      axios.get('/api/activities/active').catch(() => null),
    ])

    if (Array.isArray(actRes?.data?.activities) && actRes.data.activities.length > 0) {
      activitiesCatalog.value = actRes.data.activities
    }

    if (myActRes && Array.isArray(myActRes.data?.activities)) {
      myActivities.value = myActRes.data.activities
      myActivitiesToday.value = myActRes.data.today || todayKey.value
      myActivitiesLoadError.value = false
    } else {
      myActivitiesLoadError.value = true
    }

    checkinHistory.value = Array.isArray(historyRes.data?.history) ? historyRes.data.history : []
    syncTodayCheckinFromHistory()
  } catch (err) {
    console.warn('Failed to load checkin history from backend:', err?.message || err)
    if (err.response?.status === 401 || err.response?.status === 403) {
      router.replace('/login')
    }
  }
}

function syncTodayCheckinFromHistory() {
  const currentKey = todayKey.value
  const todayEntry = checkinHistory.value.find(e => e.dateKey === currentKey)

  if (todayEntry) {
    todayCheckin.value = todayEntry
    selectedMoodId.value = Number(todayEntry.score || todayEntry.moodScore || 4)
    noteText.value = todayEntry.note || ''
    selectedTags.value = Array.isArray(todayEntry.tags) ? todayEntry.tags : []

    if (todayEntry.energy) {
      const en = moodMetrics.value.find(m => m.id === 'energy')
      if (en) en.value = todayEntry.energy
    }
    if (todayEntry.stress) {
      const st = moodMetrics.value.find(m => m.id === 'stress')
      if (st) st.value = todayEntry.stress
    }
    if (todayEntry.social) {
      const sc = moodMetrics.value.find(m => m.id === 'social')
      if (sc) sc.value = todayEntry.social
    }
  } else {
    todayCheckin.value = null
  }
}

async function refreshData() {
  await loadData()
  triggerToast('รีเฟรชข้อมูลแล้ว', 'ดึงประวัติการเช็คอินล่าสุดจากฐานข้อมูลเรียบร้อย')
}

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.replace('/login')
    return
  }
  loadData()
})
</script>

<style scoped>
/* Range Slider Custom Styling */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0D9488;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(13, 148, 136, 0.4);
  border: 2px solid white;
  transition: transform 0.15s ease-out;
}
input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

/* Toast Transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px) scale(0.95);
}

/* Modal Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spinSlow 3s linear infinite;
}
</style>
