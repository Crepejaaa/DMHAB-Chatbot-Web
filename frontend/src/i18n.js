// src/i18n.js — ตั้งค่าระบบหลายภาษา (TH | EN) ด้วย vue-i18n
// ข้อความแต่ละภาษาแยกเป็นไฟล์ต่อหน้า: src/locales/th/*.json และ src/locales/en/*.json
// ทุกไฟล์ในโฟลเดอร์จะถูกรวมอัตโนมัติ (แต่ละไฟล์ใช้ top-level key ของตัวเอง เช่น "about", "admin")
import { createI18n } from 'vue-i18n'

const mergeModules = (modules) =>
  Object.values(modules).reduce((acc, mod) => ({ ...acc, ...(mod.default || mod) }), {})

const th = mergeModules(import.meta.glob('./locales/th/*.json', { eager: true }))
const en = mergeModules(import.meta.glob('./locales/en/*.json', { eager: true }))

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

// locale tag สำหรับจัดรูปแบบวันที่/เวลาให้ตรงกับภาษาที่เลือก
export const dateLocale = () => (i18n.global.locale.value === 'en' ? 'en-US' : 'th-TH')

export default i18n
