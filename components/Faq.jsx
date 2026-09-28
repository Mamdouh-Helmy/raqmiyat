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

export default function Faq({ items = defaultItems }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <div>
          <div className="inline-block mb-5">
            <h2 className="text-3xl md:text-4xl font-black text-ink leading-snug">
              أسئلة نسمعها قبل كل مشروع
            </h2>
            <SquiggleUnderline />
          </div>
          <p className="text-ink/60 leading-relaxed max-w-sm">
            إن لم تجد سؤالك هنا، اكتبه لنا في نموذج التواصل وسنجيبك مباشرة.
          </p>
        </div>

        <div className="border-t border-ink/10">
          {items.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="border-b border-ink/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-right"
                >
                  <span
                    className={`font-black text-base transition-colors ${
                      isOpen ? "text-brand" : "text-ink"
                    }`}
                  >
                    {q}
                  </span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-ink/40 transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-brand" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-ink/60 text-[15px] leading-loose pb-6 max-w-xl">
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