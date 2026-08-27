import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

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
      path: '/contact',
      name: 'contact',
      component: () => import('../Page/ContactView.vue')
    }
  ]
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  // หน้าที่สามารถเข้าถึงได้โดยไม่ต้องล็อกอิน
  const publicPages = ['/', '/login', '/register', '/forgot-password', '/services', '/blog', '/about']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !authStore.isAuthenticated) {
    return next('/login')
  }

  next()
})

export default router