// components/StatsBand.jsx  (لسه Server Component)
import CountUp from "./CountUp";

export default function StatsBand({ stats }) {
  return (
    <section className="container-x section">
      <div className="rounded-xl2 bg-brand-dark text-white px-6 md:px-12 py-12 md:py-14">
        <p className="text-white/45 text-xs font-bold tracking-wide mb-10">
          رقميات في أرقام
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:divide-x md:divide-x-reverse md:divide-white/10">
          {stats.map(({ value, label }) => (
            <div key={label} className="md:px-8 md:first:pr-0">
              <div
                dir="ltr"
                className="font-heading text-5xl md:text-6xl leading-none text-right"
              >
                <CountUp value={value} />
              </div>
              <div className="text-white/55 text-sm mt-3">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}