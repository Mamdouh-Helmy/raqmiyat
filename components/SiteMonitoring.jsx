// components/SiteMonitoring.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";

export default function SiteMonitoring({ images, locations }) {
  const [active, setActive] = useState(0);

  return (
    <section className="container-x section">
      <div className="inline-block mb-10">
        <h2 className="text-3xl font-black text-ink">تغطية كاملة لكل موقع</h2>
        <SquiggleUnderline />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-14 items-start">
        <div>
          <p className="text-ink/60 leading-relaxed mb-8 max-w-xs">
            عدسات مثبّتة في كل نقطة حساسة من منشأتك، تنقل الصورة بدقة عالية
            لحظة بلحظة.
          </p>

          <div className="flex flex-col">
            {locations.map((loc, i) => (
              <button
                key={loc}
                onClick={() => setActive(i)}
                className={`flex items-center justify-between text-right py-4 border-b transition-colors ${
                  active === i
                    ? "border-brand"
                    : "border-ink/10 hover:border-ink/30"
                }`}
              >
                <span
                  className={`font-black transition-colors ${
                    active === i ? "text-brand" : "text-ink/50"
                  }`}
                >
                  {loc}
                </span>
                <span
                  className={`text-xs font-mono transition-colors ${
                    active === i ? "text-brand" : "text-ink/25"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative rounded-xl2 overflow-hidden aspect-[16/10]">
          <Image
            key={images[active]}
            src={images[active]}
            alt={locations[active]}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}