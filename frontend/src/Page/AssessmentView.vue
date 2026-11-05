<template>
  <div :class="['assessment-page min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">

    <!-- 1. Navbar -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">
        <router-link to="/" class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center" :title="$t('common.backHome')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <router-link to="/" class="flex items-center gap-1.5 sm:gap-2">
          <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
            <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
          </div>
          <span class="text-xl font-bold tracking-wide">{{ $t('common.brand') }}</span>
        </router-link>
      </div>

      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" class="hover:text-[#D1FAE5] transition">{{ $t('nav.home') }}</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition">{{ $t('nav.about') }}</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition">{{ $t('nav.services') }}</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">{{ $t('nav.blog') }}</router-link>
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

    <!-- 2. Green Banner Header -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-20 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <!-- Background Decorative Curve Line -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <!-- Page Title Header -->
      <div class="container mx-auto px-6 lg:px-10 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <div class="flex flex-wrap items-center gap-3 mb-2">
              <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {{ $t('assessment.title') }}
              </h1>
              <!-- Main Assessment Guide / Help Icon -->
              <AssessmentHelpTooltip
                :title="$t('assessment.guideTitle')"
                variant="banner"
                iconType="question"
                :badgeText="$t('assessmentHelp.defaultTitle')"
              >
                <div class="space-y-3 text-xs sm:text-sm text-slate-700">
                  <p class="leading-relaxed">
                    <span v-html="$t('assessment.intro')"></span>
                  </p>

                  <!-- Steps of Assessment -->
                  <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                    <div class="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                       {{ $t('assessment.stepsTitle') }}
                    </div>
                    <ol class="space-y-1.5 pl-1 leading-relaxed">
                      <li><span v-html="$t('assessment.step1')"></span></li>
                      <li><span v-html="$t('assessment.step2')"></span></li>
                      <li class="text-amber-800 font-semibold bg-amber-50/80 p-1.5 rounded-lg border border-amber-200/60">
                        <span v-html="$t('assessment.step3')"></span>
                      </li>
                      <li><span v-html="$t('assessment.step4')"></span></li>
                    </ol>
                  </div>

                  <!-- 3 Sections Overview -->
                  <div class="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80 space-y-1.5 text-xs text-emerald-950">
                    <div class="font-bold text-emerald-800">{{ $t('assessment.structTitle') }}</div>
                    <p><span v-html="$t('assessment.struct1')"></span></p>
                    <p><span v-html="$t('assessment.struct2')"></span></p>
                    <p><span v-html="$t('assessment.struct3')"></span></p>
                  </div>

                  <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>{{ $t('assessment.hotline') }}</span>
                    <a href="tel:1323" class="font-bold text-emerald-700 hover:underline flex items-center gap-1">
                      <span>📞 1323</span>
                    </a>
                  </div>
                </div>
              </AssessmentHelpTooltip>
            </div>
            <p class="text-xs md:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed">
              <span v-html="$t('assessment.heroDesc')"></span>
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. Main Content Container -->
    <main class="flex-1 w-full max-w-4xl mx-auto px-6 -mt-6 relative z-20 space-y-10 pb-16">

      <!-- ===== Section 2Q ===== -->
      <section class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 pt-8 pb-4">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h2 class="text-lg font-bold text-[#1E293B]">{{ $t('assessment.q2Heading') }}</h2>
            <AssessmentHelpTooltip
              :title="$t('assessment.q2Guide')"
              variant="section"
              iconType="info"
            >
              <div class="space-y-3 text-xs sm:text-sm text-slate-700">
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
                  <div class="font-bold text-slate-800">{{ $t('assessment.howTo') }}</div>
                  <p><span v-html="$t('assessment.q2how1')"></span></p>
                  <p><span v-html="$t('assessment.q2how2')"></span></p>
                  <p class="text-amber-800 font-semibold"><span v-html="$t('assessment.q2how3')"></span></p>
                </div>

                <div class="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80 text-xs leading-relaxed text-emerald-950">
                  <span class="font-bold text-emerald-800 block mb-1">{{ $t('assessment.criteria') }}</span>
                  <span v-html="$t('assessment.q2rule')"></span>
                </div>
              </div>
            </AssessmentHelpTooltip>
          </div>
        </div>

        <div class="overflow-x-auto px-8 pb-8">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#F0FDF4]">
                <th class="text-left py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 rounded-tl-lg">{{ $t('assessment.question') }}</th>
                <th class="py-3 px-6 font-semibold text-[#1E293B] border border-gray-200 text-center w-24">{{ $t('assessment.yes') }}</th>
                <th class="py-3 px-6 font-semibold text-[#1E293B] border border-gray-200 text-center w-24 rounded-tr-lg">{{ $t('assessment.no') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q2Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'">
                <td class="py-4 px-4 border border-gray-200 text-[#374151] leading-relaxed">{{ idx + 1 }}. {{ $t(q.text) }}</td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q2Answers[q.id] = 1"
                    :class="[
                      'w-14 h-9 rounded-full font-bold text-xs transition-all flex items-center justify-center mx-auto shadow-sm',
                      q2Answers[q.id] === 1
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >{{ $t('assessment.yes') }}</button>
                </td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q2Answers[q.id] = 0"
                    :class="[
                      'w-14 h-9 rounded-full font-bold text-xs transition-all flex items-center justify-center mx-auto shadow-sm',
                      q2Answers[q.id] === 0
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >{{ $t('assessment.no') }}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===== Section 9Q ===== -->
      <section class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 pt-8 pb-4">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <h2 class="text-lg font-bold text-[#1E293B]">{{ $t('assessment.q9Heading') }}</h2>
            <AssessmentHelpTooltip
              :title="$t('assessment.q9Guide')"
              variant="section"
              iconType="info"
            >
              <div class="space-y-3 text-xs sm:text-sm text-slate-700">
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
                  <div class="font-bold text-slate-800">{{ $t('assessment.howTo') }}</div>
                  <p><span v-html="$t('assessment.q9how1')"></span></p>
                  <p><span v-html="$t('assessment.q9how2')"></span></p>
                  <ul class="list-disc list-inside space-y-0.5 pl-2 text-slate-600">
                    <li><span v-html="$t('assessment.q9leg0')"></span></li>
                    <li><span v-html="$t('assessment.q9leg1')"></span></li>
                    <li><span v-html="$t('assessment.q9leg2')"></span></li>
                    <li><span v-html="$t('assessment.q9leg3')"></span></li>
                  </ul>
                  <p class="text-amber-800 font-semibold pt-1"><span v-html="$t('assessment.q9how3')"></span></p>
                </div>

                <div class="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80 text-xs leading-relaxed text-emerald-950">
                  <span class="font-bold text-emerald-800 block mb-1">{{ $t('assessment.q9CriteriaTitle') }}</span>
                  <span v-html="$t('assessment.q9criteria')"></span>
                  <span class="text-emerald-800 font-semibold mt-1 block">{{ $t('assessment.q9Note') }}</span>
                </div>
              </div>
            </AssessmentHelpTooltip>
          </div>

          <!-- Score Legend -->
          <div class="flex flex-wrap gap-3 mb-6">
            <span v-for="leg in q9Legend" :key="leg.val" class="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <span class="inline-flex w-7 h-7 rounded-full bg-[#F1F5F9] items-center justify-center font-bold text-[#0D9488]">{{ leg.val }}</span>
              {{ $t(leg.label) }}
            </span>
          </div>
        </div>

        <div class="overflow-x-auto px-8 pb-8">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#F0FDF4]">
                <th class="text-left py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 rounded-tl-lg">{{ $t('assessment.question') }}</th>
                <th v-for="leg in q9Legend" :key="leg.val" class="py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 text-center w-20">{{ leg.val }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q9Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'">
                <td class="py-4 px-4 border border-gray-200 text-[#374151] leading-relaxed">{{ idx + 1 }}. {{ $t(q.text) }}</td>
                <td v-for="score in [0, 1, 2, 3]" :key="score" class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q9Answers[q.id] = score"
                    :class="[
                      'w-9 h-9 rounded-full font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm',
                      q9Answers[q.id] === score
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >{{ score }}</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-[#F0FDF4]">
                <td class="py-3 px-4 border border-gray-200 font-semibold text-right text-[#1E293B]" colspan="1">{{ $t('assessment.totalScore') }}</td>
                <td class="py-3 border border-gray-200 text-center font-bold text-[#0D9488]" colspan="4">{{ q9TotalScore }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <!-- ===== Section 8Q ===== -->
      <section class="bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 pt-8 pb-4">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h2 class="text-lg font-bold text-[#1E293B]">{{ $t('assessment.q8Heading') }}</h2>
            <AssessmentHelpTooltip
              :title="$t('assessment.q8Guide')"
              variant="danger"
              iconType="info"
            >
              <div class="space-y-3 text-xs sm:text-sm text-slate-700">
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
                  <div class="font-bold text-slate-800">{{ $t('assessment.howTo') }}</div>
                  <p><span v-html="$t('assessment.q8how1')"></span></p>
                  <p><span v-html="$t('assessment.q8how2')"></span></p>
                  <p class="text-amber-800 font-semibold"><span v-html="$t('assessment.q8how3')"></span></p>
                </div>

                <div class="bg-rose-50/80 p-3 rounded-2xl border border-rose-200/90 text-xs leading-relaxed text-rose-950">
                  <span class="font-bold text-rose-800 block mb-1">{{ $t('assessment.q8CriteriaTitle') }}</span>
                  <span v-html="$t('assessment.q8criteria')"></span>
                  <span class="text-rose-700 font-semibold mt-1 block"><span v-html="$t('assessment.q8Note')"></span></span>
                </div>
              </div>
            </AssessmentHelpTooltip>
          </div>
        </div>

        <div class="overflow-x-auto px-8 pb-8">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#FFF1F2]">
                <th class="text-left py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 rounded-tl-lg" style="width:65%">{{ $t('assessment.question') }}</th>
                <th class="py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 text-center">{{ $t('assessment.no') }}</th>
                <th class="py-3 px-4 font-semibold text-[#1E293B] border border-gray-200 text-center rounded-tr-lg">{{ $t('assessment.yes') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(q, idx) in q8Questions" :key="q.id" :class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'">
                <td class="py-4 px-4 border border-gray-200 text-[#374151] leading-relaxed">
                  <span class="font-semibold">{{ idx + 1 }}.</span> {{ $t(q.text) }}
                  <span v-if="q.sub" class="block text-xs text-gray-400 mt-1 italic">({{ $t(q.sub) }})</span>
                </td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q8Answers[q.id] = 0"
                    :class="[
                      'w-9 h-9 rounded-full font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm',
                      q8Answers[q.id] === 0
                        ? 'bg-[#0D9488] text-white ring-2 ring-[#0D9488]/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >0</button>
                </td>
                <td class="py-4 border border-gray-200 text-center">
                  <button
                    type="button"
                    @click="q8Answers[q.id] = q.score"
                    :class="[
                      'w-9 h-9 rounded-full font-bold text-sm transition-all flex items-center justify-center mx-auto shadow-sm',
                      q8Answers[q.id] === q.score
                        ? 'bg-rose-500 text-white ring-2 ring-rose-400/40 scale-105'
                        : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    ]"
                  >{{ q.score }}</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-[#FFF1F2]">
                <td class="py-3 px-4 border border-gray-200 font-semibold text-right text-[#1E293B]" colspan="1">{{ $t('assessment.totalScore') }}</td>
                <td class="py-3 border border-gray-200 text-center font-bold text-rose-600" colspan="2">{{ q8TotalScore }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <!-- ===== Submit Button & Completion Status ===== -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
        <div class="text-xs sm:text-sm">
          <div v-if="!isFormValid" class="flex items-center gap-2.5 text-amber-800 bg-amber-50/80 px-4 py-2.5 rounded-xl border border-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0 text-amber-600 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <div>
              <span v-html="$t('assessment.incomplete', { done: totalAnsweredCount, total: totalQuestionsCount })"></span>
            </div>
          </div>
          <div v-else class="flex items-center gap-2.5 text-emerald-800 bg-emerald-50/90 px-4 py-2.5 rounded-xl border border-emerald-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <div>
              <span v-html="$t('assessment.complete', { total: totalQuestionsCount })"></span>
            </div>
          </div>
        </div>

        <button
          @click="submitAssessment"
          :disabled="!isFormValid"
          class="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transform active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap text-center"
        >
          {{ isSaving ? $t('assessment.saving') : $t('assessment.submit') }}
        </button>
        <p v-if="saveError" role="alert" class="mt-3 text-sm text-rose-600">
          {{ saveError }}
        </p>
      </div>

    </main>

    <!-- Footer -->
    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <!-- โลโก้ Footer -->
          <div class="flex items-center gap-1 mb-3">
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
            <li><a href="#" class="hover:underline">{{ $t('common.footerService1') }}</a></li>
            <li><a href="#" class="hover:underline">{{ $t('common.footerService2') }}</a></li>
            <li><router-link to="/blog" class="hover:underline">{{ $t('common.footerService3') }}</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerContact') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ PhuenJaiZone@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">{{ $t('common.footerHotline') }}</router-link>
          <p class="text-xs text-[#D1FAE5]">{{ $t('common.hotlineText') }}</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        {{ $t('common.copyright') }}
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import { useAssessmentStore } from '../stores/assessmentStore'
import ProfileMenu from '../components/ProfileMenu.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import AssessmentHelpTooltip from '../components/AssessmentHelpTooltip.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isDarkMode = inject('isDarkMode')
const router = useRouter()
const assessmentStore = useAssessmentStore()
const isSaving = ref(false)
const saveError = ref('')

// ===== 2Q =====
const q2Questions = [
  { id: 1, text: 'assessment.q2.1' },
  { id: 2, text: 'assessment.q2.2' },
]
const q2Answers = ref({})

// ===== 9Q =====
const q9Legend = [
  { val: 0, label: 'assessment.q9opt.0' },
  { val: 1, label: 'assessment.q9opt.1' },
  { val: 2, label: 'assessment.q9opt.2' },
  { val: 3, label: 'assessment.q9opt.3' },
]
const q9Questions = [
  { id: 1, text: 'assessment.q9.1' },
  { id: 2, text: 'assessment.q9.2' },
  { id: 3, text: 'assessment.q9.3' },
  { id: 4, text: 'assessment.q9.4' },
  { id: 5, text: 'assessment.q9.5' },
  { id: 6, text: 'assessment.q9.6' },
  { id: 7, text: 'assessment.q9.7' },
  { id: 8, text: 'assessment.q9.8' },
  { id: 9, text: 'assessment.q9.9' },
]
const q9Answers = ref({})
const q9TotalScore = computed(() => Object.values(q9Answers.value).reduce((a, b) => a + b, 0))

// ===== 8Q =====
const q8Questions = [
  { id: 1, text: 'assessment.q8.1', score: 1 },
  { id: 2, text: 'assessment.q8.2', score: 2 },
  { id: 3, text: 'assessment.q8.3', sub: 'assessment.q8.3sub', score: 6 },
  { id: 4, text: 'assessment.q8.4', score: 8 },
  { id: 5, text: 'assessment.q8.5', score: 9 },
  { id: 6, text: 'assessment.q8.6', score: 4 },
  { id: 7, text: 'assessment.q8.7', score: 10 },
  { id: 8, text: 'assessment.q8.8', score: 4 },
]
const q8Answers = ref({})
const q8TotalScore = computed(() => Object.values(q8Answers.value).reduce((a, b) => a + b, 0))

// ===== Validation & Progress =====
const totalQuestionsCount = computed(() => q2Questions.length + q9Questions.length + q8Questions.length)
const totalAnsweredCount = computed(() => {
  return Object.keys(q2Answers.value).length + Object.keys(q9Answers.value).length + Object.keys(q8Answers.value).length
})

const isFormValid = computed(() => {
  const q2Done = q2Questions.every(q => q2Answers.value[q.id] !== undefined)
  const q9Done = q9Questions.every(q => q9Answers.value[q.id] !== undefined)
  const q8Done = q8Questions.every(q => q8Answers.value[q.id] !== undefined)
  return q2Done && q9Done && q8Done
})

// ===== Submit =====
const submitAssessment = async () => {
  if (isSaving.value || !isFormValid.value) return

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

  isSaving.value = true
  saveError.value = ''
  try {
    await axios.post('/api/assessment/save', {
      totalScore: q9Score,
      interpretation: level === 'SEVERE' ? 'เสี่ยงซึมเศร้ารุนแรง' : (level === 'MODERATE' ? 'มีความเครียด/เสี่ยงปานกลาง' : 'ปกติ')
    })
    await router.push('/assessment-result')
  } catch (err) {
    console.error('Could not save test result to the backend:', err)
    saveError.value = err.response?.data?.error || t('assessment.saveError')
  } finally {
    isSaving.value = false
  }
}
</script>
