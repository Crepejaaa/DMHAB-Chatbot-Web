const express = require('express');
const cors = require('cors');

// นำเข้า authRoutes และ chatRoutes
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');

// นำเข้า prisma client ที่ตั้งค่า adapter ไว้แล้ว
const prisma = require('./src/prismaClient').default || require('./src/prismaClient');

const app = express();
const PORT = process.env.PORT || 3000;  // แก้จาก 3000ปกติ  มีคำว่า [process.env. เข้ามา]

app.use(cors());
app.use(express.json());

// ==========================================
// API Routes 
// ==========================================
// นำ route จาก authRoutes มาเชื่อมที่ path /api
app.use('/api', authRoutes.default || authRoutes);

// นำ route จาก chatRoutes มาเชื่อมที่ path /api/chat
app.use('/api/chat', chatRoutes.default || chatRoutes);

// (ตัวอย่าง) API ดูข้อมูลทั้งหมด (ดึงจาก Prisma ผ่าน adapter ที่ตั้งค่าไว้)
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, username: true, email: true, role: true }
        });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "ไม่สามารถดึงข้อมูลได้" });
    }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend Server is running on port ${PORT}`);  //แก้จากชี้ไปที่local host เป็นเปิดรับสำหรับ Cloud render
});