// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //  1. ต้องนำเข้า router ที่เราสร้างไว้
import './style.css' // (นำเข้า Tailwind )

// skeleton store used to show global loading skeleton between routes
import { isLoading } from './skeletonStore'

const app = createApp(App)

// router hooks to show skeleton while navigating
router.beforeEach((to, from, next) => {
	isLoading.value = true
	next()
})
router.afterEach(() => {
	// small delay so skeleton is visible briefly for perceived loading
	setTimeout(() => { isLoading.value = false }, 250)
})

app.use(router) //  2. บรรทัดนี้สำคัญที่สุด! ถ้าไม่มีบรรทัดนี้ ปุ่มจะกดไม่ไป

app.mount('#app')