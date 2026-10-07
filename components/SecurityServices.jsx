"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Video,
  BellRing,
  Smartphone,
  CloudUpload,
  Wrench,
  HeadphonesIcon,
} from "lucide-react";
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

const PREVIEW_W = 280;
const PREVIEW_H = 350;

export default function SecurityServices({ title, subtitle, items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hovered, setHovered] = useState(null);

  const previewRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const isHovering = hovered !== null;

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

  // الصورة المصغّرة تتبع المؤشر بنعومة (على الماوس فقط)
  useEffect(() => {
    if (!isHovering) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduce ? 1 : 0.16;
    const tick = () => {
      cur.current.x += (target.current.x - cur.current.x) * k;
      cur.current.y += (target.current.y - cur.current.y) * k;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [isHovering]);

  const place = (e) => {
    let x = e.clientX + 36;
    if (x + PREVIEW_W > window.innerWidth - 16) x = e.clientX - PREVIEW_W - 36;
    const y = Math.max(
      16,
      Math.min(e.clientY - PREVIEW_H / 2, window.innerHeight - PREVIEW_H - 16)
    );
    target.current = { x, y };
  };

  return (
    <section className="container-x section">
      <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="font-heading text-4xl font-extrabold leading-tight text-ink md:text-6xl">
          {title}
        </h2>
        <p className="max-w-sm leading-loose text-ink/60">{subtitle}</p>
      </div>

      <div
        className="border-t-2 border-ink"
        onPointerMove={(e) => e.pointerType === "mouse" && place(e)}
        onPointerLeave={() => setHovered(null)}
      >
        {items.map((item, i) => {
          const Icon = ICONS[item.icon] || Video;
          const { title: t, text } = item;
          return (
            <button
              key={t}
              type="button"
              onClick={() => {
                setHovered(null);
                setSelectedIndex(i);
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                place(e);
                if (hovered === null) cur.current = { ...target.current };
                setHovered(i);
              }}
              className="group relative block w-full overflow-hidden border-b border-ink/15 text-start outline-none"
            >
              {/* تعبئة تصعد من أسفل الصف */}
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-brand-dark transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />

              <span className="relative flex items-center gap-5 px-2 py-7 md:gap-10 md:px-8 md:py-10">
                <span className="w-14 shrink-0 font-heading text-4xl leading-none text-ink/15 transition-colors duration-500 group-hover:text-sand group-focus-visible:text-sand md:w-24 md:text-6xl">
                  {toAr(String(i + 1).padStart(2, "0"))}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-3">
                    <Icon
                      size={24}
                      className="shrink-0 text-brand transition-colors duration-500 group-hover:text-sand group-focus-visible:text-sand"
                    />
                    <span className="font-heading text-2xl font-extrabold leading-tight text-ink transition-colors duration-500 group-hover:text-white group-focus-visible:text-white md:text-5xl">
                      {t}
                    </span>
                  </span>
                  <span className="mt-3 block text-sm leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-white/70 group-focus-visible:text-white/70 lg:hidden">
                    {text}
                  </span>
                </span>

                <span className="hidden max-w-xs text-sm leading-loose text-ink/60 transition-colors duration-500 group-hover:text-white/70 group-focus-visible:text-white/70 lg:block">
                  {text}
                </span>

                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 text-ink/60 transition-all duration-500 group-hover:-translate-x-1 group-hover:border-sand group-hover:bg-sand group-hover:text-brand-dark group-focus-visible:border-sand group-focus-visible:bg-sand group-focus-visible:text-brand-dark">
                  <ArrowLeft size={18} />
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* معاينة الصورة التي تتبع المؤشر */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ width: PREVIEW_W, height: PREVIEW_H }}
      >
        <div
          className={`relative h-full w-full -rotate-2 overflow-hidden rounded-xl2 bg-brand-dark shadow-2xl ring-1 ring-sand/60 transition-all duration-300 ${
            isHovering ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {items.map(
            (it, i) =>
              it.image && (
                <Image
                  key={it.title}
                  src={it.image}
                  alt=""
                  fill
                  sizes={`${PREVIEW_W}px`}
                  className={`object-cover transition-opacity duration-300 ${
                    hovered === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              )
          )}
          <span className="absolute inset-3 border border-sand/50" />
        </div>
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