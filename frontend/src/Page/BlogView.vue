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