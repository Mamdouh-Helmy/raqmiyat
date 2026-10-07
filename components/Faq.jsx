"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const defaultItems = [
  {
    q: "هل أملك الكود بعد التسليم؟",
    a: "نعم، بالكامل. يُسلَّم المستودع والوصول إلى الخوادم والنطاقات باسمك، ولا نربطك بنا لتشغيل ما بنيناه.",
  },
  {
    q: "كيف تتعاملون مع التغييرات في منتصف المشروع؟",
    a: "نقبلها، لكن نوضح أثرها على الوقت والتكلفة قبل التنفيذ. القرار لك، ولا مفاجآت في الفاتورة.",
  },
  {
    q: "كم تستغرق النسخة الأولى؟",
    a: "غالباً بين ٣ و٦ أسابيع لنسخة تعمل فعلاً وتستطيع تجربتها. المدة الكاملة تعتمد على حجم المشروع، وتقدر تقديرها من الأداة أعلاه.",
  },
  {
    q: "هل تعملون على نظام قائم بدل بناء نظام جديد؟",
    a: "نعم. نفحصه أولاً، وإن كان يستحق البقاء طوّرناه، وإن كانت إعادة البناء أوفر لك قلنا ذلك بصراحة.",
  },
  {
    q: "كيف نتواصل أثناء العمل؟",
    a: "اجتماع قصير كل أسبوع، ونسخة قابلة للتجربة في نهاية كل مرحلة، وقناة مباشرة مع المطوّر لأسئلتك اليومية.",
  },
  {
    q: "ماذا يحدث بعد الإطلاق؟",
    a: "نتابع النظام خلال فترة ضمان بعد التسليم لإصلاح أي عيب. بعدها تختار بين دعم شهري أو الاكتفاء بفريقك.",
  },
];

const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23b8934a' stroke-opacity='0.2'/%3E%3C/svg%3E\")";

export default function Faq({ items = defaultItems }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="container-x section">
      <style>{`
        @keyframes faqDots { 0%, 70% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes faqDot  { 0%, 100% { transform: translateY(0); opacity: .45; } 50% { transform: translateY(-4px); opacity: 1; } }
        @keyframes faqText { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .faq-dots { animation: faqDots .9s linear both; }
        .faq-dot  { animation: faqDot .6s ease-in-out infinite; }
        .faq-dot:nth-child(2) { animation-delay: .12s; }
        .faq-dot:nth-child(3) { animation-delay: .24s; }
        .faq-text { animation: faqText .5s ease-out .85s both; }
        @media (prefers-reduced-motion: reduce) {
          .faq-dots { display: none; }
          .faq-text { animation: none; }
        }
      `}</style>

      <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.2] text-ink md:text-6xl">
          أسئلة نسمعها قبل كل مشروع
        </h2>
        <p className="max-w-xs leading-loose text-ink/60">
          إن لم تجد سؤالك هنا، اكتبه لنا في نموذج التواصل وسنجيبك مباشرة.
        </p>
      </div>

      {/* محادثة: السؤال من اليمين، والرد من اليسار */}
      <div className="flex flex-col gap-3 md:gap-4">
        {items.map(({ q, a }, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const btnId = `faq-btn-${i}`;

          return (
            <div key={q} className="flex flex-col gap-3 md:gap-4">
              {/* السؤال */}
              <h3 className="max-w-[94%] self-start md:max-w-2xl">
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className={`flex w-full items-center gap-4 rounded-xl2 rounded-es-md px-5 py-4 text-start outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-dark md:px-7 md:py-5 ${
                    isOpen
                      ? "bg-sand text-brand-dark"
                      : "bg-sand/25 text-ink hover:bg-sand/45"
                  }`}
                >
                  <span className="flex-1 text-lg font-bold leading-snug md:text-2xl">
                    {q}
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
              </h3>

              {/* الرد */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex justify-end pb-2">
                    <div className="relative isolate max-w-[94%] overflow-hidden rounded-xl2 rounded-ee-md bg-brand-dark px-6 py-6 text-white md:max-w-2xl md:px-8 md:py-8">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10"
                        style={{
                          backgroundImage: lattice,
                          backgroundSize: "56px 56px",
                          WebkitMaskImage:
                            "linear-gradient(to left, #000 0%, transparent 75%)",
                          maskImage:
                            "linear-gradient(to left, #000 0%, transparent 75%)",
                        }}
                      />

                      {/* نقاط الكتابة: تظهر لحظة ثم يبدأ الرد */}
                      {isOpen && (
                        <span
                          aria-hidden="true"
                          className="faq-dots absolute start-6 top-7 flex gap-1.5 md:start-8 md:top-9"
                        >
                          <span className="faq-dot size-2 rounded-full bg-sand" />
                          <span className="faq-dot size-2 rounded-full bg-sand" />
                          <span className="faq-dot size-2 rounded-full bg-sand" />
                        </span>
                      )}

                      <p
                        className={`text-base leading-loose text-white/85 md:text-xl md:leading-loose ${
                          isOpen ? "faq-text" : "opacity-0"
                        }`}
                      >
                        {a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}