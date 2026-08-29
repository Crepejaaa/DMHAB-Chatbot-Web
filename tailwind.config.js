/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dmihab: {
          bg: '#FAF9F5',        // สีพื้นหลังครีมอ่อนๆ ตามภาพต้นแบบ
          primary: '#0D9488',   // สีเขียว Teal หลัก
          emerald: '#059669',   // สีเขียว Emerald
          dark: '#045F54',      // สีเขียวเข้มสำหรับปุ่ม/การเน้น
          text: '#1E293B',      // สีตัวอักษรหลัก
          muted: '#64748B',     // สีตัวอักษรรอง
        }
      }
    },
  },
  plugins: [],
}