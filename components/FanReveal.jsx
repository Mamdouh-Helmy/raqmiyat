"use client";
// components/FanReveal.jsx
// غلاف صغير للـ <ul>: بيفتح المروحة مرة واحدة لما توصلها بالسكرول.
// - الحالة الافتراضية (SSR / من غير JS) = "open" → الكروت ظاهرة عادي.
// - لو القسم تحت الشاشة وقت التحميل: بنلمّ الكروت (closed) وبنفتحها (revealing) أول ما يظهر.
// - لو القسم ظاهر من الأول، أو reduced-motion، أو مفيش هوفر: مفيش أي حركة.
import { useEffect, useRef, useState } from "react";

const FAN_MQ = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export default function FanReveal({ children, className, style, settleMs = 1300 }) {
  const ref = useRef(null);
  const [state, setState] = useState("open"); // open | closed | revealing

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFan = window.matchMedia(FAN_MQ).matches;
    const { top } = el.getBoundingClientRect();
    if (reduce || !isFan || top < window.innerHeight * 0.9) return;

    setState("closed");

    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setState("revealing");
        // بعد ما الحركة تخلص نشيل الـ delay عشان الهوفر يفضل لحظي
        timer = setTimeout(() => setState("open"), settleMs);
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [settleMs]);

  return (
    <ul ref={ref} data-fan={state} className={`group/fan ${className ?? ""}`} style={style}>
      {children}
    </ul>
  );
}