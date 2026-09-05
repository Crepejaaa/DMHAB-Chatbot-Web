import { Router } from "express";
import { getArticleBySlug, getArticles } from "../controllers/articleController";

const router = Router();

router.get("/", getArticles);
router.get("/:slug", getArticleBySlug);

export default router;
