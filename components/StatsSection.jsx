"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

function StatCard({ value, label, dark }) {
  const { count, ref } = useCountUp(value);

  return (
    <div
      ref={ref}
      className={`rounded-xl2 flex flex-col items-center justify-center gap-2 py-10 ${
        dark ? "bg-brand-dark text-white" : "card"
      }`}
    >
      <span className={`text-4xl font-black tabular-nums ${dark ? "text-white" : "text-ink"}`}>
        +{count}
      </span>
      <span className={`text-sm ${dark ? "text-white/70" : "text-ink/60"}`}>
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-6">
        <div className="relative rounded-xl2 overflow-hidden min-h-[280px]">
          <Image
            src="/team.png"
            alt="فريق من الخبراء المحليين"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur px-5 py-3 rounded-xl font-bold text-sm text-ink shadow">
            فريق من الخبراء المحليين
          </div>
        </div>

        <div className="card flex flex-col items-center justify-center gap-2 py-10">
          <span className="text-4xl font-black text-ink tabular-nums">24/7</span>
          <span className="text-ink/60 text-sm">دعم فني مستمر</span>
        </div>

        <StatCard value={150} label="مشروع منجز" dark />
      </div>
    </section>
  );
}