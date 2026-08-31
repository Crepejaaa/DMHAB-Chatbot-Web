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
    excerpt: 'เช็คลิสต์อาการเบื้องต้นที่คุณไม่ควรมองข้ามเพื่อรับการดูแลและคำปรึกษาอย่างทันท่วงที',
    content: 'การดูแลสุขภาพจิตด้วยตัวเองเป็นสิ่งที่ดี แต่บางครั้งเราอาจต้องการความช่วยเหลือจากผู้เชี่ยวชาญ การรู้จักสัญญาณเตือนจะช่วยให้คุณตัดสินใจได้ถูกเวลา\n\nสัญญาณทางอารมณ์: ความรู้สึกเศร้าหรือสิ้นหวังที่ไม่หายไปนานกว่า 2 สัปดาห์ ความวิตกกังวลที่รุนแรงจนส่งผลกระทบต่อชีวิตประจำวัน\n\nสัญญาณทางพฤติกรรม: การนอนหลับผิดปกติ การกินอาหารเปลี่ยนแปลง แยกตัวออกจากสังคม\n\nสัญญาณที่ต้องรีบขอความช่วยเหลือทันที: หากมีความคิดทำร้ายตัวเองหรือผู้อื่น ให้ติดต่อสายด่วนสุขภาพจิต 1323 ทันที',
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
    // แก้ไขเป็น Relative Path เพื่อไม่ให้ติด CORS
    const { data } = await axios.get(`/api/articles/${articleSlug}`)
    const loadedArticle = data && Object.keys(data).length > 0 ? data : fallbackArticles.find((item) => item.slug === articleSlug || String(item.id) === String(articleSlug))

    article.value = loadedArticle || fallbackArticles[0]

    // แก้ไขเป็น Relative Path
    const allArticlesResponse = await axios.get('/api/articles')
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