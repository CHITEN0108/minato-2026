/* =========================================
   鬼塚湊 2026生誕祭 — 設定區
   大部分要改的東西都在這裡
   ========================================= */
const CONFIG = {
  // 活動日（+08:00 = 台灣時間；若以日本時間為準改成 +09:00）
  eventDate: "2026-12-11T00:00:00+08:00",

  // Google 表單網址（還沒做好就留空，按鈕會提示「準備中」）
  forms: {
    fund: "",     // 集資表單
    message: "",  // 留言表單（內容可挑選貼到下方留言牆）
    ticketN: "",  // N票 售票網址
    ticketS: "",  // S票 售票網址
  },

  // 留言牆內容（之後從表單回覆挑選貼上）
  messages: [
    // ⚠ 以下為範例留言，上線前請換成真實內容或刪除
    { name: "範例血眷 A", text: "生日快樂！第一次看到湊的舞台就被咬了，從此再也逃不掉 🦇" },
    { name: "範例血眷 B", text: "願吸血鬼大人新的一歲也永遠閃耀，12/11 現場見！" },
    { name: "範例血眷 C", text: "湊的笑容是我每天的動力，這份契約會一直延續下去。" },
    { name: "範例血眷 D", text: "雖然沒辦法到現場，但會在遠方一起點亮血月 🌹" },
    { name: "範例血眷 E", text: "謝謝湊一直這麼努力，Happy Birthday!!" },
    { name: "範例血眷 F", text: "被湊吸走的不只是血，還有我的錢包和心 💸" },
  ],
};

/* ---------- 載入動畫 ---------- */
(function loader() {
  const el = document.getElementById("loader");
  if (!el) return;
  const MIN_SHOW = 2300; // 至少顯示多久（毫秒），讓動畫跑完
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = performance.now();

  // 百分比數字跟著血液上升（與 CSS 的 2 秒注滿動畫同步）
  const pct = document.getElementById("loader-percent");
  const FILL_DELAY = 200, FILL_TIME = 2000;
  (function count() {
    const t = Math.min(1, Math.max(0, (performance.now() - start - FILL_DELAY) / FILL_TIME));
    const eased = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    if (pct) pct.textContent = Math.round(eased * 100) + "%";
    if (t < 1) requestAnimationFrame(count);
  })();

  function finish() {
    const wait = reduced ? 0 : Math.max(0, MIN_SHOW - (performance.now() - start));
    setTimeout(() => {
      el.classList.add("is-done");
      document.body.classList.remove("is-loading");
      setTimeout(() => el.remove(), 1200);
    }, wait);
  }

  if (document.readyState === "complete") finish();
  else window.addEventListener("load", finish);
})();

/* ---------- 倒數計時 ---------- */
(function countdown() {
  const target = new Date(CONFIG.eventDate).getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  const els = {
    box: document.getElementById("countdown"),
    done: document.getElementById("countdown-done"),
    d: document.getElementById("cd-days"),
    h: document.getElementById("cd-hours"),
    m: document.getElementById("cd-mins"),
    s: document.getElementById("cd-secs"),
  };
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      els.box.hidden = true;
      els.done.hidden = false;
      // 活動當天 vs. 活動結束後
      els.done.textContent = diff > -dayMs
        ? "🦇 Happy Birthday, Minato 🦇"
        : "夜宴已落幕，感謝每一位血眷的參與 🌹";
      return;
    }
    els.d.textContent = pad(Math.floor(diff / dayMs));
    els.h.textContent = pad(Math.floor((diff / 3600000) % 24));
    els.m.textContent = pad(Math.floor((diff / 60000) % 60));
    els.s.textContent = pad(Math.floor((diff / 1000) % 60));
    setTimeout(tick, 1000);
  }
  tick();
})();

/* ---------- 手機版選單 ---------- */
(function nav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav__menu a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
})();

/* ---------- 主視覺：蝙蝠 + 血色光點 ---------- */
(function heroEffects() {
  const BAT_SVG =
    '<svg viewBox="0 0 100 44" fill="currentColor"><path d="M50 14c-2-5-5-6-7-3-5-8-18-11-30-6 7 2 9 8 7 14 6-4 13-2 15 4 4-4 10-2 12 4l3 9 3-9c2-6 8-8 12-4 2-6 9-8 15-4-2-6 0-12 7-14-12-5-25-2-30 6-2-3-5-2-7 3z"/></svg>';

  const bats = document.querySelector(".hero__bats");
  for (let i = 0; i < 7; i++) {
    const b = document.createElement("div");
    b.className = "bat";
    b.innerHTML = BAT_SVG;
    b.style.width = 28 + Math.random() * 36 + "px";
    b.style.top = 8 + Math.random() * 55 + "%";
    b.style.animationDuration = 14 + Math.random() * 14 + "s";
    b.style.animationDelay = -Math.random() * 28 + "s";
    bats.appendChild(b);
  }

  const embers = document.querySelector(".hero__embers");
  for (let i = 0; i < 24; i++) {
    const e = document.createElement("span");
    e.className = "ember";
    const size = 2 + Math.random() * 4;
    e.style.width = e.style.height = size + "px";
    e.style.left = Math.random() * 100 + "%";
    e.style.animationDuration = 9 + Math.random() * 10 + "s";
    e.style.animationDelay = -Math.random() * 19 + "s";
    embers.appendChild(e);
  }
})();


/* ---------- 表單按鈕 ---------- */
document.querySelectorAll(".js-form-link").forEach((btn) => {
  const url = CONFIG.forms[btn.dataset.form];
  if (url) {
    btn.href = url;
  } else {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(btn.dataset.pending || "表單準備中，敬請期待！");
    });
  }
});

/* ---------- 留言牆 ---------- */
(function messageWall() {
  const wall = document.getElementById("message-wall");
  CONFIG.messages.forEach(({ name, text }) => {
    const card = document.createElement("blockquote");
    card.className = "message reveal";
    const p = document.createElement("p");
    p.textContent = text;
    const cite = document.createElement("cite");
    cite.textContent = "— " + name;
    card.append(p, cite);
    wall.appendChild(card);
  });
})();

/* ---------- 捲動進場動畫 ---------- */
(function reveal() {
  document
    .querySelectorAll(".section__title, .about, .card, .event__info, .event__timetable, .join__step, .faq")
    .forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
