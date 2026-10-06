// components/StatsBand.jsx  (لسه Server Component)
import CountUp from "./CountUp";

// شبكة معيّنات السدو، خفيفة جداً في الخلفية
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.14'/%3E%3C/svg%3E\")";

export default function StatsBand({ stats }) {
  return (
    <section className="container-x section">
      <div className="relative isolate overflow-hidden rounded-xl2 bg-brand-dark text-white px-6 md:px-12 py-12 md:py-16">
        {/* زخرفة الخلفية: بتتلاشى ناحية اليسار */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-80"
          style={{
            backgroundImage: lattice,
            backgroundSize: "56px 56px",
            WebkitMaskImage: "linear-gradient(to left, #000 0%, transparent 75%)",
            maskImage: "linear-gradient(to left, #000 0%, transparent 75%)",
          }}
        />
        {/* توهّج ذهبي ناعم */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-[#c9a66b]/15 blur-3xl"
        />
        {/* خط ذهبي علوي */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b]/70 to-transparent"
        />

        {/* العنوان */}
        <div className="flex items-center gap-4 mb-12 md:mb-14">
          <span className="size-2 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
          <p className="text-[#c9a66b] text-xs font-bold tracking-widest">
            رقميات في أرقام
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-white/15 to-transparent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:divide-x md:divide-x-reverse md:divide-white/10">
          {stats.map(({ value, label }) => (
            <div key={label} className="group relative md:px-8 md:first:pr-0">
              <div
                dir="ltr"
                className="font-heading text-5xl md:text-6xl leading-none text-right bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent"
              >
                <CountUp value={value} />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-6 bg-[#c9a66b]/60 transition-all duration-500 group-hover:w-14 group-hover:bg-[#c9a66b]" />
                <span className="text-white/60 text-sm transition-colors duration-300 group-hover:text-white">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}