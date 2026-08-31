<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Header & Navbar (เหมือน BlogView) -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-4 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <nav class="w-full flex items-center justify-between mb-10 relative z-10">
        <div class="flex items-center gap-3">
          <router-link to="/blog" class="hover:bg-white/20 p-2 rounded-full transition" title="กลับหน้า Blog">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
          <router-link to="/" class="flex items-center gap-2">
            <img src="/image_Logo.png" alt="DMHAB Logo" class="w-10 h-10 object-contain" />
            <span class="text-xl font-bold tracking-wide">DMHAB</span>
          </router-link>
        </div>

        <div class="hidden md:flex gap-8 items-center text-sm font-medium">
          <router-link to="/" class="hover:text-[#D1FAE5] transition">Home</router-link>
          <router-link to="/about" class="hover:text-[#D1FAE5] transition">About</router-link>
          <router-link to="/services" class="hover:text-[#D1FAE5] transition">Services</router-link>
          <router-link to="/blog" class="text-white font-bold underline decoration-2 underline-offset-4">Blog</router-link>
        </div>

        <div class="flex gap-3 items-center text-sm">
          <div class="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm" title="โหมดขาวดำสำหรับผู้ตาบอดสี">
            <span class="text-xs font-semibold text-white hidden sm:inline">Color Blindness</span>
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

      <!-- Page Title -->
      <div class="container mx-auto px-6 lg:px-10 pt-6 pb-20 relative z-10">
        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              {{ article?.title || 'บทความ' }}
            </h1>
            <div class="flex items-center gap-4 text-xs md:text-sm text-[#D1FAE5]">
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ article ? formatDate(article.createdAt) : '...' }}
              </span>
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ article ? getReadTime(article.content || '') : '...' }}
              </span>
              <span class="bg-white/20 px-3 py-0.5 rounded-full text-xs font-medium">{{ article?.category || 'บทความ' }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. Main Content -->
    <main v-if="loading" class="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
      <div class="space-y-8 animate-pulse">
        <div class="h-80 rounded-[2rem] bg-[#E5E7EB]"></div>
        <div class="space-y-4 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <div class="h-5 w-24 rounded-full bg-[#E5E7EB]"></div>
          <div class="h-8 w-2/3 rounded bg-[#E5E7EB]"></div>
          <div class="h-4 w-full rounded bg-[#E5E7EB]"></div>
          <div class="h-4 w-5/6 rounded bg-[#E5E7EB]"></div>
          <div class="h-4 w-full rounded bg-[#E5E7EB]"></div>
          <div class="h-4 w-4/5 rounded bg-[#E5E7EB]"></div>
          <div class="h-12 w-40 rounded-full bg-[#D9EDE8]"></div>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="n in 2" :key="n" class="h-40 rounded-2xl bg-[#E5E7EB]"></div>
        </div>
      </div>
    </main>

    <main v-else-if="errorMessage" class="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
      <div class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{{ errorMessage }}</div>
    </main>

    <main v-else class="flex-1 w-full max-w-4xl mx-auto px-6 py-16">

      <div v-if="article" class="space-y-10">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
          <img
            :src="article.coverImageUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'"
            :alt="article.title"
            class="h-64 md:h-80 w-full object-cover"
          />
        </div>

        <article class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-10">
          <div class="mb-8 flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
            <span class="bg-[#0D9488]/10 text-[#0D9488] px-3 py-1 rounded-full font-semibold">{{ article.category }}</span>
            <span>{{ formatDate(article.createdAt) }}</span>
            <span>{{ getReadTime(article.content || '') }}</span>
          </div>

          <div class="mb-10">
            <p class="text-lg text-[#64748B] leading-relaxed font-medium italic border-l-4 border-[#0D9488] pl-6">
              {{ article.excerpt || article.content?.slice(0, 180) }}
            </p>
          </div>

          <div v-for="(paragraph, index) in parseContent(article.content || '')" :key="index" class="mb-6 last:mb-0">
            <p class="text-[#64748B] leading-relaxed text-base whitespace-pre-line">{{ paragraph }}</p>
          </div>

          <div class="mt-12 rounded-2xl bg-gradient-to-r from-[#0D9488]/5 to-[#059669]/5 p-6 border border-[#0D9488]/10">
            <h3 class="text-lg font-bold text-[#1E293B] mb-3">แหล่งอ้างอิง</h3>
            <p class="text-[#64748B] leading-relaxed">
              ข้อมูลบทความนี้อ้างอิงจาก
              <a v-if="article.sourceUrl" :href="article.sourceUrl" target="_blank" rel="noreferrer" class="text-[#0D9488] underline hover:text-[#045F54]">
                {{ article.sourceName || 'แหล่งข้อมูล' }}
              </a>
              <span v-else>{{ article.sourceName || 'แหล่งข้อมูล' }}</span>
            </p>
          </div>
        </article>

        <section class="mb-10">
          <h2 class="text-2xl font-extrabold text-[#1E293B] mb-6">บทความที่เกี่ยวข้อง</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <router-link
              v-for="related in relatedArticles"
              :key="related.id"
              :to="'/blog/' + (related.slug || related.id)"
              class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group block"
            >
              <img
                :src="related.coverImageUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'"
                :alt="related.title"
                class="h-36 w-full object-cover border-b border-gray-100"
              />
              <div class="p-5">
                <span class="text-xs text-[#64748B] mb-1 block">{{ formatDate(related.createdAt) }}</span>
                <h3 class="font-bold text-[#1E293B] group-hover:text-[#0D9488] transition-colors">{{ related.title }}</h3>
              </div>
            </router-link>
          </div>
        </section>

        <div class="text-center">
          <router-link
            to="/blog"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white px-8 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับไปหน้าบทความทั้งหมด
          </router-link>
        </div>
      </div>
    </main>

    <!-- 3. Footer (เหมือน BlogView) -->
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
import { inject, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import ProfileMenu from '../components/ProfileMenu.vue'

const isColorBlindMode = inject('isColorBlindMode', ref(false))
const route = useRoute()
const article = ref(null)
const relatedArticles = ref([])
const loading = ref(true)
const errorMessage = ref('')

const formatDate = (dateValue) => {
  if (!dateValue) return 'ไม่ระบุวันที่'
  const date = new Date(dateValue)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const getReadTime = (contentText = '') => {
  const words = (contentText || '').trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(3, Math.ceil(words / 180))
  return `อ่าน ${minutes} นาที`
}

const parseContent = (contentText = '') => {
  if (!contentText) return []
  return contentText
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

const fallbackArticles = [
  {
    id: 1,
    slug: 'stress-management',
    title: 'วิธีรับมือกับความเครียดจากการทำงาน',
    excerpt: 'ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อย การรับรู้ และปรับสมดุลชีวิตที่ดีจะช่วยลดความเหนื่อยล้าและรักษาสุขภาพจิตได้',
    content: 'ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อยในยุคปัจจุบัน หลายคนรู้สึกเหนื่อยล้า ขาดแรงจูงใจ และมีความกังวลจนส่งผลต่อสุขภาพกายและสุขภาพจิต.\n\nการจัดลำดับความสำคัญของงานและจัดสรรเวลาพักสั้น ๆ จึงมีความสำคัญอย่างยิ่ง.\n\nการหายใจลึก ๆ เป็นวิธีที่ง่ายและมีประสิทธิภาพอย่างมากในการลดความเครียดทันที หากรู้สึกกดดัน ให้หยุดพัก 2-3 นาทีแล้วหายใจเข้า-ออกช้า ๆ.\n\nการกำหนดขอบเขตระหว่างเวลา work และ personal life เป็นอีกหนึ่งกลยุทธ์ที่ช่วยลดความเครียด และทำให้จิตใจกลับมาอยู่กับปัจจุบันมากขึ้น.\n\nหากมีอาการเหนื่อยล้าหรือหมดไฟมากเกินไป ควรขอความช่วยเหลือจากผู้เชี่ยวชาญเพื่อรับแนวทางดูแลที่เหมาะสมและปลอดภัย',
    category: 'สุขภาพจิต',
    coverImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'World Health Organization',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response',
    createdAt: '2026-07-26T00:00:00.000Z'
  },
  {
    id: 2,
    slug: 'sleep-and-mood',
    title: 'ทำไมการนอนหลับถึงส่งผลต่ออารมณ์ของเรา',
    excerpt: 'การนอนหลับที่ไม่เพียงพอ ส่งผลต่อความสามารถในการควบคุมอารมณ์และลดความสามารถในการตอบสนองต่อความเครียด',
    content: 'การนอนหลับมีบทบาทสำคัญต่อการควบคุมอารมณ์และการทำงานของสมอง หากร่างกายไม่ได้พักผ่อนเพียงพอ ความสามารถในการคิดวิเคราะห์และควบคุมอารมณ์จะลดลง.\n\nคนที่นอนน้อยมักเกิดอาการหงุดหงิดง่าย วิตกกังวลมากขึ้น และรู้สึกหมดแรงได้ง่ายกว่าปกติ.\n\nปริมาณการนอนที่เหมาะสมสำหรับผู้ใหญ่คือประมาณ 7-9 ชั่วโมงต่อคืน และการนอนในเวลาที่สม่ำเสมอช่วยให้ร่างกายฟื้นฟูได้ดีขึ้น.\n\nการลดการใช้หน้าจอก่อนนอน ห้องนอนที่มืดและเงียบ และหลีกเลี่ยงสิ่งกระตุ้นก่อนนอนจะช่วยให้คุณนอนหลับได้ดีขึ้น.',
    category: 'การนอนหลับ',
    coverImageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'Sleep Foundation',
    sourceUrl: 'https://www.sleepfoundation.org/sleep-hygiene',
    createdAt: '2026-07-24T00:00:00.000Z'
  },
  {
    id: 3,
    slug: 'warning-signs',
    title: 'สัญญาณเตือนว่าคุณควรปรึกษาผู้เชี่ยวชาญ',
    excerpt: 'สัญญาณบางอย่าง เช่น ความเศร้าอย่างต่อเนื่อง วิตกกังวลมากเกินไป หรือเปลี่ยนแปลงการนอนและการกิน เป็นตัวบ่งชี้ว่าควรขอคำปรึกษาเร็วขึ้น',
    content: 'สุขภาพจิตที่ดีไม่ได้หมายถึงการที่ไม่มีอารมณ์แปรปรวน แต่หมายถึงความสามารถในการรับมือกับอารมณ์และหาทางช่วยเหลือเมื่อความกังวลเริ่มท่วมท้น.\n\nสัญญาณที่ควรระวัง เช่น รู้สึกเศร้า สิ้นหวัง หรือหมดแรงเกินไปเป็นเวลานาน ความวิตกกังวลที่รบกวนการทำงาน หรือการเปลี่ยนแปลงพฤติกรรม เช่น นอนไม่หลับ กินผิดปกติ หรือถอนตัวจากคนรอบข้าง.\n\nเมื่อมีความคิดทำร้ายตัวเองหรือมีอาการที่ส่งผลกระทบต่อการใช้ชีวิตประจำวัน ควรขอความช่วยเหลือทันที.',
    category: 'คำปรึกษา',
    coverImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'Mental Health Foundation',
    sourceUrl: 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/mental-health-awareness',
    createdAt: '2026-07-20T00:00:00.000Z'
  }
]

const fetchArticle = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const articleSlug = route.params.id
    const { data } = await axios.get(`http://localhost:3000/api/articles/${articleSlug}`)
    const loadedArticle = data && Object.keys(data).length > 0 ? data : fallbackArticles.find((item) => item.slug === articleSlug || String(item.id) === String(articleSlug))

    article.value = loadedArticle || fallbackArticles[0]

    const allArticlesResponse = await axios.get('http://localhost:3000/api/articles')
    const allArticles = Array.isArray(allArticlesResponse.data) && allArticlesResponse.data.length > 0 ? allArticlesResponse.data : fallbackArticles
    relatedArticles.value = allArticles.filter((item) => item.id !== article.value.id).slice(0, 2)
  } catch (error) {
    console.error('Failed to load article detail:', error)
    const fallbackArticle = fallbackArticles.find((item) => item.slug === route.params.id || String(item.id) === String(route.params.id)) || fallbackArticles[0]
    article.value = fallbackArticle
    relatedArticles.value = fallbackArticles.filter((item) => item.id !== fallbackArticle.id).slice(0, 2)
    errorMessage.value = ''
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, () => {
  fetchArticle()
}, { immediate: true })
</script>
