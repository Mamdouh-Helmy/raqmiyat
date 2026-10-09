//app/blog/page.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCta from "@/components/BlogCta";
import BlogExplorer from "@/components/BlogExplorer";
import BlogTopics from "@/components/BlogTopics";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  posts,
  categories,
  formatDate,
  readingMinutes,
  scopeLabel,
  toAr,
} from "@/lib/posts";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const allKeywords = [...new Set(posts.flatMap((p) => p.keywords))];
const allKeywordsEn = [...new Set(posts.flatMap((p) => p.keywordsEn || []))];
const latest = posts[0];

export const metadata = {
  title: "المدونة التقنية: السوق السعودي والذكاء الاصطناعي والابتكار",
  description:
    "مقالات عملية عن السوق التقني السعودي والعالمي: الذكاء الاصطناعي، حماية البيانات والفوترة الإلكترونية، الأمن السيبراني، السيو، وتطوير البرمجيات والتطبيقات، مكتوبة لأصحاب المنشآت.",
  keywords: [...allKeywords, ...allKeywordsEn].slice(0, 40),
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/feed.xml", title: `${SITE_NAME} | المدونة التقنية` }] },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: SITE_NAME,
    title: "المدونة التقنية | رقميات",
    description:
      "مقالات عملية عن السوق التقني السعودي والعالمي والذكاء الاصطناعي، ومكتوبة لمن يريد أن يقرر قبل أن يشتري.",
    url: `${SITE_URL}/blog`,
  },
  twitter: {
    card: "summary",
    title: "المدونة التقنية | رقميات",
    description: "مقالات عملية عن السوق التقني السعودي والذكاء الاصطناعي والاتجاهات العالمية.",
  },
};

function LaneItem({ p }) {
  return (
    <li className="group relative py-5">
      <p className="text-xs text-ink/50">
        <span className="font-bold text-sand-deep">{p.category}</span>
        <span className="mx-2">·</span>
        {toAr(readingMinutes(p))} دقائق
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
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;
  const recent = rest.slice(0, 3);
  const saudi = posts.filter((p) => p.scope === "saudi").slice(0, 4);
  const global = posts.filter((p) => p.scope === "global").slice(0, 4);

  // بيانات خفيفة للكلاينت (من غير content) عشان الصفحة تفضل سريعة
  const explorerPosts = rest.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    scope: p.scope,
    scopeLabel: scopeLabel(p.scope),
    dateLabel: formatDate(p.date),
    minutes: readingMinutes(p),
    keywords: p.keywords,
    keywordsEn: p.keywordsEn || [],
  }));

  const explorerCategories = categories.map((c) => ({
    ...c,
    count: rest.filter((p) => p.category === c.name).length,
  }));

  const topics = new Set(posts.map((p) => p.category)).size;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: "المدونة التقنية",
      alternateName: "Rqmyat Tech Blog",
      description:
        "مقالات عملية عن السوق التقني السعودي والعالمي والذكاء الاصطناعي وتطوير البرمجيات وأنظمة المراقبة.",
      url: `${SITE_URL}/blog`,
      inLanguage: "ar",
      keywords: [...allKeywords, ...allKeywordsEn].join("، "),
      dateModified: latest.updated || latest.date,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        articleSection: p.category,
        keywords: [...p.keywords, ...(p.keywordsEn || [])].join("، "),
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
      <section className="container-x pt-10 pb-8 md:pt-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.2] text-ink md:text-6xl">
            المدونة التقنية
          </h1>
          <p className="max-w-sm leading-loose text-ink/60">
            نتابع السوق السعودي والاتجاهات العالمية والذكاء الاصطناعي، ونكتب عنها بلغة صاحب المنشأة
            لا بلغة المبرمج: ما الذي تغيّر، وماذا يعني لك، وما الذي تفعله هذا الأسبوع.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-4 text-sm text-ink/55">
          <span>
            {toAr(posts.length)} مقالاً في {toAr(topics)} مواضيع
          </span>
          <span>آخر تحديث {formatDate(latest.updated || latest.date)}</span>
          <Link
  href="/blog/rss"
  className="font-bold text-brand underline-offset-4 hover:underline"
>
  اشترك عبر RSS
</Link>
        </div>
      </section>

      <section className="container-x section !pt-2">
        {/* المقال المميز: لوح نصين */}
        <article className="group relative grid overflow-hidden rounded-xl2 lg:grid-cols-[1.4fr_1fr]">
          <div className="bg-brand-dark px-6 py-10 text-white md:px-12 md:py-14">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="font-bold text-sand">{featured.category}</span>
              <span className="text-white/55">{scopeLabel(featured.scope)}</span>
              <span className="text-white/55">{formatDate(featured.date)}</span>
              <span className="text-white/55">{toAr(readingMinutes(featured))} دقائق</span>
            </p>

            <h2 className="mt-6 font-heading text-3xl font-extrabold leading-[1.45] md:text-5xl md:leading-[1.4]">
              <Link
                href={`/blog/${featured.slug}`}
                className="outline-none before:absolute before:inset-0 focus-visible:underline"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-xl leading-loose text-white/65">{featured.description}</p>

            <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-sand transition-all duration-300 group-hover:gap-3">
              اقرأ المقال
              <ArrowLeft size={16} />
            </span>
          </div>

          {featured.takeaways && (
            <div className="bg-sand px-6 py-10 text-brand-dark md:px-10 md:py-14">
              <h3 className="mb-2 text-sm font-black">الخلاصة في ثلاث نقاط</h3>
              <ol className="divide-y divide-brand-dark/25">
                {featured.takeaways.map((t, i) => (
                  <li key={t} className="flex gap-4 py-4">
                    <span className="w-6 shrink-0 font-black tabular-nums">{toAr(i + 1)}</span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </article>

        {/* الأحدث */}
        <div className="mt-16">
          <h2 className="mb-6 font-heading text-2xl font-extrabold text-ink md:text-3xl">وصل حديثاً</h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
            {recent.map((p) => (
              <article
                key={p.slug}
                className="group relative border-t-2 border-ink/15 pt-5 transition-colors duration-300 hover:border-brand-dark"
              >
                <p className="text-xs font-bold text-sand-deep">{p.category}</p>
                <h3 className="mt-3 text-lg font-black leading-[1.6] text-ink">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="outline-none before:absolute before:inset-0 focus-visible:underline"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">
                  {p.description}
                </p>
                <p className="mt-4 text-xs text-ink/45">
                  {formatDate(p.date)} — {toAr(readingMinutes(p))} دقائق قراءة
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* مساران: السعودي والعالمي */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
          <section aria-labelledby="lane-saudi">
            <h2
              id="lane-saudi"
              className="border-b-2 border-brand-dark pb-3 text-lg font-black text-ink"
            >
              من قلب السوق السعودي
            </h2>
            <ul className="divide-y divide-ink/10">
              {saudi.map((p) => (
                <LaneItem key={p.slug} p={p} />
              ))}
            </ul>
          </section>
          <section aria-labelledby="lane-global">
            <h2
              id="lane-global"
              className="border-b-2 border-sand pb-3 text-lg font-black text-ink"
            >
              اتجاهات عالمية وابتكار
            </h2>
            <ul className="divide-y divide-ink/10">
              {global.map((p) => (
                <LaneItem key={p.slug} p={p} />
              ))}
            </ul>
          </section>
        </div>

        {/* كل المقالات */}
        <div id="all" className="mt-20 scroll-mt-24">
          <h2 className="mb-8 font-heading text-3xl font-extrabold text-ink md:text-4xl">كل المقالات</h2>
          <BlogExplorer posts={explorerPosts} categories={explorerCategories} />
        </div>

        {/* دعوة للتواصل */}
        <div className="mt-6">
          <BlogCta wide />
        </div>

        {/* كلمات مفتاحية */}
        <div className="mt-20">
          <BlogTopics keywords={allKeywords} keywordsEn={allKeywordsEn} />
        </div>
      </section>

      <Footer />
    </main>
  );
}