const express = require('express');
const cors = require('cors');

// นำเข้า authRoutes (หากคอมไพล์จาก TS หรือใช้ ts-node)
// กรณีใช้ CommonJS ร่วมกับ ES Module (export default)
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// API Routes 
// ==========================================
// นำ route จาก authRoutes มาเชื่อมที่ path /api
// หาก export default ใน TS เมื่อถูกแปลง จะอยู่ที่ .default
app.use('/api', authRoutes.default || authRoutes);

// (ตัวอย่าง) API ดูข้อมูลทั้งหมด (ดึงจาก Prisma แทน Mock Data)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, username: true, email: true, role: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend Server กำลังรันอยู่ที่ http://localhost:${PORT}`);
});