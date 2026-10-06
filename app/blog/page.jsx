//app/blog/page.jsx
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCta from "@/components/BlogCta";
import BlogExplorer from "@/components/BlogExplorer";
import { SquiggleUnderline } from "@/components/SquiggleUnderline";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  posts,
  categories,
  formatDate,
  readingMinutes,
  scopeLabel,
  toAr,
} from "@/lib/posts";

const allKeywords = [...new Set(posts.flatMap((p) => p.keywords))];
const latest = posts[0];

export const metadata = {
  title: "المدونة التقنية",
  description:
    "مقالات عملية عن السوق التقني السعودي والعالمي: حماية البيانات والفوترة الإلكترونية والذكاء الاصطناعي وتطوير البرمجيات وكاميرات المراقبة، مكتوبة لأصحاب المنشآت.",
  keywords: allKeywords,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: SITE_NAME,
    title: "المدونة التقنية | رقميات",
    description:
      "مقالات عملية عن السوق التقني السعودي والعالمي، ومكتوبة لمن يريد أن يقرر قبل أن يشتري.",
    url: `${SITE_URL}/blog`,
  },
  twitter: {
    card: "summary",
    title: "المدونة التقنية | رقميات",
    description: "مقالات عملية عن السوق التقني السعودي والعالمي.",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  // بيانات خفيفة للكلاينت (من غير content) عشان الصفحة تفضل سريعة
  const explorerPosts = rest.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    icon: categories.find((c) => c.name === p.category)?.icon,
    scope: p.scope,
    scopeLabel: scopeLabel(p.scope),
    dateLabel: formatDate(p.date),
    minutes: readingMinutes(p),
    keywords: p.keywords,
  }));

  const explorerCategories = categories.map((c) => ({
    ...c,
    count: rest.filter((p) => p.category === c.name).length,
  }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "المدونة التقنية",
      description:
        "مقالات عملية عن السوق التقني السعودي والعالمي وتطوير البرمجيات وأنظمة المراقبة.",
      url: `${SITE_URL}/blog`,
      inLanguage: "ar",
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE_URL}/blog` },
      ],
    },
  ];

  return (
    <main className="bg-paper">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* الهيدر */}
      <section className="container-x pt-10 pb-6 md:pt-14">
        <div className="mb-5 inline-block">
          <h1 className="text-3xl font-black leading-[1.3] text-ink md:text-5xl">
            المدونة التقنية
          </h1>
          <SquiggleUnderline />
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
          نتابع السوق السعودي والاتجاهات العالمية، ونكتب عنها بلغة صاحب المنشأة لا بلغة المبرمج:
          ما الذي تغيّر، وماذا يعني لك، وما الذي تفعله هذا الأسبوع.
        </p>
        <p className="mt-4 text-sm text-ink/45">
          {toAr(posts.length)} مقالات في {toAr(new Set(posts.map((p) => p.category)).size)} مواضيع،
          آخر تحديث {formatDate(latest.updated || latest.date)}
        </p>
      </section>

      <section className="container-x section !pt-6">
        {/* المقال المميز */}
        <article className="relative overflow-hidden rounded-xl2 bg-brand-dark p-8 text-white transition-shadow duration-300 hover:shadow-xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-sand">
                <span>{featured.category}</span>
                <span className="h-3 w-px bg-white/25" />
                <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">
                  {scopeLabel(featured.scope)}
                </span>
                <span className="font-normal text-white/55">
                  {formatDate(featured.date)} · {toAr(readingMinutes(featured))} دقائق قراءة
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-black leading-[1.4] md:text-4xl">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="outline-none before:absolute before:inset-0 focus-visible:underline"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-white/65">
                {featured.description}
              </p>

              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-sand">
                اقرأ المقال
                <ArrowLeft size={16} />
              </span>
            </div>

            {featured.takeaways && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-4 text-sm font-black text-sand">الخلاصة في ثلاث نقاط</h3>
                <ul className="space-y-3">
                  {featured.takeaways.map((t) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed text-white/75">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-sand" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        {/* باقي المقالات مع البحث والتصفية */}
        <div className="mt-14">
          <BlogExplorer posts={explorerPosts} categories={explorerCategories} />
        </div>

        {/* كلمات مفتاحية */}
        <div className="mt-20 border-t border-ink/10 pt-8">
          <h2 className="mb-4 text-sm font-black text-ink/50">المواضيع التي نكتب عنها</h2>
          <ul className="flex flex-wrap gap-2">
            {allKeywords.map((k) => (
              <li
                key={k}
                className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm text-ink/70"
              >
                {k}
              </li>
            ))}
          </ul>
        </div>

        {/* دعوة للتواصل */}
        <div className="mt-16 max-w-md">
          <BlogCta />
        </div>
      </section>

      <Footer />
    </main>
  );
}