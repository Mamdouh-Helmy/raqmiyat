"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Video,
  BellRing,
  Smartphone,
  CloudUpload,
  Wrench,
  HeadphonesIcon,
} from "lucide-react";
import { SquiggleUnderline } from "./SquiggleUnderline";
import ServiceDetailModal from "./ServiceDetailModal";

// نستقبل اسم الأيقونة كـ string من السيرفر ونحوله هنا للكومبوننت الفعلي
const ICONS = {
  video: Video,
  bell: BellRing,
  smartphone: Smartphone,
  cloud: CloudUpload,
  wrench: Wrench,
  headphones: HeadphonesIcon,
};

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function SecurityServices({ title, subtitle, items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const current =
    selectedIndex === null
      ? null
      : {
          ...items[selectedIndex],
          icon: ICONS[items[selectedIndex].icon] || Video,
        };

  const close = () => setSelectedIndex(null);
  const next = () => setSelectedIndex((i) => (i + 1) % items.length);
  const prev = () =>
    setSelectedIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <section className="container-x section">
      <div className="text-center mb-14">
        <div className="inline-block mb-4">
          <h2 className="text-3xl font-black text-ink">{title}</h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 max-w-lg mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-ink/15">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon] || Video;
          const { title: t, text } = item;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className="group flex items-start gap-5 border-b border-ink/15 px-4 py-8 text-right outline-none transition-colors duration-300 hover:bg-brand-dark focus-visible:bg-brand-dark md:odd:border-l md:px-8"
            >
              <span className="flex w-12 shrink-0 flex-col items-start gap-4">
                <span className="font-heading text-sm leading-none text-sand-deep transition-colors duration-300 group-hover:text-sand group-focus-visible:text-sand">
                  {toAr(String(i + 1).padStart(2, "0"))}
                </span>
                <Icon
                  size={26}
                  className="text-brand transition-colors duration-300 group-hover:text-sand group-focus-visible:text-sand"
                />
              </span>

              <span className="flex-1">
                <span className="block text-xl font-black text-ink mb-2 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                  {t}
                </span>
                <span className="block text-sm leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-white/65 group-focus-visible:text-white/65">
                  {text}
                </span>
              </span>

              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/50 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-sand group-hover:bg-sand group-hover:text-brand-dark group-focus-visible:border-sand group-focus-visible:bg-sand group-focus-visible:text-brand-dark">
                <ArrowLeft size={16} />
              </span>
            </button>
          );
        })}
      </div>

      <ServiceDetailModal
        service={current}
        index={selectedIndex ?? 0}
        total={items.length}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </section>
  );
}