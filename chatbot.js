/* =============================================
   MINDCARE CHATBOT PAGE - JavaScript Logic
   ============================================= */

/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* =============================================
   CHATBOT
   ============================================= */
const botResponses = {
  เครียด: [
    "ขอบคุณที่เล่าให้ฟังนะคะ &#129329; ความเครียดเป็นเรื่องปกติของชีวิต ลองบอกหนูได้เลยว่าสิ่งที่ทำให้เครียดที่สุดตอนนี้คืออะไรคะ?",
    "เข้าใจเลยค่ะ &#128153; ลองลดความเครียดด้วยวิธีง่ายๆ เช่น หายใจลึกๆ นับ 4-4-4 (หายใจเข้า 4 วินาที กลั้น 4 วินาที หายใจออก 4 วินาที) ช่วยได้มากเลยนะคะ",
  ],
  วิตกกังวล: [
    "รู้สึกวิตกกังวลนั้นไม่สบายเลยนะคะ &#128153; ลองบอกหนูหน่อยได้ไหมคะว่ากังวลเรื่องอะไรอยู่? บางทีการพูดออกมาช่วยให้เบาขึ้นค่ะ",
    "เทคนิค 5-4-3-2-1 ช่วยลดความวิตกกังวลได้ดีค่ะ: มองหา 5 สิ่งรอบตัว, สัมผัส 4 สิ่ง, ฟัง 3 เสียง, ดมกลิ่น 2 อย่าง, ลิ้มรส 1 อย่าง ลองดูนะคะ &#127807;",
  ],
  เศร้า: [
    "ขอบคุณที่ไว้วางใจเล่าให้ฟังนะคะ &#129666; ความเศร้าเป็นสิ่งที่ทุกคนรู้สึกได้ ไม่ต้องกลัวหรืออายเลยค่ะ คุณอยากระบายอะไรเพิ่มเติมไหมคะ?",
    "ในวันที่รู้สึกเศร้า อนุญาตให้ตัวเองรู้สึกได้ค่ะ ไม่ต้องฝืนยิ้ม ลองทำสิ่งที่เคยทำให้รู้สึกดีขึ้นดูนะคะ เช่น ฟังเพลง ดูหนัง หรือคุยกับคนที่รัก &#128154;",
  ],
  นอนไม่หลับ: [
    "นอนไม่หลับมาหลายวันนั้นทรมานมากเลยนะคะ &#128564; มีหลายสาเหตุที่ทำให้นอนหลับยาก เช่น ความเครียด หน้าจอมือถือก่อนนอน หรือกาแฟ ลองเล่าให้ฟังว่าปกติก่อนนอนทำอะไรบ้างได้ไหมคะ?",
    "เทคนิคช่วยนอนหลับค่ะ: งดหน้าจอ 30 นาทีก่อนนอน, ปิดไฟให้มืด, ลองนับหายใจ หรือฟังเสียง ASMR ธรรมชาติ และตื่นนอนเวลาเดิมทุกวันจะช่วยได้มากค่ะ &#127769;",
  ],
  เหนื่อย: [
    "คุณเหนื่อยมาแค่ไหนแล้วคะ? &#128153; ทั้งเหนื่อยกายหรือเหนื่อยใจ? อยากให้เล่าให้ฟังต่อได้เลยค่ะ",
    "เมื่อรู้สึกเหนื่อย ร่างกายและจิตใจกำลังบอกให้พักค่ะ ไม่มีความผิดอะไรในการหยุดพักนะคะ บางครั้งการพักก็คือการก้าวหน้าเช่นกัน &#127807;",
  ],
  โดดเดี่ยว: [
    "รู้สึกโดดเดี่ยวนั้นเจ็บปวดมากนะคะ &#129666; แต่ตอนนี้คุณไม่ได้อยู่คนเดียวแล้วนะคะ หนูอยู่ที่นี่รับฟังคุณค่ะ อยากเล่าให้ฟังเพิ่มเติมไหมคะ?",
  ],
  มีความสุข: [
    "ดีใจมากเลยค่ะที่ได้ยิน! &#127881; วันนี้มีอะไรดีๆ เกิดขึ้นเหรอคะ? อยากฟังเรื่องราวดีๆ ของคุณค่ะ!",
    "ยอดเยี่ยมมากเลยค่ะ! &#128516; ความสุขของคุณทำให้หนูมีความสุขด้วยค่ะ แบ่งปันให้ฟังเพิ่มเติมได้เลยนะคะ!",
  ],
  ผู้เชี่ยวชาญ: [
    "ขอบคุณที่ไว้วางใจนะคะ &#128153; หากต้องการความช่วยเหลือจากผู้เชี่ยวชาญ สามารถติดต่อได้ที่:\n&#128222; **สายด่วนสุขภาพจิต: 1323** (ฟรี ตลอด 24 ชั่วโมง)\n&#127973; **กรมสุขภาพจิต: www.dmh.go.th**\n&#9993; สามารถนัดพบนักจิตวิทยาออนไลน์ได้ผ่านบริการหลายแห่งค่ะ",
  ],
};

const defaultResponses = [
  "ขอบคุณที่เล่าให้ฟังค่ะ &#128154; คุณรู้สึกแบบนี้มานานแค่ไหนแล้วคะ?",
  "หนูฟังอยู่นะคะ &#127807; อยากให้เล่าเพิ่มเติมได้เลยค่ะ ไม่ต้องกลัวว่าจะพูดมากเกินไป",
  "เข้าใจเลยค่ะ &#128153; มีอะไรที่ต้องการความช่วยเหลือเพิ่มเติมไหมคะ?",
  "ขอบคุณที่ไว้วางใจเล่าให้ฟังค่ะ &#129666; ทุกความรู้สึกของคุณมีความสำคัญนะคะ",
  "คุณทำได้ดีมากเลยค่ะที่กล้าพูดถึงความรู้สึก &#10024; อยากให้เล่าต่อได้เลยนะคะ",
];

let messageCount = 0;

function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  for (const [key, responses] of Object.entries(botResponses)) {
    if (msg.includes(key)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return defaultResponses[messageCount % defaultResponses.length];
}

function addMessage(text, isUser = false) {
  const area = document.getElementById('messagesArea');
  const quickPrompts = document.getElementById('quickPrompts');
  if (quickPrompts) quickPrompts.remove();

  const now = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const msgEl = document.createElement('div');
  msgEl.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

  if (isUser) {
    msgEl.innerHTML = `
      <div class="msg-bubble">
        <p>${escapeHtml(text)}</p>
        <small class="msg-time">${now}</small>
      </div>
      <div class="msg-avatar" style="background:var(--primary-bg);border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">👤</div>
    `;
  } else {
    const avatarSrc = 'assets/bot_avatar.jpg';
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    msgEl.innerHTML = `
      <img src="${avatarSrc}" alt="Bot" class="msg-avatar" />
      <div class="msg-bubble">
        <p>${formattedText}</p>
        <small class="msg-time">${now}</small>
      </div>
    `;
  }

  area.appendChild(msgEl);
  area.scrollTop = area.scrollHeight;
  messageCount++;
}

function showTypingIndicator() {
  document.getElementById('typingIndicator').style.display = 'flex';
  const area = document.getElementById('messagesArea');
  area.scrollTop = area.scrollHeight;
}

function hideTypingIndicator() {
  document.getElementById('typingIndicator').style.display = 'none';
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, true);
  input.value = '';
  input.style.height = 'auto';

  showTypingIndicator();
  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    hideTypingIndicator();
    const response = getBotResponse(text);
    addMessage(response, false);
  }, delay);
}

function sendQuickMessage(text) {
  document.getElementById('chatInput').value = text;
  sendMessage();
}

function handleKeyDown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function startNewChat() {
  const area = document.getElementById('messagesArea');
  area.innerHTML = `
    <div class="message bot-message">
      <img src="assets/bot_avatar.jpg" alt="Bot" class="msg-avatar" />
      <div class="msg-bubble">
        <p>สวัสดีค่ะ! &#128075; เริ่มบทสนทนาใหม่แล้วนะคะ วันนี้มีอะไรอยากพูดถึงไหมคะ?</p>
        <small class="msg-time">เพิ่งส่ง</small>
      </div>
    </div>
    <div class="quick-prompts" id="quickPrompts">
      <p class="quick-prompts-label">&#128161; ลองพูดว่า:</p>
      <div class="quick-chips">
        <button class="quick-chip" onclick="sendQuickMessage('วันนี้รู้สึกเครียดมาก')">&#128547; รู้สึกเครียดมาก</button>
        <button class="quick-chip" onclick="sendQuickMessage('อยากได้เทคนิคลดความวิตกกังวล')">&#128543; วิตกกังวล</button>
        <button class="quick-chip" onclick="sendQuickMessage('นอนไม่หลับมาหลายวัน')">&#128564; นอนไม่หลับ</button>
        <button class="quick-chip" onclick="sendQuickMessage('วันนี้รู้สึกดีมาก อยากแชร์ให้ฟัง')">&#128516; มีความสุข</button>
      </div>
    </div>
  `;
  messageCount = 0;
}

/* =============================================
   TOAST NOTIFICATION
   ============================================= */
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =============================================
   HELPER
   ============================================= */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

/* =============================================
   SMOOTH SCROLL for nav links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('open');
    }
  });
});
