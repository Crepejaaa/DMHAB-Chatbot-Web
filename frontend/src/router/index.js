// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    // ดึงไฟล์ HomeView.vue ที่คุณเพิ่งสร้างมาแสดงผลเป็นหน้าแรก
    component: () => import('../Page/HomeView.vue')
  },
  // ... routes อื่นๆ ของคุณ
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;