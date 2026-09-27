// components/SecurityServices.jsx
export default function SecurityServices({ title, subtitle, items }) {
  return (
    <section className="container-x section">
      <div className="mb-12 max-w-xl">
        <h2 className="text-3xl font-black text-ink mb-4">{title}</h2>
        <p className="text-ink/60">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
        {items.map(({ icon: Icon, title: t, text }, i) => (
          <div
            key={t}
            className={`flex gap-4 py-7 ${
              i < items.length - 2 ? "border-b border-ink/10" : ""
            } ${i % 2 === 0 ? "md:border-l md:pl-10 -ml-px" : "md:pr-0"}`}
          >
            <Icon size={22} className="text-brand shrink-0 mt-1" />
            <div>
              <h3 className="font-black text-ink mb-1.5">{t}</h3>
              <p className="text-ink/60 text-sm leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}