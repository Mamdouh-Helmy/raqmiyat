import Link from "next/link";

export default function PageHero({ eyebrow, title, subtitle, gradient }) {
  return (
    <section className="container-x pt-6 pb-10 md:pt-10 md:pb-14">
      <div className="text-sm text-ink/40 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brand transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-ink/60">{eyebrow}</span>
      </div>
      <div
        className={`relative rounded-xl2 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-white ${gradient}`}
      >
        <span className="inline-block bg-white/10 text-xs font-bold px-4 py-2 rounded-full mb-6">
          {eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-black mb-5 max-w-2xl leading-tight">
          {title}
        </h1>
        <p className="text-white/70 max-w-xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
