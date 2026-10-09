"use client";

import { useEffect, useRef } from "react";

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
const pad = (n) => toAr(String(n).padStart(2, "0"));

// فهرس نصي بنفس لغة الصفحة: رقم من خانتين مفرغ (زي أرقام المشاريع)
// بيتعبّى بالرملي لما التبويب يتفعّل أو عند المرور، وخط سميك تحت المختار.
// types: [{ value, label, count }]
export default function WorksFilterBar({
  types,
  total,
  filter,
  onChange,
  stickyTop = "top-[3.75rem]",
}) {
  const buttons = useRef({});
  const first = useRef(true);

  // على الجوال: التبويب المختار يتوسّط الشريط
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    buttons.current[filter]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [filter]);

  const tabs = [{ value: "all", label: "الكل", count: total }, ...types];

  return (
    <div className={`sticky ${stickyTop} z-30 bg-brand-soft`}>
      <div className="container-x border-b-2 border-brand/15">
        <div
          role="group"
          aria-label="تصفية الأعمال حسب النوع"
          className="flex items-end gap-x-9 overflow-x-auto [scrollbar-width:none] md:gap-x-14 [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map(({ value, label, count }) => {
            const active = filter === value;
            return (
              <button
                key={value}
                ref={(el) => {
                  buttons.current[value] = el;
                }}
                type="button"
                onClick={() => onChange(value)}
                aria-pressed={active}
                aria-label={`${label}، ${toAr(count)}`}
                className="group relative flex shrink-0 items-center gap-3 py-5 outline-none focus-visible:text-brand-light"
              >
                {/* الرقم: مفرغ، ويتعبّى بالرملي عند التفعيل أو المرور */}
                <span
                  aria-hidden="true"
                  className={`font-heading text-2xl leading-none tabular-nums [transition:color_.3s,-webkit-text-fill-color_.3s] md:text-3xl ${
                    active
                      ? "text-sand-deep [-webkit-text-fill-color:currentColor]"
                      : "text-brand/45 [-webkit-text-fill-color:transparent] group-hover:text-sand-deep group-hover:[-webkit-text-fill-color:currentColor]"
                  }`}
                  style={{ WebkitTextStroke: "1px currentColor" }}
                >
                  {pad(count)}
                </span>

                {/* فاصل رفيع بين الرقم والاسم */}
                <span
                  aria-hidden="true"
                  className={`h-5 w-px transition-colors duration-300 ${
                    active ? "bg-sand-deep" : "bg-brand/20"
                  }`}
                />

                <span
                  aria-hidden="true"
                  className={`font-heading text-xl leading-none transition-colors duration-300 md:text-2xl ${
                    active ? "text-brand" : "text-brand/45 group-hover:text-brand/80"
                  }`}
                >
                  {label}
                </span>

                {/* خط سميك تحت التبويب المختار، وخفيف عند المرور */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-[3px] origin-right bg-brand transition-transform duration-500 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}