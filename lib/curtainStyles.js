// lib/curtainStyles.js
// ثوابت وأنماط ستارة الانتقال. دوال نقية: نفس المدخلات تدي نفس الستايل.
// phase: "idle" | "in" (الستارة بتنزل) | "out" (بتكشف)
// instant: الستارة مقفولة من البداية فمفيش حركة نزول

export const STRIPS = 5; // عدد الشرائط
export const DURATION = 450; // مدة حركة كل شريط (ms)
export const STAGGER = 45; // الفرق بين كل شريط والتاني
export const LAYER_GAP = 110; // الفرق بين الطبقة الرملية والأساسية
export const TOTAL = DURATION + STAGGER * (STRIPS - 1) + LAYER_GAP;

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

// تعبئة الاسم الذهبية (بتبدأ بعد ما الشرائط تغطي)
const FILL_DELAY = 380;
const FILL_MS = 460;

// الوقت اللي بعده الستارة تكون غطّت الشاشة بالكامل
export const COVER = Math.max(TOTAL, FILL_DELAY + FILL_MS + 60);

const NONE = "none";

const stripStyle = (phase, instant, layer, index) => {
  if (phase === "idle") {
    return { transform: "translateY(-101%)", transition: NONE };
  }
  if (phase === "in" && instant) {
    return { transform: "translateY(0)", transition: NONE };
  }

  const closing = phase === "in";
  const isBrand = layer === "brand";
  const layerGap = closing === isBrand ? LAYER_GAP : 0;

  return {
    transform: closing ? "translateY(0)" : "translateY(101%)",
    transition: `transform ${DURATION}ms ${EASE} ${index * STAGGER + layerGap}ms`,
  };
};

const contentStyle = (phase, instant) => {
  if (phase === "idle") {
    return { opacity: 0, transform: "translateY(14px)", transition: NONE };
  }
  if (phase === "out") {
    return {
      opacity: 0,
      transform: "translateY(-14px)",
      transition: "opacity 220ms ease-in, transform 220ms ease-in",
    };
  }
  return {
    opacity: 1,
    transform: "translateY(0)",
    transition: instant
      ? NONE
      : "opacity 300ms ease-out 320ms, transform 400ms ease-out 320ms",
  };
};

// التعبئة بتبدأ بعد التغطية، إلا لو الستارة مقفولة أصلاً
const fillTransition = (property, phase, instant) =>
  phase === "in" && !instant
    ? `${property} ${FILL_MS}ms ease-out ${FILL_DELAY}ms`
    : NONE;

// التعبئة الذهبية بتمسح من اليمين (RTL)
const fillStyle = (phase, instant) => ({
  clipPath: phase === "idle" ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)",
  transition: fillTransition("clip-path", phase, instant),
});

const lineStyle = (phase, instant) => ({
  transform: phase === "idle" ? "scaleX(0)" : "scaleX(1)",
  transition: fillTransition("transform", phase, instant),
});

export const getCurtainStyles = (phase, instant) => ({
  strip: (layer, index) => stripStyle(phase, instant, layer, index),
  content: contentStyle(phase, instant),
  fill: fillStyle(phase, instant),
  line: lineStyle(phase, instant),
});