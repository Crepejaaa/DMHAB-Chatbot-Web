const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ฐานข้อมูลจำลองในความจำ
let mockUsers = [];

// ==========================================
// 1. API สมัครสมาชิก (Register)
// ==========================================
app.post('/api/register', (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    // 1. เช็กว่ากรอกข้อมูลครบไหม + ดักจับกรณีเป็นช่องว่างล้วน
    if (!name || name.trim() === '' || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง (ห้ามเว้นวรรคว่างเปล่า)" });
    }

    // ⚡ [เพิ่มจุดนี้] ดักจับการเว้นวรรคไว้หน้าสุดหรือหลังสุดของชื่อ
    if (name !== name.trim()) {
        return res.status(400).json({ message: "ชื่อผู้ใช้ห้ามมีเว้นวรรคอยู่หน้าสุดหรือหลังสุด" });
    }

    // 2. ป้องกัน XSS / Script Injection และอักขระพิเศษ
    const hasHtmlTag = /<[^>]*>/g.test(name);
    const isValidNameFormat = /^[a-zA-Z0-9\u0E00-\u0E7F\s]+$/;

    if (hasHtmlTag || !isValidNameFormat.test(name)) {
        return res.status(400).json({ message: "ชื่อผู้ใช้ไม่อนุญาตให้ใช้แท็กสคริปต์หรืออักขระพิเศษ" });
    }

    // 3. เช็กรูปแบบเบอร์โทรศัพท์ (10 หลัก ขึ้นต้นด้วย 06, 08, 09)
    const phoneRegex = /^0[689]\d{8}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "กรุณากรอกเบอร์โทรศัพท์มือถือให้ถูกต้อง (10 หลัก เช่น 0812345678)" });
    }

    // 4. เช็กว่ารหัสผ่านตรงกันไหม
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!" });
    }

    // 5. เช็กว่า "ชื่อ" ซ้ำไหม
    const isNameExist = mockUsers.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (isNameExist) {
        return res.status(400).json({ message: "ชื่อผู้ใช้นี้มีในระบบแล้ว!" });
    }

    // 6. เช็กว่า "อีเมล" ซ้ำไหม
    const isEmailExist = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (isEmailExist) {
        return res.status(400).json({ message: "อีเมลนี้มีในระบบแล้ว!" });
    }

    // 7. เช็กว่า "เบอร์โทรศัพท์" ซ้ำไหม
    const isPhoneExist = mockUsers.find(user => user.phone === phone);
    if (isPhoneExist) {
        return res.status(400).json({ message: "เบอร์โทรศัพท์นี้มีในระบบแล้ว!" });
    }

    // บันทึกข้อมูลผู้ใช้ใหม่
    const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        phone,
        password 
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

// ==========================================
// 2. API เข้าสู่ระบบ (Login)
// ==========================================
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "กรุณากรอก Email และ Password" });
    }

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

// ==========================================
// 3. API ดูข้อมูลทั้งหมด (สำหรับตรวจเช็ค)
// ==========================================
app.get('/api/users', (req, res) => {
    res.json(mockUsers);
});

app.listen(PORT, () => {
    console.log(`🚀 Backend Server กำลังรันอยู่ที่ http://localhost:${PORT}`);
});