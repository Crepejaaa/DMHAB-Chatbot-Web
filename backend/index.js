const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// นำเข้า authRoutes และ chatRoutes
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const articleRoutes = require('./src/routes/articleRoutes');

// นำเข้า prisma client ที่ตั้งค่า adapter ไว้แล้ว
const prisma = require('./src/prismaClient').default || require('./src/prismaClient');
const { ensureArticleSchema } = require('./src/controllers/articleController');
const { ensureUserResetSchema } = require('./src/controllers/authController');

const app = express();
const PORT = process.env.PORT || 3000;  // แก้จาก 3000ปกติ  มีคำว่า [process.env. เข้ามา]

// รองรับการทำงานหลัง Reverse Proxy (เช่น Render / Cloudflare) สำหรับ express-rate-limit
app.set('trust proxy', 1);

// ==========================================
// ตั้งค่า CORS ให้รองรับ Frontend บน Vercel และ Localhost
// ==========================================
const allowedOrigins = [
  'https://dmhab-chatbot-web.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((url) => url.trim()) : []),
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map((url) => url.trim()) : []),
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // อนุญาต Request ที่ไม่มี origin (เช่น Server-to-Server, Postman, curl, Health Check)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, '');
    const isAllowed =
      allowedOrigins.includes('*') ||
      allowedOrigins.some((allowed) => allowed.replace(/\/$/, '') === normalizedOrigin) ||
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(normalizedOrigin) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalizedOrigin);

    if (isAllowed) {
      return callback(null, true);
    }

    console.warn(`Blocked by CORS: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route เริ่มต้นสำหรับ Health Check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PhuenJaiZone Chatbot API!' });
});

// ==========================================
// API Routes 
// ==========================================
// นำ route จาก authRoutes มาเชื่อมที่ path /api และ /api/auth
app.use('/api', authRoutes.default || authRoutes);
app.use('/api/auth', authRoutes.default || authRoutes);

// นำ route จาก chatRoutes มาเชื่อมที่ path /api/chat
app.use('/api/chat', chatRoutes.default || chatRoutes);

// นำ route จาก articleRoutes มาเชื่อมที่ path /api/articles
app.use('/api/articles', articleRoutes.default || articleRoutes);

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
  if (typeof ensureArticleSchema === 'function') {
    ensureArticleSchema().catch((err) => {
      console.warn('Article schema sync skipped during startup:', err?.message || err);
    });
  }
  if (typeof ensureUserResetSchema === 'function') {
    ensureUserResetSchema().catch((err) => {
      console.warn('User reset schema sync skipped during startup:', err?.message || err);
    });
  }
});
