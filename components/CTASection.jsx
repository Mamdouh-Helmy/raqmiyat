"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useContactModal } from "./ContactModalProvider";
import { SquiggleUnderline, steppedClip } from "./najdi-icons";

const clip = steppedClip(18);

// زخرفة نجدية: معينات متداخلة
function Diamonds() {
  return (
    <svg aria-hidden="true" viewBox="-100 -100 200 200" className="w-full h-full">
      {[92, 72, 52, 32].map((r, i) => (
        <rect
          key={r}
          x={-r}
          y={-r}
          width={r * 2}
          height={r * 2}
          transform="rotate(45)"
          fill="none"
          stroke="#c9a66b"
          strokeWidth="1.5"
          opacity={0.55 - i * 0.1}
        />
      ))}
      <rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" fill="#c9a66b" />
    </svg>
  );
}

export default function CTASection() {
  const { openContactModal } = useContactModal();

  return (
    <section id="cta-section" className="container-x section">
      <div className="bg-sand" style={{ clipPath: clip }}>
        <div
          className="relative m-[2px] bg-brand-dark text-paper px-8 py-14 md:px-16 md:py-20 overflow-hidden"
          style={{ clipPath: clip }}
        >
          <div
            aria-hidden="true"
            className="hidden md:block absolute -left-24 top-1/2 -translate-y-1/2 w-[440px] h-[440px]"
          >
            <Diamonds />
          </div>

          <div className="relative max-w-2xl">
            <div className="inline-block mb-6">
              <h2 className="text-3xl md:text-5xl font-black leading-[1.3]">
                لنبدأ في بناء مشروعك القادم
              </h2>
              <SquiggleUnderline color="%23c9a66b" />
            </div>
            <p className="text-paper/65 leading-loose mb-10 max-w-xl">
              فريقنا التقني جاهز الآن لتحويل رؤيتك إلى واقع رقمي آمن ومبتكر يواكب
              تطلعاتك.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openContactModal("تحدث مع خبير تقني")}
                className="group inline-flex items-center gap-3 bg-sand text-brand-dark px-7 py-4 font-black text-sm hover:bg-paper transition-colors"
              >
                تحدث مع خبير تقني
                <ArrowLeft size={18} weight="bold" className="transition-transform group-hover:-translate-x-1" />
              </button>
              <button
                onClick={() => openContactModal("استشارة مجانية")}
                className="border border-sand/60 px-7 py-4 font-bold text-sm hover:bg-paper/10 transition-colors"
              >
                اطلب استشارة مجانية
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}