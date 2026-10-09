// components/SiteLoader.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isArrival } from "@/lib/arrival";

const MIN_VISIBLE = 700; // أقل مدة ظهور (ms)
const FONT_WAIT = 1200; // أقصى انتظار للخطوط، بعده نكمل حتى لو لسه بتتحمل
const MAX_WAIT = 3000; // أمان: يقفل بعد كده مهما حصل
const EXIT_MS = 650; // مدة حركة الستارة

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.06'/%3E%3C/svg%3E\")";

export default function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | leaving | done

  useEffect(() => {
    // جاي من دومين شقيق: PageTransition هي اللي بتفتح، مفيش لودر
    if (isArrival()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- الحالة بتعتمد على flag بيتقرا من المتصفح بس، ولو اتحط في useState هيعمل hydration mismatch
      setPhase("done");
      return;
    }

    const root = document.documentElement;
    const start = performance.now();
    root.style.overflow = "hidden";

    let fontsDone = !document.fonts;
    let shown = 0;
    let rafId;
    let exitTimer;

    document.fonts?.ready.then(() => (fontsDone = true)).catch(() => (fontsDone = true));

    const finish = () => {
      setProgress(100);
      setPhase("leaving");
      root.style.overflow = "";
      exitTimer = setTimeout(() => setPhase("done"), EXIT_MS + 100);
    };

    // العداد مبني على الوقت، ومش بيستنى load ولا الصور.
    // الخطوط بس هي اللي ممكن توقفه عند 85% لحد FONT_WAIT.
    const loop = (now) => {
      const elapsed = now - start;
      const forced = elapsed > MAX_WAIT;
      const fontsReady = fontsDone || elapsed > FONT_WAIT;

      const timeRatio = Math.min(1, elapsed / MIN_VISIBLE);
      const base = 10 + 90 * timeRatio;
      const target = forced ? 100 : fontsReady ? base : Math.min(base, 85);

      const step = Math.max(0.8, (target - shown) * 0.2);
      shown = Math.max(shown, Math.min(target, shown + step));
      setProgress(Math.round(shown));

      if (shown >= 99.5 && elapsed >= MIN_VISIBLE) {
        finish();
        return;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimer);
      root.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;
  const leaving = phase === "leaving";

  return (
    <div
      id="site-loader"
      role="status"
      aria-live="polite"
      aria-label="جاري تحميل الموقع"
      className={`fixed inset-0 z-[9999] text-white transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
        leaving ? "pointer-events-none" : ""
      }`}
      style={{
        transitionDuration: `${EXIT_MS}ms`,
        transform: leaving ? "translateY(calc(-100% - 10vh))" : "translateY(0)",
      }}
    >
      {/* جسم الستارة */}
      <div className="absolute inset-0 overflow-hidden bg-brand-dark">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: lattice,
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(ellipse at center, #000 0%, transparent 80%)",
            maskImage: "radial-gradient(ellipse at center, #000 0%, transparent 80%)",
          }}
        />

        {/* الشريط العلوي */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6 md:px-14 md:pt-10">
          <Image
            src="/logo.webp"
            alt=""
            width={32}
            height={32}
            priority
            className="size-8 object-contain opacity-90"
          />
          <span className="text-[11px] font-bold tracking-widest text-white/40">
            مستقبل البرمجيات برؤية سعودية
          </span>
        </div>

        {/* الاسم: مفرغ، وتعبئة ذهبية بتمسح من اليمين مع التقدم */}
        <div
          className={`absolute inset-0 grid place-items-center px-6 transition-all duration-500 ease-out motion-reduce:transition-none ${
            leaving ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="relative select-none font-heading text-[5.5rem] leading-[1.2] sm:text-[8rem] md:text-[11rem] lg:text-[14rem]">
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.4)" }}
            >
              رقميات
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 block text-sand"
              style={{ clipPath: `inset(0 0 0 ${100 - progress}%)` }}
            >
              رقميات
            </span>
          </div>
        </div>

        {/* الشريط السفلي */}
        <div
          className={`absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-8 transition-opacity duration-300 md:px-14 md:pb-12 ${
            leaving ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-xs font-bold tracking-widest text-white/40">جاري التحميل</span>
          <span
            dir="ltr"
            className="font-heading text-6xl leading-none text-sand tabular-nums md:text-8xl"
          >
            {toAr(progress)}
          </span>
        </div>

        {/* خط التقدم الرفيع على الحافة */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
          <div
            className="h-full origin-right bg-sand"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>

      {/* حافة منحنية تحت الستارة */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-full h-[10vh] w-full text-brand-dark"
      >
        <path d="M0 0H100Q50 10 0 0Z" fill="currentColor" />
      </svg>
    </div>
  );
}