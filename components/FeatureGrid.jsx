// components/FeatureGrid.jsx  (لسه Server Component — مفيش "use client" هنا)
import { SquiggleUnderline } from "./SquiggleUnderline";
import { ArrowLeft } from "lucide-react";
import FeatureModal from "./FeatureModal";

// شبكة معيّنات السدو للكارت المميز
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.16'/%3E%3C/svg%3E\")";

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function FeatureGrid({ title, subtitle, items }) {
  const [first, ...rest] = items;

  return (
    <section className="container-x section">
      {/* العنوان */}
      <div className="text-center mb-14 md:mb-16">
        <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a66b]" />
          <span className="size-2 rotate-45 bg-[#c9a66b]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a66b]" />
        </div>

        <div className="inline-block mb-5">
          <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.3]">
            {title}
          </h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 max-w-lg mx-auto leading-relaxed">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* الكارت المميز */}
        <div className="group relative isolate rounded-xl2 p-9 lg:row-span-2 flex flex-col justify-between overflow-hidden bg-brand-dark text-white transition-shadow duration-300 hover:shadow-xl">
          {/* زخرفة السدو */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: lattice,
              backgroundSize: "56px 56px",
              WebkitMaskImage: "linear-gradient(to bottom left, #000 0%, transparent 70%)",
              maskImage: "linear-gradient(to bottom left, #000 0%, transparent 70%)",
            }}
          />
          {/* توهّج ذهبي */}
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -left-16 -z-10 size-64 rounded-full bg-[#c9a66b]/15 blur-3xl transition-transform duration-700 group-hover:scale-125"
          />
          {/* خط ذهبي علوي */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b]/70 to-transparent"
          />

          <div className="relative">
            {/* الأيقونة داخل معيّن */}
            <div className="relative grid place-items-center size-20 mb-8">
              <span className="absolute size-14 rotate-45 rounded-[10px] border border-[#c9a66b]/60 bg-white/5 transition-transform duration-500 group-hover:rotate-[135deg]" />
              <first.icon size={28} className="relative text-[#c9a66b]" />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="size-1.5 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
              <span className="text-xs font-bold tracking-widest text-[#c9a66b]">
                خدمة مميزة
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black mb-4 leading-snug">
              {first.title}
            </h3>
            <p className="text-white/70 leading-relaxed">{first.text}</p>
          </div>

          <FeatureModal
            title={first.title}
            text={first.text}
            details={first.details}
            icon={<first.icon size={24} />}
            className="relative inline-flex items-center gap-2 self-start text-[#c9a66b] font-bold text-sm mt-8 group-hover:gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a66b]"
          >
            اعرف أكتر
            <ArrowLeft size={16} />
          </FeatureModal>
        </div>

        {/* باقي الخدمات */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map(({ icon: Icon, title: t, text, details }, i) => (
            <div
              key={t}
              className="group card relative overflow-hidden p-6 flex gap-4 items-start ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-[#c9a66b]/50"
            >
              {/* خط ذهبي جانبي بينزل عند الـ hover */}
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[#c9a66b] transition-transform duration-500 group-hover:scale-y-100"
              />

              {/* الأيقونة داخل معيّن */}
              <div className="relative grid place-items-center size-14 shrink-0">
                <span className="absolute size-10 rotate-45 rounded-[7px] border border-[#c9a66b]/50 bg-white transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-brand-dark group-hover:bg-brand-dark" />
                <Icon
                  size={20}
                  className="relative text-brand-dark transition-colors duration-300 group-hover:text-[#c9a66b]"
                />
              </div>

              <div className="pt-1">
                <h3 className="font-black text-ink mb-1.5">{t}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{text}</p>
              </div>

              {/* رقم صغير في الركن */}
              <span
                aria-hidden="true"
                className="absolute left-5 top-4 font-heading text-sm leading-none text-[#c9a66b]/50 transition-colors duration-300 group-hover:text-[#c9a66b]"
              >
                {toAr(i + 2)}
              </span>

              {/* زرار شفاف فوق الكارت كله بيفتح التفاصيل */}
              <FeatureModal
                title={t}
                text={text}
                details={details}
                icon={<Icon size={24} />}
                className="absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a66b]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}