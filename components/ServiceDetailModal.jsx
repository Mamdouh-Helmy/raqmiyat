"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { useIsClient } from "@/lib/useIsClient";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const arNum = (n) =>
  String(n)
    .padStart(2, "0")
    .replace(/\d/g, (d) => AR_DIGITS[d]);

// نفس النسيج الهندسي النجدي المستخدم في باقي أقسام الصفحة
const LATTICE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 2L46 24 24 46 2 24zM24 14L34 24 24 34 14 24z' fill='none' stroke='%23b8934a' stroke-opacity='.12' stroke-width='1'/%3E%3C/svg%3E")`,
  backgroundSize: "48px 48px",
};

const CORNERS = [
  "top-4 left-4 border-t-2 border-l-2",
  "top-4 right-4 border-t-2 border-r-2",
  "bottom-4 left-4 border-b-2 border-l-2",
  "bottom-4 right-4 border-b-2 border-r-2",
];

export default function ServiceDetailModal({
  service,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}) {
  const mounted = useIsClient();

  useEffect(() => {
    if (!service) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
      // الصفحة RTL: السهم الشمال = التالي، اليمين = السابق
      if (e.key === "ArrowLeft") onNext();
      if (e.key === "ArrowRight") onPrev();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose, onNext, onPrev]);

  if (!mounted || !service) return null;

  const { icon: Icon, title, intro, image, stats = [], features = [] } = service;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      style={{ overflowAnchor: "none" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="absolute inset-0 animate-fadeIn bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        key={index}
        style={LATTICE}
        className="relative flex max-h-[94vh] w-full max-w-5xl animate-fadeIn flex-col overflow-hidden rounded-xl2 bg-brand-dark shadow-2xl ring-1 ring-sand/30 md:h-[620px] md:flex-row"
      >
        {/* الصورة */}
        <div className="relative order-first h-48 shrink-0 bg-black md:order-last md:h-auto md:w-[42%]">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              className="object-cover"
            />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40"
          />

          {CORNERS.map((c) => (
            <span
              key={c}
              aria-hidden
              className={`pointer-events-none absolute size-6 border-sand/90 ${c}`}
            />
          ))}

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute left-9 top-9 grid size-10 place-items-center rounded-full bg-sand text-brand-dark shadow-md outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={18} />
          </button>

          <div className="absolute inset-x-9 bottom-9 flex items-center justify-between text-white">
            <span className="font-heading text-lg tabular-nums">
              {arNum(index + 1)}
              <span className="text-white/50"> / {arNum(total)}</span>
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label="الخدمة السابقة"
                className="grid size-10 place-items-center rounded-full border border-white/40 outline-none transition-colors hover:border-sand hover:bg-sand hover:text-brand-dark focus-visible:ring-2 focus-visible:ring-sand"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="الخدمة التالية"
                className="grid size-10 place-items-center rounded-full border border-white/40 outline-none transition-colors hover:border-sand hover:bg-sand hover:text-brand-dark focus-visible:ring-2 focus-visible:ring-sand"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* المحتوى */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div
            className="flex-1 overflow-y-auto px-6 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <span className="mb-5 grid size-12 place-items-center rounded-full bg-sand/15 text-sand ring-1 ring-sand/40">
              <Icon size={22} />
            </span>

            <h3
              id="service-modal-title"
              className="mb-4 font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl"
            >
              {title}
            </h3>

            <p className="text-[15px] leading-loose text-white/70">{intro}</p>

            {stats.length > 0 && (
              <div className="my-8 grid grid-cols-3 divide-x divide-x-reverse divide-white/15 border-y border-white/15">
                {stats.map((s) => (
                  <div key={s.label} className="px-2 py-5 text-center">
                    <div className="font-heading text-3xl font-extrabold leading-none text-sand md:text-4xl">
                      {s.value}
                    </div>
                    <div className="mt-2.5 text-[11px] leading-snug text-white/55">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {features.length > 0 && (
              <ul>
                {features.map((f) => (
                  <li
                    key={f.title}
                    className="flex gap-4 border-b border-white/10 py-4 last:border-0"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 size-2 shrink-0 rotate-45 bg-sand"
                    />
                    <div>
                      <h4 className="mb-1 text-sm font-black text-white">
                        {f.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-white/60">
                        {f.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}