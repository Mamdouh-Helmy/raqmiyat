"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// شبكة معيّنات السدو لكروت الأرقام
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.18'/%3E%3C/svg%3E\")";

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = null;

    const runAnimation = () => {
      let startTime = null;
      const easeOutQuad = (t) => t * (2 - t);

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = easeOutQuad(progress);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        }
      };

      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
        } else {
          if (rafId) cancelAnimationFrame(rafId);
          setCount(0);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return { count, ref };
}

// زخارف مشتركة بين الكروت
function CardDecor({ dark }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: lattice,
          backgroundSize: "56px 56px",
          WebkitMaskImage: "radial-gradient(circle at center, #000 0%, transparent 75%)",
          maskImage: "radial-gradient(circle at center, #000 0%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className={`absolute -top-16 -right-16 -z-10 size-48 rounded-full blur-3xl ${
          dark ? "bg-[#c9a66b]/15" : "bg-[#c9a66b]/20"
        }`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b]/70 to-transparent"
      />
    </>
  );
}

function StatCard({ value, label, dark }) {
  const { count, ref } = useCountUp(value);

  return (
    <div
      ref={ref}
      className={`group relative isolate overflow-hidden rounded-xl2 flex flex-col items-center justify-center gap-3 py-10 transition-shadow duration-300 hover:shadow-xl ${
        dark ? "bg-brand-dark text-white" : "card"
      }`}
    >
      <CardDecor dark={dark} />

      <span
        aria-hidden="true"
        className="size-2.5 rotate-45 bg-[#c9a66b] transition-transform duration-500 group-hover:rotate-[135deg] group-hover:scale-125"
      />

      <span
        dir="ltr"
        className={`font-heading text-5xl font-black tabular-nums leading-none ${
          dark
            ? "bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent"
            : "text-ink"
        }`}
      >
        +{count}
      </span>

      <span className={`h-px w-8 bg-[#c9a66b]/70 transition-all duration-500 group-hover:w-16`} aria-hidden="true" />

      <span className={`text-sm ${dark ? "text-white/70" : "text-ink/60"}`}>{label}</span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-6">
        {/* صورة الفريق */}
        <div className="group relative min-h-[280px]">
          <div className="absolute inset-0 rounded-xl2 overflow-hidden bg-brand-dark ring-1 ring-[#c9a66b]/50 shadow-lg">
            <Image
              src="/team.png"
              alt="فريق من الخبراء المحليين"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b] to-transparent"
            />

            <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-xl border border-[#c9a66b]/40 bg-white/90 backdrop-blur px-5 py-3 font-bold text-sm text-ink shadow">
              <span className="size-2 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
              فريق من الخبراء المحليين
            </div>
          </div>

          {/* معيّنات الأركان */}
          {["-top-1.5 -right-1.5", "-top-1.5 -left-1.5", "-bottom-1.5 -right-1.5", "-bottom-1.5 -left-1.5"].map(
            (pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} size-3 rotate-45 border border-[#c9a66b] bg-paper transition-colors duration-300 group-hover:bg-[#c9a66b]`}
              />
            )
          )}
        </div>

        {/* 24/7 */}
        <div className="card group relative isolate overflow-hidden flex flex-col items-center justify-center gap-3 py-10 transition-shadow duration-300 hover:shadow-xl">
          <CardDecor />

          <span
            aria-hidden="true"
            className="size-2.5 rotate-45 bg-[#c9a66b] transition-transform duration-500 group-hover:rotate-[135deg] group-hover:scale-125"
          />
          <span dir="ltr" className="font-heading text-5xl font-black text-ink tabular-nums leading-none">
            24/7
          </span>
          <span className="h-px w-8 bg-[#c9a66b]/70 transition-all duration-500 group-hover:w-16" aria-hidden="true" />
          <span className="text-ink/60 text-sm">دعم فني مستمر</span>
        </div>

        <StatCard value={150} label="مشروع منجز" dark />
      </div>
    </section>
  );
}