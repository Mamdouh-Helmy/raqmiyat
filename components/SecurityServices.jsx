// components/SecurityServices.jsx
import { ArrowLeft } from "lucide-react";
import { SquiggleUnderline } from "./SquiggleUnderline";

export default function SecurityServices({ title, subtitle, items }) {
  return (
    <section className="container-x section">
      <div className="text-center mb-14">
        <div className="inline-block mb-4">
          <h2 className="text-3xl font-black text-ink">{title}</h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 max-w-lg mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title: t, text }) => (
          <div
            key={t}
            className="group flex gap-4 p-6 rounded-xl2 bg-white border border-ink/5 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:border-brand/20 cursor-default"
          >
            <div className="w-11 h-11 rounded-lg bg-brand-soft text-brand flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
              <Icon size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-ink mb-1.5">{t}</h3>
              <p className="text-ink/60 text-sm leading-relaxed mb-2">{text}</p>
              <span className="inline-flex items-center gap-1 text-brand font-bold text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                اعرف أكتر
                <ArrowLeft size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}