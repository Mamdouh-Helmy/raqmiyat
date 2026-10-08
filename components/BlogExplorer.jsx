"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const PAGE_SIZE = 8;

const SCOPES = [
  { value: "all", label: "الكل" },
  { value: "saudi", label: "السوق السعودي" },
  { value: "global", label: "اتجاهات عالمية" },
];

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

// توحيد الحروف العربية عشان البحث يلقط "فاتوره" و"فاتورة" و"الفوتره" بنفس الطريقة
const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");

const tab = (active) =>
  `border-b-2 pb-1.5 text-base font-bold outline-none transition-colors duration-300 focus-visible:text-brand ${
    active
      ? "border-brand-dark text-ink"
      : "border-transparent text-ink/45 hover:text-ink/80"
  }`;

// posts: [{ slug, title, description, category, scope, scopeLabel, dateLabel, minutes, keywords, keywordsEn }]
// categories: [{ name, icon, count }]
export default function BlogExplorer({ posts, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [scope, setScope] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const index = useMemo(
    () =>
      posts.map((p) => ({
        slug: p.slug,
        text: norm(
          `${p.title} ${p.description} ${p.category} ${p.keywords.join(" ")} ${(p.keywordsEn || []).join(" ")}`
        ),
      })),
    [posts]
  );

  const filtered = useMemo(() => {
    const terms = norm(query).trim().split(/\s+/).filter(Boolean);
    const hits = new Set(
      index.filter((i) => terms.every((t) => i.text.includes(t))).map((i) => i.slug)
    );
    return posts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (scope !== "all" && p.scope !== scope) return false;
      return terms.length === 0 || hits.has(p.slug);
    });
  }, [posts, index, query, category, scope]);

  const scopeCount = (v) => (v === "all" ? posts.length : posts.filter((p) => p.scope === v).length);
  const shown = filtered.slice(0, visible);
  const hasFilter = query || category !== "all" || scope !== "all";

  const change = (setter) => (value) => {
    setter(value);
    setVisible(PAGE_SIZE);
  };

  function reset() {
    setQuery("");
    setCategory("all");
    setScope("all");
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* أدوات التصفية */}
      <div className="space-y-7 pb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="ابحث: فاتورة، كاميرات، ذكاء اصطناعي، PDPL، SEO..."
          aria-label="ابحث في المقالات"
          className="w-full max-w-xl border-0 border-b border-ink/25 bg-transparent py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-ink/40 focus:border-brand-dark"
        />

        <div className="flex flex-wrap gap-x-7 gap-y-3" role="group" aria-label="تصفية حسب النطاق">
          {SCOPES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => change(setScope)(value)}
              aria-pressed={scope === value}
              className={tab(scope === value)}
            >
              {label}
              <span className="ms-2 text-xs font-normal opacity-60">{toAr(scopeCount(value))}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-3" role="group" aria-label="تصفية حسب الموضوع">
          <button
            type="button"
            onClick={() => change(setCategory)("all")}
            aria-pressed={category === "all"}
            className={tab(category === "all")}
          >
            كل المواضيع
          </button>
          {categories
            .filter((c) => c.count > 0)
            .map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => change(setCategory)(c.name)}
                aria-pressed={category === c.name}
                className={tab(category === c.name)}
              >
                {c.name}
                <span className="ms-2 text-xs font-normal opacity-60">{toAr(c.count)}</span>
              </button>
            ))}
        </div>
      </div>

      <p className="mb-2 text-sm text-ink/50" role="status" aria-live="polite">
        {filtered.length === 0
          ? "لا توجد نتائج"
          : `${toAr(filtered.length)} ${filtered.length === 1 ? "مقال" : filtered.length === 2 ? "مقالان" : "مقالات"}`}
      </p>

      {/* الفهرس: صفوف مرقمة */}
      {filtered.length > 0 && (
        <ol className="border-b border-ink/15">
          {shown.map((p, i) => (
            <li
              key={p.slug}
              className="group relative grid animate-fadeIn gap-3 border-t border-ink/15 py-7 md:grid-cols-[3rem_1fr_auto] md:gap-8"
            >
              <span className="text-sm font-bold tabular-nums text-ink/40">
                {toAr(String(i + 1).padStart(2, "0"))}
              </span>

              <div className="min-w-0 max-w-2xl">
                <p className="text-xs">
                  <span className="font-bold text-sand-deep">{p.category}</span>
                  <span className="mx-2 text-ink/30">·</span>
                  <span className="text-ink/55">{p.scopeLabel}</span>
                </p>
                <h3 className="mt-2 text-xl font-black leading-[1.55] text-ink transition-colors duration-300 group-hover:text-brand md:text-2xl">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="outline-none before:absolute before:inset-0 focus-visible:underline"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-ink/50 md:flex-col md:items-end md:gap-2">
                <span>{p.dateLabel}</span>
                <span>{toAr(p.minutes)} دقائق</span>
              </div>
            </li>
          ))}
        </ol>
      )}

      {/* لا نتائج */}
      {filtered.length === 0 && (
        <div className="mt-4 rounded-xl2 bg-sand px-6 py-10 text-brand-dark md:px-12">
          <p className="font-heading text-2xl font-extrabold">ما لقينا مقالاً بهذه المواصفات</p>
          <p className="mt-2 text-brand-dark/75">جرّب كلمة أبسط، أو ارجع لعرض كل المقالات.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-brand-dark px-7 py-3 text-sm font-black text-white outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
          >
            مسح التصفية
          </button>
        </div>
      )}

      {filtered.length > visible && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-brand-dark px-8 py-3 text-sm font-black text-brand-dark outline-none transition-colors duration-300 hover:bg-brand-dark hover:text-white focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
          >
            عرض المزيد ({toAr(filtered.length - visible)} متبقية)
          </button>
        </div>
      )}

      {hasFilter && filtered.length > 0 && (
        <button
          type="button"
          onClick={reset}
          className="mt-8 text-sm font-bold text-brand underline-offset-4 hover:underline"
        >
          مسح التصفية وعرض كل المقالات
        </button>
      )}
    </div>
  );
}