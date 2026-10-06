"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Camera,
  ChevronDown,
  Globe,
  Plug,
  Smartphone,
} from "lucide-react";
import { SquiggleUnderline } from "@/components/SquiggleUnderline";
import { useContactModal } from "@/components/ContactModalProvider";
import { works, workTypes } from "@/lib/works";

const TYPE_ICONS = {
  web: Globe,
  mobile: Smartphone,
  security: Camera,
  erp: Boxes,
  data: BarChart3,
  integration: Plug,
};

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const chip = (active) =>
  `rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
    active
      ? "border-brand bg-brand text-white"
      : "border-ink/15 bg-white text-ink/70 hover:border-brand hover:text-brand"
  }`;

export default function WorksLedger() {
  const { openContactModal } = useContactModal();
  const reduce = useReducedMotion();
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

  function pickFilter(value) {
    setFilter(value);
    const first = value === "all" ? works[0] : works.find((w) => w.type === value);
    setOpenId(first ? first.id : null);
  }

  return (
    <>
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="mb-5 inline-block">
          <h1 className="text-3xl font-black leading-[1.3] text-ink md:text-5xl">
            سجل أعمالنا
          </h1>
          <SquiggleUnderline />
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
          نوثّق كل مشروع بعد تسليمه: ما المشكلة التي بدأنا منها، وماذا بنينا، وما الذي
          تغيّر بعد الإطلاق. افتح أي مشروع لتقرأ تفاصيله.
        </p>
      </section>

      <section className="container-x section !pt-6">
        {/* التصفية */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية الأعمال حسب النوع">
          <button
            type="button"
            onClick={() => pickFilter("all")}
            aria-pressed={filter === "all"}
            className={chip(filter === "all")}
          >
            كل الأعمال
            <span className="ms-2 text-xs font-normal opacity-70">{toAr(works.length)}</span>
          </button>
          {types.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => pickFilter(t.value)}
              aria-pressed={filter === t.value}
              className={chip(filter === t.value)}
            >
              {t.label}
              <span className="ms-2 text-xs font-normal opacity-70">{toAr(t.count)}</span>
            </button>
          ))}
        </div>

        {/* السجل */}
        <ul className="mt-8 border-t border-ink/15">
          {visible.map((w) => {
            const Icon = TYPE_ICONS[w.type] || Globe;
            const open = openId === w.id;
            const panelId = `work-${w.id}`;
            const typeLabel = workTypes.find((t) => t.value === w.type)?.label;

            return (
              <li key={w.id} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : w.id)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-4 py-6 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:gap-6 md:py-7"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 md:h-14 md:w-14 ${
                      open ? "bg-brand text-white" : "bg-brand-soft text-brand"
                    }`}
                  >
                    <Icon size={22} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-black leading-snug text-ink transition-colors group-hover:text-brand md:text-2xl">
                      {w.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink/50">
                      {typeLabel} · {w.sector} · {toAr(w.year)}
                    </span>
                  </span>

                  <ul className="hidden max-w-[16rem] flex-wrap justify-end gap-2 lg:flex">
                    {w.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs text-ink/65"
                        dir="ltr"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-ink/40 transition-transform duration-300 ${
                      open ? "rotate-180 text-brand" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`grid gap-8 pb-9 ps-0 md:ps-[4.5rem] ${
                          w.outcome ? "md:grid-cols-3" : "md:grid-cols-2"
                        }`}
                      >
                        <div>
                          <h3 className="mb-2 text-sm font-black text-sand-deep">المشكلة</h3>
                          <p className="leading-loose text-ink/70">{w.problem}</p>
                        </div>

                        <div>
                          <h3 className="mb-2 text-sm font-black text-sand-deep">ما بنيناه</h3>
                          <ul className="list-disc space-y-2 ps-5 leading-relaxed text-ink/70 marker:text-sand">
                            {w.built.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        </div>

                        {w.outcome && (
                          <div>
                            <h3 className="mb-2 text-sm font-black text-sand-deep">
                              بعد الإطلاق
                            </h3>
                            <p className="leading-loose text-ink/70">{w.outcome}</p>
                          </div>
                        )}

                        <ul className="flex flex-wrap gap-2 md:col-span-full lg:hidden">
                          {w.tags.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs text-ink/65"
                              dir="ltr"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* دعوة للتواصل */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-xl2 bg-brand-dark p-8 text-white md:flex-row md:items-center md:p-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-black leading-snug md:text-3xl">
              عندك مشكلة تشبه إحدى هذه؟
            </h2>
            <p className="mt-3 leading-relaxed text-white/65">
              احكِ لنا ما يعطّل عملك الآن، ونقترح عليك نقطة بداية واضحة قبل أي التزام.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openContactModal("مناقشة مشروع")}
            className="btn-primary shrink-0"
          >
            ناقش مشروعك معنا
          </button>
        </div>
      </section>
    </>
  );
}