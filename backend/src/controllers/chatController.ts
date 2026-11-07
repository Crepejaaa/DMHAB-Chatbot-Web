import { Response } from "express";
import prisma from "../prismaClient";
import {
  generateChatResponse,
  generateSessionSummary,
  getLocalizedGreeting,
  getLocalizedTopicQuestions,
  getTopicConfig,
  hasCrisisSignal,
  isValidTopic,
  translateChatMessages,
  AIResponse,
  SessionSummaryResult,
} from "../services/groqService";
import { AuthRequest } from "../middlewares/authMiddleware";

const QUESTION_TRANSITIONS: Record<number, string> = {
  2: "ขอบคุณที่เล่าให้น้องมุกห่วงใยฟังนะคะ ค่อย ๆ ไปต่อกันอีกนิดนะคะ",
  3: "รับรู้ถึงความรู้สึกของคุณเลยค่ะ ขอชวนสำรวจต่อในข้อถัดไปนะคะ",
  4: "ขอบคุณที่เปิดใจแบ่งปันนะคะ เรื่องที่คุณเจอไม่เล็กเลยค่ะ",
  5: "มาถึงคำถามเริ่มต้นข้อสุดท้ายแล้วนะคะ ขอบคุณที่ค่อย ๆ เล่ามาด้วยกันค่ะ",
};

const QUESTION_TRANSITIONS_EN: Record<number, string> = {
  2: "Thank you for sharing with Nong Mook Huang Yai. Let's gently continue to the next question.",
  3: "I hear how you're feeling. Let's explore a little further together.",
  4: "Thank you for opening up—what you're going through truly matters.",
  5: "We've reached the last starter question. Thank you for walking through this with me.",
};

const LEGACY_SUMMARY_LABELS: Record<string, string> = {
  STRESS: "พูดคุยสำรวจความเครียดสะสมและการดูแลใจเบื้องต้น",
  SLEEP: "พูดคุยสำรวจเรื่องการนอนหลับและการพักผ่อน",
  BURNOUT: "พูดคุยสำรวจความเหนื่อยล้าทางอารมณ์และภาระสะสม",
  NONE: "พูดคุยรับฟังความรู้สึกและดูแลใจประจำวัน",
};

const parseStoredSummary = (
  rawSummary: string | null | undefined,
  topic?: string | null
): { summaryText: string | null; summaryDetail: SessionSummaryResult | null } => {
  if (!rawSummary) {
    return { summaryText: null, summaryDetail: null };
  }

  try {
    const parsed = JSON.parse(rawSummary) as Partial<SessionSummaryResult>;
    if (parsed && typeof parsed.overview === "string") {
      const detail: SessionSummaryResult = {
        overview: parsed.overview,
        actionable_steps: Array.isArray(parsed.actionable_steps) ? parsed.actionable_steps : [],
        encouragement:
          typeof parsed.encouragement === "string"
            ? parsed.encouragement
            : "ขอบคุณที่แวะมาพักใจกับน้องมุกห่วงใยนะคะ",
        severity_level:
          parsed.severity_level === "SEVERE" ||
          parsed.severity_level === "MODERATE" ||
          parsed.severity_level === "MILD"
            ? parsed.severity_level
            : "MILD",
      };
      return { summaryText: detail.overview, summaryDetail: detail };
    }
  } catch {
    // กรณีเป็นข้อความธรรมดาจากข้อมูลเก่าก่อนอัปเกรด
  }

  const readable =
    LEGACY_SUMMARY_LABELS[rawSummary] ||
    rawSummary ||
    `สรุปการพูดคุยเรื่อง${getTopicConfig(topic).labelTh}`;

  return {
    summaryText: readable,
    summaryDetail: {
      overview: readable,
      actionable_steps: [
        {
          title: "หยุดพักหายใจและสังเกตความรู้สึกตัวเอง",
          description: "ให้เวลาตัวเองได้พักสั้น ๆ โดยไม่ต้องเร่งรัดหรือตำหนิความรู้สึกที่เกิดขึ้นค่ะ",
        },
      ],
      encouragement: "น้องมุกห่วงใยพร้อมเป็นพื้นที่ปลอดภัยรับฟังคุณเสมอนะคะ",
      severity_level: "MILD",
    },
  };
};

// POST /api/chat/sessions — เริ่ม session ใหม่พร้อม topic และคืนคำถามข้อแรกจาก 5 ข้อ
export const startChatSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { topic, locale: rawLocale } = req.body;
    const locale: "th" | "en" = rawLocale === "en" ? "en" : "th";
    if (!isValidTopic(topic)) {
      res.status(400).json({
        error: "กรุณาเลือกหัวข้อการสนทนาที่ถูกต้อง (love, study, work, family, money, friends, self, sleep)",
      });
      return;
    }

    const localizedQuestions = getLocalizedTopicQuestions(topic, locale);
    const firstQuestion = localizedQuestions[0];
    const greetingText = getLocalizedGreeting(topic, locale);

    const session = await prisma.chatSession.create({
      data: {
        userId,
        topic,
      },
    });

    const initialBotText =
      locale === "en"
        ? `${greetingText}\n\nQuestion 1/5: ${firstQuestion.questionText}`
        : `${greetingText}\n\nคำถามข้อที่ 1/5: ${firstQuestion.questionText}`;

    const botMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "BOT",
        message: initialBotText,
      },
    });

    res.status(201).json({
      session: {
        id: session.id,
        topic: session.topic,
        status: "IN_PROGRESS",
        createdAt: session.createdAt,
      },
      phase: "QUESTIONS",
      currentQuestionNo: 1,
      totalQuestions: 5,
      question: firstQuestion,
      messages: [
        {
          id: botMessage.id,
          sender: botMessage.sender,
          text: botMessage.message,
          timestamp: botMessage.createdAt,
        },
      ],
    });
  } catch (error) {
    console.error("Error in startChatSession:", error);
    res.status(500).json({ error: "ไม่สามารถเริ่มต้นเซสชันการสนทนาได้" });
  }
};

// GET /api/chat/sessions/history — คืนลิสต์ session ทั้งหมดของ user สำหรับหน้าประวัติ
export const getChatSessionsHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const sessions = await prisma.chatSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { messages: true, answers: true },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    const formatted = sessions.map((s: any) => {
      const { summaryText, summaryDetail } = parseStoredSummary(s.summary, s.topic);
      const lastMsg = s.messages?.[0]?.message || "";
      return {
        id: s.id,
        topic: s.topic || null,
        status: s.summary ? "COMPLETED" : "IN_PROGRESS",
        createdAt: s.createdAt,
        overallMood: s.overallMood || null,
        summary: summaryText,
        summaryDetail,
        lastMessage: lastMsg,
        messageCount: s._count?.messages ?? 0,
        answerCount: s._count?.answers ?? 0,
      };
    });

    res.status(200).json({ sessions: formatted });
  } catch (error) {
    console.error("Error in getChatSessionsHistory:", error);
    res.status(500).json({ error: "ไม่สามารถดึงประวัติการสนทนาได้" });
  }
};

// GET /api/chat/sessions/:id — คืนข้อความ + คำตอบ 5 ข้อของ session นั้น
export const getChatSessionById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const sessionId = Number(req.params.id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      res.status(400).json({ error: "รหัสเซสชันไม่ถูกต้อง" });
      return;
    }

    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
        answers: { orderBy: { questionNo: "asc" } },
      },
    });

    if (!session) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }

    const locale: "th" | "en" = req.query?.locale === "en" ? "en" : "th";
    const isCompleted = Boolean(session.summary);
    const { summaryText, summaryDetail } = parseStoredSummary(session.summary, session.topic);
    const answeredCount = session.answers.length;

    let currentQuestion = null;
    if (!isCompleted && session.topic && isValidTopic(session.topic) && answeredCount < 5) {
      const localizedQuestions = getLocalizedTopicQuestions(session.topic, locale);
      currentQuestion = localizedQuestions[answeredCount] || null;
    }

    const formattedMessages = session.messages.map((msg: any) => ({
      id: msg.id,
      sender: msg.sender,
      text: msg.message,
      timestamp: msg.createdAt,
    }));

    const formattedAnswers = session.answers.map((ans: any) => ({
      id: ans.id,
      questionNo: ans.questionNo,
      questionText: ans.questionText,
      answerText: ans.answerText,
      score: ans.score,
      createdAt: ans.createdAt,
    }));

    res.status(200).json({
      session: {
        id: session.id,
        topic: session.topic,
        status: isCompleted ? "COMPLETED" : "IN_PROGRESS",
        createdAt: session.createdAt,
        overallMood: session.overallMood,
        summary: summaryText,
        summaryDetail,
        feedbackRating: session.feedbackRating ?? null,
        feedbackAt: session.feedbackAt ?? null,
      },
      phase: currentQuestion ? "QUESTIONS" : "FREE_CHAT",
      currentQuestionNo: currentQuestion ? currentQuestion.questionNo : null,
      totalQuestions: 5,
      currentQuestion,
      answers: formattedAnswers,
      messages: formattedMessages,
    });
  } catch (error) {
    console.error("Error in getChatSessionById:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลเซสชันได้" });
  }
};

// GET /api/chat/sessions/:id/messages?locale=th|en — คืนข้อความแชทที่แปลตาม locale ที่ขอ (ใช้ตอนผู้ใช้สลับภาษากลางบทสนทนา)
export const getLocalizedMessages = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const sessionId = Number(req.params.id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      res.status(400).json({ error: "รหัสเซสชันไม่ถูกต้อง" });
      return;
    }
    const locale: "th" | "en" = req.query?.locale === "en" ? "en" : "th";

    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!session) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }

    const inputMessages = session.messages.map((m: any) => ({
      id: m.id,
      sender: m.sender,
      text: m.message,
    }));
    const translated = await translateChatMessages(inputMessages, locale);
    const translatedMap = new Map(translated.map((t) => [Number(t.id), t.text]));

    const formattedMessages = session.messages.map((msg: any) => ({
      id: msg.id,
      sender: msg.sender,
      text: translatedMap.get(Number(msg.id)) ?? msg.message,
      timestamp: msg.createdAt,
    }));

    res.status(200).json({ messages: formattedMessages });
  } catch (error) {
    console.error("Error in getLocalizedMessages:", error);
    res.status(500).json({ error: "ไม่สามารถแปลข้อความได้" });
  }
};

// POST /api/chat/sessions/:id/end — จบ session ให้ Groq สรุป+ให้คำแนะนำตามหัวข้อ บันทึกลง summary
export const endChatSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const sessionId = Number(req.params.id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      res.status(400).json({ error: "รหัสเซสชันไม่ถูกต้อง" });
      return;
    }

    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
        answers: { orderBy: { questionNo: "asc" } },
      },
    });

    if (!session) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }

    const locale: "th" | "en" = req.body?.locale === "en" ? "en" : "th";

    // หากเคยสรุปเป็น JSON ไว้แล้ว และภาษาตรงกับ locale ที่ร้องขอ คืนค่าเดิมได้ทันที
    if (session.summary) {
      const existing = parseStoredSummary(session.summary, session.topic);
      if (existing.summaryDetail && session.summary.trim().startsWith("{")) {
        const isStoredThai = /[\u0E00-\u0E7F]/.test(existing.summaryDetail.overview);
        const wantsThai = locale === "th";
        if (isStoredThai === wantsThai) {
          res.status(200).json({
            sessionId: session.id,
            topic: session.topic,
            status: "COMPLETED",
            summary: existing.summaryText,
            summaryDetail: existing.summaryDetail,
          });
          return;
        }
      }
    }

    const summaryResult = await generateSessionSummary(
      session.topic,
      session.answers.map((a: any) => ({
        questionNo: a.questionNo,
        questionText: a.questionText,
        answerText: a.answerText,
      })),
      session.messages.map((m: any) => ({
        sender: String(m.sender),
        message: m.message,
      })),
      locale
    );

    const finalMood =
      session.overallMood === "SEVERE" ? "SEVERE" : summaryResult.severity_level;

    await prisma.chatSession.update({
      where: { id: session.id },
      data: {
        summary: JSON.stringify(summaryResult),
        overallMood: finalMood,
      },
    });

    res.status(200).json({
      sessionId: session.id,
      topic: session.topic,
      status: "COMPLETED",
      summary: summaryResult.overview,
      summaryDetail: summaryResult,
      feedbackRating: session.feedbackRating ?? null,
    });
  } catch (error) {
    console.error("Error in endChatSession:", error);
    res.status(500).json({ error: "ไม่สามารถจบและสรุปการสนทนาได้" });
  }
};

// PATCH /api/chat/sessions/:id/feedback — บันทึกคะแนนความพึงพอใจหลังจบเซสชัน (HELPFUL | SOMEWHAT | NOT_HELPFUL)
export const submitSessionFeedback = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const sessionId = Number(req.params.id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      res.status(400).json({ error: "รหัสเซสชันไม่ถูกต้อง" });
      return;
    }
    const { rating } = req.body as { rating?: string };
    const allowed = ["HELPFUL", "SOMEWHAT", "NOT_HELPFUL"];
    if (!rating || !allowed.includes(rating)) {
      res.status(400).json({ error: "ค่า rating ไม่ถูกต้อง" });
      return;
    }
    const session = await prisma.chatSession.findFirst({ where: { id: sessionId, userId } });
    if (!session) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { feedbackRating: rating, feedbackAt: new Date() },
    });
    res.status(200).json({ sessionId, feedbackRating: rating });
  } catch (error) {
    console.error("Error in submitSessionFeedback:", error);
    res.status(500).json({ error: "ไม่สามารถบันทึกความคิดเห็นได้" });
  }
};

// DELETE /api/chat/sessions/:id — ลบ session (cascade ลบ ChatMessage และ ChatAnswer)
export const deleteChatSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const sessionId = Number(req.params.id);
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      res.status(400).json({ error: "รหัสเซสชันไม่ถูกต้อง" });
      return;
    }

    const existing = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!existing) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }

    await prisma.chatSession.delete({
      where: { id: sessionId },
    });

    res.status(200).json({
      message: "ลบประวัติการสนทนาเรียบร้อยแล้ว",
      id: sessionId,
    });
  } catch (error) {
    console.error("Error in deleteChatSession:", error);
    res.status(500).json({ error: "ไม่สามารถลบประวัติการสนทนาได้" });
  }
};

// GET /api/chat/sessions — ดึงประวัติการสนทนาของ Session ล่าสุดที่ยังดำเนินการอยู่ (คงไว้เพื่อความเข้ากันได้)
export const getUserChatSessions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const activeSession = await prisma.chatSession.findFirst({
      where: { userId, summary: null },
      orderBy: { createdAt: "desc" },
    });

    if (!activeSession) {
      res.status(200).json({ messages: [] });
      return;
    }

    const dbMessages = await prisma.chatMessage.findMany({
      where: { sessionId: activeSession.id },
      orderBy: { createdAt: "asc" },
    });

    const formattedMessages = dbMessages.map((msg: { sender: any; message: any; createdAt: any }) => ({
      sender: msg.sender,
      text: msg.message,
      timestamp: msg.createdAt,
    }));

    res.status(200).json({
      sessionId: activeSession.id,
      topic: activeSession.topic,
      messages: formattedMessages,
    });
  } catch (error) {
    console.error("Error in getUserChatSessions:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลแชทได้" });
  }
};

// POST /api/chat — ส่งข้อความ (รองรับทั้งช่วงตอบ 5 คำถามแรก และช่วงคุยอิสระกับ Groq ตามหัวข้อ)
export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    const {
      message,
      sessionId: rawSessionId,
      topic: rawTopic,
      score: rawScore,
      locale: rawLocale,
    } = req.body;
    const locale: "th" | "en" = rawLocale === "en" ? "en" : "th";

    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    if (!trimmedMessage) {
      res.status(400).json({ error: "กรุณาระบุข้อความ" });
      return;
    }

    let session: any = null;

    if (rawSessionId !== undefined && rawSessionId !== null) {
      const parsedId = Number(rawSessionId);
      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        res.status(400).json({ error: "รหัสเซสชันไม่ถูกต้อง" });
        return;
      }
      session = await prisma.chatSession.findFirst({
        where: { id: parsedId, userId },
        include: { answers: { orderBy: { questionNo: "asc" } } },
      });
      if (!session) {
        res.status(404).json({ error: "ไม่พบเซสชันการสนทนา" });
        return;
      }
    } else {
      session = await prisma.chatSession.findFirst({
        where: { userId, summary: null },
        orderBy: { createdAt: "desc" },
        include: { answers: { orderBy: { questionNo: "asc" } } },
      });

      if (!session) {
        session = await prisma.chatSession.create({
          data: {
            userId,
            topic: isValidTopic(rawTopic) ? rawTopic : null,
          },
          include: { answers: { orderBy: { questionNo: "asc" } } },
        });
      }
    }

    if (session.summary) {
      res.status(400).json({ error: "การสนทนานี้สิ้นสุดลงแล้ว กรุณาเริ่มบทสนทนาใหม่" });
      return;
    }

    // บันทึกข้อความของ USER ลง ChatMessage
    const savedUserMsg = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "USER",
        message: trimmedMessage,
      },
    });

    const crisisDetected = hasCrisisSignal(trimmedMessage);
    const existingAnswers: any[] = Array.isArray(session.answers) ? session.answers : [];
    const answeredCount = existingAnswers.length;

    // ช่วงที่ 1: บันทึกคำตอบของ 5 คำถามแรก หาก session มี topic และยังตอบไม่ครบ 5 ข้อ
    if (session.topic && isValidTopic(session.topic) && answeredCount < 5) {
      const topicConfig = getTopicConfig(session.topic);
      const localizedQuestions = getLocalizedTopicQuestions(session.topic, locale);
      const currentQ = localizedQuestions[answeredCount] || topicConfig.questions[answeredCount];

      let resolvedScore: number | null = null;
      if (typeof rawScore === "number" && Number.isInteger(rawScore)) {
        resolvedScore = rawScore;
      } else {
        const matchedOpt =
          currentQ.options.find((opt) => opt.label === trimmedMessage) ||
          topicConfig.questions[answeredCount]?.options.find((opt) => opt.label === trimmedMessage);
        if (matchedOpt) {
          resolvedScore = matchedOpt.score;
        }
      }

      await prisma.chatAnswer.upsert({
        where: {
          sessionId_questionNo: {
            sessionId: session.id,
            questionNo: currentQ.questionNo,
          },
        },
        update: {
          questionText: currentQ.questionText,
          answerText: trimmedMessage,
          score: resolvedScore,
        },
        create: {
          sessionId: session.id,
          questionNo: currentQ.questionNo,
          questionText: currentQ.questionText,
          answerText: trimmedMessage,
          score: resolvedScore,
        },
      });

      const newAnsweredCount = answeredCount + 1;

      // หากไม่พบสัญญาณวิกฤต และยังตอบไม่ครบ 5 ข้อ -> ส่งคำถามข้อถัดไปทันที
      if (!crisisDetected && newAnsweredCount < 5) {
        const nextQ = localizedQuestions[newAnsweredCount] || topicConfig.questions[newAnsweredCount];
        const transitionText =
          locale === "en"
            ? QUESTION_TRANSITIONS_EN[nextQ.questionNo] ||
              "Thank you for sharing with Nong Mook Huang Yai."
            : QUESTION_TRANSITIONS[nextQ.questionNo] ||
              "ขอบคุณที่แบ่งปันให้น้องมุกห่วงใยฟังนะคะ";
        const nextBotMessageText =
          locale === "en"
            ? `${transitionText}\n\nQuestion ${nextQ.questionNo}/5: ${nextQ.questionText}`
            : `${transitionText}\n\nคำถามข้อที่ ${nextQ.questionNo}/5: ${nextQ.questionText}`;

        const savedBotNextQMsg = await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            sender: "BOT",
            message: nextBotMessageText,
          },
        });

        res.status(200).json({
          reply: nextBotMessageText,
          userMessageId: savedUserMsg.id,
          botMessageId: savedBotNextQMsg.id,
          sessionId: session.id,
          phase: "QUESTIONS",
          currentQuestionNo: nextQ.questionNo,
          totalQuestions: 5,
          nextQuestion: nextQ,
          assessment_status: "IN_PROGRESS",
          severity_level: "PENDING",
        });
        return;
      }
    }

    // ช่วงที่ 2: ตอบครบ 5 ข้อแล้ว (หรือพบสัญญาณวิกฤต / เซสชันคุยอิสระ) -> ส่งให้ Groq ประมวลผลตาม topic
    const allAnswers = await prisma.chatAnswer.findMany({
      where: { sessionId: session.id },
      orderBy: { questionNo: "asc" },
    });

    const chatHistory = await prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const aiMessages: { role: "system" | "user" | "assistant"; content: string }[] = [];

    if (session.topic && isValidTopic(session.topic) && allAnswers.length > 0) {
      const topicConfig = getTopicConfig(session.topic);
      const contextLines = allAnswers
        .map((a: any) =>
          locale === "en"
            ? `Q${a.questionNo} (${a.questionText}): ${a.answerText}`
            : `ข้อ ${a.questionNo} (${a.questionText}): ${a.answerText}`
        )
        .join("\n");
      aiMessages.push({
        role: "user",
        content:
          locale === "en"
            ? `[User Initial Context — Topic: ${topicConfig.key}]\n${contextLines}\n\nPlease listen empathetically, reflect the user's feelings warmly on this topic, and continue the conversation naturally in English only.`
            : `[บริบทเริ่มต้นของผู้ใช้ — หัวข้อ: ${topicConfig.labelTh}]\n${contextLines}\n\nกรุณารับฟัง สะท้อนความรู้สึกอย่างอบอุ่นตามหัวข้อนี้ และชวนพูดคุยต่ออย่างเป็นธรรมชาติ`,
      });
      aiMessages.push({
        role: "assistant",
        content: JSON.stringify({
          reply_message:
            locale === "en"
              ? "Understood. Nong Mook Huang Yai is ready to listen and reflect your feelings warmly in English."
              : "รับทราบค่ะ น้องมุกห่วงใยพร้อมรับฟังและสะท้อนความรู้สึกอย่างอบอุ่นค่ะ",
          assessment_status: "IN_PROGRESS",
          severity_level: "PENDING",
          suggested_category: "NONE",
        }),
      });
    }

    for (const msg of chatHistory.reverse()) {
      aiMessages.push({
        role: String(msg.sender) === "USER" ? "user" : "assistant",
        content: msg.message,
      });
    }

    let aiResponse: AIResponse;
    try {
      aiResponse = await generateChatResponse(aiMessages, session.topic, locale);
    } catch (groqErr) {
      if (crisisDetected) {
        aiResponse = {
          reply_message:
            locale === "en"
              ? "I can hear how heavy and painful things feel for you right now, and I don't want you to go through this alone. Please reach out to a mental health professional via the Mental Health Hotline at 1323, available 24/7."
              : "น้องมุกห่วงใยรับรู้ว่าตอนนี้คุณกำลังเผชิญความรู้สึกที่หนักและเจ็บปวดมากจริง ๆ และไม่อยากให้คุณต้องผ่านช่วงเวลานี้ตามลำพังนะคะ โปรดติดต่อผู้เชี่ยวชาญสายด่วนสุขภาพจิต โทร 1323 ได้ตลอด 24 ชั่วโมงนะคะ",
          assessment_status: "IN_PROGRESS",
          severity_level: "SEVERE",
          suggested_category: "STRESS",
        };
      } else {
        throw groqErr;
      }
    }

    if (crisisDetected) {
      aiResponse.severity_level = "SEVERE";
    }

    const savedBotMsg = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "BOT",
        message: aiResponse.reply_message,
      },
    });

    if (aiResponse.severity_level && aiResponse.severity_level !== "PENDING") {
      await prisma.chatSession.update({
        where: { id: session.id },
        data: {
          overallMood: aiResponse.severity_level,
        },
      });
    }

    res.status(200).json({
      reply: aiResponse.reply_message,
      userMessageId: savedUserMsg.id,
      botMessageId: savedBotMsg.id,
      sessionId: session.id,
      phase: "FREE_CHAT",
      currentQuestionNo: null,
      totalQuestions: 5,
      nextQuestion: null,
      assessment_status: "IN_PROGRESS",
      severity_level: aiResponse.severity_level,
    });
  } catch (error) {
    console.error("Chat API Error Details:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเชื่อมต่อแชทบอท" });
  }
};
