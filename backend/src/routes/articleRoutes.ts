import { Router } from "express";
import { 
  getArticles, 
  getArticleBySlug, 
  createArticle, 
  updateArticle, 
  deleteArticle 
} from "../controllers/articleController";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// Endpoint สำหรับดึงข้อมูล (หน้าบ้านและแอดมินใช้ร่วมกัน)
router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

// Endpoint สำหรับ Admin จัดการข้อมูล
router.post("/", verifyToken, verifyAdmin, createArticle);
router.put("/:id", verifyToken, verifyAdmin, updateArticle);
router.delete("/:id", verifyToken, verifyAdmin, deleteArticle);

export default router;
