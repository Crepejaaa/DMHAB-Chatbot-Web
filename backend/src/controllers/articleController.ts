import { Request, Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

const fallbackArticles = [
  {
    id: 1,
    title: "วิธีรับมือกับความเครียดจากการทำงาน",
    slug: "stress-management",
    excerpt: "ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อย การรับรู้ และปรับสมดุลชีวิตที่ดีจะช่วยลดความเหนื่อยล้าและรักษาสุขภาพจิตได้",
    content: "ความเครียดจากการทำงานเป็นเรื่องที่พบได้บ่อยในยุคปัจจุบัน หลายคนรู้สึกเหนื่อยล้า ขาดแรงจูงใจ และมีความกังวลจนส่งผลต่อสุขภาพกายและสุขภาพจิต\n\nเมื่อเราต้องเผชิญกับงานที่มากเกินไป การหยุดพักและจัดลำดับความสำคัญของงานจึงเป็นสิ่งสำคัญ การหายใจลึก ๆ เป็นวิธีที่ง่ายและมีประสิทธิภาพสำหรับการลดความเครียดทันที\n\nการทำงานแบบมีขอบเขตก็ช่วยลดความรู้สึกว่าทุกอย่างต้องรีบจัดการ หากมีเวลาทำงานและเวลาพักที่ชัดเจนจะช่วยให้สมองไม่ตึงเครียดและกลับมาทำงานได้ดีขึ้น\n\nสิ่งที่ควรทำคือแบ่งงานออกเป็นลำดับความสำคัญ เลือกสิ่งที่มีผลมากที่สุดก่อน แล้วกำหนดเวลาพักสั้น ๆ ระหว่างวัน เพื่อให้ร่างกายและจิตใจมีโอกาสฟื้นตัว\n\nหากความเครียดสะสมมากจนทำให้เหนื่อยล้าและหมดไฟเกินไป ควรหยุดและขอความช่วยเหลือจากผู้เชี่ยวชาญก่อนที่จะถึงจุดที่รุนแรงเกินควบคุม",
    category: "สุขภาพจิต",
    coverImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    sourceName: "World Health Organization",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    createdAt: "2026-07-26T00:00:00.000Z"
  },
  {
    id: 2,
    title: "ทำไมการนอนหลับถึงส่งผลต่ออารมณ์ของเรา",
    slug: "sleep-and-mood",
    excerpt: "การนอนหลับที่ไม่เพียงพอ ส่งผลต่อความสามารถในการควบคุมอารมณ์และลดความสามารถในการตอบสนองต่อความเครียด",
    content: "การนอนหลับมีบทบาทสำคัญต่อการควบคุมอารมณ์และการทำงานของสมอง หากร่างกายไม่ได้พักผ่อนเพียงพอ ความสามารถในการคิดวิเคราะห์และควบคุมอารมณ์จะลดลง\n\nคนที่นอนน้อยมักเกิดอาการหงุดหงิดง่าย วิตกกังวลมากขึ้น และมีแนวโน้มที่จะรู้สึกเศร้าหรือหมดแรงได้ง่าย โดยเฉพาะในช่วงที่ต้องเผชิญกับความกดดันจากงานหรือการเรียน\n\nปริมาณการนอนที่เหมาะสมสำหรับผู้ใหญ่คือประมาณ 7-9 ชั่วโมงต่อคืน และการสม่ำเสมอในเวลานอนและตื่นช่วยให้ร่างกายฟื้นฟูกลับคืนสู่สภาวะปกติได้ดียิ่งขึ้น\n\nการลดการใช้หน้าจอก่อนนอน ห้องนอนที่มืดและเงียบ และหลีกเลี่ยงสิ่งกระตุ้นที่ทำให้สมองตื่นจะช่วยให้คุณนอนหลับได้ดีขึ้นอย่างเห็นได้ชัด\n\nหากมีปัญหานอนไม่หลับเป็นประจำ การปรับพฤติกรรมการนอนและปรึกษาผู้เชี่ยวชาญจึงเป็นการเริ่มต้นที่ปลอดภัยและมีประสิทธิภาพ",
    category: "การนอนหลับ",
    coverImageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    sourceName: "Sleep Foundation",
    sourceUrl: "https://www.sleepfoundation.org/sleep-hygiene",
    createdAt: "2026-07-24T00:00:00.000Z"
  },
  {
    id: 3,
    title: "สัญญาณเตือนว่าคุณควรปรึกษาผู้เชี่ยวชาญ",
    slug: "warning-signs",
    excerpt: "สัญญาณบางอย่าง เช่น ความเศร้าอย่างต่อเนื่อง วิตกกังวลมากเกินไป หรือเปลี่ยนแปลงการนอนและการกิน เป็นตัวบ่งชี้ว่าควรขอคำปรึกษาเร็วขึ้น",
    content: "สุขภาพจิตที่ดีไม่ได้หมายถึงการที่ไม่มีอารมณ์แปรปรวน แต่หมายถึงความสามารถในการรับมือกับอารมณ์และหาทางช่วยเหลือเมื่อความกังวลเริ่มท่วมท้น\n\nสัญญาณที่ควรระวัง เช่น รู้สึกเศร้า สิ้นหวัง หรือหมดแรงเกินไปเป็นเวลานาน ความวิตกกังวลที่รบกวนการทำงาน หรือการเปลี่ยนแปลงพฤติกรรม เช่น นอนไม่หลับ กินผิดปกติ หรือถอนตัวจากคนรอบข้าง\n\nเมื่อมีความคิดทำร้ายตัวเองหรือมีอาการที่ส่งผลกระทบต่อการใช้ชีวิตประจำวัน ควรขอความช่วยเหลือทันที จากสายด่วนสุขภาพจิตหรือแพทย์ผู้เชี่ยวชาญ\n\nการขอความช่วยเหลือไม่ใช่ภาวะอ่อนแอ แต่เป็นการดูแลตัวเองอย่างมีสติและมีความกล้าหาญในการเริ่มต้นเพื่อให้กลับมามีชีวิตที่ดีขึ้นได้",
    category: "คำปรึกษา",
    coverImageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    sourceName: "Mental Health Foundation",
    sourceUrl: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/mental-health-awareness",
    createdAt: "2026-07-20T00:00:00.000Z"
  }
];

const serializeArticle = (article: any) => ({
  id: article.id,
  title: article.title,
  slug: article.slug || String(article.id),
  excerpt: article.excerpt || article.content?.slice(0, 180) || "",
  content: article.content,
  category: article.category,
  coverImageUrl: article.coverImageUrl || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  sourceName: article.sourceName || "DMHAB",
  sourceUrl: article.sourceUrl || "https://www.who.int/health-topics/mental-health",
  createdAt: article.createdAt || new Date().toISOString(),
  createdById: article.createdById ?? null,
  createdBy: article.createdBy || null,
});

export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: { createdBy: { select: { id: true, username: true, email: true } } },
    });

    res.status(200).json(articles.map(serializeArticle));
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลบทความจากฐานข้อมูลได้" });
  }
};

export const getArticleBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const article = await prisma.article.findFirst({
      where: { OR: [{ slug }, { id: Number(slug) || -1 }] },
      include: { createdBy: { select: { id: true, username: true, email: true } } },
    });

    if (article) {
      res.status(200).json(serializeArticle(article));
      return;
    }

    res.status(404).json({ error: "ไม่พบบทความที่ร้องขอ" });
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลบทความได้" });
  }
};

export const createArticle = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { title, category, excerpt, content, sourceName, coverImageUrl, sourceUrl } = req.body;

    if (!userId || typeof title !== "string" || !title.trim() ||
      typeof category !== "string" || !category.trim() ||
      typeof content !== "string" || !content.trim()) {
      res.status(400).json({ error: "กรุณากรอกชื่อบทความ หมวดหมู่ และเนื้อหาบทความให้ครบถ้วน" });
      return;
    }

    const newArticle = await prisma.article.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        excerpt: typeof excerpt === "string" && excerpt.trim() ? excerpt.trim() : null,
        content: content.trim(),
        sourceName: typeof sourceName === "string" && sourceName.trim() ? sourceName.trim() : null,
        coverImageUrl: typeof coverImageUrl === "string" && coverImageUrl.trim() ? coverImageUrl.trim() : null,
        sourceUrl: typeof sourceUrl === "string" && sourceUrl.trim() ? sourceUrl.trim() : null,
        // สร้าง slug พื้นฐานจากชื่อ หรือใช้เวลาสุ่มเพื่อไม่ให้ซ้ำ
        slug: `article-${Date.now()}`, 
        createdById: userId
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

    if (!Number.isInteger(articleId) || articleId <= 0 ||
      typeof title !== "string" || !title.trim() ||
      typeof category !== "string" || !category.trim() ||
      typeof content !== "string" || !content.trim()) {
      res.status(400).json({ error: "ข้อมูลบทความไม่ถูกต้อง หรือกรอกข้อมูลที่จำเป็นไม่ครบถ้วน" });
      return;
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: title.trim(),
        category: category.trim(),
        excerpt: typeof excerpt === "string" && excerpt.trim() ? excerpt.trim() : null,
        content: content.trim(),
        sourceName: typeof sourceName === "string" && sourceName.trim() ? sourceName.trim() : null,
        coverImageUrl: typeof coverImageUrl === "string" && coverImageUrl.trim() ? coverImageUrl.trim() : null,
        sourceUrl: typeof sourceUrl === "string" && sourceUrl.trim() ? sourceUrl.trim() : null
      },
      include: { createdBy: { select: { id: true, username: true, email: true } } }
    });
    res.status(200).json({ message: "อัปเดตบทความสำเร็จ", article: serializeArticle(updatedArticle) });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตบทความ" });
  }
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id: Number(id) }
    });
    res.status(200).json({ message: "ลบบทความสำเร็จ" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบบทความ" });
  }
};
