import { Router } from "express";
import { register, login, refresh, getAllUsers, getAdminStats, createTestResult } from "../controllers/authController";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware";
import { authLimiter } from "../middlewares/rateLimitMiddleware";

const router = Router();

// เชื่อมต่อ Endpoint กับ Controller จริงที่ใช้ Prisma (พร้อม Rate Limiting ป้องกัน Brute Force)
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/refresh", refresh);
router.get("/admin/users", getAllUsers);
router.get("/admin/stats", verifyToken, verifyAdmin, getAdminStats);
router.post("/assessment/save", verifyToken, createTestResult);

export default router;