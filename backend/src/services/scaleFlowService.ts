import prisma from "../prismaClient";
import {
  FOLLOW_UP_DAYS,
  getScaleItemByGlobalNo,
  interpretST5,
  interpretWHO5,
  ScaleKey,
  ST5_LEVEL_ORDER,
  ST5Level,
  WHO5Level,
} from "../data/scales";
import {
  ACTIVITIES,
  ActivitySource,
  getActivityByKey,
  RecommendedActivity,
} from "../data/activities";
import type { ChatTopicKey } from "./groqService";

export type SessionMode = "FIRST" | "FOLLOW_UP" | "CHAT_ONLY";
export type ScaleTrend = "IMPROVED" | "SAME" | "WORSE";

export interface LastScaleResultSummary {
  sessionId: number;
  date: string;
  st5: {
    total: number;
    level: ST5Level;
  };
  who5: {
    raw: number;
    percent: number;
    level: WHO5Level;
  };
}

export interface DetermineSessionModeResult {
  mode: SessionMode;
  lastResult: LastScaleResultSummary | null;
  nextFollowUpDate: string | null;
}

export interface ScaleQuestionPayload {
  globalNo: number;
  total: 10;
  scaleKey: ScaleKey;
  scaleName: string;
  instruction: string;
  itemNo: number;
  text: string;
  options: { score: number; label: string }[];
}

export interface ScaleComparisonResult {
  previousDate: string;
  st5: ScaleTrend;
  who5: ScaleTrend;
}

export interface AssignedActivityOutput {
  id: number;
  userId: number;
  sessionId: number | null;
  activityKey: string;
  topic: string | null;
  assignedAt: Date;
  expiresAt: Date;
  deletedAt: Date | null;
  nameTh: string;
  nameEn: string;
  howToTh: string;
  howToEn: string;
  source: ActivitySource | null;
}

export interface ScaleEvaluationResult {
  st5: {
    total: number;
    max: 15;
    level: ST5Level;
    label: string;
  };
  who5: {
    raw: number;
    percent: number;
    level: WHO5Level;
    label: string;
  };
  comparison: ScaleComparisonResult | null;
  referral: boolean;
  nextFollowUpDate: string;
  assignedActivities?: AssignedActivityOutput[];
}

const FOLLOW_UP_MS = FOLLOW_UP_DAYS * 24 * 60 * 60 * 1000;

const enrichUserActivity = (row: any): AssignedActivityOutput => {
  const catalog = getActivityByKey(row.activityKey);
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
  };
};

const pickRandomSubset = <T>(items: T[], maxCount: number): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(maxCount, copy.length));
};

export const assignActivities = async (
  userId: number,
  sessionId: number,
  topic: string,
  st5Level: ST5Level,
  who5Level: WHO5Level
): Promise<AssignedActivityOutput[]> => {
  const matched = ACTIVITIES.filter((act: RecommendedActivity) => {
    const topicMatch =
      act.suggestedTopics === "all" ||
      act.suggestedTopics.includes(topic as ChatTopicKey);
    const levelMatch =
      act.suggestedLevels.includes(st5Level) ||
      act.suggestedLevels.includes(who5Level);
    return topicMatch && levelMatch;
  });

  const pool =
    matched.length > 0
      ? matched
      : ACTIVITIES.filter((act: RecommendedActivity) => act.suggestedTopics === "all");

  // สุ่มเลือก 1-2 รายการ (เลือก 2 รายการหากมีตั้งแต่ 2 รายการขึ้นไป หรือ 1 รายการหากมีรายการเดียว)
  const countToPick = pool.length >= 2 ? 2 : 1;
  const selected = pickRandomSubset(pool, countToPick);

  const now = new Date();
  const expiresAt = new Date(now.getTime() + FOLLOW_UP_MS);

  const createdRows: AssignedActivityOutput[] = [];
  for (const act of selected) {
    const row = await prisma.userActivity.create({
      data: {
        userId,
        sessionId,
        activityKey: act.key,
        topic,
        assignedAt: now,
        expiresAt,
      },
    });
    createdRows.push(enrichUserActivity(row));
  }

  return createdRows;
};

/**
 * หาผลแบบวัดครั้งล่าสุดของ userId ในหัวข้อเดียวกัน (ไม่นับ excludeSessionId ถ้าระบุ)
 */
const findPreviousScaleSummary = async (
  userId: number,
  topic: string,
  excludeSessionId?: number,
  beforeDate?: Date
): Promise<{
  summary: LastScaleResultSummary;
  createdAt: Date;
} | null> => {
  const latestWho5 = await prisma.scaleResult.findFirst({
    where: {
      userId,
      topic,
      scaleKey: "WHO5",
      ...(excludeSessionId !== undefined ? { sessionId: { not: excludeSessionId } } : {}),
      ...(beforeDate !== undefined ? { createdAt: { lt: beforeDate } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  if (!latestWho5) {
    return null;
  }

  const matchingSt5 = await prisma.scaleResult.findFirst({
    where: {
      userId,
      topic,
      scaleKey: "ST5",
      sessionId: latestWho5.sessionId,
    },
    orderBy: { createdAt: "desc" },
  });

  const st5Interp = interpretST5(matchingSt5 ? matchingSt5.totalScore : 0);
  const who5Interp = interpretWHO5(latestWho5.totalScore);

  return {
    createdAt: latestWho5.createdAt,
    summary: {
      sessionId: latestWho5.sessionId,
      date: latestWho5.createdAt.toISOString(),
      st5: {
        total: st5Interp.total,
        level: st5Interp.level,
      },
      who5: {
        raw: who5Interp.raw,
        percent: who5Interp.percent,
        level: who5Interp.level,
      },
    },
  };
};

export const determineSessionMode = async (
  userId: number,
  topic: string
): Promise<DetermineSessionModeResult> => {
  const prev = await findPreviousScaleSummary(userId, topic);
  if (!prev) {
    return {
      mode: "FIRST",
      lastResult: null,
      nextFollowUpDate: null,
    };
  }

  const elapsedMs = Date.now() - prev.createdAt.getTime();
  if (elapsedMs >= FOLLOW_UP_MS) {
    return {
      mode: "FOLLOW_UP",
      lastResult: prev.summary,
      nextFollowUpDate: null,
    };
  }

  const nextDate = new Date(prev.createdAt.getTime() + FOLLOW_UP_MS);
  return {
    mode: "CHAT_ONLY",
    lastResult: prev.summary,
    nextFollowUpDate: nextDate.toISOString(),
  };
};

export const buildScaleQuestionPayload = (
  globalNo: number,
  locale: "th" | "en" = "th"
): ScaleQuestionPayload | null => {
  const entry = getScaleItemByGlobalNo(globalNo);
  if (!entry) return null;

  const { scale, item } = entry;
  return {
    globalNo: entry.globalNo,
    total: 10,
    scaleKey: scale.key,
    scaleName: locale === "en" ? scale.nameEn : scale.nameTh,
    instruction: locale === "en" ? scale.instructionEn : scale.instructionTh,
    itemNo: item.itemNo,
    text: locale === "en" ? item.textEn : item.textTh,
    options: scale.options.map((opt) => ({
      score: opt.score,
      label: locale === "en" ? opt.labelEn : opt.labelTh,
    })),
  };
};

const computeComparison = (
  st5Level: ST5Level,
  who5Percent: number,
  prev: LastScaleResultSummary
): ScaleComparisonResult => {
  const prevSt5Idx = ST5_LEVEL_ORDER.indexOf(prev.st5.level);
  const currSt5Idx = ST5_LEVEL_ORDER.indexOf(st5Level);

  let st5Trend: ScaleTrend = "SAME";
  if (currSt5Idx < prevSt5Idx) {
    st5Trend = "IMPROVED";
  } else if (currSt5Idx > prevSt5Idx) {
    st5Trend = "WORSE";
  }

  const percentDiff = who5Percent - prev.who5.percent;
  let who5Trend: ScaleTrend = "SAME";
  if (percentDiff >= 10) {
    who5Trend = "IMPROVED";
  } else if (percentDiff <= -10) {
    who5Trend = "WORSE";
  }

  return {
    previousDate: prev.date,
    st5: st5Trend,
    who5: who5Trend,
  };
};

const buildEvaluationOutput = (
  st5Total: number,
  who5Raw: number,
  baseDate: Date,
  locale: "th" | "en",
  prevSummary: LastScaleResultSummary | null,
  assignedActivities?: AssignedActivityOutput[]
): ScaleEvaluationResult => {
  const st5Interp = interpretST5(st5Total);
  const who5Interp = interpretWHO5(who5Raw);

  const comparison = prevSummary
    ? computeComparison(st5Interp.level, who5Interp.percent, prevSummary)
    : null;

  const referral =
    st5Interp.total >= 10 ||
    who5Interp.raw < 13 ||
    comparison?.st5 === "WORSE" ||
    comparison?.who5 === "WORSE";

  const nextFollowUpDate = new Date(baseDate.getTime() + FOLLOW_UP_MS).toISOString();

  return {
    st5: {
      total: st5Interp.total,
      max: 15,
      level: st5Interp.level,
      label: locale === "en" ? st5Interp.labelEn : st5Interp.labelTh,
    },
    who5: {
      raw: who5Interp.raw,
      percent: who5Interp.percent,
      level: who5Interp.level,
      label: locale === "en" ? who5Interp.labelEn : who5Interp.labelTh,
    },
    comparison,
    referral,
    nextFollowUpDate,
    ...(assignedActivities !== undefined ? { assignedActivities } : {}),
  };
};

export const finalizeScales = async (
  session: { id: number; topic: string | null; mode: string | null },
  userId: number,
  locale: "th" | "en" = "th"
): Promise<ScaleEvaluationResult> => {
  const topic = session.topic || "self";

  // ดึงผลครั้งก่อนไว้ก่อนบันทึกผลรอบใหม่ (สำหรับโหมด FOLLOW_UP)
  const prevRecord =
    session.mode === "FOLLOW_UP"
      ? await findPreviousScaleSummary(userId, topic, session.id)
      : null;

  const scaleAnswers = await prisma.chatAnswer.findMany({
    where: {
      sessionId: session.id,
      scaleKey: { not: null },
    },
    orderBy: { questionNo: "asc" },
  });

  const st5Answers = scaleAnswers.filter((a: any) => a.scaleKey === "ST5");
  const who5Answers = scaleAnswers.filter((a: any) => a.scaleKey === "WHO5");

  const st5Total = st5Answers.reduce((sum: number, a: any) => sum + (a.score ?? 0), 0);
  const who5Raw = who5Answers.reduce((sum: number, a: any) => sum + (a.score ?? 0), 0);

  const st5Interp = interpretST5(st5Total);
  const who5Interp = interpretWHO5(who5Raw);

  // ลบ ScaleResult เดิมของเซสชันนี้ (ถ้ามีกรณีถูกเรียกซ้ำ) แล้วสร้างใหม่ 2 แถว
  await prisma.scaleResult.deleteMany({
    where: { sessionId: session.id },
  });

  const now = new Date();

  await prisma.scaleResult.createMany({
    data: [
      {
        userId,
        sessionId: session.id,
        topic,
        scaleKey: "ST5",
        totalScore: st5Interp.total,
        level: st5Interp.level,
        answers: st5Answers.map((a: any, idx: number) => ({
          itemNo: idx + 1,
          score: a.score ?? 0,
        })),
        createdAt: now,
      },
      {
        userId,
        sessionId: session.id,
        topic,
        scaleKey: "WHO5",
        totalScore: who5Interp.raw,
        level: who5Interp.level,
        answers: who5Answers.map((a: any, idx: number) => ({
          itemNo: idx + 1,
          score: a.score ?? 0,
        })),
        createdAt: now,
      },
    ],
  });

  // เลือกกิจกรรม "สิ่งเล็ก ๆ ที่ลองทำ" 1-2 รายการตามหัวข้อและระดับผลแบบวัด
  const assignedActivities = await assignActivities(
    userId,
    session.id,
    topic,
    st5Interp.level,
    who5Interp.level
  );

  return buildEvaluationOutput(
    st5Total,
    who5Raw,
    now,
    locale,
    prevRecord ? prevRecord.summary : null,
    assignedActivities
  );
};

/**
 * ดึงผล ScaleResult ของเซสชันที่มีอยู่แล้ว (สำหรับ getChatSessionById และ endChatSession)
 */
export const getSessionScaleResult = async (
  session: { id: number; userId: number; topic: string | null; mode: string | null },
  locale: "th" | "en" = "th"
): Promise<ScaleEvaluationResult | null> => {
  const rows = await prisma.scaleResult.findMany({
    where: { sessionId: session.id },
  });

  const st5Row = rows.find((r: any) => r.scaleKey === "ST5");
  const who5Row = rows.find((r: any) => r.scaleKey === "WHO5");
  if (!st5Row || !who5Row) {
    return null;
  }

  const topic = session.topic || who5Row.topic || "self";
  const prevRecord =
    session.mode === "FOLLOW_UP"
      ? await findPreviousScaleSummary(
          session.userId,
          topic,
          session.id,
          who5Row.createdAt
        )
      : null;

  const activityRows = await prisma.userActivity.findMany({
    where: {
      sessionId: session.id,
      userId: session.userId,
      deletedAt: null,
    },
    orderBy: { assignedAt: "asc" },
  });

  return buildEvaluationOutput(
    st5Row.totalScore,
    who5Row.totalScore,
    who5Row.createdAt,
    locale,
    prevRecord ? prevRecord.summary : null,
    activityRows.map(enrichUserActivity)
  );
};

export const buildScaleContextForAI = (
  result: ScaleEvaluationResult,
  locale: "th" | "en" = "th"
): string => {
  const st5Interp = interpretST5(result.st5.total);
  const who5Interp = interpretWHO5(result.who5.raw);

  if (locale === "en") {
    let text = `Assessment result: ST-5 stress level is ${st5Interp.labelEn}, WHO-5 well-being is ${who5Interp.labelEn}`;
    if (result.comparison) {
      const st5Word =
        result.comparison.st5 === "IMPROVED"
          ? "stress decreased"
          : result.comparison.st5 === "WORSE"
            ? "stress increased"
            : "stress stayed the same";
      const who5Word =
        result.comparison.who5 === "IMPROVED"
          ? "well-being improved"
          : result.comparison.who5 === "WORSE"
            ? "well-being declined"
            : "well-being stayed the same";
      text += `, compared to last time: ${st5Word}, ${who5Word}`;
    }
    return text;
  }

  let text = `ผลแบบวัด: ความเครียด ST-5 ระดับ${st5Interp.labelTh}, WHO-5 ${who5Interp.labelTh}`;
  if (result.comparison) {
    const st5Word =
      result.comparison.st5 === "IMPROVED"
        ? "ความเครียดลดลง"
        : result.comparison.st5 === "WORSE"
          ? "ความเครียดเพิ่มขึ้น"
          : "ความเครียดเท่าเดิม";
    const who5Word =
      result.comparison.who5 === "IMPROVED"
        ? "สุขภาวะดีขึ้น"
        : result.comparison.who5 === "WORSE"
          ? "สุขภาวะแย่ลง"
          : "สุขภาวะเท่าเดิม";
    text += `, เทียบครั้งก่อน: ${st5Word} และ${who5Word}`;
  }
  return text;
};
