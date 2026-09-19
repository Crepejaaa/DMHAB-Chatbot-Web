import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
// 👇 จุดแก้ที่ 1: ลบบรรทัด import AdminView from '../views/AdminView.vue' ทิ้งไป เพราะเราดึงไฟล์ถูกที่แล้วในบรรทัดที่ 46 และป้องกัน Error หาไฟล์ไม่เจอจนหน้าขาว

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../Page/HomeView.vue') 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../Page/LoginView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../Page/forgot-password.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../Page/RegisterView.vue') 
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: () => import('../Page/AssessmentView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../Page/ServicesView.vue')
    },
    {
      path: '/services/:id',
      name: 'service-detail',
      component: () => import('../Page/ServiceDetailView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../Page/BlogView.vue')
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      component: () => import('../Page/BlogDetailView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../Page/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../Page/AdminView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../Page/ContactView.vue')
    },
    {
      path: '/assessment-result',
      name: 'assessment-result',
      component: () => import('../Page/AssessmentResultView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../Page/ChatView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../Page/ProfilePage.vue')
    },
    {
      path: '/account-settings',
      name: 'account-settings',
      component: () => import('../Page/AccountSettingsPage.vue')
    },
    {
      path: '/activity-tracker',
      name: 'activity-tracker',
      component: () => import('../Page/ActivityTrackerView.vue')
    },
    {
      path: '/daily-checkin',
      name: 'daily-checkin',
      component: () => import('../Page/DailyCheckinView.vue')
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from) => {
  
  // 👇 จุดแก้ที่ 2: ลบ '/admin' ออกจาก publicPages เพื่อไม่ให้คนธรรมดาแอบพิมพ์ URL เข้ามา
  const publicPages = ['/', '/login', '/register', '/forgot-password', '/services', '/services/:id', '/blog', '/blog/:id', '/about', '/contact', '/assessment', '/profile', '/account-settings']

  // ตรวจสอบว่าหน้าที่ไปเป็น public page หรือไม่ (รองรับ dynamic route)
  const isPublic = publicPages.some(page => {
    const regex = new RegExp('^' + page.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');
    return regex.test(to.path);
  });

  const authRequired = !isPublic;

  // เรียกใช้การตรวจสอบสิทธิ์ผ่าน Pinia Store
  const authStore = useAuthStore();

  // 👇 จุดแก้ที่ 3: เช็คสิทธิ์แอดมินขั้นเด็ดขาด (ถ้าจะเข้าหน้า admin ต้องมีสิทธิ์ ADMIN เท่านั้น)
  if (to.path === '/admin') {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      alert('คุณไม่มีสิทธิ์เข้าถึงหน้า Admin Dashboard');
      return '/'; // เตะผู้ใช้ธรรมดากลับไปหน้าหลัก
    }
  }

  if (authRequired && !authStore.isAuthenticated) {
    return '/login';
  }

  return true;
})

export default router