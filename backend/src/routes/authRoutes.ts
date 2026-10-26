import { Router } from "express";
import { register, login, refresh, getAllUsers, getAdminStats, createTestResult } from "../controllers/authController";

const router = Router();

// เชื่อมต่อ Endpoint กับ Controller จริงที่ใช้ Prisma
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/admin/users", getAllUsers);
router.get("/admin/stats", getAdminStats);
router.post("/assessment/save", createTestResult);

export default router;