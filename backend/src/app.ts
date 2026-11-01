import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import chatRoutes from "./routes/chatRoutes";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";
import { ensureArticleSchema } from "./controllers/articleController";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://dmhab-chatbot-web.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",").map((url) => url.trim()) : []),
  ...(process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((url) => url.trim()) : []),
].filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    const normalizedOrigin = origin.replace(/\/$/, "");
    const isAllowed =
      allowedOrigins.includes("*") ||
      allowedOrigins.some((allowed) => allowed.replace(/\/$/, "") === normalizedOrigin) ||
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(normalizedOrigin) ||
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalizedOrigin);

    if (isAllowed) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

// 1. Middleware พื้นฐาน
app.use(cors(corsOptions)); // อนุญาตให้ Frontend (เช่น Vercel / Localhost) ส่ง Request ข้ามโดเมนมาได้
app.use(express.json({ limit: "10mb" })); // อนุญาตให้เซิร์ฟเวอร์อ่านข้อมูลที่ส่งมาเป็น JSON ได้
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // อ่านข้อมูลจาก Form

// 2. ป้ายบอกทาง API (Routes)
app.use("/api", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/articles", articleRoutes);

// 3. Route เริ่มต้น (สำหรับเช็กว่าเซิร์ฟเวอร์ทำงานปกติไหม)
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to PhuenJaiZone Chatbot API!" });
});

// 4. สั่งให้เซิร์ฟเวอร์เริ่มทำงาน
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  ensureArticleSchema().catch((err) => {
    console.warn("Article schema sync skipped during startup:", err?.message || err);
  });
});
