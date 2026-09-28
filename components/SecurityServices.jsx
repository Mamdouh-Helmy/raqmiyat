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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon] || Video;
          const { title: t, text } = item;
          return (
            <div
              key={t}
              className="group flex gap-4 p-6 rounded-xl2 bg-white border border-ink/5 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand/20"
            >
              <div className="w-11 h-11 rounded-lg bg-brand-soft text-brand flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-ink mb-1.5">{t}</h3>
                <p className="text-ink/60 text-sm leading-relaxed mb-2">{text}</p>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  className="inline-flex items-center gap-1 text-brand font-bold text-xs hover:gap-2 transition-all duration-200"
                >
                  اعرف أكتر
                  <ArrowLeft size={13} />
                </button>
              </div>
            </div>
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