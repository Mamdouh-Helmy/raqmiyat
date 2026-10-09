// app/blog/rss/page.jsx
import Link from "next/link";
import { ArrowLeft, Rss } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyFeedUrl from "@/components/CopyFeedUrl";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { posts, formatDate, toAr } from "@/lib/posts";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const FEED_URL = `${SITE_URL}/blog/feed.xml`;

export const metadata = {
  title: "اشترك في المدونة عبر RSS",
  description:
    "تابع مقالات المدونة التقنية في قارئ RSS المفضل لديك دون الحاجة لزيارة الموقع في كل مرة.",
  alternates: { canonical: "/blog/rss" },
};

const steps = [
  "انسخ رابط الـ RSS من الأعلى.",
  "افتح قارئ RSS الذي تستخدمه (Feedly أو Inoreader أو أي قارئ آخر).",
  "اختر إضافة اشتراك جديد (Add feed) والصق الرابط.",
  "ستصلك المقالات الجديدة تلقائياً بمجرد نشرها.",
];

const faqs = [
  {
    q: "ما هو RSS؟",
    a: "ملف يحتوي على قائمة بآخر مقالات المدونة. قارئ RSS يتابعه عنك ويعرض لك أي مقال جديد في مكان واحد، دون أن تزور الموقع في كل مرة.",
  },
  {
    q: "هل الاشتراك مجاني؟",
    a: "نعم، الاشتراك مجاني ولا يتطلب بريداً إلكترونياً ولا حساباً لدينا. وأغلب قراء RSS الشهيرة لها خطة مجانية.",
  },
  {
    q: "كيف ألغي الاشتراك؟",
    a: "من داخل قارئ RSS نفسه: احذف الاشتراك من قائمة مصادرك، ولا يلزم أي إجراء من جهتنا.",
  },
];

export default function RssPage() {
  const latest = posts.slice(0, 5);

  return (
    <main className="bg-paper">
      <Navbar />

      {/* ───────── الهيدر ───────── */}
      <header className="container-x pt-10 pb-8 md:pt-14">
        <nav aria-label="مسار الصفحة" className="mb-8 text-xs text-ink/50">
          <Link href="/" className="transition-colors hover:text-brand">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="transition-colors hover:text-brand">
            المدونة
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink/70">اشتراك RSS</span>
        </nav>

        <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.3] text-ink md:text-6xl">
          تابع المدونة من قارئك المفضل
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-loose text-ink/60">
          RSS طريقة بسيطة لتصلك مقالات {SITE_NAME} الجديدة في مكان واحد، دون بريد مزعج ودون
          خوارزميات، ودون أن تزور الموقع في كل مرة.
        </p>
      </header>

      <section className="container-x section !pt-4">
        {/* ───────── بطاقة الاشتراك (٢) + الخطوات (١) ───────── */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl2 bg-brand-dark px-6 py-10 text-white md:px-10 md:py-12 lg:col-span-2">
            <span
              aria-hidden="true"
              className="grid h-12 w-12 place-items-center rounded-full bg-sand text-brand-dark"
            >
              <Rss size={22} />
            </span>
            <h2 className="mt-6 font-heading text-2xl font-extrabold md:text-3xl">رابط الاشتراك</h2>
            <p className="mt-3 text-sm leading-loose text-white/60">
              انسخ هذا الرابط والصقه في أي قارئ RSS مثل Feedly أو Inoreader.
            </p>

            <div className="mt-6">
              <CopyFeedUrl url={FEED_URL} />
            </div>
          </div>

          <aside className="rounded-xl2 bg-sand px-6 py-10 text-brand-dark md:px-8 md:py-12">
            <h2 className="text-base font-black">كيف تبدأ؟</h2>
            <ol className="mt-3 divide-y divide-brand-dark/25">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 py-4 leading-relaxed">
                  <span className="w-5 shrink-0 font-heading text-lg font-black tabular-nums">
                    {toAr(i + 1)}
                  </span>
                  <span className="font-medium">{s}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* ───────── آخر ما في الـ feed ───────── */}
        <div className="mt-16">
          <h2 className="mb-6 font-heading text-2xl font-extrabold text-ink md:text-3xl">
            آخر ما في الـ feed
          </h2>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {latest.map((p) => (
              <li key={p.slug} className="group relative py-5">
                <p className="text-xs text-ink/50">
                  <span className="font-bold text-sand-deep">{p.category}</span>
                  <span className="mx-2">·</span>
                  {formatDate(p.date)}
                </p>
                <h3 className="mt-2 text-lg font-black leading-[1.6] text-ink transition-colors group-hover:text-brand">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="outline-none before:absolute before:inset-0 focus-visible:underline"
                  >
                    {p.title}
                  </Link>
                </h3>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-black text-brand transition-all duration-300 hover:gap-3"
            >
              كل المقالات
              <ArrowLeft size={15} aria-hidden="true" />
            </Link>
            <a
              href="/blog/feed.xml"
              className="text-ink/55 underline-offset-4 hover:text-brand hover:underline"
            >
              عرض ملف XML الخام
            </a>
          </div>
        </div>

        {/* ───────── أسئلة شائعة ───────── */}
        <div className="mt-20 max-w-3xl">
          <h2 className="mb-6 font-heading text-2xl font-extrabold text-ink md:text-3xl">
            أسئلة شائعة
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-ink/15 bg-white/60 transition-colors open:border-brand-dark open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-black text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl leading-none text-ink/50 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-6 leading-loose text-ink/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}