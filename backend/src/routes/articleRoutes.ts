import { Router } from "express";
import { 
  getArticles, 
  getArticleBySlug, 
  createArticle, 
  updateArticle, 
  deleteArticle 
} from "../controllers/articleController";

const router = Router();

// Endpoint สำหรับดึงข้อมูล (หน้าบ้านและแอดมินใช้ร่วมกัน)
router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

// Endpoint สำหรับ Admin จัดการข้อมูล
router.post("/", createArticle);          // สร้างบทความใหม่
router.put("/:id", updateArticle);        // แก้ไขบทความ
router.delete("/:id", deleteArticle);     // ลบบทความ

export default router;