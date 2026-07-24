const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ฐานข้อมูลจำลองในความจำ
let mockUsers = [];

// ------------------------------------------
// 1. API สมัครสมาชิก (Register) - ปรับตาม Figma
// ------------------------------------------
app.post('/api/register', (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    // ตรวจสอบว่ากรอกข้อมูลมาครบทุกช่องหรือไม่
    if (!name || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }

    // ตรวจสอบว่า รหัสผ่าน กับ ยืนยันรหัสผ่าน ตรงกันหรือไม่
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!" });
    }

    // ตรวจสอบว่าอีเมลนี้เคยถูกใช้สมัครหรือยัง
    const isEmailExist = mockUsers.find(user => user.email === email);
    if (isEmailExist) {
        return res.status(400).json({ message: "อีเมลนี้มีในระบบแล้ว!" });
    }

    // สร้างข้อมูลผู้ใช้ใหม่
    const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        phone,
        password // ในระบบจริงต้องทำการ Hash รหัสผ่านก่อนเก็บ
    };

    mockUsers.push(newUser);

    res.status(201).json({
        message: "สมัครสมาชิกสำเร็จ",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone
        }
    });
});

// ------------------------------------------
// 2. API เข้าสู่ระบบ (Login) - ใช้ Email ตาม Figma
// ------------------------------------------
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "กรุณากรอก Email และ Password" });
    }

    // ค้นหาผู้ใช้จาก Email และ Password
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
        res.status(200).json({
            message: "เข้าสู่ระบบสำเร็จ",
            token: "mock-jwt-token-1234",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } else {
        res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }
});

// API แถมสำหรับดูข้อมูลทั้งหมด (เพื่อใช้ตรวจเช็ค)
app.get('/api/users', (req, res) => {
    res.json(mockUsers);
});

app.listen(PORT, () => {
    console.log(`🚀 Backend Server กำลังรันอยู่ที่ http://localhost:${PORT}`);
});