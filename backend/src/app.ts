import express, { Application, Request, Response } from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes";
// import authRoutes from "./routes/authRoutes"; // เดี๋ยวเราต้องสร้างไฟล์นี้เพิ่ม

const app: Application = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware พื้นฐาน
app.use(cors()); // อนุญาตให้ Frontend (เช่น Next.js) ส่ง Request ข้ามโดเมนมาได้
app.use(express.json()); // อนุญาตให้เซิร์ฟเวอร์อ่านข้อมูลที่ส่งมาเป็น JSON ได้
app.use(express.urlencoded({ extended: true })); // อ่านข้อมูลจาก Form

// 2. ป้ายบอกทาง API (Routes)
// app.use("/api/auth", authRoutes); // เปิดคอมเมนต์เมื่อสร้าง authRoutes เสร็จ
app.use("/api/chat", chatRoutes);

// 3. Route เริ่มต้น (สำหรับเช็กว่าเซิร์ฟเวอร์ทำงานปกติไหม)
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to DMHAB Chatbot API!" });
});

// 4. สั่งให้เซิร์ฟเวอร์เริ่มทำงาน
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});