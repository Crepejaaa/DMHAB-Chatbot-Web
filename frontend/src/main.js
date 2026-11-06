// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import router from './router' //  1. ต้องนำเข้า router ที่เราสร้างไว้
import './style.css' // (นำเข้า Tailwind )

const app = createApp(App)

app.use(createPinia())
app.use(i18n) // ระบบหลายภาษา TH | EN
app.use(router) //  2. บรรทัดนี้สำคัญที่สุด! ถ้าไม่มีบรรทัดนี้ ปุ่มจะกดไม่ไป

app.mount('#app')