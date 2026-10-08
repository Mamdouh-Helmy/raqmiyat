"use client";

// components/ProjectPlanner.jsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useContactModal } from "./ContactModalProvider";

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

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
    step: "جلسة استكشاف نحوّل فيها الفكرة إلى نطاق عمل ومراحل واضحة.",
  },
  {
    key: "spec",
    label: "لدي تصور ومتطلبات",
    step: "نراجع المتطلبات معك ونحدد ما يدخل النسخة الأولى وما ينتظر.",
  },
  {
    key: "existing",
    label: "لدي نظام قائم",
    step: "نفحص الكود والبنية الحالية قبل أي وعد بالتعديل أو إعادة البناء.",
  },
];

// أسابيع تقريبية [الأدنى، الأقصى] — عدّلها حسب خبرتكم الفعلية
const durations = {
  web: { idea: [8, 12], spec: [6, 9], existing: [4, 8] },
  mobile: { idea: [10, 16], spec: [8, 12], existing: [5, 10] },
  store: { idea: [6, 10], spec: [4, 7], existing: [3, 6] },
  erp: { idea: [16, 26], spec: [12, 20], existing: [8, 16] },
};

// مقياس الشريط: أكبر مدة في البيانات
const SCALE = Math.max(
  ...Object.values(durations).flatMap((o) => Object.values(o).map(([, max]) => max))
);

// خط الموقع العادي (من غير font-heading)
const choice = (active) =>
  `shrink-0 whitespace-nowrap border-b-2 pb-1 text-base font-bold leading-relaxed outline-none transition-colors duration-300 focus-visible:text-white md:text-lg ${
    active
      ? "border-sand text-sand"
      : "border-transparent text-white/45 hover:text-white/85"
  }`;

// صف اختيارات: سطر واحد دايماً، وعلى الموبايل بيتحرك أفقياً من غير scrollbar
const rowClass = "flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8";
const optionsClass =
  "flex flex-nowrap items-baseline gap-x-6 overflow-x-auto md:gap-x-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const labelClass = "shrink-0 text-sm font-bold text-white/50 md:w-24 md:text-base";

export default function ProjectPlanner() {
  const { openContactModal } = useContactModal();
  const [typeIdx, setTypeIdx] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  const type = types[typeIdx];
  const stage = stages[stageIdx];
  const [min, max] = durations[type.key][stage.key];
  const duration = `${toAr(min)} – ${toAr(max)}`;

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
      <div className="rounded-xl2 bg-brand-dark px-6 py-10 text-white md:px-12 md:py-14">
        <h2 className="font-heading text-2xl font-extrabold leading-[1.25] md:text-4xl">
          كم يستغرق مشروعك تقريباً؟
        </h2>

        {/* الاختيارات: كل صف سطر واحد */}
        <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
          <div className={rowClass}>
            <span className={labelClass}>أريد بناء</span>
            <div role="radiogroup" aria-label="نوع المشروع" className={optionsClass}>
              {types.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  role="radio"
                  aria-checked={i === typeIdx}
                  onClick={() => setTypeIdx(i)}
                  className={choice(i === typeIdx)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className={rowClass}>
            <span className={labelClass}>وحالياً</span>
            <div role="radiogroup" aria-label="مرحلة المشروع" className={optionsClass}>
              {stages.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  role="radio"
                  aria-checked={i === stageIdx}
                  onClick={() => setStageIdx(i)}
                  className={choice(i === stageIdx)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* النتيجة */}
        <div className="mt-10 border-t border-white/15 pt-8 md:mt-12 md:pt-10" aria-live="polite">
          <div className="grid items-end gap-6 lg:grid-cols-[auto_1fr] lg:gap-14">
            {/* الرقم */}
            <div key={`${type.key}-${stage.key}`} className="animate-fadeIn">
              <p className="text-xs font-bold text-white/55 md:text-sm">تقدير أولي للنسخة الأولى</p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-heading text-6xl font-extrabold leading-none text-sand md:text-7xl">
                  {duration}
                </span>
                <span className="text-lg text-white/65">أسبوع</span>
              </div>
            </div>

            {/* مقياس الأسابيع */}
            <div>
              <div className="flex gap-[3px]" dir="rtl" aria-hidden="true">
                {Array.from({ length: SCALE }, (_, i) => (
                  <span
                    key={i}
                    className={`h-9 flex-1 rounded-[3px] transition-colors duration-500 md:h-12 ${
                      i < min ? "bg-sand" : i < max ? "bg-sand/35" : "bg-white/10"
                    }`}
                    style={{ transitionDelay: `${i * 14}ms` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-xs text-white/50">
                <span className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-[2px] bg-sand" aria-hidden="true" />
                    المدة المتوقعة
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-[2px] bg-sand/35" aria-hidden="true" />
                    قد تمتد إليها
                  </span>
                </span>
                <span>الأسبوع ١ ← الأسبوع {toAr(SCALE)}</span>
              </div>
            </div>
          </div>

          {/* التفاصيل + الزرار في صف واحد */}
          <div
            key={`d-${type.key}-${stage.key}`}
            className="mt-8 grid animate-fadeIn gap-6 md:mt-10 md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-10"
          >
            <div className="border-t border-white/15 pt-4">
              <p className="mb-1.5 text-xs font-bold text-white/50">أول ما تراه</p>
              <p className="leading-relaxed text-white/90">{type.first}</p>
            </div>
            <div className="border-t border-white/15 pt-4">
              <p className="mb-1.5 text-xs font-bold text-white/50">أول خطوة معنا</p>
              <p className="leading-relaxed text-white/90">{stage.step}</p>
            </div>
            <div>
              <button
                type="button"
                onClick={handleDiscuss}
                className="inline-flex items-center gap-2 rounded-full bg-sand px-7 py-3 text-sm font-black text-brand-dark outline-none transition-all duration-300 hover:gap-3 hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
              >
                ناقش هذا المشروع
                <ArrowLeft size={16} />
              </button>
              <p className="mt-2.5 text-[11px] text-white/40">التقدير استرشادي، ويتحدد بعد جلسة الاستكشاف.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}