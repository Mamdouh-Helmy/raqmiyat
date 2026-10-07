// components/SurveillanceFeatures.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

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

// عمود الميزات: "toward" = الجهة اللي فيها القوس، وعليها يقع خط التحديد
function Feature({ slide, isActive, side, paused, onSelect, onDone }) {
  const rail =
    side === "right"
      ? "border-e-2 pe-6 lg:text-start"
      : "border-s-2 ps-6 lg:text-start";

  return (
    <button
      type="button"
      aria-current={isActive}
      onClick={onSelect}
      className={`relative block w-full py-5 text-start outline-none transition-colors duration-500 focus-visible:bg-brand-soft ${rail} ${
        isActive ? "border-sand" : "border-ink/10 hover:border-ink/30"
      }`}
    >
      <span
        className={`block font-heading text-2xl font-extrabold leading-snug transition-colors duration-500 md:text-3xl ${
          isActive ? "text-ink" : "text-ink/35"
        }`}
      >
        {slide.title}
      </span>

      <span
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <span className="overflow-hidden">
          <span className="block max-w-sm pt-3 text-[15px] leading-loose text-ink/65">
            {slide.text}
          </span>
        </span>
      </span>

      {/* شريط التقدم: لما يخلص بينقل للميزة اللي بعدها */}
      {isActive && (
        <span
          aria-hidden="true"
          onAnimationEnd={onDone}
          className="absolute bottom-0 right-0 h-0.5 w-full origin-right animate-progress bg-sand-deep"
          style={{
            animationDuration: `${DURATION}ms`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      )}
    </button>
  );
}

export default function SurveillanceFeatures() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setActive((i) => (i + 1) % slides.length);

  const renderColumn = (from, to, side) => (
    <div className="flex flex-col gap-2 lg:h-[560px] lg:justify-between lg:py-4">
      {slides.slice(from, to).map((s, k) => {
        const i = from + k;
        return (
          <Feature
            key={s.title}
            slide={s}
            side={side}
            isActive={i === active}
            paused={paused}
            onSelect={() => setActive(i)}
            onDone={next}
          />
        );
      })}
    </div>
  );

  return (
    <section className="container-x section">
      <h2 className="mb-12 font-heading text-4xl font-extrabold leading-tight text-ink md:mb-16 md:text-6xl">
        مميزات نظام المراقبة
      </h2>

      <div
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_400px_1fr] lg:gap-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* الميزتان الأوليان */}
        {renderColumn(0, 2, "right")}

        {/* نافذة القوس: العنصر المميز في القسم */}
        <div className="relative order-first mx-auto h-[440px] w-full max-w-[340px] lg:order-none lg:h-[560px] lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-b-xl2 rounded-t-full border border-sand"
          />
          <div className="relative h-full w-full overflow-hidden rounded-b-xl2 rounded-t-full bg-brand-dark">
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
                  sizes="(min-width: 1024px) 400px, 340px"
                  className="object-cover"
                />
              </div>
            ))}

            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent"
            />

            <span
              key={active}
              dir="ltr"
              className="absolute inset-x-0 bottom-7 mx-auto w-fit animate-fadeIn rounded-full bg-sand px-4 py-1.5 text-sm font-bold text-brand-dark"
            >
              {slides[active].tag}
            </span>
          </div>
        </div>

        {/* الميزتان الأخيرتان */}
        {renderColumn(2, 4, "left")}
      </div>
    </section>
  );
}