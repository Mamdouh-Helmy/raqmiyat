"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Boxes,
  Camera,
  Gauge,
  Landmark,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";

const ICONS = {
  landmark: Landmark,
  sparkles: Sparkles,
  shield: ShieldCheck,
  camera: Camera,
  boxes: Boxes,
  smartphone: Smartphone,
  gauge: Gauge,
  search: Search,
};

const SCOPES = [
  { value: "all", label: "الكل" },
  { value: "saudi", label: "السوق السعودي" },
  { value: "global", label: "اتجاهات عالمية" },
];

// أرقام عربية عشان تتماشى مع باقي الموقع
const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const chip = (active) =>
  `rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
    active
      ? "border-brand bg-brand text-white"
      : "border-ink/15 bg-white text-ink/70 hover:border-brand hover:text-brand"
  }`;

// posts: [{ slug, title, description, category, icon, scope, scopeLabel, dateLabel, minutes, keywords }]
// categories: [{ name, icon, count }]
export default function BlogExplorer({ posts, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [scope, setScope] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (scope !== "all" && p.scope !== scope) return false;
      if (!q) return true;
      return `${p.title} ${p.description} ${p.keywords.join(" ")}`
        .toLowerCase()
        .includes(q);
    });
  }, [posts, query, category, scope]);

  const hasFilter = query || category !== "all" || scope !== "all";

  function reset() {
    setQuery("");
    setCategory("all");
    setScope("all");
  }

  return (
    <div>
      {/* أدوات التصفية */}
      <div className="space-y-5 border-b border-ink/10 pb-8">
        <div className="relative max-w-xl">
          <Search
            size={18}
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في المقالات: ERP، كاميرات، فاتورة، ذكاء اصطناعي..."
            aria-label="ابحث في المقالات"
            className="w-full rounded-full border border-ink/15 bg-white py-3 pe-5 ps-11 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب النطاق">
          {SCOPES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setScope(s.value)}
              aria-pressed={scope === s.value}
              className={chip(scope === s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب الموضوع">
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={chip(category === "all")}
          >
            كل المواضيع
          </button>
          {categories
            .filter((c) => c.count > 0)
            .map((c) => {
              const Icon = ICONS[c.icon] || Sparkles;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setCategory(c.name)}
                  aria-pressed={category === c.name}
                  className={`${chip(category === c.name)} inline-flex items-center gap-2`}
                >
                  <Icon size={15} />
                  {c.name}
                  <span className="text-xs font-normal opacity-70">{toAr(c.count)}</span>
                </button>
              );
            })}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/50" role="status" aria-live="polite">
        {filtered.length === 0
          ? "لا توجد نتائج"
          : `${toAr(filtered.length)} ${filtered.length === 1 ? "مقال" : "مقالات"}`}
      </p>

      {/* الشبكة */}
      <motion.div layout className="mt-6 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => {
            const Icon = ICONS[p.icon] || Sparkles;
            return (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="group relative border-t-2 border-ink/15 pt-6 transition-colors duration-300 hover:border-sand"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="font-bold text-sand-deep">{p.category}</span>
                      <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-bold text-ink/60">
                        {p.scopeLabel}
                      </span>
                      <span className="text-ink/45">
                        {p.dateLabel} · {toAr(p.minutes)} دقائق
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-black leading-[1.5] text-ink md:text-2xl">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="outline-none before:absolute before:inset-0 focus-visible:underline"
                      >
                        {p.title}
                      </Link>
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink/60">{p.description}</p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
                  اقرأ المقال
                  <ArrowLeft
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </span>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* لا نتائج */}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-xl2 border border-dashed border-ink/20 bg-white p-10 text-center">
          <p className="font-black text-ink">ما لقينا مقالاً بهذه المواصفات</p>
          <p className="mt-2 text-sm text-ink/60">
            جرّب كلمة أبسط، أو ارجع لعرض كل المقالات.
          </p>
          <button type="button" onClick={reset} className="btn-outline mt-6 inline-flex items-center gap-2">
            <X size={15} />
            مسح التصفية
          </button>
        </div>
      )}

      {hasFilter && filtered.length > 0 && (
        <button
          type="button"
          onClick={reset}
          className="mt-10 text-sm font-bold text-brand underline-offset-4 hover:underline"
        >
          مسح التصفية وعرض كل المقالات
        </button>
      )}
    </div>
  );
}