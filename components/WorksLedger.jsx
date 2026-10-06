"use client";

import { ArrowLeft } from "lucide-react";
import { SquiggleUnderline } from "./SquiggleUnderline";
import { useContactModal } from "./ContactModalProvider";

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const columns = ["العميل", "المشكلة", "ما بنيناه", "النتيجة"];
const rows = [0, 1, 2];

const promises = [
  {
    title: "المشكلة كما كانت",
    text: "نصف الوضع قبل البدء بصراحة، لا كما نتمنى أن يبدو في عرض تقديمي.",
  },
  {
    title: "ما سلّمناه ومتى",
    text: "النسخة الأولى وتاريخها، وما أضيف بعدها مرحلة بمرحلة.",
  },
  {
    title: "ما تغيّر بعد الإطلاق",
    text: "نذكر فقط الأرقام التي قاسها العميل بنفسه، وإن لم يقِس شيئاً فلن نكتب رقماً.",
  },
];

const GRID = "md:grid-cols-[4rem_repeat(4,1fr)_10rem]";

function Blank() {
  return <span aria-hidden="true" className="mt-3 block border-t border-dashed border-ink/25" />;
}

export default function WorksLedger() {
  const { openContactModal } = useContactModal();

  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="inline-block mb-5">
          <h1 className="text-3xl md:text-5xl font-black leading-[1.3] text-ink">
            هذا السجل يبدأ بمشروعك
          </h1>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 leading-relaxed text-base md:text-lg max-w-xl">
          لا نعرض هنا مشاريع لم تكتمل ولا أرقاماً لم تتحقق. حين نسلّم المشروع
          ونقيس نتيجته، نكتبه في هذا السجل بتفاصيله.
        </p>
      </section>

      {/* السجل */}
      <section className="container-x section !pt-8">
        <div className={`hidden gap-6 border-b border-ink/20 pb-3 text-xs font-bold text-ink/45 md:grid ${GRID}`}>
          <span>#</span>
          {columns.map((c) => (
            <span key={c}>{c}</span>
          ))}
          <span>الحالة</span>
        </div>

        <ol>
          {rows.map((i) => {
            const first = i === 0;
            return (
              <li
                key={i}
                className={`grid grid-cols-1 gap-x-6 gap-y-5 py-7 md:items-start ${GRID} ${
                  first
                    ? "rounded-xl2 bg-white px-4 shadow-sm ring-1 ring-sand/60 md:-mx-4"
                    : "border-b border-ink/15 opacity-70"
                }`}
              >
                <span className="font-heading text-3xl leading-none text-sand-deep">
                  {toAr(String(i + 1).padStart(2, "0"))}
                </span>

                {columns.map((c) => (
                  <div key={c}>
                    <span className="text-xs font-bold text-ink/45 md:hidden">{c}</span>
                    <Blank />
                  </div>
                ))}

                <div>
                  {first ? (
                    <button
                      type="button"
                      onClick={() => openContactModal("مناقشة مشروع")}
                      className="group inline-flex items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-brand"
                    >
                      احجزه لمشروعك
                      <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
                    </button>
                  ) : (
                    <span className="text-sm font-bold text-ink/45">مساحة متاحة</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ما سيحويه كل ملف */}
      <section className="container-x section !pt-0">
        <h2 className="mb-8 text-2xl font-black text-ink">ما الذي سيكتبه كل ملف؟</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {promises.map(({ title, text }, i) => (
            <div key={title} className="border-t-2 border-ink/15 pt-5">
              <span className="font-heading text-sm text-sand-deep">{toAr(i + 1)}</span>
              <h3 className="mt-2 mb-2 text-lg font-black text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-ink/60">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-xl2 bg-brand-dark p-8 text-white md:flex-row md:items-center md:p-10">
          <p className="max-w-md text-xl font-black leading-snug">
            تريد أن يكون مشروعك أول ملف في هذا السجل؟
          </p>
          <button
            type="button"
            onClick={() => openContactModal("مناقشة مشروع")}
            className="rounded-xl bg-sand px-7 py-3 text-sm font-black text-brand-dark transition-colors hover:bg-white"
          >
            ناقش مشروعك
          </button>
        </div>
      </section>
    </>
  );
}