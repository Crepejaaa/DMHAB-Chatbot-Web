<template>
  <div :class="['min-h-screen flex flex-col font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page bg-[#0F172A]' : 'bg-[#F0FDF9]']">

    <!-- ========== Navbar ========== -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          @click="$router.push('/services/relaxation')"
          class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center"
          :title="$t('common.back')"
          :aria-label="$t('common.back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
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
        <router-link to="/services" class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.services') }}</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">{{ $t('nav.blog') }}</router-link>
      </div>

      <div class="flex gap-3 items-center text-sm">
        <div class="hidden md:flex items-center gap-2 mr-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
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
        <LanguageSwitcher />
        <ProfileMenu />
      </div>
    </nav>

    <!-- ========== Hero Banner ========== -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-24 px-6 lg:px-12 relative overflow-hidden">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <circle cx="350" cy="100" r="150" fill="currentColor"/>
          <circle cx="450" cy="400" r="100" fill="currentColor"/>
        </svg>
      </div>
      <!-- Floating particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="i in 6" :key="i" class="floating-particle" :style="particleStyle(i)"></div>
      </div>

      <div class="container mx-auto max-w-5xl relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-4xl">🧘</span>
              <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {{ $t('activity.title') }}
              </h1>
            </div>
            <p class="text-sm md:text-base text-[#D1FAE5] max-w-2xl leading-relaxed">
              {{ $t('activity.subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- ========== Main Content ========== -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 -mt-12 pb-16">

      <!-- ===== Progress Dashboard ===== -->
      <section class="mb-8 animate-fade-up">
        <div :class="['rounded-3xl shadow-xl p-6 md:p-8 border', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100']">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

            <!-- Score & Level -->
            <div class="flex flex-col items-center md:items-start gap-2">
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md"
                  :style="{ background: currentLevel.gradient }">
                  {{ currentLevel.badge }}
                </div>
                <div>
                  <p :class="['text-xs font-semibold uppercase tracking-wider', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ $t('activity.yourLevel') }}</p>
                  <p class="text-lg font-extrabold" :style="{ color: currentLevel.color }">{{ $t(currentLevel.name) }}</p>
                </div>
              </div>
              <!-- Total Score -->
              <div class="flex items-baseline gap-1 mt-1">
                <span class="text-4xl font-black text-[#0D9488]">{{ totalScore }}</span>
                <span :class="['text-sm font-semibold', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">XP</span>
              </div>
              <p :class="['text-xs', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
                {{ $t('activity.xpToNext', { n: nextLevelScore - totalScore }) }}
              </p>
            </div>

            <!-- Progress Bar -->
            <div class="flex flex-col gap-3">
              <div class="flex justify-between text-xs font-semibold" :class="isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]'">
                <span>{{ $t('activity.progress') }}</span>
                <span>{{ Math.round(levelProgress) }}%</span>
              </div>
              <div :class="['h-4 rounded-full overflow-hidden', isDarkMode ? 'bg-white/10' : 'bg-gray-100']">
                <div
                  class="h-full rounded-full transition-all duration-700 ease-out"
                  :style="{ width: levelProgress + '%', background: 'linear-gradient(90deg, #0D9488, #059669)' }"
                ></div>
              </div>
              <div class="flex justify-between text-xs" :class="isDarkMode ? 'text-[#64748B]' : 'text-gray-400'">
                <span>{{ $t(currentLevel.name) }}</span>
                <span>{{ $t(nextLevel.name) }}</span>
              </div>

              <!-- Today stats -->
              <div class="flex gap-4 mt-2">
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full bg-[#0D9488]"></div>
                  <span :class="['text-xs font-semibold', isDarkMode ? 'text-white' : 'text-[#1E293B]']">
                    {{ $t('activity.todayCount', { done: todayCompleted, total: totalActivities }) }}
                  </span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                  <span :class="['text-xs font-semibold', isDarkMode ? 'text-white' : 'text-[#1E293B]']">
                    {{ $t('activity.streak', { n: streakDays }) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Daily Summary -->
            <div :class="['rounded-2xl p-4 text-center', isDarkMode ? 'bg-white/5' : 'bg-[#F0FDF9]']">
              <p :class="['text-xs font-semibold uppercase tracking-wider mb-3', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ $t('activity.todaySummary') }}</p>
              <div class="grid grid-cols-2 gap-3">
                <div :class="['rounded-xl p-3', isDarkMode ? 'bg-white/5' : 'bg-white']">
                  <p class="text-2xl font-black text-[#0D9488]">{{ todayScore }}</p>
                  <p :class="['text-xs mt-0.5', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ $t('activity.xpToday') }}</p>
                </div>
                <div :class="['rounded-xl p-3', isDarkMode ? 'bg-white/5' : 'bg-white']">
                  <p class="text-2xl font-black text-[#059669]">{{ todayCompleted }}</p>
                  <p :class="['text-xs mt-0.5', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ $t('activity.completedCount') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Activity Categories ===== -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-5">
          <h2 :class="['text-xl md:text-2xl font-extrabold', isDarkMode ? 'text-white' : 'text-[#1E293B]']">
            {{ $t('activity.suggestedToday') }}
          </h2>
          <button
            @click="resetToday"
            :class="['text-xs px-3 py-1.5 rounded-full border transition font-semibold', isDarkMode ? 'border-white/20 text-[#94A3B8] hover:bg-white/5' : 'border-gray-200 text-[#64748B] hover:bg-gray-50']"
          >
            {{ $t('activity.resetDay') }}
          </button>
        </div>

        <div class="space-y-6">
          <div
            v-for="(category, catIndex) in activityCategories"
            :key="catIndex"
            class="animate-fade-up"
            :style="{ animationDelay: (catIndex * 0.1) + 's' }"
          >
            <!-- Category Header -->
            <div class="flex items-center gap-3 mb-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ background: category.gradient }">
                {{ category.icon }}
              </div>
              <div>
                <h3 :class="['font-bold text-base', isDarkMode ? 'text-white' : 'text-[#1E293B]']">{{ $t(category.name) }}</h3>
                <p :class="['text-xs', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
                  {{ $t('activity.catDone', { done: category.activities.filter(a => completedIds.includes(a.id)).length, total: category.activities.length }) }}
                </p>
              </div>
              <!-- Category completion badge -->
              <div v-if="category.activities.every(a => completedIds.includes(a.id))"
                class="ml-auto text-xs px-2.5 py-1 rounded-full bg-[#059669] text-white font-bold flex items-center gap-1">
                {{ $t('activity.allDone') }}
              </div>
            </div>

            <!-- Activity Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="activity in category.activities"
                :key="activity.id"
                @click="toggleActivity(activity)"
                :class="[
                  'relative rounded-2xl p-4 border-2 cursor-pointer transition-all duration-300 select-none group',
                  completedIds.includes(activity.id)
                    ? 'border-[#0D9488] shadow-md shadow-[#0D9488]/20'
                    : isDarkMode
                      ? 'border-white/10 bg-[#1E293B] hover:border-[#0D9488]/50 hover:bg-[#1E293B]'
                      : 'border-gray-100 bg-white hover:border-[#0D9488]/40 hover:shadow-md',
                  completedIds.includes(activity.id)
                    ? isDarkMode ? 'bg-[#0D9488]/10' : 'bg-[#ECFDF5]'
                    : ''
                ]"
              >
                <div class="flex items-start gap-3">
                  <!-- Custom Checkbox -->
                  <div
                    :class="[
                      'w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5',
                      completedIds.includes(activity.id)
                        ? 'bg-[#0D9488] border-[#0D9488] scale-110'
                        : isDarkMode
                          ? 'border-white/30 group-hover:border-[#0D9488]'
                          : 'border-gray-300 group-hover:border-[#0D9488]'
                    ]"
                  >
                    <svg v-if="completedIds.includes(activity.id)" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <p :class="[
                          'font-semibold text-sm leading-snug transition-all duration-300',
                          completedIds.includes(activity.id)
                            ? 'text-[#059669] line-through opacity-70'
                            : isDarkMode ? 'text-white' : 'text-[#1E293B]'
                        ]">
                          {{ activity.emoji }} {{ $t(activity.name) }}
                        </p>
                        <p :class="['text-xs mt-0.5 leading-relaxed', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">
                          {{ $t(activity.description) }}
                        </p>
                      </div>
                      <!-- Score chip -->
                      <span :class="[
                        'text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0',
                        completedIds.includes(activity.id)
                          ? 'bg-[#059669] text-white'
                          : isDarkMode ? 'bg-white/10 text-[#94A3B8]' : 'bg-gray-100 text-[#64748B]'
                      ]">
                        +{{ activity.score }} XP
                      </span>
                    </div>

                    <!-- Duration / Tips -->
                    <div class="flex items-center gap-3 mt-2">
                      <span :class="['text-xs flex items-center gap-1', isDarkMode ? 'text-[#94A3B8]' : 'text-gray-400']">
                        ⏱️ {{ $t('activity.minutes', { n: activity.duration }) }}
                      </span>
                      <span :class="['text-xs flex items-center gap-1', isDarkMode ? 'text-[#94A3B8]' : 'text-gray-400']">
                        📌 {{ $t(activity.level) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Completion Sparkle animation -->
                <div v-if="sparkleId === activity.id" class="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div class="sparkle-burst text-2xl">✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Today's Completed Timeline ===== -->
      <section v-if="todayHistory.length > 0" class="mb-8 animate-fade-up">
        <h2 :class="['text-xl font-extrabold mb-4', isDarkMode ? 'text-white' : 'text-[#1E293B]']">
          {{ $t('activity.doneToday') }}
        </h2>
        <div :class="['rounded-3xl border p-6', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100 shadow-sm']">
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0D9488] to-[#059669]"></div>
            <div class="space-y-4">
              <div
                v-for="(item, idx) in todayHistory"
                :key="idx"
                class="flex items-center gap-4 pl-10 relative"
              >
                <div class="absolute left-2.5 w-3 h-3 rounded-full bg-[#0D9488] border-2 border-white shadow-sm"></div>
                <div :class="['flex-1 flex items-center justify-between rounded-xl px-4 py-2.5', isDarkMode ? 'bg-white/5' : 'bg-[#F0FDF9]']">
                  <div>
                    <p :class="['font-semibold text-sm', isDarkMode ? 'text-white' : 'text-[#1E293B]']">
                      {{ item.emoji }} {{ $t(item.name) }}
                    </p>
                    <p :class="['text-xs', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ item.time }}</p>
                  </div>
                  <span class="text-xs font-bold text-[#059669] bg-[#059669]/10 px-2.5 py-1 rounded-full">+{{ item.score }} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Tips Section ===== -->
      <section class="animate-fade-up">
        <div :class="['rounded-3xl p-6 md:p-8 border relative overflow-hidden', isDarkMode ? 'bg-[#1E293B] border-white/10' : 'bg-white border-gray-100 shadow-sm']">
          <div class="absolute right-0 top-0 opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" class="w-48 h-48">
              <circle cx="100" cy="100" r="80" fill="#0D9488"/>
            </svg>
          </div>
          <h2 :class="['text-lg font-extrabold mb-4', isDarkMode ? 'text-white' : 'text-[#1E293B]']">
            {{ $t('activity.tipsTitle') }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="(tip, i) in tips" :key="i"
              :class="['rounded-2xl p-4', isDarkMode ? 'bg-white/5' : 'bg-[#F0FDF9]']">
              <p class="text-2xl mb-2">{{ tip.icon }}</p>
              <p :class="['font-semibold text-sm mb-1', isDarkMode ? 'text-white' : 'text-[#1E293B]']">{{ $t(tip.title) }}</p>
              <p :class="['text-xs leading-relaxed', isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]']">{{ $t(tip.desc) }}</p>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- ========== Toast Notification ========== -->
    <Transition name="toast">
      <div v-if="showToast"
        class="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-[#0D9488] text-white px-5 py-3.5 rounded-2xl shadow-2xl">
        <span class="text-xl">{{ toastEmoji }}</span>
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
              <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">{{ $t('common.brand') }}</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">{{ $t('common.footerDesc') }}</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('common.footerServices') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><router-link to="/services" class="hover:underline">{{ $t('common.footerService1') }}</router-link></li>
            <li><router-link to="/services" class="hover:underline">{{ $t('common.footerService2') }}</router-link></li>
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
import { dateLocale } from '../i18n'
import { ref, computed, onMounted, inject } from 'vue'
import ProfileMenu from '../components/ProfileMenu.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'

const isDarkMode = inject('isDarkMode')
const { t } = useI18n()
const authStore = useAuthStore()

// ==================== Activity Data ====================
const activityCategories = [
  {
    name: 'activity.categories.c0',
    icon: '🧘',
    gradient: 'linear-gradient(135deg, #0D9488, #059669)',
    activities: [
      {
        id: 'deep-breathing',
        emoji: '🌬️',
        name: 'activity.items.deep-breathing.name',
        description: 'activity.items.deep-breathing.description',
        duration: 5,
        level: 'activity.level.beginner',
        score: 10
      },
      {
        id: 'body-scan',
        emoji: '🌊',
        name: 'activity.items.body-scan.name',
        description: 'activity.items.body-scan.description',
        duration: 10,
        level: 'activity.level.beginner',
        score: 15
      },
      {
        id: 'mindfulness',
        emoji: '🕯️',
        name: 'activity.items.mindfulness.name',
        description: 'activity.items.mindfulness.description',
        duration: 8,
        level: 'activity.level.easy',
        score: 12
      },
      {
        id: 'progressive-muscle',
        emoji: '💪',
        name: 'activity.items.progressive-muscle.name',
        description: 'activity.items.progressive-muscle.description',
        duration: 15,
        level: 'activity.level.easy',
        score: 20
      }
    ]
  },
  {
    name: 'activity.categories.c1',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    activities: [
      {
        id: 'gratitude-journal',
        emoji: '🙏',
        name: 'activity.items.gratitude-journal.name',
        description: 'activity.items.gratitude-journal.description',
        duration: 5,
        level: 'activity.level.beginner',
        score: 10
      },
      {
        id: 'mood-diary',
        emoji: '📔',
        name: 'activity.items.mood-diary.name',
        description: 'activity.items.mood-diary.description',
        duration: 10,
        level: 'activity.level.beginner',
        score: 15
      },
      {
        id: 'positive-affirmation',
        emoji: '⭐',
        name: 'activity.items.positive-affirmation.name',
        description: 'activity.items.positive-affirmation.description',
        duration: 5,
        level: 'activity.level.easy',
        score: 10
      }
    ]
  },
  {
    name: 'activity.categories.c2',
    icon: '🏃',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    activities: [
      {
        id: 'morning-stretch',
        emoji: '🌅',
        name: 'activity.items.morning-stretch.name',
        description: 'activity.items.morning-stretch.description',
        duration: 10,
        level: 'activity.level.beginner',
        score: 15
      },
      {
        id: 'light-walk',
        emoji: '🚶',
        name: 'activity.items.light-walk.name',
        description: 'activity.items.light-walk.description',
        duration: 15,
        level: 'activity.level.easy',
        score: 20
      },
      {
        id: 'yoga',
        emoji: '🧎',
        name: 'activity.items.yoga.name',
        description: 'activity.items.yoga.description',
        duration: 20,
        level: 'activity.level.medium',
        score: 25
      }
    ]
  },
  {
    name: 'activity.categories.c3',
    icon: '🌿',
    gradient: 'linear-gradient(135deg, #059669, #047857)',
    activities: [
      {
        id: 'sunlight',
        emoji: '☀️',
        name: 'activity.items.sunlight.name',
        description: 'activity.items.sunlight.description',
        duration: 10,
        level: 'activity.level.beginner',
        score: 12
      },
      {
        id: 'plant-care',
        emoji: '🌱',
        name: 'activity.items.plant-care.name',
        description: 'activity.items.plant-care.description',
        duration: 10,
        level: 'activity.level.beginner',
        score: 10
      },
      {
        id: 'digital-detox',
        emoji: '📵',
        name: 'activity.items.digital-detox.name',
        description: 'activity.items.digital-detox.description',
        duration: 30,
        level: 'activity.level.challenging',
        score: 30
      }
    ]
  }
]

// ==================== Levels ====================
const levels = [
  { name: 'activity.rank.r0', badge: '🌱', minScore: 0, color: '#64748B', gradient: 'linear-gradient(135deg, #94A3B8, #64748B)' },
  { name: 'activity.rank.r1', badge: '🌿', minScore: 50, color: '#059669', gradient: 'linear-gradient(135deg, #34D399, #059669)' },
  { name: 'activity.rank.r2', badge: '🧘', minScore: 150, color: '#0D9488', gradient: 'linear-gradient(135deg, #2DD4BF, #0D9488)' },
  { name: 'activity.rank.r3', badge: '⭐', minScore: 300, color: '#F59E0B', gradient: 'linear-gradient(135deg, #FCD34D, #F59E0B)' },
  { name: 'activity.rank.r4', badge: '🏆', minScore: 500, color: '#8B5CF6', gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6)' }
]

// ==================== State ====================
const storageKey = computed(() => `activityTracker_${authStore.user?.email || 'guest'}`)

const totalScore = ref(0)
const completedIds = ref([])     // กิจกรรมที่ติ๊กวันนี้
const todayHistory = ref([])     // ประวัติการติ๊กวันนี้ (พร้อมเวลา)
const streakDays = ref(1)
const sparkleId = ref(null)

// Toast
const showToast = ref(false)
const toastTitle = ref('')
const toastMsg = ref('')
const toastEmoji = ref('✨')
let toastTimer = null

// ==================== Computed ====================
const totalActivities = computed(() =>
  activityCategories.reduce((sum, c) => sum + c.activities.length, 0)
)

const todayCompleted = computed(() => completedIds.value.length)

const todayScore = computed(() =>
  todayHistory.value.reduce((sum, item) => sum + item.score, 0)
)

const currentLevel = computed(() => {
  let lvl = levels[0]
  for (const l of levels) {
    if (totalScore.value >= l.minScore) lvl = l
  }
  return lvl
})

const nextLevel = computed(() => {
  const idx = levels.indexOf(currentLevel.value)
  return levels[idx + 1] || levels[levels.length - 1]
})

const nextLevelScore = computed(() => nextLevel.value.minScore)

const levelProgress = computed(() => {
  const curr = currentLevel.value.minScore
  const next = nextLevel.value.minScore
  if (curr === next) return 100
  return Math.min(((totalScore.value - curr) / (next - curr)) * 100, 100)
})

// ==================== Methods ====================
function loadData() {
  try {
    const raw = localStorage.getItem(storageKey.value)
    if (!raw) return
    const data = JSON.parse(raw)
    const today = new Date().toDateString()

    totalScore.value = data.totalScore || 0
    streakDays.value = data.streakDays || 1

    if (data.lastDate === today) {
      completedIds.value = data.completedIds || []
      todayHistory.value = data.todayHistory || []
    } else {
      // วันใหม่ — รีเซ็ตกิจกรรมวันนี้ แต่คงคะแนนรวม
      if (data.lastDate) {
        // คำนวณ streak
        const last = new Date(data.lastDate)
        const now = new Date()
        const diff = Math.floor((now - last) / 86400000)
        streakDays.value = diff === 1 ? (data.streakDays || 1) + 1 : 1
      }
      completedIds.value = []
      todayHistory.value = []
      saveData()
    }
  } catch {
    // ignore parse errors
  }
}

function saveData() {
  const data = {
    totalScore: totalScore.value,
    completedIds: completedIds.value,
    todayHistory: todayHistory.value,
    streakDays: streakDays.value,
    lastDate: new Date().toDateString()
  }
  localStorage.setItem(storageKey.value, JSON.stringify(data))
}

function toggleActivity(activity) {
  const alreadyDone = completedIds.value.includes(activity.id)

  if (alreadyDone) {
    // ยกเลิกการติ๊ก
    completedIds.value = completedIds.value.filter(id => id !== activity.id)
    totalScore.value = Math.max(0, totalScore.value - activity.score)
    todayHistory.value = todayHistory.value.filter(h => h.id !== activity.id)

    triggerToast(t('activity.toastUndoTitle'), t('activity.toastUndoMsg', { name: t(activity.name), xp: activity.score }), '↩️')
  } else {
    // ติ๊กถูก
    completedIds.value.push(activity.id)
    totalScore.value += activity.score

    const now = new Date()
    todayHistory.value.unshift({
      id: activity.id,
      emoji: activity.emoji,
      name: activity.name,
      score: activity.score,
      time: now.toLocaleTimeString(dateLocale(), { hour: '2-digit', minute: '2-digit' })
    })

    // Sparkle animation
    sparkleId.value = activity.id
    setTimeout(() => { sparkleId.value = null }, 800)

    // Check category completion bonus
    const cat = activityCategories.find(c => c.activities.some(a => a.id === activity.id))
    const catAllDone = cat && cat.activities.every(a => completedIds.value.includes(a.id))

    if (catAllDone) {
      totalScore.value += 15 // Bonus XP
      triggerToast(t('activity.toastCatTitle', { name: t(cat.name) }), t('activity.toastCatMsg', { xp: activity.score }), '🏅')
    } else {
      triggerToast(t('activity.toastDoneTitle'), t('activity.toastDoneMsg', { xp: activity.score, name: t(activity.name) }), '✅')
    }
  }

  saveData()
}

function resetToday() {
  // คืน XP ที่ได้จากวันนี้
  totalScore.value = Math.max(0, totalScore.value - todayScore.value)
  completedIds.value = []
  todayHistory.value = []
  saveData()
  triggerToast(t('activity.toastResetTitle'), t('activity.toastResetMsg'), '🔄')
}

function triggerToast(title, msg, emoji = '✨') {
  if (toastTimer) clearTimeout(toastTimer)
  toastTitle.value = title
  toastMsg.value = msg
  toastEmoji.value = emoji
  showToast.value = true
  toastTimer = setTimeout(() => { showToast.value = false }, 3000)
}

function particleStyle(i) {
  const positions = [
    { top: '10%', left: '5%', size: '8px', delay: '0s' },
    { top: '20%', right: '10%', size: '12px', delay: '0.5s' },
    { top: '60%', left: '15%', size: '6px', delay: '1s' },
    { top: '40%', right: '20%', size: '10px', delay: '1.5s' },
    { top: '80%', left: '30%', size: '8px', delay: '0.8s' },
    { top: '30%', left: '50%', size: '14px', delay: '0.3s' }
  ]
  const p = positions[i - 1] || positions[0]
  return {
    position: 'absolute',
    width: p.size,
    height: p.size,
    top: p.top,
    left: p.left || undefined,
    right: p.right || undefined,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.4)',
    animation: `float 3s ease-in-out ${p.delay} infinite alternate`
  }
}

// ==================== Tips ====================
const tips = [
  {
    icon: '🌙',
    title: 'activity.tips.t0.title',
    desc: 'activity.tips.t0.desc'
  },
  {
    icon: '🥗',
    title: 'activity.tips.t1.title',
    desc: 'activity.tips.t1.desc'
  },
  {
    icon: '🤝',
    title: 'activity.tips.t2.title',
    desc: 'activity.tips.t2.desc'
  }
]

// ==================== Lifecycle ====================
onMounted(() => {
  loadData()
})
</script>

<style scoped>
@keyframes float {
  from { transform: translateY(0) scale(1); opacity: 0.4; }
  to   { transform: translateY(-12px) scale(1.2); opacity: 0.8; }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes sparkle {
  0%   { transform: scale(0.5); opacity: 1; }
  50%  { transform: scale(1.8); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
}

.animate-fade-up {
  animation: fade-up 0.6s ease-out both;
}

.sparkle-burst {
  animation: sparkle 0.8s ease-out forwards;
  pointer-events: none;
}

/* Toast transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* Dark mode overrides */
:global(.dark-mode-page) {
  background-color: #0F172A;
  color: #E2E8F0;
}
</style>
