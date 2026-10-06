// components/BeforeAfterCompare.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";
import { Moon, Sun } from "lucide-react";

export default function BeforeAfterCompare({ beforeImage, afterImage }) {
  const [position, setPosition] = useState(50);

  return (
    <section className="container-x section">
      <div className="rounded-xl2 bg-brand-dark px-5 py-12 md:px-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              شاهد الفرق بنفسك
            </h2>
            <SquiggleUnderline color="white" />
          </div>
          <p className="text-white/60 max-w-md mx-auto leading-relaxed">
            حرّك الخط لترى كيف تتحول الرؤية العادية إلى وضوح كامل مع تقنية
            الرؤية الليلية الذكية.
          </p>
        </div>

        <div
          dir="ltr"
          className="relative mx-auto max-w-4xl aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl bg-black select-none focus-within:ring-2 focus-within:ring-sand"
        >
          {/* After: الصورة كاملة */}
          <Image
            src={afterImage}
            alt="رؤية ليلية واضحة"
            fill
            className="object-contain"
            draggable={false}
          />

          {/* Before: نفس الصورة متقصوصة بـ clip-path بس */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={beforeImage}
              alt="رؤية عادية"
              fill
              className="object-contain"
              draggable={false}
            />
          </div>

          {/* التسميات: كل واحدة في ناحية صورتها */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <Sun size={13} />
            كاميرا عادية
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-xs font-bold text-brand-dark">
            <Moon size={13} />
            رؤية رقميات الذكية
          </div>

          {/* الخط الفاصل */}
          <div
            className="absolute inset-y-0 w-px bg-sand pointer-events-none"
            style={{ left: `${position}%` }}
          >
            <div className="absolute left-0 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sand shadow-lg">
              <div className="flex gap-1">
                <div className="h-3.5 w-0.5 rounded-full bg-brand-dark/60" />
                <div className="h-3.5 w-0.5 rounded-full bg-brand-dark/60" />
              </div>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            aria-label="قارن بين الرؤية العادية والرؤية الليلية"
          />
        </div>
      </div>
    </section>
  );
}