// components/StatsBand.jsx  (لسه Server Component)
import CountUp from "./CountUp";

export default function StatsBand({ stats }) {
  return (
    // شريط بعرض الصفحة كلها بلون الرمل الصريح: قلب الألوان هو العنصر المميز
    <section className="bg-sand">
      <div className="container-x py-14 md:py-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-0 md:divide-x md:divide-x-reverse md:divide-brand-dark/25">
          {stats.map(({ value, label }) => (
            <div key={label} className="md:px-8 md:first:pr-0">
              <div
                dir="ltr"
                className="text-right font-heading text-6xl font-extrabold leading-none text-brand-dark md:text-7xl lg:text-8xl"
              >
                <CountUp value={value} />
              </div>
              <p className="mt-5 text-base font-bold text-brand-dark/80 md:text-lg">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}