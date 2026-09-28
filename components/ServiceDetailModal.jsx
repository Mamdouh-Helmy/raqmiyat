"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const arNum = (n) =>
  String(n)
    .padStart(2, "0")
    .replace(/\d/g, (d) => AR_DIGITS[d]);

export default function ServiceDetailModal({
  service,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      <div
        key={index}
        className="relative w-full max-w-4xl bg-paper rounded-xl2 shadow-2xl overflow-hidden animate-fadeIn max-h-[94vh] md:h-[600px] flex flex-col md:flex-row"
      >
        {/* الصورة */}
        <div className="relative order-first md:order-last h-44 md:h-auto md:w-[42%] shrink-0 bg-brand-dark">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 768px) 360px, 100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white text-ink flex items-center justify-center shadow-md hover:bg-brand-soft transition-colors"
          >
            <X size={17} />
          </button>

          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-white">
            <span className="font-heading text-lg tracking-wide">
              {arNum(index + 1)}
              <span className="text-white/50"> / {arNum(total)}</span>
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label="الخدمة السابقة"
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-ink transition-colors"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="الخدمة التالية"
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-ink transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* المحتوى */}
        <div className="flex-1 min-h-0 min-w-0 flex flex-col">
          <div
            className="flex-1 overflow-y-auto px-6 pt-7 pb-8 md:px-9 md:pt-9 md:pb-9 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-center gap-2 text-brand text-xs font-bold mb-4">
              <Icon size={15} />
              <span>أنظمة المراقبة</span>
            </div>

            <h3
              id="service-modal-title"
              className="font-heading text-3xl md:text-4xl text-ink leading-tight mb-4"
            >
              {title}
            </h3>

            <p className="text-ink/65 leading-loose text-[15px]">{intro}</p>

            {stats.length > 0 && (
              <div className="grid grid-cols-3 divide-x divide-x-reverse divide-ink/10 border-y border-ink/10 my-7">
                {stats.map((s) => (
                  <div key={s.label} className="py-4 px-2 text-center">
                    <div className="font-heading text-2xl text-brand leading-none">
                      {s.value}
                    </div>
                    <div className="text-[11px] text-ink/50 mt-2 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {features.length > 0 && (
              <ol>
                {features.map((f, i) => (
                  <li
                    key={f.title}
                    className="flex gap-4 py-4 border-b border-ink/10 last:border-0"
                  >
                    <span className="font-heading text-lg text-brand/40 w-7 shrink-0 leading-tight">
                      {arNum(i + 1)}
                    </span>
                    <div>
                      <h4 className="font-black text-ink text-sm mb-1">
                        {f.title}
                      </h4>
                      <p className="text-ink/60 text-sm leading-relaxed">
                        {f.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}