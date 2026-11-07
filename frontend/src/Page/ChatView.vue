<template>
  <div
    :class="[
      'chat-page page-dark-surface flex h-screen bg-[#FAF9F5] text-[#1E293B] relative overflow-hidden',
      isDarkMode ? 'dark-mode-page' : ''
    ]"
  >
    <!-- Mobile History Drawer Backdrop -->
    <div
      v-if="isMobileHistoryOpen"
      @click="isMobileHistoryOpen = false"
      class="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
    ></div>

    <!-- History Sidebar (Desktop static + Mobile drawer) -->
    <aside
      :class="[
        'history-sidebar fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-teal-100 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shrink-0',
        isMobileHistoryOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar Header -->
      <div class="px-4 py-3.5 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="font-bold text-sm sm:text-base tracking-wide">{{ $t('chat.history.title') }}</h2>
        </div>

        <button
          type="button"
          @click="isMobileHistoryOpen = false"
          class="p-1.5 rounded-full hover:bg-black/15 text-white lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Start New Topic Button -->
      <div class="p-3 border-b border-teal-100/80 shrink-0">
        <button
          type="button"
          @click="goToTopicPicker"
          class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#059669] hover:from-[#045F54] hover:to-[#0D9488] text-white text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>{{ $t('chat.history.newChat') }}</span>
        </button>
      </div>

      <!-- Session History List -->
      <div class="flex-1 overflow-y-auto p-3 space-y-2">
        <div
          v-if="isLoadingHistory"
          class="py-10 text-center text-xs text-slate-400"
        >
          {{ $t('chat.loading.history') }}
        </div>

        <div
          v-else-if="historySessions.length === 0"
          class="py-10 px-4 text-center text-xs text-slate-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 mx-auto mb-2 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <p>{{ $t('chat.history.empty') }}</p>
        </div>

        <div
          v-for="item in historySessions"
          :key="item.id"
          @click="selectHistorySession(item.id)"
          :class="[
            'history-item group rounded-xl p-3 border cursor-pointer transition-all relative',
            Number(currentSessionId) === Number(item.id)
              ? 'bg-teal-50/90 border-[#0D9488] shadow-xs history-item-active'
              : 'bg-white border-slate-100 hover:border-teal-200 hover:bg-teal-50/40'
          ]"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-8 h-8 rounded-lg bg-teal-100/80 text-[#045F54] flex items-center justify-center shrink-0 history-topic-icon">
                <!-- Topic Line SVG -->
                <svg v-if="item.topic === 'love'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <svg v-else-if="item.topic === 'study'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <svg v-else-if="item.topic === 'work'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="item.topic === 'family'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V19a1 1 0 001 1h12a1 1 0 001-1V9.5" />
                </svg>
                <svg v-else-if="item.topic === 'money'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h13a2 2 0 012 2v2h-4a2 2 0 000 4h4v4a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
                <svg v-else-if="item.topic === 'friends'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg v-else-if="item.topic === 'self'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z" />
                </svg>
                <svg v-else-if="item.topic === 'sleep'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>

              <div class="min-w-0">
                <p class="text-xs font-bold text-[#1E293B] truncate">
                  {{ getTopicLabel(item.topic) }}
                </p>
                <p class="text-[11px] text-slate-400">
                  {{ formatDateShort(item.createdAt) }}
                </p>
              </div>
            </div>

            <!-- Delete Session Button (opens confirm modal) -->
            <button
              type="button"
              @click.stop="openDeleteConfirm(item)"
              class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
              :title="$t('chat.history.deleteTooltip')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <p class="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {{ item.summary || item.lastMessage || $t('chat.greeting') }}
          </p>

          <div class="mt-2 flex items-center justify-between">
            <span
              :class="[
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold',
                item.status === 'COMPLETED'
                  ? 'bg-emerald-100 text-[#045F54] status-pill-completed'
                  : 'bg-amber-100 text-amber-800 status-pill-active'
              ]"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="item.status === 'COMPLETED' ? 'bg-[#059669]' : 'bg-amber-500'"
              ></span>
              {{ item.status === 'COMPLETED' ? $t('chat.history.statusCompleted') : $t('chat.history.statusInProgress') }}
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Right Column (Header + Chat/Advice Area + Guided/Input Footer) -->
    <div class="flex-1 flex flex-col min-w-0 h-full relative">
      <!-- Top Header -->
      <header class="flex items-center justify-between px-3 sm:px-5 py-3 bg-white border-b border-teal-100 shadow-xs shrink-0 gap-2">
        <div class="flex items-center min-w-0 gap-1.5 sm:gap-2.5">
          <!-- Back Home -->
          <button
            type="button"
            @click="$router.push('/')"
            class="p-2 text-slate-500 hover:text-[#045F54] hover:bg-teal-50 rounded-full transition-colors shrink-0"
            :title="$t('chat.advice.homeBtn')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <!-- Mobile History Drawer Toggle -->
          <button
            type="button"
            @click="isMobileHistoryOpen = true"
            class="p-2 text-[#045F54] hover:bg-teal-50 rounded-full transition-colors lg:hidden shrink-0"
            :title="$t('chat.history.title')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h10" />
            </svg>
          </button>

          <!-- Bot Line SVG Avatar -->
          <div class="h-10 w-10 bg-gradient-to-br from-teal-100 to-emerald-100 border border-teal-200 text-[#045F54] rounded-full flex items-center justify-center shrink-0 bot-avatar-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m-6 7a6 6 0 0112 0v3a3 3 0 01-3 3H9a3 3 0 01-3-3v-3z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 12v2a2 2 0 002 2M20 12v2a2 2 0 01-2 2M9.5 12.5h.01M14.5 12.5h.01M10 15.5c.6.5 1.3.75 2 .75s1.4-.25 2-.75" />
            </svg>
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-sm sm:text-base font-bold text-[#1E293B] truncate">
                {{ $t('chat.botName') }}
              </h1>
              <span
                v-if="currentTopic"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-[#045F54] border border-teal-200 topic-header-pill"
              >
                {{ getTopicLabel(currentTopic) }}
              </span>
            </div>
            <p class="text-[11px] text-slate-500 truncate">{{ $t('chat.noRealName') }}</p>
            <p class="text-[11px] text-[#059669] flex items-center">
              <span class="w-2 h-2 bg-[#059669] rounded-full mr-1.5"></span>
              {{ $t('chat.online') }}
            </p>
          </div>
        </div>

        <!-- Right Header Actions: Cloud End Button + View Summary + LanguageSwitcher -->
        <div class="flex items-center gap-2 shrink-0">
          <!-- ปุ่มจบสนทนารูปก้อนเมฆ (แสดงเมื่อเซสชันยังไม่จบ) -->
          <button
            v-if="currentSessionId && !isCompleted"
            type="button"
            @click="openEndConfirmModal"
            class="cloud-end-btn group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-[#045F54] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            :title="$t('chat.endChat.cloudSub')"
          >
            <!-- Cloud Line SVG Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-[#0D9488] group-hover:text-[#045F54] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span>{{ $t('chat.endChat.cloudBtn') }}</span>
          </button>

          <!-- ปุ่มสลับดูหน้าคำแนะนำเมื่อเซสชันจบแล้ว -->
          <button
            v-if="isCompleted && summaryDetail && !showAdviceScreen"
            type="button"
            @click="showAdviceScreen = true"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#0D9488] to-[#059669] text-white shadow-xs hover:opacity-95 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="hidden sm:inline">{{ $t('chat.advice.viewSummaryBtn') }}</span>
          </button>

          <button
            type="button"
            @click="isDarkMode = !isDarkMode"
            class="p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
            :title="isDarkMode ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'"
          >
            <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <div
            :class="[
              'bg-[#045F54] rounded-full flex items-center gap-1',
              isTranslatingMessages ? 'opacity-70 pointer-events-none' : ''
            ]"
          >
            <svg
              v-if="isTranslatingMessages"
              class="animate-spin h-3.5 w-3.5 text-emerald-200 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <!-- Subbar: View First 5 Answers Collapsible (เมื่อมีคำตอบแล้ว) -->
      <div
        v-if="!showAdviceScreen && sessionAnswers.length > 0"
        class="bg-teal-50/70 border-b border-teal-100 px-4 py-2 shrink-0 answers-bar"
      >
        <div class="max-w-4xl mx-auto">
          <button
            type="button"
            @click="showAnswersDrawer = !showAnswersDrawer"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#045F54] hover:text-[#0D9488] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>
              {{
                showAnswersDrawer
                  ? $t('chat.guided.answersToggleHide')
                  : $t('chat.guided.answersToggleShow', { count: sessionAnswers.length })
              }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 transition-transform"
              :class="showAnswersDrawer ? 'rotate-180' : ''"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div v-if="showAnswersDrawer" class="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 pb-1 max-h-44 overflow-y-auto">
            <div
              v-for="ans in sessionAnswers"
              :key="ans.questionNo"
              class="bg-white rounded-xl p-2.5 border border-teal-100 text-xs shadow-2xs answer-summary-card"
            >
              <p class="font-semibold text-[#045F54] mb-0.5">
                {{ $t('chat.guided.questionPrefix', { no: ans.questionNo }) }}: {{ ans.questionText }}
              </p>
              <p class="text-slate-600">{{ ans.answerText }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW A: หน้าคำแนะนำหลังจบสนทนา (ไม่มีคะแนนดิบ มีเฉพาะสรุป + สิ่งที่ลองทำได้ตามบริบท) -->
      <main
        v-if="showAdviceScreen && summaryDetail"
        class="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-10"
      >
        <div class="max-w-3xl mx-auto space-y-6">
          <!-- Hero Summary Card -->
          <div class="bg-white rounded-3xl shadow-md border border-teal-100 overflow-hidden advice-card">
            <div class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] px-6 py-6 text-white">
              <div class="flex items-center gap-2 text-emerald-100 text-xs font-semibold mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ $t('chat.advice.badge') }}</span>
                <span v-if="currentTopic" class="px-2 py-0.5 rounded-full bg-black/20 text-white">
                  {{ getTopicLabel(currentTopic) }}
                </span>
              </div>
              <h2 class="text-xl sm:text-2xl font-extrabold leading-snug">
                {{ $t('chat.advice.title') }}
              </h2>
            </div>

            <div class="p-6 sm:p-8 space-y-6">
              <!-- สรุปภาพรวม (ไม่มีตัวเลขคะแนนดิบ) -->
              <section class="bg-teal-50/70 border border-teal-200/70 rounded-2xl p-5 advice-overview-box">
                <h3 class="text-sm font-bold text-[#045F54] mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>{{ $t('chat.advice.overviewLabel') }}</span>
                </h3>
                <p class="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {{ summaryDetail.overview }}
                </p>
              </section>

              <!-- สิ่งที่ลองทำได้แบบปรับตามบริบทการคุย -->
              <section>
                <div class="mb-3">
                  <h3 class="text-base sm:text-lg font-bold text-[#1E293B] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ $t('chat.advice.stepsLabel') }}</span>
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5">{{ $t('chat.advice.stepsHint') }}</p>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="(step, idx) in summaryDetail.actionable_steps"
                    :key="idx"
                    class="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-emerald-100 shadow-2xs advice-step-card"
                  >
                    <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#0D9488] to-[#059669] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {{ idx + 1 }}
                    </div>
                    <div>
                      <h4 class="text-sm sm:text-base font-bold text-[#045F54] mb-1">
                        {{ step.title }}
                      </h4>
                      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {{ step.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- กำลังใจส่งท้าย -->
              <section
                v-if="summaryDetail.encouragement"
                class="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/70 advice-encouragement-box"
              >
                <p class="text-xs font-bold text-[#045F54] mb-1">{{ $t('chat.advice.encouragementLabel') }}</p>
                <p class="text-sm text-slate-700 leading-relaxed">
                  {{ summaryDetail.encouragement }}
                </p>
              </section>

              <p class="text-xs text-slate-400 leading-relaxed text-center">
                {{ $t('chat.advice.helplineNote') }}
              </p>

              <!-- บล็อกเก็บ Feedback 3 ระดับหลังจบสนทนา -->
              <div v-if="!feedbackSubmitted" class="bg-white/60 border border-teal-100 rounded-2xl p-4 mb-4 text-center feedback-box">
                <p class="text-sm font-medium text-[#045F54] mb-3">{{ t('chat.summary.feedbackQuestion') }}</p>
                <div class="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    :disabled="feedbackSubmitting"
                    @click="submitFeedback('HELPFUL')"
                    class="feedback-choice-btn flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#045F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.264 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-7m-2 10H5a2 2 0 01-2-2v-6a2 2 0 012-2h2v10z" />
                    </svg>
                    <span class="text-xs text-[#045F54]">{{ t('chat.summary.feedbackHelpful') }}</span>
                  </button>
                  <button
                    type="button"
                    :disabled="feedbackSubmitting"
                    @click="submitFeedback('SOMEWHAT')"
                    class="feedback-choice-btn flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#045F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <circle cx="12" cy="12" r="9" />
                      <path stroke-linecap="round" d="M8 15h8M9 9h.01M15 9h.01" />
                    </svg>
                    <span class="text-xs text-[#045F54]">{{ t('chat.summary.feedbackSomewhat') }}</span>
                  </button>
                  <button
                    type="button"
                    :disabled="feedbackSubmitting"
                    @click="submitFeedback('NOT_HELPFUL')"
                    class="feedback-choice-btn flex flex-col items-center gap-1 px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#045F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.017c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h7m2-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2V4z" />
                    </svg>
                    <span class="text-xs text-[#045F54]">{{ t('chat.summary.feedbackNotHelpful') }}</span>
                  </button>
                </div>
                <button type="button" @click="skipFeedback" class="mt-2 text-xs text-gray-400 underline hover:text-slate-600">
                  {{ t('chat.summary.feedbackSkip') }}
                </button>
              </div>

              <div v-else-if="feedbackRating === 'NOT_HELPFUL'" class="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-4 text-center feedback-crisis-box">
                <p class="text-sm text-rose-700 mb-2 feedback-crisis-text">{{ t('chat.summary.feedbackCrisisPrompt') }}</p>
                <a href="tel:1323" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ t('chat.summary.feedbackCrisisButton') }}
                </a>
              </div>

              <div v-else class="text-center text-sm text-[#045F54]/70 mb-4 feedback-thanks-text">
                {{ t('chat.summary.feedbackThanks') }}
              </div>

              <!-- ปุ่มดำเนินการต่อ -->
              <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  @click="showAdviceScreen = false"
                  class="w-full sm:w-auto px-5 py-2.5 rounded-full border border-teal-300 text-[#045F54] hover:bg-teal-50 text-sm font-semibold transition-colors"
                >
                  {{ $t('chat.advice.backToChatBtn') }}
                </button>
                <button
                  type="button"
                  @click="goToTopicPicker"
                  class="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0D9488] to-[#059669] hover:from-[#045F54] hover:to-[#0D9488] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  {{ $t('chat.advice.newTopicBtn') }}
                </button>
                <button
                  type="button"
                  @click="$router.push('/')"
                  class="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
                >
                  {{ $t('chat.advice.homeBtn') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- VIEW B: หน้าห้องสนทนา -->
      <main
        v-else
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
      >
        <div
          v-if="isInitializingSession"
          class="py-16 text-center text-sm text-slate-400"
        >
          {{ $t('chat.loading.initializing') }}
        </div>

        <template v-else>
          <div
            v-for="(msg, index) in messages"
            :key="msg.id || index"
            class="flex max-w-4xl mx-auto"
            :class="msg.sender === 'USER' ? 'justify-end' : 'justify-start'"
          >
            <!-- Bot Line SVG Avatar -->
            <div
              v-if="msg.sender === 'BOT'"
              class="h-8 w-8 bg-teal-100 border border-teal-200 text-[#045F54] rounded-full flex items-center justify-center mr-2.5 shrink-0 self-end mb-1 bot-avatar-circle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m-6 7a6 6 0 0112 0v3a3 3 0 01-3 3H9a3 3 0 01-3-3v-3z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 12v2a2 2 0 002 2M20 12v2a2 2 0 01-2 2M9.5 12.5h.01M14.5 12.5h.01M10 15.5c.6.5 1.3.75 2 .75s1.4-.25 2-.75" />
              </svg>
            </div>

            <!-- Message Bubble -->
            <div
              class="max-w-[82%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-xs relative group"
              :class="
                msg.sender === 'USER'
                  ? 'bg-gradient-to-br from-[#045F54] to-[#0D9488] text-white rounded-br-none user-bubble'
                  : 'bg-white text-slate-800 rounded-bl-none border border-teal-100 bot-bubble'
              "
            >
              <p class="text-sm md:text-base whitespace-pre-wrap leading-relaxed">{{ msg.text }}</p>
              <div class="flex items-center justify-between mt-1.5 gap-2">
                <button
                  v-if="msg.sender === 'BOT'"
                  type="button"
                  @click="toggleSpeak(msg.text, index)"
                  class="text-slate-400 hover:text-[#0D9488] focus:outline-none transition-colors"
                  :title="$t('chat.readAloud')"
                >
                  <svg v-if="playingMessageIndex !== index" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 10v4a2 2 0 002 2h2.586l4.707 4.707A.996.996 0 0015 20V4a.996.996 0 00-1.707-.707L9.586 8H7a2 2 0 00-2 2z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#0D9488] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </button>
                <p
                  class="text-[10px] ml-auto"
                  :class="msg.sender === 'USER' ? 'text-emerald-100' : 'text-slate-400'"
                >
                  {{ formatTime(msg.timestamp) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isSending" class="flex justify-start max-w-4xl mx-auto">
            <div class="h-8 w-8 bg-teal-100 border border-teal-200 text-[#045F54] rounded-full flex items-center justify-center mr-2.5 shrink-0 self-end mb-1 bot-avatar-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m-6 7a6 6 0 0112 0v3a3 3 0 01-3 3H9a3 3 0 01-3-3v-3z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 12.5h.01M14.5 12.5h.01M10 15.5c.6.5 1.3.75 2 .75s1.4-.25 2-.75" />
              </svg>
            </div>
            <div class="bg-white border border-teal-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-xs flex items-center gap-1.5 bot-bubble">
              <span class="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce"></span>
              <span class="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 rounded-full bg-[#0D9488] animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </template>
      </main>

      <!-- Guided 5-Question Choice Panel (ช่วงที่ 1: ถามทีละข้อจาก 5 คำถาม เลือกตัวเลือกหรือพิมพ์เองได้) -->
      <section
        v-if="!showAdviceScreen && !isCompleted && currentPhase === 'QUESTIONS' && currentQuestion"
        class="bg-white border-t border-teal-100 px-4 py-3 shrink-0 guided-panel"
      >
        <div class="max-w-4xl mx-auto">
          <!-- Progress Row (สไตล์เดียวกับ flow ถามทีละข้อ) -->
          <div class="flex items-center justify-between gap-3 mb-2">
            <span class="inline-flex items-center gap-1.5 text-xs font-bold text-[#045F54]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#0D9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ $t('chat.guided.stepBadge', { current: currentQuestion.questionNo, total: totalQuestions }) }}
            </span>
            <div class="flex items-center gap-1.5">
              <span
                v-for="step in totalQuestions"
                :key="step"
                class="h-1.5 w-6 sm:w-8 rounded-full transition-colors"
                :class="step <= currentQuestion.questionNo ? 'bg-[#0D9488]' : 'bg-teal-100'"
              ></span>
            </div>
          </div>

          <p class="text-xs text-slate-500 mb-2.5">
            {{ $t('chat.guided.chooseOrType') }}
          </p>

          <!-- Choice Buttons -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              v-for="(opt, idx) in currentQuestion.options"
              :key="idx"
              type="button"
              :disabled="isSending"
              @click="submitGuidedOption(opt)"
              class="guided-option-btn text-left px-3.5 py-2.5 rounded-xl border border-teal-200/90 bg-teal-50/50 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] text-xs sm:text-sm font-medium text-[#1E293B] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between gap-2"
            >
              <span>{{ opt.label }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Free-Chat Quick Chips (แสดงหลังจบ 5 คำถามแรก) -->
      <div
        v-else-if="!showAdviceScreen && !isCompleted && currentPhase === 'FREE_CHAT' && messages.length > 0 && messages[messages.length - 1].sender === 'BOT'"
        class="bg-white px-4 py-2 border-t border-teal-100 flex overflow-x-auto whitespace-nowrap gap-2 shrink-0 scrollbar-hide"
      >
        <div class="max-w-4xl mx-auto flex gap-2">
          <button
            v-for="(chip, index) in suggestedChips"
            :key="index"
            type="button"
            :disabled="isSending"
            @click="sendChip(chip)"
            class="whitespace-nowrap px-4 py-1.5 bg-teal-50 text-[#045F54] text-xs sm:text-sm font-medium rounded-full hover:bg-teal-100 transition-colors border border-teal-200 focus:outline-none focus:ring-2 focus:ring-[#0D9488] chip-btn"
          >
            {{ chip }}
          </button>
        </div>
      </div>

      <!-- Bottom Input Bar -->
      <footer
        v-if="!showAdviceScreen"
        class="bg-white border-t border-teal-100 p-3 sm:p-4 shrink-0 relative"
      >
        <div v-if="isCompleted" class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs sm:text-sm text-slate-500 mb-2">
          <span>{{ $t('chat.completed') }}</span>
          <div class="flex items-center gap-2">
            <button
              v-if="summaryDetail"
              type="button"
              @click="showAdviceScreen = true"
              class="px-3.5 py-1.5 rounded-full bg-teal-50 text-[#045F54] border border-teal-200 font-semibold text-xs hover:bg-teal-100 transition"
            >
              {{ $t('chat.advice.viewSummaryBtn') }}
            </button>
            <button
              type="button"
              @click="goToTopicPicker"
              class="px-3.5 py-1.5 rounded-full bg-[#0D9488] text-white font-semibold text-xs hover:bg-[#045F54] transition"
            >
              {{ $t('chat.advice.newTopicBtn') }}
            </button>
          </div>
        </div>

        <form @submit.prevent="sendMessage()" class="flex items-center space-x-2 max-w-4xl mx-auto">
          <div class="relative flex-1">
            <input
              v-model="newMessage"
              type="text"
              :placeholder="
                isCompleted
                  ? $t('chat.ended')
                  : currentPhase === 'QUESTIONS'
                    ? $t('chat.customAnswerPlaceholder')
                    : $t('chat.placeholder')
              "
              :disabled="isCompleted || isSending"
              class="w-full pl-4 pr-12 py-3 bg-slate-100 border border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all outline-none disabled:opacity-60 disabled:bg-slate-200 disabled:cursor-not-allowed text-sm sm:text-base chat-input"
              :required="!isRecording"
            />
            <button
              type="button"
              @click="toggleRecording"
              :disabled="isCompleted || isSending"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none transition-colors"
              :class="
                isRecording
                  ? 'text-rose-500 bg-rose-50 hover:bg-rose-100 animate-pulse'
                  : 'text-slate-400 hover:text-[#0D9488] hover:bg-teal-50'
              "
              :title="$t('chat.speakToType')"
            >
              <svg v-if="!isRecording" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </button>
          </div>

          <button
            type="submit"
            :disabled="(!newMessage.trim() && !isRecording) || isCompleted || isSending"
            class="p-3 sm:px-5 sm:py-3 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-full hover:from-[#0D9488] hover:to-[#059669] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D9488] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 shadow-md"
          >
            <span class="hidden sm:inline mr-2 text-sm sm:text-base font-semibold">{{ $t('chat.send') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </footer>
    </div>

    <!-- MODAL 1: ยืนยันการจบสนทนา (หัวข้อ/ปุ่มตรงตามสเปกทุกตัวอักษร) -->
    <div
      v-if="showEndConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-7 text-center border-t-4 border-[#0D9488] modal-surface">
        <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-teal-50 border border-teal-200 text-[#0D9488] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>

        <h3 class="text-lg sm:text-xl font-extrabold text-[#1E293B] mb-2">
          {{ $t('chat.endChat.confirmTitle') }}
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {{ $t('chat.endChat.confirmBody') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            :disabled="isEndingSession"
            @click="showEndConfirmModal = false"
            class="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {{ $t('chat.endChat.cancelBtn') }}
          </button>
          <button
            type="button"
            :disabled="isEndingSession"
            @click="confirmEndConversation"
            class="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#045F54] to-[#0D9488] hover:from-[#0D9488] hover:to-[#059669] text-white text-sm font-semibold shadow-md transition-all disabled:opacity-60"
          >
            {{ isEndingSession ? $t('chat.endChat.summarizing') : $t('chat.endChat.confirmBtn') }}
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL 2: Popup ขอบคุณสั้น ๆ ก่อนพาไปหน้าคำแนะนำ -->
    <div
      v-if="showThankYouPopup"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 sm:p-7 text-center border-t-4 border-[#059669] modal-surface">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-extrabold text-[#1E293B] mb-2">
          {{ $t('chat.endChat.thankYouTitle') }}
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
          {{ $t('chat.endChat.thankYouBody') }}
        </p>
        <button
          type="button"
          @click="proceedFromThankYouToAdvice"
          class="w-full py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#059669] text-white text-sm font-semibold shadow-sm hover:opacity-95 transition"
        >
          {{ $t('chat.endChat.viewAdviceNow') }}
        </button>
      </div>
    </div>

    <!-- MODAL 3: ยืนยันก่อนลบเซสชันในแถบประวัติ -->
    <div
      v-if="sessionToDelete"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-center border-t-4 border-rose-500 modal-surface">
        <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-rose-50 text-rose-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h3 class="text-lg font-bold text-[#1E293B] mb-2">
          {{ $t('chat.history.deleteTitle') }}
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          {{ $t('chat.history.deleteBody') }}
        </p>

        <div class="flex gap-3">
          <button
            type="button"
            :disabled="isDeletingSession"
            @click="sessionToDelete = null"
            class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
          >
            {{ $t('chat.history.deleteCancel') }}
          </button>
          <button
            type="button"
            :disabled="isDeletingSession"
            @click="confirmDeleteSession"
            class="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-sm transition-colors disabled:opacity-60"
          >
            {{ isDeletingSession ? $t('chat.history.deleting') : $t('chat.history.deleteConfirm') }}
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL 4: Emergency Modal (Crisis Trigger 1323) -->
    <div
      v-if="isEmergency"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs transition-opacity"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform transition-all border-t-4 border-rose-500 modal-surface">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-4">
          <svg class="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-[#1E293B] mb-2">{{ $t('chat.highRiskTitle') }}</h3>
        <p class="text-sm text-slate-600 mb-6">
          {{ $t('chat.highRiskBody') }}
        </p>
        <div class="flex flex-col space-y-3">
          <a
            href="tel:1323"
            class="w-full flex items-center justify-center px-4 py-3 bg-rose-600 text-white text-base font-medium rounded-xl hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {{ $t('chat.callHotline') }}
          </a>
          <button
            type="button"
            @click="isEmergency = false"
            class="w-full px-4 py-3 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D9488] transition-colors"
          >
            {{ $t('chat.closeWindow') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dateLocale } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { ref, computed, inject, onMounted, nextTick, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '../api/axios'
import { useI18n } from 'vue-i18n'

const VALID_TOPICS = ['love', 'study', 'work', 'family', 'money', 'friends', 'self', 'sleep']

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()

const isDarkMode = inject('isDarkMode', ref(false))
const chatContainer = ref(null)

// Session & Conversation State
const currentSessionId = ref(null)
const currentTopic = ref(null)
const currentPhase = ref('QUESTIONS') // 'QUESTIONS' | 'FREE_CHAT'
const currentQuestion = ref(null)
const totalQuestions = ref(5)
const sessionAnswers = ref([])
const showAnswersDrawer = ref(false)

const newMessage = ref('')
const messages = ref([])
const isInitializingSession = ref(false)
const isSending = ref(false)
const isTranslatingMessages = ref(false)
let translateRequestSeq = 0

// History Sidebar State
const historySessions = ref([])
const isLoadingHistory = ref(false)
const isMobileHistoryOpen = ref(false)
const sessionToDelete = ref(null)
const isDeletingSession = ref(false)

// End Session & Advice State
const isEmergency = ref(false)
const isCompleted = ref(false)
const showEndConfirmModal = ref(false)
const isEndingSession = ref(false)
const showThankYouPopup = ref(false)
const showAdviceScreen = ref(false)
const summaryDetail = ref(null)
let thankYouTimer = null

// Feedback State (3 ระดับหลังจบสนทนา)
const feedbackRating = ref(null) // 'HELPFUL' | 'SOMEWHAT' | 'NOT_HELPFUL'
const feedbackSubmitted = ref(false)
const feedbackSubmitting = ref(false)

const submitFeedback = async (rating) => {
  if (feedbackSubmitting.value || feedbackSubmitted.value || !currentSessionId.value) return
  feedbackRating.value = rating
  feedbackSubmitting.value = true
  try {
    await axios.patch(`/api/chat/sessions/${currentSessionId.value}/feedback`, { rating })
    feedbackSubmitted.value = true
  } catch (e) {
    console.error('submitFeedback failed', e)
  } finally {
    feedbackSubmitting.value = false
  }
}
const skipFeedback = () => {
  feedbackSubmitted.value = true
}

// Quick Chips for Free Chat
const suggestedChips = computed(() => [
  t('chat.chip1'),
  t('chat.chip2'),
  t('chat.chip3'),
  t('chat.chip4'),
  t('chat.chip5'),
  t('chat.chip6'),
  t('chat.chip7')
])

const getTopicLabel = (topicKey) => {
  if (topicKey && VALID_TOPICS.includes(topicKey)) {
    return t(`chat.topics.${topicKey}.title`)
  }
  return t('chat.history.generalTopic')
}

// Web Speech API - Voice to Text
const isRecording = ref(false)
let recognition = null

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  recognition = new SpeechRecognition()
  recognition.lang = locale.value === 'en' ? 'en-US' : 'th-TH'
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    newMessage.value += (newMessage.value ? ' ' : '') + transcript
  }

  recognition.onend = () => {
    isRecording.value = false
  }

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error)
    isRecording.value = false
  }
}

watch(locale, async (newLocale) => {
  if (recognition) {
    recognition.lang = newLocale === 'en' ? 'en-US' : 'th-TH'
  }
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  if (synth) synth.cancel()
  playingMessageIndex.value = null

  if (!currentSessionId.value) return

  const reqSeq = ++translateRequestSeq
  isTranslatingMessages.value = true

  try {
    // แปลข้อความแชทที่มีอยู่แล้วให้ตรงกับภาษาที่เลือกใหม่ (แก้บั๊ก: สลับภาษาแล้วบับเบิลเก่าไม่เปลี่ยนตาม)
    if (messages.value.length > 0) {
      try {
        const msgRes = await axios.get(`/api/chat/sessions/${currentSessionId.value}/messages`, {
          params: { locale: newLocale }
        })
        if (reqSeq === translateRequestSeq && Array.isArray(msgRes.data?.messages)) {
          messages.value = msgRes.data.messages.map((m, idx) => ({
            ...(messages.value.find((old) => old.id && old.id === m.id) || messages.value[idx] || {}),
            id: m.id,
            sender: m.sender,
            text: m.text,
            timestamp: m.timestamp,
          }))
        }
      } catch (err) {
        console.error('Failed to translate existing chat messages:', err)
      }
    }

    // หากเซสชันจบแล้วและสลับภาษา ให้ขอสรุปและคำแนะนำในภาษาที่เลือกทันที
    if (isCompleted.value) {
      try {
        const res = await axios.post(`/api/chat/sessions/${currentSessionId.value}/end`, {
          locale: newLocale
        })
        if (reqSeq === translateRequestSeq && res.data?.summaryDetail) {
          summaryDetail.value = res.data.summaryDetail
        }
        await fetchHistoryList()
      } catch (err) {
        console.error('Failed to refresh summary for new locale:', err)
      }
    } else if (currentPhase.value === 'QUESTIONS') {
      // หากยังอยู่ในช่วง 5 คำถามแรก ให้ดึงตัวเลือกคำถามในภาษาที่เลือก
      try {
        const res = await axios.get(`/api/chat/sessions/${currentSessionId.value}`, {
          params: { locale: newLocale }
        })
        if (reqSeq === translateRequestSeq && res.data?.currentQuestion) {
          currentQuestion.value = res.data.currentQuestion
        }
      } catch (err) {
        console.error('Failed to refresh guided question for new locale:', err)
      }
    }
  } finally {
    if (reqSeq === translateRequestSeq) {
      isTranslatingMessages.value = false
    }
  }
})

const toggleRecording = () => {
  if (!recognition) {
    alert(t('chat.noVoiceSupport'))
    return
  }

  if (isRecording.value) {
    recognition.stop()
  } else {
    try {
      recognition.start()
      isRecording.value = true
    } catch (e) {
      console.error(e)
      isRecording.value = false
    }
  }
}

// Text-to-Speech: ใช้ Google Translate TTS ฟรี (ไม่เป็นทางการ) เป็นหลัก เพราะมีเสียงไทยชัดเจนทุกเครื่อง
// fallback ไปใช้ Web Speech API ของเบราว์เซอร์ถ้า Google TTS ใช้ไม่ได้
const playingMessageIndex = ref(null)
const synth = window.speechSynthesis
const availableVoices = ref([])
let currentAudio = null

const loadVoices = () => {
  if (synth) availableVoices.value = synth.getVoices()
}
if (synth) {
  loadVoices()
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices
}

// แบ่งข้อความเป็นช่วงไม่เกิน ~190 ตัวอักษร (ข้อจำกัดของ Google Translate TTS endpoint)
const splitTextForTTS = (text, maxLen = 190) => {
  const chunks = []
  let remaining = text.trim()
  while (remaining.length > maxLen) {
    let cut = remaining.lastIndexOf(' ', maxLen)
    if (cut <= 0) cut = maxLen
    chunks.push(remaining.slice(0, cut))
    remaining = remaining.slice(cut).trim()
  }
  if (remaining) chunks.push(remaining)
  return chunks
}

const speakWithBrowserVoice = (text, index) => {
  if (!synth) { playingMessageIndex.value = null; return }
  synth.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  const thaiVoice = availableVoices.value.find(
    (voice) =>
      (voice.lang && voice.lang.includes('th')) ||
      (voice.name && (voice.name.includes('Thai') || voice.name.includes('ไทย')))
  )
  if (thaiVoice && /[\u0E00-\u0E7F]/.test(text)) {
    utterance.voice = thaiVoice
    utterance.lang = 'th-TH'
  }
  utterance.onend = () => { playingMessageIndex.value = null }
  utterance.onerror = () => { playingMessageIndex.value = null }
  playingMessageIndex.value = index
  setTimeout(() => synth.speak(utterance), 100)
}

const playGoogleTTS = (text, lang, index) => {
  const chunks = splitTextForTTS(text)
  let i = 0
  const hosts = ['https://translate.googleapis.com/translate_tts', 'https://translate.google.com/translate_tts']
  const playNext = (hostIndex = 0) => {
    if (i >= chunks.length) {
      playingMessageIndex.value = null
      currentAudio = null
      return
    }
    const url = `${hosts[hostIndex]}?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(chunks[i])}`
    currentAudio = new Audio(url)
    currentAudio.onended = () => {
      i++
      playNext(0)
    }
    currentAudio.onerror = () => {
      currentAudio = null
      if (hostIndex < hosts.length - 1) {
        playNext(hostIndex + 1) // ลอง host สำรองก่อน ไม่เพิ่งเพิ่ม i
      } else {
        speakWithBrowserVoice(text, index)
      }
    }
    currentAudio.play().catch(() => {
      currentAudio = null
      if (hostIndex < hosts.length - 1) {
        playNext(hostIndex + 1)
      } else {
        speakWithBrowserVoice(text, index)
      }
    })
  }
  playNext(0)
}

const toggleSpeak = (text, index) => {
  if (playingMessageIndex.value === index) {
    if (currentAudio) { currentAudio.pause(); currentAudio = null }
    if (synth) synth.cancel()
    playingMessageIndex.value = null
    return
  }

  if (currentAudio) { currentAudio.pause(); currentAudio = null }
  if (synth) synth.cancel()
  if (!text) return

  playingMessageIndex.value = index
  const isThai = /[\u0E00-\u0E7F]/.test(text)
  playGoogleTTS(text, isThai ? 'th' : 'en', index)
}

onUnmounted(() => {
  if (synth) synth.cancel()
  if (recognition && isRecording.value) recognition.stop()
  if (thankYouTimer) clearTimeout(thankYouTimer)
})

const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(dateLocale(), { hour: '2-digit', minute: '2-digit' }).format(date)
}

const formatDateShort = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(dateLocale(), {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const goToTopicPicker = () => {
  isMobileHistoryOpen.value = false
  router.push('/chat/topics')
}

// ดึงลิสต์ประวัติทั้งหมดของผู้ใช้
const fetchHistoryList = async () => {
  isLoadingHistory.value = true
  try {
    const res = await axios.get('/api/chat/sessions/history')
    historySessions.value = res.data?.sessions || []
  } catch (err) {
    console.error('Failed to load session history:', err)
  } finally {
    isLoadingHistory.value = false
  }
}

// โหลดเซสชันตาม ID (ข้อความ + คำตอบ 5 ข้อ + สถานะ)
const loadSessionById = async (sessionId) => {
  isInitializingSession.value = true
  showAdviceScreen.value = false
  showAnswersDrawer.value = false
  try {
    const res = await axios.get(`/api/chat/sessions/${sessionId}`, {
      params: { locale: locale.value }
    })
    const data = res.data
    currentSessionId.value = data.session.id
    currentTopic.value = data.session.topic
    isCompleted.value = data.session.status === 'COMPLETED'
    summaryDetail.value = data.session.summaryDetail || null
    feedbackRating.value = data.session.feedbackRating || null
    feedbackSubmitted.value = Boolean(data.session.feedbackRating)
    currentPhase.value = data.phase || 'FREE_CHAT'
    currentQuestion.value = data.currentQuestion || null
    totalQuestions.value = data.totalQuestions || 5
    sessionAnswers.value = data.answers || []
    messages.value = data.messages || []

    // หากข้อความในเซสชันมีภาษาไม่ตรงกับ locale ปัจจุบัน ให้แปลข้อความให้ตรงกับภาษาที่เลือก
    if (messages.value.length > 0) {
      const hasThaiMsg = messages.value.some((m) => /[\u0E00-\u0E7F]/.test(m.text || ''))
      const wantsThai = locale.value === 'th'
      if (hasThaiMsg !== wantsThai) {
        try {
          const msgRes = await axios.get(`/api/chat/sessions/${sessionId}/messages`, {
            params: { locale: locale.value }
          })
          if (Array.isArray(msgRes.data?.messages)) {
            messages.value = msgRes.data.messages.map((m) => ({
              id: m.id,
              sender: m.sender,
              text: m.text,
              timestamp: m.timestamp
            }))
          }
        } catch (e) {
          console.error('Failed to localize session messages on load:', e)
        }
      }
    }

    // หากเซสชันจบแล้วแต่ภาษาของสรุปที่บันทึกไว้ไม่ตรงกับ locale ปัจจุบัน ให้ดึงสรุปตามภาษาที่เลือก
    if (isCompleted.value && summaryDetail.value?.overview) {
      const isSummaryThai = /[\u0E00-\u0E7F]/.test(summaryDetail.value.overview)
      const wantsThai = locale.value === 'th'
      if (isSummaryThai !== wantsThai) {
        try {
          const endRes = await axios.post(`/api/chat/sessions/${sessionId}/end`, {
            locale: locale.value
          })
          if (endRes.data?.summaryDetail) {
            summaryDetail.value = endRes.data.summaryDetail
          }
        } catch (e) {
          console.error('Failed to localize completed session summary:', e)
        }
      }
    }

    await scrollToBottom()
  } catch (error) {
    console.error('Error loading session by id:', error)
    if (error.response?.status === 404) {
      router.replace('/chat/topics')
    }
  } finally {
    isInitializingSession.value = false
  }
}

// เริ่มเซสชันใหม่จาก topic ที่เลือกใน TopicPickerView
const createNewSessionWithTopic = async (topicKey) => {
  isInitializingSession.value = true
  showAdviceScreen.value = false
  showAnswersDrawer.value = false
  try {
    const res = await axios.post('/api/chat/sessions', {
      topic: topicKey,
      locale: locale.value
    })
    const data = res.data
    currentSessionId.value = data.session.id
    currentTopic.value = data.session.topic
    isCompleted.value = false
    summaryDetail.value = null
    feedbackRating.value = null
    feedbackSubmitted.value = false
    currentPhase.value = data.phase || 'QUESTIONS'
    currentQuestion.value = data.question || null
    totalQuestions.value = data.totalQuestions || 5
    sessionAnswers.value = []
    messages.value = data.messages || []

    // เปลี่ยน query เป็น sessionId เพื่อป้องกันการกด Refresh แล้วสร้างเซสชันซ้ำ
    await router.replace({ path: '/chat', query: { sessionId: String(data.session.id) } })
    await fetchHistoryList()
    await scrollToBottom()
  } catch (error) {
    console.error('Failed to start new session:', error)
    alert(t('chat.loadFailed'))
    router.replace('/chat/topics')
  } finally {
    isInitializingSession.value = false
  }
}

const selectHistorySession = async (sessionId) => {
  isMobileHistoryOpen.value = false
  if (Number(currentSessionId.value) === Number(sessionId) && !showAdviceScreen.value) {
    return
  }
  await router.replace({ path: '/chat', query: { sessionId: String(sessionId) } })
  await loadSessionById(sessionId)
}

// ส่งคำตอบจากปุ่มตัวเลือกในช่วง 5 คำถามแรก
const submitGuidedOption = async (option) => {
  if (isSending.value || isCompleted.value) return
  await sendMessage(option.label, option.score)
}

const sendChip = (chipText) => {
  if (isSending.value || isCompleted.value) return
  sendMessage(chipText, null)
}

const sendMessage = async (overrideText = null, optionScore = null) => {
  const userText = (overrideText !== null ? overrideText : newMessage.value).trim()
  if (!userText || isCompleted.value || isSending.value) return

  const answeredQuestionObj =
    currentPhase.value === 'QUESTIONS' && currentQuestion.value
      ? { ...currentQuestion.value }
      : null

  const userMsgEntry = {
    sender: 'USER',
    text: userText,
    timestamp: new Date().toISOString()
  }
  messages.value.push(userMsgEntry)

  if (overrideText === null) {
    newMessage.value = ''
  }

  isSending.value = true
  await scrollToBottom()

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      return router.push('/login')
    }

    const payload = {
      sessionId: currentSessionId.value,
      topic: currentTopic.value,
      message: userText,
      locale: locale.value
    }
    if (optionScore !== null && optionScore !== undefined) {
      payload.score = optionScore
    }

    const response = await axios.post('/api/chat', payload)
    const data = response.data

    if (answeredQuestionObj) {
      const existingIdx = sessionAnswers.value.findIndex(
        (a) => a.questionNo === answeredQuestionObj.questionNo
      )
      const newAnsRecord = {
        questionNo: answeredQuestionObj.questionNo,
        questionText: answeredQuestionObj.questionText,
        answerText: userText,
        score: optionScore
      }
      if (existingIdx >= 0) {
        sessionAnswers.value.splice(existingIdx, 1, newAnsRecord)
      } else {
        sessionAnswers.value.push(newAnsRecord)
      }
    }

    if (data) {
      if (data.sessionId && !currentSessionId.value) {
        currentSessionId.value = data.sessionId
      }

      if (data.userMessageId) {
        userMsgEntry.id = data.userMessageId
      }

      if (data.reply) {
        messages.value.push({
          id: data.botMessageId || undefined,
          sender: 'BOT',
          text: data.reply,
          timestamp: new Date().toISOString()
        })
      }

      currentPhase.value = data.phase || 'FREE_CHAT'
      currentQuestion.value = data.nextQuestion || null

      if (data.severity_level === 'SEVERE') {
        isEmergency.value = true
      }
    }

    await fetchHistoryList()
    await scrollToBottom()
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert(t('chat.sessionExpired'))
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      console.error('Failed to send message:', error)
      alert(t('chat.sendFailed'))
    }
  } finally {
    isSending.value = false
  }
}

// Flow จบการสนทนา: เปิด confirm modal -> เรียก POST .../end -> แสดง popup ขอบคุณสั้น ๆ -> ไปหน้าคำแนะนำ
const openEndConfirmModal = () => {
  if (!currentSessionId.value || isCompleted.value) return
  showEndConfirmModal.value = true
}

const proceedFromThankYouToAdvice = () => {
  if (thankYouTimer) {
    clearTimeout(thankYouTimer)
    thankYouTimer = null
  }
  showThankYouPopup.value = false
  showAdviceScreen.value = true
}

const confirmEndConversation = async () => {
  if (!currentSessionId.value || isEndingSession.value) return
  isEndingSession.value = true
  try {
    const res = await axios.post(`/api/chat/sessions/${currentSessionId.value}/end`, {
      locale: locale.value
    })
    summaryDetail.value = res.data?.summaryDetail || null
    feedbackRating.value = res.data?.feedbackRating || null
    feedbackSubmitted.value = Boolean(res.data?.feedbackRating)
    isCompleted.value = true
    currentQuestion.value = null
    currentPhase.value = 'FREE_CHAT'
    showEndConfirmModal.value = false

    await fetchHistoryList()

    // แสดง popup ขอบคุณสั้น ๆ ก่อน แล้วค่อยไปหน้าคำแนะนำอัตโนมัติ
    showThankYouPopup.value = true
    thankYouTimer = setTimeout(() => {
      proceedFromThankYouToAdvice()
    }, 2200)
  } catch (error) {
    console.error('Failed to end session:', error)
    alert(t('chat.sendFailed'))
  } finally {
    isEndingSession.value = false
  }
}

// Flow ลบเซสชัน: ต้องผ่าน confirm modal ก่อนเสมอ
const openDeleteConfirm = (sessionItem) => {
  sessionToDelete.value = sessionItem
}

const confirmDeleteSession = async () => {
  if (!sessionToDelete.value || isDeletingSession.value) return
  const deletingId = sessionToDelete.value.id
  isDeletingSession.value = true
  try {
    await axios.delete(`/api/chat/sessions/${deletingId}`)
    historySessions.value = historySessions.value.filter((s) => Number(s.id) !== Number(deletingId))
    sessionToDelete.value = null

    if (Number(currentSessionId.value) === Number(deletingId)) {
      currentSessionId.value = null
      messages.value = []
      router.replace('/chat/topics')
    }
  } catch (error) {
    console.error('Failed to delete session:', error)
    alert(t('chat.loadFailed'))
  } finally {
    isDeletingSession.value = false
  }
}

// ตรวจสอบพารามิเตอร์เริ่มต้น: ถ้ายังไม่เลือก topic และไม่มี sessionId ให้ redirect ไป TopicPickerView
const initializeChatRoute = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.replace('/login')
    return
  }

  const querySessionId = route.query.sessionId ? Number(route.query.sessionId) : null
  const queryTopic = typeof route.query.topic === 'string' ? route.query.topic : null

  if (!querySessionId && (!queryTopic || !VALID_TOPICS.includes(queryTopic))) {
    router.replace('/chat/topics')
    return
  }

  if (route.query.history === '1') {
    isMobileHistoryOpen.value = true
  }

  await fetchHistoryList()

  if (querySessionId && Number.isInteger(querySessionId) && querySessionId > 0) {
    await loadSessionById(querySessionId)
  } else if (queryTopic && VALID_TOPICS.includes(queryTopic)) {
    await createNewSessionWithTopic(queryTopic)
  }
}

onMounted(() => {
  loadVoices()
  initializeChatRoute()
})

watch(
  () => [route.query.sessionId, route.query.topic],
  ([newSessionId, newTopic]) => {
    if (isInitializingSession.value) return
    if (newSessionId && String(newSessionId) === String(currentSessionId.value)) return
    if (!newSessionId && !newTopic && !currentSessionId.value) {
      router.replace('/chat/topics')
      return
    }
    if (newSessionId && String(newSessionId) !== String(currentSessionId.value)) {
      loadSessionById(Number(newSessionId))
    } else if (!newSessionId && newTopic && VALID_TOPICS.includes(String(newTopic))) {
      createNewSessionWithTopic(String(newTopic))
    }
  }
)
</script>

<style scoped>
/* ซ่อน scrollbar แนวนอนสำหรับแถบชิป */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ปุ่มก้อนเมฆสำหรับ "สิ้นสุดการสนทนา" */
.cloud-end-btn {
  isolation: isolate;
  margin-top: 4px;
  background: linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%);
  border: 1.5px solid #5eead4;
  border-radius: 9999px;
  box-shadow:
    0 3px 10px rgba(13, 148, 136, 0.14),
    inset 0 2px 0 rgba(255, 255, 255, 0.85);
}

.cloud-end-btn::before,
.cloud-end-btn::after {
  content: '';
  position: absolute;
  background: #f0fdfa;
  border-top: 1.5px solid #5eead4;
  border-radius: 9999px;
  pointer-events: none;
  z-index: -1;
}

.cloud-end-btn::before {
  width: 22px;
  height: 12px;
  top: -5px;
  left: 20%;
}

.cloud-end-btn::after {
  width: 28px;
  height: 13px;
  top: -6px;
  right: 22%;
}

.cloud-end-btn:hover {
  background: linear-gradient(180deg, #ccfbf1 0%, #99f6e4 100%);
  border-color: #0d9488;
  transform: translateY(-1px);
}

/* Dark Mode Overrides ให้เข้ากันได้กับ App.vue (ค่าคอนทราสต์ >= 4.5:1 ทุกส่วน) */
header button[title*="โหมด"] {
  background-color: #045F54;
}

header button[title*="โหมด"]:hover {
  background-color: #03473f;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) header button[title*="โหมด"] {
  background-color: #134e4a !important;
  border: 1px solid #14b8a6 !important;
  color: #ccfbf1 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) header button[title*="โหมด"]:hover {
  background-color: #0f766e !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .history-sidebar,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .guided-panel,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .modal-surface,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-card {
  background-color: #1e293b !important;
  border-color: #334155 !important;
  color: #f8fafc !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .history-item {
  background-color: #0f172a !important;
  border-color: #334155 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .history-item:hover {
  border-color: #14b8a6 !important;
  background-color: #134e4a !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .history-item-active {
  background-color: #134e4a !important;
  border-color: #14b8a6 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .history-topic-icon,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .bot-avatar-circle,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .topic-header-pill {
  background-color: #134e4a !important;
  background-image: none !important;
  border-color: #14b8a6 !important;
  color: #5eead4 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .status-pill-completed {
  background-color: rgba(6, 95, 70, 0.75) !important;
  color: #a7f3d0 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .status-pill-active {
  background-color: rgba(120, 53, 15, 0.75) !important;
  color: #fde68a !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .bot-bubble,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-step-card,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .answer-summary-card {
  background-color: #0f172a !important;
  border-color: #334155 !important;
  color: #f8fafc !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .guided-option-btn,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .chip-btn {
  background-color: #0f172a !important;
  border-color: #14b8a6 !important;
  color: #f1f5f9 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .guided-option-btn:hover,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .chip-btn:hover {
  background-color: #0d9488 !important;
  color: #ffffff !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .answers-bar,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-overview-box,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-encouragement-box {
  background-color: #134e4a !important;
  background-image: linear-gradient(135deg, #134e4a 0%, #115e59 100%) !important;
  border-color: #14b8a6 !important;
  color: #f8fafc !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .answers-bar [class*="text-[#045F54]"],
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-card [class*="text-[#045F54]"],
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .answer-summary-card [class*="text-[#045F54]"] {
  color: #5eead4 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-card [class*="text-slate-700"],
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-card [class*="text-slate-600"],
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .modal-surface [class*="text-slate-700"],
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .modal-surface [class*="text-slate-600"],
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .answer-summary-card [class*="text-slate-600"] {
  color: #f1f5f9 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-card [class*="text-slate-500"],
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .advice-card [class*="text-slate-400"] {
  color: #cbd5e1 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .modal-surface button[class~="bg-white"] {
  background-color: #334155 !important;
  border-color: #64748b !important;
  color: #f8fafc !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .modal-surface button[class~="bg-white"]:hover {
  background-color: #475569 !important;
  color: #ffffff !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .chat-input {
  background-color: #0f172a !important;
  color: #f8fafc !important;
  border-color: #334155 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .cloud-end-btn {
  background: linear-gradient(180deg, #134e4a 0%, #115e59 100%) !important;
  border-color: #14b8a6 !important;
  color: #ccfbf1 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .cloud-end-btn svg {
  color: #5eead4 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .cloud-end-btn::before,
.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .cloud-end-btn::after {
  background: #134e4a !important;
  border-top-color: #14b8a6 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .feedback-box {
  background-color: #0f172a !important;
  border-color: #334155 !important;
  color: #f8fafc !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .feedback-choice-btn:hover {
  background-color: #134e4a !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .feedback-crisis-box {
  background-color: rgba(136, 19, 55, 0.55) !important;
  border-color: #fb7185 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .feedback-crisis-text {
  color: #ffe4e6 !important;
}

.chat-page.page-dark-surface.dark-mode-page:not(.admin-page):not(.assessment-page) .feedback-thanks-text {
  color: #5eead4 !important;
}
</style>
