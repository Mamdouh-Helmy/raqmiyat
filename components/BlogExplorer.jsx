"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Globe,
  MagnifyingGlass,
  MapPin,
  Stack,
  X,
} from "@phosphor-icons/react/dist/ssr";
import CategoryIcon from "./CategoryIcon";

const PAGE_SIZE = 8;

const SCOPES = [
  { value: "all", label: "الكل", Icon: Stack },
  { value: "saudi", label: "السوق السعودي", Icon: MapPin },
  { value: "global", label: "اتجاهات عالمية", Icon: Globe },
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

const chip = (active) =>
  `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
    active
      ? "border-brand bg-brand text-white"
      : "border-ink/15 bg-white text-ink/70 hover:border-brand hover:text-brand"
  }`;

// posts: [{ slug, title, description, category, icon, scope, scopeLabel, dateLabel, minutes, keywords, keywordsEn }]
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
      <div className="space-y-5 border-b border-ink/10 pb-8">
        <div className="relative max-w-xl">
          <MagnifyingGlass
            size={18}
            weight="bold"
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="ابحث: فاتورة، كاميرات، ذكاء اصطناعي، PDPL، SEO..."
            aria-label="ابحث في المقالات"
            className="w-full rounded-full border border-ink/15 bg-white py-3 pe-5 ps-11 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب النطاق">
          {SCOPES.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => change(setScope)(value)}
              aria-pressed={scope === value}
              className={chip(scope === value)}
            >
              <Icon size={16} weight={scope === value ? "fill" : "duotone"} />
              {label}
              <span className="text-xs font-normal opacity-70">{toAr(scopeCount(value))}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب الموضوع">
          <button
            type="button"
            onClick={() => change(setCategory)("all")}
            aria-pressed={category === "all"}
            className={chip(category === "all")}
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
                className={chip(category === c.name)}
              >
                <CategoryIcon name={c.icon} size={16} weight={category === c.name ? "fill" : "duotone"} />
                {c.name}
                <span className="text-xs font-normal opacity-70">{toAr(c.count)}</span>
              </button>
            ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/50" role="status" aria-live="polite">
        {filtered.length === 0
          ? "لا توجد نتائج"
          : `${toAr(filtered.length)} ${filtered.length === 1 ? "مقال" : filtered.length === 2 ? "مقالان" : "مقالات"}`}
      </p>

      {/* الفهرس: صفوف نصية بدل بطاقات متطابقة */}
      <motion.ol layout className="mt-2 divide-y divide-ink/10">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="group relative grid gap-4 py-7 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <CategoryIcon name={p.icon} size={24} />
              </span>

              <div className="min-w-0 max-w-2xl">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="font-bold text-sand-deep">{p.category}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2.5 py-0.5 font-bold text-ink/60">
                    {p.scope === "saudi" ? <MapPin size={12} weight="fill" /> : <Globe size={12} weight="fill" />}
                    {p.scopeLabel}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-black leading-[1.55] text-ink md:text-2xl">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="outline-none before:absolute before:inset-0 focus-visible:underline"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-ink/50 md:flex-col md:items-end md:gap-3">
                <span>{p.dateLabel}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} />
                  {toAr(p.minutes)} دقائق
                </span>
                <ArrowLeft
                  size={18}
                  weight="bold"
                  className="hidden text-brand transition-transform duration-300 group-hover:-translate-x-1 md:block"
                />
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ol>

      {/* لا نتائج */}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-xl2 border border-dashed border-ink/20 bg-white p-10 text-center">
          <p className="font-black text-ink">ما لقينا مقالاً بهذه المواصفات</p>
          <p className="mt-2 text-sm text-ink/60">جرّب كلمة أبسط، أو ارجع لعرض كل المقالات.</p>
          <button type="button" onClick={reset} className="btn-outline mt-6 inline-flex items-center gap-2">
            <X size={15} weight="bold" />
            مسح التصفية
          </button>
        </div>
      )}

      {filtered.length > visible && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border border-brand px-7 py-3 text-sm font-black text-brand transition-colors hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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