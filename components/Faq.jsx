"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SquiggleUnderline } from "./SquiggleUnderline";

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

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function Faq({ items = defaultItems }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">
        {/* الجانب الثابت */}
        <div className="lg:sticky lg:top-10 self-start">
          <div className="flex items-center gap-3 mb-6">
            <span className="size-2 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest text-[#a98445]">
              الأسئلة الشائعة
            </span>
          </div>

          <div className="inline-block mb-6">
            <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.3]">
              أسئلة نسمعها قبل كل مشروع
            </h2>
            <SquiggleUnderline />
          </div>

          <p className="text-ink/60 leading-relaxed max-w-sm">
            إن لم تجد سؤالك هنا، اكتبه لنا في نموذج التواصل وسنجيبك مباشرة.
          </p>

          {/* شريط معيّنات زخرفي */}
          <div className="mt-10 flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="size-3 rotate-45 border border-[#c9a66b]"
                style={{
                  backgroundColor: i === 0 ? "#c9a66b" : "transparent",
                  opacity: 1 - i * 0.17,
                }}
              />
            ))}
          </div>
        </div>

        {/* الأسئلة */}
        <div className="space-y-3">
          {items.map(({ q, a }, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;

            return (
              <div
                key={q}
                className={`relative overflow-hidden rounded-xl2 border transition-all duration-300 ${
                  isOpen
                    ? "border-[#c9a66b]/50 bg-brand-dark/[0.04] shadow-sm"
                    : "border-ink/10 bg-transparent hover:border-[#c9a66b]/40 hover:bg-brand-dark/[0.025]"
                }`}
              >
                {/* خط ذهبي جانبي للسؤال المفتوح */}
                <span
                  aria-hidden="true"
                  className={`absolute right-0 top-0 h-full w-[3px] bg-[#c9a66b] origin-top transition-transform duration-500 ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                  }`}
                />

                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group w-full flex items-center gap-4 px-5 md:px-6 py-5 text-right outline-none focus-visible:ring-2 focus-visible:ring-[#c9a66b]/60 rounded-xl2"
                  >
                    {/* الرقم داخل معيّن */}
                    <span className="relative grid place-items-center size-10 shrink-0">
                      <span
                        className={`absolute size-7 rotate-45 rounded-[4px] border transition-all duration-500 ${
                          isOpen
                            ? "rotate-[135deg] border-brand-dark bg-brand-dark"
                            : "border-[#c9a66b]/50 bg-white group-hover:rotate-[135deg]"
                        }`}
                      />
                      <span
                        className={`relative font-heading text-sm leading-none transition-colors duration-300 ${
                          isOpen ? "text-[#c9a66b]" : "text-brand-dark"
                        }`}
                      >
                        {toAr(i + 1)}
                      </span>
                    </span>

                    <span
                      className={`flex-1 font-black text-base md:text-lg transition-colors duration-300 ${
                        isOpen ? "text-brand-dark" : "text-ink"
                      }`}
                    >
                      {q}
                    </span>

                    {/* زر + داخل دايرة */}
                    <span
                      className={`grid place-items-center size-8 shrink-0 rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[#c9a66b] bg-[#c9a66b] text-brand-dark"
                          : "border-ink/15 text-ink/50 group-hover:border-[#c9a66b] group-hover:text-[#a98445]"
                      }`}
                    >
                      <Plus
                        size={16}
                        weight="bold"
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* pr = عرض المعيّن + الفجوة، عشان النص يتحاذى مع السؤال */}
                    <p className="text-ink/65 text-[15px] leading-loose pb-6 pl-6 pr-[4.75rem] md:pr-[5.25rem] max-w-2xl">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}