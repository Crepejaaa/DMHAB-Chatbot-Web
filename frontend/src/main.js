// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' //  เพิ่มบรรทัดนี้เพื่อดึง Tailwind CSS มาใช้งาน

const app = createApp(App)

app.use(router)
app.mount('#app')