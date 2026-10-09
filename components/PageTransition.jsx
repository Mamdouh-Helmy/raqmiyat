// components/PageTransition.jsx
"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { finishArrival, isArrival } from "@/lib/arrival";
import { COVER, STRIPS, TOTAL, getCurtainStyles } from "@/lib/curtainStyles";
import { resolveCrossDomainTarget } from "@/lib/links";

const NAVIGATION_TIMEOUT = 4000; // لو الصفحة اتأخرت، اكشف بعد كده
const ARRIVAL_HOLD = 250; // وقفة قبل ما الستارة تفتح بعد الوصول من دومين شقيق
const FONTS_MAX_WAIT = 1500;

const LAYERS = ["sand", "brand"];
const LAYER_BG = { sand: "bg-sand", brand: "bg-brand" };

// نفس شبكة المعيّنات المستخدمة في اللودر
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.08'/%3E%3C/svg%3E\")";

const isPlainLeftClick = (e) =>
  !e.defaultPrevented &&
  e.button === 0 &&
  !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);

const opensElsewhere = (link) =>
  (link.target && link.target !== "_self") || link.hasAttribute("download");

// نفس الصفحة (أو مجرد hash)
const isSamePage = (url) =>
  url.pathname === window.location.pathname &&
  url.search === window.location.search;

const fontsReady = () =>
  Promise.race([
    document.fonts?.ready,
    new Promise((resolve) => setTimeout(resolve, FONTS_MAX_WAIT)),
  ]);

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();

  const [phase, setPhase] = useState("idle");
  const [instant, setInstant] = useState(false);
  const phaseRef = useRef("idle");
  const covered = useRef(false); // الستارة غطّت الشاشة
  const arrived = useRef(false); // الصفحة الجديدة وصلت
  const timers = useRef([]);

  const go = useCallback((next) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const later = useCallback((fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const reveal = useCallback(() => {
    go("out");
    later(() => go("idle"), TOTAL + 50);
  }, [go, later]);

  const tryReveal = useCallback(() => {
    if (phaseRef.current === "in" && covered.current && arrived.current) {
      reveal();
    }
  }, [reveal]);

  // ───── الوصول من دومين شقيق: الستارة مقفولة من أول فريم ثم تفتح ─────
  useLayoutEffect(() => {
    if (!isArrival()) return;

    let cancelled = false;

    /* eslint-disable react-hooks/set-state-in-effect --
       لازم يحصل قبل أول paint، والـ flag بيتقرا من المتصفح بس (تجنّب hydration mismatch) */
    setInstant(true);
    go("in");
    /* eslint-enable react-hooks/set-state-in-effect */

    finishArrival(); // الستارة اتركّبت، نقدر نظهر الصفحة

    fontsReady().then(() => {
      if (cancelled) return;
      later(() => {
        setInstant(false);
        reveal();
      }, ARRIVAL_HOLD);
    });

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [go, later, reveal, clearTimers]);

  // ───── الصفحة الجديدة وصلت (تنقل داخلي) ─────
  useEffect(() => {
    arrived.current = true;
    tryReveal();
  }, [pathname, tryReveal]);

  // ───── رجوع من bfcache (زر Back): ما نسيبش الستارة مقفولة ─────
  useEffect(() => {
    const onPageShow = (e) => {
      if (!e.persisted) return;
      clearTimers();
      setInstant(false);
      go("idle");
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [go, clearTimers]);

  // ───── طريقتين للانتقال ─────
  const leaveToDomain = useCallback(
    (href) => {
      clearTimers();
      go("in");
      later(() => window.location.assign(href), COVER);
      later(reveal, NAVIGATION_TIMEOUT); // لو التحميل فشل، ما نسيبش الستارة مقفولة
    },
    [clearTimers, go, later, reveal]
  );

  const navigateInternally = useCallback(
    (url) => {
      clearTimers();
      covered.current = false;
      arrived.current = false;
      go("in");
      router.push(url.pathname + url.search + url.hash);

      later(() => {
        covered.current = true;
        tryReveal();
      }, COVER);

      later(() => {
        covered.current = true;
        arrived.current = true;
        tryReveal();
      }, NAVIGATION_TIMEOUT);
    },
    [clearTimers, go, later, router, tryReveal]
  );

  // ───── اعتراض الضغط على اللينكات ─────
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e) => {
      if (reduceMotion.matches || phaseRef.current !== "idle") return;
      if (!isPlainLeftClick(e)) return;

      const link = e.target?.closest?.("a[href]");
      if (!link || opensElsewhere(link)) return;

      const url = new URL(link.href, window.location.href);

      const crossDomain = resolveCrossDomainTarget(url, window.location.origin);
      if (crossDomain) {
        e.preventDefault();
        leaveToDomain(crossDomain);
        return;
      }

      // دومين خارجي، أو نفس الصفحة: سيبه عادي
      if (url.origin !== window.location.origin || isSamePage(url)) return;

      e.preventDefault();
      navigateInternally(url);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [leaveToDomain, navigateInternally]);

  useEffect(() => clearTimers, [clearTimers]);

  const styles = getCurtainStyles(phase, instant);

  return (
    <div
      aria-hidden="true"
      // visible: عشان تفضل ظاهرة حتى لو الـ body مخفي لحظة الوصول
      className={`visible fixed inset-0 z-[100] overflow-hidden ${
        phase === "idle" ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      {LAYERS.map((layer) => (
        <div key={layer} className="absolute inset-0 flex">
          {Array.from({ length: STRIPS }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 will-change-transform ${LAYER_BG[layer]}`}
              style={{ marginInline: "-0.5px", ...styles.strip(layer, i) }}
            />
          ))}
        </div>
      ))}

      {/* المحتوى فوق الشرائط */}
      <div className="absolute inset-0 text-white" style={styles.content}>
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
            <span className="absolute inset-0 block text-sand" style={styles.fill}>
              رقميات
            </span>
          </div>
        </div>

        {/* خط رفيع على الحافة السفلية */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/15">
          <div className="h-full origin-right bg-sand" style={styles.line} />
        </div>
      </div>
    </div>
  );
}