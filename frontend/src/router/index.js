import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/blog',
      name: 'blog',
      component: () => import('../Page/BlogView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../Page/AboutView.vue')
    }
  ]
})

export default router