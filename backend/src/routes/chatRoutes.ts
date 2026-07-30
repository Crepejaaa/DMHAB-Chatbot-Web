import { Router } from "express";
import { getUserChatSessions } from "../controllers/chatController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// ใส่ verifyToken ดักไว้ ผู้ใช้ต้องมี Token ถึงจะเข้ามาดึงข้อมูลแชทได้
router.get("/sessions", verifyToken, getUserChatSessions);

export default router;