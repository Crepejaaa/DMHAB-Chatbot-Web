<!-- App.vue -->
<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <SkeletonLoader />
    <router-view />
  </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue'
import SkeletonLoader from './components/SkeletonLoader.vue'

// อ่านค่าที่เคยตั้งไว้จาก localStorage (ถ้ามี) เพื่อให้จำค่าไว้แม้ refresh หน้า
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

// เมื่อค่าเปลี่ยน ให้บันทึกลง localStorage ด้วย
watch(isDarkMode, (val) => {
  localStorage.setItem('darkMode', val)
})

// ส่งค่านี้ไปให้ทุกหน้า/ทุกคอมโพเนนต์ลูกใช้งานผ่าน inject
provide('isDarkMode', isDarkMode)
</script>

<script>
export default {
  components: {
    SkeletonLoader
  }
}
</script>

<style>
/* Style ส่วนกลาง (Global Style) สามารถใส่ font หรือการตั้งค่าพื้นฐานตรงนี้ได้ */
html, body, #app {
  margin: 0;
  width: 100%;
  min-height: 100%;
  background: #e9ece5;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.dark-mode,
.dark-mode-page {
  color-scheme: dark;
}

.dark-mode {
  background: #0f172a;
  color: #e2e8f0;
}

.dark-mode-page {
  background-color: #0f172a !important;
  color: #e2e8f0 !important;
}

.dark-mode-page [class*="bg-[#FAF9F5]"],
.dark-mode-page [class*="bg-gray-50"],
.dark-mode-page [class*="bg-white"] {
  background-color: #1e293b !important;
}

.dark-mode [class*="bg-[#FCFBF8]"],
.dark-mode [class*="bg-gray-50"],
.dark-mode [class*="bg-white"] {
  background-color: #1e293b !important;
}

.dark-mode [class*="text-[#1E293B]"],
.dark-mode [class*="text-gray-700"],
.dark-mode [class*="text-gray-800"],
.dark-mode [class*="text-gray-900"] {
  color: #e2e8f0 !important;
}

.dark-mode .mobile-menu-toggle-line {
  background-color: #ffffff !important;
}

.dark-mode [class*="translate-x-4"],
.dark-mode [class*="peer-checked:translate-x-5"] {
  background-color: #ffffff !important;
}

.dark-mode .assessment-page section {
  background-color: #1e293b !important;
  border-color: #475569 !important;
}

.dark-mode .assessment-page [class*="bg-[#F0FDF4]"],
.dark-mode .assessment-page [class*="bg-[#FFF1F2]"] {
  background-color: #334155 !important;
}

.dark-mode .assessment-page [class*="bg-white"],
.dark-mode .assessment-page [class*="bg-gray-50"] {
  background-color: #1e293b !important;
}

.dark-mode .assessment-page [class*="border-gray-100"],
.dark-mode .assessment-page [class*="border-gray-200"] {
  border-color: #64748b !important;
}

.dark-mode .assessment-page [class*="text-[#374151]"],
.dark-mode .assessment-page [class*="text-[#64748B]"],
.dark-mode .assessment-page [class*="text-gray-400"],
.dark-mode .assessment-page [class*="text-gray-600"] {
  color: #cbd5e1 !important;
}

.dark-mode .assessment-page [class*="bg-[#F1F5F9]"] {
  background-color: #475569 !important;
  color: #f8fafc !important;
}

.dark-mode .assessment-page [class*="hover:bg-[#E2E8F0]"]:hover {
  background-color: #64748b !important;
}

.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="bg-white"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="bg-[#FCFBF8]"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="bg-[#F1F5F9]"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="bg-gray-50"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="bg-gray-100"] {
  background-color: #1e293b !important;
}

.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="border-gray-100"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="border-gray-200"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="border-gray-300"] {
  border-color: #475569 !important;
}

.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-[#1E293B]"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-gray-900"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-gray-800"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-gray-700"] {
  color: #f8fafc !important;
}

.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-[#374151]"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-[#64748B]"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-gray-600"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-gray-500"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="text-gray-400"] {
  color: #cbd5e1 !important;
}

.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) input,
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) textarea {
  background-color: #334155 !important;
  border-color: #64748b !important;
  color: #f8fafc !important;
}

.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) input::placeholder,
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) textarea::placeholder {
  color: #cbd5e1 !important;
}

.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="translate-x-4"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) [class*="peer-checked:translate-x-5"],
.dark-mode :is(.page-dark-surface, .dark-mode-page):not(.admin-page):not(.assessment-page) .mobile-menu-toggle-line {
  background-color: #ffffff !important;
}

.dark-mode .login-page input[type="email"],
.dark-mode .login-page input[type="password"] {
  background-color: #f8fafc !important;
  border-color: #e2e8f0 !important;
  color: #1e293b !important;
}

.dark-mode .login-page .login-field {
  background-color: #ffffff !important;
  color: #1e293b !important;
  border: 1px solid #e2e8f0 !important;
}

.dark-mode .login-page input[type="email"]::placeholder,
.dark-mode .login-page input[type="password"]::placeholder {
  color: #94a3b8 !important;
}

.dark-mode .login-page .login-field::placeholder {
  color: #94a3b8 !important;
  opacity: 1 !important;
}

.dark-mode .register-page .register-field {
  background-color: #1e293b !important;
  color: #f8fafc !important;
  -webkit-text-fill-color: #f8fafc !important;
  border: 1px solid #64748b !important;
  opacity: 1 !important;
}

.dark-mode .register-page .register-field::placeholder {
  color: #cbd5e1 !important;
  -webkit-text-fill-color: #cbd5e1 !important;
  opacity: 1 !important;
}

.dark-mode .admin-page [class*="bg-white"],
.dark-mode .admin-page [class*="bg-[#FAF9F5]"],
.dark-mode .admin-page [class*="bg-gray-100"] {
  background-color: #1e293b !important;
}

.dark-mode .admin-page [class*="border-gray-100"],
.dark-mode .admin-page [class*="border-gray-150"],
.dark-mode .admin-page [class*="border-gray-200"] {
  border-color: #475569 !important;
}

.dark-mode .admin-page [class*="text-gray-400"],
.dark-mode .admin-page [class*="text-gray-500"],
.dark-mode .admin-page [class*="text-gray-600"],
.dark-mode .admin-page [class*="text-gray-700"],
.dark-mode .admin-page [class*="text-gray-800"] {
  color: #cbd5e1 !important;
}

.dark-mode .admin-page [class*="text-[#1E293B]"] {
  color: #f8fafc !important;
}

.dark-mode .admin-page input {
  background-color: #334155 !important;
  border-color: #64748b !important;
  color: #f8fafc !important;
}

.dark-mode .admin-page input::placeholder {
  color: #cbd5e1 !important;
}

.dark-mode .admin-page [class*="hover:bg-[#FAF9F5]"]:hover {
  background-color: #334155 !important;
}
</style>