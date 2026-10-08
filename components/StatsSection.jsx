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
        setCount(Math.round(easeOutQuad(progress) * target));
        if (progress < 1) rafId = requestAnimationFrame(step);
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

function ProjectsStat() {
  const { count, ref } = useCountUp(150);

  return (
    <div ref={ref}>
      <div
        dir="ltr"
        className="text-right font-heading text-6xl font-extrabold tabular-nums leading-none text-sand md:text-7xl lg:text-8xl"
      >
        +{count}
      </div>
      <p className="mt-4 text-base font-bold text-white/80 md:text-lg">مشروع منجز</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="container-x section">
      <div className="grid overflow-hidden rounded-xl2 bg-brand-dark text-white md:grid-cols-2">
        {/* صورة الفريق: من الحافة للحافة وبطول اللوح كله */}
        <div className="relative min-h-[280px] md:min-h-[420px]">
          <Image
            src="/team.png"
            alt="فريق من الخبراء المحليين"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* الأرقام */}
        <div className="flex flex-col justify-center divide-y divide-white/15 px-6 md:px-14">
          <div className="py-10 md:py-12">
            <ProjectsStat />
          </div>

          <div className="py-10 md:py-12">
            <div
              dir="ltr"
              className="text-right font-heading text-6xl font-extrabold leading-none text-sand md:text-7xl lg:text-8xl"
            >
              24/7
            </div>
            <p className="mt-4 text-base font-bold text-white/80 md:text-lg">دعم فني مستمر</p>
          </div>
        </div>
      </div>
    </section>
  );
}