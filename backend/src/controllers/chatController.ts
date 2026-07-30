import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// สร้างห้องแชทใหม่สำหรับ User
export const createChatSession = async (req: Request, res: Response): Promise<void> => {
  try {
    // สมมติว่าดึง userId มาจาก JWT Middleware
    const userId = (req as any).user.userId; 
    
    const newSession = await prisma.chatSession.create({
      data: {
        userId: userId,
        // เพิ่มฟิลด์อื่นๆ ตาม schema ของคุณ
      }
    });

    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: "ไม่สามารถสร้างเซสชันแชทได้" });
  }
};

// ดึงประวัติแชททั้งหมดของ User คนนั้น
export const getUserChatSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    
    const sessions = await prisma.chatSession.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลแชทได้" });
  }
};