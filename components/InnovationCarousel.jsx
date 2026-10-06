"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";

// أبعاد الصور الحقيقية (غيّرها لو نسبة صورك مختلفة)
const IMG_W = 1200;
const IMG_H = 900;

// action: "contact" يفتح بوب التواصل بالـ subject المحدد، "scroll" ينزل لقسم في الصفحة
const slides = [
  {
    title: "أنظمة مراقبة وحماية متكاملة",
    text: "نصمم ونركّب كاميرات المراقبة وأنظمة التحكم في الدخول، مع متابعة مركزية وعن بُعد من الجوال على مدار الساعة.",
    cta: "اطلب معاينة",
    action: { type: "contact", subject: "فحص أمني" },
    image: "/carousel/ai.png",
  },
  {
    title: "برمجيات وأنظمة تُبنى لأعمالك",
    text: "مواقع وتطبيقات وأنظمة ERP وLMS مخصصة لاحتياج منشأتك، من التحليل حتى التشغيل والدعم.",
    cta: "ناقش مشروعك",
    action: { type: "contact", subject: "مناقشة مشروع" },
    image: "/carousel/team.png",
  },
  {
    title: "شريك تقني من الفكرة للتشغيل",
    text: "فريق يرافقك في كل مرحلة بمعايير جودة وأمان عالية، وعقود دعم وصيانة تضمن استمرارية عملك.",
    cta: "احجز استشارة مجانية",
    action: { type: "contact", subject: "استشارة مجانية" },
    image: "/carousel/vision2030.png",
  },
];

// شبكة معيّنات السدو للخلفية، خفيفة جداً
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.22'/%3E%3C/svg%3E\")";

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

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

  const navBtn =
    "group grid place-items-center size-10 rounded-full border border-ink/10 bg-white text-ink/60 outline-none transition-all duration-300 hover:border-[#c9a66b] hover:bg-brand-dark hover:text-[#c9a66b] focus-visible:ring-2 focus-visible:ring-[#c9a66b]/60";

  return (
    <section className="container-x section">
      <div
        className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="card relative isolate overflow-hidden p-8 md:p-12 flex flex-col justify-center min-h-[340px]">
          {/* زخرفة السدو، بتتلاشى ناحية اليمين */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: lattice,
              backgroundSize: "56px 56px",
              WebkitMaskImage: "linear-gradient(to bottom right, transparent 45%, #000 100%)",
              maskImage: "linear-gradient(to bottom right, transparent 45%, #000 100%)",
            }}
          />
          {/* توهّج ذهبي ناعم */}
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 -z-10 size-60 rounded-full bg-[#c9a66b]/15 blur-3xl"
          />
          {/* خط ذهبي علوي */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b]/70 to-transparent"
          />

          {/* في الـ RTL: اليمين = السابق، الشمال = التالي */}
          <button onClick={() => go(active - 1)} aria-label="السابق" className={`${navBtn} absolute top-6 right-6`}>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => go(active + 1)} aria-label="التالي" className={`${navBtn} absolute top-6 left-6`}>
            <ChevronLeft size={16} />
          </button>

          <div key={active} className="animate-fadeIn mt-8 md:mt-4">
            {/* ترقيم الشريحة في معيّن */}
            <div className="flex items-center gap-3 mb-6">
              <span className="relative grid place-items-center size-9 shrink-0">
                <span className="absolute size-6 rotate-45 rounded-[4px] border border-[#c9a66b]/70 bg-white" />
                <span className="relative font-heading text-xs leading-none text-brand-dark">
                  {toAr(active + 1)}
                </span>
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-[#c9a66b] to-transparent" />
              <span className="text-xs font-bold tracking-widest text-[#a98445]">
                {toAr(active + 1)} / {toAr(slides.length)}
              </span>
            </div>

            <div className="inline-block mb-5">
              <h2 className="text-3xl md:text-4xl font-black text-ink leading-[1.3]">{slide.title}</h2>
              <SquiggleUnderline />
            </div>
            <p className="text-ink/60 leading-relaxed max-w-xl mb-10">{slide.text}</p>
          </div>

          <div className="flex items-center justify-between">
            <button type="button" onClick={handleCta} className="btn-cta">
              {slide.cta}
            </button>

            {/* النقط بقت معيّنات */}
            <div className="flex items-center gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`الشريحة ${toAr(i + 1)}`}
                  aria-current={i === active}
                  className="grid place-items-center size-5 outline-none focus-visible:ring-2 focus-visible:ring-[#c9a66b]/60 rounded"
                >
                  <span
                    className={`block rotate-45 border transition-all duration-500 ${
                      i === active
                        ? "size-3 border-[#c9a66b] bg-[#c9a66b]"
                        : "size-2 border-[#c9a66b]/60 bg-transparent hover:bg-[#c9a66b]/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* الصورة: بتظهر كاملة بنسبتها الطبيعية من غير أي قص */}
        <div key={`bg-${active}`} className="group relative animate-fadeIn self-center">
          <div className="relative rounded-xl2 overflow-hidden bg-brand-dark ring-1 ring-[#c9a66b]/50 shadow-lg">
            <Image
              src={slide.image}
              alt={slide.title}
              width={IMG_W}
              height={IMG_H}
              sizes="(min-width: 1024px) 400px, 100vw"
              className="block h-auto w-full"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b] to-transparent"
            />
          </div>

          {/* معيّنات الأركان */}
          {["-top-1.5 -right-1.5", "-top-1.5 -left-1.5", "-bottom-1.5 -right-1.5", "-bottom-1.5 -left-1.5"].map(
            (pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} size-3 rotate-45 border border-[#c9a66b] bg-paper`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}