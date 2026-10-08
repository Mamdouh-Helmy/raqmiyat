// components/Hero.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import AboutModal from "@/components/AboutModal";

export default function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <section className="relative isolate flex min-h-svh w-full items-end overflow-hidden bg-brand-dark text-white">
      <Image
        src="/hero.png"
        alt="أفق الرياض"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/* تعتيم من ناحية النص (يمين في RTL) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_left,rgba(10,26,20,0.92)_0%,rgba(10,26,20,0.65)_45%,rgba(10,26,20,0.1)_100%)]"
      />
      {/* تعتيم من فوق عشان الـ Navbar الأبيض يتقري */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-brand-dark/70 to-transparent"
      />
      {/* تعتيم من تحت */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-brand-dark/80 to-transparent"
      />

      <div className="container-x w-full pb-12 pt-36 md:pb-20">
        <h1 className="max-w-2xl font-arabic text-4xl font-black leading-[1.35] md:text-6xl lg:text-7xl lg:leading-[1.3]">
          برمجيات تشتغل،
          <br />
          وكاميرات ما تغفل.
        </h1>

        <p className="mt-6 max-w-lg text-base leading-[2] text-white/75 md:text-lg">
          نبني الأنظمة والتطبيقات ونركّب أنظمة المراقبة، ونتولى التشغيل والدعم
          بعد التسليم.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#c9a66b] px-8 py-3.5 text-sm font-black text-brand-dark outline-none transition-colors duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
          >
            ابدأ مشروعك
          </a>
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold text-white outline-none transition-colors duration-300 hover:bg-white hover:text-brand-dark focus-visible:ring-2 focus-visible:ring-white"
          >
            تعرف علينا
          </button>
        </div>
      </div>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </section>
  );
}