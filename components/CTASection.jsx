"use client";

import { ArrowLeft } from "lucide-react";
import { useContactModal } from "./ContactModalProvider";

const actions = [
  {
    subject: "تحدث مع خبير تقني",
    title: "تحدث مع خبير تقني",
    text: "نفهم احتياجك ونقترح عليك الحل الأنسب.",
    tone: "bg-sand text-brand-dark hover:bg-white md:min-h-[250px]",
    arrow: "bg-brand-dark text-sand group-hover:bg-brand",
  },
  {
    subject: "استشارة مجانية",
    title: "اطلب استشارة مجانية",
    text: "جلسة أولى بدون التزام لنفهم مشروعك.",
    tone: "bg-brand-soft text-ink hover:bg-sand md:min-h-[170px]",
    arrow: "bg-ink text-white group-hover:bg-brand-dark",
  },
];

export default function CTASection() {
  const { openContactModal } = useContactModal();

  return (
    <section id="cta-section" className="container-x section">
      <div className="grid overflow-hidden rounded-xl2 bg-brand-dark text-white lg:grid-cols-2">
        {/* النص */}
        <div className="flex flex-col justify-between gap-12 px-6 py-12 md:px-14 md:py-16">
          <div>
            <h2 className="font-heading text-4xl font-extrabold leading-[1.2] md:text-6xl">
              لنبدأ في بناء <span className="text-sand">مشروعك</span> القادم
            </h2>
            <p className="mt-6 max-w-md text-lg leading-loose text-white/65">
              فريقنا التقني جاهز الآن لتحويل رؤيتك إلى واقع رقمي آمن ومبتكر يواكب تطلعاتك.
            </p>
          </div>

          <div className="border-t border-white/15 pt-6">
            <p className="mb-1.5 text-xs font-bold text-white/50">أو اتصل بنا مباشرة</p>
            <a
              href="tel:+966501053303"
              dir="ltr"
              className="inline-block text-right text-2xl font-black tabular-nums outline-none transition-colors duration-300 hover:text-sand focus-visible:text-sand md:text-3xl"
            >
              +966 50 105 3303
            </a>
          </div>
        </div>

        {/* الزرارين */}
        <div className="grid divide-y divide-brand-dark/20 lg:grid-rows-[auto_auto]">
          {actions.map((a) => (
            <button
              key={a.subject}
              type="button"
              onClick={() => openContactModal(a.subject)}
              className={`group flex min-h-[180px] items-center justify-between gap-6 px-6 py-8 text-start outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark md:px-12 ${a.tone}`}
            >
              <span>
                <span className="block font-heading text-2xl font-extrabold leading-snug md:text-4xl">
                  {a.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed opacity-75 md:text-base">
                  {a.text}
                </span>
              </span>
              <span
                className={`grid size-14 shrink-0 place-items-center rounded-full transition-all duration-300 group-hover:-translate-x-2 md:size-16 ${a.arrow}`}
              >
                <ArrowLeft size={24} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}