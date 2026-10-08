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
      }, TOTAL);

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

  const logoStyle =
    phase === "in"
      ? {
          opacity: 1,
          transform: "translateY(0) scale(1)",
          transition: "all 400ms ease-out 380ms",
        }
      : phase === "out"
      ? {
          opacity: 0,
          transform: "translateY(-12px) scale(1.04)",
          transition: "all 250ms ease-in",
        }
      : {
          opacity: 0,
          transform: "translateY(12px) scale(0.96)",
          transition: "none",
        };

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

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex flex-col items-center gap-3"
          style={logoStyle}
        >
          <Image
            src="/logo.png"
            alt=""
            width={66}
            height={66}
            className="rounded-md object-contain"
          />
          <span className="font-heading text-4xl text-white">رقميات</span>
        </div>
      </div>
    </div>
  );
}