// components/PageTransition.jsx
"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// ───── إعدادات الحركة (عدّل براحتك) ─────
const STRIPS = 5; // عدد الشرائط
const DURATION = 450; // مدة حركة كل شريط (ms)
const STAGGER = 45; // الفرق بين كل شريط والتاني
const LAYER_GAP = 110; // الفرق بين الطبقة الرملية والطبقة الأساسية
const TOTAL = DURATION + STAGGER * (STRIPS - 1) + LAYER_GAP;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

// تعبئة الاسم الذهبية (بتبدأ بعد ما الشرائط تغطي)
const FILL_DELAY = 380;
const FILL_MS = 460;
const COVER = Math.max(TOTAL, FILL_DELAY + FILL_MS + 60); // الوقت اللي بعده نكشف

// نفس شبكة المعيّنات المستخدمة في اللودر
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.08'/%3E%3C/svg%3E\")";

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();

  // idle → in (الستارة بتنزل) → out (الستارة بتكمل وتكشف الصفحة الجديدة)
  const [phase, setPhase] = useState("idle");
  const phaseRef = useRef("idle");
  const covered = useRef(false); // الستارة غطّت الشاشة
  const arrived = useRef(false); // الصفحة الجديدة وصلت
  const timers = useRef([]);

  const go = useCallback((p) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const later = useCallback((fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const tryReveal = useCallback(() => {
    if (phaseRef.current !== "in" || !covered.current || !arrived.current) {
      return;
    }
    go("out");
    later(() => go("idle"), TOTAL + 50);
  }, [go, later]);

  // الصفحة الجديدة وصلت
  useEffect(() => {
    arrived.current = true;
    tryReveal();
  }, [pathname, tryReveal]);

  // اعتراض الضغط على اللينكات الداخلية
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e) => {
      if (reduce.matches || phaseRef.current !== "idle") return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = e.target?.closest?.("a[href]");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // نفس الصفحة (أو مجرد hash) → من غير أنيميشن
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      e.preventDefault();
      clearTimers();
      covered.current = false;
      arrived.current = false;

      go("in");
      router.push(url.pathname + url.search + url.hash);

      later(() => {
        covered.current = true;
        tryReveal();
      }, COVER);

      // أمان: لو الصفحة اتأخرت، اكشف بعد 4 ثواني
      later(() => {
        covered.current = true;
        arrived.current = true;
        tryReveal();
      }, 4000);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, go, later, clearTimers, tryReveal]);

  useEffect(() => clearTimers, [clearTimers]);

  const stripStyle = (layer, i) => {
    if (phase === "idle") {
      return { transform: "translateY(-101%)", transition: "none" };
    }
    const isBrand = layer === "brand";
    const gap =
      phase === "in" ? (isBrand ? LAYER_GAP : 0) : isBrand ? 0 : LAYER_GAP;
    return {
      transform: phase === "in" ? "translateY(0)" : "translateY(101%)",
      transition: `transform ${DURATION}ms ${EASE} ${i * STAGGER + gap}ms`,
    };
  };

  // المحتوى كله: يظهر بعد التغطية، ويختفي أول ما الكشف يبدأ
  const contentStyle =
    phase === "in"
      ? {
          opacity: 1,
          transform: "translateY(0)",
          transition: "opacity 300ms ease-out 320ms, transform 400ms ease-out 320ms",
        }
      : phase === "out"
      ? {
          opacity: 0,
          transform: "translateY(-14px)",
          transition: "opacity 220ms ease-in, transform 220ms ease-in",
        }
      : {
          opacity: 0,
          transform: "translateY(14px)",
          transition: "none",
        };

  // التعبئة الذهبية بتمسح من اليمين (RTL)
  const fillStyle =
    phase === "in"
      ? {
          clipPath: "inset(0 0 0 0%)",
          transition: `clip-path ${FILL_MS}ms ease-out ${FILL_DELAY}ms`,
        }
      : phase === "out"
      ? { clipPath: "inset(0 0 0 0%)", transition: "none" }
      : { clipPath: "inset(0 0 0 100%)", transition: "none" };

  const lineStyle =
    phase === "in"
      ? {
          transform: "scaleX(1)",
          transition: `transform ${FILL_MS}ms ease-out ${FILL_DELAY}ms`,
        }
      : phase === "out"
      ? { transform: "scaleX(1)", transition: "none" }
      : { transform: "scaleX(0)", transition: "none" };

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden ${
        phase === "idle" ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {["sand", "brand"].map((layer) => (
        <div key={layer} className="absolute inset-0 flex">
          {Array.from({ length: STRIPS }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 will-change-transform ${
                layer === "brand" ? "bg-brand" : "bg-sand"
              }`}
              style={{ marginInline: "-0.5px", ...stripStyle(layer, i) }}
            />
          ))}
        </div>
      ))}

      {/* المحتوى فوق الشرائط */}
      <div className="absolute inset-0 text-white" style={contentStyle}>
        {/* شبكة المعيّنات */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: lattice,
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, #000 0%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse at center, #000 0%, transparent 80%)",
          }}
        />

        {/* الشريط العلوي */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 md:px-14 md:pt-10">
          <Image
            src="/logo.webp"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain opacity-90"
          />
          <span className="text-[11px] font-bold tracking-widest text-white/50">
            مستقبل البرمجيات برؤية سعودية
          </span>
        </div>

        {/* الاسم: مفرغ + تعبئة ذهبية */}
        <div className="absolute inset-0 grid place-items-center px-6">
          <div className="relative select-none font-heading text-[4.5rem] leading-[1.2] sm:text-[7rem] md:text-[9rem] lg:text-[11rem]">
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.5)" }}
            >
              رقميات
            </span>
            <span
              className="absolute inset-0 block text-sand"
              style={fillStyle}
            >
              رقميات
            </span>
          </div>
        </div>

        {/* خط رفيع على الحافة السفلية */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/15">
          <div
            className="h-full origin-right bg-sand"
            style={lineStyle}
          />
        </div>
      </div>
    </div>
  );
}