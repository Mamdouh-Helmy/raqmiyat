"use client";

import { useState } from "react";

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

const steps = [
  { num: "٠١", title: "التخطيط", text: "تحليل المتطلبات وتحديد الأهداف التقنية بدقة." },
  { num: "٠٢", title: "التطوير", text: "بناء الواجهات والأنظمة بأحدث التقنيات البرمجية." },
  { num: "٠٣", title: "الأمان", text: "فحص شامل للثغرات وضمان حماية البيانات والأنظمة." },
  { num: "٠٤", title: "الدعم", text: "تشغيل النظام ومتابعته لضمان استمرارية العمل." },
];

function MobileSteps() {
  return (
    <div className="md:hidden relative">
      {/* vertical connecting line on the right (RTL start side) */}
      <div className="absolute top-2 bottom-2 right-8 w-0.5 bg-brand/15" />

      <div className="flex flex-col gap-8">
        {steps.map((s) => (
          <div key={s.num} className="relative flex items-start gap-5 pr-0">
            <div className="relative z-10 w-16 h-16 shrink-0 rounded-2xl bg-white border border-brand/20 shadow-sm text-brand font-black text-base flex items-center justify-center">
              {s.num}
            </div>
            <div className="pt-2 text-right">
              <h3 className="font-black text-ink mb-1">{s.title}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProcessSteps() {
  const [hovered, setHovered] = useState(null);

  const isLast = hovered === steps.length - 1;
  const fillPercent =
    hovered === null
      ? 0
      : isLast
      ? 100
      : ((hovered + 0.5) / steps.length) * 100;

  return (
    <section className="container-x section text-center">
      <div className="inline-block mb-4">
        <h2 className="text-3xl font-black text-ink">
          كيف نبني مستقبلك الرقمي؟
        </h2>
        <SquiggleUnderline />
      </div>
      <p className="text-ink/60 mb-14 max-w-lg mx-auto">
        منهجية عمل سعودية بمعايير عالمية تضمن لك الجودة والأمان في كل خطوة.
      </p>

      {/* Mobile: vertical timeline, no hover interaction needed */}
      <MobileSteps />

      {/* Desktop: horizontal timeline with hover fill */}
      <div className="hidden md:grid relative grid-cols-4 gap-6">
        <div className="absolute top-9 right-0 left-0 h-0.5 bg-brand/15" />

        <div
          className="absolute top-9 right-0 h-0.5 bg-brand transition-all duration-500 ease-out"
          style={{ width: `${fillPercent}%` }}
        />

        <div className="absolute top-9 right-0 w-2 h-2 -mt-[3px] rounded-full bg-brand" />

        <div
          className={`absolute top-9 left-0 w-2 h-2 -mt-[3px] rounded-full transition-colors duration-500 ${
            isLast ? "bg-brand" : "bg-brand/20"
          }`}
        />

        {steps.map((s, i) => (
          <div
            key={s.num}
            className="relative flex flex-col items-center text-center group"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={`relative z-10 w-[72px] h-[72px] rounded-2xl bg-white border font-black text-lg flex items-center justify-center mb-6 transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-lg ${
                hovered === i
                  ? "border-brand text-brand shadow-lg"
                  : "border-brand/15 text-brand/70"
              }`}
            >
              {s.num}
            </div>
            <h3 className="font-black text-ink mb-2">{s.title}</h3>
            <p className="text-ink/60 text-sm leading-relaxed max-w-[220px]">
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}