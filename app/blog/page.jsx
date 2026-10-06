//app/blog/page.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SquiggleUnderline } from "@/components/SquiggleUnderline";
import { SITE_URL } from "@/lib/site";
import { posts, formatDate, readingMinutes, toAr } from "@/lib/posts";

const allKeywords = [...new Set(posts.flatMap((p) => p.keywords))];

export const metadata = {
  title: "المدونة التقنية",
  description:
    "مقالات عملية عن تطوير البرمجيات وتطبيقات الجوال وأنظمة ERP وكاميرات المراقبة، مكتوبة لأصحاب المنشآت في السعودية.",
  keywords: allKeywords,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "رقميات",
    title: "المدونة التقنية | رقميات",
    description:
      "مقالات عملية عن البرمجيات وتطبيقات الجوال وأنظمة ERP وكاميرات المراقبة.",
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="bg-paper">
      <Navbar />

      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="inline-block mb-5">
          <h1 className="text-3xl md:text-5xl font-black leading-[1.3] text-ink">
            المدونة التقنية
          </h1>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 leading-relaxed text-base md:text-lg max-w-xl">
          مقالات عملية عن البرمجيات والتطبيقات والأنظمة وكاميرات المراقبة،
          نكتبها لمن يريد أن يقرر قبل أن يشتري.
        </p>
      </section>

      <section className="container-x section !pt-6">
        {/* المقال المميز */}
        <article className="relative overflow-hidden rounded-xl2 bg-brand-dark text-white p-8 md:p-12 transition-shadow duration-300 hover:shadow-xl">
          <div className="flex items-center gap-3 text-xs font-bold text-sand">
            <span>{featured.category}</span>
            <span className="h-3 w-px bg-white/25" />
            <span className="text-white/55 font-normal">
              {formatDate(featured.date)} · {toAr(readingMinutes(featured))} دقائق قراءة
            </span>
          </div>

          <h2 className="mt-5 max-w-2xl text-2xl md:text-4xl font-black leading-[1.4]">
            <Link
              href={`/blog/${featured.slug}`}
              className="outline-none before:absolute before:inset-0 focus-visible:underline"
            >
              {featured.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-xl text-white/65 leading-relaxed">{featured.description}</p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <ul className="flex flex-wrap gap-2">
              {featured.keywords.slice(0, 3).map((k) => (
                <li key={k} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75">
                  {k}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-sand">
              اقرأ المقال
              <ArrowLeft size={16} />
            </span>
          </div>
        </article>

        {/* باقي المقالات */}
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {rest.map((p) => (
            <article
              key={p.slug}
              className="group relative border-t-2 border-ink/15 pt-6 transition-colors duration-300 hover:border-sand"
            >
              <div className="flex items-center gap-3 text-xs font-bold text-sand-deep">
                <span>{p.category}</span>
                <span className="font-normal text-ink/45">
                  {formatDate(p.date)} · {toAr(readingMinutes(p))} دقائق
                </span>
              </div>
              <h2 className="mt-4 text-xl md:text-2xl font-black leading-[1.45] text-ink">
                <Link
                  href={`/blog/${p.slug}`}
                  className="outline-none before:absolute before:inset-0 focus-visible:underline"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand">
                اقرأ المقال
                <ArrowLeft
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </span>
            </article>
          ))}
        </div>

        {/* المواضيع */}
        <div className="mt-20 border-t border-ink/10 pt-8">
          <h2 className="mb-4 text-sm font-black text-ink/50">المواضيع التي نكتب عنها</h2>
          <ul className="flex flex-wrap gap-2">
            {allKeywords.map((k) => (
              <li key={k} className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm text-ink/70">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}