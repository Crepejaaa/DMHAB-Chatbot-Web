<template>
  <div :class="['min-h-screen bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500 overflow-x-hidden', isDarkMode ? 'dark-mode-page' : '']">

    <!-- 1. Navbar -->
    <AppNavbar />

    <!-- 2. Hero Section -->
    <section class="max-w-6xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
      <div class="scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-4">
          <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>เพื่อนคู่คิดดิจิทัลด้านสุขภาพจิต 24 ชั่วโมง</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E293B] leading-tight mb-4">
          Daily Mental Health<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669]">Assessment Bot</span>
        </h1>
        <p class="text-[#64748B] mb-8 text-base leading-relaxed">
          "แชทบอทอาจไม่มีหัวใจ แต่ถูกสร้างขึ้นมาเพื่อให้คุณกล้าเปิดใจในวันที่เหนื่อยล้าที่สุด"
          การเช็กอินอารมณ์และประเมินตนเองเป็นประจำ คือก้าวแรกของการรักและดูแลจิตใจตัวเอง
        </p>
        
        <!-- Quick Shortcut CTA Buttons -->
        <div class="flex flex-wrap gap-4 items-center">
          <button
            @click="$router.push('/assessment')"
            class="bg-gradient-to-r from-emerald-500 via-teal-600 to-[#045F54] hover:from-emerald-400 hover:to-teal-700 text-white px-7 py-4 text-base font-bold rounded-2xl shadow-xl shadow-teal-700/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2.5 cursor-pointer ring-4 ring-emerald-500/20"
            title="เริ่มทำแบบประเมินด่วน"
          >
            <span class="text-2xl animate-pulse">⚡</span>
            <span class="tracking-wide">เข้าประเมินด่วน</span>
            <span class="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold ml-1">2 นาที</span>
          </button>

          <button
            @click="$router.push('/chat')"
            class="bg-white hover:bg-gray-50 text-[#0D9488] border-2 border-[#0D9488]/30 px-6 py-3.5 text-base font-bold rounded-2xl shadow-sm hover:shadow hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            title="พูดคุยปรึกษาแชทบอท"
          >
            <span class="text-xl">💬</span>
            <span>คุยกับแชทบอท</span>
          </button>
        </div>

        <div class="flex items-center gap-4 mt-6 text-xs text-[#64748B]">
          <span class="flex items-center gap-1">✓ คัดกรอง 2Q / 9Q / 8Q</span>
          <span class="flex items-center gap-1">✓ รู้ผลทันที</span>
          <span class="flex items-center gap-1">✓ ฟรีและเป็นส่วนตัว</span>
        </div>
      </div>

      <div class="flex justify-center scroll-anim opacity-0 scale-95 transition-all duration-1000 delay-200 ease-out">
        <div class="w-80 h-72 md:w-96 md:h-80 overflow-hidden rounded-3xl bg-white/60 shadow-xl ring-2 ring-[#0D9488]/20 relative">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85"
            alt="คุณหมอผู้เชี่ยวชาญด้านการดูแลสุขภาพจิต"
            class="h-full w-full object-cover"
          />
          <!-- Quick Shortcut Floating Badge -->
          <div class="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-teal-500/20 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">📋</span>
              <div>
                <p class="text-xs font-bold text-gray-800 dark:text-gray-100">เช็คอินวันนี้หรือยัง?</p>
                <p class="text-[10px] text-gray-500 dark:text-gray-400">บันทึกอารมณ์ & ติดตามผลย้อนหลัง</p>
              </div>
            </div>
            <router-link
              to="/daily-checkin"
              class="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#0D9488] text-white hover:bg-[#045F54] transition shadow-sm"
            >
              ดูประวัติ
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Shortcut Action Banner -->
    <section class="max-w-6xl mx-auto px-6 mb-8">
      <div class="rounded-3xl bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-center gap-4 relative z-10">
          <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 shadow-inner">
            ⚡
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-xl md:text-2xl font-black tracking-tight">เข้าประเมินด่วน (Quick Screening)</h3>
              <span class="bg-amber-300 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">แนะนำ</span>
            </div>
            <p class="text-xs md:text-sm text-emerald-100 leading-relaxed max-w-xl">
              สำรวจสุขภาพใจของคุณวันนี้ด้วยแบบประเมินมาตรฐาน กรมสุขภาพจิต (2Q, 9Q, 8Q) รู้ผลทันที พร้อมคำแนะนำและระบบช่วยเหลือฉุกเฉิน
            </p>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10 shrink-0">
          <button
            @click="$router.push('/assessment')"
            class="px-6 py-3.5 bg-white text-[#045F54] hover:bg-emerald-50 rounded-2xl font-extrabold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📝 เริ่มประเมินตอนนี้</span>
            <span>&rarr;</span>
          </button>
          <router-link
            to="/daily-checkin"
            class="px-5 py-3.5 bg-black/20 hover:bg-black/30 border border-white/25 rounded-2xl font-semibold text-sm text-center text-white transition-all inline-flex items-center justify-center gap-2"
          >
            <span>📋 บันทึกประวัติ</span>
          </router-link>
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
        <div class="w-72 h-72 overflow-hidden rounded-2xl bg-white/60 shadow-md ring-1 ring-[#0D9488]/20">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85"
            alt="ผู้คนกำลังพูดคุยและรับฟังกันในพื้นที่ปลอดภัย"
            class="h-full w-full object-cover"
          />
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
          <div class="w-48 h-80 overflow-hidden bg-white rounded-3xl shadow-sm ring-2 ring-[#0D9488]/30 hover:scale-105 transition duration-500">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=85"
              alt="หุ่นยนต์ AI สำหรับให้บริการและช่วยตอบคำถาม"
              class="h-full w-full object-cover"
            />
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
        <div
          v-for="(article, idx) in visibleArticles"
          :key="article.id || idx"
          :class="[
            'scroll-anim opacity-0 translate-y-16 transition-all duration-700 ease-out',
            idx === 1 ? 'delay-200' : idx === 2 ? 'delay-400' : ''
          ]"
        >
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group h-full flex flex-col justify-between">
            <div>
              <div class="h-48 overflow-hidden bg-gray-100 border-b border-gray-100">
                <img
                  :src="article.coverImageUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80'"
                  :alt="article.title"
                  class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
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
                <span>แหล่ง: {{ article.sourceName || 'PhuenJaiZone' }}</span>
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
              <img src="/phuenjaizone-logo.jpg" alt="PhuenJaiZone Logo" class="w-full h-full object-contain rounded-full" />
            </div>
            <span class="font-bold text-lg">PhuenJaiZone</span>
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
            <li>✉️ PhuenJaiZone@Domain.com</li>
          </ul>
        </div>
        <div>
          <router-link to="/admin" class="font-bold mb-3 block hover:underline">Hotline</router-link>
          <p class="text-xs text-[#D1FAE5]">สายด่วนสุขภาพจิต 1323</p>
        </div>
      </div>
      <div class="text-center text-xs text-[#A7F3D0] pt-6">
        © 2026 PhuenJaiZone. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { inject, onMounted, onUnmounted, ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../api/axios'
import ProfileMenu from '../components/ProfileMenu.vue'
import AppNavbar from '../components/AppNavbar.vue'

const router = useRouter()
const isDarkMode = inject('isDarkMode', false)
const loading = ref(false)
const mobileMenuOpen = ref(false)

const fallbackArticles = [
  {
    id: 'stress-management',
    slug: 'stress-management',
    title: 'วิธีรับมือกับความเครียดจากการทำงาน (Burnout)',
    excerpt: 'เรียนรู้วิธีจัดการความเครียดและปรับสมดุลชีวิตการทำงาน เพื่อรักษาสุขภาพจิตที่ดีในระยะยาว',
    content: 'ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อยในยุคปัจจุบัน หลายคนรู้สึกเหนื่อยล้า ขาดแรงจูงใจ และมีความกังวลจนส่งผลต่อสุขภาพกายและสุขภาพจิต',
    category: 'สุขภาพจิต',
    coverImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'PhuenJaiZone',
    sourceUrl: '',
    createdAt: '2026-07-26T00:00:00.000Z'
  },
  {
    id: 'sleep-and-mood',
    slug: 'sleep-and-mood',
    title: 'ทำไมการนอนหลับถึงส่งผลต่ออารมณ์ของเรา?',
    excerpt: 'การพักผ่อนที่ไม่เพียงพออาจเป็นสาเหตุหลักของอาการวิตกกังวล และความแปรปรวนทางอารมณ์',
    content: 'การนอนหลับมีบทบาทสำคัญต่อการควบคุมอารมณ์และการทำงานของสมอง หากร่างกายไม่ได้พักผ่อนเพียงพอ ความสามารถในการคิดวิเคราะห์จะลดลง',
    category: 'การนอนหลับ',
    coverImageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'PhuenJaiZone',
    sourceUrl: '',
    createdAt: '2026-07-24T00:00:00.000Z'
  },
  {
    id: 'warning-signs',
    slug: 'warning-signs',
    title: 'สัญญาณเตือนว่าคุณควรปรึกษาผู้เชี่ยวชาญ',
    excerpt: 'เช็คลิสต์อาการเบื้องต้นที่คุณไม่ควรมองข้าม เพื่อรับการดูแลและคำปรึกษาอย่างทันท่วงที',
    content: 'สุขภาพจิตที่ดีไม่ได้หมายถึงการที่ไม่มีอารมณ์แปรปรวน แต่หมายถึงความสามารถในการรับมือกับอารมณ์และหาทางช่วยเหลือเมื่อความกังวลเริ่มท่วมท้น',
    category: 'คำปรึกษา',
    coverImageUrl: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'PhuenJaiZone',
    sourceUrl: '',
    createdAt: '2026-07-20T00:00:00.000Z'
  }
]

const articles = ref(fallbackArticles.map((article) => ({ ...article })))
const visibleArticles = computed(() => {
  const list = articles.value && articles.value.length > 0 ? articles.value : fallbackArticles
  return list.slice(0, 3)
})

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
  try {
    loading.value = true
    const { data } = await axios.get('/api/articles')
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
    nextTick(() => {
      if (observer) {
        document.querySelectorAll('.scroll-anim').forEach((el) => observer.observe(el))
      }
    })
  }
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
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
    threshold: 0.1 
  })

  const animElements = document.querySelectorAll('.scroll-anim')
  animElements.forEach((el) => observer.observe(el))

  fetchArticles()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>