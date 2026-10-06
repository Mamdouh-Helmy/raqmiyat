"use client";

import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";
import { useContactModal } from "./ContactModalProvider";

export default function SecurityIntro({ title, subtitle, image }) {
  const { openContactModal } = useContactModal();

  function handleRequestClick() {
    document
      .getElementById("cta-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    openContactModal("استشارة مجانية");
  }

  return (
    <section className="container-x pt-10 pb-6 md:pt-14 md:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] overflow-hidden rounded-xl2 bg-brand-dark">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <div className="inline-block mb-6 self-start">
            <h1 className="text-3xl md:text-[2.75rem] font-black leading-snug text-white">
              {title}
            </h1>
            <SquiggleUnderline color="white" />
          </div>
          <p className="text-white/65 leading-relaxed text-base md:text-lg max-w-md mb-9">
            {subtitle}
          </p>
          <button
            type="button"
            onClick={handleRequestClick}
            className="self-start rounded-xl bg-sand px-7 py-3 text-sm font-black text-brand-dark transition-colors hover:bg-white"
          >
            اطلب استشارة
          </button>
        </div>

        {/* الصورة بإطار كاميرا */}
        <div className="relative min-h-[300px] md:min-h-[460px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
            priority
          />

          <span aria-hidden="true" className="absolute top-5 right-5 size-7 border-t-2 border-r-2 border-sand" />
          <span aria-hidden="true" className="absolute top-5 left-5 size-7 border-t-2 border-l-2 border-sand" />
          <span aria-hidden="true" className="absolute bottom-5 right-5 size-7 border-b-2 border-r-2 border-sand" />
          <span aria-hidden="true" className="absolute bottom-5 left-5 size-7 border-b-2 border-l-2 border-sand" />

          <div className="absolute top-8 right-14 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <span className="size-2 animate-pulse rounded-full bg-red-500" />
            مباشر
          </div>
        </div>
      </div>
    </section>
  );
}