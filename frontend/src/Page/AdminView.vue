<template>
  <div :class="['admin-page min-h-screen bg-[#FAF9F5] font-sans text-[#1E293B] flex flex-col md:flex-row transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">
    
    <!-- Sidebar Navigation -->
    <aside class="w-full md:w-64 bg-gradient-to-b from-[#045F54] via-[#0D9488] to-[#059669] text-white flex flex-col shadow-xl">
      <!-- Sidebar Header / Logo -->
      <div class="p-6 flex items-center gap-3 border-b border-white/10">
        <div class="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl p-1">
          <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
        </div>
        <div>
          <span class="text-lg font-bold tracking-wide block">DMHAB Admin</span>
          <span class="text-xs text-[#D1FAE5]/80">System Management</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 p-4 space-y-1">
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/15 text-white font-medium shadow-sm transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path>
          </svg>
          Dashboard
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-[#D1FAE5] hover:bg-white/5 hover:text-white transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          User Accounts
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-[#D1FAE5] hover:bg-white/5 hover:text-white transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Chat Sessions
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-[#D1FAE5] hover:bg-white/5 hover:text-white transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Articles & Blog
        </a>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-white/10 space-y-4">
        <!-- Dark mode toggle in sidebar -->
        <div class="flex items-center justify-between bg-black/15 p-3 rounded-xl border border-white/10">
          <div class="text-xs font-semibold">Dark Mode</div>
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
          Back to Homepage
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10 flex flex-col space-y-8 overflow-y-auto">
      
      <!-- Top Bar -->
      <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold text-[#1E293B] tracking-tight">Admin Control Panel</h1>
          <p class="text-sm text-gray-500">ตรวจสอบและติดตามผลการประเมินสุขภาพจิต, ผู้ใช้งานที่กำลังใช้งานระบบ (Active Users) และบันทึกเหตุวิกฤตขั้นรุนแรง</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="bg-emerald-50 text-[#0D9488] font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1.5 border border-[#0D9488]/20 animate-pulse">
            <span class="w-2 h-2 rounded-full bg-[#0D9488]"></span>
            System Live
          </div>
          <span class="text-xs text-gray-400 font-mono">Date: {{ currentDate }}</span>
        </div>
      </header>

      <!-- Stat Cards -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Stat Item 1 -->
        <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Users</span>
            <div class="bg-emerald-50 p-2 rounded-lg text-[#0D9488]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-[#1E293B]">{{ mockStats.totalUsers }}</span>
            <span class="text-xs font-medium text-emerald-600">+12% this week</span>
          </div>
        </div>

        <!-- Stat Item 2 -->
        <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Assessments Completed</span>
            <div class="bg-teal-50 p-2 rounded-lg text-[#0D9488]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-[#1E293B]">{{ mockStats.assessmentsCompleted }}</span>
            <span class="text-xs font-medium text-gray-500">Total sessions</span>
          </div>
        </div>

        <!-- Stat Item 3 -->
        <div class="bg-[#FFF1F2] p-6 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
          <div class="absolute -right-4 -bottom-4 opacity-5 text-[#E11D48]">
            <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-rose-600 uppercase tracking-wide">Severe Cases Flagged</span>
            <div class="bg-rose-100 p-2 rounded-lg text-[#E11D48] animate-bounce">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-[#E11D48]">{{ mockStats.severeCases }}</span>
            <span class="text-xs font-bold text-[#E11D48] px-1.5 py-0.5 rounded bg-rose-200/50 animate-pulse">Action Required</span>
          </div>
        </div>

        <!-- Stat Item 4 -->
        <div class="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Avg Assessment Score</span>
            <div class="bg-amber-50 p-2 rounded-lg text-amber-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-[#1E293B]">{{ mockStats.avgScore }} / 21</span>
            <span class="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Moderate Mood</span>
          </div>
        </div>
      </section>

      <!-- Main Section: Severe Emergency Alert Box -->
      <section v-if="severeAlerts.length > 0" class="bg-rose-50 border border-rose-200 rounded-3xl p-6 shadow-sm">
        <div class="flex items-start gap-4">
          <div class="p-3 bg-rose-600 text-white rounded-2xl flex items-center justify-center animate-pulse">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-rose-800">Severe Crisis Alert Dashboard (วิกฤตต้องดูแลด่วน)</h3>
            <p class="text-sm text-rose-700 mt-1">
              ผู้ใช้ต่อไปนี้มีผลคะแนนอยู่ในเกณฑ์รุนแรง<strong>SEVERE</strong> ขั้นตอนการติดต่อต้องเริ่มกระบวนการช่วยเหลือในทันทีและต้องแสดงตัวเลือกใน <strong>การติดต่อสายด่วนสุขภาพจิต 1323</strong>.
            </p>

            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="alert in severeAlerts" :key="alert.id" class="bg-white border border-rose-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                <div class="flex justify-between items-start mb-2">
                  <span class="font-bold text-gray-800 text-sm">{{ alert.username }}</span>
                  <span class="px-2 py-0.5 bg-rose-600 text-white text-xs font-bold rounded-full">SEVERE</span>
                </div>
                <div class="text-xs text-gray-500 space-y-1">
                  <div><strong>Email:</strong> {{ alert.email }}</div>
                  <div><strong>Last assessment:</strong> {{ alert.date }}</div>
                  <div class="text-rose-600 font-semibold mt-1">Score: {{ alert.score }} / 21</div>
                </div>
                <div class="mt-4 flex gap-2">
                  <button @click="triggerHotlineModal(alert)" class="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
                    📞 Hotline 1323
                  </button>
                  <button @click="dismissAlert(alert.id)" class="px-4 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl text-xs font-bold transition cursor-pointer">
                    Acknowledge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Users List & Chat Logs Grid -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- User Accounts Table (Left column) -->
        <div class="lg:col-span-2 bg-white rounded-3xl border border-gray-150 shadow-sm p-6 flex flex-col space-y-6">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 class="text-xl font-extrabold text-[#1E293B]">User Registry</h2>
              <p class="text-xs text-gray-500">จัดการบัญชีผู้ใช้ที่ลงทะเบียนและปรับเปลี่ยนบทบาทในระบบ</p>
            </div>
            <!-- Search bar -->
            <div class="relative w-full sm:w-64">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search name, email..." 
                class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition"
              />
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th class="pb-3 pr-4">User</th>
                  <th class="pb-3 px-4">Role</th>
                  <th class="pb-3 px-4">Joined Date</th>
                  <th class="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-[#FAF9F5]/40 transition">
                  <td class="py-4 pr-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D9488]/20 to-[#059669]/10 flex items-center justify-center font-bold text-[#0D9488] text-sm">
                        {{ user.username.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <span class="font-bold text-gray-800 block">{{ user.username }}</span>
                        <span class="text-xs text-gray-400">{{ user.email }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-4">
                    <span 
                      :class="user.role === 'ADMIN' ? 'bg-[#0D9488]/10 text-[#0D9488]' : 'bg-gray-100 text-gray-600'" 
                      class="px-2.5 py-0.5 rounded-full text-xs font-bold inline-block border border-transparent"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="py-4 px-4 text-xs text-gray-500">{{ user.joined }}</td>
                  <td class="py-4 pl-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button 
                        @click="toggleUserRole(user)" 
                        class="px-3 py-1 bg-[#FAF9F5] border border-gray-200 hover:border-[#0D9488]/30 hover:bg-[#0D9488]/5 rounded-lg text-xs font-medium text-gray-700 hover:text-[#0D9488] transition cursor-pointer"
                      >
                        Change Role
                      </button>
                      <button 
                        @click="deleteUser(user.id)" 
                        class="p-1 hover:bg-rose-50 text-gray-400 hover:text-[#E11D48] rounded-lg transition cursor-pointer"
                        title="Delete User"
                      >
                        <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="4" class="py-8 text-center text-gray-400 text-sm">
                    No users found matching query.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent Chat Sessions (Right column) -->
        <div class="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 flex flex-col space-y-6">
          <div>
            <h2 class="text-xl font-extrabold text-[#1E293B]">Recent Chat Logs</h2>
            <p class="text-xs text-gray-500">ระบบติดตามแชตบอตแบบเรียลไทม์และการวินิจฉัยสภาวะอารมณ์</p>
          </div>

          <!-- Chat Lists -->
          <div class="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            <div 
              v-for="session in mockSessions" 
              :key="session.id" 
              class="p-4 bg-[#FAF9F5] border border-gray-100 rounded-2xl shadow-sm hover:border-[#0D9488]/30 transition duration-300"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-gray-800 text-xs">{{ session.username }}</span>
                <!-- Severity Mood Tag -->
                <span 
                  :class="[
                    session.mood === 'SEVERE' ? 'bg-rose-100 text-rose-600 font-bold border border-rose-200' : '',
                    session.mood === 'MODERATE' ? 'bg-amber-100 text-amber-600 font-medium border border-amber-200' : '',
                    session.mood === 'MILD' ? 'bg-emerald-100 text-emerald-600 font-medium border border-emerald-200' : '',
                  ]"
                  class="px-2 py-0.5 rounded text-[10px] tracking-wide uppercase"
                >
                  {{ session.mood }}
                </span>
              </div>
              <p class="text-xs text-gray-600 italic line-clamp-2">"{{ session.lastMessage }}"</p>
              <div class="flex justify-between items-center mt-3 pt-2 border-t border-gray-200/50">
                <span class="text-[10px] text-gray-400">{{ session.time }}</span>
                <button type="button" class="text-[10px] font-bold text-[#0D9488] hover:underline cursor-default">
                  Inspect Log &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- Articles Manager -->
      <section class="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 flex flex-col space-y-6">
        <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-[#1E293B]">Articles &amp; Help Resources</h2>
            <p class="text-xs text-gray-500">สร้างหรือเผยแพร่บทความให้คำแนะนำ, แนวทางการดูแลตนเองและสมุดโทรศัพท์สำหรับการติดต่อ</p>
          </div>
          <!-- Write New Article Button — now active -->
          <button
            type="button"
            @click="openArticleEditor(null)"
            class="px-5 py-2 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl text-xs font-semibold shadow-sm hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            + Write New Article
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="mockArticles.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
          <svg class="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p class="text-sm font-semibold">ยังไม่มีบทความ</p>
          <p class="text-xs mt-1">คลิก "+ Write New Article" เพื่อสร้างบทความแรก</p>
        </div>

        <!-- Article Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="article in mockArticles"
            :key="article.id"
            class="group p-5 border border-gray-150 rounded-2xl flex flex-col justify-between hover:shadow-lg hover:border-[#0D9488]/20 transition-all duration-300"
          >
            <div>
              <div class="flex justify-between items-center mb-3">
                <span
                  :class="categoryColor(article.category)"
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                >
                  {{ article.category }}
                </span>
                <span class="text-[10px] text-gray-400 font-mono">{{ article.date }}</span>
              </div>
              <h3 class="font-bold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-[#0D9488] transition">{{ article.title }}</h3>
              <p class="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">{{ article.excerpt || article.content }}</p>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <span class="text-[10px] text-gray-400">By Admin #{{ article.authorId }}</span>
              <div class="flex gap-2">
                <button type="button" @click.stop="openArticleEditor(article)" class="text-xs text-[#0D9488] font-bold hover:underline cursor-pointer">Edit</button>
                <button type="button" @click.stop="deleteArticle(article.id)" class="text-xs text-rose-600 font-bold hover:underline cursor-pointer">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- ========== Article Editor Modal ========== -->
    <Transition name="modal">
      <div v-if="isArticleEditorOpen" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeArticleEditor"></div>

        <!-- Modal Panel -->
        <div class="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-[#045F54] to-[#0D9488] px-6 py-5 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-extrabold text-white">
                {{ editingArticle?.id ? '✏️ แก้ไขบทความ' : '📝 สร้างบทความใหม่' }}
              </h3>
              <p class="text-xs text-[#D1FAE5] mt-0.5">กรอกข้อมูลบทความที่ต้องการเผยแพร่</p>
            </div>
            <button @click="closeArticleEditor" class="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Modal Body (scrollable) -->
          <div class="overflow-y-auto p-6 space-y-5 flex-1">

            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">ชื่อบทความ <span class="text-rose-500">*</span></label>
              <input
                v-model="articleForm.title"
                type="text"
                placeholder="ใส่หัวข้อบทความ..."
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition"
              />
              <p v-if="formErrors.title" class="text-xs text-rose-500 mt-1">{{ formErrors.title }}</p>
            </div>

            <!-- Category + Author row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">หมวดหมู่ <span class="text-rose-500">*</span></label>
                <select
                  v-model="articleForm.category"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition bg-white"
                >
                  <option value="">-- เลือกหมวดหมู่ --</option>
                  <option value="STRESS">STRESS</option>
                  <option value="DEPRESSION">DEPRESSION</option>
                  <option value="ANXIETY">ANXIETY</option>
                  <option value="SELF-CARE">SELF-CARE</option>
                  <option value="EMERGENCY">EMERGENCY</option>
                  <option value="MINDFULNESS">MINDFULNESS</option>
                </select>
                <p v-if="formErrors.category" class="text-xs text-rose-500 mt-1">{{ formErrors.category }}</p>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">แหล่งที่มา (ถ้ามี)</label>
                <input
                  v-model="articleForm.sourceName"
                  type="text"
                  placeholder="เช่น กรมสุขภาพจิต"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition"
                />
              </div>
            </div>

            <!-- Excerpt -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">บทคัดย่อ / Preview</label>
              <textarea
                v-model="articleForm.excerpt"
                rows="2"
                placeholder="ใส่ข้อความสั้นๆ ที่จะแสดงในหน้ารายการบทความ..."
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition resize-none"
              ></textarea>
            </div>

            <!-- Content -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">เนื้อหาบทความ <span class="text-rose-500">*</span></label>
              <textarea
                v-model="articleForm.content"
                rows="8"
                placeholder="เขียนเนื้อหาบทความที่นี่..."
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition resize-y"
              ></textarea>
              <p v-if="formErrors.content" class="text-xs text-rose-500 mt-1">{{ formErrors.content }}</p>
            </div>

            <!-- Cover Image URL -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">URL รูปปก (ถ้ามี)</label>
              <input
                v-model="articleForm.coverImageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition"
              />
            </div>

            <!-- Preview card -->
            <div v-if="articleForm.title || articleForm.content" class="border border-dashed border-[#0D9488]/30 rounded-2xl p-4 bg-[#F0FDF9]">
              <p class="text-xs font-bold text-[#0D9488] mb-2 uppercase tracking-wider">👁 ตัวอย่างการ์ด</p>
              <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div class="flex items-center gap-2 mb-2">
                  <span v-if="articleForm.category" :class="categoryColor(articleForm.category)" class="px-2 py-0.5 rounded-full text-[10px] font-bold border">
                    {{ articleForm.category }}
                  </span>
                  <span class="text-[10px] text-gray-400">{{ todayDateFormatted }}</span>
                </div>
                <p class="font-bold text-sm text-gray-800 line-clamp-2">{{ articleForm.title || 'ชื่อบทความ...' }}</p>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ articleForm.excerpt || articleForm.content || 'เนื้อหาบทความ...' }}</p>
              </div>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <p class="text-xs text-gray-400">⚠️ ข้อมูลที่มีเครื่องหมาย <span class="text-rose-500 font-bold">*</span> ต้องกรอก</p>
            <div class="flex gap-3">
              <button
                @click="closeArticleEditor"
                class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-100 transition cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                @click="saveArticle"
                class="px-6 py-2.5 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl text-sm font-bold hover:opacity-90 transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ editingArticle?.id ? 'บันทึกการแก้ไข' : 'เผยแพร่บทความ' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirm Modal -->
    <Transition name="modal">
      <div v-if="isDeleteConfirmOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="isDeleteConfirmOpen = false"></div>
        <div class="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
          <div class="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 mb-2">ยืนยันการลบ?</h3>
          <p class="text-sm text-gray-500 mb-6">บทความนี้จะถูกลบถาวร ไม่สามารถกู้คืนได้</p>
          <div class="flex gap-3">
            <button @click="isDeleteConfirmOpen = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer">ยกเลิก</button>
            <button @click="executeDeleteArticle" class="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition cursor-pointer">🗑 ลบเลย</button>
          </div>
        </div>
      </div>
    </Transition>

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

    <!-- Emergency Crisis Alert Hotline Modal (Rose Theme, 1323 Hotline, Red Backdrop) -->
    <div v-if="isHotlineModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-xs" @click="isHotlineModalOpen = false"></div>
      
      <div class="relative bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-rose-200 transform scale-100 transition-transform duration-300">
        <!-- Banner Header (Red/Rose) -->
        <div class="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-500 p-6 text-white text-center">
          <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 animate-pulse">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold uppercase tracking-wide">Crisis Action Required</h3>
          <p class="text-xs text-rose-100 mt-1">Severe mental distress flagged. Immediate intervention protocol.</p>
        </div>

        <!-- Details -->
        <div class="p-6 space-y-4">
          <div class="bg-rose-50 border border-rose-100 p-4 rounded-2xl text-rose-800 text-xs">
            <p class="font-bold mb-1">User Details:</p>
            <p><strong>Username:</strong> {{ activeAlertUser.username }}</p>
            <p><strong>Email:</strong> {{ activeAlertUser.email }}</p>
            <p class="mt-2 text-rose-700 italic">"ผลการคัดกรองสุขภาพจิตของผู้ใช้ระบุว่ามีความเครียดหรือความทุกข์ใจในระดับสูง ควรส่งต่อให้กับบริการฉุกเฉิน"</p>
          </div>

          <!-- Hotline details -->
          <div class="text-center py-2 space-y-2">
            <span class="text-xs text-gray-500 uppercase tracking-widest font-bold">Mental Health Hotline Thailand</span>
            <div class="text-4xl font-extrabold text-rose-600 tracking-wider">📞 1323</div>
            <p class="text-xs text-gray-400">"เปิดให้บริการตลอด 24 ชั่วโมงทุกวัน"</p>
          </div>

          <!-- Action buttons -->
          <div class="flex gap-3">
            <a href="tel:1323" class="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold text-center transition shadow-md">
              โทร 1323 Now
            </a>
            <button @click="isHotlineModalOpen = false" class="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold text-center transition cursor-pointer">
              Close Panel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Inspector Log removed per request -->

  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

// Inject global dark mode state from App.vue
const isDarkMode = inject('isDarkMode', ref(false))

// Formatting date
const currentDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('th-TH', options)
})

// Statistics Overview
const mockStats = ref({
  totalUsers: 142,
  assessmentsCompleted: 3248,
  severeCases: 2,
  avgScore: '14.2'
})

// User Account list mock data
const mockUsers = ref([
  { id: 1, username: 'Ohm Dev', email: 'ohm.dev@dmhab.com', role: 'ADMIN', joined: '10 ม.ค. 2026' },
  { id: 2, username: 'Somying', email: 'somying@gmail.com', role: 'USER', joined: '22 ก.พ. 2026' },
  { id: 3, username: 'Naphatsorn', email: 'naphat@gmail.com', role: 'USER', joined: '01 มี.ค. 2026' },
  { id: 4, username: 'Gi', email: 'Gikung@dmhab.com', role: 'ADMIN', joined: '15 มี.ค. 2026' },
  { id: 5, username: 'Vichai', email: 'vichai45@outlook.com', role: 'USER', joined: '12 เม.ย. 2026' },
  { id: 6, username: 'Nalintip', email: 'nalintip56@gmail.com', role: 'USER', joined: '30 เม.ย. 2026' }
])

// Severe cases alerts (Mental Health 1323 Hotline triggers)
const severeAlerts = ref([
  { id: 101, username: 'Somying', email: 'somying@gmail.com', score: 19, date: '28 ส.ค. 2026 (14:35)' },
  { id: 102, username: 'Vichai', email: 'vichai45@outlook.com', score: 17, date: '28 ส.ค. 2026 (11:12)' }
])

// Chat session list mock logs
const mockSessions = ref([
  { id: 1241, username: 'Somying', mood: 'SEVERE', lastMessage: 'รู้สึกเครียดมาก นอนไม่หลับมาหลายวันแล้ว งานก็เยอะไปหมด ไม่อยากทำอะไรเลย ท้อแท้มากๆ ครับ', time: '10 นาทีที่แล้ว' },
  { id: 1240, username: 'Naphatsorn', mood: 'MODERATE', lastMessage: 'ช่วงนี้กังวลเรื่องสอบและอนาคต รู้สึกใจสั่นบ่อยๆ เวลาคิดถึงเรื่องนี้', time: '45 นาทีที่แล้ว' },
  { id: 1239, username: 'Vichai', mood: 'SEVERE', lastMessage: 'ไม่อยากมีชีวิตอยู่ต่อแล้ว รู้สึกเป็นภาระให้คนอื่นไปหมด ทุกอย่างดูมืดมนมากครับ', time: '2 ชั่วโมงที่แล้ว' },
  { id: 1238, username: 'Prapasiri', mood: 'MILD', lastMessage: 'วันนี้อารมณ์ดีขึ้นนิดหน่อย เพราะได้ออกไปคุยกับสุนัขที่บ้านมาค่ะ', time: '4 ชั่วโมงที่แล้ว' },
  { id: 1237, username: 'Somchai', mood: 'MILD', lastMessage: 'สวัสดีครับ แวะมาเช็คอินอารมณ์เฉยๆ วันนี้โอเคดีครับ', time: '1 วันที่แล้ว' }
])

// Articles management mock data
const mockArticles = ref([
  { id: 1, category: 'STRESS', title: '5 วิธีจัดการความเครียดในการทำงานระดับ Burnout', content: 'Burnout หรือภาวะหมดไฟในการทำงาน เกิดขึ้นจากความเครียดเรื้อรังที่ไม่ได้แก้ วิธีจัดการคือ การกำหนดขอบเขตงาน ชื่นชมความสำเร็จเล็กๆ และปรึกษาผู้เชี่ยวชาญ...', date: '26 ก.ค. 2026', authorId: 1 },
  { id: 2, category: 'DEPRESSION', title: 'ความเข้าใจผิดเรื่องโรคซึมเศร้า และข้อเท็จจริงทางการแพทย์', content: 'โรคซึมเศร้าไม่ใช่เพียงความอ่อนแอทางอารมณ์ แต่เกิดจากสารเคมีในสมองที่ไม่สมดุล ผู้ป่วยต้องการความเข้าใจ การประคับประคอง และการรักษาทางการแพทย์ที่ถูกต้อง...', date: '24 ก.ค. 2026', authorId: 4 },
  { id: 3, category: 'EMERGENCY', title: 'ช่องทางและสายด่วนช่วยเหลือเมื่อรู้สึกไม่ไหว', content: 'หากคุณต้องการใครสักคนที่คอยรับฟังและแนะนำในชั่วโมงที่มืดมนที่สุด สายด่วนสุขภาพจิต 1323 คือที่พึ่งฟรีตลอด 24 ชั่วโมง หรือติดต่อสายด่วนสมาคมสะมาริตันส์...', date: '10 ก.ค. 2026', authorId: 1 }
])

// Search Query model
const searchQuery = ref('')

// Computed filtered user list
const filteredUsers = computed(() => {
  if (!searchQuery.value) return mockUsers.value
  const query = searchQuery.value.toLowerCase().trim()
  return mockUsers.value.filter(user => 
    user.username.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query)
  )
})

// Action: Dismiss severe alert
const dismissAlert = (id) => {
  severeAlerts.value = severeAlerts.value.filter(alert => alert.id !== id)
  mockStats.value.severeCases = severeAlerts.value.length
}

// Action: Toggle user roles between USER and ADMIN
const toggleUserRole = (user) => {
  user.role = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
}

// Action: Delete user
const deleteUser = (id) => {
  mockUsers.value = mockUsers.value.filter(user => user.id !== id)
  mockStats.value.totalUsers = mockUsers.value.length
}

// ==================== Article Editor ====================
const isArticleEditorOpen = ref(false)
const editingArticle = ref(null)
const articleForm = ref({ title: '', category: '', excerpt: '', content: '', sourceName: '', coverImageUrl: '' })
const formErrors = ref({})

// Article delete confirm
const isDeleteConfirmOpen = ref(false)
const articleToDeleteId = ref(null)

// Success toast
const showSuccessToast = ref(false)
const toastMessage = ref('')
let toastTimer = null

const todayDateFormatted = computed(() => {
  return new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
})

function openArticleEditor(article) {
  editingArticle.value = article ? { ...article } : null
  formErrors.value = {}
  if (article) {
    articleForm.value = {
      title: article.title || '',
      category: article.category || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      sourceName: article.sourceName || '',
      coverImageUrl: article.coverImageUrl || ''
    }
  } else {
    articleForm.value = { title: '', category: '', excerpt: '', content: '', sourceName: '', coverImageUrl: '' }
  }
  isArticleEditorOpen.value = true
}

function closeArticleEditor() {
  isArticleEditorOpen.value = false
  editingArticle.value = null
  formErrors.value = {}
}

function validateArticleForm() {
  const errors = {}
  if (!articleForm.value.title.trim()) errors.title = 'กรุณาใส่ชื่อบทความ'
  if (!articleForm.value.category) errors.category = 'กรุณาเลือกหมวดหมู่'
  if (!articleForm.value.content.trim()) errors.content = 'กรุณาใส่เนื้อหาบทความ'
  formErrors.value = errors
  return Object.keys(errors).length === 0
}

function saveArticle() {
  if (!validateArticleForm()) return

  const now = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })

  if (editingArticle.value?.id) {
    // Edit existing
    const idx = mockArticles.value.findIndex(a => a.id === editingArticle.value.id)
    if (idx !== -1) {
      mockArticles.value[idx] = {
        ...mockArticles.value[idx],
        title: articleForm.value.title,
        category: articleForm.value.category,
        excerpt: articleForm.value.excerpt,
        content: articleForm.value.content,
        sourceName: articleForm.value.sourceName,
        coverImageUrl: articleForm.value.coverImageUrl,
        date: now
      }
    }
    toastMessage.value = 'แก้ไขบทความสำเร็จ'
  } else {
    // Create new
    const newId = (mockArticles.value.length > 0 ? Math.max(...mockArticles.value.map(a => a.id)) : 0) + 1
    mockArticles.value.unshift({
      id: newId,
      title: articleForm.value.title,
      category: articleForm.value.category,
      excerpt: articleForm.value.excerpt,
      content: articleForm.value.content,
      sourceName: articleForm.value.sourceName,
      coverImageUrl: articleForm.value.coverImageUrl,
      date: now,
      authorId: 1
    })
    toastMessage.value = 'สร้างบทความใหม่สำเร็จ'
  }

  closeArticleEditor()
  triggerSuccessToast()
}

function triggerSuccessToast() {
  if (toastTimer) clearTimeout(toastTimer)
  showSuccessToast.value = true
  toastTimer = setTimeout(() => { showSuccessToast.value = false }, 3000)
}

function confirmDeleteArticle(id) {
  articleToDeleteId.value = id
  isDeleteConfirmOpen.value = true
}

function executeDeleteArticle() {
  const idx = mockArticles.value.findIndex(art => art.id === articleToDeleteId.value)
  if (idx !== -1) mockArticles.value.splice(idx, 1)
  isDeleteConfirmOpen.value = false
  articleToDeleteId.value = null
  toastMessage.value = 'ลบบทความสำเร็จ'
  triggerSuccessToast()
}

// Legacy deleteArticle kept for safety
const deleteArticle = (id) => confirmDeleteArticle(id)

// Category badge color helper
function categoryColor(cat) {
  const map = {
    STRESS: 'bg-amber-50 text-amber-600 border-amber-200',
    DEPRESSION: 'bg-blue-50 text-blue-600 border-blue-200',
    ANXIETY: 'bg-purple-50 text-purple-600 border-purple-200',
    'SELF-CARE': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    EMERGENCY: 'bg-rose-50 text-rose-600 border-rose-200',
    MINDFULNESS: 'bg-teal-50 text-teal-600 border-teal-200',
  }
  return map[cat] || 'bg-gray-100 text-gray-600 border-gray-200'
}

// Crisis Hotline Modal controller states
const isHotlineModalOpen = ref(false)
const activeAlertUser = ref({})

const triggerHotlineModal = (user) => {
  activeAlertUser.value = user
  isHotlineModalOpen.value = true
}

// Inspector log modal removed — no-op for Inspect Log
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

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
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
