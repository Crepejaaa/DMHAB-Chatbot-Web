import rateLimit from "express-rate-limit";

// 1. Rate limiter สำหรับหน้า Authentication (Login / Register)
// จำกัดที่ 10 requests ต่อ 15 นาที เพื่อป้องกัน Brute Force Attack
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 10, // จำกัด 10 requests ต่อ IP
  standardHeaders: true, // ส่ง RateLimit-* headers ตามมาตรฐาน IETF
  legacyHeaders: false, // ปิดการใช้งาน X-RateLimit-* headers
  message: {
    error: "คุณพยายามเข้าสู่ระบบหรือสมัครสมาชิกบ่อยเกินไป กรุณารอ 15 นาทีแล้วลองใหม่อีกครั้ง"
  },
  statusCode: 429
});

// 2. Rate limiter สำหรับ API แชทบอท AI
// จำกัดที่ 20 requests ต่อ 1 นาที เพื่อป้องกันการสแปมและรักษาโควต้า Groq API
export const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 นาที
  max: 20, // จำกัด 20 requests ต่อ IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "คุณส่งข้อความเร็วเกินไป กรุณารอ 1 นาทีแล้วลองส่งใหม่อีกครั้ง"
  },
  statusCode: 429
});
