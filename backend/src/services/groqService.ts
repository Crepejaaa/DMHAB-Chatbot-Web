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

export interface TopicOption {
  label: string;
  score: number;
}

export interface TopicQuestion {
  questionNo: number;
  questionText: string;
  options: TopicOption[];
}

export interface TopicConfig {
  key: ChatTopicKey;
  labelTh: string;
  greetingTh: string;
  guardrailPrompt: string;
  questions: TopicQuestion[];
}

export const CHAT_TOPICS: Record<ChatTopicKey, TopicConfig> = {
  love: {
    key: "love",
    labelTh: "ความรักและความสัมพันธ์",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีอยู่เป็นเพื่อนรับฟังเรื่องความรักและความสัมพันธ์ของคุณในพื้นที่ปลอดภัยนี้นะคะ ก่อนเริ่มคุยกันยาว ๆ ขอชวนค่อย ๆ สำรวจความรู้สึกผ่าน 5 คำถามสั้น ๆ ก่อนนะคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: ความรักและความสัมพันธ์)
- รับฟังความรู้สึกในความสัมพันธ์อย่างเป็นกลาง ไม่ตัดสินว่าฝ่ายใดถูกหรือผิด
- ห้ามยุยงให้เลิกราทันที หรือบังคับให้ต้องอดทนอยู่ต่อ ให้ชวนสำรวจความรู้สึก ความต้องการ และขอบเขตที่ปลอดภัยของตนเอง (Healthy Boundaries)
- หากพบสัญญาณการทำร้ายร่างกายหรือจิตใจอย่างรุนแรงในความสัมพันธ์ ให้คำนึงถึงความปลอดภัยของผู้ใช้เป็นอันดับแรกและแนะนำช่องทางขอความช่วยเหลือที่ปลอดภัย`,
    questions: [
      {
        questionNo: 1,
        questionText: "ช่วงนี้เรื่องความสัมพันธ์ทำให้คุณรู้สึกหนักใจในแง่มุมไหนมากที่สุดคะ?",
        options: [
          { label: "แค่มีเรื่องให้คิดเล็กน้อย ยังพอเข้าใจกันได้", score: 0 },
          { label: "เริ่มมีระยะห่างหรือสื่อสารกันไม่ค่อยเข้าใจ", score: 1 },
          { label: "ทะเลาะหรืออึดอัดใจบ่อยจนรู้สึกเหนื่อยล้า", score: 2 },
          { label: "เจ็บปวด เสียใจหนัก หรือรู้สึกโดดเดี่ยวมากในความสัมพันธ์", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "ตลอด 1-2 สัปดาห์ที่ผ่านมา เรื่องนี้วนเวียนอยู่ในความคิดของคุณบ่อยแค่ไหนคะ?",
        options: [
          { label: "นาน ๆ ครั้ง เวลามีเรื่องมากระทบ", score: 0 },
          { label: "คิดถึงเป็นพัก ๆ ในบางวัน", score: 1 },
          { label: "คิดวนเกือบทุกวันจนโฟกัสเรื่องอื่นยาก", score: 2 },
          { label: "แทบตลอดเวลาจนรู้สึกหมดแรงทางใจ", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "ความกังวลเรื่องความสัมพันธ์ส่งผลต่อการนอน การกิน หรือการใช้ชีวิตประจำวันบ้างไหมคะ?",
        options: [
          { label: "ยังใช้ชีวิต พักผ่อน และทานอาหารได้ตามปกติ", score: 0 },
          { label: "มีเหนื่อยหรือหลับยากบ้างในบางคืน", score: 1 },
          { label: "เริ่มนอนไม่หลับ เบื่ออาหาร หรือไม่มีกระจิตกระใจทำสิ่งต่าง ๆ", score: 2 },
          { label: "กระทบชีวิตประจำวันอย่างมาก ร้องไห้หรืออ่อนเพลียแทบทุกวัน", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "ตอนนี้คุณพอมีพื้นที่ปลอดภัยหรือใครสักคนที่เล่าเรื่องนี้ให้ฟังได้บ้างไหมคะ?",
        options: [
          { label: "มีคนที่ไว้ใจและพูดคุยระบายได้เสมอ", score: 0 },
          { label: "พอมีบ้าง แต่ไม่กล้าเล่าทั้งหมด", score: 1 },
          { label: "แทบไม่มีใครที่คุยเรื่องนี้ด้วยได้เลย", score: 2 },
          { label: "เก็บไว้คนเดียวทั้งหมด รู้สึกไม่มีใครเข้าใจเลย", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "สำหรับการคุยกันวันนี้ คุณอยากให้น้องมุกห่วงใยอยู่เป็นเพื่อนแบบไหนมากที่สุดคะ?",
        options: [
          { label: "รับฟังเงียบ ๆ และสะท้อนความรู้สึกอย่างเข้าใจ", score: 0 },
          { label: "ช่วยค่อย ๆ เรียบเรียงความคิดและความต้องการของตัวเอง", score: 1 },
          { label: "อยากได้มุมมองอ่อนโยนในการดูแลใจตัวเองตอนนี้", score: 2 },
          { label: "อยากระบายความอัดอั้นในใจออกมาให้โล่งขึ้น", score: 3 },
        ],
      },
    ],
  },
  study: {
    key: "study",
    labelTh: "การเรียนและการสอบ",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone พร้อมรับฟังเรื่องการเรียนและความกดดันที่คุณกำลังเจออยู่นะคะ มาค่อย ๆ สำรวจความรู้สึกผ่าน 5 คำถามเริ่มต้นกันก่อนนะคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การเรียนและการสอบ)
- รับฟังความกดดันเรื่องผลการเรียน การสอบ โปรเจกต์ หรือความคาดหวังอย่างเข้าใจ ไม่เปรียบเทียบผู้ใช้กับคนอื่น
- ห้ามตำหนิเรื่องความขี้เกียจหรือความล้มเหลว และห้ามส่งเสริมการทุจริตทางการศึกษา
- ช่วยแยกคุณค่าในตัวเองออกจากเกรดหรือคะแนนสอบ และชวนจัดลำดับก้าวเล็ก ๆ ที่พอทำได้โดยไม่กดดันตัวเองเกินไป`,
    questions: [
      {
        questionNo: 1,
        questionText: "ตอนนี้เรื่องการเรียนส่วนไหนที่ทำให้คุณรู้สึกตึงเครียดมากที่สุดคะ?",
        options: [
          { label: "งานหรือเนื้อหาค่อนข้างเยอะ แต่ยังพอจัดการทัน", score: 0 },
          { label: "กังวลเรื่องสอบ เกรด หรือโปรเจกต์ที่กำลังเร่งเข้ามา", score: 1 },
          { label: "รู้สึกตามไม่ทัน เหนื่อยล้า หรือกดดันจากความคาดหวังมาก", score: 2 },
          { label: "รู้สึกตัน หมดไฟในการเรียน หรือกลัวล้มเหลวจนไม่อยากเริ่มอะไรเลย", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "ช่วงนี้เวลาคิดถึงเรื่องเรียน ร่างกายและใจของคุณตอบสนองอย่างไรบ้างคะ?",
        options: [
          { label: "ตื่นตัวเล็กน้อยแต่ยังพักผ่อนได้ปกติ", score: 0 },
          { label: "เริ่มรู้สึกตึง ๆ ล้า ๆ เวลาต้องอ่านหนังสือหรือทำงาน", score: 1 },
          { label: "ใจสั่น เครียดสะสม หรือพักแล้วก็ยังรู้สึกผิดที่ไม่ได้อ่านหนังสือ", score: 2 },
          { label: "เครียดหนักจนปวดหัว นอนไม่หลับ หรือรู้สึกท้อแท้มาก", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "ความกดดันเรื่องการเรียนทำให้คุณเผลอตำหนิหรือกดดันตัวเองบ่อยแค่ไหนคะ?",
        options: [
          { label: "แทบไม่ค่อยตำหนิตัวเอง ให้กำลังใจตัวเองได้", score: 0 },
          { label: "มีเปรียบเทียบตัวเองกับเพื่อนบ้างบางครั้ง", score: 1 },
          { label: "มักคิดว่าตัวเองยังพยายามไม่พออยู่บ่อย ๆ", score: 2 },
          { label: "รู้สึกว่าตัวเองไม่เก่งและไม่มีคุณค่าเมื่อทำได้ไม่ตามเป้า", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "ในแต่ละวันคุณได้มีเวลาพักสมองหรือทำสิ่งที่ชอบโดยไม่รู้สึกผิดบ้างไหมคะ?",
        options: [
          { label: "มีเวลาพักผ่อนและแบ่งเวลาได้ค่อนข้างสมดุล", score: 0 },
          { label: "ได้พักบ้างสั้น ๆ แต่ใจยังคิดเรื่องงานค้าง", score: 1 },
          { label: "แทบไม่ได้พักเลย เพราะรู้สึกว่างานกองอยู่ตลอด", score: 2 },
          { label: "ไม่กล้าพักหรือหมดแรงจนทำอะไรต่อไม่ไหวทั้งเรื่องเรียนและเรื่องพัก", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "วันนี้คุณอยากให้น้องมุกห่วงใยช่วยซัพพอร์ตใจเรื่องการเรียนอย่างไรดีคะ?",
        options: [
          { label: "รับฟังความเหนื่อยเรื่องเรียนโดยไม่ตัดสิน", score: 0 },
          { label: "ช่วยจัดระเบียบเรื่องที่กังวลให้เห็นเป็นก้าวเล็ก ๆ", score: 1 },
          { label: "ช่วยหาวิธีผ่อนคลายความกดดันก่อนกลับไปลุยต่อ", score: 2 },
          { label: "อยู่เป็นเพื่อนปลอบใจในวันที่รู้สึกเหนื่อยเกินไป", score: 3 },
        ],
      },
    ],
  },
  work: {
    key: "work",
    labelTh: "การทำงานและภาระงาน",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีเป็นพื้นที่พักใจให้คุณได้วางความเหนื่อยจากการทำงานลงชั่วคราวนะคะ ขอชวนเริ่มจาก 5 คำถามสั้น ๆ เพื่อทำความเข้าใจสิ่งที่คุณเผชิญอยู่ค่ะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การทำงานและภาระงาน)
- รับฟังความเหนื่อยล้า ภาวะหมดไฟ หรือความอึดอัดจากงานและเพื่อนร่วมงานด้วยความเข้าใจ
- ห้ามให้คำปรึกษาทางกฎหมายแรงงานเชิงลึก และห้ามยุยงให้ตัดสินใจลาออกกะทันหันโดยไม่ไตร่ตรองผลกระทบ
- เน้นการดูแลขอบเขตเวลาพักผ่อน การฟื้นฟูพลังงานทางอารมณ์ และการแยกงานออกจากคุณค่าของตัวเอง`,
    questions: [
      {
        questionNo: 1,
        questionText: "ช่วงนี้เรื่องงานด้านไหนที่ดูดพลังใจของคุณไปมากที่สุดคะ?",
        options: [
          { label: "ปริมาณงานยุ่งเป็นช่วง ๆ แต่ยังรับมือไหว", score: 0 },
          { label: "งานเร่งต่อเนื่องหรือต้องรับผิดชอบหลายอย่างพร้อมกัน", score: 1 },
          { label: "บรรยากาศที่ทำงาน คนร่วมงาน หรือความคาดหวังที่กดดันมาก", score: 2 },
          { label: "รู้สึกหมดไฟ เหนื่อยล้าเรื้อรัง จนไม่อยากตื่นไปทำงานเลย", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "หลังเลิกงานหรือในวันหยุด คุณสามารถวางเรื่องงานออกจากความคิดได้ไหมคะ?",
        options: [
          { label: "วางได้ค่อนข้างดี มีเวลาพักผ่อนเต็มที่", score: 0 },
          { label: "ยังมีเผลอเช็กงานหรือคิดเรื่องงานบ้างบางเวลา", score: 1 },
          { label: "สมองยังคิดเรื่องงานต่อเกือบตลอดแม้หมดเวลางานแล้ว", score: 2 },
          { label: "แทบไม่ได้พักเลย กังวลเรื่องงานตั้งแต่นอนจนตื่น", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "ความเครียดจากงานส่งผลต่อร่างกายและอารมณ์ของคุณอย่างไรบ้างในช่วงนี้คะ?",
        options: [
          { label: "มีเมื่อยล้าตามปกติ พักแล้วดีขึ้น", score: 0 },
          { label: "เริ่มปวดตึงคอ บ่า ไหล่ หรือหงุดหงิดง่ายขึ้นเล็กน้อย", score: 1 },
          { label: "นอนหลับไม่สนิท อ่อนเพลียสะสม หรืออารมณ์แปรปรวนบ่อย", score: 2 },
          { label: "เหนื่อยล้าทั้งกายและใจอย่างหนัก รู้สึกว่างเปล่าหรืออยากร้องไห้บ่อย ๆ", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "ในที่ทำงานหรือคนรอบตัว พอมีคนที่เข้าใจหรือช่วยแบ่งเบาภาระได้บ้างไหมคะ?",
        options: [
          { label: "มีทีมหรือคนรอบข้างที่คอยซัพพอร์ตดี", score: 0 },
          { label: "พอปรึกษาได้บางเรื่อง แต่ส่วนใหญ่ต้องจัดการเอง", score: 1 },
          { label: "รู้สึกต้องแบกรับความคาดหวังไว้คนเดียวเกือบทั้งหมด", score: 2 },
          { label: "รู้สึกโดดเดี่ยวและไม่ปลอดภัยที่จะพูดความจริงกับใครเลย", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "ตอนนี้อยากให้น้องมุกห่วงใยอยู่ช่วยดูแลใจหลังเหนื่อยจากงานแบบไหนดีคะ?",
        options: [
          { label: "เป็นผู้ฟังที่เข้าใจให้ได้ระบายเรื่องงานวันนี้", score: 0 },
          { label: "ช่วยแยกแยะสิ่งที่ควบคุมได้กับสิ่งที่ควรวางลงก่อน", score: 1 },
          { label: "ชวนหาวิธีพักใจสั้น ๆ ให้ตัวเองได้ชาร์จพลัง", score: 2 },
          { label: "อยู่เป็นเพื่อนคุยอย่างอบอุ่นโดยไม่ต้องเร่งหาคำตอบ", score: 3 },
        ],
      },
    ],
  },
  family: {
    key: "family",
    labelTh: "ครอบครัวและคนในบ้าน",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone พร้อมรับฟังเรื่องครอบครัวและบรรยากาศในบ้านอย่างเข้าใจโดยไม่ตัดสินนะคะ มาค่อย ๆ เริ่มจาก 5 คำถามสั้น ๆ กันก่อนค่ะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: ครอบครัวและคนในบ้าน)
- รับฟังความอึดอัด ช่องว่างระหว่างวัย หรือความคาดหวังของครอบครัวด้วยความละเอียดอ่อนต่อบริบทครอบครัวไทย
- ห้ามกล่าวโทษด่าทอคนในครอบครัว และห้ามบังคับให้ผู้ใช้ต้องรีบให้อภัยหรือทนรับคำพูดทำร้ายจิตใจโดยไม่ดูแลใจตัวเอง
- เน้นการสร้างพื้นที่ปลอดภัยทางอารมณ์ การตั้งขอบเขตอย่างนุ่มนวล และการดูแลใจตนเองเมื่ออยู่ในบ้าน`,
    questions: [
      {
        questionNo: 1,
        questionText: "เรื่องในครอบครัวแบบไหนที่กำลังกระทบความรู้สึกของคุณมากที่สุดในตอนนี้คะ?",
        options: [
          { label: "ความเห็นต่างกันเล็กน้อยตามประสาคนในบ้าน", score: 0 },
          { label: "ความคาดหวังหรือคำพูดของคนในบ้านที่ทำให้รู้สึกกดดัน", score: 1 },
          { label: "การปะทะอารมณ์ บรรยากาศตึงเครียด หรือความไม่เข้าใจกันบ่อย ๆ", score: 2 },
          { label: "รู้สึกว่าบ้านไม่ใช่พื้นที่ปลอดภัยทางใจ หรืออึดอัดจนแทบไม่มีที่พักใจ", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "เมื่อเกิดความไม่เข้าใจกันในบ้าน คุณมักจัดการกับความรู้สึกตัวเองอย่างไรคะ?",
        options: [
          { label: "พูดคุยปรับความเข้าใจหรือปล่อยวางได้ไม่นาน", score: 0 },
          { label: "เลี่ยงไปอยู่เงียบ ๆ สักพักเพื่อให้อารมณ์เย็นลง", score: 1 },
          { label: "ต้องเก็บกดความรู้สึกไว้ข้างในเพราะพูดไปก็กลัวบานปลาย", score: 2 },
          { label: "เก็บมาคิดซ้ำ ๆ รู้สึกผิด เสียใจ หรือร้องไห้คนเดียวบ่อยมาก", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "ความตึงเครียดเรื่องครอบครัวกระทบต่อพลังใจในการใช้ชีวิตแต่ละวันแค่ไหนคะ?",
        options: [
          { label: "กระทบเพียงเล็กน้อย ยังทำกิจกรรมอื่นได้ตามปกติ", score: 0 },
          { label: "ทำให้รู้สึกเหนื่อยใจเป็นช่วง ๆ เวลาต้องกลับบ้านหรือคุยกัน", score: 1 },
          { label: "ทำให้เครียดสะสม นอนหลับยาก หรือไม่อยากสุงสิงกับใคร", score: 2 },
          { label: "ส่งผลหนักมากจนรู้สึกหมดพลังและเหนื่อยล้าทางอารมณ์ตลอดเวลา", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "คุณพอมีมุมสงบส่วนตัวหรือกิจกรรมที่ช่วยให้ใจได้พักจากบรรยากาศในบ้านบ้างไหมคะ?",
        options: [
          { label: "มีมุมส่วนตัวและวิธีพักใจที่ได้ผลดี", score: 0 },
          { label: "พอมีเวลาส่วนตัวบ้างบางช่วงของวัน", score: 1 },
          { label: "หาพื้นที่ส่วนตัวได้ยากมาก รู้สึกถูกจับตามองหรือรบกวนเสมอ", score: 2 },
          { label: "ไม่มีพื้นที่ปลอดภัยให้พักใจเลย รู้สึกตึงเครียดตลอดเวลา", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "วันนี้คุณอยากให้น้องมุกห่วงใยอยู่เคียงข้างเรื่องครอบครัวในรูปแบบไหนดีคะ?",
        options: [
          { label: "รับฟังเรื่องราวในบ้านโดยไม่ตัดสินใคร", score: 0 },
          { label: "ช่วยสะท้อนและยอมรับความรู้สึกที่เก็บไว้ในใจ", score: 1 },
          { label: "ช่วยคิดวิธีสร้างขอบเขตและมุมพักใจเล็ก ๆ ให้ตัวเอง", score: 2 },
          { label: "อยู่เป็นพื้นที่ปลอดภัยให้ระบายความอึดอัดอย่างสบายใจ", score: 3 },
        ],
      },
    ],
  },
  money: {
    key: "money",
    labelTh: "การเงินและภาระค่าใช้จ่าย",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone เข้าใจเลยนะคะว่าเรื่องภาระค่าใช้จ่ายและการเงินสร้างความกังวลใจได้มากจริง ๆ วันนี้มาค่อย ๆ เล่าผ่าน 5 คำถามสั้น ๆ ในพื้นที่ที่ไม่ตัดสินกันนะคะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การเงินและภาระค่าใช้จ่าย — กฎเคร่งครัด)
- รับฟังความเครียด ความกังวล และความกดดันทางอารมณ์จากเรื่องการเงินโดยไม่ตัดสินพฤติกรรมการใช้จ่าย
- ห้ามแนะนำการลงทุน หุ้น กองทุน คริปโตเคอร์เรนซี การเก็งกำไร การพนัน หรือวิธีหาเงินเสี่ยงโชคทุกชนิดโดยเด็ดขาด
- ห้ามแนะนำหรือชี้ช่องทางกู้เงินนอกระบบ แอปกู้เงินเถื่อน หรือช่องทางที่ผิดกฎหมายโดยเด็ดขาด
- หากผู้ใช้มีปัญหาหนี้สินที่ต้องการคำปรึกษาเฉพาะทาง ให้แนะนำเฉพาะหน่วยงานภาครัฐที่ถูกกฎหมาย เช่น สายด่วนแก้หนี้ ธนาคารแห่งประเทศไทย โทร 1213 และเน้นการประคองสติ ลดความตื่นตระหนก และแยกแยะสิ่งที่พอจัดการได้ทีละก้าว`,
    questions: [
      {
        questionNo: 1,
        questionText: "ช่วงนี้เรื่องการเงินด้านไหนที่ทำให้คุณรู้สึกกังวลใจมากที่สุดคะ?",
        options: [
          { label: "อยากวางแผนรายรับ-รายจ่ายให้รัดกุมขึ้น", score: 0 },
          { label: "ค่าใช้จ่ายตึงมือขึ้น ต้องคอยระวังการใช้เงินมากกว่าเดิม", score: 1 },
          { label: "ภาระค่าใช้จ่ายหรือหนี้สินที่หมุนเวียนจนรู้สึกเครียดทุกเดือน", score: 2 },
          { label: "รู้สึกมืดแปดด้าน กังวลเรื่องเงินหนักมากจนแทบกินไม่ได้นอนไม่หลับ", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "ความกังวลเรื่องเงินรบกวนจิตใจหรือสมาธิของคุณบ่อยแค่ไหนในแต่ละวันคะ?",
        options: [
          { label: "คิดถึงเฉพาะตอนต้องจัดการบิลหรือวางแผนใช้จ่าย", score: 0 },
          { label: "คิดกังวลเป็นพัก ๆ ในหลายวันของสัปดาห์", score: 1 },
          { label: "กังวลเกือบทั้งวัน เวลาเห็นยอดเงินหรือค่าใช้จ่ายแล้วใจหวิว", score: 2 },
          { label: "คิดวนตลอดเวลาจนตื่นตระหนก เหนื่อยล้า หรือโทษตัวเองอย่างหนัก", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "ภาระทางการเงินช่วงนี้กระทบต่อสุขภาพกาย การพักผ่อน หรือความสัมพันธ์รอบตัวไหมคะ?",
        options: [
          { label: "ยังไม่กระทบการใช้ชีวิตหรือการพักผ่อน", score: 0 },
          { label: "เริ่มไม่กล้าออกไปเจอเพื่อนหรือประหยัดจนรู้สึกตึงเครียด", score: 1 },
          { label: "นอนหลับยาก เครียดสะสม หรือเริ่มมีปากเสียงกับคนใกล้ตัวเรื่องเงิน", score: 2 },
          { label: "กระทบหนักทั้งการนอน สุขภาพ และรู้สึกโดดเดี่ยวไม่กล้าบอกใคร", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "เวลาที่เครียดเรื่องเงิน คุณพอมีคนช่วยรับฟังหรือช่วยคิดตั้งสติไปด้วยกันไหมคะ?",
        options: [
          { label: "มีคนในครอบครัวหรือคนที่ไว้ใจปรึกษาได้", score: 0 },
          { label: "เล่าได้บางส่วน แต่เกรงใจไม่อยากให้ใครกังวลตาม", score: 1 },
          { label: "ไม่กล้าเล่าให้ใครฟังเพราะกลัวถูกตัดสินหรือตำหนิ", score: 2 },
          { label: "แบกรับไว้ลำพังทั้งหมดจนรู้สึกหนักเกินกำลัง", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "สำหรับการพูดคุยวันนี้ คุณอยากให้น้องมุกห่วงใยช่วยประคองใจเรื่องนี้อย่างไรดีคะ?",
        options: [
          { label: "รับฟังความเครียดเรื่องเงินอย่างเข้าใจโดยไม่ตัดสิน", score: 0 },
          { label: "ช่วยให้ใจสงบลงและค่อย ๆ เรียงลำดับสิ่งที่อยู่ตรงหน้า", score: 1 },
          { label: "ชวนดูแลอารมณ์ไม่ให้เผลอโทษตัวเองหนักเกินไป", score: 2 },
          { label: "อยากระบายความหนักอึ้งที่เก็บไว้มานานให้รู้สึกโล่งขึ้น", score: 3 },
        ],
      },
    ],
  },
  friends: {
    key: "friends",
    labelTh: "เพื่อนและการเข้าสังคม",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีรับฟังเรื่องเพื่อนและสังคมรอบตัวของคุณนะคะ ไม่ว่าจะรู้สึกเหงา เหนื่อยกับการเข้าสังคม หรือมีเรื่องคาใจ มาเริ่มสำรวจผ่าน 5 คำถามกันก่อนค่ะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: เพื่อนและการเข้าสังคม)
- รับฟังความรู้สึกโดดเดี่ยว ความขัดแย้งในกลุ่มเพื่อน หรือความเหนื่อยล้าจากการเข้าสังคมอย่างเข้าใจ
- ห้ามตัดสินว่าผู้ใช้เข้ากับคนอื่นไม่ได้ และห้ามบังคับให้ต้องฝืนเข้าสังคมหากยังไม่พร้อม
- เน้นการเคารพจังหวะของตัวเอง การสื่อสารอย่างจริงใจ และการเห็นคุณค่าในตัวเองแม้ในวันที่รู้สึกแปลกแยก`,
    questions: [
      {
        questionNo: 1,
        questionText: "ช่วงนี้เรื่องเพื่อนหรือการเข้าสังคมทำให้คุณรู้สึกแบบไหนมากที่สุดคะ?",
        options: [
          { label: "มีเรื่องเข้าใจผิดหรือห่างเหินกันเล็กน้อย", score: 0 },
          { label: "เหนื่อยกับการต้องปรับตัวเข้าหาคนอื่นหรือเกรงใจเพื่อนมากไป", score: 1 },
          { label: "รู้สึกไม่เป็นส่วนหนึ่งของกลุ่ม ถูกมองข้าม หรือมีปัญหากับเพื่อนสนิท", score: 2 },
          { label: "รู้สึกโดดเดี่ยวมาก เจ็บปวดจากคำพูดคนรอบข้าง หรือไม่อยากเจอใครเลย", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "เวลาอยู่ท่ามกลางผู้คนหรือเห็นเพื่อนในโซเชียล คุณมักรู้สึกอย่างไรคะ?",
        options: [
          { label: "รู้สึกสบายใจตามปกติ", score: 0 },
          { label: "มีแอบเปรียบเทียบหรือรู้สึกหมดพลังหลังเข้าสังคมบ้าง", score: 1 },
          { label: "มักกังวลว่าคนอื่นจะคิดอย่างไรกับเราจนไม่เป็นตัวเอง", score: 2 },
          { label: "รู้สึกเหงาและแปลกแยกอย่างรุนแรงแม้จะมีคนอยู่รอบข้าง", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "เรื่องเพื่อนหรือสังคมส่งผลต่อความมั่นใจและอารมณ์ในแต่ละวันของคุณแค่ไหนคะ?",
        options: [
          { label: "กระทบเล็กน้อย ยังมั่นใจและทำสิ่งต่าง ๆ ได้ปกติ", score: 0 },
          { label: "เก็บคำพูดหรือท่าทีของคนอื่นมาคิดทบทวนในบางวัน", score: 1 },
          { label: "คิดมากซ้ำ ๆ โทษตัวเอง หรือกังวลจนไม่อยากไปเรียน/ไปทำงาน", score: 2 },
          { label: "บั่นทอนจิตใจอย่างหนักจนเศร้า นอนไม่หลับ หรือเก็บตัวเงียบ", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "ตอนนี้คุณมีเพื่อนหรือคนคุ้นเคยที่อยู่ด้วยแล้วเป็นตัวเองได้สบายใจบ้างไหมคะ?",
        options: [
          { label: "มีเพื่อนที่สบายใจและรับฟังกันอยู่", score: 0 },
          { label: "พอมีบ้าง แต่ช่วงนี้ต่างคนต่างยุ่งเลยไม่ค่อยได้คุย", score: 1 },
          { label: "รู้สึกว่าคุยได้แค่เรื่องผิวเผิน ไม่กล้าเปิดใจเรื่องลึก ๆ", score: 2 },
          { label: "รู้สึกว่าไม่มีใครที่เปิดใจคุยได้อย่างปลอดภัยเลย", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "วันนี้อยากให้น้องมุกห่วงใยอยู่เป็นเพื่อนคุยแบบไหนดีคะ?",
        options: [
          { label: "เป็นเพื่อนรับฟังเรื่องที่เจอมาอย่างสบาย ๆ ไม่ตัดสิน", score: 0 },
          { label: "ช่วยทบทวนความรู้สึกและขอบเขตที่สบายใจในการคบเพื่อน", score: 1 },
          { label: "ช่วยเติมความมั่นใจและดูแลใจเวลาถูกเปรียบเทียบ", score: 2 },
          { label: "อยู่เป็นเพื่อนคลายความเหงาและความอึดอัดในใจตอนนี้", score: 3 },
        ],
      },
    ],
  },
  self: {
    key: "self",
    labelTh: "ตัวเองและคุณค่าในตัวเอง",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ดีใจที่คุณแวะมาพักใจและกลับมาฟังเสียงข้างในตัวเองนะคะ มาค่อย ๆ สำรวจความรู้สึกต่อตัวเองผ่าน 5 คำถามอ่อนโยนกันก่อนค่ะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: ตัวเองและคุณค่าในตัวเอง)
- รับฟังความสับสน ความเหนื่อยล้าในการเติบโต ความไม่มั่นใจ หรือการตำหนิตัวเองด้วยความเมตตาอย่างยิ่ง
- ห้ามใช้คำพูดเปรียบเทียบ กดดันให้ต้องคิดบวกแบบฝืนความรู้สึก (No Toxic Positivity) หรือตัดสินเส้นทางชีวิตของผู้ใช้
- ส่งเสริมความเมตตาต่อตนเอง (Self-Compassion) และการยอมรับอารมณ์ตามความเป็นจริงอย่างอ่อนโยน`,
    questions: [
      {
        questionNo: 1,
        questionText: "ช่วงนี้เวลามองกลับมาที่ตัวเอง ความรู้สึกไหนชัดเจนที่สุดในใจคุณคะ?",
        options: [
          { label: "อยากเข้าใจตัวเองและดูแลใจตัวเองให้ดีขึ้น", score: 0 },
          { label: "รู้สึกสับสนกับเป้าหมายหรือทิศทางชีวิตข้างหน้า", score: 1 },
          { label: "รู้สึกว่าตัวเองยังดีไม่พอ หรือเหนื่อยกับการต้องเก่งอยู่ตลอด", score: 2 },
          { label: "ผิดหวังในตัวเองอย่างหนัก รู้สึกไร้ค่า หรือว่างเปล่าข้างใน", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "เวลาที่ทำบางอย่างผิดพลาดหรือไม่ได้ดั่งใจ คุณมักพูดกับตัวเองในใจอย่างไรคะ?",
        options: [
          { label: "บอกตัวเองว่าไม่เป็นไร ค่อยเริ่มใหม่ได้", score: 0 },
          { label: "แอบหงุดหงิดตัวเองนิดหน่อย แต่สักพักก็ปล่อยผ่านได้", score: 1 },
          { label: "มักตำหนิตัวเองซ้ำ ๆ และลืมมองสิ่งที่ตัวเองทำได้ดี", score: 2 },
          { label: "ใจร้ายและกล่าวโทษตัวเองรุนแรงมากจนจมอยู่กับความรู้สึกผิดนาน ๆ", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "ในช่วง 1-2 สัปดาห์นี้ คุณยังพอรู้สึกเพลิดเพลินกับสิ่งเล็ก ๆ รอบตัวได้บ้างไหมคะ?",
        options: [
          { label: "ยังมีความสุขกับของอร่อย เพลง หรือสิ่งที่ชอบได้ตามปกติ", score: 0 },
          { label: "ยังพอรู้สึกดีได้บ้าง แต่เหนื่อยง่ายกว่าเดิม", score: 1 },
          { label: "เริ่มรู้สึกเฉยชา เบื่อหน่าย แม้กับสิ่งที่เคยชอบทำ", score: 2 },
          { label: "แทบไม่รู้สึกยินดียินร้ายกับอะไรเลย รู้สึกหนักอึ้งทุกวัน", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "คุณได้อนุญาตให้ตัวเองได้พักหรืออ่อนแอบ้างโดยไม่ต้องสมบูรณ์แบบไหมคะ?",
        options: [
          { label: "อนุญาตให้ตัวเองพักและยอมรับความอ่อนแอได้", score: 0 },
          { label: "พยายามอยู่ แต่บางทีก็ยังฝืนเข้มแข็ง", score: 1 },
          { label: "ไม่ค่อยกล้าอ่อนแอ ต้องแสดงว่าไหวให้คนอื่นเห็นเสมอ", score: 2 },
          { label: "ฝืนแบกทุกอย่างไว้จนเหนื่อยล้าไปหมดแต่ไม่กล้าวางลงเลย", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "วันนี้คุณอยากให้น้องมุกห่วงใยอยู่เคียงข้างตัวคุณอย่างไรดีคะ?",
        options: [
          { label: "ชวนคุยสำรวจความรู้สึกข้างในอย่างอ่อนโยน", score: 0 },
          { label: "ช่วยฝึกใจดีกับตัวเองให้มากขึ้นในวันที่เหนื่อย", score: 1 },
          { label: "รับฟังความสับสนโดยไม่ต้องรีบสรุปหรือตัดสิน", score: 2 },
          { label: "เป็นพื้นที่ปลอดภัยที่ได้ถอดเกราะความเข้มแข็งออกสักพัก", score: 3 },
        ],
      },
    ],
  },
  sleep: {
    key: "sleep",
    labelTh: "การนอนและการพักผ่อน",
    greetingTh:
      "สวัสดีค่ะ น้องมุกห่วงใยจาก PhuenJaiZone ยินดีอยู่เป็นเพื่อนคุยเบา ๆ เรื่องการนอนและการพักผ่อนของคุณนะคะ มาเริ่มสำรวจรูปแบบการพักผ่อนช่วงนี้ผ่าน 5 คำถามสั้น ๆ กันค่ะ",
    guardrailPrompt: `
# TOPIC-SPECIFIC GUARDRAILS (หัวข้อ: การนอนและการพักผ่อน)
- รับฟังปัญหาการนอนหลับยาก หลับ ๆ ตื่น ๆ คิดมากก่อนนอน หรือความอ่อนเพลียสะสมด้วยความเข้าใจ
- ห้ามแนะนำยานอนหลับ ยาคลายกังวล เมลาโทนิน สมุนไพร หรืออาหารเสริมทุกชนิดโดยเด็ดขาด (สอดคล้องกฎ NO MEDICATION)
- เน้นการสำรวจความเครียดก่อนเข้านอน และสุขอนามัยการนอนเบื้องต้นที่ปลอดภัย (Sleep Hygiene) เช่น การผ่อนคลายลมหายใจ ลดสิ่งกระตุ้นก่อนนอน และหากกระทบชีวิตหนักต่อเนื่องให้แนะนำปรึกษาบุคลากรทางการแพทย์`,
    questions: [
      {
        questionNo: 1,
        questionText: "ช่วงนี้ปัญหาเรื่องการนอนหรือการพักผ่อนที่คุณเจอบ่อยที่สุดเป็นแบบไหนคะ?",
        options: [
          { label: "เข้านอนดึกเป็นบางวัน อยากจัดเวลาพักผ่อนให้ดีขึ้น", score: 0 },
          { label: "ใช้เวลานานกว่าจะหลับ เพราะสมองยังคิดเรื่องต่าง ๆ", score: 1 },
          { label: "หลับ ๆ ตื่น ๆ กลางดึก ฝันบ่อย หรือตื่นมาแล้วยังเพลียมาก", score: 2 },
          { label: "นอนไม่หลับแทบทั้งคืนติดต่อกันหลายวันจนร่างกายและใจล้าหนัก", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "ช่วงเวลาก่อนเข้านอน มักมีเรื่องอะไรเข้ามาวนเวียนในความคิดของคุณไหมคะ?",
        options: [
          { label: "ไม่ค่อยมีเรื่องกังวล แค่เผลอไถหน้าจอเพลิน", score: 0 },
          { label: "ทบทวนเรื่องที่ต้องทำพรุ่งนี้จนสมองตื่นตัว", score: 1 },
          { label: "คิดวนเรื่องความเครียดหรือเรื่องที่ผ่านไปแล้วหยุดคิดยาก", score: 2 },
          { label: "รู้สึกกังวล เศร้า หรือกลัวการเข้านอนเพราะรู้ว่าจะหลับยาก", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "การพักผ่อนไม่เต็มที่ส่งผลต่ออารมณ์และพลังงานตอนกลางวันของคุณแค่ไหนคะ?",
        options: [
          { label: "ง่วงเล็กน้อยช่วงบ่าย แต่ยังทำงานหรือเรียนได้ปกติ", score: 0 },
          { label: "เริ่มเพลีย สมาธิสั้นลง หรือหงุดหงิดง่ายขึ้นบ้าง", score: 1 },
          { label: "สมองตื้อ เหนื่อยล้าสะสม จนทำกิจวัตรประจำวันได้ลำบาก", score: 2 },
          { label: "หมดแรงทั้งวัน อารมณ์ดิ่งง่าย และกระทบการใช้ชีวิตอย่างมาก", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "ก่อนเข้านอนประมาณ 30-60 นาที บรรยากาศการพักของคุณเป็นอย่างไรบ้างคะ?",
        options: [
          { label: "ห้องเงียบสงบและค่อย ๆ ผ่อนคลายก่อนนอนได้", score: 0 },
          { label: "ยังดูมือถือหรือทำงานติดพันจนถึงเวลาเข้านอน", score: 1 },
          { label: "สภาพแวดล้อมไม่ค่อยเอื้อต่อการพัก หรือเวลานอนไม่เป็นเวลาเลย", score: 2 },
          { label: "ทั้งร่างกายตึงเครียดและใจว้าวุ่นจนไม่สามารถผ่อนคลายได้เลย", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "วันนี้คุณอยากให้น้องมุกห่วงใยช่วยดูแลเรื่องการพักผ่อนของคุณในมุมไหนดีคะ?",
        options: [
          { label: "ช่วยรับฟังเรื่องกังวลที่ทำให้สมองไม่ยอมพัก", score: 0 },
          { label: "ชวนออกแบบกิจวัตรผ่อนคลายเบา ๆ ก่อนเข้านอน", score: 1 },
          { label: "ช่วยคลายความกดดันเวลาที่ข่มตาหลับไม่ได้", score: 2 },
          { label: "อยู่เป็นเพื่อนคุยอย่างสงบและอบอุ่นให้ใจค่อย ๆ ผ่อนคลาย", score: 3 },
        ],
      },
    ],
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

const BASE_SYSTEM_PROMPT = `
# ROLE AND PERSONA
คุณคือ "น้องมุกห่วงใย" ผู้ช่วยรับฟัง (Empathetic Listener) บนแพลตฟอร์มดูแลสุขภาพจิตออนไลน์ 'PhuenJaiZone'
บุคลิก: อบอุ่น เป็นมิตร รับฟังอย่างตั้งใจ ไม่ตัดสิน (Non-judgmental) ใช้ภาษาเข้าใจง่าย
Introduce yourself as a chatbot from 'PhuenJaiZone', a safe space ready to listen. Example greeting: 'สวัสดีค่ะ ฉันคือแชทบอทจาก PhuenJaiZone พื้นที่ปลอดภัยที่พร้อมรับฟังคุณ วันนี้คุณรู้สึกอย่างไรบ้างคะ?'
เป้าหมาย: รับฟังและสะท้อนความรู้สึกอย่างเข้าใจ ชวนพูดคุยสำรวจอารมณ์ผ่านชีวิตประจำวันอย่างเป็นธรรมชาติเพื่อประคองใจและคัดกรองความเสี่ยงเบื้องต้น

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
        )
      : BASE_SYSTEM_PROMPT;
  if (!topic || !isValidTopic(topic)) {
    return basePrompt;
  }
  const config = CHAT_TOPICS[topic];
  return `${basePrompt}\n${config.guardrailPrompt}\n`;
};

export interface AIResponse {
  reply_message: string;
  assessment_status: "IN_PROGRESS" | "COMPLETED";
  severity_level: "PENDING" | "MILD" | "MODERATE" | "SEVERE";
  suggested_category: "SLEEP" | "STRESS" | "BURNOUT" | "NONE";
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

// ตรวจสอบคำสัญญาณวิกฤตเบื้องต้น (เสริมความปลอดภัยระหว่างช่วงคำถาม 5 ข้อแรก)
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
];

export const hasCrisisSignal = (text: string): boolean => {
  if (!text) return false;
  const normalized = text.trim();
  return CRISIS_PATTERNS.some((keyword) => normalized.includes(keyword));
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
  };
};

export const generateChatResponse = async (
  messagesArray: { role: "system" | "user" | "assistant"; content: string }[],
  topic?: string | null,
  locale: "th" | "en" = "th"
): Promise<AIResponse> => {
  try {
    const formattedMessages: any[] = [
      { role: "system", content: SYSTEM_PROMPT(topic, locale) },
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
  locale: "th" | "en" = "th"
): Promise<SessionSummaryResult> => {
  const topicConfig = getTopicConfig(topic);
  const languageRule =
    locale === "en"
      ? "4. LANGUAGE: Respond in English only. Do not mix Thai."
      : "4. LANGUAGE: ตอบกลับเป็นภาษาไทยเท่านั้น ห้ามใช้ภาษาอังกฤษปะปน";

  const summarySystemPrompt = `
คุณคือ "น้องมุกห่วงใย" ผู้ช่วยรับฟังจาก PhuenJaiZone ทำหน้าที่สรุปบทสนทนาและให้คำแนะนำการดูแลใจเบื้องต้นหลังจบการสนทนาในหัวข้อ "${topicConfig.labelTh}"

# STRICT MEDICAL GUARDRAILS (กฎเหล็ก)
1. ห้ามวินิจฉัยโรค (NO DIAGNOSIS): ห้ามระบุชื่อโรคจิตเวชใดๆ ให้ใช้คำว่า "ความเครียดสะสม" หรือ "ความเหนื่อยล้าทางอารมณ์"
2. ห้ามสั่งยา (NO MEDICATION): ห้ามแนะนำให้รับประทานยา สมุนไพร หรืออาหารเสริมใดๆ โดยเด็ดขาด
3. NO RAW SCORES: ห้ามแสดงตัวเลขคะแนนดิบ คะแนนรวม หรือเกณฑ์ตัวเลขใดๆ ในข้อความเด็ดขาด
${languageRule}
${topicConfig.guardrailPrompt}

# OUTPUT FORMAT (JSON ONLY)
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
โดยให้มี actionable_steps จำนวน 3 ข้อ ที่สอดคล้องกับเรื่องราวที่ผู้ใช้เล่าจริง ๆ
`;

  const answersSummary =
    answers.length > 0
      ? answers
          .map((a) => `ข้อ ${a.questionNo}: ${a.questionText}\nคำตอบผู้ใช้: ${a.answerText}`)
          .join("\n\n")
      : "ไม่มีข้อมูลคำตอบเริ่มต้น";

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
          content: `หัวข้อที่เลือก: ${topicConfig.labelTh}\n\n[คำตอบ 5 ข้อแรก]\n${answersSummary}\n\n[บทสนทนา]\n${recentDialogue}`,
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
