import { Router } from "express";
import { getUserChatSessions, sendMessage } from "../controllers/chatController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// ดึงข้อความแชทใน Session ปัจจุบัน
router.get("/sessions", verifyToken, getUserChatSessions);

// ส่งข้อความคุยกับบอท
router.post("/", verifyToken, sendMessage);

export default router;