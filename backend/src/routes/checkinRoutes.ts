import { Router } from "express";
import {
  saveDailyCheckin,
  getCheckinHistory,
  deleteDailyCheckin,
  clearDailyCheckinHistory,
  getRecommendedActivities,
} from "../controllers/checkinController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/activities", verifyToken, getRecommendedActivities);
router.post("/", verifyToken, saveDailyCheckin);
router.get("/history", verifyToken, getCheckinHistory);
router.delete("/", verifyToken, clearDailyCheckinHistory);
router.delete("/:id", verifyToken, deleteDailyCheckin);

export default router;
