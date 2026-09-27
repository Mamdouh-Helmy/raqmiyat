export default function FeatureGrid({ title, subtitle, items }) {
  return (
    <section className="container-x section">
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl font-black text-ink mb-3">{title}</h2>}
          {subtitle && <p className="text-ink/60 max-w-xl mx-auto">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title: t, text }) => (
          <div key={t} className="card p-8">
            <div className="w-14 h-14 rounded-xl bg-brand-soft flex items-center justify-center mb-6">
              <Icon size={24} className="text-brand" />
            </div>
            <h3 className="font-black text-ink text-lg mb-2">{t}</h3>
            <p className="text-ink/60 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
