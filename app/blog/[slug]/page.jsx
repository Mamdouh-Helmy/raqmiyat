//app/blog/[slug]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  CheckCircle,
  Clock,
  Info,
  ListBullets,
} from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCta from "@/components/BlogCta";
import ReadingProgress from "@/components/ReadingProgress";
import ShareBar from "@/components/ShareBar";
import CategoryIcon from "@/components/CategoryIcon";
import { SquiggleUnderline } from "@/components/SquiggleUnderline";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  posts,
  categories,
  getPost,
  getToc,
  getRelated,
  getAdjacent,
  headingId,
  formatDate,
  readingMinutes,
  wordCount,
  scopeLabel,
  toAr,
} from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  const kw = [...post.keywords, ...(post.keywordsEn || [])];
  return {
    title: post.title,
    description: post.description,
    keywords: kw,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "ar_SA",
      siteName: SITE_NAME,
      url: `${SITE_URL}${path}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      section: post.category,
      authors: [SITE_NAME],
      tags: kw,
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const toc = getToc(post);
  const related = getRelated(post, 3);
  const { newer, older } = getAdjacent(post);
  const modified = post.updated || post.date;
  const catIcon = categories.find((c) => c.name === post.category)?.icon;
  const kwEn = post.keywordsEn || [];

  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    keywords: [...post.keywords, ...kwEn].join("، "),
    articleSection: post.category,
    wordCount: wordCount(post),
    inLanguage: "ar",
    isAccessibleForFree: true,
    datePublished: post.date,
    dateModified: modified,
    image: [`${SITE_URL}/logo.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "المدونة التقنية" },
    about: post.keywords.slice(0, 3).map((k) => ({ "@type": "Thing", name: k })),
    author: publisher,
    publisher,
  };
  if (post.sources?.length) {
    article.citation = post.sources.map((s) => ({
      "@type": "CreativeWork",
      name: s.label,
      url: s.url,
    }));
  }

  const jsonLd = [
    article,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "المدونة", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <main className="bg-paper">
      <ReadingProgress />
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container-x pt-10 pb-6 md:pt-14">
        <nav aria-label="مسار الصفحة" className="mb-8 text-xs text-ink/50">
          <Link href="/blog" className="transition-colors hover:text-brand">
            المدونة
          </Link>
          <span className="mx-2">/</span>
          <span>{post.category}</span>
        </nav>

        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-sand-deep">
            <span className="inline-flex items-center gap-1.5">
              <CategoryIcon name={catIcon} size={16} weight="fill" />
              {post.category}
            </span>
            <span className="rounded-full bg-ink/5 px-3 py-1 text-ink/60">
              {scopeLabel(post.scope)}
            </span>
          </div>

          <div className="mt-5 inline-block">
            <h1 className="text-3xl font-black leading-[1.4] text-ink md:text-5xl">
              {post.title}
            </h1>
            <SquiggleUnderline />
          </div>
          <p className="mt-6 text-lg leading-relaxed text-ink/60">{post.description}</p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-y border-ink/10 py-4">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/55">
              <span>بقلم فريق {SITE_NAME}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {modified !== post.date && (
                <span>
                  حُدّث <time dateTime={modified}>{formatDate(modified)}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock size={14} />
                {toAr(readingMinutes(post))} دقائق قراءة
              </span>
            </p>
            <ShareBar url={url} title={post.title} />
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="min-w-0 max-w-2xl">
            {/* الخلاصة */}
            {post.takeaways && (
              <section
                aria-labelledby="takeaways-title"
                className="mb-10 rounded-xl2 bg-brand-soft p-6 md:p-7"
              >
                <h2 id="takeaways-title" className="mb-4 text-base font-black text-ink">
                  الخلاصة قبل أن تقرأ
                </h2>
                <ul className="space-y-3">
                  {post.takeaways.map((t) => (
                    <li key={t} className="flex gap-3 leading-relaxed text-ink/75">
                      <CheckCircle size={20} weight="fill" className="mt-1 shrink-0 text-brand" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* الفهرس على الجوال */}
            {toc.length > 2 && (
              <details className="group mb-10 rounded-xl border border-ink/10 bg-white lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-black text-ink">
                  <span className="inline-flex items-center gap-2">
                    <ListBullets size={18} weight="bold" className="text-brand" />
                    محتوى المقال
                  </span>
                  <CaretDown
                    size={16}
                    weight="bold"
                    className="text-ink/40 transition-transform group-open:rotate-180"
                  />
                </summary>
                <ol className="space-y-2 border-t border-ink/10 px-5 py-4 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-ink/70 hover:text-brand">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            {/* نص المقال */}
            <div id="post-body">
              {post.content.map((block, i) => {
                if (block.type === "h2") {
                  return (
                    <h2
                      key={i}
                      id={headingId(i)}
                      className="mb-4 mt-12 scroll-mt-24 text-2xl font-black leading-snug text-ink first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul
                      key={i}
                      className="my-5 list-disc space-y-3 ps-6 leading-loose text-ink/70 marker:text-sand"
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "ol") {
                  return (
                    <ol
                      key={i}
                      className="my-5 list-decimal space-y-3 ps-6 leading-loose text-ink/70 marker:font-black marker:text-sand-deep"
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  );
                }
                if (block.type === "callout") {
                  return (
                    <aside
                      key={i}
                      className="my-8 rounded-xl border border-ink/10 border-s-4 border-s-sand bg-white p-5 md:p-6"
                    >
                      <p className="mb-2 flex items-center gap-2 text-sm font-black text-ink">
                        <Info size={18} weight="fill" className="text-sand-deep" />
                        {block.title}
                      </p>
                      <p className="leading-loose text-ink/70">{block.text}</p>
                    </aside>
                  );
                }
                return (
                  <p key={i} className="my-5 text-[17px] leading-loose text-ink/70">
                    {block.text}
                  </p>
                );
              })}
            </div>

            {/* أسئلة شائعة */}
            {post.faq?.length > 0 && (
              <section aria-labelledby="faq-title" className="mt-14">
                <h2 id="faq-title" className="mb-5 text-2xl font-black text-ink">
                  أسئلة شائعة
                </h2>
                <div className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
                  {post.faq.map((f) => (
                    <details key={f.q} className="group px-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-black text-ink">
                        {f.q}
                        <CaretDown
                          size={18}
                          weight="bold"
                          className="shrink-0 text-ink/40 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <p className="pb-5 leading-loose text-ink/70">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* المصادر */}
            {post.sources?.length > 0 && (
              <section aria-labelledby="sources-title" className="mt-14">
                <h2 id="sources-title" className="mb-4 text-lg font-black text-ink">
                  المصادر والمراجع
                </h2>
                <ul className="space-y-3 text-sm">
                  {post.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="group inline-flex items-start gap-2 text-brand underline-offset-4 hover:underline"
                      >
                        <ArrowUpRight size={15} weight="bold" className="mt-0.5 shrink-0" />
                        <span dir="auto">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-10 lg:self-start">
            {toc.length > 2 && (
              <nav aria-label="محتوى المقال" className="hidden lg:block">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-ink/50">
                  <ListBullets size={16} weight="bold" />
                  محتوى المقال
                </h2>
                <ol className="space-y-2 border-s border-ink/10 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ms-px block border-s-2 border-transparent ps-4 text-ink/65 transition-colors hover:border-sand hover:text-ink"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <BlogCta />

            <div>
              <h2 className="mb-3 text-sm font-black text-ink/50">الكلمات المفتاحية</h2>
              <ul className="flex flex-wrap gap-2">
                {post.keywords.map((k) => (
                  <li
                    key={k}
                    className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs text-ink/70"
                  >
                    {k}
                  </li>
                ))}
              </ul>
              {kwEn.length > 0 && (
                <ul dir="ltr" lang="en" className="mt-3 flex flex-wrap gap-2">
                  {kwEn.map((k) => (
                    <li
                      key={k}
                      className="rounded-full border border-ink/10 bg-paper px-3 py-1 text-xs text-ink/55"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </article>

      {/* السابق والتالي */}
      {(newer || older) && (
        <nav
          aria-label="تنقل بين المقالات"
          className="container-x grid grid-cols-1 gap-4 py-10 md:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="group rounded-xl border border-ink/10 bg-white p-5 transition-colors hover:border-sand"
            >
              <span className="flex items-center gap-2 text-xs font-bold text-ink/45">
                <ArrowRight size={14} weight="bold" />
                المقال السابق
              </span>
              <span className="mt-2 block font-black leading-[1.5] text-ink">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="group rounded-xl border border-ink/10 bg-white p-5 text-end transition-colors hover:border-sand"
            >
              <span className="flex items-center justify-end gap-2 text-xs font-bold text-ink/45">
                المقال التالي
                <ArrowLeft size={14} weight="bold" />
              </span>
              <span className="mt-2 block font-black leading-[1.5] text-ink">{newer.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      {/* مقالات ذات صلة */}
      <section className="container-x section">
        <h2 className="mb-6 text-xl font-black text-ink">اقرأ أيضاً</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group border-t-2 border-ink/15 pt-5 transition-colors duration-300 hover:border-sand"
            >
              <span className="text-xs font-bold text-sand-deep">{p.category}</span>
              <span className="mt-2 block text-lg font-black leading-[1.5] text-ink">
                {p.title}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">
                اقرأ المقال
                <ArrowLeft
                  size={15}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}