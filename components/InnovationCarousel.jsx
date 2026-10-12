
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";

const slides = [
  {
    title: "طوّر أعمالك بحلول برمجية تناسبك",
    text: "نصمّم ونطوّر المواقع والتطبيقات والأنظمة المخصصة لتسهيل عمليات شركتك، من فهم احتياجاتك وتحديد الحل المناسب إلى التطوير والتشغيل.",
    cta: "ناقش مشروعك",
    action: {
      type: "contact",
      subject: "طلب مشروع برمجي",
    },
    image: "/carousel/team.webp",
    imageAlt: "فريق يعمل على تطوير حلول برمجية",
  },
  {
    title: "حلول أمنية تحمي منشأتك",
    text: "أنظمة مراقبة وكاميرات وحلول للتحكم في الدخول، مصممة لتناسب طبيعة منشأتك، مع إمكانية المتابعة عن بُعد وخدمات التركيب والصيانة.",
    cta: "اطلب استشارة أمنية",
    action: {
      type: "contact",
      subject: "استشارة أنظمة أمنية",
    },
    image: "/carousel/ai.webp",
    imageAlt: "حلول أنظمة المراقبة والأمان",
  },
  {
    title: "دعم تقني يواكب نمو أعمالك",
    text: "نساعدك في تطوير حلولك التقنية وصيانتها وتحسينها مع تغيّر احتياجات عملك، لتستفيد من أنظمتك وتواصل التركيز على أهداف شركتك.",
    cta: "تواصل مع فريقنا",
    action: {
      type: "contact",
      subject: "استفسار عن الدعم والصيانة",
    },
    image: "/carousel/vision2030.webp",
    imageAlt: "التقنية ودورها في تطوير الأعمال",
  },
];

const toAr = (n) =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function InnovationCarousel() {
  const { openContactModal } = useContactModal();

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [paused]);

  const slide = slides[active];

  const go = (index) => {
    setActive((index + slides.length) % slides.length);
  };

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
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(false);
          }
        }}
        aria-roledescription="عرض شرائح"
        aria-label="حلول وخدمات رقميات"
      >
        {/* النص */}
        <div className="flex flex-col justify-between gap-10 px-6 py-10 md:px-14 md:py-14">
          <div key={active} className="animate-fadeIn">
            <p className="mb-5 text-sm font-bold text-brand-dark/60">
              {toAr(active + 1)} / {toAr(slides.length)}
            </p>

            <h2
              className="font-heading text-3xl font-extrabold leading-[1.3] md:text-5xl"
              aria-live="polite"
              aria-atomic="true"
            >
              {slide.title}
            </h2>

            <p className="mt-6 max-w-xl leading-loose text-brand-dark/75">
              {slide.text}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <button
              type="button"
              onClick={handleCta}
              className="btn-cta"
            >
              {slide.cta}
            </button>

            <div className="flex items-center gap-5">
              {/* مؤشرات التنقل */}
              <div className="flex items-center gap-2">
                {slides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => go(index)}
                    aria-label={`الشريحة ${toAr(index + 1)}: ${item.title}`}
                    aria-current={index === active ? "true" : undefined}
                    className="grid h-6 place-items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                  >
                    <span
                      className={`block h-1 rounded-full bg-brand-dark transition-all duration-500 ${index === active
                          ? "w-8"
                          : "w-4 opacity-30"
                        }`}
                    />
                  </button>
                ))}
              </div>

              {/* أزرار التنقل في اتجاه RTL */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="الشريحة السابقة"
                  className={arrow}
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="الشريحة التالية"
                  className={arrow}
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* الصورة */}
        <div
          key={`img-${active}`}
          className="relative min-h-[280px] animate-fadeIn lg:min-h-[460px]"
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, calc(100vw - 2.5rem)"
            className="object-cover"
            quality={75}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
