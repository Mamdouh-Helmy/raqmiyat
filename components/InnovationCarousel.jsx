"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "الابتكار الرقمي بلا حدود",
    text: "نطوع الذكاء الاصطناعي لخدمة أعمالك وخلق فرص نمو جديدة ومستدامة في السوق السعودي المتطور.",
    cta: "استكشف حلولنا",
    image: "/carousel/ai.png",
  },
  {
    title: "شراكة تقنية تدوم",
    text: "فريق من الخبراء يرافقك من التخطيط حتى الإطلاق، بمعايير جودة وأمان عالمية.",
    cta: "تعرف على فريقنا",
    image: "/carousel/team.png",
  },
  {
    title: "حلول مصممة لرؤية 2030",
    text: "نواكب أهداف التحول الرقمي في المملكة بحلول برمجية سيادية وآمنة.",
    cta: "اقرأ المزيد",
    image: "/carousel/vision2030.png",
  },
];

function SquiggleUnderline() {
  return (
    <div
      className="w-full -mt-0.5"
      style={{
        height: "8px",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='8' viewBox='0 0 24 8'%3E%3Cpath d='M0 4 Q6 -1 12 4 T24 4' stroke='%231c3b2e' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 8px",
      }}
    />
  );
}

export default function InnovationCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const slide = slides[active];
  const go = (i) => setActive((i + slides.length) % slides.length);

  return (
    <section className="container-x section">
      <div
        className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="card p-10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
          <button
            onClick={() => go(active - 1)}
            aria-label="السابق"
            className="absolute top-6 left-6 w-9 h-9 rounded-full border border-ink/10 flex items-center justify-center hover:bg-brand-soft transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(active + 1)}
            aria-label="التالي"
            className="absolute top-6 right-6 w-9 h-9 rounded-full border border-ink/10 flex items-center justify-center hover:bg-brand-soft transition-colors"
          >
            <ChevronRight size={16} />
          </button>

          <div key={active} className="animate-fadeIn">
            <div className="inline-block mb-4">
              <h2 className="text-3xl font-black text-ink">{slide.title}</h2>
              <SquiggleUnderline />
            </div>
            <p className="text-ink/60 leading-relaxed max-w-xl mb-10">
              {slide.text}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button className="btn-cta">{slide.cta}</button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`الشريحة ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-6 bg-brand" : "w-1.5 bg-ink/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          key={`bg-${active}`}
          className="relative rounded-xl2 overflow-hidden min-h-[300px] animate-fadeIn"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 via-sky-900/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}