// components/BeforeAfterCompare.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// حروف مفرغة: بتمثّل الرؤية الغير واضحة
const hollow = {
  WebkitTextStroke: "2px rgba(255,255,255,0.9)",
  WebkitTextFillColor: "transparent",
};

const HEADLINE =
  "font-heading text-[15vw] leading-[1.1] md:text-[9.5vw] md:leading-[1.05]";

export default function BeforeAfterCompare({ beforeImage, afterImage }) {
  // position = نسبة ظهور الصورة العادية من اليسار (٠–١٠٠)
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
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
    setTouched(true);
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
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const jump = (to) => {
    takeControl();
    tween(to, 700);
  };

  const dominant = position >= 50 ? "before" : "after";

  return (
    <section
      ref={frameRef}
      dir="ltr"
      className="relative isolate h-[88svh] min-h-[34rem] select-none overflow-hidden bg-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-sand md:min-h-[40rem]"
    >
      {/* After: الصورة كاملة */}
      <Image
        src={afterImage}
        alt="رؤية ليلية واضحة"
        fill
        sizes="100vw"
        className="object-cover"
        draggable={false}
      />

      {/* Before: مقصوصة بـ clip-path فقط */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={beforeImage}
          alt="رؤية عادية"
          fill
          sizes="100vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* تعتيم خفيف للقراءة بس */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/55"
      />

      {/* العنوان: نفس الكلام مرتين، مفرّغ على جهة الكاميرا العادية ومليان على جهة رقميات */}
      <div
        dir="rtl"
        className="pointer-events-none absolute inset-x-0 top-0 px-4 pt-24 text-center md:pt-32"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <h2 className={`${HEADLINE} text-white`} style={hollow}>
          شاهد الفرق بنفسك
        </h2>
      </div>
      <div
        dir="rtl"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 px-4 pt-24 text-center md:pt-32"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <p className={`${HEADLINE} text-sand`}>شاهد الفرق بنفسك</p>
      </div>

      <p
        dir="rtl"
        className="pointer-events-none absolute inset-x-0 top-[calc(6rem+30vw)] mx-auto max-w-md px-6 text-center leading-loose text-white/80 md:top-[calc(8rem+19vw)]"
      >
        حرّك الخط لترى كيف تتحول الرؤية العادية إلى وضوح كامل مع تقنية الرؤية الليلية الذكية.
      </p>

      {/* الخط الفاصل: خط أبيض رفيع بيعدّي على العنوان نفسه */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
        style={{ left: `${position}%` }}
      >
        <ChevronLeft
          size={22}
          strokeWidth={2.5}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
        />
        <ChevronRight
          size={22}
          strokeWidth={2.5}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
        />
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
        className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
        aria-label="قارن بين الرؤية العادية والرؤية الليلية"
      />

      {/* التسميات: نص بسيط في الركنين، وبيشتغلوا كزراير */}
      <button
        type="button"
        dir="rtl"
        aria-pressed={position > 85}
        onClick={() => jump(100)}
        className={`absolute bottom-6 left-6 z-20 py-2 text-base font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-sand md:bottom-10 md:left-10 md:text-xl ${
          dominant === "before" ? "text-white" : "text-white/50 hover:text-white"
        }`}
      >
        كاميرا عادية
      </button>
      <button
        type="button"
        dir="rtl"
        aria-pressed={position < 15}
        onClick={() => jump(0)}
        className={`absolute bottom-6 right-6 z-20 py-2 text-base font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-sand md:bottom-10 md:right-10 md:text-xl ${
          dominant === "after" ? "text-sand" : "text-white/50 hover:text-white"
        }`}
      >
        رؤية رقميات الذكية
      </button>

      <span
        aria-hidden="true"
        dir="rtl"
        className={`pointer-events-none absolute inset-x-0 bottom-8 text-center text-sm text-white/70 transition-opacity duration-700 md:bottom-12 ${
          touched ? "opacity-0" : "opacity-100"
        }`}
      >
        اسحب يمين وشمال
      </span>
    </section>
  );
}