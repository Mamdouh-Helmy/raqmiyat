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
      <div className="text-center mb-10">
        <div className="inline-block mb-4">
          <h2 className="text-3xl font-black text-ink">شاهد الفرق بنفسك</h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 max-w-md mx-auto">
          حرّك الخط لترى كيف تتحول الرؤية العادية إلى وضوح كامل مع تقنية
          الرؤية الليلية الذكية.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div
          dir="ltr"
          className="relative rounded-xl2 overflow-hidden aspect-[4/3] bg-black select-none"
        >
          {/* After — الصورة كاملة زي ما هي، بدون أي فلتر */}
          <Image
            src={afterImage}
            alt="رؤية ليلية واضحة"
            fill
            className="object-contain"
            draggable={false}
          />
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <Moon size={13} />
            رؤية رقميات الذكية
          </div>

          {/* Before — نفس الصورة كاملة زي ما هي، بدون أي فلتر، متقصوصة بـ clip-path بس */}
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
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <Sun size={13} />
              كاميرا عادية
            </div>
          </div>

          {/* الخط الفاصل */}
          <div
            className="absolute inset-y-0 w-0.5 bg-white pointer-events-none"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-3 bg-ink/40 rounded-full" />
                <div className="w-0.5 h-3 bg-ink/40 rounded-full" />
              </div>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            aria-label="قارن بين الرؤية العادية والرؤية الليلية"
          />
        </div>
      </div>
    </section>
  );
}