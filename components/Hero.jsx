"use client";

import { useState } from "react";
import Image from "next/image";
import AboutModal from "@/components/AboutModal";

// شبكة معيّنات السدو للخلفية
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.16'/%3E%3C/svg%3E\")";

// تحت الكلمة الذهبية
const squiggle =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='8' viewBox='0 0 24 8'%3E%3Cpath d='M0 4 Q6 -1 12 4 T24 4' stroke='%23c9a66b' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")";

const outline = { WebkitTextStroke: "1.5px #c9a66b" };

export default function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section className="container-x section">
      <div className="relative isolate overflow-hidden rounded-xl2 bg-brand-dark text-white">
        {/* الخلفية */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: lattice,
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(ellipse at top right, #000 0%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at top right, #000 0%, transparent 70%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-l from-transparent via-[#c9a66b]/80 to-transparent"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* النص */}
          <div className="flex flex-col justify-center px-6 py-12 md:px-14 md:py-20">
            <h1 className="font-arabic text-4xl font-black leading-[1.25] md:text-6xl">
              مستقبل البرمجيات
              <span className="mt-2 block w-fit">
                <span className="block text-transparent" style={outline}>
                  برؤية سعودية
                </span>
                <span
                  aria-hidden="true"
                  className="-mt-1 block h-2 w-full"
                  style={{
                    backgroundImage: squiggle,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "24px 8px",
                  }}
                />
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-loose text-white/65 md:text-lg">
              نقدم حلولاً برمجية متطورة وخدمات أمنية متكاملة لدعم التحول الرقمي في المملكة.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#c9a66b] px-8 py-3.5 text-sm font-black text-brand-dark outline-none transition-all duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
              >
                ابدأ الآن
              </a>
              <button
                type="button"
                onClick={() => setAboutOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold text-white outline-none transition-all duration-300 hover:border-[#c9a66b] hover:text-[#c9a66b] focus-visible:ring-2 focus-visible:ring-[#c9a66b]"
              >
                تعرف علينا
              </button>
            </div>
          </div>

          {/* الصورة: بتملا الخانة كلها (فوق وتحت وعرض)، والخانة بنفس نسبة الصورة فمفيش قص */}
          <div className="relative aspect-[4/3] border-t border-[#c9a66b]/40 lg:aspect-auto lg:min-h-full lg:border-s lg:border-t-0">
            <Image
              src="/hero.png"
              alt="أفق الرياض"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </section>
  );
}