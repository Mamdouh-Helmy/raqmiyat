"use client";

import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";
import { useContactModal } from "./ContactModalProvider";

// شبكة معيّنات السدو للخلفية الزخرفية وراء الصورة
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 3 45 24 24 45 3 24Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.45'/%3E%3C/svg%3E\")";

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
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          {/* تسمية صغيرة بمعيّن */}
          <div className="flex items-center gap-3 mb-6">
            <span className="size-2 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
            <span className="h-px w-10 bg-gradient-to-l from-[#c9a66b] to-transparent" />
          </div>

          <div className="inline-block mb-6">
            <h1 className="text-3xl md:text-5xl font-black leading-[1.3] text-ink">
              {title}
            </h1>
            <SquiggleUnderline />
          </div>

          <p className="text-ink/60 leading-relaxed text-base md:text-lg max-w-lg mb-9">
            {subtitle}
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={handleRequestClick}
              className="btn-primary"
            >
              اطلب استشارة
            </button>

            {/* شريط معيّنات زخرفي */}
            <div className="hidden sm:flex items-center gap-2" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="size-2.5 rotate-45 border border-[#c9a66b]"
                  style={{
                    backgroundColor: i === 0 ? "#c9a66b" : "transparent",
                    opacity: 1 - i * 0.22,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {screenshot && (
          <div className="group relative mx-auto w-full max-w-[560px] lg:max-w-none">
            {/* زخرفة السدو وراء الصورة، بتتلاشى ناحية الحافة */}
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 h-3/4 w-3/4 -z-10"
              style={{
                backgroundImage: lattice,
                backgroundSize: "48px 48px",
                WebkitMaskImage:
                  "linear-gradient(to top right, #000 0%, transparent 85%)",
                maskImage:
                  "linear-gradient(to top right, #000 0%, transparent 85%)",
              }}
            />
            {/* توهّج ذهبي ناعم */}
            <div
              aria-hidden="true"
              className="absolute -top-10 -right-10 -z-10 size-52 rounded-full bg-[#c9a66b]/20 blur-3xl"
            />

            {/* إطار الصورة */}
            <div className="relative rounded-xl2 overflow-hidden min-h-[280px] md:min-h-[400px] bg-brand-dark ring-1 ring-[#c9a66b]/50 shadow-xl">
              <Image
                src={screenshot}
                alt={title}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority
              />
              {/* تدرّج غامق خفيف من تحت */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent"
              />
              {/* خط ذهبي علوي */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b] to-transparent"
              />
            </div>

            {/* معيّنات الأركان */}
            {[
              "-top-1.5 -right-1.5",
              "-top-1.5 -left-1.5",
              "-bottom-1.5 -right-1.5",
              "-bottom-1.5 -left-1.5",
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} size-3 rotate-45 border border-[#c9a66b] bg-paper transition-colors duration-300 group-hover:bg-[#c9a66b]`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}