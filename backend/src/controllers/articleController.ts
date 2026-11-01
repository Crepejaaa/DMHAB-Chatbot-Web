import { Request, Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

const DEFAULT_COVER_IMAGE =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80";

let articleSchemaPromise: Promise<void> | null = null;

/**
 * ตรวจสอบและซิงก์โครงสร้างตาราง/คอลัมน์ "Article" บนฐานข้อมูล PostgreSQL แบบ Idempotent
 * ป้องกันปัญหา Error 500 (P2021/P2022) บน Production (เช่น Render) กรณีที่ตารางยังขาดคอลัมน์ที่เพิ่มใหม่
 */
export const ensureArticleSchema = async (): Promise<void> => {
  if (typeof prisma?.$executeRawUnsafe !== "function") {
    return;
  }

  if (!articleSchemaPromise) {
    articleSchemaPromise = (async () => {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "Article" (
          "id" SERIAL NOT NULL,
          "title" TEXT NOT NULL,
          "slug" TEXT,
          "excerpt" TEXT,
          "content" TEXT NOT NULL,
          "category" TEXT NOT NULL,
          "coverImageUrl" TEXT,
          "sourceName" TEXT,
          "sourceUrl" TEXT,
          "createdById" INTEGER NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
        );
      `);

      await prisma.$executeRawUnsafe(`
        ALTER TABLE "Article"
          ADD COLUMN IF NOT EXISTS "slug" TEXT,
          ADD COLUMN IF NOT EXISTS "excerpt" TEXT,
          ADD COLUMN IF NOT EXISTS "coverImageUrl" TEXT,
          ADD COLUMN IF NOT EXISTS "sourceName" TEXT,
          ADD COLUMN IF NOT EXISTS "sourceUrl" TEXT,
          ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
      `);

      await prisma.$executeRawUnsafe(`
        CREATE UNIQUE INDEX IF NOT EXISTS "Article_slug_key" ON "Article"("slug");
      `);
    })().catch((error) => {
      // รีเซ็ตเพื่อให้ลองใหม่ได้ใน Request ถัดไปหาก DB เพิ่งตื่นจากโหมด Sleep
      articleSchemaPromise = null;
      throw error;
    });
  }

  return articleSchemaPromise;
};

const serializeArticle = (article: any) => ({
  id: article.id,
  title: article.title,
  slug: article.slug || String(article.id),
  excerpt: article.excerpt || (typeof article.content === "string" ? article.content.slice(0, 180) : ""),
  content: article.content || "",
  category: article.category || "",
  coverImageUrl: article.coverImageUrl || DEFAULT_COVER_IMAGE,
  sourceName: article.sourceName || "DMHAB",
  sourceUrl: article.sourceUrl || "https://www.who.int/health-topics/mental-health",
  createdAt: article.createdAt || new Date().toISOString(),
  createdById: article.createdById ?? null,
  createdBy: article.createdBy || null,
});

export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!prisma?.article?.findMany) {
      res.status(200).json([]);
      return;
    }

    await ensureArticleSchema();

    let articles: any[];
    try {
      articles = await prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        include: { createdBy: { select: { id: true, username: true, email: true } } },
      });
    } catch (relationError) {
      // กรณีข้อมูลเก่ามี createdById ที่ไม่พบในตาราง User ให้ดึงเฉพาะข้อมูลบทความแทนเพื่อไม่ให้ล่มเป็น 500
      console.warn("Retrying article query without createdBy relation:", relationError);
      articles = await prisma.article.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    const safeArticles = Array.isArray(articles) ? articles : [];
    res.status(200).json(safeArticles.map(serializeArticle));
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลบทความจากฐานข้อมูลได้" });
  }
};

export const getArticleBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawSlug = req.params.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    if (!slug || !slug.trim()) {
      res.status(400).json({ error: "กรุณาระบุรหัสหรือ slug ของบทความ" });
      return;
    }

    if (!prisma?.article?.findFirst) {
      res.status(404).json({ error: "ไม่พบบทความที่ร้องขอ" });
      return;
    }

    await ensureArticleSchema();

    // ป้องกัน PostgreSQL INT4 Overflow กรณี slug เป็นตัวเลขยาวเกิน 2,147,483,647
    const parsedId = Number(slug);
    const isValidInt4 = Number.isInteger(parsedId) && parsedId > 0 && parsedId <= 2147483647;
    const whereClause = isValidInt4 ? { OR: [{ slug }, { id: parsedId }] } : { slug };

    let article: any;
    try {
      article = await prisma.article.findFirst({
        where: whereClause,
        include: { createdBy: { select: { id: true, username: true, email: true } } },
      });
    } catch (relationError) {
      console.warn("Retrying single article query without createdBy relation:", relationError);
      article = await prisma.article.findFirst({
        where: whereClause,
      });
    }

    if (!article) {
      res.status(404).json({ error: "ไม่พบบทความที่ร้องขอ" });
      return;
    }

    res.status(200).json(serializeArticle(article));
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลบทความได้" });
  }
};

export const createArticle = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    const { title, category, excerpt, content, sourceName, coverImageUrl, sourceUrl } = req.body;

    if (
      !Number.isInteger(userId) ||
      userId <= 0 ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      res.status(400).json({ error: "กรุณากรอกชื่อบทความ หมวดหมู่ และเนื้อหาบทความให้ครบถ้วน" });
      return;
    }

    await ensureArticleSchema();

    const newArticle = await prisma.article.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        excerpt: typeof excerpt === "string" && excerpt.trim() ? excerpt.trim() : null,
        content: content.trim(),
        sourceName: typeof sourceName === "string" && sourceName.trim() ? sourceName.trim() : null,
        coverImageUrl: typeof coverImageUrl === "string" && coverImageUrl.trim() ? coverImageUrl.trim() : null,
        sourceUrl: typeof sourceUrl === "string" && sourceUrl.trim() ? sourceUrl.trim() : null,
        // สร้าง slug พื้นฐานจากเวลาเพื่อไม่ให้ซ้ำ
        slug: `article-${Date.now()}`,
        createdById: userId,
      },
      include: { createdBy: { select: { id: true, username: true, email: true } } },
    });

    res.status(201).json({ message: "สร้างบทความสำเร็จ", article: serializeArticle(newArticle) });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการสร้างบทความ" });
  }
};

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, category, excerpt, content, sourceName, coverImageUrl, sourceUrl } = req.body;
    const articleId = Number(id);

    if (
      !Number.isInteger(articleId) ||
      articleId <= 0 ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      res.status(400).json({ error: "ข้อมูลบทความไม่ถูกต้อง หรือกรอกข้อมูลที่จำเป็นไม่ครบถ้วน" });
      return;
    }

    await ensureArticleSchema();

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: title.trim(),
        category: category.trim(),
        excerpt: typeof excerpt === "string" && excerpt.trim() ? excerpt.trim() : null,
        content: content.trim(),
        sourceName: typeof sourceName === "string" && sourceName.trim() ? sourceName.trim() : null,
        coverImageUrl: typeof coverImageUrl === "string" && coverImageUrl.trim() ? coverImageUrl.trim() : null,
        sourceUrl: typeof sourceUrl === "string" && sourceUrl.trim() ? sourceUrl.trim() : null,
      },
      include: { createdBy: { select: { id: true, username: true, email: true } } },
    });

    res.status(200).json({ message: "อัปเดตบทความสำเร็จ", article: serializeArticle(updatedArticle) });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json({ error: "ไม่พบบทความที่ต้องการแก้ไข" });
      return;
    }
    console.error("Error updating article:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตบทความ" });
  }
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const articleId = Number(req.params.id);
    if (!Number.isInteger(articleId) || articleId <= 0) {
      res.status(400).json({ error: "รหัสบทความไม่ถูกต้อง" });
      return;
    }

    await ensureArticleSchema();

    await prisma.article.delete({
      where: { id: articleId },
    });
    res.status(200).json({ message: "ลบบทความสำเร็จ" });
  } catch (error: any) {
    if (error?.code === "P2025") {
      res.status(404).json({ error: "ไม่พบบทความที่ต้องการลบ" });
      return;
    }
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบบทความ" });
  }
};
