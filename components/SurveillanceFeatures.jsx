// components/SurveillanceFeatures.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";

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

export default function SurveillanceFeatures() {
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

  const s = slides[active];

  return (
    <section className="container-x section">
      <div className="inline-block mb-10">
        <h2 className="text-3xl font-black text-ink">مميزات نظام المراقبة</h2>
        <SquiggleUnderline />
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-stretch"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col justify-between">
          <div key={active} className="animate-fadeIn">
            <span className="inline-block bg-brand-soft text-brand text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              {s.tag}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-ink mb-4 leading-snug">
              {s.title}
            </h3>
            <p className="text-ink/60 leading-relaxed max-w-md">{s.text}</p>
          </div>

          <div className="flex gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`ميزة ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-8 bg-brand" : "w-1.5 bg-ink/15"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative rounded-xl2 overflow-hidden min-h-[320px] lg:min-h-[400px]">
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
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}