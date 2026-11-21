import { Router } from "express";
import {
  getUserChatSessions,
  startChatSession,
  getChatSessionsHistory,
  getLocalizedMessages,
  getChatSessionById,
  endChatSession,
  submitSessionFeedback,
  deleteChatSession,
  sendMessage,
  startScale,
  declineScale,
  answerScale,
} from "../controllers/chatController";
import { verifyToken } from "../middlewares/authMiddleware";
import { chatLimiter } from "../middlewares/rateLimitMiddleware";

const router = Router();
const authenticate = verifyToken;

// ดึงเซสชันปัจจุบัน (คงไว้เพื่อความเข้ากันได้เดิม)
router.get("/sessions", verifyToken, getUserChatSessions);

// เริ่มเซสชันใหม่พร้อมหัวข้อ (รับ topic แล้วสร้างเซสชันและข้อความต้อนรับ)
router.post("/sessions", chatLimiter, verifyToken, startChatSession);

// ดึงลิสต์ประวัติการสนทนาทั้งหมดของผู้ใช้ (ต้องอยู่ก่อน /sessions/:id)
router.get("/sessions/history", verifyToken, getChatSessionsHistory);

// ดึงข้อความแชทที่แปลตาม locale ที่ขอ (ต้องอยู่ก่อน /sessions/:id)
router.get("/sessions/:id/messages", verifyToken, getLocalizedMessages);

// แบบประเมิน (scale): เริ่ม / ปฏิเสธ / ตอบทีละข้อ (ไม่ใส่ chatLimiter เพราะไม่เรียก AI และผู้ใช้กดตอบเร็วได้)
router.post("/sessions/:id/scale/start", verifyToken, startScale);
router.post("/sessions/:id/scale/decline", verifyToken, declineScale);
router.post("/sessions/:id/scale/answer", verifyToken, answerScale);

// ดึงข้อความ + คำตอบ 5 ข้อของเซสชันที่ระบุ
router.get("/sessions/:id", verifyToken, getChatSessionById);

// จบเซสชันและให้ Groq สรุป + ให้คำแนะนำเบื้องต้นตามหัวข้อ
router.post("/sessions/:id/end", chatLimiter, verifyToken, endChatSession);

// บันทึก Feedback 3 ระดับหลังจบเซสชัน
router.patch("/sessions/:id/feedback", authenticate, submitSessionFeedback);

// ลบเซสชัน (cascade ลบ ChatMessage และ ChatAnswer)
router.delete("/sessions/:id", verifyToken, deleteChatSession);

// ส่งข้อความโต้ตอบในแชท
router.post("/", chatLimiter, verifyToken, sendMessage);

export default router;
