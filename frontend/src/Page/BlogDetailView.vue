<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Header & Navbar (เหมือน BlogView) -->
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

    <!-- 2. Green Banner Header -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-4 pb-16 px-6 lg:px-12 relative overflow-hidden shadow-md">
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
        </svg>
      </div>

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

          <div v-for="(block, index) in parseContent(article.content || '')" :key="index" class="mb-6 last:mb-0">
            <h2 v-if="block.type === 'heading'" class="text-xl font-bold text-[#1E293B] leading-relaxed">{{ block.text }}</h2>
            <ul v-else-if="block.type === 'list'" class="list-disc pl-6 space-y-2 text-[#64748B] leading-relaxed text-base">
              <li>{{ block.text }}</li>
            </ul>
            <p v-else class="text-[#64748B] leading-relaxed text-base whitespace-pre-line">{{ block.text }}</p>
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
    slug: 'stress-management',
    coverImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-07-26',
    category: 'สุขภาพจิต',
    title: 'วิธีรับมือกับความเครียดจากการทำงาน',
    excerpt: 'เรียนรู้วิธีจัดการความเครียดและปรับสมดุลชีวิตการทำงานเพื่อรักษาสุขภาพจิตที่ดีในระยะยาว',
    content: `ความเครียดจากการทำงานเป็นปัญหาที่พบได้ทั่วไปในยุคปัจจุบัน หลายคนรู้สึกหมดไฟ เหนื่อยล้า และไม่มีแรงจูงใจในการทำงาน ซึ่งหากปล่อยไว้นานอาจส่งผลกระทบต่อสุขภาพจิตและร่างกายได้

**ทำความรู้จักกับภาวะ Burnout**

Burnout หรือภาวะหมดไฟ เป็นอาการเครียดเรื้อรังจากการทำงานที่ส่งผลให้เกิดความเหนื่อยล้าทั้งทางร่างกายและจิตใจ รู้สึกว่างเปล่า ขาดแรงจูงใจ และมีประสิทธิภาพในการทำงานลดลง สัญญาณที่ควรสังเกตได้แก่ ความเหนื่อยล้าที่ไม่หายแม้จะพักผ่อนแล้ว การขาดความกระตือรือร้น ความรู้สึกไม่มีคุณค่า และอาการทางกายเช่น ปวดหัว นอนไม่หลับ

**เทคนิคจัดการความเครียดเบื้องต้น**

การหายใจลึกๆ (Deep Breathing) เป็นวิธีที่ง่ายที่สุดในการลดความเครียดในทันที ลองหายใจเข้า 4 วินาที กลั้นไว้ 4 วินาที และหายใจออก 6 วินาที ทำซ้ำ 5-10 ครั้ง

การจัดลำดับความสำคัญของงาน ช่วยลดความรู้สึกท่วมท้นจากปริมาณงานมาก ลองใช้เทคนิค Eisenhower Matrix แบ่งงานเป็น 4 ช่อง ตามความเร่งด่วนและความสำคัญ

**การสร้างขอบเขตในการทำงาน**

การตั้งขอบเขตที่ชัดเจนระหว่างเวลาทำงานและเวลาส่วนตัวเป็นสิ่งจำเป็น พยายามไม่ตอบอีเมลหรือข้อความงานนอกเวลาทำงาน เรียนรู้ที่จะปฏิเสธงานที่เกินกำลัง

**กิจกรรมผ่อนคลายหลังเลิกงาน**

ออกกำลังกายอย่างน้อย 30 นาทีต่อวัน ไม่จำเป็นต้องหนัก แค่เดินเร็ว โยคะ หรือว่ายน้ำก็ได้ การออกกำลังกายช่วยปลดปล่อยสารเอ็นดอร์ฟินที่ทำให้รู้สึกดี และการเขียนไดอารี่ก่อนนอนบันทึกสิ่งที่รู้สึกขอบคุณก็ช่วยเพิ่มความสุขได้จริง`,
    sourceName: 'DMHAB',
    sourceUrl: '',
    tags: ['ความเครียด', 'Burnout', 'สุขภาพจิต', 'การทำงาน', 'Work-Life Balance']
  },
  'sleep-and-mood': {
    id: 'sleep-and-mood',
    slug: 'sleep-and-mood',
    coverImageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-07-24',
    category: 'การนอนหลับ',
    title: 'ทำไมการนอนหลับถึงส่งผลต่ออารมณ์ของเรา?',
    excerpt: 'การพักผ่อนที่ไม่เพียงพออาจเป็นสาเหตุหลักของอาการวิตกกังวลและความแปรปรวนทางอารมณ์',
    content: `การนอนหลับเป็นกิจกรรมที่ร่างกายต้องการเพื่อซ่อมแซมและฟื้นฟูตัวเอง โดยเฉพาะสมองที่ต้องการเวลาในการจัดระเบียบข้อมูลและควบคุมอารมณ์ หากนอนไม่พอ สมองจะทำงานได้ไม่เต็มที่

**ความสัมพันธ์ระหว่างการนอนหลับกับอารมณ์**

งานวิจัยพบว่าคนที่นอนน้อยกว่า 6 ชั่วโมงต่อคืน มีแนวโน้มที่จะมีอาการซึมเศร้าและวิตกกังวลสูงกว่าปกติ เพราะสมองส่วน Amygdala ที่ควบคุมอารมณ์จะทำงานมากเกินไปเมื่อพักผ่อนไม่เพียงพอ ในขณะเดียวกัน Prefrontal Cortex ที่ช่วยควบคุมและตัดสินใจจะทำงานลดลง ทำให้เราหงุดหงิดง่าย ควบคุมอารมณ์ได้ยากขึ้น

**ปริมาณการนอนที่เหมาะสมตามช่วงวัย**

- ผู้ใหญ่อายุ 18-64 ปี: ควรนอน 7-9 ชั่วโมงต่อคืน
- ผู้สูงอายุ 65 ปีขึ้นไป: ควรนอน 7-8 ชั่วโมงต่อคืน
- วัยรุ่น 14-17 ปี: ควรนอน 8-10 ชั่วโมงต่อคืน

ไม่ใช่แค่ปริมาณ แต่คุณภาพการนอนก็สำคัญ การนอนหลับลึกอย่างเพียงพอจะช่วยให้ร่างกายและจิตใจฟื้นตัวได้เต็มที่

**เคล็ดลับการนอนหลับที่ดี (Sleep Hygiene)**

เข้านอนและตื่นในเวลาเดิมทุกวัน แม้ในวันหยุด เพื่อสร้างนาฬิกาชีวภาพที่สม่ำเสมอ หลีกเลี่ยงหน้าจอมือถือและคอมพิวเตอร์อย่างน้อย 1 ชั่วโมงก่อนนอน และสร้างสภาพแวดล้อมที่ห้องนอนมืด เงียบ และเย็นสบาย`,
    sourceName: 'DMHAB',
    sourceUrl: '',
    tags: ['การนอนหลับ', 'อารมณ์', 'สุขภาพจิต', 'Sleep Hygiene']
  },
  'warning-signs': {
    id: 'warning-signs',
    slug: 'warning-signs',
    coverImageUrl: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-07-20',
    category: 'คำปรึกษา',
    title: 'สัญญาณเตือนว่าคุณควรปรึกษาผู้เชี่ยวชาญ',
    excerpt: 'เช็คลิสต์อาการเบื้องต้นที่คุณไม่ควรมองข้ามเพื่อรับการดูแลและคำปรึกษาอย่างทันท่วงที',
    content: `การดูแลสุขภาพจิตด้วยตัวเองเป็นสิ่งที่ดี แต่บางครั้งเราอาจต้องการความช่วยเหลือจากผู้เชี่ยวชาญ การรู้จักสัญญาณเตือนจะช่วยให้คุณตัดสินใจได้ถูกเวลา

**สัญญาณทางอารมณ์**

ความรู้สึกเศร้าหรือสิ้นหวังที่ไม่หายไปนานกว่า 2 สัปดาห์ ความวิตกกังวลที่รุนแรงจนส่งผลกระทบต่อชีวิตประจำวัน ความรู้สึกว่างเปล่าหรือชาไม่รู้สึกอะไร อารมณ์แปรปรวนรุนแรง และความรู้สึกผิดหรือไร้ค่าอย่างต่อเนื่อง

**สัญญาณทางพฤติกรรม**

การนอนหลับผิดปกติ นอนมากเกินไปหรือนอนไม่หลับเลย การกินอาหารเปลี่ยนแปลง แยกตัวออกจากสังคม ไม่อยากพบเจอใคร ประสิทธิภาพในการทำงานหรือเรียนลดลง และการพึ่งพาสารเสพติดหรือแอลกอฮอล์มากขึ้น

**สัญญาณที่ต้องรีบขอความช่วยเหลือทันที**

หากมีความคิดทำร้ายตัวเองหรือผู้อื่น ให้ติดต่อสายด่วนสุขภาพจิต 1323 ทันที สัญญาณฉุกเฉินได้แก่: มีความคิดอยากตายหรือทำร้ายตัวเอง, เคยพยายามทำร้ายตัวเองมาก่อน, ได้ยินเสียงหรือเห็นภาพที่คนอื่นไม่ได้ยิน, หรือไม่สามารถดูแลตัวเองได้ในชีวิตประจำวัน

**ช่องทางขอความช่วยเหลือ**

- สายด่วนสุขภาพจิต กรมสุขภาพจิต โทร **1323** (ตลอด 24 ชั่วโมง)
- สายด่วนป้องกันการฆ่าตัวตาย โทร **1387**
- โรงพยาบาลใกล้บ้านทุกแห่ง`,
    sourceName: 'DMHAB',
    sourceUrl: '',
    tags: ['สัญญาณเตือน', 'ปรึกษาผู้เชี่ยวชาญ', 'สุขภาพจิต', 'สายด่วน 1323']
  },
  'depression-teen-mhc11': {
    id: 'depression-teen-mhc11',
    slug: 'depression-teen-mhc11',
    coverImageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-01',
    category: 'โรคซึมเศร้า',
    title: 'โรคซึมเศร้าในวัยรุ่น: รู้จัก เข้าใจ และช่วยเหลือ',
    excerpt: 'วัยรุ่นที่เป็นโรคซึมเศร้ามักไม่ได้รับการวินิจฉัยเพราะสัญญาณที่แตกต่างจากผู้ใหญ่ รู้จักอาการและวิธีช่วยเหลือ',
    content: `โรคซึมเศร้าในวัยรุ่นเป็นภาวะที่ต้องได้รับความสนใจอย่างจริงจัง เพราะวัยรุ่นมักแสดงอาการแตกต่างจากผู้ใหญ่ ทำให้ผู้ปกครองและครูมองข้ามหรือเข้าใจผิดว่าเป็นพฤติกรรมปกติของวัยรุ่น

**อาการซึมเศร้าในวัยรุ่นที่ควรสังเกต**

วัยรุ่นที่มีภาวะซึมเศร้ามักแสดงออกด้วยความหงุดหงิด โกรธง่าย หรือก้าวร้าวมากกว่าความเศร้า นอกจากนี้ยังมีอาการ ได้แก่ ผลการเรียนตกต่ำลงอย่างกะทันหัน ไม่สนใจกิจกรรมที่เคยชอบ แยกตัวจากเพื่อนและครอบครัว บ่นเรื่องเจ็บปวดทางร่างกายบ่อยๆ เช่น ปวดหัว ปวดท้อง และรู้สึกว่าตัวเองไม่มีค่า

**สาเหตุที่ทำให้วัยรุ่นซึมเศร้า**

ปัจจัยที่ส่งผลได้แก่ ความกดดันทางการเรียน ปัญหาความสัมพันธ์กับเพื่อน การถูกกลั่นแกล้ง (รวมถึงการกลั่นแกล้งออนไลน์) ปัญหาครอบครัว ฮอร์โมนที่เปลี่ยนแปลง และอาจมีพันธุกรรมเป็นปัจจัยร่วม

**วิธีช่วยเหลือวัยรุ่นที่ซึมเศร้า**

รับฟังโดยไม่ตัดสิน แสดงให้เห็นว่าคุณใส่ใจ ไม่ควรบอกให้ "สู้ๆ" หรือ "แค่นี้เอง" เพราะจะยิ่งทำให้รู้สึกแย่ขึ้น ควรพาไปพบแพทย์หรือนักจิตวิทยา และติดตามอาการอย่างต่อเนื่อง

**การรักษา**

โรคซึมเศร้าในวัยรุ่นรักษาได้ผลดีด้วยการบำบัดทางจิต (จิตบำบัด) และหากจำเป็น แพทย์อาจพิจารณาใช้ยาร่วมด้วย การรักษาเร็วจะให้ผลดีกว่า อย่ารอจนอาการรุนแรง`,
    sourceName: 'ศูนย์สุขภาพจิตที่ 11 กรมสุขภาพจิต',
    sourceUrl: 'https://mhc11.dmh.go.th/knowledge/5094/',
    tags: ['โรคซึมเศร้า', 'วัยรุ่น', 'สุขภาพจิต', 'การช่วยเหลือ']
  },
  'anxiety-disorder-mhc11': {
    id: 'anxiety-disorder-mhc11',
    slug: 'anxiety-disorder-mhc11',
    coverImageUrl: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-05',
    category: 'ความวิตกกังวล',
    title: 'โรควิตกกังวล: มากกว่าแค่ "ขี้กังวล"',
    excerpt: 'ความวิตกกังวลที่มากเกินไปจนส่งผลต่อชีวิตประจำวันอาจเป็นสัญญาณของโรค ไม่ใช่แค่นิสัยส่วนตัว',
    content: `ความวิตกกังวลเป็นอารมณ์ปกติที่ทุกคนรู้สึก แต่เมื่อความกังวลนั้นรุนแรงและต่อเนื่องจนรบกวนชีวิตประจำวัน อาจเข้าข่ายโรควิตกกังวล ซึ่งเป็นปัญหาสุขภาพจิตที่พบบ่อยที่สุดในโลก

**โรควิตกกังวลมีกี่ประเภท?**

โรควิตกกังวลมีหลายประเภท เช่น โรควิตกกังวลทั่วไป (GAD) ที่กังวลเรื่องต่างๆ อย่างต่อเนื่อง โรคแพนิค (Panic Disorder) ที่มีอาการใจสั่น หายใจไม่ออกอย่างกะทันหัน โรคกลัวสังคม (Social Anxiety) และโรคย้ำคิดย้ำทำ (OCD)

**อาการที่บ่งบอกว่าอาจเป็นโรควิตกกังวล**

- รู้สึกกังวลต่อเนื่องนานกว่า 6 เดือน
- ควบคุมความกังวลไม่ได้
- กล้ามเนื้อเกร็ง ปวดศีรษะ
- นอนไม่หลับหรือหลับไม่สนิท
- ใจสั่น เหงื่อออก มือสั่น เมื่อต้องเผชิญสถานการณ์ที่กลัว
- หลีกเลี่ยงสถานการณ์บางอย่างจนกระทบชีวิตประจำวัน

**วิธีรับมือกับความวิตกกังวล**

เทคนิคการหายใจลึกและการผ่อนคลายกล้ามเนื้อช่วยได้ในระยะสั้น การบำบัดด้วยการปรับความคิดและพฤติกรรม (CBT) ถือเป็นวิธีที่ได้ผลดีที่สุดในระยะยาว นอกจากนี้การออกกำลังกายสม่ำเสมอ ลดคาเฟอีน และนอนหลับให้เพียงพอก็ช่วยได้

**เมื่อไหรควรพบแพทย์**

หากความวิตกกังวลส่งผลให้ไม่สามารถทำงาน เรียน หรือดูแลตัวเองได้ตามปกติ ควรปรึกษาจิตแพทย์หรือนักจิตวิทยา เพราะโรควิตกกังวลรักษาได้และมีทางเลือกในการรักษาหลายวิธี`,
    sourceName: 'ศูนย์สุขภาพจิตที่ 11 กรมสุขภาพจิต',
    sourceUrl: 'https://mhc11.dmh.go.th/knowledge/5106/',
    tags: ['โรควิตกกังวล', 'Anxiety', 'สุขภาพจิต', 'CBT']
  },
  'depression-brochure-dmhpd': {
    id: 'depression-brochure-dmhpd',
    slug: 'depression-brochure-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-10',
    category: 'โรคซึมเศร้า',
    title: 'โรคซึมเศร้า: เข้าใจและรักษาได้',
    excerpt: 'โรคซึมเศร้าเป็นโรคที่รักษาได้ ไม่ใช่ความอ่อนแอ ทำความเข้าใจอาการ สาเหตุ และวิธีรักษา เพื่อกลับมามีชีวิตที่ดีได้อีกครั้ง',
    content: `โรคซึมเศร้า (Depression) เป็นโรคทางจิตเวชที่ส่งผลต่อความรู้สึก ความคิด และพฤติกรรม กรมสุขภาพจิตพบว่าคนไทยป่วยเป็นโรคซึมเศร้ากว่า 1.5 ล้านคน และมีเพียงส่วนน้อยที่ได้รับการรักษา

**โรคซึมเศร้าคืออะไร?**

โรคซึมเศร้าไม่ใช่ความอ่อนแอหรือการ "คิดมาก" แต่เป็นโรคที่เกิดจากความผิดปกติของสารเคมีในสมอง ได้แก่ เซโรโทนิน โดปามีน และนอร์เอปิเนฟริน ที่ไม่สมดุล ส่งผลให้เกิดความเศร้าเรื้อรัง หมดเรี่ยวแรง และสูญเสียความสนใจในสิ่งต่างๆ

**อาการของโรคซึมเศร้า**

อาการที่ต้องมีอย่างน้อย 2 สัปดาห์ ได้แก่ รู้สึกเศร้า หดหู่ ว่างเปล่า หรือหมดหวัง, สูญเสียความสนใจหรือความสุขในสิ่งที่เคยชอบ, น้ำหนักเปลี่ยนแปลง, นอนไม่หลับหรือหลับมากผิดปกติ, อ่อนเพลียหมดแรง, รู้สึกไร้ค่าหรือผิดปกติ, สมาธิลดลง, มีความคิดเรื่องความตาย

**สาเหตุของโรคซึมเศร้า**

โรคซึมเศร้าเกิดจากหลายปัจจัยร่วมกัน ได้แก่ พันธุกรรม ความไม่สมดุลของสารเคมีในสมอง เหตุการณ์เครียดในชีวิต โรคทางกาย และการใช้ยาบางชนิด

**การรักษา**

โรคซึมเศร้ารักษาได้ด้วยยาต้านซึมเศร้า การทำจิตบำบัด หรือทั้งสองวิธีร่วมกัน ผู้ป่วยส่วนใหญ่มีอาการดีขึ้นภายใน 2-4 สัปดาห์หลังได้รับการรักษา สิ่งสำคัญคือต้องรักษาต่อเนื่องและไม่หยุดยาเองแม้อาการจะดีขึ้น`,
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/media-brochure-depression-68-05-01/',
    tags: ['โรคซึมเศร้า', 'Depression', 'การรักษา', 'สุขภาพจิต']
  },
  'suicide-prevention-dmhpd': {
    id: 'suicide-prevention-dmhpd',
    slug: 'suicide-prevention-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-12',
    category: 'การป้องกัน',
    title: 'วิธีช่วยเหลือคนที่คิดจะทำร้ายตัวเอง',
    excerpt: 'เมื่อคนที่คุณรักอยู่ในวิกฤต คุณจะทำอะไรได้บ้าง? เรียนรู้วิธีรับฟัง สังเกตสัญญาณ และขอความช่วยเหลืออย่างถูกวิธี',
    content: `การป้องกันการฆ่าตัวตายเป็นหน้าที่ของทุกคนในสังคม การเรียนรู้วิธีสังเกตสัญญาณเตือนและการช่วยเหลืออย่างถูกต้องอาจช่วยรักษาชีวิตได้

**สัญญาณเตือนที่ควรใส่ใจ**

- พูดถึงความตายหรือการอยากตายบ่อยๆ
- พูดว่าตัวเองเป็นภาระหรือไม่มีประโยชน์
- แจกจ่ายของรัก หรือทำพินัยกรรม
- ซื้อสิ่งของที่อาจใช้ทำร้ายตัวเอง
- อยู่โดดเดี่ยวมากขึ้นกะทันหัน
- ดูสงบผิดปกติหลังจากที่เคยซึมเศร้า

**วิธีช่วยเหลือเบื้องต้น (หลัก A-C-T)**

**A - Ask (ถาม)**: กล้าถามตรงๆ ว่า "คุณมีความคิดอยากตายไหม?" การถามไม่ได้ทำให้คนมีความคิดฆ่าตัวตาย แต่ช่วยเปิดพื้นที่ให้พูดคุย

**C - Care (แสดงความห่วงใย)**: รับฟังอย่างตั้งใจโดยไม่ตัดสิน แสดงให้เห็นว่าคุณใส่ใจและเป็นห่วง อยู่เป็นเพื่อนในช่วงวิกฤต

**T - Tell (บอก)**: แนะนำให้ขอความช่วยเหลือจากผู้เชี่ยวชาญ และช่วยพาไปพบแพทย์หรือโทรสายด่วน

**ช่องทางขอความช่วยเหลือ**

- สายด่วนสุขภาพจิต: **1323** (24 ชั่วโมง)
- สายด่วนป้องกันการฆ่าตัวตาย: **1387**
- ห้องฉุกเฉินโรงพยาบาลใกล้บ้าน

**สิ่งที่ไม่ควรทำ**

อย่าบอกให้ "สู้ๆ" หรือ "แค่นี้เอง" อย่าสัญญาว่าจะเก็บเป็นความลับ อย่าทิ้งคนไว้คนเดียวในช่วงวิกฤต`,
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/suicide1/',
    tags: ['การป้องกันการฆ่าตัวตาย', 'วิกฤต', 'สายด่วน 1323', 'การช่วยเหลือ']
  },
  'burnout-workplace-dmhpd': {
    id: 'burnout-workplace-dmhpd',
    slug: 'burnout-workplace-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-15',
    category: 'Burnout',
    title: 'Burnout: ภาวะหมดไฟในการทำงาน รู้จัก รับมือ ฟื้นตัว',
    excerpt: 'เมื่อทุ่มเทกับงานจนร่างกายและจิตใจหมดแรง ภาวะ Burnout ไม่ใช่ความอ่อนแอ แต่เป็นสัญญาณที่ต้องใส่ใจ',
    content: `Burnout หรือ "ภาวะหมดไฟ" ได้รับการรับรองจากองค์การอนามัยโลก (WHO) ว่าเป็นปรากฏการณ์ที่เกิดจากความเครียดสะสมในที่ทำงานซึ่งไม่ได้รับการจัดการอย่างเหมาะสม

**3 มิติของ Burnout ตาม WHO**

1. **ความเหนื่อยล้าทางอารมณ์** (Emotional Exhaustion): รู้สึกหมดแรง ล้า หมดพลัง แม้ว่าจะพักผ่อนแล้ว
2. **ความเย็นชาต่อหน้าที่** (Depersonalization): รู้สึกเฉยชา ไม่แยแส มองงานและคนรอบข้างในแง่ลบ
3. **ประสิทธิภาพลดลง** (Reduced Personal Accomplishment): รู้สึกว่าตัวเองทำงานได้ไม่ดี ไม่มีผลลัพธ์

**สัญญาณของ Burnout**

- เบื่องาน ไม่อยากตื่นมาทำงาน
- หงุดหงิด กังวล อยู่ตลอดเวลา
- ผลผลิตในการทำงานลดลง ทำผิดพลาดบ่อยขึ้น
- แยกตัวจากเพื่อนร่วมงาน
- อาการทางกาย เช่น ปวดหัว ปวดหลัง ปวดท้อง

**วิธีฟื้นตัวจาก Burnout**

ขั้นแรก: ยอมรับว่าตัวเองกำลังประสบภาวะนี้ ขั้นที่สอง: พูดคุยกับหัวหน้าเรื่องการปรับลดงาน ขั้นที่สาม: ดูแลตัวเองด้วยการนอนหลับให้เพียงพอ ออกกำลังกาย และทำกิจกรรมที่ชอบ ขั้นที่สี่: ตั้งขอบเขตระหว่างงานและชีวิตส่วนตัวอย่างชัดเจน และขอความช่วยเหลือจากนักจิตวิทยาหากจำเป็น`,
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/burnout2/',
    tags: ['Burnout', 'หมดไฟ', 'ความเครียดจากงาน', 'สุขภาพจิต']
  },
  'resilience-quotient-dmhpd': {
    id: 'resilience-quotient-dmhpd',
    slug: 'resilience-quotient-dmhpd',
    coverImageUrl: 'https://images.unsplash.com/photo-1488998527040-85054a85150e?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-08-20',
    category: 'ความยืดหยุ่น',
    title: 'RQ ความฉลาดทางด้านการฟื้นคืนพลัง: พลังแห่งการลุกขึ้นใหม่',
    excerpt: 'ความสามารถในการฟื้นตัวจากความยากลำบากเป็นสิ่งที่ฝึกได้ RQ หรือ Resilience Quotient คือกุญแจสำคัญสู่สุขภาพจิตที่แข็งแรง',
    content: `RQ (Resilience Quotient) หรือ ความฉลาดทางการฟื้นคืนพลัง คือความสามารถในการปรับตัวและฟื้นตัวจากความยากลำบาก ความล้มเหลว และเหตุการณ์เครียดต่างๆ ในชีวิต

**RQ คืออะไร และทำไมถึงสำคัญ?**

ชีวิตเต็มไปด้วยความท้าทายและอุปสรรค คนที่มี RQ สูงจะไม่ย่อท้อต่อความล้มเหลว แต่ใช้ประสบการณ์นั้นเป็นบทเรียนและลุกขึ้นใหม่ได้เร็วกว่า งานวิจัยพบว่า RQ สัมพันธ์กับสุขภาพจิตที่ดี ความสำเร็จในการทำงาน และความสัมพันธ์ที่มีคุณภาพ

**องค์ประกอบของ RQ**

1. **การควบคุมอารมณ์**: สามารถรับรู้และจัดการอารมณ์ได้อย่างเหมาะสม
2. **การมองโลกในแง่ดีอย่างสมจริง**: เชื่อว่าสถานการณ์จะดีขึ้น แต่ไม่ปฏิเสธความเป็นจริง
3. **การวิเคราะห์สาเหตุ**: หาสาเหตุของปัญหาอย่างมีเหตุผล ไม่โทษตัวเองมากเกินไป
4. **ความเห็นอกเห็นใจ**: เข้าใจผู้อื่นและสร้างความสัมพันธ์ที่ดี
5. **ความสามารถในการแก้ปัญหา**: หาวิธีแก้ไขปัญหาได้หลายวิธี

**วิธีพัฒนา RQ**

- ฝึกสติ (Mindfulness) ทุกวัน แม้เพียง 5-10 นาที
- เรียนรู้จากความล้มเหลวแทนการหลีกเลี่ยง
- สร้างเครือข่ายสนับสนุนทางสังคม
- ดูแลสุขภาพกายและจิตอย่างสม่ำเสมอ
- ตั้งเป้าหมายที่มีความหมายในชีวิต
- ฝึกมองปัญหาเป็นโอกาสในการเติบโต`,
    sourceName: 'กรมสุขภาพจิต กระทรวงสาธารณสุข',
    sourceUrl: 'https://dmhpd.dmh.go.th/resilience-quotient1/',
    tags: ['RQ', 'Resilience', 'ความยืดหยุ่น', 'สุขภาพจิต', 'การพัฒนาตัวเอง']
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'ไม่ระบุวันที่'
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getReadTime = (content) => {
  if (!content) return 'อ่าน 3 นาที'
  const words = content.length
  const minutes = Math.max(1, Math.ceil(words / 400))
  return `อ่าน ${minutes} นาที`
}

const parseContent = (content) => {
  if (!content) return []
  return content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
      return lines.map((line) => {
        const isHeading = /^\*\*.*\*\*$/.test(line)
        const isList = /^([-*]|\d+\.)\s+/.test(line)
        return {
          type: isHeading ? 'heading' : isList ? 'list' : 'paragraph',
          text: line
            .replace(/^([-*]|\d+\.)\s+/, '')
            .replace(/^\*\*|\*\*$/g, '')
            .replace(/\*\*(.*?)\*\*/g, '$1')
        }
      })
    })
}

const fetchArticle = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const articleSlug = route.params.id
    const localArticle = articlesData[articleSlug] || Object.values(articlesData).find((item) => item.slug === articleSlug || String(item.id) === String(articleSlug))

    try {
      const { data } = await axios.get(`/api/articles/${articleSlug}`)
      if (data && Object.keys(data).length > 0) {
        article.value = localArticle
          ? {
              ...localArticle,
              ...data,
              content: (data.content?.length || 0) >= (localArticle.content?.length || 0)
                ? data.content
                : localArticle.content
            }
          : data
      } else {
        article.value = localArticle || Object.values(articlesData)[0]
      }
    } catch {
      article.value = localArticle || Object.values(articlesData)[0]
    }

    try {
      const allArticlesResponse = await axios.get('/api/articles')
      if (Array.isArray(allArticlesResponse.data) && allArticlesResponse.data.length > 0) {
        apiRelatedArticles.value = allArticlesResponse.data.filter((item) => String(item.id) !== String(article.value?.id) && item.slug !== articleSlug).slice(0, 2)
      } else {
        apiRelatedArticles.value = Object.values(articlesData).filter((item) => item.id !== articleSlug && item.slug !== articleSlug).slice(0, 2)
      }
    } catch {
      apiRelatedArticles.value = Object.values(articlesData).filter((item) => item.id !== articleSlug && item.slug !== articleSlug).slice(0, 2)
    }
  } catch (error) {
    console.error('Failed to load article detail:', error)
    article.value = articlesData[route.params.id] || Object.values(articlesData)[0]
    apiRelatedArticles.value = Object.values(articlesData).filter((item) => item.id !== route.params.id).slice(0, 2)
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
  return articlesData[id] || Object.values(articlesData)[0]
})

// บทความที่เกี่ยวข้อง
const relatedArticles = computed(() => {
  if (apiRelatedArticles.value.length > 0) {
    return apiRelatedArticles.value
  }
  const currentId = route.params.id
  return Object.values(articlesData)
    .filter(a => a.id !== currentId && a.slug !== currentId)
    .slice(0, 2)
})

watch(() => route.params.id, () => {
  fetchArticle()
}, { immediate: true })
</script>
