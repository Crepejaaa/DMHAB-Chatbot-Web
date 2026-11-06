<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isDarkMode ? 'dark-mode-page' : '']">

    <!-- 1. Navbar -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          @click="$router.options.history.state?.back ? $router.back() : $router.push('/')"
          class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center"
          :title="$t('common.back')"
          :aria-label="$t('common.back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <router-link to="/" class="flex items-center gap-1.5 sm:gap-2">
          <!-- โลโก้ Navbar -->
          <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
            <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
          </div>
          <span class="text-xl font-bold tracking-wide">{{ $t('common.brand') }}</span>
        </router-link>
      </div>
      
      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" exact class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.home') }}</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.about') }}</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.services') }}</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">{{ $t('nav.blog') }}</router-link>
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

    <!-- 2. Green Banner Header -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-4 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>


      <div class="container mx-auto px-6 lg:px-10 pt-6 pb-20 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              {{ $t('blog.title') }}
            </h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed italic">
              {{ $t('blog.subtitle1') }}<br />
              {{ $t('blog.subtitle2') }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full max-w-6xl mx-auto px-6 py-10 md:py-16">
      <div class="mt-8 flex justify-end">
        <div class="inline-flex rounded-full border border-[#0D9488]/20 bg-white p-1 shadow-sm">
          <button
            type="button"
            @click="layoutMode = 'grid'"
            :class="layoutMode === 'grid' ? 'bg-[#0D9488] text-white' : 'text-[#64748B] hover:text-[#0D9488]'"
            class="p-2 rounded-full transition"
            title="Grid View"
          >
            {{ $t('blog.grid') }}
          </button>
          <button
            type="button"
            @click="layoutMode = 'list'"
            :class="layoutMode === 'list' ? 'bg-[#0D9488] text-white' : 'text-[#64748B] hover:text-[#0D9488]'"
            class="p-2 rounded-full transition"
            title="List View"
          >
            {{ $t('blog.list') }}
          </button>
        </div>
      </div>

      <div v-if="loading" :class="articleLayoutClass" class="mt-10">
        <div
          v-for="n in 6"
          :key="n"
          :class="[
            'animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm',
            layoutMode === 'list' ? 'flex flex-col md:flex-row' : ''
          ]"
        >
          <div :class="layoutMode === 'list' ? 'md:w-72 h-48 md:h-auto bg-[#E5E7EB]' : 'h-48 bg-[#E5E7EB]'"></div>
          <div class="p-6 space-y-3 flex-1">
            <div class="h-4 w-20 rounded-full bg-[#E5E7EB]"></div>
            <div class="h-5 w-4/5 rounded bg-[#E5E7EB]"></div>
            <div class="h-4 w-full rounded bg-[#E5E7EB]"></div>
            <div class="h-4 w-2/3 rounded bg-[#E5E7EB]"></div>
            <div class="h-10 w-28 rounded-full bg-[#D9EDE8]"></div>
          </div>
        </div>
      </div>
      <div v-else-if="errorMessage" class="mt-10 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{{ errorMessage }}</div>
      <div v-else-if="articles.length === 0" class="mt-10 rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-[#64748B] shadow-sm">
        {{ $t('blog.empty') }}
      </div>

      <div v-else :class="articleLayoutClass" class="mt-10">
        <article
          v-for="article in articles"
          :key="article.id"
          :class="[
            'bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300',
            layoutMode === 'grid'
              ? 'flex flex-col justify-between'
              : 'flex flex-col md:flex-row justify-between items-stretch'
          ]"
        >
          <div :class="layoutMode === 'list' ? 'flex flex-col md:flex-row flex-1' : 'flex flex-col flex-1 justify-between'">
            <div :class="layoutMode === 'list' ? 'md:w-72 md:min-w-[288px] h-48 md:h-auto shrink-0 overflow-hidden' : 'h-48 overflow-hidden'">
              <img
                :src="article.coverImageUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'"
                :alt="article.title"
                class="h-full w-full object-cover border-b md:border-b-0 border-gray-100 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div class="mb-2 flex items-center justify-between gap-3">
                  <span class="inline-flex rounded-full bg-[#0D9488]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D9488]">{{ article.category || $t('blog.defaultCategory') }}</span>
                  <span class="text-[10px] text-[#64748B]">{{ formatDate(article.createdAt) }}</span>
                </div>
                <h3 class="font-bold text-lg mb-2 text-[#1E293B] hover:text-[#0D9488] transition-colors">
                  <router-link :to="'/blog/' + (article.slug || article.id)">{{ article.title }}</router-link>
                </h3>
                <p class="text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-2">{{ article.excerpt || article.content?.slice(0, 120) }}</p>
              </div>

              <div>
                <div class="mb-3 flex items-center justify-between gap-2 text-[10px] text-[#64748B]">
                  <span>{{ $t('blog.source', { name: article.sourceName || 'PhuenJaiZone' }) }}</span>
                  <a v-if="article.sourceUrl" :href="article.sourceUrl" target="_blank" rel="noreferrer" class="text-[#0D9488] hover:underline">{{ $t('blog.viewOriginal') }}</a>
                </div>
                <router-link
                  :to="'/blog/' + (article.slug || article.id)"
                  class="text-[#0D9488] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  {{ $t('blog.readMore') }} &rarr;
                </router-link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>

    <footer class="mt-auto w-full bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 shadow-inner">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <div class="flex items-center gap-1 mb-3">
            <div class="w-10 h-10 flex items-center justify-center">
              <img src="/phuenjaizone-logo.jpg" :alt="$t('common.logoAlt')" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">{{ $t('common.brand') }}</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">{{ $t('blog.footer.tagline') }}</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('blog.footer.services') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><router-link to="/services" class="hover:underline">{{ $t('blog.footer.dailyChatbot') }}</router-link></li>
            <li><router-link to="/services" class="hover:underline">{{ $t('blog.footer.personalizedFeedback') }}</router-link></li>
            <li><router-link to="/blog" class="hover:underline">{{ $t('blog.footer.library') }}</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">{{ $t('blog.footer.contact') }}</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ PhuenJaiZone@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">{{ $t('blog.footer.hotline') }}</router-link>
          <p class="text-xs text-[#D1FAE5]">{{ $t('blog.footer.hotlineText') }}</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        {{ $t('blog.footer.rights') }}
      </div>
    </footer>
  </div>
</template>

<script setup>
import { dateLocale } from '../i18n'
import { inject, ref, computed, onMounted } from 'vue'
import axios from '../api/axios'
import ProfileMenu from '../components/ProfileMenu.vue'
import AdminNavLink from '../components/AdminNavLink.vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isDarkMode = inject('isDarkMode', ref(false))
const articles = ref([])
const loading = ref(true)
const errorMessage = ref('')
const layoutMode = ref('grid')

const articleLayoutClass = computed(() => {
  return layoutMode.value === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'flex flex-col gap-6'
})

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(dateLocale(), {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

const fetchArticles = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const { data } = await axios.get('/api/articles')
    articles.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Failed to load articles:', error)
    errorMessage.value = t('blog.loadError')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})
</script>
