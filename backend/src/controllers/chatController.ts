import { Response } from "express";
import prisma from "../prismaClient";
import {
  buildOpeningInstruction,
  generateChatResponse,
  generateSessionSummary,
  getLocalizedGreeting,
  getTopicConfig,
  hasCrisisSignal,
  isValidTopic,
  translateChatMessages,
  AIResponse,
  SessionSummaryResult,
} from "../services/groqService";
import {
  buildScaleContextForAI,
  buildScaleQuestionPayload,
  determineSessionMode,
  finalizeScales,
  getSessionScaleResult,
} from "../services/scaleFlowService";
import {
  getScaleItemByGlobalNo,
  interpretST5,
  interpretWHO5,
  OPENING_LIMITS,
} from "../data/scales";
import { AuthRequest } from "../middlewares/authMiddleware";

const LEGACY_SUMMARY_LABELS: Record<string, string> = {
  STRESS: "พูดคุยสำรวจความเครียดสะสมและการดูแลใจเบื้องต้น",
  SLEEP: "พูดคุยสำรวจเรื่องการนอนหลับและการพักผ่อน",
  BURNOUT: "พูดคุยสำรวจความเหนื่อยล้าทางอารมณ์และภาระสะสม",
  NONE: "พูดคุยรับฟังความรู้สึกและดูแลใจประจำวัน",
};

const formatLocalizedDate = (isoOrDate: string | Date, locale: "th" | "en"): string => {
  const dateObj = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
};

const getOpeningBounds = (mode: string | null | undefined) => {
  if (mode === "FOLLOW_UP") {
    return OPENING_LIMITS.FOLLOW_UP;
  }
  return OPENING_LIMITS.FIRST;
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

// 6.1 POST /api/chat/sessions — เริ่ม session ใหม่พร้อม topic และตัดสินโหมด FIRST / FOLLOW_UP / CHAT_ONLY
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

    const { mode, lastResult, nextFollowUpDate } = await determineSessionMode(userId, topic);
    const phase = mode === "CHAT_ONLY" ? "FREE_CHAT" : "OPENING";
    const greetingText = getLocalizedGreeting(topic, locale);

    let initialBotText = greetingText;
    if (mode === "FOLLOW_UP" && lastResult) {
      const formattedDate = formatLocalizedDate(lastResult.date, locale);
      const st5Interp = interpretST5(lastResult.st5.total);
      const who5Interp = interpretWHO5(lastResult.who5.raw);
      initialBotText =
        locale === "en"
          ? `Welcome back! Last time on ${formattedDate}, your stress level was "${st5Interp.labelEn}" and your well-being was "${who5Interp.labelEn}". How have things been going for you recently?`
          : `ยินดีต้อนรับกลับค่ะ ครั้งก่อนเมื่อวันที่ ${formattedDate} ผลความเครียดอยู่ที่ "${st5Interp.labelTh}" และผลสุขภาวะอยู่ที่ "${who5Interp.labelTh}" ช่วงที่ผ่านมาเป็นอย่างไรบ้างคะ`;
    } else if (mode === "CHAT_ONLY" && nextFollowUpDate) {
      const formattedNextDate = formatLocalizedDate(nextFollowUpDate, locale);
      initialBotText =
        locale === "en"
          ? `${greetingText}\n\nYour next follow-up assessment for this topic is scheduled for ${formattedNextDate}.`
          : `${greetingText}\n\nรอบติดตามผลครั้งถัดไปของหัวข้อนี้คือวันที่ ${formattedNextDate} นะคะ`;
    }

    const session = await prisma.chatSession.create({
      data: {
        userId,
        topic,
        mode,
        phase,
        openingTurns: 0,
      },
    });

    const botMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "BOT",
        message: initialBotText,
      },
    });

    const bounds = getOpeningBounds(mode);
    const opening =
      mode === "CHAT_ONLY"
        ? null
        : {
            turns: 0,
            min: bounds.min,
            max: bounds.max,
          };

    res.status(201).json({
      session: {
        id: session.id,
        topic: session.topic,
        status: "IN_PROGRESS",
        createdAt: session.createdAt,
      },
      mode,
      phase,
      opening,
      lastResult,
      nextFollowUpDate,
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
        mode: s.mode ?? null,
        phase: s.phase ?? "FREE_CHAT",
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

// 6.6 GET /api/chat/sessions/:id — คืนรายละเอียดเซสชัน (รองรับทั้งเซสชันแบบเดิมและเซสชันแบบใหม่)
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
      scaleKey: ans.scaleKey ?? null,
      createdAt: ans.createdAt,
    }));

    // เซสชันแบบเดิม (mode เป็น null)
    if (!session.mode) {
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
        mode: null,
        phase: "FREE_CHAT",
        currentQuestionNo: null,
        totalQuestions: 5,
        currentQuestion: null,
        answers: formattedAnswers,
        messages: formattedMessages,
      });
      return;
    }

    // เซสชันแบบใหม่
    const bounds = getOpeningBounds(session.mode);
    const opening =
      session.mode === "CHAT_ONLY"
        ? null
        : {
            turns: session.openingTurns ?? 0,
            min: bounds.min,
            max: bounds.max,
          };

    const currentPhase = session.phase || "FREE_CHAT";
    const scaleAnswersCount = session.answers.filter((a: any) => a.scaleKey !== null).length;
    const question =
      currentPhase === "SCALE"
        ? buildScaleQuestionPayload(scaleAnswersCount + 1, locale)
        : null;

    const result = await getSessionScaleResult(
      {
        id: session.id,
        userId: session.userId,
        topic: session.topic,
        mode: session.mode,
      },
      locale
    );

    let nextFollowUpDate: string | null = result ? result.nextFollowUpDate : null;
    if (!nextFollowUpDate && session.mode === "CHAT_ONLY" && session.topic) {
      const modeCheck = await determineSessionMode(userId, session.topic);
      nextFollowUpDate = modeCheck.nextFollowUpDate;
    }

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
      mode: session.mode,
      phase: currentPhase,
      opening,
      question,
      result,
      nextFollowUpDate,
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

// 6.3 POST /api/chat/sessions/:id/scale/start — เริ่มทำแบบวัด 10 ข้อ
export const startScale = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const locale: "th" | "en" = req.body?.locale === "en" ? "en" : "th";

    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }

    if (session.summary || session.phase !== "OFFER") {
      res.status(409).json({ error: "ไม่สามารถเริ่มแบบวัดได้ในสถานะปัจจุบัน" });
      return;
    }

    const question = buildScaleQuestionPayload(1, locale);
    if (!question) {
      res.status(500).json({ error: "ไม่พบข้อมูลแบบวัด" });
      return;
    }

    await prisma.chatSession.update({
      where: { id: session.id },
      data: { phase: "SCALE" },
    });

    const botText =
      locale === "en"
        ? `Let's get started. Please choose the answer that best describes how you feel.\nItem 1/10 — ${question.leadIn}\n${question.text}`
        : `เริ่มกันเลยนะคะ เลือกคำตอบที่ใกล้เคียงกับคุณที่สุดได้เลยค่ะ\nข้อ 1/10 — ${question.leadIn}\n${question.text}`;

    const botMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "BOT",
        message: botText,
      },
    });

    res.status(200).json({
      phase: "SCALE",
      question,
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
    console.error("Error in startScale:", error);
    res.status(500).json({ error: "ไม่สามารถเริ่มแบบวัดได้" });
  }
};

// 6.4 POST /api/chat/sessions/:id/scale/decline — ขอคุยต่อยังไม่ทำแบบวัด
export const declineScale = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const locale: "th" | "en" = req.body?.locale === "en" ? "en" : "th";

    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }

    if (session.summary || session.phase !== "OFFER") {
      res.status(409).json({ error: "ไม่อยู่ในช่วงชวนทำแบบวัด" });
      return;
    }

    const bounds = getOpeningBounds(session.mode);
    const turns = session.openingTurns ?? 0;
    const nextPhase = turns < bounds.max ? "OPENING" : "FREE_CHAT";

    const botText =
      turns < bounds.max
        ? locale === "en"
          ? "Of course, feel free to keep sharing at your own pace."
          : "ได้เลยค่ะ เล่าต่อได้ตามสบายนะคะ"
        : locale === "en"
          ? "Of course, let's continue chatting comfortably. Whenever you're ready to take the assessment, you can always start a new session in this topic."
          : "ได้เลยค่ะ คุยกันต่อได้ตามสบายนะคะ ถ้าวันไหนพร้อมทำแบบวัด เริ่มคุยหัวข้อนี้ใหม่ได้เสมอค่ะ";

    await prisma.chatSession.update({
      where: { id: session.id },
      data: { phase: nextPhase },
    });

    const botMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "BOT",
        message: botText,
      },
    });

    res.status(200).json({
      phase: nextPhase,
      opening: {
        turns,
        min: bounds.min,
        max: bounds.max,
      },
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
    console.error("Error in declineScale:", error);
    res.status(500).json({ error: "ไม่สามารถดำเนินการต่อได้" });
  }
};

// 6.5 POST /api/chat/sessions/:id/scale/answer — ตอบแบบวัดทีละข้อ (1..10)
export const answerScale = async (req: AuthRequest, res: Response): Promise<void> => {
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

    const { score, locale: rawLocale } = req.body;
    const locale: "th" | "en" = rawLocale === "en" ? "en" : "th";

    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      res.status(404).json({ error: "ไม่พบเซสชันการสนทนานี้" });
      return;
    }

    if (session.summary || session.phase !== "SCALE") {
      res.status(409).json({ error: "ไม่อยู่ในช่วงทำแบบวัด" });
      return;
    }

    const answeredCount = await prisma.chatAnswer.count({
      where: {
        sessionId: session.id,
        scaleKey: { not: null },
      },
    });

    const currentGlobalNo = answeredCount + 1;
    const itemInfo = getScaleItemByGlobalNo(currentGlobalNo);
    const currentPayload = buildScaleQuestionPayload(currentGlobalNo, locale);

    if (!itemInfo || !currentPayload) {
      res.status(400).json({ error: "ตอบแบบวัดครบทุกข้อแล้ว" });
      return;
    }

    const isValidScore =
      typeof score === "number" &&
      Number.isInteger(score) &&
      itemInfo.scale.options.some((opt) => opt.score === score);

    if (!isValidScore) {
      res.status(400).json({ error: "คะแนนที่เลือกไม่ถูกต้องสำหรับข้อนี้" });
      return;
    }

    const selectedOption = currentPayload.options.find((opt) => opt.score === score)!;

    await prisma.chatAnswer.upsert({
      where: {
        sessionId_questionNo: {
          sessionId: session.id,
          questionNo: currentGlobalNo,
        },
      },
      update: {
        questionText: currentPayload.text,
        answerText: selectedOption.label,
        score,
        scaleKey: currentPayload.scaleKey,
      },
      create: {
        sessionId: session.id,
        questionNo: currentGlobalNo,
        questionText: currentPayload.text,
        answerText: selectedOption.label,
        score,
        scaleKey: currentPayload.scaleKey,
      },
    });

    const userMsg = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "USER",
        message: selectedOption.label,
      },
    });

    if (currentGlobalNo < 10) {
      const nextGlobalNo = currentGlobalNo + 1;
      const nextQuestion = buildScaleQuestionPayload(nextGlobalNo, locale)!;

      let botText =
        locale === "en"
          ? `Item ${nextGlobalNo}/10 — ${nextQuestion.leadIn}\n${nextQuestion.text}`
          : `ข้อ ${nextGlobalNo}/10 — ${nextQuestion.leadIn}\n${nextQuestion.text}`;

      if (nextGlobalNo === 6) {
        botText =
          locale === "en"
            ? `Next are 5 more items about your overall well-being.\n${botText}`
            : `ต่อไปเป็นอีก 5 ข้อเกี่ยวกับความรู้สึกโดยรวมนะคะ\n${botText}`;
      }

      const botMsg = await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          sender: "BOT",
          message: botText,
        },
      });

      res.status(200).json({
        phase: "SCALE",
        question: nextQuestion,
        messages: [
          {
            id: userMsg.id,
            sender: userMsg.sender,
            text: userMsg.message,
            timestamp: userMsg.createdAt,
          },
          {
            id: botMsg.id,
            sender: botMsg.sender,
            text: botMsg.message,
            timestamp: botMsg.createdAt,
          },
        ],
      });
      return;
    }

    // ตอบครบ 10 ข้อ -> คำนวณผลและบันทึกลง ScaleResult
    const result = await finalizeScales(
      {
        id: session.id,
        topic: session.topic,
        mode: session.mode,
      },
      userId,
      locale
    );

    await prisma.chatSession.update({
      where: { id: session.id },
      data: { phase: "FREE_CHAT" },
    });

    let summaryBotText = "";
    if (locale === "en") {
      summaryBotText = `Thank you for answering all items. Today's results: your stress level is "${result.st5.label}" and your well-being is "${result.who5.label}".`;
      if (result.comparison) {
        const st5Word =
          result.comparison.st5 === "IMPROVED"
            ? "decreased"
            : result.comparison.st5 === "WORSE"
              ? "increased"
              : "stayed the same";
        const who5Word =
          result.comparison.who5 === "IMPROVED"
            ? "improved"
            : result.comparison.who5 === "WORSE"
              ? "declined"
              : "stayed the same";
        summaryBotText += ` Compared to last time, your stress has ${st5Word} and your well-being has ${who5Word}.`;
      }
      summaryBotText += " Is there anything in particular you'd like to talk more about?";
    } else {
      summaryBotText = `ขอบคุณที่ตอบครบทุกข้อนะคะ ผลวันนี้: ความเครียดอยู่ที่ "${result.st5.label}" และสุขภาวะอยู่ที่ "${result.who5.label}"`;
      if (result.comparison) {
        const st5Word =
          result.comparison.st5 === "IMPROVED"
            ? "ลดลง"
            : result.comparison.st5 === "WORSE"
              ? "เพิ่มขึ้น"
              : "เท่าเดิม";
        const who5Word =
          result.comparison.who5 === "IMPROVED"
            ? "ดีขึ้น"
            : result.comparison.who5 === "WORSE"
              ? "แย่ลง"
              : "เท่าเดิม";
        summaryBotText += ` เมื่อเทียบกับครั้งก่อน ความเครียด${st5Word} และสุขภาวะ${who5Word}`;
      }
      summaryBotText += " อยากคุยต่อเรื่องไหนเป็นพิเศษไหมคะ";
    }

    const botMsg = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: "BOT",
        message: summaryBotText,
      },
    });

    res.status(200).json({
      phase: "FREE_CHAT",
      result,
      messages: [
        {
          id: userMsg.id,
          sender: userMsg.sender,
          text: userMsg.message,
          timestamp: userMsg.createdAt,
        },
        {
          id: botMsg.id,
          sender: botMsg.sender,
          text: botMsg.message,
          timestamp: botMsg.createdAt,
        },
      ],
    });
  } catch (error) {
    console.error("Error in answerScale:", error);
    res.status(500).json({ error: "ไม่สามารถบันทึกคำตอบแบบวัดได้" });
  }
};

// 6.7 POST /api/chat/sessions/:id/end — จบ session ให้ Groq สรุป+ให้คำแนะนำตามหัวข้อ บันทึกลง summary
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

    // ดึงผลแบบวัด (ถ้ามี — กรณีจบตอน phase = SCALE ที่ตอบไม่ครบ จะไม่มี ScaleResult และไม่ต้องสร้าง)
    const result = await getSessionScaleResult(
      {
        id: session.id,
        userId: session.userId,
        topic: session.topic,
        mode: session.mode,
      },
      locale
    );

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
            result,
            feedbackRating: session.feedbackRating ?? null,
          });
          return;
        }
      }
    }

    const scaleContext = result ? buildScaleContextForAI(result, locale) : undefined;

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
      locale,
      scaleContext
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
      result,
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

// DELETE /api/chat/sessions/:id — ลบ session (cascade ลบ ChatMessage, ChatAnswer, ScaleResult)
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

const buildCrisisFallbackAIResponse = (locale: "th" | "en"): AIResponse => ({
  reply_message:
    locale === "en"
      ? "I can hear how heavy and painful things feel for you right now, and I don't want you to go through this alone."
      : "น้องมุกห่วงใยรับรู้ว่าตอนนี้คุณกำลังเผชิญความรู้สึกที่หนักและเจ็บปวดมากจริง ๆ และไม่อยากให้คุณต้องผ่านช่วงเวลานี้ตามลำพังนะคะ",
  assessment_status: "IN_PROGRESS",
  severity_level: "SEVERE",
  suggested_category: "STRESS",
  ready_for_scale: false,
});

const appendCrisisHotlineNotice = (replyText: string, locale: "th" | "en"): string => {
  const sanitized = (replyText || "").trim();
  const hotlineLine =
    locale === "en"
      ? "If you need urgent support, please contact the Mental Health Hotline at 1323 (toll-free, 24/7)."
      : "หากต้องการความช่วยเหลือเร่งด่วน ติดต่อสายด่วนสุขภาพจิต 1323 (โทรฟรี ตลอด 24 ชั่วโมง)";
  return `${sanitized}\n\n${hotlineLine}`;
};

// 6.2 POST /api/chat — ส่งข้อความสนทนา (รองรับทั้ง OPENING, OFFER, FREE_CHAT และเซสชันแบบเดิม)
export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    const {
      message,
      sessionId: rawSessionId,
      topic: rawTopic,
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
        const resolvedTopic = isValidTopic(rawTopic) ? rawTopic : null;
        session = await prisma.chatSession.create({
          data: {
            userId,
            topic: resolvedTopic,
          },
          include: { answers: { orderBy: { questionNo: "asc" } } },
        });
      }
    }

    if (session.summary) {
      res.status(400).json({ error: "การสนทนานี้สิ้นสุดลงแล้ว กรุณาเริ่มบทสนทนาใหม่" });
      return;
    }

    // ช่วงแบบวัดรับเฉพาะปุ่ม: ตอบ 409 และไม่บันทึกข้อความ
    if (session.phase === "SCALE") {
      res.status(409).json({ error: "SCALE_IN_PROGRESS" });
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

    const chatHistory = await prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    const orderedHistory = chatHistory.reverse();

    // =========================================================
    // กรณีที่ 1: เซสชันแบบเดิม (mode เป็น null)
    // =========================================================
    if (!session.mode) {
      const existingAnswers: any[] = Array.isArray(session.answers) ? session.answers : [];
      const aiMessages: { role: "system" | "user" | "assistant"; content: string }[] = [];

      if (session.topic && isValidTopic(session.topic) && existingAnswers.length > 0) {
        const topicConfig = getTopicConfig(session.topic);
        const contextLines = existingAnswers
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

      for (const msg of orderedHistory) {
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
          aiResponse = buildCrisisFallbackAIResponse(locale);
        } else {
          throw groqErr;
        }
      }

      if (crisisDetected) {
        aiResponse.severity_level = "SEVERE";
        aiResponse.reply_message = appendCrisisHotlineNotice(aiResponse.reply_message, locale);
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
        mode: null,
        phase: "FREE_CHAT",
        crisis: crisisDetected,
        assessment_status: "IN_PROGRESS",
        severity_level: aiResponse.severity_level,
      });
      return;
    }

    // =========================================================
    // กรณีที่ 2: เซสชันแบบใหม่ — ช่วง OPENING หรือ OFFER
    // =========================================================
    const bounds = getOpeningBounds(session.mode);
    let currentPhase = session.phase || "FREE_CHAT";

    if (currentPhase === "OPENING" || currentPhase === "OFFER") {
      // 2.1 หากตรวจพบคำเสี่ยงวิกฤต -> ตอบกรณีวิกฤต, ตั้ง overallMood = SEVERE, phase = FREE_CHAT, crisis = true
      if (crisisDetected) {
        const aiMessages = orderedHistory.map((msg: any) => ({
          role: (String(msg.sender) === "USER" ? "user" : "assistant") as "user" | "assistant",
          content: msg.message,
        }));

        let aiResponse: AIResponse;
        try {
          aiResponse = await generateChatResponse(aiMessages, session.topic, locale);
        } catch {
          aiResponse = buildCrisisFallbackAIResponse(locale);
        }
        aiResponse.severity_level = "SEVERE";
        aiResponse.reply_message = appendCrisisHotlineNotice(aiResponse.reply_message, locale);

        const savedBotMsg = await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            sender: "BOT",
            message: aiResponse.reply_message,
          },
        });

        await prisma.chatSession.update({
          where: { id: session.id },
          data: {
            overallMood: "SEVERE",
            phase: "FREE_CHAT",
          },
        });

        res.status(200).json({
          reply: aiResponse.reply_message,
          userMessageId: savedUserMsg.id,
          botMessageId: savedBotMsg.id,
          sessionId: session.id,
          mode: session.mode,
          phase: "FREE_CHAT",
          opening: {
            turns: session.openingTurns ?? 0,
            min: bounds.min,
            max: bounds.max,
          },
          offerScale: false,
          crisis: true,
          assessment_status: "IN_PROGRESS",
          severity_level: "SEVERE",
        });
        return;
      }

      const newTurns = (session.openingTurns ?? 0) + 1;

      // 2.2 กรณี openingTurns > max (เผื่อหลุดมา) -> ตั้งเป็น FREE_CHAT
      if (newTurns > bounds.max) {
        await prisma.chatSession.update({
          where: { id: session.id },
          data: { phase: "FREE_CHAT" },
        });
        currentPhase = "FREE_CHAT";
      } else {
        // 2.3 เรียก AI ด้วย buildOpeningInstruction
        const aiMessages = orderedHistory.map((msg: any) => ({
          role: (String(msg.sender) === "USER" ? "user" : "assistant") as "user" | "assistant",
          content: msg.message,
        }));

        const extraSystem = buildOpeningInstruction(session.mode, locale);
        const aiResponse = await generateChatResponse(
          aiMessages,
          session.topic,
          locale,
          extraSystem
        );

        const shouldOffer =
          newTurns >= bounds.max ||
          (newTurns >= bounds.min && aiResponse.ready_for_scale === true);

        const offerPromptText =
          locale === "en"
            ? "Thank you for sharing with me. Whenever you're ready, let's try a short 10-item check-in (the Department of Mental Health's ST-5 Stress Test and the World Health Organization's WHO-5 Well-Being Index) to see how much this has been affecting you so Nong Mook can give more tailored suggestions."
            : "ขอบคุณที่เล่าให้ฟังนะคะ ถ้าพร้อม เราลองทำแบบวัดสั้น ๆ 10 ข้อ (แบบประเมินความเครียด ST-5 ของกรมสุขภาพจิต และดัชนีสุขภาวะ WHO-5 ขององค์การอนามัยโลก) เพื่อดูว่าเรื่องนี้กระทบคุณแค่ไหน แล้วน้องมุกจะแนะนำได้ตรงขึ้นค่ะ";

        const replyText = shouldOffer
          ? `${aiResponse.reply_message}\n\n${offerPromptText}`
          : aiResponse.reply_message;
        const nextPhase = shouldOffer ? "OFFER" : "OPENING";

        const savedBotMsg = await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            sender: "BOT",
            message: replyText,
          },
        });

        await prisma.chatSession.update({
          where: { id: session.id },
          data: {
            openingTurns: newTurns,
            phase: nextPhase,
            ...(aiResponse.severity_level && aiResponse.severity_level !== "PENDING"
              ? { overallMood: aiResponse.severity_level }
              : {}),
          },
        });

        res.status(200).json({
          reply: replyText,
          userMessageId: savedUserMsg.id,
          botMessageId: savedBotMsg.id,
          sessionId: session.id,
          mode: session.mode,
          phase: nextPhase,
          opening: {
            turns: newTurns,
            min: bounds.min,
            max: bounds.max,
          },
          offerScale: shouldOffer,
          crisis: false,
          assessment_status: "IN_PROGRESS",
          severity_level: aiResponse.severity_level,
        });
        return;
      }
    }

    // =========================================================
    // กรณีที่ 3: เซสชันแบบใหม่ — ช่วง FREE_CHAT
    // =========================================================
    const aiMessages: { role: "system" | "user" | "assistant"; content: string }[] = [];

    const scaleResult = await getSessionScaleResult(
      {
        id: session.id,
        userId: session.userId,
        topic: session.topic,
        mode: session.mode,
      },
      locale
    );

    if (scaleResult) {
      const topicConfig = getTopicConfig(session.topic);
      const scaleContext = buildScaleContextForAI(scaleResult, locale);
      aiMessages.push({
        role: "user",
        content:
          locale === "en"
            ? `[User Assessment Context — Topic: ${topicConfig.key}]\n${scaleContext}\n\nPlease listen empathetically, reflect the user's feelings warmly on this topic, and continue the conversation naturally in English only (do not mention raw numeric scores).`
            : `[บริบทผลแบบวัดของผู้ใช้ — หัวข้อ: ${topicConfig.labelTh}]\n${scaleContext}\n\nกรุณารับฟัง สะท้อนความรู้สึกอย่างอบอุ่นสอดคล้องกับผลแบบวัดและหัวข้อนี้ และชวนพูดคุยต่ออย่างเป็นธรรมชาติ (ห้ามแสดงตัวเลขคะแนนดิบ)`,
      });
      aiMessages.push({
        role: "assistant",
        content: JSON.stringify({
          reply_message:
            locale === "en"
              ? "Understood. Nong Mook Huang Yai is ready to listen and support you warmly."
              : "รับทราบค่ะ น้องมุกห่วงใยพร้อมรับฟังและดูแลใจอย่างอบอุ่นค่ะ",
          assessment_status: "IN_PROGRESS",
          severity_level: "PENDING",
          suggested_category: "NONE",
        }),
      });
    }

    for (const msg of orderedHistory) {
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
        aiResponse = buildCrisisFallbackAIResponse(locale);
      } else {
        throw groqErr;
      }
    }

    if (crisisDetected) {
      aiResponse.severity_level = "SEVERE";
      aiResponse.reply_message = appendCrisisHotlineNotice(aiResponse.reply_message, locale);
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
      mode: session.mode,
      phase: "FREE_CHAT",
      crisis: crisisDetected,
      assessment_status: "IN_PROGRESS",
      severity_level: aiResponse.severity_level,
    });
  } catch (error) {
    console.error("Chat API Error Details:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเชื่อมต่อแชทบอท" });
  }
};
