<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isColorBlindMode ? 'grayscale' : '']">

    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-4 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

      <nav class="w-full flex items-center justify-between mb-10 relative z-10">
        <div class="flex items-center gap-3">
          <router-link to="/" class="hover:bg-white/20 p-2 rounded-full transition" title="กลับหน้าหลัก">
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

        <div class="hidden md:flex gap-3 items-center text-sm">
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
        <div v-for="n in 6" :key="n" class="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div class="h-40 bg-[#E5E7EB]"></div>
          <div class="p-6 space-y-3">
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
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <img
              :src="article.coverImageUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'"
              :alt="article.title"
              class="h-40 w-full object-cover border-b border-gray-100"
            />
            <div class="p-6">
              <div class="mb-2 flex items-center justify-between gap-3">
                <span class="inline-flex rounded-full bg-[#0D9488]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D9488]">{{ article.category || 'บทความ' }}</span>
                <span class="text-[10px] text-[#64748B]">{{ formatDate(article.createdAt) }}</span>
              </div>
              <h3 class="font-bold text-lg mb-2 text-[#1E293B]">{{ article.title }}</h3>
              <p class="text-sm text-[#64748B] leading-relaxed mb-4">{{ article.excerpt || article.content?.slice(0, 120) }}</p>
            </div>
          </div>
          <div class="px-6 pb-6">
            <div class="mb-4 flex items-center justify-between gap-2 text-[10px] text-[#64748B]">
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
            <li><router-link to="/services" class="hover:underline">Self-Care Resource Library</router-link></li>
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
import { inject, ref, onMounted, computed } from 'vue'
import axios from 'axios'
import ProfileMenu from '../components/ProfileMenu.vue'

const isColorBlindMode = inject('isColorBlindMode', ref(false))
const articles = ref([])
const loading = ref(true)
const errorMessage = ref('')
const layoutMode = ref('grid')

const articleLayoutClass = computed(() =>
  layoutMode.value === 'list'
    ? 'flex flex-col gap-6'
    : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
)

const formatDate = (dateValue) => {
  if (!dateValue) return 'ไม่ระบุวันที่'
  const date = new Date(dateValue)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const fallbackArticles = [
  {
    id: 1,
    slug: 'stress-management',
    title: 'วิธีรับมือกับความเครียดจากการทำงาน',
    excerpt: 'ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อย การรับรู้ และปรับสมดุลชีวิตที่ดีจะช่วยลดความเหนื่อยล้าและรักษาสุขภาพจิตได้',
    content: 'ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อยในยุคปัจจุบัน หลายคนรู้สึกเหนื่อยล้า ขาดแรงจูงใจ และมีความกังวลจนส่งผลต่อสุขภาพกายและสุขภาพจิต. การจัดลำดับความสำคัญของงานและจัดสรรเวลาพักสั้น ๆ จึงมีความสำคัญอย่างยิ่ง.\n\nการหายใจลึก ๆ เป็นวิธีที่ง่ายและมีประสิทธิภาพอย่างมากในการลดความเครียดทันที หากรู้สึกกดดัน ให้หยุดพัก 2-3 นาทีแล้วหายใจเข้า-ออกช้า ๆ.\n\nการกำหนดขอบเขตระหว่างเวลา work และ personal life เป็นอีกหนึ่งกลยุทธ์ที่ช่วยลดความเครียด และทำให้จิตใจกลับมาอยู่กับปัจจุบันมากขึ้น.\n\nหากมีอาการเหนื่อยล้าหรือหมดไฟมากเกินไป ควรขอความช่วยเหลือจากผู้เชี่ยวชาญเพื่อรับแนวทางดูแลที่เหมาะสมและปลอดภัย',
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

const fetchArticles = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    const { data } = await axios.get('http://localhost:3000/api/articles')
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
