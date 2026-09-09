import { Router } from "express";
import { register, login, refresh } from "../controllers/authController";

const router = Router();

// เชื่อมต่อ Endpoint กับ Controller จริงที่ใช้ Prisma
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
