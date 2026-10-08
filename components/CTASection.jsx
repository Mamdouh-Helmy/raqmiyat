"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useContactModal } from "./ContactModalProvider";

/* ---------- مشهد غروب فوق بلدة نجدية (SVG بيتولّد من الكود) ---------- */

const H = 300; // ارتفاع المشهد داخل الـ viewBox
const W = 1200;
const G = H - 16; // خط الأرض (بداية الرصيف)

// مولّد أرقام ثابت: نفس الشكل في كل تحميل بدون اختلاف بين السيرفر والمتصفح
const rng = (seed) => {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};

const f = (n) => n.toFixed(1);

// شُرفات مثلثة متباعدة على حافة السطح (مش منشار متصل)
const merlons = (x0, x1, top, mh, mw) => {
  const n = Math.max(1, Math.floor((x1 - x0) / (mw * 1.7)));
  const step = (x1 - x0) / n;
  let d = "";
  for (let k = 0; k < n; k++) {
    const cx = x0 + step * (k + 0.5);
    d += `L${f(cx - mw / 2)} ${f(top)}L${f(cx)} ${f(top - mh)}L${f(cx + mw / 2)} ${f(top)}`;
  }
  return d;
};

// كتلة مبنى: الجدران مائلة قليلاً لجوه (زي الطوب اللبن) + شُرفات
const block = (x, w, top, bottom, taper, mh, mw) =>
  `M${f(x)} ${f(bottom)}L${f(x + taper)} ${f(top)}` +
  merlons(x + taper, x + w - taper, top, mh, mw) +
  `L${f(x + w - taper)} ${f(top)}L${f(x + w)} ${f(bottom)}Z`;

// شريط المثلثات المقلوبة تحت السطح (الزخرفة النجدية المميزة)
const triBand = (x0, x1, y, s) => {
  const n = Math.max(0, Math.floor((x1 - x0) / s));
  let d = "";
  for (let k = 0; k < n; k++) {
    const xx = x0 + k * s;
    d += `M${f(xx)} ${f(y)}H${f(xx + s * 0.8)}L${f(xx + s * 0.4)} ${f(y + s * 0.7)}Z`;
  }
  return d;
};

// شباك نجدي: مستطيل بقمة مثلثة
const winPath = (cx, y, w, h) =>
  `M${f(cx - w / 2)} ${f(y + h)}V${f(y + w * 0.5)}L${f(cx)} ${f(y)}L${f(cx + w / 2)} ${f(
    y + w * 0.5
  )}V${f(y + h)}Z`;

// باب بقوس (قاعدته على خط الأرض G)
const doorPath = (cx, w, h) =>
  `M${f(cx - w / 2)} ${f(G)}V${f(G - h + w / 2)}A${w / 2} ${w / 2} 0 0 1 ${f(cx + w / 2)} ${f(
    G - h + w / 2
  )}V${f(G)}Z`;

// شباك بقوس (للمسجد)
const archWin = (cx, by, w, h) =>
  `M${f(cx - w / 2)} ${f(by)}V${f(by - h + w / 2)}A${w / 2} ${w / 2} 0 0 1 ${f(cx + w / 2)} ${f(
    by - h + w / 2
  )}V${f(by)}Z`;

// هلال حقيقي مفتوح لفوق: دايرة كبيرة ناقص دايرة أصغر مزاحة لأعلى
const crescent = (cx, cy, R) => {
  const r = R * 0.82;
  const d = R * 0.5;
  const y = -(R * R - r * r + d * d) / (2 * d);
  const x = Math.sqrt(R * R - y * y);
  return (
    `M${f(cx - x)} ${f(cy + y)}` +
    `A${f(R)} ${f(R)} 0 1 0 ${f(cx + x)} ${f(cy + y)}` +
    `A${f(r)} ${f(r)} 0 1 1 ${f(cx - x)} ${f(cy + y)}Z`
  );
};

const LAYERS = {
  far: { seed: 11, fl: 24, minW: 60, maxW: 130, minF: 2, maxF: 4, gap: [6, 16], mh: 6, mw: 7, taper: 1.5, stepChance: 0.2 },
  mid: { seed: 29, fl: 32, minW: 80, maxW: 150, minF: 2, maxF: 4, gap: [4, 12], mh: 8, mw: 9, taper: 2, stepChance: 0.35 },
  near: { seed: 47, fl: 40, minW: 96, maxW: 176, minF: 2, maxF: 4, gap: [2, 9], mh: 10, mw: 11, taper: 2.5, stepChance: 0.45 },
};

// المباني بأدوار حقيقية، وأحياناً دور علوي أصغر (تراجع في الكتلة)
function makeLayer(c) {
  const rand = rng(c.seed);
  const list = [];
  let x = -40;
  while (x < W + 40) {
    const w = c.minW + rand() * (c.maxW - c.minW);
    const floors = c.minF + Math.floor(rand() * (c.maxF - c.minF + 1));
    const top = H - floors * c.fl;
    let step = null;
    if (rand() < c.stepChance) {
      const sw = w * (0.4 + rand() * 0.2);
      const sx = x + (rand() < 0.5 ? w * 0.1 : w - sw - w * 0.1);
      step = { x: sx, w: sw, top: top - c.fl * 0.9 };
    }
    // ميزاب تصريف بارز من الجدار
    const sx = x + w * (0.18 + rand() * 0.14);

    // أساس حجري: شريط أسفل الجدار + فواصل الأحجار
    let joints = "";
    for (let jx = x + 6; jx < x + w - 3; jx += 9) {
      joints += `M${f(jx)} ${f(G - 7)}h0.7v7h-0.7Z`;
    }
    joints += `M${f(x)} ${f(G - 3.6)}h${f(w)}v0.7h${f(-w)}Z`;

    list.push({
      x,
      w,
      floors,
      top,
      step,
      tone: Math.floor(rand() * 3),
      d: block(x, w, top, H, c.taper, c.mh, c.mw),
      stepD: step ? block(step.x, step.w, step.top, top + 2, 1, c.mh * 0.8, c.mw * 0.9) : null,
      cornice: `M${f(x + c.taper)} ${f(top + 6)}H${f(x + w - c.taper)}V${f(top + 8)}H${f(x + c.taper)}Z`,
      band: triBand(x + c.taper + 5, x + w - c.taper - 5, top + 11, c.fl * 0.2),
      // ظل الجانب الأبعد عن الوهج (بيدّي حجم للكتلة)
      side: `M${f(x + w - 10)} ${f(top)}L${f(x + w - c.taper)} ${f(top)}L${f(x + w)} ${H}L${f(x + w - 10)} ${H}Z`,
      // حد الدور
      floorLines: Array.from({ length: floors - 1 }, (_, r) => {
        const y = H - (r + 1) * c.fl;
        return `M${f(x + 1)} ${f(y)}H${f(x + w - 1)}V${f(y + 1)}H${f(x + 1)}Z`;
      }).join(""),
      spout: `M${f(sx)} ${f(top + 14)}h7v2.6h-7Z`,
      stain: `M${f(sx + 0.8)} ${f(top + 16.6)}h2.2v${f(Math.min(28, H - top - 24))}h-2.2Z`,
      plinth: `M${f(x - 0.8)} ${f(G)}V${f(G - 7)}H${f(x + w + 0.8)}V${f(G)}Z`,
      plinthTop: `M${f(x - 1.2)} ${f(G - 7)}h${f(w + 2.4)}v1h${f(-(w + 2.4))}Z`,
      joints,
    });
    x += w + c.gap[0] + rand() * (c.gap[1] - c.gap[0]);
  }
  return list;
}

// شبابيك مصطفّة في أعمدة وأدوار ثابتة، وأبواب خشب مسمّرة في الدور الأرضي
function makeDetails(layer, c, seed, litChance, withDoors) {
  const rand = rng(seed);
  const dark = [];
  const lit = [];
  const doors = [];
  const doorFrames = [];
  const steps = [];
  const studs = [];
  const ww = c.fl * 0.2;
  const wh = c.fl * 0.42;

  const row = (bx, bw, y) => {
    const cols = Math.max(1, Math.floor((bw - 14) / (c.fl * 0.9)));
    for (let k = 0; k < cols; k++) {
      const cx = bx + (bw * (k + 0.5)) / cols;
      if (rand() < litChance) {
        lit.push({
          d: winPath(cx, y, ww, wh),
          bars: `M${f(cx)} ${f(y + ww * 0.5)}V${f(y + wh)}M${f(cx - ww / 2)} ${f(y + wh * 0.58)}H${f(cx + ww / 2)}`,
          sill: `M${f(cx - ww / 2 - 1.5)} ${f(y + wh)}H${f(cx + ww / 2 + 1.5)}V${f(y + wh + 2)}H${f(cx - ww / 2 - 1.5)}Z`,
          frame: winPath(cx, y - 2.2, ww + 4.4, wh + 2.2),
          cx,
          y,
          ww,
          wh,
          flick: rand() < 0.22,
          delay: (rand() * 6).toFixed(1),
          o: (0.72 + rand() * 0.28).toFixed(2),
        });
      } else {
        dark.push(winPath(cx, y, ww, wh));
      }
    }
  };

  layer.forEach((b) => {
    for (let r = 1; r < b.floors; r++) row(b.x, b.w, H - (r + 1) * c.fl + c.fl * 0.28);
    if (b.step) row(b.step.x, b.step.w, b.step.top + c.fl * 0.25);
    if (withDoors) {
      const cx = b.x + b.w * (0.25 + rand() * 0.5);
      doors.push(doorPath(cx, 11, 20));
      doorFrames.push(doorPath(cx, 15, 23));
      // درجة سلم تحت الباب
      steps.push(`M${f(cx - 10)} ${f(G)}h20v2.4h-20Z`);
      // خط تقسيم الضلفتين + مسامير
      studs.push(`M${f(cx - 0.35)} ${f(G - 14)}h0.7v14h-0.7Z`);
      for (let s = 0; s < 3; s++) {
        const sy = G - 14 + s * 4;
        studs.push(`M${f(cx - 3.8)} ${f(sy)}h1.2v1.2h-1.2ZM${f(cx + 2.6)} ${f(sy)}h1.2v1.2h-1.2Z`);
      }
    }
  });

  return {
    dark: dark.join(""),
    lit,
    doors: doors.join(""),
    doorFrames: doorFrames.join(""),
    steps: steps.join(""),
    studs: studs.join(""),
  };
}

const FAR = makeLayer(LAYERS.far);
const MID = makeLayer(LAYERS.mid);
const NEAR = makeLayer(LAYERS.near);

// الطبقة الوسطى: كل الشبابيك مطفية (مفيش منوّر)
const MID_D = makeDetails(MID, LAYERS.mid, 63, 0, false);
const NEAR_D = makeDetails(NEAR, LAYERS.near, 91, 0.3, true);

const NEAR_TONES = ["#0c1b14", "#0f2118", "#0a1711"];

// كثبان رملية بعيدة خلف البلدة
const DUNES = `M0 ${H}V${H - 92}C140 ${H - 128} 260 ${H - 84} 420 ${H - 112}S700 ${H - 78} 860 ${H - 108}S1100 ${
  H - 82
} 1200 ${H - 100}V${H}Z`;

// مسجد صغير بقبة + مئذنة نحيلة في الخلفية
const MOSQUE = (() => {
  const x = 905;
  const b = H;
  return [
    // المئذنة
    `M${x - 9} ${b}L${x - 6.5} ${b - 175}L${x + 6.5} ${b - 175}L${x + 9} ${b}Z`,
    `M${x - 11} ${b - 175}H${x + 11}V${b - 170}H${x - 11}Z`,
    `M${x - 4.5} ${b - 170}L${x - 4} ${b - 198}H${x + 4}L${x + 4.5} ${b - 170}Z`,
    `M${x - 5.5} ${b - 198}Q${x} ${b - 222} ${x + 5.5} ${b - 198}Z`,
    `M${x - 0.6} ${b - 216}V${b - 232}H${x + 0.6}V${b - 216}Z`,
    // جسم المسجد والقبة
    `M${x - 84} ${b}V${b - 150}H${x - 28}V${b}Z`,
    `M${x - 84} ${b - 150}A28 22 0 0 1 ${x - 28} ${b - 150}Z`,
    `M${x - 56.6} ${b - 172}V${b - 188}H${x - 55.4}V${b - 172}Z`,
    // حزام زخرفي تحت القبة
    `M${x - 86} ${b - 152}H${x - 26}V${b - 148}H${x - 86}Z`,
  ];
})();

// هلالين: قاعدين على سنّ القبة وعلى سنّ المئذنة
const MOSQUE_CRESCENTS = [
  crescent(905 - 56, H - 188 - 4.6, 5.5),
  crescent(905, H - 232 - 3.8, 4.5),
];

// شبابيك المسجد المضيئة (أقواس)
const MOSQUE_WINS =
  [-70, -56, -42].map((dx) => archWin(905 + dx, H - 74, 7, 24)).join("") +
  archWin(905, H - 96, 5, 16);

/* ---------- أعمدة الإنارة ---------- */
const LAMP_X = [96, 318, 604, 846, 1112];
const LB = G + 4; // قاعدة العمود على حافة الرصيف

const lampParts = (x) => ({
  base: `M${f(x - 5)} ${f(LB)}h10v-2.5h-10ZM${f(x - 3.4)} ${f(LB - 2.5)}h6.8v-4h-6.8Z`,
  shaft: `M${f(x - 1.7)} ${f(LB - 6.5)}L${f(x - 1)} ${f(LB - 34)}h2L${f(x + 1.7)} ${f(LB - 6.5)}Z`,
  rings: `M${f(x - 2.6)} ${f(LB - 14)}h5.2v1.3h-5.2ZM${f(x - 2.2)} ${f(LB - 32)}h4.4v1.3h-4.4Z`,
  deck: `M${f(x - 4)} ${f(LB - 35)}h8v1.4h-8Z`,
  frame: `M${f(x - 3.4)} ${f(LB - 35)}H${f(x + 3.4)}L${f(x + 2.9)} ${f(LB - 43.4)}H${f(x - 2.9)}Z`,
  glass: `M${f(x - 2.5)} ${f(LB - 36)}H${f(x + 2.5)}L${f(x + 2.1)} ${f(LB - 42.4)}H${f(x - 2.1)}Z`,
  mullion: `M${f(x - 0.3)} ${f(LB - 36)}h0.6v-6.4h-0.6Z`,
  cap: `M${f(x - 4.4)} ${f(LB - 43.4)}L${f(x)} ${f(LB - 48.4)}L${f(x + 4.4)} ${f(LB - 43.4)}Z`,
  rim: `M${f(x - 1.1)} ${f(LB - 8)}L${f(x - 0.6)} ${f(LB - 33)}`,
});

const LAMPS = LAMP_X.map((x) => ({ x, ...lampParts(x) }));

// نجوم: [x%, y%, نصف القطر, السطوع]. أغلبها دقيق، وأكبرها بس ليه هالة
const STARS = [
  [14, 40, 1, 0.6], [19, 12, 0.8, 0.55], [22, 30, 0.6, 0.45], [27, 6, 1.3, 0.9],
  [30, 24, 0.7, 0.5], [34, 14, 0.9, 0.7], [38, 36, 0.6, 0.4], [41, 8, 0.8, 0.6],
  [45, 20, 1.7, 1], [49, 32, 0.7, 0.5], [52, 10, 0.6, 0.45], [56, 26, 1, 0.7],
  [59, 5, 0.8, 0.55], [63, 18, 0.7, 0.5], [67, 38, 0.9, 0.6], [70, 12, 1.4, 0.9],
  [73, 28, 0.6, 0.45], [77, 7, 0.8, 0.6], [80, 20, 0.7, 0.5], [84, 34, 1, 0.65],
  [87, 10, 0.6, 0.45], [91, 24, 0.9, 0.7], [94, 6, 0.7, 0.5], [96, 18, 1.1, 0.8],
  [4, 30, 0.6, 0.4], [17, 48, 0.6, 0.35], [43, 44, 0.7, 0.4], [75, 46, 0.6, 0.35],
  [88, 42, 0.6, 0.35], [58, 42, 0.6, 0.35],
];

export default function CTASection() {
  const { openContactModal } = useContactModal();

  return (
    <section id="cta-section" className="container-x section">
      <style>{`
        @keyframes ctaTwinkle { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        @keyframes ctaFlick { 0%, 100% { opacity: 1; } 45% { opacity: .8; } 55% { opacity: .95; } }
        @keyframes ctaCloud { 0% { transform: translateX(0); } 100% { transform: translateX(40px); } }
        .cta-star { animation: ctaTwinkle 5s ease-in-out infinite; }
        .cta-win-flick { animation: ctaFlick 8s ease-in-out infinite; }
        .cta-cloud { animation: ctaCloud 40s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .cta-star { animation: none; opacity: .9; }
          .cta-win-flick, .cta-cloud { animation: none; }
        }
      `}</style>

      <div className="relative isolate overflow-hidden rounded-xl2 bg-brand-dark px-6 pb-48 pt-16 text-center md:px-16 md:pb-[19rem] md:pt-24">
        {/* وهج الأفق */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_100%,rgba(240,207,134,0.6),rgba(184,147,74,0.22)_45%,transparent_78%)]"
        />

        {/* سحب رفيعة بتتحرك ببطء */}
        <div
          aria-hidden="true"
          className="cta-cloud absolute -z-10 start-[8%] top-[34%] h-2.5 w-2/5 rounded-full bg-gradient-to-l from-transparent via-[#f6e3b0]/20 to-transparent blur-md"
        />
        <div
          aria-hidden="true"
          className="cta-cloud absolute -z-10 end-[6%] top-[46%] h-2 w-1/3 rounded-full bg-gradient-to-l from-transparent via-[#f0cf86]/25 to-transparent blur-md"
        />

        {/* النجوم */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-3/5 w-full"
        >
          {STARS.map(([x, y, r, o], i) => (
            <g key={i}>
              {r >= 1.3 && (
                <circle cx={`${x}%`} cy={`${y}%`} r={r * 4} fill="#f6e3b0" fillOpacity="0.12" />
              )}
              <circle
                className={i % 3 === 0 ? "cta-star" : undefined}
                cx={`${x}%`}
                cy={`${y}%`}
                r={r}
                fill="#f6e3b0"
                opacity={o}
                style={i % 3 === 0 ? { animationDelay: `${(i * 0.9) % 6}s` } : undefined}
              />
            </g>
          ))}
        </svg>

        {/* الهلال */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="absolute left-[7%] top-[9%] -z-10 size-14 drop-shadow-[0_0_18px_rgba(246,227,176,0.55)] md:size-24"
        >
          <defs>
            <mask id="ctaMoon">
              <rect width="100" height="100" fill="white" />
              <circle cx="66" cy="38" r="38" fill="black" />
            </mask>
          </defs>
          <circle cx="44" cy="52" r="38" fill="#f6e3b0" mask="url(#ctaMoon)" />
        </svg>

        {/* البلدة: كثبان + ثلاث طبقات، الأبعد أفتح */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-x-0 bottom-0 -z-10 h-[170px] w-full md:h-[300px]"
        >
          <defs>
            <linearGradient id="ctaLit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff1c4" />
              <stop offset="1" stopColor="#e7b250" />
            </linearGradient>
            <linearGradient id="ctaWallGlow" gradientUnits="userSpaceOnUse" x1="0" y1={H - 200} x2="0" y2={H}>
              <stop offset="0" stopColor="#f0cf86" stopOpacity="0" />
              <stop offset="1" stopColor="#f0cf86" stopOpacity="0.16" />
            </linearGradient>
            <linearGradient id="ctaHaze" gradientUnits="userSpaceOnUse" x1="0" y1={H - 230} x2="0" y2={H}>
              <stop offset="0" stopColor="#f0cf86" stopOpacity="0" />
              <stop offset="1" stopColor="#f0cf86" stopOpacity="0.2" />
            </linearGradient>
            {/* انعكاس الشارع */}
            <linearGradient id="ctaRoad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f0cf86" stopOpacity="0.22" />
              <stop offset="1" stopColor="#f0cf86" stopOpacity="0.03" />
            </linearGradient>
            {/* خط انعكاس الفانوس على الأسفلت */}
            <linearGradient id="ctaStreak" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
            </linearGradient>
            {/* بقعة النور على الأرض */}
            <radialGradient id="ctaPool">
              <stop offset="0" stopColor="#f0cf86" stopOpacity="0.45" />
              <stop offset="1" stopColor="#f0cf86" stopOpacity="0" />
            </radialGradient>
            {/* ملمس الطوب اللبن */}
            <pattern id="ctaMud" width="7" height="7" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.4" r="0.55" fill="#ffffff" fillOpacity="0.05" />
              <circle cx="4.6" cy="4.8" r="0.5" fill="#000000" fillOpacity="0.14" />
              <circle cx="5.6" cy="1.2" r="0.35" fill="#000000" fillOpacity="0.1" />
            </pattern>
            {/* حجارة الأسفلت المرصوفة */}
            <pattern id="ctaCobble" width="12" height="5.5" patternUnits="userSpaceOnUse">
              <rect x="0.4" y="0.4" width="5.2" height="4.6" rx="1" fill="#000" fillOpacity="0.16" />
              <rect x="6.4" y="0.4" width="5.2" height="4.6" rx="1" fill="#000" fillOpacity="0.1" />
            </pattern>
            <filter id="ctaGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
            <filter id="ctaGlowSm" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* كثبان بعيدة */}
          <path d={DUNES} fill="#132a20" opacity="0.28" />

          {/* الطبقة البعيدة */}
          <g fill="#132a20" opacity="0.45">
            {FAR.map((b, i) => (
              <g key={i}>
                <path d={b.d} />
                {b.stepD && <path d={b.stepD} />}
              </g>
            ))}
          </g>

          {/* الطبقة الوسطى + المسجد */}
          <g fill="#132a20" opacity="0.78">
            {MOSQUE.map((d, i) => (
              <path key={i} d={d} />
            ))}
            <path d={MOSQUE_WINS} fill="#e9bd62" fillOpacity="0.8" />
            {MID.map((b, i) => (
              <g key={i}>
                <path d={b.d} />
                {b.stepD && <path d={b.stepD} />}
              </g>
            ))}
            <path d={MID.map((b) => b.band).join("")} fill="#c9a66b" fillOpacity="0.12" />
            <path d={MID.map((b) => b.side).join("")} fill="#000" fillOpacity="0.18" />
            <path d={MID_D.dark} fill="#000" fillOpacity="0.28" />
          </g>

          {/* هلالين المسجد */}
          <path d={MOSQUE_CRESCENTS.join("")} fill="#f0cf86" />

          {/* ضباب بين الطبقة الوسطى والقريبة */}
          <rect x="0" y={H - 230} width={W} height="230" fill="url(#ctaHaze)" />

          {/* الطبقة القريبة */}
          {NEAR.map((b, i) => (
            <g key={i} fill={NEAR_TONES[b.tone]}>
              <path d={b.d} />
              {b.stepD && <path d={b.stepD} />}
            </g>
          ))}

          {/* ملمس الطوب + ظل الجوانب + حدود الأدوار */}
          <path d={NEAR.map((b) => b.d).join("")} fill="url(#ctaMud)" />
          <path d={NEAR.map((b) => b.side).join("")} fill="#000" fillOpacity="0.22" />
          <path d={NEAR.map((b) => b.floorLines).join("")} fill="#000" fillOpacity="0.3" />

          {/* انعكاس الوهج على الجدران من تحت */}
          <path d={NEAR.map((b) => b.d).join("")} fill="url(#ctaWallGlow)" />

          {/* كورنيش + شريط المثلثات الزخرفي */}
          <path d={NEAR.map((b) => b.cornice).join("")} fill="#c9a66b" fillOpacity="0.14" />
          <path d={NEAR.map((b) => b.band).join("")} fill="#c9a66b" fillOpacity="0.2" />

          {/* مزاريب التصريف وآثارها على الجدار */}
          <path d={NEAR.map((b) => b.stain).join("")} fill="#000" fillOpacity="0.16" />
          <path d={NEAR.map((b) => b.spout).join("")} fill="#c9a66b" fillOpacity="0.3" />

          {/* أساس حجري تحت كل مبنى */}
          <path d={NEAR.map((b) => b.plinth).join("")} fill="#000" fillOpacity="0.28" />
          <path d={NEAR.map((b) => b.plinth).join("")} fill="#c9a66b" fillOpacity="0.07" />
          <path d={NEAR.map((b) => b.joints).join("")} fill="#000" fillOpacity="0.3" />
          <path d={NEAR.map((b) => b.plinthTop).join("")} fill="#c9a66b" fillOpacity="0.22" />

          {/* شبابيك مطفية + أبواب بإطار ودرجة ومسامير */}
          <path d={NEAR_D.dark} fill="#000" fillOpacity="0.42" />
          <path d={NEAR_D.doorFrames} fill="#c9a66b" fillOpacity="0.2" />
          <path d={NEAR_D.doors} fill="#000" fillOpacity="0.55" />
          <path d={NEAR_D.steps} fill="#c9a66b" fillOpacity="0.2" />
          <path d={NEAR_D.studs} fill="#c9a66b" fillOpacity="0.55" />

          {/* توهّج الشبابيك المضيئة */}
          <g filter="url(#ctaGlow)" fill="#f0cf86" fillOpacity="0.4">
            {NEAR_D.lit.map((w, i) => (
              <rect
                key={i}
                x={w.cx - w.ww / 2 - 3}
                y={w.y - 3}
                width={w.ww + 6}
                height={w.wh + 6}
                rx="3"
              />
            ))}
          </g>

          {/* الشبابيك المضيئة */}
          {NEAR_D.lit.map((w, i) => (
            <g
              key={i}
              opacity={w.o}
              className={w.flick ? "cta-win-flick" : undefined}
              style={w.flick ? { animationDelay: `${w.delay}s` } : undefined}
            >
              <path d={w.frame} fill="#c9a66b" fillOpacity="0.22" />
              <path
                d={w.d}
                fill="url(#ctaLit)"
                stroke="#0a1711"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path d={w.bars} stroke="#0a1711" strokeWidth="0.9" fill="none" />
              <path d={w.sill} fill="#c9a66b" fillOpacity="0.4" />
            </g>
          ))}

          {/* ---------- الشارع ---------- */}
          {/* الأسفلت */}
          <rect x="0" y={G + 5} width={W} height={H - G - 5} fill="#08130d" />
          <rect x="0" y={G + 5} width={W} height={H - G - 5} fill="url(#ctaRoad)" />
          <rect x="0" y={G + 5} width={W} height={H - G - 5} fill="url(#ctaCobble)" />

          {/* الرصيف */}
          <rect x="0" y={G} width={W} height="5" fill="#0f2118" />
          <rect x="0" y={G} width={W} height="1" fill="#c9a66b" fillOpacity="0.3" />
          {/* حافة الرصيف (الكيرب) */}
          <rect x="0" y={G + 4} width={W} height="1.4" fill="#c9a66b" fillOpacity="0.28" />
          <rect x="0" y={G + 5.4} width={W} height="1" fill="#000" fillOpacity="0.4" />

          {/* بقع نور على الأرض + انعكاس على الأسفلت */}
          {LAMP_X.map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={G + 7} rx="42" ry="6" fill="url(#ctaPool)" />
              <rect x={x - 1.4} y={G + 6} width="2.8" height={H - G - 6} fill="url(#ctaStreak)" />
            </g>
          ))}

          {/* ---------- أعمدة الإنارة ---------- */}
          {/* هالة الفانوس */}
          <g filter="url(#ctaGlowSm)" fill="#f0cf86" fillOpacity="0.6">
            {LAMPS.map((l) => (
              <circle key={l.x} cx={l.x} cy={LB - 39} r="8" />
            ))}
          </g>

          {LAMPS.map((l) => (
            <g key={l.x}>
              {/* ظل العمود على الرصيف */}
              <ellipse cx={l.x + 3} cy={LB + 0.6} rx="6" ry="0.9" fill="#000" fillOpacity="0.45" />
              <g fill="#0a1711">
                <path d={l.base} />
                <path d={l.shaft} />
                <path d={l.rings} />
                <path d={l.deck} />
                <path d={l.frame} />
                <path d={l.cap} />
                <circle cx={l.x} cy={LB - 49.6} r="0.9" />
              </g>
              {/* لمعة رفيعة على حافة العمود من ناحية الوهج */}
              <path d={l.rim} stroke="#c9a66b" strokeOpacity="0.4" strokeWidth="0.6" fill="none" />
              <path d={l.rings} fill="#c9a66b" fillOpacity="0.35" />
              <path d={l.deck} fill="#c9a66b" fillOpacity="0.3" />
              {/* زجاج الفانوس */}
              <path d={l.glass} fill="url(#ctaLit)" />
              <path d={l.mullion} fill="#0a1711" />
              <path
                d={`M${f(l.x - 4.4)} ${f(LB - 43.4)}L${f(l.x)} ${f(LB - 48.4)}`}
                stroke="#c9a66b"
                strokeOpacity="0.35"
                strokeWidth="0.6"
                fill="none"
              />
            </g>
          ))}
        </svg>

        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-heading text-4xl font-extrabold leading-[1.25] text-white md:text-6xl">
            لنبدأ في بناء <span className="text-sand">مشروعك</span> القادم
          </h2>
          <p className="mx-auto mb-10 mt-6 max-w-xl text-lg leading-loose text-white/70">
            فريقنا التقني جاهز الآن لتحويل رؤيتك إلى واقع رقمي آمن ومبتكر
            يواكب تطلعاتك.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <button
              type="button"
              onClick={() => openContactModal("تحدث مع خبير تقني")}
              className="group inline-flex items-center gap-3 rounded-full bg-sand py-2 pe-2 ps-8 text-sm font-black text-brand-dark outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              تحدث مع خبير تقني
              <span className="grid size-11 place-items-center rounded-full bg-brand-dark text-sand">
                <ArrowLeft
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </span>
            </button>

            <button
              type="button"
              onClick={() => openContactModal("استشارة مجانية")}
              className="text-sm font-bold text-white underline decoration-sand/60 decoration-2 underline-offset-[10px] outline-none transition-colors hover:decoration-sand focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-4 focus-visible:ring-offset-brand-dark"
            >
              اطلب استشارة مجانية
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}