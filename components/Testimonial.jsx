"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { SquiggleUnderline } from "./najdi-icons";

const testimonials = [
  {
    text: "تميزت رقميات باحترافية منقطعة النظير في تنفيذ مشروع التحول الرقمي الخاص بمؤسستنا. الجانب الأمني كان مبهراً، مما منحنا الثقة الكاملة في أنظمتنا الجديدة.",
    name: "د. عمر القحطاني",
    role: "المدير التنفيذي",
    company: "مجموعة الحلول المتكاملة",
    big: "أمان كامل",
    small: "تحول رقمي على مستوى المؤسسة",
  },
  {
    text: "فريق رقميات فهم احتياجاتنا من أول اجتماع. التسليم كان في الموعد، والدعم الفني بعد الإطلاق فاق توقعاتنا بمراحل.",
    name: "سارة الغامدي",
    role: "مديرة العمليات",
    company: "شركة أفق للتجارة",
    big: "في الموعد",
    small: "تسليم المشروع",
  },
  {
    text: "شراكتنا مع رقميات حولت بنيتنا التقنية بالكامل. الالتزام بمعايير الأمان العالمية أعطانا راحة بال حقيقية أمام عملائنا.",
    name: "فهد المطيري",
    role: "رئيس قسم التقنية",
    company: "بنك الاستثمار الوطني",
    big: "بنية جديدة",
    small: "إعادة بناء البنية التقنية",
  },
];

const toAr = (n) => String(n).padStart(2, "0").replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const go = (i) => setActive((i + total) % total);
  const t = testimonials[active];

  return (
    <section className="container-x section">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div key={active} className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-end animate-fadeIn">
          <blockquote className="border-r-[3px] border-sand pr-6 md:pr-10">
            <p className="text-2xl md:text-[40px] font-black text-ink leading-[1.6]">
              {t.text}
            </p>
            <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-black text-ink">{t.name}</span>
              <span className="text-ink/50 text-sm">{t.role}</span>
              <span className="flex items-center gap-2 text-sm font-black text-brand">
                <span className="w-2 h-2 bg-sand rotate-45" />
                {t.company}
              </span>
            </footer>
          </blockquote>

          <div className="md:border-r md:border-ink/15 md:pr-8">
            <div className="inline-block">
              <div className="text-5xl md:text-6xl font-black text-brand leading-tight">{t.big}</div>
              <SquiggleUnderline />
            </div>
            <p className="text-ink/50 text-sm mt-3">{t.small}</p>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <span className="font-black text-ink tabular-nums">
            {toAr(active + 1)} <span className="text-ink/30">/ {toAr(total)}</span>
          </span>

          <div className="relative flex-1 h-px bg-ink/15 overflow-hidden">
            <div
              key={active}
              className="absolute inset-y-0 right-0 w-full bg-brand origin-right animate-progress"
              style={{ animationPlayState: paused ? "paused" : "running" }}
              onAnimationEnd={() => go(active + 1)}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => go(active - 1)}
              aria-label="السابق"
              className="w-11 h-11 border border-ink/20 flex items-center justify-center hover:bg-brand hover:text-paper hover:border-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            >
              <ArrowRight size={20} weight="bold" />
            </button>
            <button
              onClick={() => go(active + 1)}
              aria-label="التالي"
              className="w-11 h-11 border border-ink/20 flex items-center justify-center hover:bg-brand hover:text-paper hover:border-brand transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            >
              <ArrowLeft size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}