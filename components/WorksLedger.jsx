"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CaretDown,
  Camera,
  ChartBar,
  Cube,
  DeviceMobile,
  Globe,
  PlugsConnected,
} from "@phosphor-icons/react/dist/ssr";
import { SquiggleUnderline } from "@/components/SquiggleUnderline";
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

const chip = (active) =>
  `rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
    active
      ? "border-brand bg-brand text-white"
      : "border-ink/15 bg-white text-ink/70 hover:border-brand hover:text-brand"
  }`;

// مصغّرة العمل في الصف: الصورة لو موجودة، وإلا أيقونة النوع
function Thumb({ work, Icon, open }) {
  return (
    <span
      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl transition-shadow duration-300 md:h-16 md:w-28 ${
        open ? "ring-2 ring-brand" : "ring-1 ring-ink/10"
      }`}
    >
      {work.image ? (
        <Image src={work.image} alt="" fill sizes="112px" className="object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-brand-soft text-brand">
          <Icon size={24} weight="duotone" />
        </span>
      )}
    </span>
  );
}

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
          {types.map((t) => {
            const Icon = TYPE_ICONS[t.value] || Globe;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => pickFilter(t.value)}
                aria-pressed={filter === t.value}
                className={`${chip(filter === t.value)} inline-flex items-center gap-2`}
              >
                <Icon size={16} weight={filter === t.value ? "fill" : "duotone"} />
                {t.label}
                <span className="text-xs font-normal opacity-70">{toAr(t.count)}</span>
              </button>
            );
          })}
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
                  className="group flex w-full items-center gap-4 py-5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:gap-6 md:py-6"
                >
                  <Thumb work={w} Icon={Icon} open={open} />

                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-black leading-snug text-ink transition-colors group-hover:text-brand md:text-2xl">
                      {w.title}
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/50">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon size={15} weight="duotone" />
                        {typeLabel}
                      </span>
                      <span className="h-3 w-px bg-ink/20" aria-hidden="true" />
                      <span>{w.sector}</span>
                      <span className="h-3 w-px bg-ink/20" aria-hidden="true" />
                      <span>{toAr(w.year)}</span>
                    </span>
                  </span>

                  <ul className="hidden max-w-[16rem] flex-wrap justify-end gap-2 xl:flex">
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

                  <CaretDown
                    size={20}
                    weight="bold"
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
                      aria-label={w.title}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 pt-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
                        {/* الصورة */}
                        <figure className="relative aspect-[16/10] overflow-hidden rounded-xl2 bg-brand-soft ring-1 ring-ink/10">
                          {w.image ? (
                            <Image
                              src={w.image}
                              alt={w.imageAlt || w.title}
                              fill
                              sizes="(min-width: 1024px) 45vw, 100vw"
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-brand/60">
                              <Icon size={64} weight="duotone" />
                            </span>
                          )}
                        </figure>

                        {/* التفاصيل */}
                        <div className="space-y-7">
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

                          <ul className="flex flex-wrap gap-2 xl:hidden">
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