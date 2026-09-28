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
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <h2 className="text-3xl font-black text-ink">
            كم يستغرق مشروعك تقريباً؟
          </h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 max-w-lg mx-auto">
          اختر نوع المشروع ومرحلتك الحالية، وسنعطيك فكرة أولية عن المدة وعن
          أول خطوة معنا.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
        {/* الاختيارات */}
        <div className="space-y-8">
          <div>
            <p className="text-xs font-bold text-ink/45 mb-3">
              ١ — ماذا تريد أن تبني؟
            </p>
            <div className="flex flex-wrap gap-2.5" role="group">
              {types.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={i === typeIdx}
                  onClick={() => setTypeIdx(i)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-bold transition-colors ${
                    i === typeIdx
                      ? "bg-brand-dark text-white border-brand-dark"
                      : "bg-white text-ink/70 border-ink/15 hover:border-brand/40"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-ink/45 mb-3">
              ٢ — أين أنت الآن؟
            </p>
            <div className="space-y-2.5" role="radiogroup">
              {stages.map((s, i) => {
                const active = i === stageIdx;
                return (
                  <button
                    key={s.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setStageIdx(i)}
                    className={`w-full text-right flex items-start gap-3.5 p-4 rounded-xl2 border transition-colors ${
                      active
                        ? "bg-white border-brand shadow-sm"
                        : "border-ink/10 hover:border-brand/30"
                    }`}
                  >
                    <span
                      className={`mt-1 w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                        active
                          ? "border-brand bg-brand shadow-[inset_0_0_0_3px_white]"
                          : "border-ink/25"
                      }`}
                    />
                    <span>
                      <span className="block font-black text-ink text-sm">
                        {s.label}
                      </span>
                      <span className="block text-ink/50 text-xs mt-0.5">
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
          className="rounded-xl2 bg-brand-dark text-white p-8 md:p-10 flex flex-col animate-fadeIn"
        >
          <p className="text-white/45 text-xs font-bold mb-3">
            تقدير أولي للنسخة الأولى
          </p>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="font-heading text-6xl md:text-7xl leading-none">
              {duration}
            </span>
            <span className="text-white/60">أسبوع</span>
          </div>

          <dl className="space-y-5 border-t border-white/10 pt-6 mb-8">
            <div>
              <dt className="text-white/45 text-xs font-bold mb-1">
                أول ما تراه
              </dt>
              <dd className="text-white/90 text-sm leading-relaxed">
                {type.first}
              </dd>
            </div>
            <div>
              <dt className="text-white/45 text-xs font-bold mb-1">
                أول خطوة معنا
              </dt>
              <dd className="text-white/90 text-sm leading-relaxed">
                {stage.step}
              </dd>
            </div>
          </dl>

          <div className="mt-auto">
            <button
              type="button"
              onClick={handleDiscuss}
              className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors"
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