import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const SYSTEM_PROMPT = `
# ROLE AND PERSONA
คุณคือ "ผู้ช่วยรับฟัง" (Empathetic Listener) บนแพลตฟอร์มดูแลสุขภาพจิตออนไลน์ 
บุคลิก: อบอุ่น เป็นมิตร รับฟังอย่างตั้งใจ ไม่ตัดสิน (Non-judgmental) ใช้ภาษาเข้าใจง่าย 
เป้าหมาย: สอบถามความเป็นอยู่ผ่านชีวิตประจำวันเพื่อคัดกรองความเสี่ยงเบื้องต้น (ใช้เวลาสนทนา 3-5 Turn)

# STRICT MEDICAL GUARDRAILS (กฎเหล็ก)
1. ห้ามวินิจฉัยโรค (NO DIAGNOSIS): ห้ามระบุชื่อโรคจิตเวชใดๆ ให้ใช้คำว่า "ความเครียดสะสม" หรือ "ความเหนื่อยล้าทางอารมณ์"
2. ห้ามสั่งยา (NO MEDICATION): ห้ามแนะนำให้รับประทานยา หรือซื้อยาใดๆ โดยเด็ดขาด
3. CRISIS TRIGGER: หากผู้ใช้พิมพ์คำที่สื่อถึง "ทำร้ายตัวเอง", "ฆ่าตัวตาย", "หมดหวัง" ให้ยุติการประเมินและตั้งค่า severity เป็น "SEVERE" ทันที
4. LANGUAGE: ตอบกลับเป็นภาษาไทยเท่านั้น ห้ามใช้ภาษาอังกฤษหรือภาษาอื่นปะปนโดยเด็ดขาด

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
  "suggested_category": "SLEEP", "STRESS", "BURNOUT", หรือ "NONE"
}
`;

export interface AIResponse {
  reply_message: string;
  assessment_status: "IN_PROGRESS" | "COMPLETED";
  severity_level: "PENDING" | "MILD" | "MODERATE" | "SEVERE";
  suggested_category: "SLEEP" | "STRESS" | "BURNOUT" | "NONE";
}

// ตรวจสอบตัวแปร Environment
if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY in environment variables");
}

// สร้าง Instance ของ Groq Client โดยระบบจะดึง GROQ_API_KEY จาก Environment ไปใช้โดยอัตโนมัติ
const groq = new Groq();

// ฟังก์ชันสำหรับสกัดและแปลงผลลัพธ์เป็น JSON (ป้องกันกรณี AI ใส่ Markdown มา)
const parseAIResponse = (content: string): AIResponse => {
  const jsonContent = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");

  return JSON.parse(jsonContent) as AIResponse;
};

export const generateChatResponse = async (
  messagesArray: { role: "system" | "user" | "assistant"; content: string }[]
): Promise<AIResponse> => {
  try {
    // 1. เตรียมรูปแบบประวัติการสนทนาให้ตรงกับที่ Groq (OpenAI format) ต้องการ
    // โดยแทรก System Prompt ไว้เป็นข้อความแรกสุด
    const formattedMessages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messagesArray
    ];

    // 2. เรียกใช้งาน Groq API แบบกำหนด JSON Mode
    const chatCompletion = await groq.chat.completions.create({
      // เลือกโมเดลที่ต้องการ แนะนำ Llama 3 รุ่น 70B สำหรับงานภาษาไทย
      model: "llama-3.1-8b-instant",
      messages: formattedMessages,
      temperature: 0.2,
      // บังคับให้ Output เป็นรูปแบบ JSON
      response_format: { type: "json_object" },
    });

    // 3. ดึงข้อความและแปลงผลลัพธ์โดยใช้ฟังก์ชันที่สร้างไว้
    const aiMessageContent = chatCompletion.choices[0]?.message?.content || "{}";
    const parsedData: AIResponse = parseAIResponse(aiMessageContent);

    return parsedData;

  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    throw new Error("AI API Error");
  }
}; 