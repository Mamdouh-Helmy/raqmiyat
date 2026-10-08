"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Camera,
  ChartBar,
  Cube,
  DeviceMobile,
  Globe,
  PlugsConnected,
} from "@phosphor-icons/react/dist/ssr";
import { useContactModal } from "@/components/ContactModalProvider";
import { works, workTypes } from "@/lib/works";

const TYPE_ICONS = {
  web: Globe,
  mobile: DeviceMobile,
  security: Camera,
  erp: Cube,
  data: ChartBar,
  integration: PlugsConnected,
};

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const labelClass = "mb-2 text-sm font-black text-sand";

// تفاصيل المشروع: صورة من الحافة للحافة + النص
function Detail({ work }) {
  const Icon = TYPE_ICONS[work.type] || Globe;

  return (
    <div key={work.id} className="animate-fadeIn">
      <div className="relative aspect-[16/10] bg-white/5">
        {work.image ? (
          <Image
            src={work.image}
            alt={work.imageAlt || work.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-white/30">
            <Icon size={72} weight="duotone" />
          </span>
        )}
      </div>

      <div className="space-y-7 px-6 py-8 md:px-10 md:py-10">
        <div>
          <h3 className={labelClass}>المشكلة</h3>
          <p className="leading-loose text-white/80">{work.problem}</p>
        </div>

        <div>
          <h3 className={labelClass}>ما بنيناه</h3>
          <ul className="list-disc space-y-2 ps-5 leading-relaxed text-white/80 marker:text-sand">
            {work.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        {work.outcome && (
          <div>
            <h3 className={labelClass}>بعد الإطلاق</h3>
            <p className="leading-loose text-white/80">{work.outcome}</p>
          </div>
        )}

        <ul className="flex flex-wrap gap-2 border-t border-white/15 pt-6">
          {work.tags.map((t) => (
            <li
              key={t}
              dir="ltr"
              className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/75"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function WorksLedger() {
  const { openContactModal } = useContactModal();
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(works[0]?.id ?? null);

  const visible = useMemo(
    () => (filter === "all" ? works : works.filter((w) => w.type === filter)),
    [filter]
  );

  // نعرض في الفلتر بس الأنواع اللي فيها أعمال فعلاً
  const types = workTypes
    .map((t) => ({ ...t, count: works.filter((w) => w.type === t.value).length }))
    .filter((t) => t.count > 0);

  const current = visible.find((w) => w.id === openId) ?? visible[0];

  function pickFilter(value) {
    setFilter(value);
    const first = value === "all" ? works[0] : works.find((w) => w.type === value);
    setOpenId(first ? first.id : null);
  }

  const tab = (active) =>
    `border-b-2 pb-1.5 text-base font-bold outline-none transition-colors duration-300 focus-visible:text-brand ${
      active
        ? "border-brand-dark text-ink"
        : "border-transparent text-ink/45 hover:text-ink/80"
    }`;

  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.2] text-ink md:text-6xl">
            سجل أعمالنا
          </h1>
          <p className="max-w-sm leading-loose text-ink/60">
            نوثّق كل مشروع بعد تسليمه: ما المشكلة التي بدأنا منها، وماذا بنينا، وما الذي تغيّر بعد
            الإطلاق.
          </p>
        </div>
      </section>

      <section className="container-x section !pt-6">
        {/* التصفية */}
        <div
          className="mb-6 flex flex-wrap gap-x-7 gap-y-3"
          role="group"
          aria-label="تصفية الأعمال حسب النوع"
        >
          <button
            type="button"
            onClick={() => pickFilter("all")}
            aria-pressed={filter === "all"}
            className={tab(filter === "all")}
          >
            كل الأعمال
            <span className="ms-2 text-xs font-normal opacity-60">{toAr(works.length)}</span>
          </button>
          {types.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => pickFilter(t.value)}
              aria-pressed={filter === t.value}
              className={tab(filter === t.value)}
            >
              {t.label}
              <span className="ms-2 text-xs font-normal opacity-60">{toAr(t.count)}</span>
            </button>
          ))}
        </div>

        <div className="grid overflow-hidden rounded-xl2 lg:grid-cols-[1fr_1.1fr]">
          {/* القايمة + الدعوة */}
          <div className="flex flex-col justify-between gap-10 bg-sand px-6 py-8 text-brand-dark md:px-10 md:py-10">
            <ol className="border-b border-brand-dark/25">
              {visible.map((w, i) => {
                const active = current?.id === w.id;
                const typeLabel = workTypes.find((t) => t.value === w.type)?.label;

                return (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(w.id)}
                      aria-current={active ? "true" : undefined}
                      className={`flex w-full items-baseline gap-4 border-t border-brand-dark/25 py-5 text-start outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-dark md:gap-6 ${
                        active ? "opacity-100" : "opacity-50 hover:opacity-85"
                      }`}
                    >
                      <span className="w-8 shrink-0 text-sm font-bold tabular-nums">
                        {toAr(String(i + 1).padStart(2, "0"))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-xl leading-snug md:text-2xl ${
                            active ? "font-black" : "font-bold"
                          }`}
                        >
                          {w.title}
                        </span>
                        <span className="mt-1.5 block text-sm text-brand-dark/70">
                          {typeLabel} · {w.sector} · {toAr(w.year)}
                        </span>
                      </span>
                    </button>

                    {/* الموبايل: التفاصيل تفتح تحت الصف مباشرة */}
                    {active && (
                      <div className="mb-6 overflow-hidden rounded-xl bg-brand-dark text-white lg:hidden">
                        <Detail work={w} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            <div>
              <h2 className="font-heading text-2xl font-extrabold leading-snug md:text-3xl">
                عندك مشكلة تشبه إحدى هذه؟
              </h2>
              <p className="mt-3 max-w-md leading-loose text-brand-dark/75">
                احكِ لنا ما يعطّل عملك الآن، ونقترح عليك نقطة بداية واضحة قبل أي التزام.
              </p>
              <button
                type="button"
                onClick={() => openContactModal("مناقشة مشروع")}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-dark px-8 py-3.5 text-sm font-black text-white outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
              >
                ناقش مشروعك معنا
              </button>
            </div>
          </div>

          {/* الديسكتوب: لوح التفاصيل */}
          <div className="hidden bg-brand-dark text-white lg:block">
            {current && <Detail work={current} />}
          </div>
        </div>
      </section>
    </>
  );
}