import { Router } from "express";
import {
  register,
  login,
  refresh,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdminStats,
  createTestResult,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword
} from "../controllers/authController";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware";
import { authLimiter } from "../middlewares/rateLimitMiddleware";

const router = Router();

// เชื่อมต่อ Endpoint กับ Controller จริงที่ใช้ Prisma (พร้อม Rate Limiting ป้องกัน Brute Force)
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/refresh", refresh);
router.post("/auth/forgot-password", authLimiter, forgotPassword);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/auth/reset-password", authLimiter, resetPassword);
router.post("/reset-password", authLimiter, resetPassword);
router.put("/profile", verifyToken, updateProfile);
router.patch("/profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, authLimiter, changePassword);
router.get("/admin/users", verifyToken, verifyAdmin, getAllUsers);
router.patch("/admin/users/:id/role", verifyToken, verifyAdmin, updateUserRole);
router.delete("/admin/users/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/admin/stats", verifyToken, verifyAdmin, getAdminStats);
router.post("/assessment/save", verifyToken, createTestResult);

export default router;