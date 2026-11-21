import { Request, Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ACTIVITIES } from "../data/activities";

// ตาราง "DailyCheckin" เป็นของฟีเจอร์เช็คอินรายวันเท่านั้น (ไม่ใช้ร่วมกับตารางอื่น)
let schemaPromise: Promise<void> | null = null;

export const ensureDailyCheckinSchema = async (): Promise<void> => {
  if (typeof prisma?.$executeRawUnsafe !== "function") return;
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "DailyCheckin" (
          "id" SERIAL NOT NULL,
          "userId" INTEGER NOT NULL,
          "dateKey" TEXT NOT NULL,
          "moodScore" INTEGER NOT NULL,
          "moodLabel" TEXT,
          "energy" INTEGER NOT NULL DEFAULT 5,
          "stress" INTEGER NOT NULL DEFAULT 5,
          "social" INTEGER NOT NULL DEFAULT 5,
          "note" TEXT,
          "tags" JSONB NOT NULL DEFAULT '[]',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "DailyCheckin_pkey" PRIMARY KEY ("id")
        )
      `);
      await prisma.$executeRawUnsafe(
        `CREATE UNIQUE INDEX IF NOT EXISTS "DailyCheckin_userId_dateKey_key" ON "DailyCheckin"("userId", "dateKey")`
      );
      await prisma.$executeRawUnsafe(
        `CREATE INDEX IF NOT EXISTS "DailyCheckin_userId_createdAt_idx" ON "DailyCheckin"("userId", "createdAt")`
      );
      await prisma.$executeRawUnsafe(`
        DO $$ BEGIN
          ALTER TABLE "DailyCheckin" ADD CONSTRAINT "DailyCheckin_userId_fkey"
            FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        EXCEPTION WHEN duplicate_object THEN NULL; END $$;
      `);
    })().catch((err) => {
      schemaPromise = null;
      throw err;
    });
  }
  await schemaPromise;
};

const getUserId = (req: AuthRequest): number | null => {
  const id = Number(req.user?.userId);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const clampMetric = (v: unknown): number => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= 1 && n <= 10 ? n : 5;
};

const format = (r: any) =>
  r && {
    id: r.id,
    dateKey: r.dateKey,
    moodScore: r.moodScore,
    score: r.moodScore,
    moodLabel: r.moodLabel,
    energy: r.energy,
    stress: r.stress,
    social: r.social,
    note: r.note || "",
    tags: Array.isArray(r.tags) ? r.tags : [],
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    savedAt: r.updatedAt || r.createdAt,
  };

// GET /api/checkin/activities : ดึงรายการกิจกรรมแนะนำจากคลังกิจกรรม (ACTIVITIES)
export const getRecommendedActivities = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({ activities: ACTIVITIES });
};

// POST /api/checkin : บันทึก/อัปเดตเช็คอินของวันนั้น (1 วัน 1 รายการต่อผู้ใช้)
export const saveDailyCheckin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ error: "ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่" });
      return;
    }
    await ensureDailyCheckinSchema();

    const { moodScore, moodLabel, energy, stress, social, note, tags, dateKey } = req.body || {};
    const score = Number(moodScore);
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      res.status(400).json({ error: "คะแนนอารมณ์ต้องอยู่ระหว่าง 1 ถึง 5" });
      return;
    }

    const key =
      typeof dateKey === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateKey.trim())
        ? dateKey.trim()
        : new Date().toISOString().slice(0, 10);

    const data = {
      moodScore: score,
      moodLabel: typeof moodLabel === "string" ? moodLabel.trim().slice(0, 50) : null,
      energy: clampMetric(energy),
      stress: clampMetric(stress),
      social: clampMetric(social),
      note: typeof note === "string" && note.trim() ? note.trim().slice(0, 500) : null,
      tags: Array.isArray(tags) ? tags.map(String).slice(0, 20) : [],
    };

    const record = await prisma.dailyCheckin.upsert({
      where: { userId_dateKey: { userId, dateKey: key } },
      update: data,
      create: { userId, dateKey: key, ...data },
    });

    res.status(200).json({ success: true, checkin: format(record) });
  } catch (error) {
    console.error("saveDailyCheckin error:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการบันทึกการเช็คอิน" });
  }
};

// GET /api/checkin/history : ประวัติของผู้ใช้ที่ล็อกอินเท่านั้น
export const getCheckinHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ error: "ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่" });
      return;
    }
    await ensureDailyCheckinSchema();

    const rows = await prisma.dailyCheckin.findMany({
      where: { userId },
      orderBy: { dateKey: "desc" },
      take: 365,
    });
    res.status(200).json({ history: rows.map(format) });
  } catch (error) {
    console.error("getCheckinHistory error:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงประวัติการเช็คอิน" });
  }
};

// DELETE /api/checkin/:id : ลบได้เฉพาะรายการของตัวเอง
export const deleteDailyCheckin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = getUserId(req);
    const id = Number(req.params.id);
    if (!userId) {
      res.status(401).json({ error: "ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่" });
      return;
    }
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "รหัสรายการไม่ถูกต้อง" });
      return;
    }
    await ensureDailyCheckinSchema();

    const result = await prisma.dailyCheckin.deleteMany({ where: { id, userId } });
    if (result.count === 0) {
      res.status(404).json({ error: "ไม่พบรายการเช็คอินที่ต้องการลบ" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("deleteDailyCheckin error:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบรายการเช็คอิน" });
  }
};

// DELETE /api/checkin : ล้างประวัติการเช็คอินทั้งหมดของตัวเอง
export const clearDailyCheckinHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      res.status(401).json({ error: "ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่" });
      return;
    }
    await ensureDailyCheckinSchema();

    const result = await prisma.dailyCheckin.deleteMany({ where: { userId } });
    res.status(200).json({ success: true, deletedCount: result.count });
  } catch (error) {
    console.error("clearDailyCheckinHistory error:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบประวัติการเช็คอินทั้งหมด" });
  }
};
