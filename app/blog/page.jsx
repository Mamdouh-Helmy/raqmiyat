//app/blog/page.jsx
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Globe,
  MapPin,
  Rss,
} from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCta from "@/components/BlogCta";
import BlogExplorer from "@/components/BlogExplorer";
import CategoryIcon from "@/components/CategoryIcon";
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
      <div className="flex items-center gap-3 text-xs text-ink/50">
        <span className="font-bold text-sand-deep">{p.category}</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={13} />
          {toAr(readingMinutes(p))} دقائق
        </span>
      </div>
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
    icon: categories.find((c) => c.name === p.category)?.icon,
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
        <div className="mb-5 inline-block">
          <h1 className="text-3xl font-black leading-[1.3] text-ink md:text-5xl">
            المدونة التقنية
          </h1>
          <SquiggleUnderline />
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">
          نتابع السوق السعودي والاتجاهات العالمية والذكاء الاصطناعي، ونكتب عنها بلغة صاحب المنشأة
          لا بلغة المبرمج: ما الذي تغيّر، وماذا يعني لك، وما الذي تفعله هذا الأسبوع.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/50">
          <span>
            {toAr(posts.length)} مقالاً في {toAr(topics)} مواضيع
          </span>
          <span>آخر تحديث {formatDate(latest.updated || latest.date)}</span>
          <a
            href="/blog/feed.xml"
            className="inline-flex items-center gap-1.5 font-bold text-brand underline-offset-4 hover:underline"
          >
            <Rss size={15} weight="bold" />
            اشترك عبر RSS
          </a>
        </div>
      </section>

      <section className="container-x section !pt-2">
        {/* المقال المميز: واجهة الصفحة الأولى */}
        <article className="relative overflow-hidden rounded-xl2 bg-brand-dark p-8 text-white md:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -top-28 -start-20 h-72 w-72 rounded-full bg-sand/20 blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-sand">
                <span className="inline-flex items-center gap-1.5">
                  <CategoryIcon
                    name={categories.find((c) => c.name === featured.category)?.icon}
                    size={16}
                    weight="fill"
                  />
                  {featured.category}
                </span>
                <span className="h-3 w-px bg-white/25" />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-white/80">
                  {featured.scope === "saudi" ? (
                    <MapPin size={13} weight="fill" />
                  ) : (
                    <Globe size={13} weight="fill" />
                  )}
                  {scopeLabel(featured.scope)}
                </span>
                <span className="font-normal text-white/55">{formatDate(featured.date)}</span>
                <span className="inline-flex items-center gap-1 font-normal text-white/55">
                  <Clock size={13} />
                  {toAr(readingMinutes(featured))} دقائق
                </span>
              </div>

              <h2 className="mt-6 font-heading text-3xl leading-[1.5] md:text-5xl md:leading-[1.45]">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="outline-none before:absolute before:inset-0 focus-visible:underline"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/65">{featured.description}</p>

              <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-sand px-6 py-3 text-sm font-black text-brand-dark">
                اقرأ المقال
                <ArrowLeft size={16} weight="bold" />
              </span>
            </div>

            {featured.takeaways && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-sm font-black text-sand">الخلاصة في ثلاث نقاط</h3>
                <ul className="space-y-4">
                  {featured.takeaways.map((t) => (
                    <li key={t} className="flex gap-3 text-sm leading-relaxed text-white/80">
                      <CheckCircle size={19} weight="fill" className="mt-0.5 shrink-0 text-sand" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        {/* الأحدث */}
        <div className="mt-14">
          <h2 className="mb-6 text-xl font-black text-ink">وصل حديثاً</h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
            {recent.map((p) => (
              <article
                key={p.slug}
                className="group relative border-t-2 border-ink/15 pt-5 transition-colors duration-300 hover:border-sand"
              >
                <div className="flex items-center gap-2 text-xs">
                  <CategoryIcon
                    name={categories.find((c) => c.name === p.category)?.icon}
                    size={16}
                    className="text-sand-deep"
                  />
                  <span className="font-bold text-sand-deep">{p.category}</span>
                </div>
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
              className="flex items-center gap-2 border-b-2 border-brand pb-3 text-lg font-black text-ink"
            >
              <MapPin size={20} weight="fill" className="text-brand" />
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
              className="flex items-center gap-2 border-b-2 border-sand pb-3 text-lg font-black text-ink"
            >
              <Globe size={20} weight="fill" className="text-sand-deep" />
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
          <h2 className="mb-6 text-2xl font-black text-ink">كل المقالات</h2>
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
          {allKeywordsEn.length > 0 && (
            <ul dir="ltr" lang="en" className="mt-4 flex flex-wrap gap-2">
              {allKeywordsEn.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-ink/10 bg-paper px-4 py-1.5 text-sm text-ink/55"
                >
                  {k}
                </li>
              ))}
            </ul>
          )}
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