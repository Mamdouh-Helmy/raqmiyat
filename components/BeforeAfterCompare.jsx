// components/BeforeAfterCompare.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight, Moon, Sun } from "lucide-react";

// نفس النسيج الهندسي النجدي المستخدم في SiteMonitoring
const LATTICE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 2L46 24 24 46 2 24zM24 14L34 24 24 34 14 24z' fill='none' stroke='%23b8934a' stroke-opacity='.14' stroke-width='1'/%3E%3C/svg%3E")`,
  backgroundSize: "48px 48px",
};

const CORNERS = [
  "top-5 left-5 border-t-2 border-l-2",
  "top-5 right-5 border-t-2 border-r-2",
  "bottom-5 left-5 border-b-2 border-l-2",
  "bottom-5 right-5 border-b-2 border-r-2",
];

export default function BeforeAfterCompare({ beforeImage, afterImage }) {
  // position = نسبة ظهور الصورة العادية من اليسار (٠–١٠٠)
  const [position, setPosition] = useState(50);
  const posRef = useRef(50);
  const rafRef = useRef(0);
  const interacted = useRef(false);
  const frameRef = useRef(null);

  const apply = (v) => {
    posRef.current = v;
    setPosition(v);
  };

  const tween = (to, duration = 900) =>
    new Promise((resolve) => {
      cancelAnimationFrame(rafRef.current);
      const from = posRef.current;
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - k, 3);
        apply(from + (to - from) * eased);
        if (k < 1) rafRef.current = requestAnimationFrame(step);
        else resolve();
      };
      rafRef.current = requestAnimationFrame(step);
    });

  const takeControl = () => {
    interacted.current = true;
    cancelAnimationFrame(rafRef.current);
  };

  // حركة تعريفية مرة واحدة أول ما القسم يظهر: يمين، شمال، رجوع للنص
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        await new Promise((r) => setTimeout(r, 350));
        if (interacted.current) return;
        await tween(10, 1000);
        if (interacted.current) return;
        await tween(90, 1500);
        if (interacted.current) return;
        await tween(50, 900);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const showingBefore = position > 85;
  const showingAfter = position < 15;

  const jump = (to) => {
    takeControl();
    tween(to, 700);
  };

  return (
    <section className="section bg-brand-dark" style={LATTICE}>
      <div className="container-x">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-6xl">
              شاهد الفرق
              <br />
              بنفسك
            </h2>
            <p className="mt-5 max-w-md leading-loose text-white/65">
              حرّك الخط لترى كيف تتحول الرؤية العادية إلى وضوح كامل مع تقنية
              الرؤية الليلية الذكية.
            </p>
          </div>

          <div
            role="group"
            aria-label="تبديل العرض"
            className="flex shrink-0 self-start rounded-full border border-sand/30 bg-black/20 p-1 md:self-auto"
          >
            <button
              type="button"
              aria-pressed={showingBefore}
              onClick={() => jump(100)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sand ${
                showingBefore ? "bg-white text-brand-dark" : "text-white/70 hover:text-white"
              }`}
            >
              <Sun size={15} />
              كاميرا عادية
            </button>
            <button
              type="button"
              aria-pressed={showingAfter}
              onClick={() => jump(0)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sand ${
                showingAfter ? "bg-sand text-brand-dark" : "text-white/70 hover:text-white"
              }`}
            >
              <Moon size={15} />
              رؤية رقميات الذكية
            </button>
          </div>
        </div>

        <div
          ref={frameRef}
          dir="ltr"
          className="relative aspect-[4/3] select-none overflow-hidden rounded-xl2 bg-black ring-1 ring-sand/30 focus-within:ring-2 focus-within:ring-sand md:aspect-[16/8]"
        >
          {/* After: الصورة كاملة */}
          <Image
            src={afterImage}
            alt="رؤية ليلية واضحة"
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
            draggable={false}
          />

          {/* Before: مقصوصة بـ clip-path فقط */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={beforeImage}
              alt="رؤية عادية"
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
              draggable={false}
            />
          </div>

          {CORNERS.map((c) => (
            <span
              key={c}
              aria-hidden
              className={`pointer-events-none absolute size-7 border-sand/90 ${c}`}
            />
          ))}

          {/* التسميات */}
          <div className="pointer-events-none absolute left-12 top-8 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <Sun size={13} />
            كاميرا عادية
          </div>
          <div className="pointer-events-none absolute right-12 top-8 flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-bold text-brand-dark">
            <Moon size={13} />
            رؤية رقميات الذكية
          </div>

          {/* الخط الفاصل: شعاع مضيء */}
          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-sand shadow-[0_0_24px_4px_rgba(184,147,74,0.55)]"
            style={{ left: `${position}%` }}
          >
            <div
              aria-hidden
              className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-sand/25 to-transparent"
            />
            <div className="absolute left-0 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sand text-brand-dark shadow-lg ring-4 ring-brand-dark/40">
              <ChevronsLeftRight size={22} strokeWidth={2.5} />
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="any"
            value={position}
            onPointerDown={takeControl}
            onKeyDown={takeControl}
            onChange={(e) => apply(Number(e.target.value))}
            style={{ touchAction: "pan-y" }}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            aria-label="قارن بين الرؤية العادية والرؤية الليلية"
          />
        </div>
      </div>
    </section>
  );
}