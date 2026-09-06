<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Navbar -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          @click="$router.options.history.state?.back ? $router.back() : $router.push('/')"
          class="hover:bg-white/20 p-2 rounded-full transition text-white shrink-0 cursor-pointer flex items-center justify-center"
          title="ย้อนกลับ"
          aria-label="ย้อนกลับ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <router-link to="/" class="flex items-center gap-1.5 sm:gap-2">
          <!-- โลโก้ Navbar -->
          <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
            <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
          </div>
          <span class="text-xl font-bold tracking-wide">DMHAB</span>
        </router-link>
      </div>
      
      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" exact class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">Home</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">About</router-link>
        <router-link to="/services" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">Services</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition" active-class="text-white font-bold underline decoration-2 underline-offset-4">Blog</router-link>
      </div>
      
      <div class="flex gap-3 items-center text-sm">
        <div class="hidden md:flex items-center gap-2 mr-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" title="โหมดขาวดำสำหรับผู้ตาบอดสี">
          <span class="text-xs font-semibold text-white">Color Blindness</span>
          <button
            @click="isColorBlindMode = !isColorBlindMode"
            :class="isColorBlindMode ? 'bg-white' : 'bg-[#045F54]'"
            class="relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner border border-white/30"
          >
            <span
              :class="isColorBlindMode ? 'translate-x-4 bg-[#1E293B]' : 'translate-x-1 bg-white'"
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
              Blog
            </h1>
            <p class="text-xs md:text-sm text-[#D1FAE5] max-w-2xl leading-relaxed italic">
              "อ่านและเรียนรู้เรื่องราวที่ช่วยให้คุณเข้าใจตัวเองมากขึ้น"<br />
              ค้นพบบทความแนวทางดูแลสุขภาพจิตและแรงบันดาลใจที่คุณอาจต้องการในแต่ละวัน
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
            class="px-4 py-2 rounded-full text-xs font-semibold transition"
          >
            Grid
          </button>
          <button
            type="button"
            @click="layoutMode = 'list'"
            :class="layoutMode === 'list' ? 'bg-[#0D9488] text-white' : 'text-[#64748B] hover:text-[#0D9488]'"
            class="px-4 py-2 rounded-full text-xs font-semibold transition"
          >
            List
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
                  <span class="inline-flex rounded-full bg-[#0D9488]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D9488]">{{ article.category || 'บทความ' }}</span>
                  <span class="text-[10px] text-[#64748B]">{{ formatDate(article.createdAt) }}</span>
                </div>
                <h3 class="font-bold text-lg mb-2 text-[#1E293B] hover:text-[#0D9488] transition-colors">
                  <router-link :to="'/blog/' + (article.slug || article.id)">{{ article.title }}</router-link>
                </h3>
                <p class="text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-2">{{ article.excerpt || article.content?.slice(0, 120) }}</p>
              </div>

              <div>
                <div class="mb-3 flex items-center justify-between gap-2 text-[10px] text-[#64748B]">
                  <span>แหล่ง: {{ article.sourceName || 'DMHAB' }}</span>
                  <a v-if="article.sourceUrl" :href="article.sourceUrl" target="_blank" rel="noreferrer" class="text-[#0D9488] hover:underline">ดูต้นฉบับ</a>
                </div>
                <router-link
                  :to="'/blog/' + (article.slug || article.id)"
                  class="text-[#0D9488] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  อ่านเพิ่มเติม &rarr;
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
              <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
            </div>
            <span class="font-bold text-lg">DMHAB</span>
          </div>
          <p class="text-xs text-[#D1FAE5] leading-relaxed">ผู้ช่วยประเมินสุขภาพจิตประจำวัน ให้คุณอุ่นใจได้เสมอ</p>
        </div>
        <div>
          <h4 class="font-bold mb-3">Services</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li><router-link to="/services" class="hover:underline">Daily Chatbot</router-link></li>
            <li><router-link to="/services" class="hover:underline">Personalized Feedback</router-link></li>
            <li><router-link to="/blog" class="hover:underline">Self-Care Resource Library</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3">Contact</h4>
          <ul class="space-y-2 text-xs text-[#D1FAE5]">
            <li>📞 02-XXX-XXXX</li>
            <li>✉️ DMHAB@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">Hotline</router-link>
          <p class="text-xs text-[#D1FAE5]">สายด่วนสุขภาพจิต 1323</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        © 2026 DMHAB. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { inject, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ProfileMenu from '../components/ProfileMenu.vue'

const isColorBlindMode = inject('isColorBlindMode', ref(false))
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
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

const fallbackArticles = [
  {
    id: 'stress-management',
    slug: 'stress-management',
    coverImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-07-26',
    category: 'สุขภาพจิต',
    title: 'วิธีรับมือกับความเครียดจากการทำงาน',
    excerpt: 'เรียนรู้วิธีจัดการความเครียดและปรับสมดุลชีวิตการทำงานเพื่อรักษาสุขภาพจิตที่ดีในระยะยาว',
    sourceName: 'DMHAB',
    sourceUrl: ''
  },
  {
    id: 'sleep-and-mood',
    slug: 'sleep-and-mood',
    coverImageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-07-24',
    category: 'การนอนหลับ',
    title: 'ทำไมการนอนหลับถึงส่งผลต่ออารมณ์ของเรา?',
    excerpt: 'การพักผ่อนที่ไม่เพียงพออาจเป็นสาเหตุหลักของอาการวิตกกังวลและความแปรปรวนทางอารมณ์',
    sourceName: 'DMHAB',
    sourceUrl: ''
  },
  {
    id: 'warning-signs',
    slug: 'warning-signs',
    coverImageUrl: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-07-20',
    category: 'คำปรึกษา',
    title: 'สัญญาณเตือนว่าคุณควรปรึกษาผู้เชี่ยวชาญ',
    excerpt: 'เช็คลิสต์อาการเบื้องต้นที่คุณไม่ควรมองข้ามเพื่อรับการดูแลและคำปรึกษาอย่างทันท่วงที',
    sourceName: 'DMHAB',
    sourceUrl: ''
  },
  {
    id: 'depression-teen-mhc11',
    slug: 'depression-teen-mhc11',
    coverImageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-01',
    category: 'โรคซึมเศร้า',
    title: 'โรคซึมเศร้าในวัยรุ่น: รู้จัก เข้าใจ และช่วยเหลือ',
    excerpt: 'วัยรุ่นที่เป็นโรคซึมเศร้ามักไม่ได้รับการวินิจฉัยเพราะสัญญาณที่แตกต่างจากผู้ใหญ่ รู้จักอาการและวิธีช่วยเหลือ',
    sourceName: 'ศูนย์สุขภาพจิตที่ 11 กรมสุขภาพจิต',
    sourceUrl: 'https://mhc11.dmh.go.th/knowledge/5094/'
  },
  {
    id: 'anxiety-disorder-mhc11',
    slug: 'anxiety-disorder-mhc11',
    coverImageUrl: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-05',
    category: 'ความวิตกกังวล',
    title: 'โรควิตกกังวล: มากกว่าแค่ "ขี้กังวล"',
    excerpt: 'ความวิตกกังวลที่มากเกินไปจนส่งผลต่อชีวิตประจำวันอาจเป็นสัญญาณของโรค ไม่ใช่แค่นิสัยส่วนตัว',
    sourceName: 'ศูนย์สุขภาพจิตที่ 11 กรมสุขภาพจิต',
    sourceUrl: 'https://mhc11.dmh.go.th/knowledge/5106/'
  },
  {
    id: 'depression-brochure-dmhpd',
    slug: 'depression-brochure-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-10',
    category: 'โรคซึมเศร้า',
    title: 'โรคซึมเศร้า: เข้าใจและรักษาได้',
    excerpt: 'โรคซึมเศร้าเป็นโรคที่รักษาได้ ไม่ใช่ความอ่อนแอ ทำความเข้าใจอาการ สาเหตุ และวิธีรักษา เพื่อกลับมามีชีวิตที่ดีได้อีกครั้ง',
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/media-brochure-depression-68-05-01/'
  },
  {
    id: 'suicide-prevention-dmhpd',
    slug: 'suicide-prevention-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-12',
    category: 'การป้องกัน',
    title: 'วิธีช่วยเหลือคนที่คิดจะทำร้ายตัวเอง',
    excerpt: 'เมื่อคนที่คุณรักอยู่ในวิกฤต คุณจะทำอะไรได้บ้าง? เรียนรู้วิธีรับฟัง สังเกตสัญญาณ และขอความช่วยเหลืออย่างถูกวิธี',
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/suicide1/'
  },
  {
    id: 'burnout-workplace-dmhpd',
    slug: 'burnout-workplace-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-15',
    category: 'Burnout',
    title: 'Burnout: ภาวะหมดไฟในการทำงาน รู้จัก รับมือ ฟื้นตัว',
    excerpt: 'เมื่อทุ่มเทกับงานจนร่างกายและจิตใจหมดแรง ภาวะ Burnout ไม่ใช่ความอ่อนแอ แต่เป็นสัญญาณที่ต้องใส่ใจ',
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/burnout2/'
  },
  {
    id: 'resilience-quotient-dmhpd',
    slug: 'resilience-quotient-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1488998527040-85054a85150e?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-20',
    category: 'ความยืดหยุ่น',
    title: 'RQ ความฉลาดทางด้านการฟื้นคืนพลัง: พลังแห่งการลุกขึ้นใหม่',
    excerpt: 'ความสามารถในการฟื้นตัวจากความยากลำบากเป็นสิ่งที่ฝึกได้ RQ หรือ Resilience Quotient คือกุญแจสำคัญสู่สุขภาพจิตที่แข็งแรง',
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/resilience-quotient1/'
  }
]

const fetchArticles = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const { data } = await axios.get('/api/articles')
    articles.value = Array.isArray(data) && data.length > 0 ? data : fallbackArticles
  } catch (error) {
    console.error('Failed to load articles:', error)
    errorMessage.value = ''
    articles.value = fallbackArticles
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})
</script>
