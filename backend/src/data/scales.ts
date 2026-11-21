export type ScaleKey = "ST5" | "WHO5";

export interface ScaleOption {
  score: number;
  labelTh: string;
  labelEn: string;
}

export interface ScaleItem {
  itemNo: number;
  textTh: string;
  textEn: string;
}

export interface ScaleDefinition {
  key: ScaleKey;
  nameTh: string;
  nameEn: string;
  instructionTh: string;
  instructionEn: string;
  items: ScaleItem[];
  options: ScaleOption[]; // เรียงตามที่แสดงบนปุ่ม
  maxScore: number;
  source: string; // แหล่งอ้างอิง ใช้แสดง/ใส่รายงาน
  enTranslationNote?: string;
}

export const ST5_SCALE: ScaleDefinition = {
  key: "ST5",
  nameTh: "แบบประเมินความเครียด (ST-5) กรมสุขภาพจิต",
  nameEn: "Stress Test (ST-5), Department of Mental Health, Thailand",
  instructionTh: "อาการหรือความรู้สึกที่เกิดขึ้นในระยะ 2-4 สัปดาห์ที่ผ่านมา",
  instructionEn: "How often have you had the following in the past 2–4 weeks?",
  items: [
    {
      itemNo: 1,
      textTh: "มีปัญหาการนอน นอนไม่หลับหรือนอนมาก",
      textEn: "Sleep problems (trouble sleeping or sleeping too much)",
    },
    {
      itemNo: 2,
      textTh: "มีสมาธิน้อยลง",
      textEn: "Reduced concentration",
    },
    {
      itemNo: 3,
      textTh: "หงุดหงิด / กระวนกระวาย / ว้าวุ่นใจ",
      textEn: "Irritable / restless / agitated",
    },
    {
      itemNo: 4,
      textTh: "รู้สึกเบื่อ เซ็ง",
      textEn: "Feeling bored or fed up",
    },
    {
      itemNo: 5,
      textTh: "ไม่อยากพบปะผู้คน",
      textEn: "Not wanting to meet people",
    },
  ],
  options: [
    { score: 0, labelTh: "แทบไม่มี", labelEn: "Rarely or never" },
    { score: 1, labelTh: "เป็นบางครั้ง", labelEn: "Sometimes" },
    { score: 2, labelTh: "บ่อยครั้ง", labelEn: "Often" },
    { score: 3, labelTh: "เป็นประจำ", labelEn: "Regularly" },
  ],
  maxScore: 15,
  source: "แบบประเมินความเครียด ST-5 (Srithanya Stress Test) โรงพยาบาลศรีธัญญา กรมสุขภาพจิต",
  enTranslationNote: "English wording is a team translation, not a validated version.",
};

export const WHO5_SCALE: ScaleDefinition = {
  key: "WHO5",
  nameTh: "ดรรชนีชี้วัดสุขภาวะขององค์การอนามัยโลก (WHO-5)",
  nameEn: "WHO-5 Well-Being Index",
  instructionTh: "ภายใน 2 สัปดาห์ที่ผ่านมา",
  instructionEn: "Over the last two weeks",
  items: [
    {
      itemNo: 1,
      textTh: "ฉันรู้สึกเบิกบานและอารมณ์ดี",
      textEn: "I have felt cheerful and in good spirits",
    },
    {
      itemNo: 2,
      textTh: "ฉันรู้สึกสงบและผ่อนคลาย",
      textEn: "I have felt calm and relaxed",
    },
    {
      itemNo: 3,
      textTh: "ฉันรู้สึกกระฉับกระเฉงและมีพลัง",
      textEn: "I have felt active and vigorous",
    },
    {
      itemNo: 4,
      textTh: "ฉันตื่นขึ้นมาด้วยความรู้สึกสดชื่นและได้พักเพียงพอ",
      textEn: "I woke up feeling fresh and rested",
    },
    {
      itemNo: 5,
      textTh: "ชีวิตประจำวันของฉันเต็มไปด้วยสิ่งที่น่าสนใจ",
      textEn: "My daily life has been filled with things that interest me",
    },
  ],
  options: [
    { score: 5, labelTh: "ตลอดเวลา", labelEn: "All of the time" },
    { score: 4, labelTh: "เป็นส่วนใหญ่", labelEn: "Most of the time" },
    { score: 3, labelTh: "มากกว่าครึ่งหนึ่ง", labelEn: "More than half of the time" },
    { score: 2, labelTh: "น้อยกว่าครึ่งหนึ่ง", labelEn: "Less than half of the time" },
    { score: 1, labelTh: "มีบ้างบางเวลา", labelEn: "Some of the time" },
    { score: 0, labelTh: "ไม่เคยเลย", labelEn: "At no time" },
  ],
  maxScore: 25,
  source: "WHO-5 Well-Being Index, World Health Organization (Thai translation published by WHO, CC BY-NC-SA 3.0)",
};

export const SCALES: Record<ScaleKey, ScaleDefinition> = {
  ST5: ST5_SCALE,
  WHO5: WHO5_SCALE,
};

export const SCALE_SEQUENCE: ScaleKey[] = ["ST5", "WHO5"];
export const TOTAL_SCALE_ITEMS = 10;

export const FOLLOW_UP_DAYS = 14;
export const OPENING_LIMITS = {
  FIRST: { min: 2, max: 4 },
  FOLLOW_UP: { min: 1, max: 2 },
} as const;

export type ST5Level = "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";
export type WHO5Level = "GOOD" | "POOR";

export const ST5_LEVEL_ORDER: ST5Level[] = ["LOW", "MODERATE", "HIGH", "VERY_HIGH"];

export const getScaleItemByGlobalNo = (
  globalNo: number
): { scale: ScaleDefinition; item: ScaleItem; globalNo: number; total: 10 } | null => {
  if (!Number.isInteger(globalNo) || globalNo < 1 || globalNo > TOTAL_SCALE_ITEMS) {
    return null;
  }

  let offset = globalNo;
  for (const scaleKey of SCALE_SEQUENCE) {
    const scale = SCALES[scaleKey];
    if (offset <= scale.items.length) {
      const item = scale.items[offset - 1];
      return {
        scale,
        item,
        globalNo,
        total: 10,
      };
    }
    offset -= scale.items.length;
  }

  return null;
};

export interface ST5Interpretation {
  total: number;
  max: 15;
  level: ST5Level;
  labelTh: string;
  labelEn: string;
}

export const interpretST5 = (total: number): ST5Interpretation => {
  if (total <= 4) {
    return {
      total,
      max: 15,
      level: "LOW",
      labelTh: "เครียดน้อย",
      labelEn: "Low stress",
    };
  }
  if (total <= 7) {
    return {
      total,
      max: 15,
      level: "MODERATE",
      labelTh: "เครียดปานกลาง",
      labelEn: "Moderate stress",
    };
  }
  if (total <= 9) {
    return {
      total,
      max: 15,
      level: "HIGH",
      labelTh: "เครียดมาก",
      labelEn: "High stress",
    };
  }
  return {
    total,
    max: 15,
    level: "VERY_HIGH",
    labelTh: "เครียดมากที่สุด",
    labelEn: "Very high stress",
  };
};

export interface WHO5Interpretation {
  raw: number;
  max: 25;
  percent: number;
  level: WHO5Level;
  labelTh: string;
  labelEn: string;
}

export const interpretWHO5 = (raw: number): WHO5Interpretation => {
  const percent = raw * 4;
  if (raw < 13) {
    return {
      raw,
      max: 25,
      percent,
      level: "POOR",
      labelTh: "สุขภาวะไม่ดี",
      labelEn: "Poor well-being",
    };
  }
  return {
    raw,
    max: 25,
    percent,
    level: "GOOD",
    labelTh: "สุขภาวะดี",
    labelEn: "Good well-being",
  };
};
