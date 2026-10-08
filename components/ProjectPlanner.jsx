"use client";

// components/ProjectPlanner.jsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useContactModal } from "./ContactModalProvider";

const types = [
  {
    key: "web",
    label: "تطبيق ويب",
    first: "نموذج تفاعلي تجرّبه بنفسك خلال أول ٣ أسابيع.",
  },
  {
    key: "mobile",
    label: "تطبيق موبايل",
    first: "نسخة تجريبية على هاتفك خلال أول ٤ أسابيع.",
  },
  {
    key: "store",
    label: "متجر إلكتروني",
    first: "واجهة المتجر مع منتجاتك الحقيقية خلال أول ٣ أسابيع.",
  },
  {
    key: "erp",
    label: "نظام داخلي",
    first: "وحدة واحدة كاملة تعمل فعلياً قبل الانتقال إلى غيرها.",
  },
];

const stages = [
  {
    key: "idea",
    label: "لدي فكرة فقط",
    hint: "لم أحدد التفاصيل بعد",
    step: "جلسة استكشاف نحوّل فيها الفكرة إلى نطاق عمل ومراحل واضحة.",
  },
  {
    key: "spec",
    label: "لدي تصور ومتطلبات",
    hint: "أعرف ما أريده تقريباً",
    step: "نراجع المتطلبات معك ونحدد ما يدخل النسخة الأولى وما ينتظر.",
  },
  {
    key: "existing",
    label: "لدي نظام قائم",
    hint: "يحتاج تطويراً أو إعادة بناء",
    step: "نفحص الكود والبنية الحالية قبل أي وعد بالتعديل أو إعادة البناء.",
  },
];

// أسابيع تقريبية — عدّلها حسب خبرتكم الفعلية
const durations = {
  web: { idea: "٨ – ١٢", spec: "٦ – ٩", existing: "٤ – ٨" },
  mobile: { idea: "١٠ – ١٦", spec: "٨ – ١٢", existing: "٥ – ١٠" },
  store: { idea: "٦ – ١٠", spec: "٤ – ٧", existing: "٣ – ٦" },
  erp: { idea: "١٦ – ٢٦", spec: "١٢ – ٢٠", existing: "٨ – ١٦" },
};

export default function ProjectPlanner() {
  const { openContactModal } = useContactModal();
  const [typeIdx, setTypeIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  const type = types[typeIdx];
  const stage = stages[stageIdx];
  const duration = durations[type.key][stage.key];

  // اللي اختاره الزائر: بيتعرض في الـ modal وبيتبعت للباك ويظهر في صفحة الأدمن
  function handleDiscuss() {
    openContactModal("مناقشة مشروع", {
      details: [
        { label: "نوع المشروع", value: type.label },
        { label: "مرحلة المشروع", value: stage.label },
        { label: "المدة التقديرية", value: `${duration} أسبوع` },
      ],
    });
  }

  return (
    <section className="container-x section">
      <div className="grid overflow-hidden rounded-xl2 lg:grid-cols-[1.1fr_1fr]">
        {/* الاختيارات */}
        <div className="bg-sand px-6 py-10 text-brand-dark md:px-12 md:py-14">
          <h2 className="font-heading text-3xl font-extrabold leading-[1.25] md:text-5xl">
            كم يستغرق مشروعك تقريباً؟
          </h2>
          <p className="mt-4 max-w-md leading-loose text-brand-dark/75">
            اختر نوع المشروع ومرحلتك الحالية، وسنعطيك فكرة أولية عن المدة وعن أول خطوة معنا.
          </p>

          {/* ١ */}
          <p className="mb-3 mt-10 text-sm font-black">١. ماذا تريد أن تبني؟</p>
          <div
            role="group"
            aria-label="نوع المشروع"
            className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-brand-dark/30 bg-brand-dark/30"
          >
            {types.map((t, i) => {
              const active = i === typeIdx;
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTypeIdx(i)}
                  className={`px-4 py-5 text-base font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark md:py-6 ${
                    active
                      ? "bg-brand-dark text-white"
                      : "bg-sand text-brand-dark hover:bg-brand-dark/10"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* ٢ */}
          <p className="mb-1 mt-10 text-sm font-black">٢. أين أنت الآن؟</p>
          <div role="radiogroup" aria-label="مرحلة المشروع" className="border-b border-brand-dark/30">
            {stages.map((s, i) => {
              const active = i === stageIdx;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setStageIdx(i)}
                  className="flex w-full items-center gap-4 border-t border-brand-dark/30 py-4 text-right outline-none transition-colors duration-300 hover:bg-brand-dark/[0.05] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark"
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-5 shrink-0 place-items-center rounded-full border-2 border-brand-dark transition-colors duration-300 ${
                      active ? "bg-brand-dark" : "bg-transparent"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full bg-sand ${active ? "opacity-100" : "opacity-0"}`} />
                  </span>
                  <span className="flex-1">
                    <span className={`block text-base ${active ? "font-black" : "font-bold"}`}>
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-brand-dark/60">{s.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* النتيجة */}
        <div className="flex flex-col justify-between gap-10 bg-brand-dark px-6 py-10 text-white md:px-12 md:py-14">
          <div key={`${type.key}-${stage.key}`} className="animate-fadeIn">
            <p className="text-sm font-bold text-sand">تقدير أولي للنسخة الأولى</p>

            <div className="mt-4 flex items-baseline gap-3" aria-live="polite">
              <span className="font-heading text-7xl font-extrabold leading-none text-sand md:text-8xl">
                {duration}
              </span>
              <span className="text-lg text-white/65">أسبوع</span>
            </div>

            <dl className="mt-10 divide-y divide-white/15 border-y border-white/15">
              <div className="py-5">
                <dt className="mb-1.5 text-xs font-bold text-white/50">أول ما تراه</dt>
                <dd className="leading-loose text-white/90">{type.first}</dd>
              </div>
              <div className="py-5">
                <dt className="mb-1.5 text-xs font-bold text-white/50">أول خطوة معنا</dt>
                <dd className="leading-loose text-white/90">{stage.step}</dd>
              </div>
            </dl>
          </div>

          <div>
            <button
              type="button"
              onClick={handleDiscuss}
              className="group inline-flex items-center gap-2 rounded-full bg-sand px-8 py-3.5 text-sm font-black text-brand-dark outline-none transition-all duration-300 hover:gap-3 hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
            >
              ناقش هذا المشروع
              <ArrowLeft size={16} />
            </button>
            <p className="mt-4 text-xs text-white/45">
              التقدير استرشادي، ويتحدد بدقة بعد جلسة الاستكشاف.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}