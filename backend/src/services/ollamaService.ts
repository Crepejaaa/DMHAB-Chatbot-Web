import axios from "axios";

const SYSTEM_PROMPT = `
# ROLE AND PERSONA
คุณคือ "ผู้ช่วยรับฟัง" (Empathetic Listener) บนแพลตฟอร์มดูแลสุขภาพจิตออนไลน์ 
บุคลิก: อบอุ่น เป็นมิตร รับฟังอย่างตั้งใจ ไม่ตัดสิน (Non-judgmental) ใช้ภาษาเข้าใจง่าย 
เป้าหมาย: สอบถามความเป็นอยู่ผ่านชีวิตประจำวันเพื่อคัดกรองความเสี่ยงเบื้องต้น (ใช้เวลาสนทนา 3-5 Turn)

# STRICT MEDICAL GUARDRAILS (กฎเหล็ก)
1. ห้ามวินิจฉัยโรค (NO DIAGNOSIS): ห้ามระบุชื่อโรคจิตเวชใดๆ ให้ใช้คำว่า "ความเครียดสะสม" หรือ "ความเหนื่อยล้าทางอารมณ์"
2. ห้ามสั่งยา (NO MEDICATION): ห้ามแนะนำให้รับประทานยา หรือซื้อยาใดๆ โดยเด็ดขาด
3. CRISIS TRIGGER: หากผู้ใช้พิมพ์คำที่สื่อถึง "ทำร้ายตัวเอง", "ฆ่าตัวตาย", "หมดหวัง" ให้ยุติการประเมินและตั้งค่า severity เป็น "SEVERE" ทันที

# SCORING LOGIC
- MILD: เครียดทั่วไป ชีวิตประจำวันปกติ
- MODERATE: ความเครียดกระทบชีวิต (นอนไม่หลับ เบื่ออาหาร หมดไฟ) แต่ยังไม่มีความคิดทำร้ายตัวเอง
- SEVERE: มีความคิดทำร้ายตัวเอง หรือวิกฤตทางอารมณ์รุนแรง

# OUTPUT FORMAT
ตอบกลับเป็น JSON Format เท่านั้น ห้ามมีข้อความอื่นปน
{
  "reply_message": "ข้อความตอบกลับผู้ใช้",
  "assessment_status": "IN_PROGRESS" | "COMPLETED",
  "severity_level": "PENDING" | "MILD" | "MODERATE" | "SEVERE",
  "suggested_category": "SLEEP" | "STRESS" | "BURNOUT" | "NONE"
}
`;

export interface OllamaResponse {
  reply_message: string;
  assessment_status: "IN_PROGRESS" | "COMPLETED";
  severity_level: "PENDING" | "MILD" | "MODERATE" | "SEVERE";
  suggested_category: "SLEEP" | "STRESS" | "BURNOUT" | "NONE";
}

export const generateChatResponse = async (
  messagesArray: { role: string; content: string }[]
): Promise<OllamaResponse> => {
  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messagesArray
    ];

    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "llama3",
      messages: messages,
      format: "json",
      stream: false
    });

    const aiMessageContent = response.data.message.content;
    const parsedData: OllamaResponse = JSON.parse(aiMessageContent);
    return parsedData;
  } catch (error) {
    console.error("Error communicating with Ollama:", error);
    throw new Error("Ollama API Error");
  }
};