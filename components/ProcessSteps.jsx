"use client";

import { useEffect, useRef, useState } from "react";
import { Compass, Code, ShieldCheck, Headset } from "@phosphor-icons/react";
import { SquiggleUnderline } from "./najdi-icons";

const IconPlan = (p) => <Compass weight="duotone" {...p} />;
const IconCode = (p) => <Code weight="duotone" {...p} />;
const IconShield = (p) => <ShieldCheck weight="duotone" {...p} />;
const IconSupport = (p) => <Headset weight="duotone" {...p} />;

const steps = [
  { num: "٠١", title: "التخطيط", text: "تحليل المتطلبات وتحديد الأهداف التقنية بدقة.", get: "وثيقة المتطلبات", Icon: IconPlan },
  { num: "٠٢", title: "التطوير", text: "بناء الواجهات والأنظمة بأحدث التقنيات البرمجية.", get: "نسخة تجريبية كل أسبوعين", Icon: IconCode },
  { num: "٠٣", title: "الأمان", text: "فحص شامل للثغرات وضمان حماية البيانات والأنظمة.", get: "تقرير اختبار اختراق", Icon: IconShield },
  { num: "٠٤", title: "الدعم", text: "تشغيل النظام ومتابعته لضمان استمرارية العمل.", get: "دعم فني مستمر", Icon: IconSupport },
];

const outline = (filled) => ({
  WebkitTextStroke: "1.5px #1c3b2e",
  color: filled ? "#1c3b2e" : "transparent",
});

function GetLine({ children }) {
  return (
    <p className="mt-4 flex items-center gap-2 text-sm font-black text-sand-deep">
      <span className="w-1.5 h-1.5 rotate-45 bg-sand shrink-0" />
      <span className="text-ink/45 font-bold">تستلم:</span>
      {children}
    </p>
  );
}

export default function ProcessSteps() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [hov, setHov] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="container-x section">
      <div className="max-w-xl mb-12 md:mb-4">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl font-black text-ink leading-[1.3]">
            كيف نبني مستقبلك الرقمي؟
          </h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 mt-5 leading-relaxed">
          منهجية عمل سعودية بمعايير عالمية تضمن لك الجودة والأمان في كل خطوة.
        </p>
      </div>

      {/* موبايل: مسار عمودي */}
      <div className="md:hidden relative">
        <div className="absolute top-0 bottom-0 right-[39px] w-px bg-brand/25" />
        <div className="space-y-12">
          {steps.map((s) => (
            <div key={s.num} className="relative flex gap-5">
              <div
                className="relative z-10 bg-paper w-20 shrink-0 text-center text-6xl font-black leading-none py-1"
                style={outline(false)}
              >
                {s.num}
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-2">
                  <s.Icon className="w-8 h-8 text-brand" />
                  <h3 className="text-xl font-black text-ink">{s.title}</h3>
                </div>
                <p className="text-ink/60 text-sm leading-relaxed">{s.text}</p>
                <GetLine>{s.get}</GetLine>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ديسكتوب: مسار واحد متصل، المحطات بالتبادل فوق وتحت الخط */}
      <div ref={ref} className="hidden md:block relative h-[700px]">
        <div className="absolute top-1/2 inset-x-0 h-px bg-brand/20" />
        <div
          className="absolute top-1/2 right-0 w-full h-[3px] -mt-px bg-brand origin-right"
          style={{
            transform: `scaleX(${seen ? 1 : 0})`,
            transition: "transform 2200ms cubic-bezier(.65,0,.35,1)",
          }}
        />

        <div className="grid grid-cols-4 h-full">
          {steps.map((s, i) => {
            const top = i % 2 === 0;
            return (
              <div
                key={s.num}
                className="relative"
                onMouseEnter={() => setHov(i)}
                onMouseLeave={() => setHov(null)}
              >
                <div
                  className={`absolute inset-x-0 pr-[22px] pl-6 ${
                    top ? "bottom-1/2 pb-12" : "top-1/2 pt-12"
                  }`}
                >
                  <div
                    className="text-[120px] font-black leading-[0.9] transition-colors duration-300"
                    style={outline(hov === i)}
                  >
                    {s.num}
                  </div>
                  <div className="flex items-center gap-3 mt-4 mb-2">
                    <s.Icon className="w-9 h-9 text-brand" />
                    <h3 className="text-2xl font-black text-ink">{s.title}</h3>
                  </div>
                  <p className="text-ink/60 text-sm leading-relaxed max-w-[240px]">
                    {s.text}
                  </p>
                  <GetLine>{s.get}</GetLine>
                </div>

                <span
                  className={`absolute right-[22px] w-px h-12 bg-brand/30 ${
                    top ? "bottom-1/2" : "top-1/2"
                  }`}
                />
                <span
                  className={`absolute top-1/2 right-[15px] -mt-[7px] w-3.5 h-3.5 rotate-45 border-2 border-brand ${
                    hov === i ? "bg-sand" : seen ? "bg-brand" : "bg-paper"
                  }`}
                  style={{
                    transition: "background-color 300ms",
                    transitionDelay: hov === i ? "0ms" : `${i * 550}ms`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}