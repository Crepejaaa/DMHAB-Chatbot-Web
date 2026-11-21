import { Router } from "express";
import {
  getActiveActivities,
  getActivityHistory,
  getActivityCatalogItem,
  logActivityToday,
  unlogActivityToday,
  deleteUserActivity,
} from "../controllers/activityController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// 1. ดึงรายการกิจกรรมที่กำลังทำอยู่ (ยังไม่หมดอายุและยังไม่ถูกลบ)
router.get("/active", verifyToken, getActiveActivities);

// 2. ดึงประวัติกิจกรรมที่หมดอายุหรือถูกลบแล้ว
router.get("/history", verifyToken, getActivityHistory);

// 3. ดึงรายละเอียดกิจกรรมจากคลังตาม key
router.get("/catalog/:key", verifyToken, getActivityCatalogItem);

// 4. ติ๊กว่าทำกิจกรรมแล้วในวันนี้
router.post("/:id/log", verifyToken, logActivityToday);

// 5. ยกเลิกการติ๊กกิจกรรมของวันนี้
router.delete("/:id/log/today", verifyToken, unlogActivityToday);

// 6. ลบรายการกิจกรรมของผู้ใช้ (soft delete)
router.delete("/:id", verifyToken, deleteUserActivity);

export default router;
