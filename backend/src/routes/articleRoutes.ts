import { Router } from "express";
<<<<<<< Updated upstream
import { getArticleBySlug, getArticles } from "../controllers/articleController";
=======
import { 
  getArticles, 
  getArticleBySlug, 
  createArticle, 
  updateArticle, 
  deleteArticle 
} from "../controllers/articleController";
import { verifyAdmin, verifyToken } from "../middlewares/authMiddleware";
>>>>>>> Stashed changes

const router = Router();

router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

<<<<<<< Updated upstream
export default router;
=======
// Endpoint สำหรับ Admin จัดการข้อมูล
router.post("/", verifyToken, verifyAdmin, createArticle);
router.put("/:id", verifyToken, verifyAdmin, updateArticle);
router.delete("/:id", verifyToken, verifyAdmin, deleteArticle);

export default router;
>>>>>>> Stashed changes
