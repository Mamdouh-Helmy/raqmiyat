"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "تميزت رقميات باحترافية منقطعة النظير في تنفيذ مشروع التحول الرقمي الخاص بمؤسستنا. الجانب الأمني كان مبهراً، مما منحنا الثقة الكاملة في أنظمتنا الجديدة.",
    name: "د. عمر القحطاني",
    role: "المدير التنفيذي، مجموعة الحلول المتكاملة",
    initials: "ع.ق",
  },
  {
    text: "فريق رقميات فهم احتياجاتنا من أول اجتماع. التسليم كان في الموعد، والدعم الفني بعد الإطلاق فاق توقعاتنا بمراحل.",
    name: "سارة الغامدي",
    role: "مديرة العمليات، شركة أفق للتجارة",
    initials: "س.غ",
  },
  {
    text: "شراكتنا مع رقميات حولت بنيتنا التقنية بالكامل. الالتزام بمعايير الأمان العالمية أعطانا راحة بال حقيقية أمام عملائنا.",
    name: "فهد المطيري",
    role: "رئيس قسم التقنية، بنك الاستثمار الوطني",
    initials: "ف.م",
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const go = (i) => setActive((i + testimonials.length) % testimonials.length);
  const t = testimonials[active];

  return (
    <section className="container-x section">
      <div
        className="card p-6 md:p-12 relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          key={active}
          className="flex flex-col md:grid md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center animate-fadeIn"
        >
          <div className="w-20 h-20 md:w-40 md:h-40 rounded-xl2 overflow-hidden bg-brand-dark flex items-center justify-center shrink-0 order-1 md:order-2">
            <span className="text-white text-lg md:text-3xl font-black">
              {t.initials}
            </span>
          </div>

          <div className="text-center md:text-right order-2 md:order-1">
            <span className="hidden md:inline text-5xl text-ink/10 font-black leading-none">
              ”
            </span>
            <p className="text-base md:text-xl text-ink leading-relaxed mt-0 md:mt-2 mb-5 md:mb-6">
              {t.text}
            </p>
            <div className="inline-block md:block border-b-2 md:border-b-0 md:border-r-2 border-brand pb-2 md:pb-0 md:pr-3">
              <p className="font-black text-ink text-sm md:text-base">{t.name}</p>
              <p className="text-ink/50 text-xs md:text-sm">{t.role}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 md:mt-10">
          <button
            onClick={() => go(active + 1)}
            aria-label="السابق"
            className="w-9 h-9 rounded-full border border-ink/10 flex items-center justify-center hover:bg-brand-soft transition-colors shrink-0"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`الرأي ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-brand" : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(active - 1)}
            aria-label="التالي"
            className="w-9 h-9 rounded-full border border-ink/10 flex items-center justify-center hover:bg-brand-soft transition-colors shrink-0"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}