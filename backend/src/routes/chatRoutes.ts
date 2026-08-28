import { Router } from "express";
import { getUserChatSessions, sendMessage } from "../controllers/chatController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// GET /sessions -> ใช้งาน verifyToken ก่อนเรียก getUserChatSessions
router.get("/sessions", verifyToken, getUserChatSessions);

// POST / -> ใช้งาน verifyToken ก่อนเรียก sendMessage
router.post("/", verifyToken, sendMessage);

export default router;