// components/FeatureGrid.jsx  (لسه Server Component — مفيش "use client" هنا)
import { SquiggleUnderline } from "./SquiggleUnderline";
import { ArrowLeft } from "lucide-react";
import FeatureModal from "./FeatureModal";

const accents = [
  { bg: "bg-emerald-50", text: "text-emerald-700", ring: "group-hover:ring-emerald-600" },
  { bg: "bg-sky-50", text: "text-sky-700", ring: "group-hover:ring-sky-600" },
  { bg: "bg-amber-50", text: "text-amber-700", ring: "group-hover:ring-amber-600" },
  { bg: "bg-violet-50", text: "text-violet-700", ring: "group-hover:ring-violet-600" },
  { bg: "bg-rose-50", text: "text-rose-700", ring: "group-hover:ring-rose-600" },
  { bg: "bg-teal-50", text: "text-teal-700", ring: "group-hover:ring-teal-600" },
];

export default function FeatureGrid({ title, subtitle, items }) {
  const [first, ...rest] = items;

  return (
    <section className="container-x section">
      <div className="text-center mb-14">
        <div className="inline-block mb-4">
          <h2 className="text-3xl font-black text-ink">{title}</h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 max-w-lg mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Featured large card */}
        <div className="group relative rounded-xl2 p-9 lg:row-span-2 flex flex-col justify-between overflow-hidden bg-brand-dark text-white transition-all duration-300 hover:shadow-xl">
          <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500" />

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
              <first.icon size={28} />
            </div>
            <span className="text-xs font-bold text-white/50 mb-2 block">
              خدمة مميزة
            </span>
            <h3 className="text-2xl font-black mb-4">{first.title}</h3>
            <p className="text-white/70 leading-relaxed">{first.text}</p>
          </div>

          <FeatureModal
            title={first.title}
            text={first.text}
            details={first.details}
            icon={<first.icon size={24} />}
            className="relative inline-flex items-center gap-2 self-start text-white font-bold text-sm mt-8 group-hover:gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            اعرف أكتر
            <ArrowLeft size={16} />
          </FeatureModal>
        </div>

        {/* Remaining items in a tighter, list-like layout */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map(({ icon: Icon, title: t, text, details }, i) => {
            const accent = accents[(i + 1) % accents.length];
            return (
              <div
                key={t}
                className="group card relative p-6 flex gap-4 items-start ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${accent.bg} ${accent.text} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-black text-ink mb-1.5">{t}</h3>
                  <p className="text-ink/60 text-sm leading-relaxed">{text}</p>
                </div>

                {/* زرار شفاف فوق الكارت كله بيفتح التفاصيل */}
                <FeatureModal
                  title={t}
                  text={text}
                  details={details}
                  icon={<Icon size={24} />}
                  className="absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}