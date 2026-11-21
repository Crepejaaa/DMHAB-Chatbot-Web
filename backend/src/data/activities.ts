/**
 * รายการกิจกรรมแนะนำ ("สิ่งเล็ก ๆ ที่ลองทำ" — ชื่อในโค้ด: รายการกิจกรรมแนะนำ)
 *
 * ⚠️ สถานะ: ร่างโดย Claude ตามที่ระบุไว้ใน
 * claude/แผนงาน-แชทบอทแบบวัดมาตรฐานและสิ่งเล็กๆที่ลองทำ.md (หัวข้อ "สิ่งเล็ก ๆ ที่ลองทำ")
 * ยังไม่ผ่านการตรวจจากทีม — ห้ามใช้งานจริงก่อนทีมตรวจเนื้อหาและยืนยันการจับคู่
 * suggestedTopics / suggestedLevels ของแต่ละข้อ
 *
 * แหล่งเนื้อหาหลัก 2 แหล่ง (สรุป/ถอดความใหม่ทั้งหมด ไม่ได้คัดลอกข้อความจากต้นฉบับ):
 * 1) WHO "Doing What Matters in Times of Stress: An Illustrated Guide" (2020)
 *    ISBN 978-92-4-000392-7, Licence: CC BY-NC-SA 3.0 IGO
 *    https://www.who.int/publications/i/item/9789240003927
 *    ใช้ 6 ทักษะหลักของคู่มือเป็นแกน: Grounding, Unhooking, Acting on your values,
 *    Making room, Engaging, Being kind
 * 2) กรมสุขภาพจิต กระทรวงสาธารณสุข — องค์ความรู้สุขภาพจิตสำหรับประชาชน
 *    (เทคนิคคลายเครียดทั่วไป: การหายใจ, การผ่อนคลายกล้ามเนื้อ, การทำกิจกรรมที่ชอบ ฯลฯ)
 *    https://dmh.go.th
 *
 * scaleKey/level อ้างตาม ScaleResult ใน schema.prisma:
 * - ST-5  : LOW | MODERATE | HIGH | VERY_HIGH  (ยิ่งสูง = เครียดมาก)
 * - WHO-5 : GOOD | POOR                        (POOR = สุขภาวะไม่ดี ตามเกณฑ์ WHO)
 */

import type { ChatTopicKey } from "../services/groqService";

export type ActivityScaleLevel = "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH" | "GOOD" | "POOR";

export interface ActivitySource {
  th: string;
  en: string;
  url: string;
}

export interface RecommendedActivity {
  /** คีย์ไม่ซ้ำ ใช้อ้างอิงใน UserActivity.activityKey */
  key: string;
  nameTh: string;
  nameEn: string;
  /** วิธีทำแบบย่อ ทำได้ภายในไม่กี่นาที เหมาะกับการติ๊กรายวัน */
  howToTh: string;
  howToEn: string;
  source: ActivitySource;
  /** หัวข้อที่เหมาะ (ร่าง — ทีมต้องตรวจ) ใช้ "all" ถ้าเหมาะกับทุกหัวข้อ */
  suggestedTopics: ChatTopicKey[] | "all";
  /** ระดับคะแนนที่เหมาะ (ร่าง — ทีมต้องตรวจ) */
  suggestedLevels: ActivityScaleLevel[];
}

const WHO_DWM: ActivitySource = {
  th: "WHO: Doing What Matters in Times of Stress (2020)",
  en: "WHO: Doing What Matters in Times of Stress (2020)",
  url: "https://www.who.int/publications/i/item/9789240003927",
};

const DMH_THAILAND: ActivitySource = {
  th: "กรมสุขภาพจิต กระทรวงสาธารณสุข — องค์ความรู้สุขภาพจิตสำหรับประชาชน",
  en: "Thailand Department of Mental Health — public mental health knowledge resources",
  url: "https://dmh.go.th",
};

export const ACTIVITIES: RecommendedActivity[] = [
  // ---------- จาก WHO Doing What Matters in Times of Stress ----------
  {
    key: "grounding_5senses",
    nameTh: "หยั่งรากกับปัจจุบัน (Grounding)",
    nameEn: "Grounding in the present moment",
    howToTh:
      "เมื่อรู้สึกฟุ้งหรือจมกับความคิด ลองหยุดสักครู่แล้วสังเกตสิ่งที่เห็น ได้ยิน และรู้สึกได้ที่ตัวรอบตัวตอนนี้ อย่างละ 2-3 อย่าง เพื่อพาใจกลับมาอยู่กับปัจจุบัน",
    howToEn:
      "When thoughts feel overwhelming, pause and notice a few things you can see, hear, and feel right now to bring your attention back to the present moment.",
    source: WHO_DWM,
    suggestedTopics: "all",
    suggestedLevels: ["HIGH", "VERY_HIGH", "POOR"],
  },
  {
    key: "unhooking_notice_thought",
    nameTh: "ปลดเกี่ยวความคิด (Unhooking)",
    nameEn: "Unhooking from difficult thoughts",
    howToTh:
      "เมื่อมีความคิดลบวนซ้ำ ลองบอกตัวเองเบา ๆ ว่า \"นี่คือความคิดหนึ่ง ไม่ใช่ความจริงทั้งหมด\" แล้วปล่อยให้มันผ่านไปโดยไม่ต้องเถียงหรือเชื่อตามทันที",
    howToEn:
      "When a troubling thought loops, gently remind yourself \"this is just a thought, not the whole truth,\" and let it pass without arguing with it or buying into it right away.",
    source: WHO_DWM,
    suggestedTopics: "all",
    suggestedLevels: ["MODERATE", "HIGH", "VERY_HIGH", "POOR"],
  },
  {
    key: "values_small_step",
    nameTh: "ลงมือทำตามสิ่งที่ให้ความหมาย (Acting on your values)",
    nameEn: "Acting on your values",
    howToTh:
      "เลือกสิ่งเล็ก ๆ หนึ่งอย่างที่ตรงกับสิ่งที่คุณให้ความสำคัญในชีวิต (เช่น การเรียน ความสัมพันธ์ สุขภาพ) แล้วลงมือทำแค่ขั้นแรกเล็ก ๆ วันนี้",
    howToEn:
      "Pick one thing that matters to you (studies, relationships, health) and take just one small first step toward it today.",
    source: WHO_DWM,
    suggestedTopics: "all",
    suggestedLevels: ["LOW", "MODERATE", "GOOD"],
  },
  {
    key: "making_room_feelings",
    nameTh: "เปิดที่ว่างให้ความรู้สึก (Making room)",
    nameEn: "Making room for difficult feelings",
    howToTh:
      "ลองสังเกตความรู้สึกที่เกิดขึ้นตรง ๆ โดยไม่ต้องรีบผลักออกหรือเก็บกด แค่หายใจและบอกกับตัวเองว่ารู้สึกแบบนี้อยู่ได้ชั่วคราว",
    howToEn:
      "Notice the feeling that's showing up without rushing to push it away or suppress it — just breathe and let yourself know it's okay to feel this way for a while.",
    source: WHO_DWM,
    suggestedTopics: "all",
    suggestedLevels: ["MODERATE", "HIGH", "VERY_HIGH", "POOR"],
  },
  {
    key: "engaging_fully",
    nameTh: "ทำสิ่งที่ทำอยู่อย่างเต็มที่ (Engaging)",
    nameEn: "Engaging fully in what you're doing",
    howToTh:
      "เลือกกิจกรรมหนึ่งอย่างที่ทำอยู่แล้ววันนี้ (กินข้าว เดิน อาบน้ำ) แล้วลองใส่ใจกับทุกขั้นตอนของมันอย่างเต็มที่ ไม่เร่งรีบหรือทำสองอย่างพร้อมกัน",
    howToEn:
      "Pick one thing you're already doing today (eating, walking, showering) and give it your full attention, step by step, without rushing or multitasking.",
    source: WHO_DWM,
    suggestedTopics: "all",
    suggestedLevels: ["LOW", "MODERATE", "GOOD"],
  },
  {
    key: "being_kind_self",
    nameTh: "ใจดีกับตัวเอง (Being kind)",
    nameEn: "Being kind to yourself",
    howToTh:
      "ลองพูดกับตัวเองในคำที่คุณจะพูดกับเพื่อนที่กำลังลำบาก แทนคำตำหนิตัวเอง และทำสิ่งเล็ก ๆ หนึ่งอย่างที่ดูแลตัวเองวันนี้",
    howToEn:
      "Try talking to yourself the way you'd talk to a friend who's struggling, instead of self-criticism, and do one small thing today that takes care of yourself.",
    source: WHO_DWM,
    suggestedTopics: "all",
    suggestedLevels: ["MODERATE", "HIGH", "VERY_HIGH", "POOR"],
  },
  {
    key: "being_kind_others",
    nameTh: "ใจดีกับคนรอบตัว (Being kind to others)",
    nameEn: "Being kind to someone around you",
    howToTh:
      "ลองทำสิ่งเล็ก ๆ ที่ใจดีให้คนรอบตัวหนึ่งคนวันนี้ เช่น ทักทาย ขอบคุณ หรือถามว่าเขาเป็นอย่างไร",
    howToEn:
      "Do one small kind thing for someone around you today — a greeting, a thank-you, or simply asking how they're doing.",
    source: WHO_DWM,
    suggestedTopics: ["friends", "family", "love"],
    suggestedLevels: ["LOW", "MODERATE", "GOOD"],
  },

  // ---------- เสริมจากเทคนิคคลายเครียด กรมสุขภาพจิต ----------
  {
    key: "deep_breathing",
    nameTh: "ฝึกหายใจเข้าออกลึก ๆ",
    nameEn: "Slow, deep breathing",
    howToTh:
      "หาที่นั่งสบาย หายใจเข้าทางจมูกช้า ๆ นับ 1-4 แล้วหายใจออกทางปากช้า ๆ นับ 1-4 ทำซ้ำสัก 5-10 รอบ",
    howToEn:
      "Sit comfortably, breathe in slowly through your nose for a count of 4, then breathe out slowly through your mouth for a count of 4. Repeat for 5–10 rounds.",
    source: DMH_THAILAND,
    suggestedTopics: "all",
    suggestedLevels: ["HIGH", "VERY_HIGH", "POOR"],
  },
  {
    key: "progressive_muscle_relaxation",
    nameTh: "ผ่อนคลายกล้ามเนื้อทีละส่วน",
    nameEn: "Progressive muscle relaxation",
    howToTh:
      "เกร็งกล้ามเนื้อส่วนใดส่วนหนึ่ง (เช่น มือ หรือไหล่) ไว้สัก 3-5 วินาที แล้วค่อย ๆ ผ่อนคลายช้า ๆ สัก 10-15 วินาที ทำสลับไปตามส่วนต่าง ๆ ของร่างกาย",
    howToEn:
      "Tense one muscle group (like your hands or shoulders) for 3–5 seconds, then slowly release and relax for 10–15 seconds. Repeat for a few muscle groups.",
    source: DMH_THAILAND,
    suggestedTopics: "all",
    suggestedLevels: ["HIGH", "VERY_HIGH", "POOR"],
  },
  {
    key: "short_meditation",
    nameTh: "นั่งสมาธิสั้น ๆ",
    nameEn: "A short sitting meditation",
    howToTh:
      "นั่งในที่เงียบสบาย หลับตา จดจ่อกับลมหายใจตัวเองสัก 3-5 นาที เมื่อมีความคิดแวบเข้ามาก็แค่สังเกตแล้วพากลับมาที่ลมหายใจ",
    howToEn:
      "Sit somewhere quiet, close your eyes, and focus on your breath for 3–5 minutes. When a thought pops in, simply notice it and bring your attention back to your breath.",
    source: DMH_THAILAND,
    suggestedTopics: "all",
    suggestedLevels: ["MODERATE", "HIGH", "VERY_HIGH", "POOR"],
  },
  {
    key: "enjoyable_activity",
    nameTh: "ทำกิจกรรมที่ชอบสักนิด",
    nameEn: "Do a small activity you enjoy",
    howToTh:
      "เลือกกิจกรรมเล็ก ๆ ที่คุณชอบและทำได้ตอนนี้ เช่น ฟังเพลง วาดรูป เดินเล่น หรือทำอาหารง่าย ๆ ให้เวลากับมันสัก 10-15 นาที",
    howToEn:
      "Pick a small activity you enjoy and can do right now — listening to music, drawing, taking a walk, or cooking something simple — and spend 10–15 minutes on it.",
    source: DMH_THAILAND,
    suggestedTopics: "all",
    suggestedLevels: ["LOW", "MODERATE", "GOOD"],
  },
  {
    key: "tidy_small_space",
    nameTh: "จัดพื้นที่รอบตัวให้น่าอยู่ขึ้นนิดหนึ่ง",
    nameEn: "Tidy up a small space around you",
    howToTh:
      "เลือกมุมเล็ก ๆ ที่คุณใช้บ่อย (โต๊ะเรียน เตียง) จัดให้เป็นระเบียบสักเล็กน้อยภายใน 10 นาที",
    howToEn:
      "Pick one small space you use often (a desk, your bed) and tidy it up a little within 10 minutes.",
    source: DMH_THAILAND,
    suggestedTopics: ["study", "sleep", "self"],
    suggestedLevels: ["LOW", "MODERATE", "GOOD"],
  },
  {
    key: "wind_down_before_sleep",
    nameTh: "ผ่อนคลายก่อนเข้านอน",
    nameEn: "Wind down before bedtime",
    howToTh:
      "ก่อนนอนสัก 15-20 นาที ลองงดดูหน้าจอมือถือ หายใจลึก ๆ 2-3 รอบ หรือฟังเสียงเบา ๆ ที่ช่วยให้สงบ",
    howToEn:
      "About 15–20 minutes before bed, try stepping away from screens, take a few slow deep breaths, or listen to calming, quiet sound.",
    source: DMH_THAILAND,
    suggestedTopics: ["sleep"],
    suggestedLevels: ["MODERATE", "HIGH", "VERY_HIGH", "POOR"],
  },
];

export const getActivityByKey = (key: string): RecommendedActivity | undefined =>
  ACTIVITIES.find((a) => a.key === key);
