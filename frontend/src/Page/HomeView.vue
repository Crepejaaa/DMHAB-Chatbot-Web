<template>
  <div :class="['min-h-screen bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500 overflow-x-hidden', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Navbar -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-[100]">
      <div class="flex items-center gap-1">
        <!-- โลโก้ Navbar -->
        <div class="w-12 h-12 flex items-center justify-center">
          <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
        </div>
        <span class="text-xl font-bold tracking-wide">DMHAB</span>
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

    <!-- 2. Hero Section -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
      <div class="scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h1 class="text-4xl font-extrabold text-[#1E293B] leading-tight mb-4">
          Daily Mental Health<br />Assessment Bot
        </h1>
        <p class="text-[#64748B] mb-8 text-base">
          "แชทบอทอาจไม่มีหัวใจ แต่ถูกสร้างขึ้นมาเพื่อให้คุณกล้าเปิดใจในวันที่เหนื่อยล้าที่สุด"
          "การกดบันทึกอารมณ์ในวันนี้ คือจุดเริ่มต้นของการรักตัวเองในวันพรุ่งนี้"
        </p>
        <button @click="$router.push('/assessment')" class="bg-gradient-to-b from-[#0D9488] to-[#059669] text-white px-5 py-2.5 text-sm font-medium rounded-xl shadow-md hover:shadow-lg transform active:scale-95 transition-all inline-flex items-center justify-center">
          เริ่มต้นใช้งาน
        </button>
      </div>
      <div class="flex justify-center scroll-anim opacity-0 scale-95 transition-all duration-1000 delay-200 ease-out">
        <div class="w-80 h-64 bg-white/60 border-2 border-dashed border-[#0D9488]/30 rounded-2xl flex items-center justify-center text-[#0D9488] font-medium">
          [รูปภาพ]
        </div>
      </div>
    </section>

    <!-- 3. Features Highlight Section -->
    <section class="max-w-6xl mx-auto px-6 py-12 text-center">
      <h2 class="text-xl md:text-2xl font-bold mb-10 text-[#1E293B] scroll-anim opacity-0 translate-y-10 transition-all duration-700 ease-out">
        "ทำไมแชทบอทของเราถึงเป็นเพื่อนคู่คิดด้านสุขภาพจิตที่ดีที่สุดของคุณ"
      </h2>
      
      <div class="grid md:grid-cols-3 gap-6 items-stretch">
        <div class="scroll-anim opacity-0 translate-y-16 transition-all duration-700 delay-100 ease-out h-full">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-full hover:shadow-md transition">
            <div class="text-3xl mb-4">❤️</div>
            <h3 class="font-bold text-lg mb-2">การดูแลแบบเฉพาะบุคคล</h3>
            <p class="text-xs text-[#64748B]">แนวทางการบำบัดให้ตอบโจทย์ปัญหาและเป้าหมายของแต่ละบุคคล</p>
          </div>
        </div>

        <div class="scroll-anim opacity-0 translate-y-16 transition-all duration-700 delay-300 ease-out h-full">
          <div class="bg-gradient-to-b from-[#0D9488] to-[#059669] text-white p-8 rounded-2xl shadow-lg transform md:-translate-y-2 flex flex-col items-center justify-center h-full">
            <div class="text-3xl mb-4">✨</div>
            <h3 class="font-bold text-lg mb-2">พูดคุยได้ 24 ชั่วโมง</h3>
            <p class="text-xs text-[#D1FAE5]">มีบริการให้คำปรึกษาออนไลน์ที่เลือกเวลาได้ตามสะดวก</p>
          </div>
        </div>

        <div class="scroll-anim opacity-0 translate-y-16 transition-all duration-700 delay-500 ease-out h-full">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-full hover:shadow-md transition">
            <div class="text-3xl mb-4">🛡️</div>
            <h3 class="font-bold text-lg mb-2">พื้นที่ปลอดภัย</h3>
            <p class="text-xs text-[#64748B]">การันตีการเก็บรักษาความลับของคุณจะปลอดภัยในบรรยากาศที่สบายใจ</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. About Us Section -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
      <div class="flex justify-center scroll-anim opacity-0 -translate-x-16 transition-all duration-1000 ease-out">
        <div class="w-72 h-72 bg-white/60 border-2 border-dashed border-[#0D9488]/30 rounded-2xl flex items-center justify-center text-[#0D9488] font-medium">
          [รูปภาพ]
        </div>
      </div>
      <div class="scroll-anim opacity-0 translate-x-16 transition-all duration-1000 delay-200 ease-out">
        <span class="text-xs font-semibold text-[#0D9488] uppercase tracking-wider">About Us</span>
        <h2 class="text-2xl font-bold mt-2 mb-4 leading-snug">
          "เราคือพื้นที่ปลอดภัยในรูปแบบแชทบอท ที่พร้อมรับฟังเช็คอินอารมณ์และช่วยคุณดูแลสุขภาพจิตในชีวิตประจำวันตลอด 24 ชั่วโมงเพราะเราเชื่อว่าทุกความรู้สึกของคุณมีความหมาย"
        </h2>
        <button class="px-6 py-2 bg-[#0D9488] hover:bg-[#045F54] text-white rounded-full font-medium text-sm transition shadow-sm mt-2">
          อ่านต่อ
        </button>
      </div>
    </section>

    <!-- 5. App Banner Section -->
    <section class="max-w-6xl mx-auto px-6 py-12">
      <div class="bg-white text-[#1E293B] border border-gray-100 rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-xl scroll-anim opacity-0 translate-y-16 transition-all duration-1000 ease-out">
        <div class="p-8 md:p-12 flex items-center justify-center bg-[#FAF9F5]">
          <div class="w-48 h-80 bg-white border-2 border-dashed border-[#0D9488]/40 rounded-3xl flex items-center justify-center text-[#0D9488] font-medium shadow-sm hover:scale-105 transition duration-500">
            [รูปตัวแชท]
          </div>
        </div>
        <div class="p-8 md:p-12 flex flex-col justify-center">
          <h2 class="text-2xl font-bold mb-6 leading-relaxed text-[#1E293B]">
            การใช้แชทบอทวิเคราะห์และประเมินสุขภาพจิต เพื่อยกระดับคุณภาพชีวิตในทุกๆ วัน
          </h2>
          <div class="space-y-4 text-sm">
            <div class="flex items-center gap-3 bg-[#FAF9F5] p-3 rounded-xl border border-gray-100 transition hover:bg-[#D1FAE5]/30">
              <span class="bg-[#0D9488]/10 p-2 rounded-lg text-[#0D9488]">🩺</span>
              <span class="font-medium text-[#1E293B]">Professional Assessment</span>
            </div>
            <div class="flex items-center gap-3 bg-[#FAF9F5] p-3 rounded-xl border border-gray-100 transition hover:bg-[#D1FAE5]/30">
              <span class="bg-[#0D9488]/10 p-2 rounded-lg text-[#0D9488]">💡</span>
              <span class="font-medium text-[#1E293B]">Real-time Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Articles Section -->
    <section class="max-w-6xl mx-auto px-6 py-12">
      <div class="flex justify-between items-end mb-8 scroll-anim opacity-0 translate-y-10 transition-all duration-700 ease-out">
        <div>
          <span class="text-xs font-semibold text-[#0D9488] uppercase tracking-wider">Articles</span>
          <h2 class="text-2xl font-bold mt-2 text-[#1E293B]">
            บทความที่น่ารู้เกี่ยวกับสภาวะจิตใจ
          </h2>
        </div>
        <router-link to="/blog" class="hidden md:block text-sm font-medium text-[#0D9488] hover:text-[#045F54] transition">
          ดูบทความทั้งหมด &rarr;
        </router-link>
      </div>

      <div v-if="loading && visibleArticles.length === 0" class="grid md:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="animate-pulse rounded-2xl border border-gray-100 bg-white p-0 overflow-hidden shadow-sm">
          <div class="h-48 bg-[#E5E7EB]"></div>
          <div class="p-6 space-y-3">
            <div class="h-4 w-20 rounded-full bg-[#E5E7EB]"></div>
            <div class="h-5 w-4/5 rounded bg-[#E5E7EB]"></div>
            <div class="h-4 w-full rounded bg-[#E5E7EB]"></div>
            <div class="h-4 w-2/3 rounded bg-[#E5E7EB]"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid md:grid-cols-3 gap-6">
        <div v-for="article in visibleArticles" :key="article.id" class="scroll-anim opacity-0 translate-y-16 transition-all duration-700 ease-out">
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group h-full flex flex-col justify-between">
            <div>
              <img
                :src="article.coverImageUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'"
                :alt="article.title"
                class="h-48 w-full object-cover border-b border-gray-100 group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div class="p-6">
                <div class="mb-2 flex items-center justify-between gap-3">
                  <span class="inline-flex rounded-full bg-[#0D9488]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0D9488]">{{ article.category || 'บทความ' }}</span>
                  <span class="text-[10px] text-[#64748B]">{{ formatDate(article.createdAt) }}</span>
                </div>
                <h3 class="font-bold text-lg mb-2 text-[#1E293B] line-clamp-2">{{ article.title }}</h3>
                <p class="text-sm text-[#64748B] mb-4 line-clamp-2">{{ article.excerpt || article.content?.slice(0, 120) }}</p>
              </div>
            </div>
            <div class="px-6 pb-6 pt-0">
              <div class="mb-3 flex items-center justify-between gap-2 text-[10px] text-[#64748B]">
                <span>แหล่ง: {{ article.sourceName || 'DMHAB' }}</span>
                <a v-if="article.sourceUrl" :href="article.sourceUrl" target="_blank" rel="noreferrer" class="text-[#0D9488] hover:underline">ดูต้นฉบับ</a>
              </div>
              <router-link :to="'/blog/' + (article.slug || article.id)" class="text-[#0D9488] font-medium text-sm hover:underline inline-block">อ่านต่อ &rarr;</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center md:hidden">
        <router-link to="/blog" class="text-sm font-medium text-[#0D9488] hover:text-[#045F54] transition border border-[#0D9488] px-6 py-2 rounded-full inline-block">
          ดูบทความทั้งหมด
        </router-link>
      </div>
    </section>

    <!-- 7. Footer -->
    <footer class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 mt-10 scroll-anim opacity-0 transition-opacity duration-1000 ease-out">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 pb-8 border-b border-white/20 text-sm">
        <div>
          <!-- โลโก้ Footer -->
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
            <li><a href="#" class="hover:underline">Daily Chatbot</a></li>
            <li><a href="#" class="hover:underline">Personalized Feedback</a></li>
            <li><router-link to="/blog" class="hover:underline">Self-Care Resource Library</router-link></li>
          </ul>
        </div>
        <div>
          <router-link to="/contact" class="font-bold mb-3 block hover:underline">Contact</router-link>
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
import { inject, onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ProfileMenu from '../components/ProfileMenu.vue'

const router = useRouter()
const isColorBlindMode = inject('isColorBlindMode', false)
const loading = ref(false)
const mobileMenuOpen = ref(false)

const fallbackArticles = [
  {
    id: 1,
    slug: 'stress-management',
    title: 'วิธีรับมือกับความเครียดจากการทำงาน',
    excerpt: 'ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อย การรับรู้ และปรับสมดุลชีวิตที่ดีจะช่วยลดความเหนื่อยล้าและรักษาสุขภาพจิตได้',
    content: 'ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อยในยุคปัจจุบัน หลายคนรู้สึกเหนื่อยล้า ขาดแรงจูงใจ และมีความกังวลจนส่งผลต่อสุขภาพกายและสุขภาพจิต.',
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
    content: 'การนอนหลับมีบทบาทสำคัญต่อการควบคุมอารมณ์และการทำงานของสมอง หากร่างกายไม่ได้พักผ่อนเพียงพอ ความสามารถในการคิดวิเคราะห์จะลดลง.',
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
    content: 'สุขภาพจิตที่ดีไม่ได้หมายถึงการที่ไม่มีอารมณ์แปรปรวน แต่หมายถึงความสามารถในการรับมือกับอารมณ์และหาทางช่วยเหลือเมื่อความกังวลเริ่มท่วมท้น.',
    category: 'คำปรึกษา',
    coverImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'Mental Health Foundation',
    sourceUrl: 'https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/mental-health-awareness',
    createdAt: '2026-07-20T00:00:00.000Z'
  }
]

const articles = ref(fallbackArticles.map((article) => ({ ...article })))
const visibleArticles = computed(() => (articles.value && articles.value.length > 0 ? articles.value : fallbackArticles))

const formatDate = (dateValue) => {
  if (!dateValue) return 'ไม่ระบุวันที่'
  const date = new Date(dateValue)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const goToLogin = () => {
  mobileMenuOpen.value = false
  router.push('/login')
}

const goToRegister = () => {
  mobileMenuOpen.value = false
  router.push('/register')
}

const fetchArticles = async () => {
  articles.value = fallbackArticles.map((article) => ({ ...article }))
  loading.value = false

  try {
    const { data } = await axios.get('http://localhost:3000/api/articles')
    if (Array.isArray(data) && data.length > 0) {
      articles.value = data
    } else {
      articles.value = fallbackArticles.map((article) => ({ ...article }))
    }
  } catch (error) {
    console.error('Failed to load articles:', error)
    articles.value = fallbackArticles.map((article) => ({ ...article }))
  } finally {
    loading.value = false
  }
}

let observer = null

onMounted(() => {
  fetchArticles()

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          'opacity-0',
          'translate-y-10',
          'translate-y-16',
          '-translate-x-16',
          'translate-x-16',
          'scale-95'
        )
        entry.target.classList.add('opacity-100', 'translate-y-0', 'translate-x-0', 'scale-100')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
  })

  const animElements = document.querySelectorAll('.scroll-anim')
  animElements.forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>