import { Request, Response } from "express";
import prisma from "../prismaClient";
import { generateChatResponse } from "../services/ollamaService";



// ดึงประวัติการสนทนาของ Session ปัจจุบัน
export const getUserChatSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // หา Session ล่าสุดที่ยังไม่เสร็จ (summary เป็น null)
    const activeSession = await prisma.chatSession.findFirst({
      where: { userId: userId, summary: null },
      orderBy: { createdAt: "desc" },
    });

    if (!activeSession) {
      res.status(200).json({ messages: [] });
      return;
    }

    // ดึงข้อความใน Session นั้น
    const dbMessages = await prisma.chatMessage.findMany({
      where: { sessionId: activeSession.id },
      orderBy: { createdAt: "asc" },
    });

    // แมปกลับไปให้อยู่ในรูปแบบที่ Frontend ต้องการ
    const formattedMessages = dbMessages.map((msg) => ({
      sender: msg.sender,
      text: msg.message,
      timestamp: msg.createdAt,
    }));

    res.status(200).json({ messages: formattedMessages });
  } catch (error) {
    console.error("Error in getUserChatSessions:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลแชทได้" });
  }
};

// ส่งข้อความและโต้ตอบกับ บอท
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;
    const { message } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (!message) {
      res.status(400).json({ error: "กรุณาระบุข้อความ" });
      return;
    }

    // 1. หาหรือสร้าง ChatSession ประจำวัน
    let session = await prisma.chatSession.findFirst({
      where: { userId: userId, summary: null },
      orderBy: { createdAt: "desc" },
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: { userId: userId },
      });
    }

    // 2. บันทึกข้อความของผู้ใช้ลง DB
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "USER",
        message: message,
      },
    });

    // 3. ดึงประวัติแชทของ Session เพื่อใช้เป็น Context ให้ AI
    const chatHistory = await prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: "asc" },
      take: 20, // จำกัดไม่ให้ยาวเกินไป
    });

    const aiMessages = chatHistory.map((msg) => ({
      role: msg.sender === "USER" ? "user" : "assistant",
      content: msg.message,
    }));

    // 4. ส่งไปให้ Ollama ประมวลผล
    const aiResponse = await generateChatResponse(aiMessages);

    // 5. บันทึกข้อความตอบกลับของบอท
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "BOT",
        message: aiResponse.reply_message,
      },
    });

    // 6. ตรวจสอบสถานะและอัปเดต Session หากจำเป็น
    if (
      aiResponse.assessment_status === "COMPLETED" ||
      aiResponse.severity_level === "SEVERE"
    ) {
      await prisma.chatSession.update({
        where: { id: session.id },
        data: {
          overallMood: aiResponse.severity_level,
          summary: aiResponse.suggested_category, // ใช้หมวดหมู่เป็น summary คร่าวๆ
        },
      });
    }

    // 7. ส่งตอบกลับไปยัง Frontend
    res.status(200).json({
      reply: aiResponse.reply_message,
      assessment_status: aiResponse.assessment_status,
      severity_level: aiResponse.severity_level,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเชื่อมต่อแชทบอท" });
  }
};