# 🧠 DMHAB-Chatbot-Web

ระบบแชทบอทประเมินสุขภาพจิตเบื้องต้น (Mental Health Assessment Chatbot) 
โปรเจกต์นี้พัฒนาขึ้นเพื่อเป็นพื้นที่ปลอดภัยให้ผู้ใช้งานสามารถพูดคุย และรับการประเมินสภาวะอารมณ์ความเครียดเบื้องต้น (MILD, MODERATE, SEVERE) พร้อมให้คำแนะนำและช่องทางช่วยเหลือในกรณีฉุกเฉิน

---

## 💻 Tech Stack
**Frontend:**
* Vue 3 (Composition API)
* Tailwind CSS
* Vue Router & Pinia
* Axios (สำหรับยิง API)

**Backend:**
* Node.js & Express
* Prisma (ORM)
* PostgreSQL (Database)
* Security: JWT, bcryptjs, CORS

---

## 🛠️ สิ่งที่ต้องมีก่อนรันโปรเจกต์ (Prerequisites)
ก่อนจะเริ่มรันโค้ด ตรวจสอบให้แน่ใจว่าในเครื่องของคุณติดตั้งโปรแกรมเหล่านี้แล้ว:
* [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 18 ขึ้นไป)
* [PostgreSQL](https://www.postgresql.org/) (สำหรับฐานข้อมูล)
* Git

---

## 🚀 วิธีติดตั้งและรันโปรเจกต์ (Getting Started)

โปรเจกต์นี้แยกการทำงานเป็น 2 ส่วน คือหน้าบ้าน (Frontend) และหลังบ้าน (Backend) ต้องเปิด Terminal รันทั้ง 2 ตัวควบคู่กันครับ

### 1️⃣ การตั้งค่าฝั่งหลังบ้าน (Backend)
เปิด Terminal แล้วทำตามขั้นตอนนี้:

```bash
# 1. เข้าไปที่โฟลเดอร์ backend
cd backend

# 2. ติดตั้ง Dependencies
npm install

# 3. สร้างไฟล์ .env (คัดลอกตัวอย่างจาก .env.example ถ้ามี)
# ดูรายละเอียดตัวแปรที่ต้องใส่ในหัวข้อ "Environment Variables" ด้านล่าง

# 4. อัปเดตโครงสร้างฐานข้อมูล (Prisma)
npx prisma migrate dev --name init

# 5. รันเซิร์ฟเวอร์ (โหมด Development)
npm run dev
# (เซิร์ฟเวอร์จะรันที่พอร์ต http://localhost:3000)
### 6 คำสั่งสำหรับรัน
รันฝั่ง Backend (เซิร์ฟเวอร์): npx nodemon index.js

การตั้งค่าฝั่งหน้าบ้าน (Frontend)
เปิด Terminal หน้าต่างใหม่ แล้วทำตามขั้นตอนนี้:

Bash
# 1. เข้าไปที่โฟลเดอร์ frontend
cd frontend

# 2. ติดตั้ง Dependencies
npm install

# 3. รันหน้าเว็บ
npm run dev
# (เว็บจะรันที่พอร์ต http://localhost:5173)


รันฝั่ง Frontend (หน้าบ้าน): npm run dev

รันฝั่ง Backend (เซิร์ฟเวอร์): npm run dev

รันฝั่ง AI (Ollama): ollama run llama3
