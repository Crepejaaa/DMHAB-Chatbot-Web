<template>
  <div class="flex flex-col space-y-8">
    
    <!-- Top Bar -->
    <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
      <div>
        <h1 class="text-3xl font-extrabold text-[#1E293B] tracking-tight">{{ $t('admin.dashboard.title') }}</h1>
        <p class="text-sm text-gray-500">{{ $t('admin.dashboard.subtitle') }}</p>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="fetchStats" 
          :disabled="isLoading"
          class="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-[#0D9488] hover:border-[#0D9488] rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          :title="$t('admin.dashboard.refreshTitle')"
        >
          <svg :class="['w-3.5 h-3.5', isLoading ? 'animate-spin text-[#0D9488]' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          {{ isLoading ? $t('admin.dashboard.fetching') : $t('admin.dashboard.refresh') }}
        </button>
        <div
          :class="hasLoadedStats && !errorMessage
            ? 'bg-emerald-50 text-[#0D9488] border-[#0D9488]/20'
            : errorMessage
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'"
          class="font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 border"
        >
          <span
            :class="hasLoadedStats && !errorMessage ? 'bg-[#0D9488]' : errorMessage ? 'bg-rose-500' : 'bg-amber-500'"
            class="w-2 h-2 rounded-full"
          ></span>
          {{ isLoading ? $t('admin.dashboard.statusConnecting') : errorMessage ? $t('admin.dashboard.statusFailed') : hasLoadedStats ? $t('admin.dashboard.statusConnected') : $t('admin.dashboard.statusNotConnected') }}
        </div>
        <span class="text-xs text-gray-400 font-mono hidden md:inline">{{ $t('admin.dashboard.date', { date: currentDate }) }}</span>
      </div>
    </header>

    <div v-if="errorMessage" role="alert" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {{ errorMessage }}
    </div>

    <!-- Stat Cards (3 สถิติข้างบนตามฐานข้อมูล) -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 1. จำนวนผู้ใช้ทั้งหมด -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-[#0D9488]/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">{{ $t('admin.dashboard.cardUsers') }}</span>
          <div class="bg-emerald-50 p-2.5 rounded-xl text-[#0D9488]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ stats.totalUsers }}</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{{ $t('admin.dashboard.accountsInSystem') }}</span>
        </div>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <span>{{ $t('admin.dashboard.regularUsersCount', { n: stats.userRoles.users }) }}</span>
          <span>•</span>
          <span>{{ $t('admin.dashboard.adminsCount', { n: stats.userRoles.admins }) }}</span>
        </div>
      </div>

      <!-- 2. การประเมินสำเร็จ -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-[#059669]/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">{{ $t('admin.dashboard.cardAssessments') }}</span>
          <div class="bg-teal-50 p-2.5 rounded-xl text-[#0D9488]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ stats.assessmentsCompleted }}</span>
          <span class="text-xs font-semibold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded-md">{{ $t('admin.dashboard.totalTimes') }}</span>
        </div>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <span>{{ $t('admin.dashboard.savedToDb') }}</span>
        </div>
      </div>

      <!-- 3. คะแนนประเมินเฉลี่ย -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">{{ $t('admin.dashboard.cardAvg') }}</span>
          <div class="bg-amber-50 p-2.5 rounded-xl text-amber-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ stats.avgScore }} / 21</span>
          <span :class="avgScoreBadgeClass" class="text-xs font-semibold px-2 py-0.5 rounded-full border">
            {{ avgScoreText }}
          </span>
        </div>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <span>{{ $t('admin.dashboard.avgCriteria') }}</span>
        </div>
      </div>
    </section>

    <!-- Bar Charts Section (กราฟแท่งทั้งหมดด้านล่าง อิงจากฐานข้อมูล 3 อย่างนี้เท่านั้น) -->
    <section class="space-y-6">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm">
        <div>
          <h2 class="text-xl font-extrabold text-[#1E293B] flex items-center gap-2">
            <span class="w-2.5 h-6 bg-gradient-to-b from-[#045F54] to-[#0D9488] rounded-full inline-block"></span>
            {{ $t('admin.dashboard.chartsTitle') }}
          </h2>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t('admin.dashboard.chartsSubtitle') }}
          </p>
        </div>

        <!-- Mode Selector Buttons -->
        <div class="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          <button 
            @click="activeChartTab = 'all'" 
            :class="activeChartTab === 'all' ? 'bg-white text-[#0D9488] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-800'"
            class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer"
          >
            {{ $t('admin.dashboard.tabAll') }}
          </button>
          <button 
            @click="activeChartTab = 'compare'" 
            :class="activeChartTab === 'compare' ? 'bg-white text-[#0D9488] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-800'"
            class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer"
          >
            {{ $t('admin.dashboard.tabCompare') }}
          </button>
          <button 
            @click="activeChartTab = 'details'" 
            :class="activeChartTab === 'details' ? 'bg-white text-[#0D9488] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-800'"
            class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer"
          >
            {{ $t('admin.dashboard.tabDetails') }}
          </button>
        </div>
      </div>

      <!-- 1. กราฟแท่งหลัก: เปรียบเทียบ 3 ตัวชี้วัดจากฐานข้อมูล (Main 3-Metric Bar Chart) -->
      <div 
        v-if="activeChartTab === 'all' || activeChartTab === 'compare'"
        class="bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-sm flex flex-col space-y-6"
      >
        <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <h3 class="text-lg font-bold text-[#1E293B]">{{ $t('admin.dashboard.mainChartTitle') }}</h3>
            <p class="text-xs text-gray-400">{{ $t('admin.dashboard.mainChartDesc') }}</p>
          </div>
          <!-- Legend -->
          <div class="flex flex-wrap items-center gap-4 text-xs text-gray-600">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded bg-gradient-to-r from-[#045F54] to-[#0D9488]"></span>
              <span>{{ $t('admin.dashboard.legendUsers') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded bg-gradient-to-r from-[#0D9488] to-[#10B981]"></span>
              <span>{{ $t('admin.dashboard.legendAssessments') }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded bg-gradient-to-r from-amber-500 to-amber-400"></span>
              <span>{{ $t('admin.dashboard.legendAvg') }}</span>
            </div>
          </div>
        </div>

        <!-- Vertical Bar Chart Container -->
        <div class="pt-6 pb-2">
          <div class="relative h-64 sm:h-72 w-full flex items-end justify-around gap-4 sm:gap-12 border-b border-gray-200 px-4 sm:px-12">
            
            <!-- Background Grid Lines -->
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div class="border-b border-dashed border-gray-200 w-full flex justify-end pr-2 text-[10px] text-gray-400">100%</div>
              <div class="border-b border-dashed border-gray-200 w-full flex justify-end pr-2 text-[10px] text-gray-400">75%</div>
              <div class="border-b border-dashed border-gray-200 w-full flex justify-end pr-2 text-[10px] text-gray-400">50%</div>
              <div class="border-b border-dashed border-gray-200 w-full flex justify-end pr-2 text-[10px] text-gray-400">25%</div>
              <div class="w-full"></div>
            </div>

            <!-- Bar 1: จำนวนผู้ใช้ทั้งหมด -->
            <div class="flex-1 max-w-[120px] flex flex-col items-center h-full justify-end z-10 group relative">
              <!-- Value tooltip on top of bar -->
              <div class="mb-2 text-center transition-transform group-hover:-translate-y-1 duration-200">
                <span class="text-xs sm:text-sm font-extrabold text-[#045F54] block">{{ stats.totalUsers }}</span>
                <span class="text-[10px] text-gray-400">{{ $t('admin.dashboard.unitPeople') }}</span>
              </div>
              <!-- Bar pillar -->
              <div class="w-full bg-gray-100 rounded-t-2xl overflow-hidden flex items-end h-full">
                <div 
                  class="w-full bg-gradient-to-t from-[#045F54] to-[#0D9488] rounded-t-xl transition-all duration-700 ease-out group-hover:brightness-110 shadow-md relative"
                  :style="{ height: `${userBarHeight}%` }"
                >
                  <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <span class="text-xs sm:text-sm font-bold text-gray-700 mt-3 text-center">{{ $t('admin.dashboard.barUsers') }}</span>
              <span class="text-[10px] text-gray-400 hidden sm:inline">{{ $t('admin.dashboard.barUsersDb') }}</span>
            </div>

            <!-- Bar 2: การประเมินสำเร็จ -->
            <div class="flex-1 max-w-[120px] flex flex-col items-center h-full justify-end z-10 group relative">
              <!-- Value tooltip on top of bar -->
              <div class="mb-2 text-center transition-transform group-hover:-translate-y-1 duration-200">
                <span class="text-xs sm:text-sm font-extrabold text-[#0D9488] block">{{ stats.assessmentsCompleted }}</span>
                <span class="text-[10px] text-gray-400">{{ $t('admin.dashboard.unitTimes') }}</span>
              </div>
              <!-- Bar pillar -->
              <div class="w-full bg-gray-100 rounded-t-2xl overflow-hidden flex items-end h-full">
                <div 
                  class="w-full bg-gradient-to-t from-[#0D9488] to-[#10B981] rounded-t-xl transition-all duration-700 ease-out group-hover:brightness-110 shadow-md relative"
                  :style="{ height: `${assessmentBarHeight}%` }"
                >
                  <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <span class="text-xs sm:text-sm font-bold text-gray-700 mt-3 text-center">{{ $t('admin.dashboard.barAssessments') }}</span>
              <span class="text-[10px] text-gray-400 hidden sm:inline">{{ $t('admin.dashboard.barAssessmentsDb') }}</span>
            </div>

            <!-- Bar 3: คะแนนประเมินเฉลี่ย -->
            <div class="flex-1 max-w-[120px] flex flex-col items-center h-full justify-end z-10 group relative">
              <!-- Value tooltip on top of bar -->
              <div class="mb-2 text-center transition-transform group-hover:-translate-y-1 duration-200">
                <span class="text-xs sm:text-sm font-extrabold text-amber-600 block">{{ stats.avgScore }}</span>
                <span class="text-[10px] text-gray-400">{{ $t('admin.dashboard.outOf21') }}</span>
              </div>
              <!-- Bar pillar -->
              <div class="w-full bg-gray-100 rounded-t-2xl overflow-hidden flex items-end h-full">
                <div 
                  class="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-xl transition-all duration-700 ease-out group-hover:brightness-110 shadow-md relative"
                  :style="{ height: `${scoreBarHeight}%` }"
                >
                  <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
              <span class="text-xs sm:text-sm font-bold text-gray-700 mt-3 text-center">{{ $t('admin.dashboard.barAvg') }}</span>
              <span class="text-[10px] text-gray-400 hidden sm:inline">{{ $t('admin.dashboard.barAvgDetail', { n: stats.avgScore }) }}</span>
            </div>

          </div>
        </div>

        <!-- Summary Note below main chart -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div class="bg-gray-50/70 p-3.5 rounded-xl border border-gray-150">
            <div class="text-[11px] text-gray-400 font-medium">{{ $t('admin.dashboard.ratioUsers') }}</div>
            <div class="text-sm font-bold text-gray-800 mt-0.5">{{ $t('admin.dashboard.peopleCount', { n: stats.totalUsers }) }}</div>
            <div class="text-[10px] text-emerald-600 mt-1">{{ $t('admin.dashboard.ratioUsersDetail', { user: userPercent, admin: adminPercent }) }}</div>
          </div>
          <div class="bg-gray-50/70 p-3.5 rounded-xl border border-gray-150">
            <div class="text-[11px] text-gray-400 font-medium">{{ $t('admin.dashboard.ratioAssessments') }}</div>
            <div class="text-sm font-bold text-gray-800 mt-0.5">{{ $t('admin.dashboard.timesCount', { n: stats.assessmentsCompleted }) }}</div>
            <div class="text-[10px] text-[#0D9488] mt-1">{{ $t('admin.dashboard.avgPerUser', { n: avgTestsPerUser }) }}</div>
          </div>
          <div class="bg-gray-50/70 p-3.5 rounded-xl border border-gray-150">
            <div class="text-[11px] text-gray-400 font-medium">{{ $t('admin.dashboard.avgLevelTitle') }}</div>
            <div class="text-sm font-bold text-gray-800 mt-0.5">{{ $t('admin.dashboard.scoreOf21', { n: stats.avgScore }) }}</div>
            <div class="text-[10px] text-amber-600 mt-1">{{ $t('admin.dashboard.inLevel', { level: avgScoreText, pct: scorePercentOf21 }) }}</div>
          </div>
        </div>
      </div>

      <!-- 2. กราฟแท่งจำแนกรายละเอียดแยก 3 ด้าน (3 Detailed Category Bar Charts) -->
      <div 
        v-if="activeChartTab === 'all' || activeChartTab === 'details'"
        class="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        
        <!-- แท่งที่ 1: กราฟแท่งจำแนกผู้ใช้งานระบบ (User Role Breakdown) -->
        <div class="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">{{ $t('admin.dashboard.side1') }}</span>
              <span class="text-xs text-gray-400">{{ $t('admin.dashboard.totalAccounts', { n: stats.totalUsers }) }}</span>
            </div>
            <h3 class="text-base font-bold text-[#1E293B]">{{ $t('admin.dashboard.usersChartTitle') }}</h3>
            <p class="text-xs text-gray-400 mb-6">{{ $t('admin.dashboard.usersChartDesc') }}</p>

            <!-- Horizontal Bars -->
            <div class="space-y-4">
              <!-- ผู้ใช้ทั่วไป -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-gray-700 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>
                    {{ $t('admin.dashboard.regularUser') }}
                  </span>
                  <span class="text-gray-900 font-bold">{{ $t('admin.dashboard.peoplePercent', { n: stats.userRoles.users, pct: userPercent }) }}</span>
                </div>
                <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-[#045F54] to-[#0D9488] rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${userPercent}%` }"
                  ></div>
                </div>
              </div>

              <!-- ผู้ดูแลระบบ -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-gray-700 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                    {{ $t('admin.dashboard.adminUser') }}
                  </span>
                  <span class="text-gray-900 font-bold">{{ $t('admin.dashboard.peoplePercent', { n: stats.userRoles.admins, pct: adminPercent }) }}</span>
                </div>
                <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-[#0D9488] to-teal-400 rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${adminPercent}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 bg-gray-50/60 p-3 rounded-xl">
            {{ $t('admin.dashboard.usersInsight', { pct: userPercent }) }}
          </div>
        </div>

        <!-- แท่งที่ 2: กราฟแท่งจำแนกผลการประเมินสำเร็จ (Assessment Level Breakdown) -->
        <div class="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">{{ $t('admin.dashboard.side2') }}</span>
              <span class="text-xs text-gray-400">{{ $t('admin.dashboard.totalTimesSum', { n: stats.assessmentsCompleted }) }}</span>
            </div>
            <h3 class="text-base font-bold text-[#1E293B]">{{ $t('admin.dashboard.levelChartTitle') }}</h3>
            <p class="text-xs text-gray-400 mb-6">{{ $t('admin.dashboard.levelChartDesc') }}</p>

            <!-- Horizontal Bars -->
            <div class="space-y-4">
              <!-- ระดับปกติ -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-gray-700 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    {{ $t('admin.dashboard.levelNormalRange') }}
                  </span>
                  <span class="text-emerald-600 font-bold">{{ $t('admin.dashboard.timesPercent', { n: stats.assessmentLevels.normal, pct: normalPercent }) }}</span>
                </div>
                <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${normalPercent}%` }"
                  ></div>
                </div>
              </div>

              <!-- ระดับปานกลาง -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-gray-700 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    {{ $t('admin.dashboard.levelModerateRange') }}
                  </span>
                  <span class="text-amber-600 font-bold">{{ $t('admin.dashboard.timesPercent', { n: stats.assessmentLevels.moderate, pct: moderatePercent }) }}</span>
                </div>
                <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${moderatePercent}%` }"
                  ></div>
                </div>
              </div>

              <!-- ระดับรุนแรง -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-gray-700 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    {{ $t('admin.dashboard.levelSevereRange') }}
                  </span>
                  <span class="text-rose-600 font-bold">{{ $t('admin.dashboard.timesPercent', { n: stats.assessmentLevels.severe, pct: severePercent }) }}</span>
                </div>
                <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${severePercent}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 bg-gray-50/60 p-3 rounded-xl">
            {{ $t('admin.dashboard.levelInsight', { level: dominantLevelText }) }}
          </div>
        </div>

        <!-- แท่งที่ 3: กราฟแท่งการกระจายคะแนนเฉลี่ย (Score Range Breakdown) -->
        <div class="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">{{ $t('admin.dashboard.side3') }}</span>
              <span class="text-xs text-gray-400">{{ $t('admin.dashboard.avgOf21', { n: stats.avgScore }) }}</span>
            </div>
            <h3 class="text-base font-bold text-[#1E293B]">{{ $t('admin.dashboard.rangeChartTitle') }}</h3>
            <p class="text-xs text-gray-400 mb-6">{{ $t('admin.dashboard.rangeChartDesc') }}</p>

            <!-- Distribution Bars -->
            <div class="space-y-3">
              <div v-for="(item, idx) in stats.scoreDistribution" :key="idx">
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-gray-600 text-[11px] truncate">{{ $t(`admin.dashboard.range${idx}`) }}</span>
                  <span class="text-gray-900 font-bold">{{ $t('admin.dashboard.timesCount', { n: item.count }) }}</span>
                </div>
                <div class="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    :class="[
                      idx === 0 ? 'bg-emerald-500' : '',
                      idx === 1 ? 'bg-teal-500' : '',
                      idx === 2 ? 'bg-amber-500' : '',
                      idx === 3 ? 'bg-rose-500' : ''
                    ]"
                    class="h-full rounded-full transition-all duration-700 ease-out"
                    :style="{ width: `${scoreDistPercent(item.count)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 bg-gray-50/60 p-3 rounded-xl flex items-center justify-between">
            <span>{{ $t('admin.dashboard.systemAvg') }}</span>
            <span class="font-extrabold text-[#0D9488]">{{ $t('admin.dashboard.scoreOf21', { n: stats.avgScore }) }}</span>
          </div>
        </div>

      </div>

    </section>

  </div>
</template>

<script setup>
import { dateLocale } from '../i18n'
import { ref, computed, onMounted } from 'vue'
import axios from '../api/axios'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Tab view state
const activeChartTab = ref('all')
const isLoading = ref(false)
const hasLoadedStats = ref(false)
const errorMessage = ref('')

// Formatting date in Thai
const currentDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString(dateLocale(), options)
})

// Start empty; dashboard values are populated only after the API responds.
const stats = ref({
  totalUsers: 0,
  assessmentsCompleted: 0,
  avgScore: 0,
  userRoles: {
    users: 0,
    admins: 0
  },
  assessmentLevels: {
    normal: 0,
    moderate: 0,
    severe: 0
  },
  scoreDistribution: [
    { label: t('admin.dashboard.range0'), count: 0 },
    { label: t('admin.dashboard.range1'), count: 0 },
    { label: t('admin.dashboard.range2'), count: 0 },
    { label: t('admin.dashboard.range3'), count: 0 }
  ]
})

const fetchStats = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await axios.get('/api/admin/stats')
    const data = res.data
    const requiredCounts = [
      data?.totalUsers,
      data?.assessmentsCompleted,
      data?.avgScore,
      data?.userRoles?.users,
      data?.userRoles?.admins,
      data?.assessmentLevels?.normal,
      data?.assessmentLevels?.moderate,
      data?.assessmentLevels?.severe
    ]

    if (!requiredCounts.every(Number.isFinite) || !Array.isArray(data.scoreDistribution)) {
      throw new Error(t('admin.dashboard.errInvalidStats'))
    }

    stats.value = data
    hasLoadedStats.value = true
  } catch (error) {
    console.error('Could not fetch admin stats from the backend:', error)
    errorMessage.value = error.response?.data?.error || error.message || t('admin.dashboard.errLoad')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStats()
})

// Calculations for percentages and bar heights
const userPercent = computed(() => {
  const total = stats.value.totalUsers || 1
  return Math.round((stats.value.userRoles.users / total) * 100)
})

const adminPercent = computed(() => {
  const total = stats.value.totalUsers || 1
  return Math.round((stats.value.userRoles.admins / total) * 100)
})

const totalAssessments = computed(() => stats.value.assessmentsCompleted || 1)

const normalPercent = computed(() => {
  return Math.round((stats.value.assessmentLevels.normal / totalAssessments.value) * 100)
})

const moderatePercent = computed(() => {
  return Math.round((stats.value.assessmentLevels.moderate / totalAssessments.value) * 100)
})

const severePercent = computed(() => {
  return Math.round((stats.value.assessmentLevels.severe / totalAssessments.value) * 100)
})

const dominantLevelText = computed(() => {
  const { normal, moderate, severe } = stats.value.assessmentLevels
  if (moderate >= normal && moderate >= severe) return t('admin.dashboard.levelModerateRisk')
  if (normal >= moderate && normal >= severe) return t('admin.dashboard.levelNormal')
  return t('admin.dashboard.levelSevere')
})

const avgTestsPerUser = computed(() => {
  if (!stats.value.totalUsers) return '0'
  return (stats.value.assessmentsCompleted / stats.value.totalUsers).toFixed(1)
})

const scorePercentOf21 = computed(() => {
  return Math.round((stats.value.avgScore / 21) * 100)
})

// Bar heights relative to the max value for the 3-metric overview
const userBarHeight = computed(() => {
  const max = Math.max(stats.value.totalUsers, stats.value.assessmentsCompleted, 21, 1)
  return Math.min(100, Math.max(18, Math.round((stats.value.totalUsers / max) * 100)))
})

const assessmentBarHeight = computed(() => {
  const max = Math.max(stats.value.totalUsers, stats.value.assessmentsCompleted, 21, 1)
  return Math.min(100, Math.max(18, Math.round((stats.value.assessmentsCompleted / max) * 100)))
})

const scoreBarHeight = computed(() => {
  // Score is out of 21, represented as scale percentage
  return Math.min(100, Math.max(18, Math.round((stats.value.avgScore / 21) * 100)))
})

const scoreDistPercent = (count) => {
  const maxCount = Math.max(...stats.value.scoreDistribution.map(s => s.count), 1)
  return Math.min(100, Math.max(8, Math.round((count / maxCount) * 100)))
}

// Average score badge and text in Thai
const avgScoreText = computed(() => {
  const score = Number(stats.value.avgScore) || 0
  if (score < 7) return t('admin.dashboard.levelNormal')
  if (score <= 18) return t('admin.dashboard.levelModerate')
  return t('admin.dashboard.levelSevere')
})

const avgScoreBadgeClass = computed(() => {
  const score = Number(stats.value.avgScore) || 0
  if (score < 7) return 'text-emerald-700 bg-emerald-50 border-emerald-200'
  if (score <= 18) return 'text-amber-700 bg-amber-50 border-amber-200'
  return 'text-rose-700 bg-rose-50 border-rose-200'
})
</script>
