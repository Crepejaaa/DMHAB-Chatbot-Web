const express = require('express');
const cors = require('cors');

// นำเข้า authRoutes และ chatRoutes
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// API Routes 
// ==========================================
// นำ route จาก authRoutes มาเชื่อมที่ path /api
app.use('/api', authRoutes.default || authRoutes);

// นำ route จาก chatRoutes มาเชื่อมที่ path /api/chat
app.use('/api/chat', chatRoutes.default || chatRoutes);

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