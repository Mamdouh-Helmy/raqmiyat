"use client";

import { useState } from "react";
import Image from "next/image";
import AboutModal from "@/components/AboutModal";

function SquiggleUnderline() {
  return (
    <div
      className="w-full -mt-0.5"
      style={{
        height: "8px",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='8' viewBox='0 0 24 8'%3E%3Cpath d='M0 4 Q6 -1 12 4 T24 4' stroke='%231c3b2e' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 8px",
      }}
    />
  );
}

export default function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <div className="inline-block">
            <h1 className="font-arabic text-5xl md:text-7xl font-black leading-[1.25] text-ink">
              مستقبل البرمجيات
              <br />
              برؤية سعودية
            </h1>
            <SquiggleUnderline />
          </div>

          <p className="text-ink/60 leading-relaxed lg:text-lg mt-8 max-w-md">
            نقدم حلولاً برمجية متطورة وخدمات أمنية متكاملة لدعم التحول الرقمي في
            المملكة.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#contact" className="btn-primary inline-flex items-center justify-center">
              ابدأ الآن
            </a>
            <button className="btn-outline" onClick={() => setAboutOpen(true)}>
              تعرف علينا
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative w-full max-w-[640px] mx-auto aspect-[680/640] bg-brand-dark rounded-xl overflow-hidden">
            <Image
              src="/hero.png"
              alt="أفق الرياض"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </section>
  );
}