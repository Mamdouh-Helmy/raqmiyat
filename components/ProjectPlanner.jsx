"use client";

// components/ProjectPlanner.jsx
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SquiggleUnderline } from "./SquiggleUnderline";
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

// شبكة معيّنات السدو لكارت النتيجة
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.16'/%3E%3C/svg%3E\")";

// عنوان فرعي بمعيّن صغير
function StepLabel({ n, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="relative grid place-items-center size-7 shrink-0">
        <span className="absolute size-5 rotate-45 rounded-[3px] border border-[#c9a66b]/70 bg-white" />
        <span className="relative font-heading text-[11px] leading-none text-brand-dark">
          {n}
        </span>
      </span>
      <p className="text-xs font-bold tracking-wide text-[#a98445]">{children}</p>
      <span className="h-px flex-1 bg-gradient-to-l from-ink/10 to-transparent" />
    </div>
  );
}

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
      {/* العنوان */}
      <div className="text-center mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a66b]" />
          <span className="size-2 rotate-45 bg-[#c9a66b]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a66b]" />
        </div>

        <div className="inline-block mb-5">
          <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.3]">
            كم يستغرق مشروعك تقريباً؟
          </h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 max-w-lg mx-auto leading-relaxed">
          اختر نوع المشروع ومرحلتك الحالية، وسنعطيك فكرة أولية عن المدة وعن
          أول خطوة معنا.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
        {/* الاختيارات */}
        <div className="space-y-10">
          <div>
            <StepLabel n="١">ماذا تريد أن تبني؟</StepLabel>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="نوع المشروع">
              {types.map((t, i) => {
                const active = i === typeIdx;
                return (
                  <button
                    key={t.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTypeIdx(i)}
                    className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm font-bold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#c9a66b]/60 ${
                      active
                        ? "bg-brand-dark text-white border-brand-dark shadow-md"
                        : "bg-white text-ink/70 border-ink/15 hover:border-[#c9a66b] hover:text-ink"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2 rotate-45 transition-all duration-300 ${
                        active
                          ? "bg-[#c9a66b] scale-110"
                          : "border border-[#c9a66b]/60 group-hover:bg-[#c9a66b]/40"
                      }`}
                    />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <StepLabel n="٢">أين أنت الآن؟</StepLabel>
            <div className="space-y-3" role="radiogroup" aria-label="مرحلة المشروع">
              {stages.map((s, i) => {
                const active = i === stageIdx;
                return (
                  <button
                    key={s.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setStageIdx(i)}
                    className={`group relative w-full overflow-hidden text-right flex items-start gap-4 p-4 md:p-5 rounded-xl2 border outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#c9a66b]/60 ${
                      active
                        ? "bg-white border-[#c9a66b]/60 shadow-md"
                        : "border-ink/10 hover:border-[#c9a66b]/40 hover:bg-brand-dark/[0.025]"
                    }`}
                  >
                    {/* خط ذهبي جانبي للاختيار الحالي */}
                    <span
                      aria-hidden="true"
                      className={`absolute right-0 top-0 h-full w-[3px] origin-top bg-[#c9a66b] transition-transform duration-500 ${
                        active ? "scale-y-100" : "scale-y-0"
                      }`}
                    />

                    {/* المعيّن بدل الدايرة */}
                    <span className="relative grid place-items-center size-8 shrink-0 mt-0.5">
                      <span
                        className={`absolute size-5 rotate-45 rounded-[3px] border-2 transition-all duration-500 ${
                          active
                            ? "rotate-[135deg] border-brand-dark bg-brand-dark"
                            : "border-[#c9a66b]/60 bg-white group-hover:rotate-[135deg]"
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className={`relative size-1.5 rotate-45 bg-[#c9a66b] transition-opacity duration-300 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </span>

                    <span>
                      <span className="block font-black text-ink text-sm md:text-base">
                        {s.label}
                      </span>
                      <span className="block text-ink/50 text-xs mt-1">
                        {s.hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* النتيجة */}
        <div
          key={`${type.key}-${stage.key}`}
          className="relative isolate overflow-hidden rounded-xl2 bg-brand-dark text-white p-8 md:p-10 flex flex-col animate-fadeIn"
        >
          {/* زخرفة السدو */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: lattice,
              backgroundSize: "56px 56px",
              WebkitMaskImage: "linear-gradient(to bottom left, #000 0%, transparent 70%)",
              maskImage: "linear-gradient(to bottom left, #000 0%, transparent 70%)",
            }}
          />
          {/* توهّج ذهبي */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 -z-10 size-64 rounded-full bg-[#c9a66b]/15 blur-3xl"
          />
          {/* خط ذهبي علوي */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b]/70 to-transparent"
          />

          <div className="flex items-center gap-3 mb-5">
            <span className="size-2 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
            <p className="text-[#c9a66b] text-xs font-bold tracking-widest">
              تقدير أولي للنسخة الأولى
            </p>
          </div>

          <div className="flex items-baseline gap-3 mb-8" aria-live="polite">
            <span className="font-heading text-6xl md:text-7xl leading-none bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              {duration}
            </span>
            <span className="text-white/60">أسبوع</span>
          </div>

          <dl className="space-y-6 border-t border-white/10 pt-6 mb-8">
            <div className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 rotate-45 shrink-0 bg-[#c9a66b]"
              />
              <div>
                <dt className="text-[#c9a66b]/80 text-xs font-bold mb-1">
                  أول ما تراه
                </dt>
                <dd className="text-white/90 text-sm leading-relaxed">
                  {type.first}
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 rotate-45 shrink-0 bg-[#c9a66b]"
              />
              <div>
                <dt className="text-[#c9a66b]/80 text-xs font-bold mb-1">
                  أول خطوة معنا
                </dt>
                <dd className="text-white/90 text-sm leading-relaxed">
                  {stage.step}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-auto">
            <button
              type="button"
              onClick={handleDiscuss}
              className="group inline-flex items-center gap-2 bg-[#c9a66b] text-brand-dark px-6 py-3 rounded-xl font-bold text-sm outline-none transition-all duration-300 hover:bg-[#d6b57d] hover:gap-3 focus-visible:ring-2 focus-visible:ring-[#c9a66b] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              ناقش هذا المشروع
              <ArrowLeft size={15} />
            </button>
            <p className="text-white/40 text-xs mt-4">
              التقدير استرشادي، ويتحدد بدقة بعد جلسة الاستكشاف.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}