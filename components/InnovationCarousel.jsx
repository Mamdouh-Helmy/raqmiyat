"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";

// action: "contact" يفتح بوب التواصل بالـ subject المحدد
const slides = [
  {
    title: "أنظمة مراقبة وحماية متكاملة",
    text: "نصمم ونركّب كاميرات المراقبة وأنظمة التحكم في الدخول، مع متابعة مركزية وعن بُعد من الجوال على مدار الساعة.",
    cta: "اطلب معاينة",
    action: { type: "contact", subject: "فحص أمني" },
    image: "/carousel/ai.webp",
  },
  {
    title: "برمجيات وأنظمة تُبنى لأعمالك",
    text: "مواقع وتطبيقات وأنظمة ERP وLMS مخصصة لاحتياج منشأتك، من التحليل حتى التشغيل والدعم.",
    cta: "ناقش مشروعك",
    action: { type: "contact", subject: "مناقشة مشروع" },
    image: "/carousel/team.webp",
  },
  {
    title: "شريك تقني من الفكرة للتشغيل",
    text: "فريق يرافقك في كل مرحلة بمعايير جودة وأمان عالية، وعقود دعم وصيانة تضمن استمرارية عملك.",
    cta: "احجز استشارة مجانية",
    action: { type: "contact", subject: "استشارة مجانية" },
    image: "/carousel/vision2030.webp",
  },
];

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function InnovationCarousel() {
  const { openContactModal } = useContactModal();
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

  function handleCta() {
    if (slide.action.type === "contact") {
      openContactModal(slide.action.subject);
    }
  }

  const arrow =
    "grid size-11 place-items-center rounded-full border border-brand-dark/30 text-brand-dark outline-none transition-colors duration-300 hover:bg-brand-dark hover:text-sand focus-visible:ring-2 focus-visible:ring-brand-dark";

  return (
    <section className="container-x section">
      <div
        className="grid overflow-hidden rounded-xl2 bg-sand text-brand-dark lg:grid-cols-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* النص */}
        <div className="flex flex-col justify-between gap-10 px-6 py-10 md:px-14 md:py-14">
          <div key={active} className="animate-fadeIn">
            <p className="mb-5 text-sm font-bold text-brand-dark/60">
              {toAr(active + 1)} / {toAr(slides.length)}
            </p>
            <h2 className="font-heading text-3xl font-extrabold leading-[1.3] md:text-5xl">
              {slide.title}
            </h2>
            <p className="mt-6 max-w-xl leading-loose text-brand-dark/75">{slide.text}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <button type="button" onClick={handleCta} className="btn-cta">
              {slide.cta}
            </button>

            <div className="flex items-center gap-5">
              {/* شرطات التنقل */}
              <div className="flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`الشريحة ${toAr(i + 1)}`}
                    aria-current={i === active}
                    className="grid h-6 place-items-center outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                  >
                    <span
                      className={`block h-1 rounded-full bg-brand-dark transition-all duration-500 ${
                        i === active ? "w-8" : "w-4 opacity-30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* في الـ RTL: اليمين = السابق، الشمال = التالي */}
              <div className="flex gap-2">
                <button type="button" onClick={() => go(active - 1)} aria-label="السابق" className={arrow}>
                  <ChevronRight size={18} />
                </button>
                <button type="button" onClick={() => go(active + 1)} aria-label="التالي" className={arrow}>
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* الصورة: من الحافة للحافة وبطول اللوح كله */}
        <div
          key={`img-${active}`}
          className="relative min-h-[280px] animate-fadeIn lg:min-h-[460px]"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}