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

          <router-link to="/login" class="px-5 py-1.5 rounded-full border border-white/60 hover:bg-white/10 transition">
            Login
          </router-link>
          <router-link to="/register" class="px-5 py-1.5 bg-[#023832] hover:bg-[#01221E] text-white rounded-full font-medium transition shadow-sm">
            Register
          </router-link>
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
          <h4 class="font-bold mb-3">Hotline</h4>
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
import { inject, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const isColorBlindMode = inject('isColorBlindMode', ref(false))
const route = useRoute()
const loading = ref(true)
const errorMessage = ref('')
const article = ref(null)
const apiRelatedArticles = ref([])

// ข้อมูลบทความทั้งหมด
const articlesData = {
  'stress-management': {
    id: 'stress-management',
    image: '[รูปภาพบทความ 1]',
    date: '26 กรกฎาคม 2026',
    readTime: 'อ่าน 5 นาที',
    category: 'สุขภาพจิต',
    title: 'วิธีรับมือกับความเครียดจากการทำงาน',
    description: 'เรียนรู้วิธีจัดการความเครียดและปรับสมดุลชีวิตการทำงานเพื่อรักษาสุขภาพจิตที่ดีในระยะยาว',
    intro: 'ความเครียดจากการทำงานเป็นปัญหาที่พบได้ทั่วไปในยุคปัจจุบัน หลายคนรู้สึกหมดไฟ เหนื่อยล้า และไม่มีแรงจูงใจในการทำงาน ซึ่งหากปล่อยไว้นานอาจส่งผลกระทบต่อสุขภาพจิตและร่างกายได้',
    sections: [
      {
        heading: 'ทำความรู้จักกับภาวะ Burnout',
        content: 'Burnout หรือภาวะหมดไฟ เป็นอาการเครียดเรื้อรังจากการทำงานที่ส่งผลให้เกิดความเหนื่อยล้าทั้งทางร่างกายและจิตใจ รู้สึกว่างเปล่า ขาดแรงจูงใจ และมีประสิทธิภาพในการทำงานลดลง\n\nสัญญาณที่ควรสังเกตได้แก่ ความเหนื่อยล้าที่ไม่หายแม้จะพักผ่อนแล้ว การขาดความกระตือรือร้น ความรู้สึกไม่มีคุณค่า และอาการทางกายเช่น ปวดหัว นอนไม่หลับ'
      },
      {
        heading: 'เทคนิคจัดการความเครียดเบื้องต้น',
        content: 'การหายใจลึกๆ (Deep Breathing) เป็นวิธีที่ง่ายที่สุดในการลดความเครียดในทันที ลองหายใจเข้า 4 วินาที กลั้นไว้ 4 วินาที และหายใจออก 6 วินาที ทำซ้ำ 5-10 ครั้ง\n\nการจัดลำดับความสำคัญของงาน ช่วยลดความรู้สึกท่วมท้นจากปริมาณงานมาก ลองใช้เทคนิค Eisenhower Matrix แบ่งงานเป็น 4 ช่อง ตามความเร่งด่วนและความสำคัญ'
      },
      {
        heading: 'การสร้างขอบเขตในการทำงาน',
        content: 'การตั้งขอบเขตที่ชัดเจนระหว่างเวลาทำงานและเวลาส่วนตัวเป็นสิ่งจำเป็น พยายามไม่ตอบอีเมลหรือข้อความงานนอกเวลาทำงาน\n\nเรียนรู้ที่จะปฏิเสธงานที่เกินกำลัง การรับงานมากเกินไปเป็นสาเหตุหลักของความเครียด ลองฝึกพูดว่า "ขอบคุณที่เชื่อมั่น แต่ตอนนี้มีงานเต็มมือแล้ว"'
      },
      {
        heading: 'กิจกรรมผ่อนคลายหลังเลิกงาน',
        content: 'ออกกำลังกายอย่างน้อย 30 นาทีต่อวัน ไม่จำเป็นต้องหนัก แค่เดินเร็ว โยคะ หรือว่ายน้ำก็ได้ การออกกำลังกายช่วยปลดปล่อยสารเอ็นดอร์ฟินที่ทำให้รู้สึกดี\n\nเขียนไดอารี่ก่อนนอน บันทึกสิ่งที่รู้สึกขอบคุณ 3 อย่างในแต่ละวัน เป็นเทคนิค Gratitude Journaling ที่มีงานวิจัยรับรองว่าช่วยเพิ่มความสุขได้จริง'
      }
    ],
    conclusion: 'ความเครียดจากการทำงานเป็นเรื่องปกติที่ทุกคนต้องเผชิญ สิ่งสำคัญคือการรู้ตัวเร็วและเริ่มจัดการก่อนที่จะส่งผลกระทบรุนแรง หากรู้สึกว่าไม่สามารถจัดการได้ด้วยตัวเอง อย่าลังเลที่จะขอความช่วยเหลือจากผู้เชี่ยวชาญ',
    tags: ['ความเครียด', 'Burnout', 'สุขภาพจิต', 'การทำงาน', 'Work-Life Balance']
  },
  'sleep-and-mood': {
    id: 'sleep-and-mood',
    image: '[รูปภาพบทความ 2]',
    date: '24 กรกฎาคม 2026',
    readTime: 'อ่าน 4 นาที',
    category: 'การนอนหลับ',
    title: 'ทำไมการนอนหลับถึงส่งผลต่ออารมณ์ของเรา?',
    description: 'การพักผ่อนที่ไม่เพียงพออาจเป็นสาเหตุหลักของอาการวิตกกังวลและความแปรปรวนทางอารมณ์',
    intro: 'การนอนหลับเป็นกิจกรรมที่ร่างกายต้องการเพื่อซ่อมแซมและฟื้นฟูตัวเอง โดยเฉพาะสมองที่ต้องการเวลาในการจัดระเบียบข้อมูลและควบคุมอารมณ์ หากนอนไม่พอ สมองจะทำงานได้ไม่เต็มที่',
    sections: [
      {
        heading: 'ความสัมพันธ์ระหว่างการนอนหลับกับอารมณ์',
        content: 'งานวิจัยพบว่าคนที่นอนน้อยกว่า 6 ชั่วโมงต่อคืน มีแนวโน้มที่จะมีอาการซึมเศร้าและวิตกกังวลสูงกว่าปกติ เพราะสมองส่วน Amygdala ที่ควบคุมอารมณ์จะทำงานมากเกินไปเมื่อพักผ่อนไม่เพียงพอ\n\nในขณะเดียวกัน Prefrontal Cortex ที่ช่วยควบคุมและตัดสินใจจะทำงานลดลง ทำให้เราหงุดหงิดง่าย ควบคุมอารมณ์ได้ยากขึ้น'
      },
      {
        heading: 'ปริมาณการนอนที่เหมาะสมตามช่วงวัย',
        content: 'ผู้ใหญ่อายุ 18-64 ปี ควรนอน 7-9 ชั่วโมงต่อคืน\nผู้สูงอายุ 65 ปีขึ้นไป ควรนอน 7-8 ชั่วโมงต่อคืน\nวัยรุ่น 14-17 ปี ควรนอน 8-10 ชั่วโมงต่อคืน\n\nไม่ใช่แค่ปริมาณ แต่คุณภาพการนอนก็สำคัญ การนอนหลับลึกอย่างเพียงพอจะช่วยให้ร่างกายและจิตใจฟื้นตัวได้เต็มที่'
      },
      {
        heading: 'เคล็ดลับการนอนหลับที่ดี (Sleep Hygiene)',
        content: 'เข้านอนและตื่นในเวลาเดิมทุกวัน แม้ในวันหยุด เพื่อสร้างนาฬิกาชีวภาพที่สม่ำเสมอ\n\nหลีกเลี่ยงหน้าจอมือถือและคอมพิวเตอร์อย่างน้อย 1 ชั่วโมงก่อนนอน แสงสีฟ้าจากหน้าจอจะยับยั้งการผลิต Melatonin ซึ่งเป็นฮอร์โมนที่ช่วยให้หลับ\n\nสร้างสภาพแวดล้อมที่เหมาะสม ห้องนอนควรมืด เงียบ และเย็นสบาย อุณหภูมิที่เหมาะสมอยู่ที่ประมาณ 18-22 องศาเซลเซียส'
      }
    ],
    conclusion: 'การนอนหลับที่ดีเป็นรากฐานสำคัญของสุขภาพจิต ลองเริ่มปรับพฤติกรรมการนอนทีละเล็กทีละน้อย คุณจะรู้สึกถึงความเปลี่ยนแปลงทางอารมณ์ได้ภายในไม่กี่สัปดาห์',
    tags: ['การนอนหลับ', 'อารมณ์', 'สุขภาพจิต', 'Sleep Hygiene']
  },
  'warning-signs': {
    id: 'warning-signs',
    image: '[รูปภาพบทความ 3]',
    date: '20 กรกฎาคม 2026',
    readTime: 'อ่าน 6 นาที',
    category: 'คำปรึกษา',
    title: 'สัญญาณเตือนว่าคุณควรปรึกษาผู้เชี่ยวชาญ',
    description: 'เช็คลิสต์อาการเบื้องต้นที่คุณไม่ควรมองข้ามเพื่อรับการดูแลและคำปรึกษาอย่างทันท่วงที',
    intro: 'การดูแลสุขภาพจิตด้วยตัวเองเป็นสิ่งที่ดี แต่บางครั้งเราอาจต้องการความช่วยเหลือจากผู้เชี่ยวชาญ การรู้จักสัญญาณเตือนจะช่วยให้คุณตัดสินใจได้ถูกเวลา',
    sections: [
      {
        heading: 'สัญญาณทางอารมณ์',
        content: 'ความรู้สึกเศร้าหรือสิ้นหวังที่ไม่หายไปนานกว่า 2 สัปดาห์\nความวิตกกังวลที่รุนแรงจนส่งผลกระทบต่อชีวิตประจำวัน\nความรู้สึกว่างเปล่าหรือชาไม่รู้สึกอะไร\nอารมณ์แปรปรวนรุนแรง เปลี่ยนแปลงอย่างรวดเร็วโดยไม่มีสาเหตุ\nความรู้สึกผิดหรือไร้ค่าอย่างต่อเนื่อง'
      },
      {
        heading: 'สัญญาณทางพฤติกรรม',
        content: 'การนอนหลับผิดปกติ นอนมากเกินไปหรือนอนไม่หลับเลย\nการกินอาหารเปลี่ยนแปลง กินมากผิดปกติหรือเบื่ออาหาร\nแยกตัวออกจากสังคม ไม่อยากพบเจอใคร\nประสิทธิภาพในการทำงานหรือเรียนลดลงอย่างชัดเจน\nการพึ่งพาสารเสพติดหรือแอลกอฮอล์มากขึ้น'
      },
      {
        heading: 'สัญญาณที่ต้องรีบขอความช่วยเหลือทันที',
        content: 'หากมีความคิดทำร้ายตัวเองหรือผู้อื่น ให้ติดต่อสายด่วนสุขภาพจิต 1323 ทันที\n\nสัญญาณฉุกเฉินได้แก่:\n• มีความคิดอยากตายหรือทำร้ายตัวเอง\n• เคยพยายามทำร้ายตัวเองมาก่อน\n• ได้ยินเสียงหรือเห็นภาพที่คนอื่นไม่ได้ยินหรือเห็น\n• ไม่สามารถดูแลตัวเองได้ในชีวิตประจำวัน'
      },
      {
        heading: 'ช่องทางขอความช่วยเหลือ',
        content: 'สายด่วนสุขภาพจิต กรมสุขภาพจิต โทร 1323 (24 ชั่วโมง)\nสายด่วนป้องกันการฆ่าตัวตาย โทร 1387\nแอปพลิเคชัน DMHAB ของเรา พร้อมให้คำปรึกษาเบื้องต้นตลอด 24 ชั่วโมง\n\nการขอความช่วยเหลือไม่ใช่ความอ่อนแอ แต่เป็นความกล้าหาญที่จะดูแลตัวเอง'
      }
    ],
    conclusion: 'สุขภาพจิตสำคัญไม่แพ้สุขภาพกาย อย่ารอจนอาการรุนแรง หากสังเกตเห็นสัญญาณเหล่านี้ในตัวเองหรือคนรอบข้าง อย่าลังเลที่จะขอความช่วยเหลือ เพราะการรักษาแต่เนิ่นๆ จะให้ผลลัพธ์ที่ดีกว่า',
    tags: ['สัญญาณเตือน', 'ปรึกษาผู้เชี่ยวชาญ', 'สุขภาพจิต', 'สายด่วน 1323']
  }
}

const fetchArticle = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const articleSlug = route.params.id
    const { data } = await axios.get(`/api/articles/${articleSlug}`)
    const loadedArticle = data && Object.keys(data).length > 0 ? data : fallbackArticles.find((item) => item.slug === articleSlug || String(item.id) === String(articleSlug))
    article.value = loadedArticle || fallbackArticles[0]

    const allArticlesResponse = await axios.get('/api/articles')
    const allArticles = Array.isArray(allArticlesResponse.data) && allArticlesResponse.data.length > 0 ? allArticlesResponse.data : fallbackArticles
    relatedArticles.value = allArticles.filter((item) => String(item.id) !== String(article.value.id) && item.slug !== articleSlug).slice(0, 2)
  } catch (error) {
    console.error('Failed to load article detail:', error)
    article.value = null
    apiRelatedArticles.value = []
    errorMessage.value = ''
  } finally {
    loading.value = false
  }
}

// หาบทความปัจจุบันจาก route param หรือ API
const currentArticle = computed(() => {
  if (article.value && article.value.title) {
    return article.value
  }
  const id = route.params.id
  return articlesData[id] || articlesData['stress-management']
})

// บทความที่เกี่ยวข้อง (ทุกบทความยกเว้นบทความปัจจุบัน)
const relatedArticles = computed(() => {
  if (apiRelatedArticles.value.length > 0) {
    return apiRelatedArticles.value
  }
  const currentId = route.params.id
  return Object.values(articlesData)
    .filter(a => a.id !== currentId)
    .slice(0, 2)
})
watch(() => route.params.id, () => {
  fetchArticle()
}, { immediate: true })
</script>
