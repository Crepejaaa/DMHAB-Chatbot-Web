// src/i18n.js — ตั้งค่าระบบหลายภาษา (TH | EN) ด้วย vue-i18n
import { createI18n } from 'vue-i18n'
import th from './locales/th.json'
import en from './locales/en.json'

const SUPPORTED = ['th', 'en']
const saved = localStorage.getItem('locale')
const initialLocale = SUPPORTED.includes(saved) ? saved : 'th'

document.documentElement.setAttribute('lang', initialLocale)

const i18n = createI18n({
  legacy: false, // ใช้ Composition API (useI18n)
  globalInjection: true, // ใช้ $t() ใน template ได้ทุกไฟล์
  locale: initialLocale,
  fallbackLocale: 'th',
  messages: { th, en },
})

// เปลี่ยนภาษา + จำค่าไว้ใน localStorage
export function setLocale(locale) {
  if (!SUPPORTED.includes(locale)) return
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

export default i18n

