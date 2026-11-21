import { Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";
import { getActivityByKey } from "../data/activities";

const resolveUserId = (req: AuthRequest): number | null => {
  const raw = req.user?.userId ?? req.user?.id;
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const getTodayDateKey = (): string => {
  return new Date().toISOString().slice(0, 10);
};

const formatUserActivity = (row: any, today: string) => {
  const catalog = getActivityByKey(row.activityKey);
  const logs: any[] = Array.isArray(row.logs) ? row.logs : [];
  return {
    id: row.id,
    userId: row.userId,
    sessionId: row.sessionId ?? null,
    activityKey: row.activityKey,
    topic: row.topic ?? null,
    assignedAt: row.assignedAt,
    expiresAt: row.expiresAt,
    deletedAt: row.deletedAt ?? null,
    nameTh: catalog?.nameTh || row.activityKey,
    nameEn: catalog?.nameEn || row.activityKey,
    howToTh: catalog?.howToTh || "",
    howToEn: catalog?.howToEn || "",
    source: catalog?.source || null,
    loggedToday: logs.some((l: any) => l.dateKey === today),
    completedDaysCount: logs.length,
    logs: logs.map((l: any) => ({
      id: l.id,
      userActivityId: l.userActivityId,
      dateKey: l.dateKey,
      createdAt: l.createdAt,
    })),
  };
};

// 1. GET /api/activities/active — รายการ UserActivity ที่ยังไม่ถูกลบและยังไม่หมดอายุ พร้อมสถานะติ๊กวันนี้
export const getActiveActivities = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const now = new Date();
    const today = getTodayDateKey();

    const rows = await prisma.userActivity.findMany({
      where: {
        userId,
        deletedAt: null,
        expiresAt: { gt: now },
      },
      include: {
        logs: {
          orderBy: { dateKey: "desc" },
        },
      },
      orderBy: { assignedAt: "desc" },
    });

    const activities = rows.map((row: any) => formatUserActivity(row, today));

    res.status(200).json({
      today,
      activities,
    });
  } catch (error) {
    console.error("Error in getActiveActivities:", error);
    res.status(500).json({ error: "ไม่สามารถดึงรายการกิจกรรมที่กำลังทำอยู่ได้" });
  }
};

// 2. GET /api/activities/history — รายการ UserActivity ที่หมดอายุแล้วหรือถูกลบ พร้อมจำนวนวันที่ติ๊กสำเร็จ
export const getActivityHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const now = new Date();
    const today = getTodayDateKey();

    const rows = await prisma.userActivity.findMany({
      where: {
        userId,
        OR: [
          { expiresAt: { lte: now } },
          { deletedAt: { not: null } },
        ],
      },
      include: {
        logs: {
          orderBy: { dateKey: "desc" },
        },
      },
      orderBy: { assignedAt: "desc" },
    });

    const activities = rows.map((row: any) => formatUserActivity(row, today));

    res.status(200).json({
      activities,
    });
  } catch (error) {
    console.error("Error in getActivityHistory:", error);
    res.status(500).json({ error: "ไม่สามารถดึงประวัติกิจกรรมได้" });
  }
};

// 3. GET /api/activities/catalog/:key — รายละเอียดกิจกรรม 1 รายการจาก ACTIVITIES ตาม key
export const getActivityCatalogItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const key = String(req.params.key || "").trim();
    const item = getActivityByKey(key);
    if (!item) {
      res.status(404).json({ error: "ไม่พบข้อมูลกิจกรรมที่ระบุ" });
      return;
    }

    res.status(200).json({ activity: item });
  } catch (error) {
    console.error("Error in getActivityCatalogItem:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลกิจกรรมได้" });
  }
};

// 4. POST /api/activities/:id/log — ติ๊กว่าทำกิจกรรมแล้วในวันนี้ (idempotent: ซ้ำในวันเดิมคืน 200)
export const logActivityToday = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "รหัสกิจกรรมไม่ถูกต้อง" });
      return;
    }

    const userActivity = await prisma.userActivity.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!userActivity) {
      res.status(404).json({ error: "ไม่พบรายการกิจกรรมของผู้ใช้นี้" });
      return;
    }

    const now = new Date();
    if (userActivity.expiresAt <= now) {
      res.status(400).json({ error: "กิจกรรมนี้หมดอายุแล้ว" });
      return;
    }

    const today = getTodayDateKey();

    const existing = await prisma.userActivityLog.findUnique({
      where: {
        userActivityId_dateKey: {
          userActivityId: userActivity.id,
          dateKey: today,
        },
      },
    });

    if (existing) {
      res.status(200).json({
        message: "บันทึกการทำกิจกรรมวันนี้ไว้แล้ว",
        alreadyLogged: true,
        loggedToday: true,
        dateKey: today,
        log: existing,
      });
      return;
    }

    const log = await prisma.userActivityLog.create({
      data: {
        userActivityId: userActivity.id,
        dateKey: today,
      },
    });

    res.status(200).json({
      message: "บันทึกการทำกิจกรรมวันนี้เรียบร้อยแล้ว",
      alreadyLogged: false,
      loggedToday: true,
      dateKey: today,
      log,
    });
  } catch (error: any) {
    // กรณีเกิด race condition ชน unique constraint (P2002) ให้คืน 200 ตามสเปก
    if (error?.code === "P2002") {
      const today = getTodayDateKey();
      res.status(200).json({
        message: "บันทึกการทำกิจกรรมวันนี้ไว้แล้ว",
        alreadyLogged: true,
        loggedToday: true,
        dateKey: today,
      });
      return;
    }
    console.error("Error in logActivityToday:", error);
    res.status(500).json({ error: "ไม่สามารถบันทึกการทำกิจกรรมได้" });
  }
};

// 5. DELETE /api/activities/:id/log/today — ยกเลิกติ๊กกิจกรรมของวันนี้
export const unlogActivityToday = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "รหัสกิจกรรมไม่ถูกต้อง" });
      return;
    }

    const userActivity = await prisma.userActivity.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!userActivity) {
      res.status(404).json({ error: "ไม่พบรายการกิจกรรมของผู้ใช้นี้" });
      return;
    }

    const today = getTodayDateKey();
    const deleted = await prisma.userActivityLog.deleteMany({
      where: {
        userActivityId: userActivity.id,
        dateKey: today,
      },
    });

    res.status(200).json({
      message: "ยกเลิกการติ๊กกิจกรรมของวันนี้เรียบร้อยแล้ว",
      loggedToday: false,
      dateKey: today,
      deletedCount: deleted.count,
    });
  } catch (error) {
    console.error("Error in unlogActivityToday:", error);
    res.status(500).json({ error: "ไม่สามารถยกเลิกการติ๊กกิจกรรมได้" });
  }
};

// 6. DELETE /api/activities/:id — soft delete ตั้ง deletedAt = now()
export const deleteUserActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = resolveUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "รหัสกิจกรรมไม่ถูกต้อง" });
      return;
    }

    const userActivity = await prisma.userActivity.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!userActivity) {
      res.status(404).json({ error: "ไม่พบรายการกิจกรรมของผู้ใช้นี้" });
      return;
    }

    const updated = await prisma.userActivity.update({
      where: { id: userActivity.id },
      data: { deletedAt: new Date() },
    });

    res.status(200).json({
      message: "ลบรายการกิจกรรมเรียบร้อยแล้ว",
      id: updated.id,
      deletedAt: updated.deletedAt,
    });
  } catch (error) {
    console.error("Error in deleteUserActivity:", error);
    res.status(500).json({ error: "ไม่สามารถลบรายการกิจกรรมได้" });
  }
};
