<script setup>
import { inject, onMounted, onUnmounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ProfileMenu from '../components/ProfileMenu.vue'

// ลบการประกาศตัวแปรซ้ำซ้อนออกให้เหลือบรรทัดเดียว
const isColorBlindMode = inject('isColorBlindMode', ref(false))
const router = useRouter()
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