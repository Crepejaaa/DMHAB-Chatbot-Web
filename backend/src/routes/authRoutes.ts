import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

// เชื่อมต่อ Endpoint กับ Controller จริงที่ใช้ Prisma
router.post("/register", register);
router.post("/login", login);

export default router;
