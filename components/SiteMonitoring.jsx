// components/SiteMonitoring.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";

const pad = (n) => String(n + 1).padStart(2, "0");

export default function SiteMonitoring({ images, locations }) {
  const [active, setActive] = useState(0);

  return (
    <section className="container-x section">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
        <div className="inline-block self-start">
          <h2 className="text-3xl font-black text-ink">تغطية كاملة لكل موقع</h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 leading-relaxed max-w-sm">
          عدسات مثبّتة في كل نقطة حساسة من منشأتك، تنقل الصورة بدقة عالية
          لحظة بلحظة.
        </p>
      </div>

      {/* الشاشة الرئيسية */}
      <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-xl2 bg-brand-dark">
        <Image
          key={images[active]}
          src={images[active]}
          alt={locations[active]}
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-cover animate-fadeIn"
        />

        <div className="absolute top-4 right-4 flex items-center gap-3 rounded-full bg-black/55 px-4 py-2 text-xs font-bold text-white backdrop-blur">
          <span dir="ltr" className="font-mono tracking-wider">
            CAM {pad(active)}
          </span>
          <span className="h-3 w-px bg-white/30" />
          <span className="flex items-center gap-1.5">
            <span className="size-2 animate-pulse rounded-full bg-red-500" />
            مباشر
          </span>
        </div>

        <div className="absolute bottom-4 right-4 rounded-xl bg-black/55 px-4 py-2 text-sm font-black text-white backdrop-blur">
          {locations[active]}
        </div>
      </div>

      {/* مصغّرات الكاميرات */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {locations.map((loc, i) => {
          const isActive = i === active;
          return (
            <button
              key={loc}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              className="group text-right outline-none"
            >
              <span
                className={`relative block aspect-[16/10] overflow-hidden rounded-xl transition-all duration-300 ${
                  isActive
                    ? "ring-2 ring-sand ring-offset-2 ring-offset-paper"
                    : "opacity-60 group-hover:opacity-100 group-focus-visible:ring-2 group-focus-visible:ring-sand"
                }`}
              >
                <Image
                  src={images[i]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <span
                  dir="ltr"
                  className="absolute top-2 right-2 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[10px] text-white"
                >
                  {pad(i)}
                </span>
              </span>
              <span
                className={`mt-2 block text-sm font-black transition-colors ${
                  isActive ? "text-ink" : "text-ink/45"
                }`}
              >
                {loc}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}