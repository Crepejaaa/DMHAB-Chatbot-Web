import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

export type ChatTopicKey =
  | "love"
  | "study"
  | "work"
  | "family"
  | "money"
  | "friends"
  | "self"
  | "sleep";

export interface TopicConfig {
  key: ChatTopicKey;
  labelTh: string;
  greetingTh: string;
  guardrailPrompt: string;
}

export const CHAT_TOPICS: Record<ChatTopicKey, TopicConfig> = {
  love: {
    key: "love",
    labelTh: "ความรักและความสัมพันธ์",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีอยู่เป็นเพื่อนรับฟังเรื่องความรักและความสัมพันธ์ของคุณในพื้นที่ปลอดภัยนี้นะคะ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: ความรักและความสัมพันธ์)
- รับฟังความรู้สึกในความสัมพันธ์อย่างเป็นกลาง ไม่ตัดสินว่าฝ่ายใดถูกหรือผิด
- ห้ามยุยงให้เลิกราทันที หรือบังคับให้ต้องอดทนอยู่ต่อ ให้ชวนสำรวจความรู้สึก ความต้องการ และขอบเขตที่ปลอดภัยของตนเอง (Healthy Boundaries)
- หากพบสัญญาณการทำร้ายร่างกายหรือจิตใจอย่างรุนแรงในความสัมพันธ์ ให้คำนึงถึงความปลอดภัยของผู้ใช้เป็นอันดับแรกและแนะนำช่องทางขอความช่วยเหลือที่ปลอดภัย`,
  },
  study: {
    key: "study",
    labelTh: "การเรียนและการสอบ",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone พร้อมรับฟังเรื่องการเรียนและความกดดันที่คุณกำลังเจออยู่นะคะ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การเรียนและการสอบ)
- รับฟังความกดดันเรื่องผลการเรียน การสอบ โปรเจกต์ หรือความคาดหวังอย่างเข้าใจ ไม่เปรียบเทียบผู้ใช้กับคนอื่น
- ห้ามตำหนิเรื่องความขี้เกียจหรือความล้มเหลว และห้ามส่งเสริมการทุจริตทางการศึกษา
- ช่วยแยกคุณค่าในตัวเองออกจากเกรดหรือคะแนนสอบ และชวนจัดลำดับก้าวเล็ก ๆ ที่พอทำได้โดยไม่กดดันตัวเองเกินไป`,
  },
  work: {
    key: "work",
    labelTh: "การทำงานและภาระงาน",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีเป็นพื้นที่พักใจให้คุณได้วางความเหนื่อยจากการทำงานลงชั่วคราวนะคะ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การทำงานและภาระงาน)
- รับฟังความเหนื่อยล้า ภาวะหมดไฟ หรือความอึดอัดจากงานและเพื่อนร่วมงานด้วยความเข้าใจ
- ห้ามให้คำปรึกษาทางกฎหมายแรงงานเชิงลึก และห้ามยุยงให้ตัดสินใจลาออกกะทันหันโดยไม่ไตร่ตรองผลกระทบ
- เน้นการดูแลขอบเขตเวลาพักผ่อน การฟื้นฟูพลังงานทางอารมณ์ และการแยกงานออกจากคุณค่าของตัวเอง`,
  },
  family: {
    key: "family",
    labelTh: "ครอบครัวและคนในบ้าน",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone พร้อมรับฟังเรื่องครอบครัวและบรรยากาศในบ้านอย่างเข้าใจโดยไม่ตัดสินนะคะ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: ครอบครัวและคนในบ้าน)
- รับฟังความอึดอัด ช่องว่างระหว่างวัย หรือความคาดหวังของครอบครัวด้วยความละเอียดอ่อนต่อบริบทครอบครัวไทย
- ห้ามกล่าวโทษด่าทอคนในครอบครัว และห้ามบังคับให้ผู้ใช้ต้องรีบให้อภัยหรือทนรับคำพูดทำร้ายจิตใจโดยไม่ดูแลใจตัวเอง
- เน้นการสร้างพื้นที่ปลอดภัยทางอารมณ์ การตั้งขอบเขตอย่างนุ่มนวล และการดูแลใจตนเองเมื่ออยู่ในบ้าน`,
  },
  money: {
    key: "money",
    labelTh: "การเงินและภาระค่าใช้จ่าย",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone เข้าใจเลยนะคะว่าเรื่องภาระค่าใช้จ่ายและการเงินสร้างความกังวลใจได้มากจริง ๆ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การเงินและภาระค่าใช้จ่าย — กฎเคร่งครัด)
- รับฟังความเครียด ความกังวล และความกดดันทางอารมณ์จากเรื่องการเงินโดยไม่ตัดสินพฤติกรรมการใช้จ่าย
- ห้ามแนะนำการลงทุน หุ้น กองทุน คริปโตเคอร์เรนซี การเก็งกำไร การพนัน หรือวิธีหาเงินเสี่ยงโชคทุกชนิดโดยเด็ดขาด
- ห้ามแนะนำหรือชี้ช่องทางกู้เงินนอกระบบ แอปกู้เงินเถื่อน หรือช่องทางที่ผิดกฎหมายโดยเด็ดขาด
- หากผู้ใช้มีปัญหาหนี้สินที่ต้องการคำปรึกษาเฉพาะทาง ให้แนะนำเฉพาะหน่วยงานภาครัฐที่ถูกกฎหมาย เช่น สายด่วนแก้หนี้ ธนาคารแห่งประเทศไทย โทร 1213 และเน้นการประคองสติ ลดความตื่นตระหนก และแยกแยะสิ่งที่พอจัดการได้ทีละก้าว`,
  },
  friends: {
    key: "friends",
    labelTh: "เพื่อนและการเข้าสังคม",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีรับฟังเรื่องเพื่อนและสังคมรอบตัวของคุณนะคะ ไม่ว่าจะรู้สึกเหงา เหนื่อยกับการเข้าสังคม หรือมีเรื่องคาใจ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: เพื่อนและการเข้าสังคม)
- รับฟังความรู้สึกโดดเดี่ยว ความขัดแย้งในกลุ่มเพื่อน หรือความเหนื่อยล้าจากการเข้าสังคมอย่างเข้าใจ
- ห้ามตัดสินว่าผู้ใช้เข้ากับคนอื่นไม่ได้ และห้ามบังคับให้ต้องฝืนเข้าสังคมหากยังไม่พร้อม
- เน้นการเคารพจังหวะของตัวเอง การสื่อสารอย่างจริงใจ และการเห็นคุณค่าในตัวเองแม้ในวันที่รู้สึกแปลกแยก`,
  },
  self: {
    key: "self",
    labelTh: "ตัวเองและคุณค่าในตัวเอง",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ดีใจที่คุณแวะมาพักใจและกลับมาฟังเสียงข้างในตัวเองนะคะ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: ตัวเองและคุณค่าในตัวเอง)
- รับฟังความสับสน ความเหนื่อยล้าในการเติบโต ความไม่มั่นใจ หรือการตำหนิตัวเองด้วยความเมตตาอย่างยิ่ง
- ห้ามใช้คำพูดเปรียบเทียบ กดดันให้ต้องคิดบวกแบบฝืนความรู้สึก (No Toxic Positivity) หรือตัดสินเส้นทางชีวิตของผู้ใช้
- ส่งเสริมความเมตตาต่อตนเอง (Self-Compassion) และการยอมรับอารมณ์ตามความเป็นจริงอย่างอ่อนโยน`,
  },
  sleep: {
    key: "sleep",
    labelTh: "การนอนและการพักผ่อน",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีอยู่เป็นเพื่อนคุยเบา ๆ เรื่องการนอนและการพักผ่อนของคุณนะคะ อยากเล่าอะไรให้ฟังก่อนก็ได้นะคะ ช่วงนี้เป็นอย่างไรบ้างคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การนอนและการพักผ่อน)
- รับฟังปัญหาการนอนหลับยาก หลับ ๆ ตื่น ๆ คิดมากก่อนนอน หรือความอ่อนเพลียสะสมด้วยความเข้าใจ
- ห้ามแนะนำยานอนหลับ ยาคลายกังวล เมลาโทนิน สมุนไพร หรืออาหารเสริมทุกชนิดโดยเด็ดขาด (สอดคล้องกฎ NO MEDICATION)
- เน้นการสำรวจความเครียดก่อนเข้านอน และสุขอนามัยการนอนเบื้องต้นที่ปลอดภัย (Sleep Hygiene) เช่น การผ่อนคลายลมหายใจ ลดสิ่งกระตุ้นก่อนนอน และหากกระทบชีวิตหนักต่อเนื่องให้แนะนำปรึกษาบุคลากรทางการแพทย์`,
  },
};

export const VALID_TOPICS = Object.keys(CHAT_TOPICS) as ChatTopicKey[];

export const isValidTopic = (topic: unknown): topic is ChatTopicKey => {
  return typeof topic === "string" && VALID_TOPICS.includes(topic as ChatTopicKey);
};

export const getTopicConfig = (topic?: string | null): TopicConfig => {
  if (topic && isValidTopic(topic)) {
    return CHAT_TOPICS[topic];
  }
  return CHAT_TOPICS.self;
};

export const CHAT_TOPICS_EN: Record<
  ChatTopicKey,
  {
    labelEn: string;
    greetingEn: string;
  }
> = {
  love: {
    labelEn: "Love & Relationships",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm here as a safe space to listen to your feelings about love and relationships. Feel free to tell me what's been on your mind lately.",
  },
  study: {
    labelEn: "Studies & Exams",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone, ready to listen to the academic pressure and study challenges you're facing. Feel free to tell me what's been on your mind lately.",
  },
  work: {
    labelEn: "Work & Workload",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. Welcome to a safe space where you can set down your work fatigue for a while. Feel free to tell me what's been on your mind lately.",
  },
  family: {
    labelEn: "Family & Home Life",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone, ready to listen to your feelings about family and home life with warmth and without judgment. Feel free to tell me what's been on your mind lately.",
  },
  money: {
    labelEn: "Finances & Expenses",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I truly understand how overwhelming financial stress and expenses can feel. Feel free to tell me what's been on your mind lately.",
  },
  friends: {
    labelEn: "Friends & Social Life",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm glad to listen to your thoughts about friends and social life—whether you're feeling lonely, socially drained, or troubled. Feel free to tell me what's been on your mind lately.",
  },
  self: {
    labelEn: "Self & Self-Worth",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm glad you stopped by to rest your heart and listen to your inner voice. Feel free to tell me what's been on your mind lately.",
  },
  sleep: {
    labelEn: "Sleep & Rest",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm here for a calm, gentle chat about your sleep and rest. Feel free to tell me what's been on your mind lately.",
  },
};

export const getLocalizedGreeting = (
  topic?: string | null,
  locale: "th" | "en" = "th"
): string => {
  const config = getTopicConfig(topic);
  if (locale === "en") {
    return CHAT_TOPICS_EN[config.key]?.greetingEn || CHAT_TOPICS_EN.self.greetingEn;
  }
  return config.greetingTh;
};

const BASE_SYSTEM_PROMPT = `
# ROLE AND PERSONA
คุณคือ "น้องมุกห่วงใย" ผู้ช่วยรับฟัง (Empathetic Listener) บนแพลตฟอร์มดูแลสุขภาพจิตออนไลน์ 'PhuenJaiZone'
บุคลิก: อบอุ่น เป็นมิตร รับฟังอย่างตั้งใจ ไม่ตัดสิน (Non-judgmental) ใช้ภาษาเข้าใจง่าย
Introduce yourself as a chatbot from 'PhuenJaiZone', a safe space ready to listen. Example greeting: 'สวัสดีค่ะ น้องมุกเป็นแชทบอทจาก PhuenJaiZone พื้นที่ปลอดภัยที่พร้อมรับฟังคุณ วันนี้คุณรู้สึกอย่างไรบ้างคะ?'
เป้าหมาย: รับฟังและสะท้อนความรู้สึกอย่างเข้าใจ ชวนพูดคุยสำรวจอารมณ์ผ่านชีวิตประจำวันอย่างเป็นธรรมชาติเพื่อประคองใจและคัดกรองความเสี่ยงเบื้องต้น

# STRICT MEDICAL GUARDRAILS (กฎเหล็ก)
1. ห้ามวินิจฉัยโรค (NO DIAGNOSIS): ห้ามระบุชื่อโรคจิตเวชใดๆ ให้ใช้คำว่า "ความเครียดสะสม" หรือ "ความเหนื่อยล้าทางอารมณ์"
2. ห้ามสั่งยา (NO MEDICATION): ห้ามแนะนำให้รับประทานยา หรือซื้อยาใดๆ โดยเด็ดขาด
3. CRISIS TRIGGER: หากผู้ใช้พิมพ์คำที่สื่อถึง "ทำร้ายตัวเอง", "ฆ่าตัวตาย", "หมดหวัง" ให้ยุติการประเมินและตั้งค่า severity เป็น "SEVERE" ทันที
4. LANGUAGE: ตอบกลับเป็นภาษาไทยเท่านั้น ห้ามใช้ภาษาอังกฤษหรือภาษาอื่นปะปนโดยเด็ดขาด
5. HOTLINES (เบอร์สายด่วน): เมื่อแนะนำสายด่วน ใช้เฉพาะ "สายด่วนสุขภาพจิต 1323" (โทรฟรี ตลอด 24 ชั่วโมง) สำหรับเรื่องจิตใจ ถ้ามีอันตรายต่อร่างกายหรือบาดเจ็บอยู่ตอนนี้ ให้แนะนำ "1669 (สายด่วนเจ็บป่วยฉุกเฉิน)" ห้ามเรียก 1669 ว่าศูนย์สุขภาพจิตหรือสายด่วนสุขภาพจิต และห้ามแนะนำเบอร์อื่นนอกจาก 1323 และ 1669 / When mentioning hotlines, use only "Mental Health Hotline 1323" (free, 24/7) for emotional support; use "1669 (medical emergency)" only for immediate physical danger or injury. Never call 1669 a mental health line and never mention any other number.
6. SELF-REFERENCE (การเรียกตัวเอง): เมื่อตอบเป็นภาษาไทย ให้เรียกตัวเองว่า "น้องมุก" เสมอ ห้ามใช้ "ฉัน" "ดิฉัน" "หนู" หรือ "เรา" แทนตัวเอง และลงท้ายด้วย "ค่ะ/นะคะ" / In English replies, refer to yourself as "I" (your name is Nong Mook).

# SCORING LOGIC
- MILD: เครียดทั่วไป ชีวิตประจำวันปกติ
- MODERATE: ความเครียดกระทบชีวิต (นอนไม่หลับ เบื่ออาหาร หมดไฟ) แต่ยังไม่มีความคิดทำร้ายตัวเอง
- SEVERE: มีความคิดทำร้ายตัวเอง หรือวิกฤตทางอารมณ์รุนแรง

# OUTPUT FORMAT (CRITICAL)
คุณต้องตอบกลับเป็นรูปแบบ JSON เท่านั้น ห้ามมีข้อความอื่นหรือคำอธิบายปะปน โครงสร้าง JSON ต้องเป็นดังนี้:
{
  "reply_message": "ข้อความตอบกลับผู้ใช้ (ภาษาไทย)",
  "assessment_status": "IN_PROGRESS" หรือ "COMPLETED",
  "severity_level": "PENDING", "MILD", "MODERATE", หรือ "SEVERE",
  "suggested_category": "SLEEP", "STRESS", "BURNOUT", หรือ "NONE",
  "ready_for_scale": true หรือ false
}
`;

/**
 * สร้าง System Prompt โดยคง STRICT MEDICAL GUARDRAILS และ CRISIS TRIGGER เดิมไว้ทั้งหมด
 * และต่อท้ายขอบเขตเฉพาะตามหัวข้อ (topic) ที่ผู้ใช้เลือก
 */
export const SYSTEM_PROMPT = (
  topic?: string | null,
  locale: "th" | "en" = "th"
): string => {
  const basePrompt =
    locale === "en"
      ? BASE_SYSTEM_PROMPT.replace(
          "4. LANGUAGE: ตอบกลับเป็นภาษาไทยเท่านั้น ห้ามใช้ภาษาอังกฤษหรือภาษาอื่นปะปนโดยเด็ดขาด",
          "4. LANGUAGE: Respond in English only. Do not mix Thai."
        ).replace(
          '"reply_message": "ข้อความตอบกลับผู้ใช้ (ภาษาไทย)"',
          '"reply_message": "Your empathetic response to the user (in English only)"'
        )
      : BASE_SYSTEM_PROMPT;
  if (!topic || !isValidTopic(topic)) {
    return basePrompt;
  }
  const config = CHAT_TOPICS[topic];
  return `${basePrompt}\n${config.guardrailPrompt}\n`;
};

/**
 * สร้างคำสั่งเพิ่มเติมสำหรับช่วง OPENING (ก่อนชวนทำแบบวัด ST-5 + WHO-5)
 */
export const buildOpeningInstruction = (
  mode: string | null | undefined,
  locale: "th" | "en" = "th"
): string => {
  const isFollowUp = mode === "FOLLOW_UP";
  if (locale === "en") {
    return `
# OPENING PHASE INSTRUCTIONS
- You are currently in the OPENING phase of the conversation.
- Reflect the user's feelings warmly and ask 1 open-ended question to better understand their situation. Do NOT give advice or solutions yet.
- Do NOT ask multiple-choice questions or ask the user to rate/score anything on their own.
${isFollowUp ? "- FOLLOW_UP MODE: Gently ask how things have been going recently compared to the previous session." : ""}
- Set "ready_for_scale": true in your JSON output ONLY when the user has shared enough context to understand what they are worried about and how it is affecting them (otherwise set "ready_for_scale": false).
- Include "ready_for_scale": boolean in your JSON response matching the OUTPUT FORMAT.
`;
  }

  return `
# คำสั่งเฉพาะช่วงเริ่มต้นสนทนา (OPENING PHASE)
- ขณะนี้อยู่ในช่วงเริ่มต้นรับฟังเรื่องราว (OPENING)
- ให้สะท้อนความรู้สึกของผู้ใช้อย่างอบอุ่น และถามคำถามปลายเปิด 1 ข้อเพื่อชวนเล่าต่อ ยังไม่ให้คำแนะนำหรือแนวทางแก้ไขในตอนนี้
- ห้ามถามคำถามแบบมีตัวเลือก (ช้อยส์) หรือให้ผู้ใช้ประเมินคะแนนเอง
${isFollowUp ? "- โหมดติดตามผล (FOLLOW_UP): ชวนถามอย่างอ่อนโยนว่าช่วงที่ผ่านมาเป็นอย่างไรบ้างเมื่อเทียบกับครั้งก่อน" : ""}
- ตั้งค่า "ready_for_scale": true ใน JSON เมื่อผู้ใช้เล่าบริบทพอให้เข้าใจแล้วว่ากังวลเรื่องอะไรและกระทบตัวเขาอย่างไร (หากข้อมูลยังสั้นเกินไปให้ตั้ง "ready_for_scale": false)
- ต้องใส่ฟิลด์ "ready_for_scale": true หรือ false ใน JSON ตาม OUTPUT FORMAT เสมอ
`;
};

export interface AIResponse {
  reply_message: string;
  assessment_status: "IN_PROGRESS" | "COMPLETED";
  severity_level: "PENDING" | "MILD" | "MODERATE" | "SEVERE";
  suggested_category: "SLEEP" | "STRESS" | "BURNOUT" | "NONE";
  ready_for_scale?: boolean;
}

export interface ActionableStep {
  title: string;
  description: string;
}

export interface SessionSummaryResult {
  overview: string;
  actionable_steps: ActionableStep[];
  encouragement: string;
  severity_level: "MILD" | "MODERATE" | "SEVERE";
}

// ตรวจสอบคำสัญญาณวิกฤตเบื้องต้น (ทั้งภาษาไทยและภาษาอังกฤษ)
const CRISIS_PATTERNS = [
  "ฆ่าตัวตาย",
  "ทำร้ายตัวเอง",
  "อยากตาย",
  "ไม่อยากมีชีวิต",
  "จบชีวิต",
  "กรีดแขน",
  "ผูกคอ",
  "กระโดดตึก",
  "กินยาเกินขนาด",
  "suicide",
  "kill myself",
  "hurt myself",
  "self-harm",
  "self harm",
  "want to die",
  "end my life",
  "overdose",
];

export const hasCrisisSignal = (text: string): boolean => {
  if (!text) return false;
  const normalized = text.trim().toLowerCase();
  return CRISIS_PATTERNS.some((keyword) => normalized.includes(keyword.toLowerCase()));
};

// ตรวจสอบตัวแปร Environment
if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY in environment variables");
}

// สร้าง Instance ของ Groq Client โดยระบบจะดึง GROQ_API_KEY จาก Environment ไปใช้โดยอัตโนมัติ
const groq = new Groq();

// ฟังก์ชันสำหรับสกัดและแปลงผลลัพธ์เป็น JSON (ป้องกันกรณี AI ใส่ Markdown มา)
const extractJsonString = (content: string): string => {
  return content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
};

const parseAIResponse = (
  content: string,
  locale: "th" | "en" = "th"
): AIResponse => {
  const parsed = JSON.parse(extractJsonString(content)) as Partial<AIResponse>;
  return {
    reply_message:
      typeof parsed.reply_message === "string" && parsed.reply_message.trim()
        ? parsed.reply_message.trim()
        : locale === "en"
          ? "I'm here listening with care. Feel free to share more at your own pace."
          : "น้องมุกห่วงใยรับฟังอยู่นะคะ เล่าเพิ่มเติมตามจังหวะที่คุณสบายใจได้เลยค่ะ",
    assessment_status:
      parsed.assessment_status === "COMPLETED" ? "COMPLETED" : "IN_PROGRESS",
    severity_level:
      parsed.severity_level === "SEVERE" ||
      parsed.severity_level === "MODERATE" ||
      parsed.severity_level === "MILD"
        ? parsed.severity_level
        : "PENDING",
    suggested_category:
      parsed.suggested_category === "SLEEP" ||
      parsed.suggested_category === "STRESS" ||
      parsed.suggested_category === "BURNOUT"
        ? parsed.suggested_category
        : "NONE",
    ready_for_scale: parsed.ready_for_scale === true,
  };
};

export const generateChatResponse = async (
  messagesArray: { role: "system" | "user" | "assistant"; content: string }[],
  topic?: string | null,
  locale: "th" | "en" = "th",
  extraSystem?: string
): Promise<AIResponse> => {
  try {
    const baseSystem = SYSTEM_PROMPT(topic, locale);
    const fullSystem = extraSystem ? `${baseSystem}\n${extraSystem}` : baseSystem;
    const formattedMessages: any[] = [
      { role: "system", content: fullSystem },
      ...messagesArray,
    ];

    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: formattedMessages,
      temperature: 0.25,
      response_format: { type: "json_object" },
    });

    const aiMessageContent = chatCompletion.choices[0]?.message?.content || "{}";
    return parseAIResponse(aiMessageContent, locale);
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    throw new Error("AI API Error");
  }
};

const TOPIC_LABELS_EN: Record<ChatTopicKey, string> = {
  love: "love and relationships",
  study: "studies and exams",
  work: "work and workload",
  family: "family and home life",
  money: "finances and expenses",
  friends: "friends and social life",
  self: "self-worth and personal growth",
  sleep: "sleep and rest",
};

const buildFallbackSummary = (
  topic?: string | null,
  locale: "th" | "en" = "th"
): SessionSummaryResult => {
  const topicConfig = getTopicConfig(topic);

  if (locale === "en") {
    const topicLabelEn = TOPIC_LABELS_EN[topicConfig.key] || "personal well-being";
    return {
      overview: `Today, you took a meaningful step by using this safe space to talk and explore your feelings around ${topicLabelEn}. Pausing to reflect and acknowledging your emotional fatigue is an important part of caring for your own heart and mind.`,
      actionable_steps: [
        {
          title: "Slow down your breathing to release physical tension",
          description:
            "Try inhaling gently for a count of 1 to 4, then exhaling slowly for a count of 1 to 6 for 3–5 cycles. This helps signal to your body and mind that it is safe to rest right now.",
        },
        {
          title: "Separate what you can handle today from what can wait until tomorrow",
          description:
            "Pick just one small, manageable thing you can do without pushing yourself too hard, and give yourself permission to set aside everything else for now.",
        },
        {
          title: "Give yourself a short, guilt-free break",
          description:
            "Sip some warm water, listen to calming music, or gently stretch for 10 minutes while reminding yourself that you have done the best you could with the energy you had today.",
        },
      ],
      encouragement:
        "Thank you for trusting Nong Mook Huang Yai to keep you company today. Whenever things feel heavy, you are always welcome back here to rest your mind—or if you need professional support, you can reach the Mental Health Hotline at 1323 anytime, 24/7.",
      severity_level: "MILD",
    };
  }

  return {
    overview: `วันนี้คุณได้ใช้พื้นที่ปลอดภัยพูดคุยและสำรวจความรู้สึกเกี่ยวกับเรื่อง${topicConfig.labelTh} การได้หยุดทบทวนและยอมรับความเหนื่อยล้าที่เกิดขึ้นถือเป็นก้าวสำคัญของการดูแลใจตัวเองค่ะ`,
    actionable_steps: [
      {
        title: "พักหายใจช้า ๆ ให้ร่างกายคลายความตึงตัว",
        description:
          "ลองสูดลมหายใจเข้าลึก ๆ นับ 1-4 และผ่อนออกช้า ๆ นับ 1-6 สัก 3-5 รอบ เพื่อส่งสัญญาณให้ร่างกายและสมองรู้ว่าตอนนี้ปลอดภัยที่จะพักแล้วค่ะ",
      },
      {
        title: "แยกเรื่องที่จัดการได้วันนี้ ออกจากเรื่องของวันพรุ่งนี้",
        description:
          "เลือกสิ่งเล็ก ๆ เพียง 1 อย่างที่พอทำได้โดยไม่ฝืนกำลังตัวเอง แล้วอนุญาตให้เรื่องที่ยังไม่ถึงเวลาได้วางพักไว้ก่อนชั่วคราวค่ะ",
      },
      {
        title: "มอบเวลาพักสั้น ๆ ที่ปราศจากการตำหนิตัวเอง",
        description:
          "ดื่มน้ำอุ่น ฟังเพลงเบา ๆ หรือยืดเหยียดร่างกายสัก 10 นาที โดยบอกตัวเองว่าวันนี้เราทำเต็มที่เท่าที่พลังงานมีแล้วค่ะ",
      },
    ],
    encouragement:
      "ขอบคุณที่ไว้ใจให้น้องมุกห่วงใยอยู่เป็นเพื่อนในวันนี้นะคะ เมื่อไหร่ที่รู้สึกหนักใจ แวะกลับมาพักใจที่นี่ได้เสมอ หรือหากต้องการผู้เชี่ยวชาญดูแลเพิ่มเติม สามารถโทรสายด่วนสุขภาพจิต 1323 ได้ตลอด 24 ชั่วโมงค่ะ",
    severity_level: "MILD",
  };
};

export const generateSessionSummary = async (
  topic: string | null | undefined,
  answers: { questionNo: number; questionText: string; answerText: string }[],
  messages: { sender: string; message: string }[],
  locale: "th" | "en" = "th",
  scaleContext?: string
): Promise<SessionSummaryResult> => {
  const topicConfig = getTopicConfig(topic);
  const languageRule =
    locale === "en"
      ? "4. LANGUAGE: Respond in English only. Do not mix Thai."
      : "4. LANGUAGE: ตอบกลับเป็นภาษาไทยเท่านั้น ห้ามใช้ภาษาอังกฤษปะปน";

  const outputFormatBlock =
    locale === "en"
      ? `# OUTPUT FORMAT (JSON ONLY)
Return ONLY valid JSON matching this exact structure (all text fields MUST be written in natural, empathetic English only—do NOT use any Thai characters):
{
  "overview": "Warm, empathetic, non-judgmental 2-3 sentence summary in English of what the user shared and how they are feeling (no numeric scores)",
  "actionable_steps": [
    {
      "title": "Short, clear step title in English",
      "description": "Practical, gentle self-care action tailored to what the user shared, written in English"
    }
  ],
  "encouragement": "Warm, comforting closing encouragement in English (1-2 sentences)",
  "severity_level": "MILD" or "MODERATE" or "SEVERE"
}
Provide exactly 3 actionable_steps tailored to the user's conversation.`
      : `# OUTPUT FORMAT (JSON ONLY)
ตอบกลับเป็น JSON เท่านั้นตามโครงสร้างนี้:
{
  "overview": "สรุปภาพรวมความรู้สึกและประเด็นที่ผู้ใช้เล่าด้วยความอบอุ่น เข้าใจ ไม่ตัดสิน ความยาว 2-3 ประโยค (ห้ามมีตัวเลขคะแนน)",
  "actionable_steps": [
    {
      "title": "หัวข้อสิ่งที่ลองทำได้สั้นๆ เข้าใจง่าย",
      "description": "แนวทางปฏิบัติเล็กๆ ที่ทำได้จริงและปรับให้เข้ากับบริบทที่ผู้ใช้เพิ่งเล่าโดยเฉพาะ"
    }
  ],
  "encouragement": "ข้อความให้กำลังใจส่งท้ายอย่างอบอุ่นและอ่อนโยน 1-2 ประโยค",
  "severity_level": "MILD" หรือ "MODERATE" หรือ "SEVERE"
}
โดยให้มี actionable_steps จำนวน 3 ข้อ ที่สอดคล้องกับเรื่องราวที่ผู้ใช้เล่าจริง ๆ`;

  const summarySystemPrompt = `
คุณคือ "น้องมุกห่วงใย" ผู้ช่วยรับฟังจาก PhuenJaiZone ทำหน้าที่สรุปบทสนทนาและให้คำแนะนำการดูแลใจเบื้องต้นหลังจบการสนทนาในหัวข้อ "${topicConfig.labelTh}" เมื่อพูดถึงตัวเอง ให้ใช้ "น้องมุก" เสมอ ห้ามใช้ "ฉัน" หรือ "ดิฉัน"

# STRICT MEDICAL GUARDRAILS (กฎเหล็ก)
1. ห้ามวินิจฉัยโรค (NO DIAGNOSIS): ห้ามระบุชื่อโรคจิตเวชใดๆ ให้ใช้คำว่า "ความเครียดสะสม" หรือ "ความเหนื่อยล้าทางอารมณ์"
2. ห้ามสั่งยา (NO MEDICATION): ห้ามแนะนำให้รับประทานยา สมุนไพร หรืออาหารเสริมใดๆ โดยเด็ดขาด
3. NO RAW SCORES: ห้ามแสดงตัวเลขคะแนนดิบ คะแนนรวม หรือเกณฑ์ตัวเลขใดๆ ในข้อความเด็ดขาด
${languageRule}
${topicConfig.guardrailPrompt}

${outputFormatBlock}
`;

  const answersSummary =
    answers.length > 0
      ? answers
          .map((a) => `ข้อ ${a.questionNo}: ${a.questionText}\nคำตอบผู้ใช้: ${a.answerText}`)
          .join("\n\n")
      : "ไม่มีข้อมูลคำตอบแบบวัด";

  const scaleContextBlock = scaleContext ? `\n\n[บริบทผลแบบวัด (ห้ามแสดงตัวเลขคะแนนในคำตอบ)]\n${scaleContext}` : "";

  const recentDialogue = messages
    .slice(-20)
    .map((m) => `${m.sender === "USER" ? "ผู้ใช้" : "น้องมุกห่วงใย"}: ${m.message}`)
    .join("\n");

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: summarySystemPrompt },
        {
          role: "user",
          content: `หัวข้อที่เลือก: ${topicConfig.labelTh}${scaleContextBlock}\n\n[คำตอบแบบวัด]\n${answersSummary}\n\n[บทสนทนา]\n${recentDialogue}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(extractJsonString(raw)) as Partial<SessionSummaryResult>;
    const fallback = buildFallbackSummary(topic, locale);

    const steps = Array.isArray(parsed.actionable_steps)
      ? parsed.actionable_steps
          .filter(
            (s): s is ActionableStep =>
              Boolean(s && typeof s.title === "string" && typeof s.description === "string")
          )
          .slice(0, 4)
      : [];

    return {
      overview:
        typeof parsed.overview === "string" && parsed.overview.trim()
          ? parsed.overview.trim()
          : fallback.overview,
      actionable_steps: steps.length > 0 ? steps : fallback.actionable_steps,
      encouragement:
        typeof parsed.encouragement === "string" && parsed.encouragement.trim()
          ? parsed.encouragement.trim()
          : fallback.encouragement,
      severity_level:
        parsed.severity_level === "SEVERE" ||
        parsed.severity_level === "MODERATE" ||
        parsed.severity_level === "MILD"
          ? parsed.severity_level
          : "MILD",
    };
  } catch (error) {
    console.error("Error generating session summary with Groq:", error);
    return buildFallbackSummary(topic, locale);
  }
};

export const translateChatMessages = async (
  messages: { id: number; sender: string; text: string }[],
  targetLocale: "th" | "en"
): Promise<{ id: number; text: string }[]> => {
  if (messages.length === 0) return [];
  const targetLangName = targetLocale === "en" ? "English" : "Thai";
  const prompt = `Translate each message's "text" field into ${targetLangName}. Keep the same meaning, tone, and supportive counseling style (this is a mental-health support chatbot conversation; the bot's Thai name is "น้องมุกห่วงใย" and English name is "Nong Mook Huang Yai"). Do NOT translate if a message is already in ${targetLangName} — return it unchanged in that case. Return ONLY a JSON object: {"items": [{"id": number, "text": string}, ...]} with the same number of items and same ids, in the same order as input. Input messages:\n${JSON.stringify(messages.map((m) => ({ id: m.id, text: m.text })))}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are a precise translation engine for a Thai mental-health support chat app. Always return valid JSON only, no extra commentary.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    });
    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(extractJsonString(raw));
    if (Array.isArray(parsed.items)) {
      return parsed.items.map((item: any, idx: number) => ({
        id: Number(item?.id ?? messages[idx]?.id),
        text: typeof item?.text === "string" && item.text.trim() ? item.text : messages[idx]?.text || "",
      }));
    }
    return messages.map((m) => ({ id: m.id, text: m.text }));
  } catch (error) {
    console.error("Error translating chat messages:", error);
    // ถ้าแปลไม่สำเร็จ คืนข้อความเดิมแทนที่จะทำให้ UI พัง
    return messages.map((m) => ({ id: m.id, text: m.text }));
  }
};
