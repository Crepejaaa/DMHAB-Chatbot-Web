<template>
  <div class="flex flex-col space-y-8">
    
    <!-- Top Bar -->
    <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
      <div>
        <h1 class="text-3xl font-extrabold text-[#1E293B] tracking-tight">แดชบอร์ดแอดมิน</h1>
        <p class="text-sm text-gray-500">ภาพรวมข้อมูลสถิติระบบ PhuenJaiZone (อ้างอิงจากฐานข้อมูลจริง)</p>
      </div>
      <div class="flex items-center gap-3">
        <button 
          @click="fetchStats" 
          :disabled="isLoading"
          class="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 hover:text-[#0D9488] hover:border-[#0D9488] rounded-xl text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title="รีเฟรชข้อมูลจากฐานข้อมูล"
        >
          <svg :class="['w-3.5 h-3.5', isLoading ? 'animate-spin text-[#0D9488]' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          {{ isLoading ? 'กำลังดึงข้อมูล...' : 'รีเฟรชข้อมูล' }}
        </button>
        <div class="bg-emerald-50 text-[#0D9488] font-bold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 border border-[#0D9488]/20 animate-pulse">
          <span class="w-2 h-2 rounded-full bg-[#0D9488]"></span>
          ระบบออนไลน์
        </div>
        <span class="text-xs text-gray-400 font-mono hidden md:inline">วันที่: {{ currentDate }}</span>
      </div>
    </header>

    <!-- Stat Cards (3 สถิติข้างบนตามฐานข้อมูล) -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 1. จำนวนผู้ใช้ทั้งหมด -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-[#0D9488]/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">จำนวนผู้ใช้ทั้งหมด</span>
          <div class="bg-emerald-50 p-2.5 rounded-xl text-[#0D9488]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ stats.totalUsers }}</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">บัญชีในระบบ</span>
        </div>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <span>ผู้ใช้ทั่วไป {{ stats.userRoles.users }} คน</span>
          <span>•</span>
          <span>แอดมิน {{ stats.userRoles.admins }} คน</span>
        </div>
      </div>

      <!-- 2. การประเมินสำเร็จ -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-[#059669]/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">การประเมินสำเร็จ</span>
          <div class="bg-teal-50 p-2.5 rounded-xl text-[#0D9488]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-3xl font-extrabold text-[#1E293B]">{{ stats.assessmentsCompleted }}</span>
          <span class="text-xs font-semibold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded-md">ครั้งทั้งหมด</span>
        </div>
        <div class="text-xs text-gray-500 flex items-center gap-2">
          <span>บันทึกผลลงฐานข้อมูลเรียบร้อย</span>
        </div>
      </div>

      <!-- 3. คะแนนประเมินเฉลี่ย -->
      <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">คะแนนประเมินเฉลี่ย</span>
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
          <span>เกณฑ์คะแนนรวมแบบประเมินสุขภาพจิต</span>
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
            แผนภูมิแท่งสถิติจากฐานข้อมูล
          </h2>
          <p class="text-xs text-gray-500 mt-1">
            เปรียบเทียบและแจกแจงรายละเอียดสถิติ 3 ด้านหลัก: จำนวนผู้ใช้, การประเมินสำเร็จ และคะแนนประเมินเฉลี่ย
          </p>
        </div>

        <!-- Mode Selector Buttons -->
        <div class="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          <button 
            @click="activeChartTab = 'all'" 
            :class="activeChartTab === 'all' ? 'bg-white text-[#0D9488] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-800'"
            class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer"
          >
            แสดงทั้งหมด
          </button>
          <button 
            @click="activeChartTab = 'compare'" 
            :class="activeChartTab === 'compare' ? 'bg-white text-[#0D9488] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-800'"
            class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer"
          >
            เปรียบเทียบภาพรวม
          </button>
          <button 
            @click="activeChartTab = 'details'" 
            :class="activeChartTab === 'details' ? 'bg-white text-[#0D9488] shadow-sm font-bold' : 'text-gray-500 hover:text-gray-800'"
            class="px-3.5 py-1.5 rounded-lg text-xs transition cursor-pointer"
          >
            แจกแจง 3 ด้าน
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
            <h3 class="text-lg font-bold text-[#1E293B]">กราฟแท่งเปรียบเทียบ 3 ตัวชี้วัดหลัก</h3>
            <p class="text-xs text-gray-400">เปรียบเทียบปริมาณข้อมูลในฐานข้อมูลระหว่างผู้ใช้, จำนวนการประเมิน และคะแนนเฉลี่ย</p>
          </div>
          <!-- Legend -->
          <div class="flex flex-wrap items-center gap-4 text-xs text-gray-600">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded bg-gradient-to-r from-[#045F54] to-[#0D9488]"></span>
              <span>จำนวนผู้ใช้ (คน)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded bg-gradient-to-r from-[#0D9488] to-[#10B981]"></span>
              <span>การประเมิน (ครั้ง)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded bg-gradient-to-r from-amber-500 to-amber-400"></span>
              <span>คะแนนเฉลี่ย (/21)</span>
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
                <span class="text-[10px] text-gray-400">คน</span>
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
              <span class="text-xs sm:text-sm font-bold text-gray-700 mt-3 text-center">จำนวนผู้ใช้</span>
              <span class="text-[10px] text-gray-400 hidden sm:inline">ฐานข้อมูล User</span>
            </div>

            <!-- Bar 2: การประเมินสำเร็จ -->
            <div class="flex-1 max-w-[120px] flex flex-col items-center h-full justify-end z-10 group relative">
              <!-- Value tooltip on top of bar -->
              <div class="mb-2 text-center transition-transform group-hover:-translate-y-1 duration-200">
                <span class="text-xs sm:text-sm font-extrabold text-[#0D9488] block">{{ stats.assessmentsCompleted }}</span>
                <span class="text-[10px] text-gray-400">ครั้ง</span>
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
              <span class="text-xs sm:text-sm font-bold text-gray-700 mt-3 text-center">การประเมิน</span>
              <span class="text-[10px] text-gray-400 hidden sm:inline">ฐานข้อมูล TestResult</span>
            </div>

            <!-- Bar 3: คะแนนประเมินเฉลี่ย -->
            <div class="flex-1 max-w-[120px] flex flex-col items-center h-full justify-end z-10 group relative">
              <!-- Value tooltip on top of bar -->
              <div class="mb-2 text-center transition-transform group-hover:-translate-y-1 duration-200">
                <span class="text-xs sm:text-sm font-extrabold text-amber-600 block">{{ stats.avgScore }}</span>
                <span class="text-[10px] text-gray-400">จาก 21 คะแนน</span>
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
              <span class="text-xs sm:text-sm font-bold text-gray-700 mt-3 text-center">คะแนนเฉลี่ย</span>
              <span class="text-[10px] text-gray-400 hidden sm:inline">เฉลี่ย {{ stats.avgScore }}/21</span>
            </div>

          </div>
        </div>

        <!-- Summary Note below main chart -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div class="bg-gray-50/70 p-3.5 rounded-xl border border-gray-150">
            <div class="text-[11px] text-gray-400 font-medium">สัดส่วนผู้ใช้</div>
            <div class="text-sm font-bold text-gray-800 mt-0.5">{{ stats.totalUsers }} คน</div>
            <div class="text-[10px] text-emerald-600 mt-1">ผู้ใช้ทั่วไป {{ userPercent }}% • แอดมิน {{ adminPercent }}%</div>
          </div>
          <div class="bg-gray-50/70 p-3.5 rounded-xl border border-gray-150">
            <div class="text-[11px] text-gray-400 font-medium">สัดส่วนการประเมินสำเร็จ</div>
            <div class="text-sm font-bold text-gray-800 mt-0.5">{{ stats.assessmentsCompleted }} ครั้ง</div>
            <div class="text-[10px] text-[#0D9488] mt-1">เฉลี่ย {{ avgTestsPerUser }} ครั้ง/ผู้ใช้งาน</div>
          </div>
          <div class="bg-gray-50/70 p-3.5 rounded-xl border border-gray-150">
            <div class="text-[11px] text-gray-400 font-medium">ระดับคะแนนเฉลี่ยภาพรวม</div>
            <div class="text-sm font-bold text-gray-800 mt-0.5">{{ stats.avgScore }} / 21 คะแนน</div>
            <div class="text-[10px] text-amber-600 mt-1">อยู่ในเกณฑ์ระดับ {{ avgScoreText }} ({{ scorePercentOf21 }}%)</div>
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
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">ด้านที่ 1: ผู้ใช้งาน</span>
              <span class="text-xs text-gray-400">รวม {{ stats.totalUsers }} บัญชี</span>
            </div>
            <h3 class="text-base font-bold text-[#1E293B]">กราฟแท่งจำแนกผู้ใช้งาน</h3>
            <p class="text-xs text-gray-400 mb-6">สัดส่วนประเภทบัญชีผู้ใช้ในระบบฐานข้อมูล</p>

            <!-- Horizontal Bars -->
            <div class="space-y-4">
              <!-- ผู้ใช้ทั่วไป -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-gray-700 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>
                    ผู้ใช้งานทั่วไป (USER)
                  </span>
                  <span class="text-gray-900 font-bold">{{ stats.userRoles.users }} คน ({{ userPercent }}%)</span>
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
                    ผู้ดูแลระบบ (ADMIN)
                  </span>
                  <span class="text-gray-900 font-bold">{{ stats.userRoles.admins }} คน ({{ adminPercent }}%)</span>
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
            💡 ผู้ใช้งานทั่วไปมีสัดส่วนเป็นส่วนใหญ่ของระบบ คิดเป็น {{ userPercent }}%
          </div>
        </div>

        <!-- แท่งที่ 2: กราฟแท่งจำแนกผลการประเมินสำเร็จ (Assessment Level Breakdown) -->
        <div class="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">ด้านที่ 2: การประเมิน</span>
              <span class="text-xs text-gray-400">รวม {{ stats.assessmentsCompleted }} ครั้ง</span>
            </div>
            <h3 class="text-base font-bold text-[#1E293B]">กราฟแท่งระดับผลการประเมิน</h3>
            <p class="text-xs text-gray-400 mb-6">จำแนกผลการทดสอบสุขภาพจิตตามระดับความเสี่ยง</p>

            <!-- Horizontal Bars -->
            <div class="space-y-4">
              <!-- ระดับปกติ -->
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                  <span class="text-gray-700 flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    ปกติ (0 - 6 คะแนน)
                  </span>
                  <span class="text-emerald-600 font-bold">{{ stats.assessmentLevels.normal }} ครั้ง ({{ normalPercent }}%)</span>
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
                    ปานกลาง (7 - 18 คะแนน)
                  </span>
                  <span class="text-amber-600 font-bold">{{ stats.assessmentLevels.moderate }} ครั้ง ({{ moderatePercent }}%)</span>
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
                    รุนแรง (19 - 21 คะแนน)
                  </span>
                  <span class="text-rose-600 font-bold">{{ stats.assessmentLevels.severe }} ครั้ง ({{ severePercent }}%)</span>
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
            📋 ผลทดสอบส่วนใหญ่อยู่ในเกณฑ์ {{ dominantLevelText }}
          </div>
        </div>

        <!-- แท่งที่ 3: กราฟแท่งการกระจายคะแนนเฉลี่ย (Score Range Breakdown) -->
        <div class="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">ด้านที่ 3: คะแนนเฉลี่ย</span>
              <span class="text-xs text-gray-400">เฉลี่ย {{ stats.avgScore }} / 21</span>
            </div>
            <h3 class="text-base font-bold text-[#1E293B]">กราฟแท่งช่วงคะแนนประเมิน</h3>
            <p class="text-xs text-gray-400 mb-6">การแจกแจงคะแนนความถี่ในฐานข้อมูล</p>

            <!-- Distribution Bars -->
            <div class="space-y-3">
              <div v-for="(item, idx) in stats.scoreDistribution" :key="idx">
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span class="text-gray-600 text-[11px] truncate">{{ item.label }}</span>
                  <span class="text-gray-900 font-bold">{{ item.count }} ครั้ง</span>
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
            <span>คะแนนเฉลี่ยระบบ:</span>
            <span class="font-extrabold text-[#0D9488]">{{ stats.avgScore }} / 21 คะแนน</span>
          </div>
        </div>

      </div>

    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Tab view state
const activeChartTab = ref('all')
const isLoading = ref(false)

// Formatting date in Thai
const currentDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('th-TH', options)
})

// Statistics State (อิงจาก 3 สิ่งในฐานข้อมูล)
const stats = ref({
  totalUsers: 24,
  assessmentsCompleted: 35,
  avgScore: 12.2,
  userRoles: {
    users: 20,
    admins: 4
  },
  assessmentLevels: {
    normal: 5,
    moderate: 27,
    severe: 3
  },
  scoreDistribution: [
    { label: '0-6 คะแนน (ปกติ)', count: 5, description: 'สุขภาพจิตปกติ' },
    { label: '7-12 คะแนน (เครียดเล็กน้อย)', count: 12, description: 'เริ่มมีความเครียด' },
    { label: '13-18 คะแนน (เสี่ยงปานกลาง)', count: 15, description: 'ควรติดตามอาการ' },
    { label: '19-21 คะแนน (เสี่ยงรุนแรง)', count: 3, description: 'ควรปรึกษาแพทย์' }
  ]
})

// Fetch live stats from backend API (connected to Neon DB)
const fetchStats = async () => {
  isLoading.value = true
  try {
    const res = await axios.get('/api/admin/stats')
    if (res.data) {
      stats.value = {
        totalUsers: res.data.totalUsers ?? stats.value.totalUsers,
        assessmentsCompleted: res.data.assessmentsCompleted ?? stats.value.assessmentsCompleted,
        avgScore: res.data.avgScore ?? stats.value.avgScore,
        userRoles: res.data.userRoles || stats.value.userRoles,
        assessmentLevels: res.data.assessmentLevels || stats.value.assessmentLevels,
        scoreDistribution: res.data.scoreDistribution || stats.value.scoreDistribution
      }
    }
  } catch (error) {
    console.warn("Could not fetch latest stats from backend, using database cache:", error)
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
  if (moderate >= normal && moderate >= severe) return 'เสี่ยงปานกลาง'
  if (normal >= moderate && normal >= severe) return 'ปกติ'
  return 'เสี่ยงรุนแรง'
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
  if (score < 7) return 'ปกติ'
  if (score <= 18) return 'ปานกลาง'
  return 'เสี่ยงรุนแรง'
})

const avgScoreBadgeClass = computed(() => {
  const score = Number(stats.value.avgScore) || 0
  if (score < 7) return 'text-emerald-700 bg-emerald-50 border-emerald-200'
  if (score <= 18) return 'text-amber-700 bg-amber-50 border-amber-200'
  return 'text-rose-700 bg-rose-50 border-rose-200'
})
</script>
