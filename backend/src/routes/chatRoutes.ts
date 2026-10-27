import { Router } from "express";
import { getUserChatSessions, sendMessage } from "../controllers/chatController";
import { verifyToken } from "../middlewares/authMiddleware";
import { chatLimiter } from "../middlewares/rateLimitMiddleware";

const router = Router();

// GET /sessions -> ใช้งาน verifyToken ก่อนเรียก getUserChatSessions
router.get("/sessions", verifyToken, getUserChatSessions);

// POST / -> ใช้งาน chatLimiter และ verifyToken เพื่อป้องกันการสแปมข้อความแชท
router.post("/", chatLimiter, verifyToken, sendMessage);

export default router;