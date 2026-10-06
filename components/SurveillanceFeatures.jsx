// components/SurveillanceFeatures.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";

const DURATION = 6000;

const slides = [
  {
    title: "رؤية واضحة ليلاً ونهاراً",
    text: "كاميرات بدقة 4K مزودة بتقنية الرؤية الليلية، تلتقط كل تفصيلة بوضوح تام حتى في الظلام الدامس.",
    tag: "دقة 4K",
    image: "/security/feature-night-vision.png",
  },
  {
    title: "كشف ذكي للحركة والأشخاص",
    text: "تحليل مدعوم بالذكاء الاصطناعي يميّز بين إنسان، سيارة، أو حيوان، ويرسل تنبيهاً فورياً عند أي نشاط غير معتاد.",
    tag: "AI Detection",
    image: "/security/feature-ai-detection.png",
  },
  {
    title: "مراقبة من أي مكان",
    text: "تابع كاميراتك مباشرة من هاتفك أينما كنت، مع إشعارات لحظية وتسجيل مستمر بلا انقطاع.",
    tag: "تطبيق الجوال",
    image: "/security/feature-mobile-app.png",
  },
  {
    title: "تخزين سحابي آمن",
    text: "نسخ احتياطي تلقائي لكل التسجيلات على السحابة، بحيث لا تفقد أي لقطة حتى لو تعرضت الكاميرا للتلف أو السرقة.",
    tag: "Cloud Backup",
    image: "/security/feature-cloud-storage.png",
  },
];

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function SurveillanceFeatures() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setActive((i) => (i + 1) % slides.length);

  return (
    <section className="container-x section">
      <div className="inline-block mb-10">
        <h2 className="text-3xl font-black text-ink">مميزات نظام المراقبة</h2>
        <SquiggleUnderline />
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-14 items-stretch"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* القايمة */}
        <ol className="border-t border-ink/15">
          {slides.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.title} className="border-b border-ink/15">
                <button
                  type="button"
                  aria-current={isActive}
                  onClick={() => setActive(i)}
                  className="relative w-full text-right py-6 pr-0 flex gap-5 outline-none focus-visible:bg-brand-soft"
                >
                  <span
                    className={`font-heading text-3xl leading-none w-10 shrink-0 transition-colors duration-300 ${
                      isActive ? "text-sand-deep" : "text-ink/20"
                    }`}
                  >
                    {toAr(i + 1)}
                  </span>

                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span
                        className={`text-lg md:text-xl font-black transition-colors duration-300 ${
                          isActive ? "text-ink" : "text-ink/45"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        dir="ltr"
                        className={`text-xs font-bold transition-opacity duration-300 ${
                          isActive ? "text-sand-deep opacity-100" : "opacity-0"
                        }`}
                      >
                        {s.tag}
                      </span>
                    </span>

                    <span
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-3 text-ink/60 text-[15px] leading-relaxed max-w-md">
                          {s.text}
                        </span>
                      </span>
                    </span>
                  </span>

                  {/* شريط التقدم: لما يخلص بينقل للميزة اللي بعدها */}
                  {isActive && (
                    <span
                      key={active}
                      aria-hidden="true"
                      onAnimationEnd={next}
                      className="absolute bottom-0 right-0 h-0.5 w-full origin-right bg-brand animate-progress"
                      style={{
                        animationDuration: `${DURATION}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {/* الصور */}
        <div className="relative min-h-[320px] lg:min-h-[440px] overflow-hidden rounded-xl2 bg-brand-dark">
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}