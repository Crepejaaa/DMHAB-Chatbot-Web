/* =============================================
   MINDCARE BOT - JavaScript Logic
   Daily Mental Health Assessment Bot
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
   DAILY AFFIRMATIONS
   ============================================= */
const affirmations = [
  "คุณไม่จำเป็นต้องสมบูรณ์แบบทุกวัน แค่พยายามทำดีที่สุดก็เพียงพอแล้ว &#127793;",
  "ความรู้สึกของคุณนั้นถูกต้องและมีความสำคัญ อย่าลืมให้คุณค่ากับตัวเอง &#128154;",
  "ทุกวันเป็นโอกาสใหม่ในการเริ่มต้นดูแลตัวเองให้ดียิ่งขึ้น &#10728;",
  "คุณแข็งแกร่งกว่าที่คิด และห้ามใจร้ายกับตัวเองในวันที่ยาก &#127775;",
  "การพักผ่อนไม่ใช่ความอ่อนแอ แต่คือการดูแลตัวเองอย่างชาญฉลาด &#129488;",
  "ค่อยๆ ก้าวทีละก้าว ไม่ต้องรีบ ชีวิตไม่ใช่การแข่งขัน &#127807;",
  "คุณสมควรได้รับความรักและความเข้าใจ โดยเริ่มจากตัวคุณเองก่อน &#128149;",
];

function loadAffirmation() {
  const today = new Date().getDay();
  const affirmationEl = document.getElementById('affirmationText');
  if (affirmationEl) {
    affirmationEl.textContent = affirmations[today % affirmations.length];
  }
}

/* =============================================
   SCROLLYTELLING JOURNEY CONTROLLER
   ============================================= */
const scrollyData = {
  1: {
    badgeIcon: '&#129504;',
    badgeText: 'Stage 1 of 4 · Identify',
    iconEmoji: '&#128269;',
    title: '1. เท่าทันอารมณ์ (Identify)',
    desc: 'ก้าวแรกสำคัญของการดูแลใจ คือการหยุดสังเกตและยอมรับความรู้สึกที่เกิดขึ้นในปัจจุบันโดยไม่ตัดสิน',
    progress: 25,
    progressText: 'ความคืบหน้าการสำรวจใจ 25%',
    glow: 'radial-gradient(circle, rgba(14,164,122,0.16) 0%, transparent 70%)',
  },
  2: {
    badgeIcon: '&#128172;',
    badgeText: 'Stage 2 of 4 · Express',
    iconEmoji: '&#128172;',
    title: '2. ระบายและปลดปล่อย (Express)',
    desc: 'ปลดปล่อยความตึงเครียดผ่านการจดบันทึกความรู้สึก หรือเปิดใจพูดคุยกับผู้ช่วย MindCare AI',
    progress: 50,
    progressText: 'ความคืบหน้าการระบายความรู้สึก 50%',
    glow: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
  },
  3: {
    badgeIcon: '&#129488;',
    badgeText: 'Stage 3 of 4 · Restore',
    iconEmoji: '&#129488;',
    title: '3. ฟื้นฟูและเยียวยา (Restore)',
    desc: 'ทำกิจกรรมดูแลตัวเองด่วน (Self-Care Checklist) เติมน้ำ นอนหลับ พักสายตา เพื่อคืนสมดุลให้ร่างกายและจิตใจ',
    progress: 75,
    progressText: 'ความคืบหน้าการฟื้นฟูพลังใจ 75%',
    glow: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
  },
  4: {
    badgeIcon: '&#127775;',
    badgeText: 'Stage 4 of 4 · Thrive',
    iconEmoji: '&#127775;',
    title: '4. เติบโตอย่างเข้มแข็ง (Thrive)',
    desc: 'สร้างภูมิคุ้มกันทางอารมณ์ที่ยั่งยืน มีสติและพร้อมเผชิญหน้ากับความท้าทายด้วยพลังใจที่เต็มเปี่ยม',
    progress: 100,
    progressText: 'สุขภาวะทางใจสมบูรณ์แบบ 100%',
    glow: 'radial-gradient(circle, rgba(255,217,138,0.25) 0%, transparent 70%)',
  },
};

function initScrollytelling() {
  const steps = document.querySelectorAll('.scrolly-step-item');
  if (!steps.length) return;

  const scrollyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stepNum = entry.target.dataset.step;
        steps.forEach(s => s.classList.remove('active'));
        entry.target.classList.add('active');
        updateScrollyDisplay(stepNum);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-10% 0px -30% 0px'
  });

  steps.forEach(step => scrollyObserver.observe(step));
}

function updateScrollyDisplay(stepNum) {
  const data = scrollyData[stepNum];
  if (!data) return;

  const badgeIcon = document.getElementById('scrollyBadgeIcon');
  const badgeText = document.getElementById('scrollyBadgeText');
  const displayImg = document.getElementById('scrollyDisplayImg');
  const title = document.getElementById('scrollyDisplayTitle');
  const desc = document.getElementById('scrollyDisplayDesc');
  const fill = document.getElementById('scrollyProgressFill');
  const progressText = document.getElementById('scrollyProgressText');
  const glow = document.getElementById('scrollyGlow');

  if (badgeIcon) badgeIcon.textContent = data.badgeIcon;
  if (badgeText) badgeText.textContent = data.badgeText;
  if (displayImg) displayImg.textContent = data.iconEmoji;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (fill) fill.style.width = `${data.progress}%`;
  if (progressText) progressText.textContent = data.progressText;
  if (glow) glow.style.background = data.glow;
}

/* =============================================
   MENTAL HEALTH FORTUNE CARDS (สุ่มดวงสุขภาพจิต)
   ============================================= */
const fortuneCards = [
  {
    cat: 'positive',
    badge: 'พลังบวกเต็มเปี่ยม',
    title: 'ไพ่แห่งพลังรุ่งอรุณ',
    emoji: '&#127805;',
    message: 'วันนี้แสงสว่างแห่งความคิดบวกจะส่องไสวในจิตใจ สิ่งที่คุณพยายามมาตลอดกำลังส่งผลดี จงภูมิใจในก้าวเล็กๆ ของคุณ!',
    tip: 'เปิดรับสิ่งใหม่ๆ ยิ้มให้กับตัวเองในกระจก แล้วพูดคำว่า "ฉันทำได้ดีมากแล้ว"'
  },
  {
    cat: 'positive',
    badge: 'พลังแห่งความสุข',
    title: 'ไพ่ทุ่งดอกไม้เบ่งบาน',
    emoji: '&#127803;',
    message: 'ใจของคุณพร้อมสำหรับความรื่นรมย์ เสียงหัวเราะและความเบิกบานจะเข้ามาเติมเต็มวันของคุณอย่างไม่คาดฝัน',
    tip: 'แชร์รอยยิ้มหรือคำชมสั้นๆ ให้กับคนที่คุณพบเจอในวันนี้'
  },
  {
    cat: 'calm',
    badge: 'ความสงบภายใน',
    title: 'ไพ่สายน้ำอันนิ่งสงบ',
    emoji: '&#127818;',
    message: 'ไม่ว่าคลื่นลมภายนอกจะพัดแรงเพียงใด แต่ความสงบเยือกเย็นภายในจิตใจของคุณยังคงมั่นคงและทรงพลังเสมอ',
    tip: 'ใช้เวลา 3 นาทีหลับตา หายใจเข้า-ออกลึกๆ ช้าๆ รู้สึกถึงความสงบที่โอบกอดคุณ'
  },
  {
    cat: 'calm',
    badge: 'ผ่อนคลายและปล่อยวาง',
    title: 'ไพ่สายลมเย็นสบาย',
    emoji: '&#127811;',
    message: 'การปล่อยวางไม่ใช่การยอมแพ้ แต่คือการคืนความสบายใจให้ตัวเอง บางเรื่องที่ควบคุมไม่ได้ ให้สายลมพัดมันผ่านไป',
    tip: 'ถอนหายใจยาวๆ 2-3 ครั้ง เพื่อปล่อยความตึงเครียดออกจากบ่าและหัวไหล่'
  },
  {
    cat: 'growth',
    badge: 'การเติบโตด้านจิตวิญญาณ',
    title: 'ไพ่เมล็ดพันธุ์แข็งแกร่ง',
    emoji: '&#127793;',
    message: 'ต้นไม้ใหญ่เติบโตจากเมล็ดพันธุ์เล็กๆ ความท้าทายที่คุณเผชิญวันนี้กำลังสร้างรากฐานจิตใจที่แข็งแกร่งเกินกว่าที่คุณคิด',
    tip: 'ขอบคุณหนึ่งอุปสรรคในอดีตที่เคยสอนให้คุณเติบโตเป็นคนที่เก่งขึ้นในวันนี้'
  },
  {
    cat: 'growth',
    badge: 'ก้าวข้ามขีดจำกัด',
    title: 'ไพ่นกฟีนิกซ์โผบิน',
    emoji: '&#128981;',
    message: 'คุณมีความสามารถในการฟื้นตัวอย่างอัศจรรย์ วันที่ยากลำบากกำลังผ่านไป และพลังใหม่กำลังตื่นขึ้นในตัวคุณ',
    tip: 'ลองทำกิจกรรมเล็กๆ ที่เคยกลัวด้วยความมั่นใจทีละนิด'
  },
  {
    cat: 'love',
    badge: 'เมตตาและรักตัวเอง',
    title: 'ไพ่หัวใจดวงโต',
    emoji: '&#128154;',
    message: 'คุณเป็นคนที่สมควรได้รับความรัก ความโอบอ้อมอารี และความเข้าใจจากตัวเองมากที่สุดในโลกใบนี้',
    tip: 'โอบกอดตัวเองด้วยสองแขน แล้วบอกตัวเองว่า "ขอบคุณนะที่เข้มแข็งมาได้จนถึงตอนนี้"'
  },
  {
    cat: 'love',
    badge: 'เยียวยาบาดแผลใจ',
    title: 'ไพ่สายน้ำผึ้งเยียวยา',
    emoji: '&#128042;',
    message: 'อ่อนโยนกับหัวใจตัวเองให้มากๆ ในวันนี้ หากรู้สึกเหนื่อยล้า จงอนุญาตให้ตัวเองพักผ่อนโดยไม่มีความรู้สึกผิด',
    tip: 'ชงชาอุ่นๆ หรือฟังเพลงโปรด ละเว้นจากการเปรียบเทียบตัวเองกับผู้อื่น'
  }
];

let selectedCategory = 'all';

function setFortuneCategory(btn, cat) {
  document.querySelectorAll('.fortune-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedCategory = cat;
}

function drawFortuneCard() {
  const drawArea = document.getElementById('fortuneDrawArea');
  const resultArea = document.getElementById('fortuneResult');
  if (!drawArea || !resultArea) return;

  let pool = fortuneCards;
  if (selectedCategory !== 'all') {
    pool = fortuneCards.filter(c => c.cat === selectedCategory);
  }
  const picked = pool[Math.floor(Math.random() * pool.length)];

  const deck = document.getElementById('fortuneDeck');
  if (deck) {
    deck.style.transform = 'scale(0.9) rotate(5deg)';
    setTimeout(() => deck.style.transform = '', 300);
  }

  setTimeout(() => {
    drawArea.style.display = 'none';
    resultArea.style.display = 'block';

    document.getElementById('fortuneResultEmoji').textContent = picked.emoji;
    document.getElementById('fortuneResultEmoji').style.fontSize = '40px';
    document.getElementById('fortuneResultBadge').textContent = picked.badge;
    document.getElementById('fortuneResultTitle').textContent = picked.title;
    document.getElementById('fortuneResultMessage').textContent = picked.message;
    document.getElementById('fortuneResultTip').textContent = picked.tip;

    saveFortuneHistory(picked);
    renderFortuneHistory();
    showToast(`สุ่มได้ "${picked.title}" เรียบร้อยแล้วค่ะ! &#10024;`);
  }, 350);
}

function saveFortuneHistory(item) {
  const history = JSON.parse(localStorage.getItem('fortuneHistory') || '[]');
  const now = new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  history.unshift({
    title: item.title,
    emoji: item.emoji,
    time: now
  });
  if (history.length > 5) history.pop();
  localStorage.setItem('fortuneHistory', JSON.stringify(history));
}

function renderFortuneHistory() {
  const list = document.getElementById('fortuneHistoryList');
  if (!list) return;
  const history = JSON.parse(localStorage.getItem('fortuneHistory') || '[]');
  if (!history.length) {
    list.innerHTML = '<span style="font-size:12px;color:var(--text-muted);">ยังไม่มีประวัติสุ่มดวง</span>';
    return;
  }
  list.innerHTML = history.map(h => `
    <div class="fortune-history-item">
      <span>${h.emoji}</span>
      <span>${h.title}</span>
      <small style="color:var(--text-muted);font-size:10px;">${h.time}</small>
    </div>
  `).join('');
}

function shareFortuneCard() {
  const title = document.getElementById('fortuneResultTitle').textContent;
  const msg = document.getElementById('fortuneResultMessage').textContent;
  const shareText = `&#128302; ดวงสุขภาพจิตวันนี้จาก MindCare Bot:\n"${title}" - ${msg}\nมาสุ่มดวงสุขภาพจิตของคุณได้ที่ MindCare Bot`;

  if (navigator.share) {
    navigator.share({ title: 'ดวงสุขภาพจิตประจำวัน', text: shareText, url: window.location.href });
  } else {
    navigator.clipboard.writeText(shareText);
    showToast('คัดลอกข้อความดวงสุขภาพจิตเรียบร้อยแล้วค่ะ! &#128203;');
  }
}

/* =============================================
   MOOD TRACKER
   ============================================= */
const moodTips = {
  'มีความสุขมาก': 'ยอดเยี่ยมมากค่ะ! แชร์ความสุขนี้กับคนรอบข้างได้เลย &#127775;',
  'สบายดี': 'ดีใจที่ได้ยินค่ะ คงสภาพนี้ต่อไปด้วยการดูแลตัวเองนะคะ &#128522;',
  'เฉยๆ': 'วันที่รู้สึกเฉยๆ ก็โอเคนะคะ ลองทำสิ่งที่ชอบสักเล็กน้อยอาจช่วยได้ค่ะ &#127803;',
  'วิตกกังวล': 'หายใจลึกๆ สัก 3 ครั้ง แล้วค่อยๆ โฟกัสที่สิ่งที่ทำได้ตอนนี้นะคะ &#128153;',
  'เหนื่อยล้า': 'อนุญาตให้ตัวเองพักได้นะคะ ไม่ต้องฝืนทุกอย่างในวันเดียวกัน &#127769;',
  'เศร้า': 'ความเศร้าเป็นเรื่องปกติค่ะ อยู่กับมันสักครู่แล้วค่อยๆ หายใจออก ไม่ต้องสู้คนเดียวนะคะ &#129410;',
  'โกรธ': 'ความโกรธบอกว่ามีบางอย่างสำคัญสำหรับคุณ ลองพักสักครู่ก่อนตัดสินใจอะไรนะคะ &#127788;',
  'กลัว': 'ความกลัวเป็นสัญญาณว่าคุณใส่ใจ ลองคุยกับคนที่ไว้ใจได้เลยนะคะ &#129309;',
};

const moodEmojis = {
  'มีความสุขมาก': '&#128516;', 'สบายดี': '&#128522;', 'เฉยๆ': '&#128528;',
  'วิตกกังวล': '&#128543;', 'เหนื่อยล้า': '&#128532;', 'เศร้า': '&#128546;',
  'โกรธ': '&#128544;', 'กลัว': '&#128560;',
};

let selectedMood = null;

function selectMood(btn) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  selectedMood = btn.dataset.mood;
  const emoji = moodEmojis[selectedMood] || '&#128522;';

  document.getElementById('moodGrid').style.display = 'none';
  const resultEl = document.getElementById('moodResult');
  resultEl.style.display = 'flex';
  document.getElementById('moodResultEmoji').textContent = emoji;
  document.getElementById('moodResultText').textContent = selectedMood;
  document.getElementById('moodTip').textContent = moodTips[selectedMood] || 'ขอบคุณที่แบ่งปันความรู้สึกค่ะ &#128154;';

  saveMoodToHistory(selectedMood, emoji);
  renderMoodWeek();
  showToast(`บันทึกอารมณ์ "${selectedMood}" เรียบร้อยแล้วค่ะ &#128154;`);
}

function resetMood() {
  document.getElementById('moodGrid').style.display = 'grid';
  document.getElementById('moodResult').style.display = 'none';
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  selectedMood = null;
}

function saveMoodToHistory(mood, emoji) {
  const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  const today = new Date().toDateString();
  const idx = history.findIndex(e => e.date === today);
  if (idx >= 0) {
    history[idx] = { date: today, mood, emoji };
  } else {
    history.unshift({ date: today, mood, emoji });
    if (history.length > 7) history.pop();
  }
  localStorage.setItem('moodHistory', JSON.stringify(history));
}

function renderMoodWeek() {
  const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  const weekEl = document.getElementById('moodWeek');
  if (!weekEl) return;

  const days = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
  const today = new Date();
  let html = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayStr = d.toDateString();
    const entry = history.find(e => e.date === dayStr);
    const dayLabel = days[d.getDay()];

    html += `<div class="mood-day">
      <div class="day-label">${dayLabel}</div>
      <div class="day-emoji">${entry ? entry.emoji : '—'}</div>
      <div class="day-text">${entry ? entry.mood.substring(0, 4) : 'ยังไม่ได้'}</div>
    </div>`;
  }
  weekEl.innerHTML = html;
}

/* =============================================
   SELF-CARE CHECKLIST
   ============================================= */
function updateChecklist() {
  const items = document.querySelectorAll('.checklist-item');
  let done = 0;
  items.forEach((item) => {
    const cb = item.querySelector('input[type="checkbox"]');
    if (cb.checked) {
      item.classList.add('done');
      done++;
    } else {
      item.classList.remove('done');
    }
  });

  const total = items.length;
  const progressCircle = document.getElementById('progressCircle');
  const progressText = document.getElementById('progressText');
  if (progressCircle && progressText) {
    const circumference = 150.8;
    const offset = circumference - (done / total) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    progressText.textContent = `${done}/${total}`;
  }

  const msgEl = document.getElementById('checklistMessage');
  if (msgEl) {
    if (done === 0) {
      msgEl.className = 'checklist-message';
      msgEl.innerHTML = '<p>&#128170; เริ่มเช็คสิ่งที่ทำแล้วในวันนี้กันเลย!</p>';
    } else if (done < 4) {
      msgEl.className = 'checklist-message';
      msgEl.innerHTML = `<p>&#127793; ดีมากค่ะ! ทำได้ ${done} อย่างแล้ว ค่อยๆ เพิ่มต่อไปนะคะ</p>`;
    } else if (done < 7) {
      msgEl.className = 'checklist-message';
      msgEl.innerHTML = `<p>&#127775; ใกล้แล้ว! เหลืออีก ${total - done} อย่าง คุณทำได้ค่ะ!</p>`;
    } else {
      msgEl.className = 'checklist-message all-done';
      msgEl.innerHTML = '<p>&#127881; ยอดเยี่ยมมากค่ะ! วันนี้คุณดูแลตัวเองได้ครบถ้วนสมบูรณ์แบบ!</p>';
      showToast('&#127882; ดูแลตัวเองครบทุกข้อแล้วค่ะ! ยอดเยี่ยมมาก!');
    }
  }

  const states = Array.from(items).map(i => i.querySelector('input').checked);
  localStorage.setItem('checklistState', JSON.stringify({ date: new Date().toDateString(), states }));
}

function loadChecklistState() {
  const saved = JSON.parse(localStorage.getItem('checklistState') || 'null');
  if (!saved) return;
  if (saved.date !== new Date().toDateString()) return;
  const items = document.querySelectorAll('.checklist-item');
  items.forEach((item, i) => {
    const cb = item.querySelector('input');
    if (cb) cb.checked = saved.states[i] || false;
  });
  updateChecklist();
}

/* =============================================
   DAILY REFLECTION NOTE
   ============================================= */
function setPrompt(text) {
  const textarea = document.getElementById('reflectionNote');
  if (!textarea) return;
  textarea.value = text;
  textarea.focus();
  updateCharCount();
}

function updateCharCount() {
  const textarea = document.getElementById('reflectionNote');
  if (!textarea) return;
  const count = textarea.value.length;
  const el = document.getElementById('charCount');
  if (el) el.textContent = `${count} / 1000 ตัวอักษร`;
}

function clearReflection() {
  const textarea = document.getElementById('reflectionNote');
  if (!textarea) return;
  textarea.value = '';
  updateCharCount();
}

function saveReflection() {
  const textarea = document.getElementById('reflectionNote');
  if (!textarea) return;
  const text = textarea.value.trim();
  if (!text) {
    showToast('กรุณาเขียนบันทึกก่อนนะคะ &#9997;');
    return;
  }
  const notes = JSON.parse(localStorage.getItem('reflectionNotes') || '[]');
  const now = new Date();
  notes.unshift({
    date: now.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    text,
  });
  if (notes.length > 10) notes.pop();
  localStorage.setItem('reflectionNotes', JSON.stringify(notes));
  clearReflection();
  renderNotes();
  showToast('&#128190; บันทึกความรู้สึกเรียบร้อยแล้วค่ะ!');
}

function renderNotes() {
  const notes = JSON.parse(localStorage.getItem('reflectionNotes') || '[]');
  const listEl = document.getElementById('notesList');
  if (!listEl) return;
  if (notes.length === 0) {
    listEl.innerHTML = '<p style="font-size:13px;color:var(--text-muted);">ยังไม่มีบันทึก เริ่มเขียนได้เลยค่ะ &#127807;</p>';
    return;
  }
  listEl.innerHTML = notes.slice(0, 3).map(n => `
    <div class="note-item">
      <div class="note-date">&#128197; ${n.date}</div>
      <div class="note-text">${escapeHtml(n.text.substring(0, 120))}${n.text.length > 120 ? '...' : ''}</div>
    </div>
  `).join('');
}

/* =============================================
   FAQ TOGGLE
   ============================================= */
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* =============================================
   TOAST NOTIFICATION
   ============================================= */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
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
      if (navLinks) navLinks.classList.remove('open');
    }
  });
});

/* =============================================
   INTERSECTION OBSERVER (Fade-in animations)
   ============================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeSlideUp 0.5s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step-item, .testimonial-card, .news-card, .selfcare-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  loadAffirmation();
  renderMoodWeek();
  loadChecklistState();
  renderNotes();
  initScrollytelling();
  renderFortuneHistory();
});
