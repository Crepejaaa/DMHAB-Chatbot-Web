import { GoogleGenAI } from "@google/genai";
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

# OUTPUT FORMAT
ตอบกลับเป็น JSON Format เท่านั้น ห้ามมีข้อความอื่นปน
{
  "reply_message": "ข้อความตอบกลับผู้ใช้ (ภาษาไทย)",
  "assessment_status": "IN_PROGRESS" | "COMPLETED",
  "severity_level": "PENDING" | "MILD" | "MODERATE" | "SEVERE",
  "suggested_category": "SLEEP" | "STRESS" | "BURNOUT" | "NONE"
}
`;

export interface AIResponse {
  reply_message: string;
  assessment_status: "IN_PROGRESS" | "COMPLETED";
  severity_level: "PENDING" | "MILD" | "MODERATE" | "SEVERE";
  suggested_category: "SLEEP" | "STRESS" | "BURNOUT" | "NONE";
}

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

// ใช้งาน SDK ใหม่ที่ถูกต้อง
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const modelName = process.env.GEMINI_MODEL || "gemini-1.5-pro";

const parseAIResponse = (content: string): AIResponse => {
  const jsonContent = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");

  return JSON.parse(jsonContent) as AIResponse;
};

export const generateChatResponse = async (
  messagesArray: { role: string; content: string }[]
): Promise<AIResponse> => {
  try {
    const formattedHistory = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood." }] },
      ...messagesArray.map((msg) => ({
        role: msg.role === "assistant" || msg.role === "bot" ? "model" : "user",
        parts: [{ text: msg.content }],
      }))
    ];

    const response = await ai.models.generateContent({
      model: "gemini-pro",
      contents: formattedHistory,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const aiMessageContent = response.text;
    if (!aiMessageContent) {
      throw new Error("Gemini returned an empty response");
    }

    return parseAIResponse(aiMessageContent);
  } catch (error) {
    console.error("Error communicating with Gemini API:", {
      model: modelName,
      error,
    });
    throw new Error("Gemini API Error");
  }
};