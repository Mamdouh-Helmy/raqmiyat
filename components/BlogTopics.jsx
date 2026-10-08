// components/BlogTopics.jsx  (Server Component)
import { toAr } from "@/lib/posts";

function Chip({ children }) {
  return (
    <li className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-bold text-white/85 transition-colors hover:border-sand hover:text-sand">
      {children}
    </li>
  );
}

export default function BlogTopics({ keywords, keywordsEn = [] }) {
  const VISIBLE = 16;
  const shown = keywords.slice(0, VISIBLE);
  const hidden = keywords.slice(VISIBLE);

  return (
    <section
      aria-labelledby="topics-title"
      className="rounded-xl2 bg-brand-dark px-6 py-10 text-white md:px-12 md:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
        <div>
          <h2
            id="topics-title"
            className="font-heading text-3xl font-extrabold leading-[1.25] md:text-4xl"
          >
            المواضيع التي نكتب عنها
          </h2>
          <p className="mt-3 text-sm text-white/55">
            {toAr(keywords.length)} موضوعاً
          </p>
        </div>

        <div>
          <ul className="flex flex-wrap gap-2.5">
            {shown.map((k) => (
              <Chip key={k}>{k}</Chip>
            ))}
          </ul>

          {hidden.length > 0 && (
            <details className="group mt-4">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-sm font-black text-sand [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">
                  عرض {toAr(hidden.length)} موضوعاً إضافياً
                </span>
                <span className="hidden group-open:inline">إخفاء</span>
              </summary>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {hidden.map((k) => (
                  <Chip key={k}>{k}</Chip>
                ))}
              </ul>
            </details>
          )}

          {/* الكلمات الإنجليزي: موجودة في الـ HTML للسيو ومخفية بصرياً */}
          {keywordsEn.length > 0 && (
            <ul dir="ltr" lang="en" aria-hidden="true" className="sr-only">
              {keywordsEn.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}