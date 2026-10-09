// components/SiteMonitoring.jsx
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const INTERVAL = 6000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const pad = (n) =>
  (n + 1).toLocaleString("ar-SA", { minimumIntegerDigits: 2, useGrouping: false });

// نسيج هندسي نجدي خفيف جدًا في الخلفية (معينات متشابكة)
const LATTICE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 2L46 24 24 46 2 24zM24 14L34 24 24 34 14 24z' fill='none' stroke='%23b8934a' stroke-opacity='.14' stroke-width='1'/%3E%3C/svg%3E")`,
  backgroundSize: "48px 48px",
};

const fmtTime = (d) =>
  d.toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

const CORNERS = [
  "top-5 start-5 border-t-2 border-s-2",
  "top-5 end-5 border-t-2 border-e-2",
  "bottom-5 start-5 border-b-2 border-s-2",
  "bottom-5 end-5 border-b-2 border-e-2",
];

function subscribeReducedMotion(callback) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

// بيتابع إعداد "تقليل الحركة" في الجهاز (false على السيرفر)
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
}

export default function SiteMonitoring({ images, locations }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // false بعد ما الزائر يختار كاميرا بنفسه
  const [now, setNow] = useState(null);
  const reducedMotion = useReducedMotion();

  // التشغيل التلقائي: مش بيشتغل لو الزائر اختار بنفسه، أو الجهاز على تقليل الحركة
  const autoplay = auto && !reducedMotion && locations.length > 1;

  // الساعة: أول قراءة بعد الـ mount مباشرة، وبعدها كل ثانية
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % locations.length),
      INTERVAL
    );
    return () => clearInterval(t);
  }, [autoplay, locations.length]);

  const select = (i) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section className="section bg-brand-dark" style={LATTICE}>
      <style>{`
        @keyframes smScan { from { transform: translateY(-100%); } to { transform: translateY(650%); } }
        @keyframes smBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .sm-scan { animation: smScan 1.4s cubic-bezier(.5,0,.3,1) 0.2s both; }
        .sm-bar { transform-origin: right; animation: smBar ${INTERVAL}ms linear both; }
        @media (prefers-reduced-motion: reduce) { .sm-scan, .sm-bar { animation: none; } .sm-scan { display: none; } }
      `}</style>

      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-6xl">
              عيننا على كل زاوية
              <br />
              في منشأتك
            </h2>
            <p className="mt-5 max-w-md leading-loose text-white/65">
              عدسات مثبّتة في كل نقطة حساسة، تنقل الصورة بدقة عالية لحظة
              بلحظة، وتحفظها لك لمراجعتها وقت ما تحتاج.
            </p>
          </div>

          <div className="flex items-center gap-4 border-white/15 md:border-s md:ps-8">
            <span className="font-heading text-6xl font-extrabold leading-none text-sand md:text-7xl">
              {pad(locations.length - 1)}
            </span>
            <span className="flex flex-col gap-1 text-sm font-bold text-white/80">
              <span className="flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-red-500" />
                كاميرات
              </span>
              <span>تعمل الآن</span>
            </span>
          </div>
        </div>

        {/* جدار الكاميرات: الكاميرا النشطة تتمدد والباقي يتجمع شرائح */}
        <div
          role="group"
          aria-label="اختيار الكاميرا"
          className="flex h-[620px] flex-col gap-2 md:gap-3 lg:h-[600px] lg:flex-row"
        >
          {locations.map((loc, i) => {
            const isActive = i === active;
            return (
              <button
                key={loc}
                type="button"
                aria-pressed={isActive}
                aria-label={loc}
                onClick={() => select(i)}
                className={`group relative min-h-0 min-w-0 overflow-hidden rounded-xl2 text-start outline-none ring-1 ring-sand/25 transition-[flex] duration-700 ease-[cubic-bezier(.7,0,.2,1)] focus-visible:ring-2 focus-visible:ring-sand ${
                  isActive ? "flex-[6]" : "flex-[1] hover:ring-sand/60"
                }`}
              >
                <Image
                  src={images[i]}
                  alt={isActive ? loc : ""}
                  fill
                  priority={i === 0}
                  sizes={isActive ? "(min-width: 1024px) 800px, 100vw" : "200px"}
                  className={`object-cover transition-all duration-700 ${
                    isActive
                      ? "scale-100 grayscale-0"
                      : "scale-110 grayscale brightness-[.45] group-hover:brightness-75"
                  }`}
                />

                {/* حالة الشريحة المطوية */}
                <span
                  className={`absolute inset-0 flex items-center justify-center gap-3 px-4 transition-opacity duration-500 lg:flex-col lg:justify-between lg:py-6 ${
                    isActive ? "opacity-0" : "opacity-100 delay-300"
                  }`}
                >
                  <span className="font-heading text-xl font-extrabold text-sand">
                    {pad(i)}
                  </span>
                  <span className="font-heading text-base font-bold text-white lg:[writing-mode:vertical-rl]">
                    {loc}
                  </span>
                  <span aria-hidden className="hidden size-2 rounded-full bg-white/40 lg:block" />
                </span>

                {/* حالة الشاشة النشطة */}
                {isActive && (
                  <span className="absolute inset-0 animate-fadeIn">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
                    />
                    <span
                      aria-hidden
                      className="sm-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-sand/25 to-transparent"
                    />

                    {CORNERS.map((c) => (
                      <span
                        key={c}
                        aria-hidden
                        className={`absolute size-7 border-sand ${c}`}
                      />
                    ))}

                    <span className="absolute inset-x-0 top-0 flex items-center justify-between px-10 pt-9 text-white">
                      <span className="flex items-center gap-2 rounded-full bg-black/50 px-3.5 py-1.5 text-xs font-bold backdrop-blur-sm">
                        <span className="size-2 animate-pulse rounded-full bg-red-500" />
                        بث مباشر
                      </span>
                      <span dir="ltr" className="text-sm font-bold tabular-nums text-white/90">
                        {now ? fmtTime(now) : "\u00A0"}
                      </span>
                    </span>

                    <span className="absolute inset-x-0 bottom-0 block px-10 pb-10 text-white">
                      <span className="block text-sm font-bold text-sand">
                        كاميرا {pad(i)}
                      </span>
                      <span className="mt-1 block font-heading text-3xl font-extrabold md:text-5xl">
                        {loc}
                      </span>
                    </span>

                    {autoplay && (
                      <span
                        aria-hidden
                        key={`bar-${i}`}
                        className="sm-bar absolute inset-x-0 bottom-0 h-1 bg-sand"
                      />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}