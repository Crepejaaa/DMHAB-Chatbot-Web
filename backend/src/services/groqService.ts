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

export const CHAT_TOPICS_EN: Record<
  ChatTopicKey,
  {
    labelEn: string;
    greetingEn: string;
    questionsEn: TopicQuestion[];
  }
> = {
  love: {
    labelEn: "Love & Relationships",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm here as a safe space to listen to your feelings about love and relationships. Before we dive into a deeper conversation, let's gently explore how you're feeling through 5 short questions.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "What aspect of your relationship has been weighing on your mind the most lately?",
        options: [
          { label: "Just a few small things on my mind, we still understand each other", score: 0 },
          { label: "Starting to feel some distance or miscommunication", score: 1 },
          { label: "Frequent arguments or tension that leave me feeling drained", score: 2 },
          { label: "Deep heartbreak, pain, or feeling very lonely in the relationship", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "Over the past 1–2 weeks, how often has this been on your mind?",
        options: [
          { label: "Only occasionally when something triggers it", score: 0 },
          { label: "From time to time on certain days", score: 1 },
          { label: "Almost every day, making it hard to focus on other things", score: 2 },
          { label: "Nearly all the time until I feel emotionally exhausted", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "Has relationship stress affected your sleep, appetite, or daily routine?",
        options: [
          { label: "I can still eat, rest, and go about my day normally", score: 0 },
          { label: "A bit tired or having trouble falling asleep on some nights", score: 1 },
          { label: "Trouble sleeping, loss of appetite, or losing motivation", score: 2 },
          { label: "Heavily impacting my daily life, crying or feeling exhausted almost daily", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "Do you currently have a safe space or someone you trust to talk to about this?",
        options: [
          { label: "Yes, I have someone I trust and can talk to anytime", score: 0 },
          { label: "A little, but I don't feel comfortable sharing everything", score: 1 },
          { label: "Hardly anyone I can talk to about this", score: 2 },
          { label: "Keeping it all to myself and feeling like no one understands", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "For our conversation today, how would you like Nong Mook Huang Yai to support you most?",
        options: [
          { label: "Listen quietly and reflect my feelings with empathy", score: 0 },
          { label: "Help me gently organize my thoughts and needs", score: 1 },
          { label: "Share gentle perspectives on caring for my heart right now", score: 2 },
          { label: "Let me vent what's bottled up inside so I can feel lighter", score: 3 },
        ],
      },
    ],
  },
  study: {
    labelEn: "Studies & Exams",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone, ready to listen to the academic pressure and study challenges you're facing. Let's start by gently exploring how you feel through 5 short questions.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "Which part of your studies is making you feel the most stressed right now?",
        options: [
          { label: "A lot of coursework, but I can still manage it", score: 0 },
          { label: "Worried about upcoming exams, grades, or deadlines", score: 1 },
          { label: "Feeling behind, exhausted, or pressured by high expectations", score: 2 },
          { label: "Feeling stuck, burned out, or so afraid of failing that I can't start", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "When you think about your studies lately, how do your body and mind respond?",
        options: [
          { label: "A little alert, but I can still rest normally", score: 0 },
          { label: "Feeling tense or tired when I have to study or work on assignments", score: 1 },
          { label: "Racing heart, built-up stress, or feeling guilty whenever I take a break", score: 2 },
          { label: "Severe stress causing headaches, insomnia, or deep discouragement", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "How often does academic pressure make you blame or criticize yourself?",
        options: [
          { label: "Rarely—I can still encourage myself", score: 0 },
          { label: "Sometimes I compare myself to classmates", score: 1 },
          { label: "I often feel like I'm not trying hard enough", score: 2 },
          { label: "I feel inadequate or worthless whenever I fall short of my goals", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "Do you get time each day to rest your mind or enjoy hobbies without feeling guilty?",
        options: [
          { label: "Yes, I have a fairly balanced routine with time to rest", score: 0 },
          { label: "Short breaks, though my mind still worries about unfinished work", score: 1 },
          { label: "Hardly any rest because tasks feel piled up all the time", score: 2 },
          { label: "Too exhausted or afraid to rest—I can't focus on studying or relaxing", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "How would you like Nong Mook Huang Yai to support you with your studies today?",
        options: [
          { label: "Listen to my study fatigue without judgment", score: 0 },
          { label: "Help break down my worries into small, manageable steps", score: 1 },
          { label: "Help me ease the pressure before getting back on track", score: 2 },
          { label: "Keep me company and comfort me on an overwhelming day", score: 3 },
        ],
      },
    ],
  },
  work: {
    labelEn: "Work & Workload",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. Welcome to a safe space where you can set down your work fatigue for a while. Let's start with 5 short questions to understand what you've been going through.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "What aspect of work has been draining your energy the most lately?",
        options: [
          { label: "Busy periods from time to time, but still manageable", score: 0 },
          { label: "Continuous urgent deadlines or juggling many responsibilities", score: 1 },
          { label: "Workplace atmosphere, colleagues, or heavy expectations", score: 2 },
          { label: "Chronic burnout and exhaustion—I dread waking up for work", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "After work hours or on days off, are you able to disconnect from work thoughts?",
        options: [
          { label: "Yes, I can disconnect and rest well", score: 0 },
          { label: "I still check messages or think about work occasionally", score: 1 },
          { label: "My mind keeps spinning with work even after hours", score: 2 },
          { label: "I barely get any mental rest—worrying about work from bedtime until morning", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "How has work stress been affecting your body and emotions recently?",
        options: [
          { label: "Normal tiredness that improves after resting", score: 0 },
          { label: "Neck/shoulder tension or feeling slightly more irritable", score: 1 },
          { label: "Restless sleep, accumulated fatigue, or frequent mood swings", score: 2 },
          { label: "Deep physical and emotional exhaustion, feeling empty or tearful often", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "Do you have supportive colleagues or people around you who understand and help share the load?",
        options: [
          { label: "Yes, I have a supportive team or people around me", score: 0 },
          { label: "I can discuss some things, but mostly handle it on my own", score: 1 },
          { label: "I feel like I'm carrying almost all expectations alone", score: 2 },
          { label: "I feel isolated and unsafe expressing how I truly feel to anyone", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "How would you like Nong Mook Huang Yai to care for your heart after work today?",
        options: [
          { label: "Be an empathetic listener while I vent about work today", score: 0 },
          { label: "Help separate what I can control from what I can set down", score: 1 },
          { label: "Explore short mental rest practices to recharge my energy", score: 2 },
          { label: "Keep me warm company without rushing to find solutions", score: 3 },
        ],
      },
    ],
  },
  family: {
    labelEn: "Family & Home Life",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone, ready to listen to your feelings about family and home life with warmth and without judgment. Let's gently begin with 5 short questions.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "What kind of family situation is affecting your feelings the most right now?",
        options: [
          { label: "Small everyday disagreements at home", score: 0 },
          { label: "Family expectations or words that make me feel pressured", score: 1 },
          { label: "Frequent emotional clashes, tension, or misunderstandings", score: 2 },
          { label: "Feeling that home isn't an emotionally safe space and having nowhere to rest", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "When misunderstandings happen at home, how do you usually cope with your feelings?",
        options: [
          { label: "Talk it out or let it go after a short while", score: 0 },
          { label: "Step away to a quiet space until emotions cool down", score: 1 },
          { label: "Bottle up my feelings inside for fear of making things worse", score: 2 },
          { label: "Ruminate, feel guilty or hurt, and cry alone frequently", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "How much is family tension affecting your daily emotional energy?",
        options: [
          { label: "Only slightly—I can still do other activities normally", score: 0 },
          { label: "Feels draining at times when heading home or talking with family", score: 1 },
          { label: "Causes built-up stress, trouble sleeping, or wanting to withdraw", score: 2 },
          { label: "Heavily drains me until I feel emotionally exhausted all the time", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "Do you have a quiet personal corner or activity that gives your heart a break from home tension?",
        options: [
          { label: "Yes, I have personal space and ways to recharge", score: 0 },
          { label: "I get some private time during parts of the day", score: 1 },
          { label: "Personal space is hard to find; I often feel watched or interrupted", score: 2 },
          { label: "No safe space to rest at all—I feel tense around the clock", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "How would you like Nong Mook Huang Yai to walk alongside you regarding family today?",
        options: [
          { label: "Listen to my family story without judging anyone", score: 0 },
          { label: "Help reflect and validate the feelings I've been holding inside", score: 1 },
          { label: "Brainstorm gentle boundaries and small pockets of peace for myself", score: 2 },
          { label: "Be a safe space where I can let out this heaviness comfortably", score: 3 },
        ],
      },
    ],
  },
  money: {
    labelEn: "Finances & Expenses",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I truly understand how overwhelming financial stress and expenses can feel. Let's gently walk through 5 short questions in this judgment-free space.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "What aspect of your finances has been worrying you the most lately?",
        options: [
          { label: "Wanting to plan my income and expenses more carefully", score: 0 },
          { label: "Tighter budget lately, needing to be extra cautious with spending", score: 1 },
          { label: "Ongoing bills or debt obligations causing stress every month", score: 2 },
          { label: "Feeling completely overwhelmed by financial worry to the point of losing sleep or appetite", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "How often do financial worries interrupt your peace of mind or focus each day?",
        options: [
          { label: "Only when paying bills or planning my budget", score: 0 },
          { label: "Worrying on and off several days a week", score: 1 },
          { label: "Anxious most of the day; seeing balances or expenses makes my heart sink", score: 2 },
          { label: "Constant rumination causing panic, exhaustion, or heavy self-blame", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "Has financial stress been affecting your physical health, rest, or relationships?",
        options: [
          { label: "Not affecting my daily routine or rest yet", score: 0 },
          { label: "Avoiding social outings or cutting back until I feel tense", score: 1 },
          { label: "Trouble sleeping, accumulated stress, or tension with loved ones over money", score: 2 },
          { label: "Heavily impacting my sleep, health, and making me feel too ashamed to tell anyone", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "When financial stress hits, do you have someone who listens or helps you stay grounded?",
        options: [
          { label: "Yes, family or someone I trust whom I can consult", score: 0 },
          { label: "I share a little, but hesitate because I don't want others to worry", score: 1 },
          { label: "Afraid to tell anyone for fear of being judged or blamed", score: 2 },
          { label: "Carrying the entire burden alone until it feels too heavy", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "For our chat today, how can Nong Mook Huang Yai best support your heart around finances?",
        options: [
          { label: "Listen empathetically to my financial stress without judgment", score: 0 },
          { label: "Help me calm my mind and organize what's right in front of me step by step", score: 1 },
          { label: "Help me care for my emotions so I don't blame myself too harshly", score: 2 },
          { label: "Let me vent the heavy burden I've been holding for so long", score: 3 },
        ],
      },
    ],
  },
  friends: {
    labelEn: "Friends & Social Life",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm glad to listen to your thoughts about friends and social life—whether you're feeling lonely, socially drained, or troubled. Let's start with 5 short questions.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "How have friendships or social interactions been making you feel lately?",
        options: [
          { label: "A small misunderstanding or slight distance", score: 0 },
          { label: "Tired from trying to fit in or worrying too much about pleasing friends", score: 1 },
          { label: "Feeling left out, overlooked, or having a conflict with a close friend", score: 2 },
          { label: "Feeling deeply lonely, hurt by others' words, or wanting to withdraw completely", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "When you're around people or scrolling through social media, how do you usually feel?",
        options: [
          { label: "Comfortable and at ease as usual", score: 0 },
          { label: "Occasionally comparing myself or feeling drained after socializing", score: 1 },
          { label: "Worrying so much about what others think that I can't be myself", score: 2 },
          { label: "Feeling intensely lonely and disconnected even when surrounded by people", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "How much do friendship or social issues affect your confidence and daily mood?",
        options: [
          { label: "Only slightly—I still feel confident in my daily life", score: 0 },
          { label: "Replaying others' words or reactions in my head on some days", score: 1 },
          { label: "Overthinking repeatedly, blaming myself, or dreading school/work", score: 2 },
          { label: "Deeply shaken, feeling sad, unable to sleep, or isolating myself", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "Right now, do you have a friend or someone around whom you can comfortably be yourself?",
        options: [
          { label: "Yes, I have friends who listen and make me feel comfortable", score: 0 },
          { label: "A few, though everyone has been too busy to talk lately", score: 1 },
          { label: "Only surface-level chats—I don't feel safe opening up deeply", score: 2 },
          { label: "I feel like there is no one I can safely open my heart to", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "How would you like Nong Mook Huang Yai to be a friend to you today?",
        options: [
          { label: "Listen warmly and non-judgmentally to what I've been experiencing", score: 0 },
          { label: "Help me reflect on my feelings and healthy boundaries in friendships", score: 1 },
          { label: "Help rebuild my confidence and care for my heart when comparing myself", score: 2 },
          { label: "Keep me company to ease the loneliness and heaviness right now", score: 3 },
        ],
      },
    ],
  },
  self: {
    labelEn: "Self & Self-Worth",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm glad you stopped by to rest your heart and listen to your inner voice. Let's gently explore how you feel about yourself through 5 caring questions.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "When you look inward at yourself lately, what feeling stands out the most?",
        options: [
          { label: "Wanting to understand myself and care for my heart better", score: 0 },
          { label: "Feeling uncertain or lost about my goals and life direction", score: 1 },
          { label: "Feeling like I'm never good enough or tired of having to be strong all the time", score: 2 },
          { label: "Deeply disappointed in myself, feeling worthless or exhausted with life", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "When mistakes happen or things don't go as planned, how do you usually speak to yourself?",
        options: [
          { label: "I can console myself and see it as a learning experience", score: 0 },
          { label: "A bit frustrated at first, then I gradually let it go", score: 1 },
          { label: "I tend to criticize myself harshly and replay my mistakes", score: 2 },
          { label: "I blame myself completely and feel like I'm a failure at everything", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "How much joy or fulfillment have you been feeling in your daily life recently?",
        options: [
          { label: "Still finding small moments of joy in everyday things", score: 0 },
          { label: "Still okay at times, but getting tired more easily than before", score: 1 },
          { label: "Starting to feel numb or uninterested even in things I used to enjoy", score: 2 },
          { label: "Hardly feeling joy in anything at all—every day feels heavy", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "Have you allowed yourself to rest or be vulnerable without having to be perfect?",
        options: [
          { label: "Yes, I allow myself to rest and accept my vulnerability", score: 0 },
          { label: "I try to, though sometimes I still force myself to stay strong", score: 1 },
          { label: "I rarely let myself be vulnerable—I feel I must always look fine to others", score: 2 },
          { label: "I force myself to carry everything until I'm exhausted, unable to set it down", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "How would you like Nong Mook Huang Yai to be by your side today?",
        options: [
          { label: "Gently explore my inner feelings together", score: 0 },
          { label: "Help me practice being kinder to myself on exhausting days", score: 1 },
          { label: "Listen to my confusion without rushing to conclusions or judgment", score: 2 },
          { label: "Be a safe space where I can take off my armor of strength for a while", score: 3 },
        ],
      },
    ],
  },
  sleep: {
    labelEn: "Sleep & Rest",
    greetingEn:
      "Hello! I'm Nong Mook Huang Yai from PhuenJaiZone. I'm here for a calm, gentle chat about your sleep and rest. Let's explore your recent rest patterns through 5 short questions.",
    questionsEn: [
      {
        questionNo: 1,
        questionText: "What kind of sleep or rest difficulty have you been experiencing most often lately?",
        options: [
          { label: "Staying up late on some nights and wanting a better sleep routine", score: 0 },
          { label: "Taking a long time to fall asleep because my mind keeps racing", score: 1 },
          { label: "Waking up frequently during the night, vivid dreams, or waking up exhausted", score: 2 },
          { label: "Barely sleeping through the night for days, leaving body and mind exhausted", score: 3 },
        ],
      },
      {
        questionNo: 2,
        questionText: "Right before bedtime, what usually runs through your mind?",
        options: [
          { label: "Not much worry—just scrolling on my phone a bit too long", score: 0 },
          { label: "Reviewing tomorrow's tasks until my brain feels too alert", score: 1 },
          { label: "Ruminating over stressful events or past worries that are hard to switch off", score: 2 },
          { label: "Feeling anxious, sad, or dreading bedtime because I know I won't sleep", score: 3 },
        ],
      },
      {
        questionNo: 3,
        questionText: "How much is poor rest affecting your daytime mood and energy?",
        options: [
          { label: "Slightly sleepy in the afternoon, but still functioning normally", score: 0 },
          { label: "Feeling fatigued, shorter attention span, or more easily irritable", score: 1 },
          { label: "Brain fog and accumulated exhaustion making daily tasks difficult", score: 2 },
          { label: "Drained all day, low mood, and heavily impacting my daily life", score: 3 },
        ],
      },
      {
        questionNo: 4,
        questionText: "In the 30–60 minutes before bed, what is your wind-down environment like?",
        options: [
          { label: "Quiet, calm room where I can gradually unwind before sleep", score: 0 },
          { label: "Still on my phone or finishing work right up until bedtime", score: 1 },
          { label: "Uncomfortable environment for rest, or a very irregular sleep schedule", score: 2 },
          { label: "Both my body and mind feel too tense and restless to relax at all", score: 3 },
        ],
      },
      {
        questionNo: 5,
        questionText: "How would you like Nong Mook Huang Yai to support your rest today?",
        options: [
          { label: "Listen to the worries that keep my mind from resting", score: 0 },
          { label: "Help design a gentle, relaxing wind-down routine before bed", score: 1 },
          { label: "Help ease the frustration when I can't fall asleep", score: 2 },
          { label: "Keep me calm, warm company so my heart can slowly unwind", score: 3 },
        ],
      },
    ],
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

export const getLocalizedTopicQuestions = (
  topic?: string | null,
  locale: "th" | "en" = "th"
): TopicQuestion[] => {
  const config = getTopicConfig(topic);
  if (locale === "en") {
    return CHAT_TOPICS_EN[config.key]?.questionsEn || CHAT_TOPICS_EN.self.questionsEn;
  }
  return config.questions;
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

// ตรวจสอบคำสัญญาณวิกฤตเบื้องต้น (เสริมความปลอดภัยระหว่างช่วงคำถาม 5 ข้อแรก ทั้งภาษาไทยและภาษาอังกฤษ)
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
คุณคือ "น้องมุกห่วงใย" ผู้ช่วยรับฟังจาก PhuenJaiZone ทำหน้าที่สรุปบทสนทนาและให้คำแนะนำการดูแลใจเบื้องต้นหลังจบการสนทนาในหัวข้อ "${topicConfig.labelTh}"

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
