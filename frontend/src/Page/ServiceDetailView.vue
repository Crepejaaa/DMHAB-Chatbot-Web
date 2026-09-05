<template>
  <div :class="['min-h-screen flex flex-col bg-[#FAF9F5] font-sans text-[#1E293B] transition-all duration-500 overflow-x-hidden', isColorBlindMode ? 'grayscale' : '']">

    <!-- 1. Navbar (เหมือน HomeView) -->
    <nav class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <router-link to="/services" class="hover:bg-white/20 p-2 rounded-full transition" title="กลับหน้า Services">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <router-link to="/" class="flex items-center gap-1">
          <div class="w-12 h-12 flex items-center justify-center">
            <img src="/image_Logo.png" alt="DMHAB Logo" class="w-full h-full object-contain" />
          </div>
          <span class="text-xl font-bold tracking-wide">DMHAB</span>
        </router-link>
      </div>
      
      <div class="hidden md:flex gap-8 items-center text-sm font-medium">
        <router-link to="/" class="hover:text-[#D1FAE5] transition">Home</router-link>
        <router-link to="/about" class="hover:text-[#D1FAE5] transition">About</router-link>
        <router-link to="/services" class="text-white font-bold underline decoration-2 underline-offset-4">Service</router-link>
        <router-link to="/blog" class="hover:text-[#D1FAE5] transition">Blog</router-link>
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

        <button 
          @click="$router.push('/login')" 
          class="px-5 py-1.5 rounded-full border border-white/60 hover:bg-white/10 transition inline-flex items-center justify-center cursor-pointer text-white"
        >
          Login
        </button>
        
        <button
          @click="$router.push('/register')"
          class="px-5 py-1.5 bg-[#023832] hover:bg-[#01221E] text-white rounded-full font-medium transition shadow-sm"
        >
          Register
        </button>
      </div>
    </nav>

    <!-- 2. Hero Banner -->
    <header class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-8 pb-20 px-6 lg:px-12 relative overflow-hidden">
      <!-- Background Decorative -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 500 500" class="w-full h-full">
          <path d="M 0,250 C 150,100 350,400 500,250" fill="none" stroke="currentColor" stroke-width="8"/>
          <path d="M 0,350 C 150,200 350,500 500,350" fill="none" stroke="currentColor" stroke-width="4"/>
        </svg>
      </div>

      <div class="container mx-auto max-w-5xl relative z-10">


        <div class="flex gap-4 items-stretch">
          <div class="w-1.5 bg-white/80 rounded-full"></div>
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-4xl">{{ currentService.icon }}</span>
              <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {{ currentService.title }}
              </h1>
            </div>
            <p class="text-sm md:text-base text-[#D1FAE5] max-w-2xl leading-relaxed">
              {{ currentService.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- 3. Main Content -->
    <main class="flex-1 w-full max-w-5xl mx-auto px-6 py-16">

      <!-- Overview Section -->
      <section class="mb-16 scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">ภาพรวมบริการ</h2>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <p class="text-[#64748B] leading-relaxed text-base whitespace-pre-line">{{ currentService.overview }}</p>
        </div>
      </section>

      <!-- Features Section -->
      <section class="mb-16 scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">คุณสมบัติเด่น</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(feature, index) in currentService.features" 
            :key="index"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#0D9488]/30 transition-all duration-300 group"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-[#0D9488]/10 to-[#059669]/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {{ feature.icon }}
              </div>
              <div>
                <h3 class="font-bold text-[#1E293B] text-lg mb-1">{{ feature.title }}</h3>
                <p class="text-sm text-[#64748B] leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="mb-16 scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <h2 class="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-6">วิธีการใช้งาน</h2>
        <div class="relative">
          <!-- Vertical line -->
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0D9488] to-[#059669] hidden md:block"></div>
          
          <div class="space-y-8">
            <div 
              v-for="(step, index) in currentService.steps" 
              :key="index"
              class="flex items-start gap-6"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md relative z-10">
                {{ index + 1 }}
              </div>
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 hover:shadow-md transition-shadow duration-300">
                <h3 class="font-bold text-[#1E293B] text-lg mb-2">{{ step.title }}</h3>
                <p class="text-sm text-[#64748B] leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="scroll-anim opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
          <div class="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 500 500" class="w-full h-full">
              <circle cx="100" cy="100" r="80" fill="currentColor"/>
              <circle cx="400" cy="400" r="120" fill="currentColor"/>
            </svg>
          </div>
          <div class="relative z-10">
            <h2 class="text-2xl md:text-3xl font-extrabold mb-4">พร้อมเริ่มต้นดูแลสุขภาพจิตแล้วหรือยัง?</h2>
            <p class="text-[#D1FAE5] mb-8 max-w-xl mx-auto">เริ่มใช้งานบริการของเราวันนี้ เพื่อสุขภาพจิตที่ดีขึ้นในทุกๆ วัน</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                @click="$router.push('/assessment')" 
                class="bg-white text-[#0D9488] px-8 py-3 rounded-full font-bold text-sm hover:bg-[#D1FAE5] transition shadow-md"
              >
                เริ่มต้นใช้งาน
              </button>
              <router-link 
                to="/services" 
                class="border-2 border-white/60 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-white/10 transition"
              >
                ดูบริการทั้งหมด
              </router-link>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- 4. Footer (เหมือน HomeView) -->
    <footer class="bg-gradient-to-r from-[#045F54] via-[#0D9488] to-[#059669] text-white pt-12 pb-6 mt-10 scroll-anim opacity-0 transition-opacity duration-1000 ease-out">
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
            <li><a href="#" class="hover:underline">Daily Chatbot</a></li>
            <li><a href="#" class="hover:underline">Personalized Feedback</a></li>
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
import { inject, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isColorBlindMode = inject('isColorBlindMode')
const route = useRoute()
const router = useRouter()

// ข้อมูลรายละเอียดบริการทั้งหมด (keyed by id ที่ตรงกับ servicesList ใน ServicesView)
const servicesData = {
  'daily-checkin': {
    title: 'เช็คอินสุขภาพจิตรายวัน',
    subtitle: 'ระบบบันทึกและติดตามความรู้สึกประจำวัน เพื่อให้คุณรู้จักตัวเองมากขึ้นในทุกๆ วัน',
    overview: 'บริการเช็คอินสุขภาพจิตรายวัน ช่วยให้คุณสามารถบันทึกอารมณ์ ความรู้สึก และระดับความเครียดในแต่ละวันได้อย่างง่ายดาย ระบบจะวิเคราะห์ข้อมูลของคุณและแสดงแนวโน้มสุขภาพจิตในรูปแบบกราฟที่เข้าใจง่าย ช่วยให้คุณเห็นภาพรวมของสุขภาพจิตตัวเองและสามารถปรับปรุงพฤติกรรมได้ตรงจุด',
    features: [
      { icon: '📝', title: 'บันทึกอารมณ์ง่ายๆ', description: 'เลือกอิโมจิและเขียนบันทึกสั้นๆ เพียงไม่กี่วินาทีต่อวัน' },
      { icon: '📊', title: 'กราฟแนวโน้มสุขภาพจิต', description: 'ดูกราฟสรุปอารมณ์รายสัปดาห์และรายเดือนของคุณ' },
      { icon: '🔔', title: 'แจ้งเตือนประจำวัน', description: 'ตั้งเวลาแจ้งเตือนเพื่อไม่ลืมเช็คอินทุกวัน' },
      { icon: '🔒', title: 'ข้อมูลเป็นความลับ', description: 'ข้อมูลทั้งหมดถูกเข้ารหัสและเก็บรักษาอย่างปลอดภัย' }
    ],
    steps: [
      { title: 'สมัครสมาชิก', description: 'สร้างบัญชีผู้ใช้งานฟรี ใช้เวลาเพียงไม่กี่นาที' },
      { title: 'เลือกอารมณ์ประจำวัน', description: 'เลือกอิโมจิที่ตรงกับความรู้สึกของคุณในวันนั้น พร้อมเขียนบันทึกสั้นๆ ถ้าต้องการ' },
      { title: 'ติดตามแนวโน้ม', description: 'ดูกราฟและสถิติอารมณ์ของคุณย้อนหลัง เพื่อทำความเข้าใจตัวเองมากขึ้น' },
      { title: 'รับคำแนะนำ', description: 'ระบบจะแนะนำกิจกรรมและบทความที่เหมาะสมกับสภาวะจิตใจของคุณ' }
    ]
  },
  'assessment': {
    title: 'ประเมินสุขภาพจิตเบื้องต้น',
    subtitle: 'แบบทดสอบความเครียด/ซึมเศร้าที่เป็นมาตรฐาน ช่วยให้คุณรู้สถานะสุขภาพจิตของตัวเอง',
    overview: 'บริการประเมินสุขภาพจิตเบื้องต้นใช้แบบทดสอบมาตรฐานที่ได้รับการรับรองทางวิชาการ เช่น PHQ-9 สำหรับภาวะซึมเศร้า และ GAD-7 สำหรับความวิตกกังวล เพื่อช่วยให้คุณเข้าใจสถานะสุขภาพจิตของตัวเองในปัจจุบัน ผลประเมินจะมาพร้อมคำแนะนำเบื้องต้นและแนวทางในการดูแลตัวเอง',
    features: [
      { icon: '📄', title: 'แบบทดสอบมาตรฐาน', description: 'ใช้เครื่องมือประเมินที่ได้รับการยอมรับจากองค์กรสุขภาพจิตระดับสากล' },
      { icon: '⚡', title: 'ผลลัพธ์ทันที', description: 'ทำแบบทดสอบเสร็จแล้วเห็นผลทันที พร้อมคำอธิบายที่เข้าใจง่าย' },
      { icon: '📈', title: 'ติดตามพัฒนาการ', description: 'เปรียบเทียบผลการประเมินแต่ละครั้ง เพื่อดูพัฒนาการสุขภาพจิต' },
      { icon: '💡', title: 'คำแนะนำส่วนตัว', description: 'รับคำแนะนำที่ปรับให้เหมาะกับผลการประเมินของคุณโดยเฉพาะ' }
    ],
    steps: [
      { title: 'เลือกแบบทดสอบ', description: 'เลือกแบบทดสอบที่ต้องการ เช่น ความเครียด ภาวะซึมเศร้า หรือความวิตกกังวล' },
      { title: 'ตอบคำถาม', description: 'ตอบคำถามตามความจริง ใช้เวลาประมาณ 5-10 นาที' },
      { title: 'ดูผลประเมิน', description: 'ระบบจะแสดงผลคะแนนพร้อมการแปลผลที่เข้าใจง่าย' },
      { title: 'รับคำแนะนำ', description: 'อ่านคำแนะนำและแนวทางดูแลตัวเองที่ปรับให้เหมาะกับคุณ' }
    ]
  },
  'listening-space': {
    title: 'พื้นที่รับฟัง 24 ชั่วโมง',
    subtitle: 'แชทพูดคุยระบายความรู้สึกแบบส่วนตัว ไม่ต้องกลัวถูกตัดสิน',
    overview: 'บริการพื้นที่รับฟังตลอด 24 ชั่วโมง เป็นแชทบอทที่ออกแบบมาเพื่อเป็นเพื่อนคู่คิดในยามที่คุณต้องการคนรับฟัง ไม่ว่าจะเป็นเวลากลางคืนหรือช่วงวันหยุด แชทบอทพร้อมรับฟังคุณเสมอ โดยใช้เทคโนโลยี AI ในการตอบสนองอย่างเห็นอกเห็นใจ ปลอดภัย และเป็นความลับ',
    features: [
      { icon: '🕐', title: 'พร้อมรับฟัง 24/7', description: 'ไม่ว่าจะเวลาไหน แชทบอทพร้อมรับฟังคุณเสมอ ไม่มีวันหยุด' },
      { icon: '🤗', title: 'ตอบสนองด้วยความเข้าใจ', description: 'AI ถูกออกแบบให้ตอบสนองด้วยความเห็นอกเห็นใจ ไม่ตัดสิน' },
      { icon: '🔐', title: 'เป็นความลับ 100%', description: 'ทุกบทสนทนาถูกเก็บเป็นความลับอย่างเคร่งครัด' },
      { icon: '🆘', title: 'เชื่อมต่อความช่วยเหลือ', description: 'หากพบสถานการณ์ฉุกเฉิน ระบบจะแนะนำช่องทางช่วยเหลือทันที' }
    ],
    steps: [
      { title: 'เริ่มแชท', description: 'คลิกเปิดหน้าต่างแชทแล้วเริ่มพิมพ์ข้อความได้เลย' },
      { title: 'พูดคุยอย่างเป็นธรรมชาติ', description: 'เล่าเรื่องที่อยากระบาย แชทบอทจะรับฟังและตอบกลับอย่างเข้าใจ' },
      { title: 'รับกำลังใจ', description: 'แชทบอทจะให้กำลังใจและแนะนำแนวทางจัดการกับความรู้สึก' },
      { title: 'รับการส่งต่อ (ถ้าต้องการ)', description: 'หากต้องการความช่วยเหลือเพิ่มเติม ระบบจะแนะนำผู้เชี่ยวชาญหรือสายด่วน' }
    ]
  },
  'relaxation': {
    title: 'แนะนำกิจกรรมผ่อนคลาย',
    subtitle: 'แนะนำกิจกรรมและบทความที่เหมาะสมกับคุณ เพื่อชีวิตที่สมดุลขึ้น',
    overview: 'บริการแนะนำกิจกรรมผ่อนคลาย จะช่วยคัดสรรกิจกรรมและเนื้อหาที่เหมาะสมกับสภาวะจิตใจของคุณ ไม่ว่าจะเป็นเทคนิคการหายใจ การทำสมาธิ การเขียนไดอารี่ หรือกิจกรรมเสริมสุขภาพจิตอื่นๆ ทั้งหมดถูกออกแบบมาจากหลักจิตวิทยาเชิงบวก',
    features: [
      { icon: '🎯', title: 'แนะนำตามสภาวะจิตใจ', description: 'ระบบเลือกกิจกรรมที่เหมาะสมจากผลเช็คอินและประเมินของคุณ' },
      { icon: '🧘', title: 'เทคนิคการผ่อนคลาย', description: 'รวมเทคนิคหายใจ ทำสมาธิ และ Mindfulness ที่ปฏิบัติได้ง่าย' },
      { icon: '📚', title: 'คลังบทความ Self-Care', description: 'บทความดูแลสุขภาพจิตที่อัปเดตใหม่ทุกสัปดาห์' },
      { icon: '🏆', title: 'ระบบรางวัล', description: 'สะสมแต้มจากการทำกิจกรรมเพื่อสร้างแรงจูงใจในการดูแลตัวเอง' }
    ],
    steps: [
      { title: 'ทำแบบประเมิน', description: 'ทำแบบเช็คอินอารมณ์หรือแบบประเมินสุขภาพจิตก่อน เพื่อให้ระบบรู้จักคุณ' },
      { title: 'รับคำแนะนำ', description: 'ระบบจะแนะนำกิจกรรมและบทความที่เหมาะกับสภาวะจิตใจของคุณ' },
      { title: 'ลงมือทำกิจกรรม', description: 'เลือกกิจกรรมที่สนใจแล้วทำตามขั้นตอนที่แนะนำ' },
      { title: 'บันทึกผลลัพธ์', description: 'บันทึกความรู้สึกหลังทำกิจกรรม เพื่อให้ระบบปรับปรุงคำแนะนำให้ดียิ่งขึ้น' }
    ]
  }
}

// หา service ปัจจุบันจาก route param
const currentService = computed(() => {
  const id = route.params.id
  return servicesData[id] || servicesData['daily-checkin']
})

// Scroll animation observer
let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-10')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1
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
