"use client";

import Image from "next/image";
import { useContactModal } from "./ContactModalProvider";

export default function PageHero({ title, subtitle, screenshot }) {
  const { openContactModal } = useContactModal();

  function handleRequestClick() {
    document
      .getElementById("cta-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    openContactModal("استشارة مجانية");
  }

  return (
    <section className="container-x pt-10 pb-6 md:pt-14 md:pb-10">
      <div
        className={`grid overflow-hidden rounded-xl2 bg-sand text-brand-dark ${
          screenshot ? "lg:grid-cols-2" : ""
        }`}
      >
        {/* النص */}
        <div className="flex flex-col justify-center px-6 py-12 md:px-14 md:py-16">
          <h1 className="font-heading text-3xl font-extrabold leading-[1.3] md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-loose text-brand-dark/75 md:text-lg">
            {subtitle}
          </p>
          <div className="mt-9">
            <button
              type="button"
              onClick={handleRequestClick}
              className="inline-flex items-center justify-center rounded-full bg-brand-dark px-8 py-3.5 text-sm font-black text-white outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
            >
              اطلب استشارة
            </button>
          </div>
        </div>

        {/* الصورة: من الحافة للحافة وبطول اللوح كله */}
        {screenshot && (
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <Image
              src={screenshot}
              alt={title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}