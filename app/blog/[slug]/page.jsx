//app/blog/%5Bslug%5D/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCta from "@/components/BlogCta";
import { SquiggleUnderline } from "@/components/SquiggleUnderline";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { posts, getPost, formatDate, readingMinutes, toAr } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "ar_SA",
      siteName: SITE_NAME,
      url: `${SITE_URL}${path}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.keywords,
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
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      keywords: post.keywords.join("، "),
      inLanguage: "ar",
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url,
      author: publisher,
      publisher,
    },
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

  return (
    <main className="bg-paper">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container-x pt-10 pb-6 md:pt-14">
        <nav aria-label="مسار الصفحة" className="mb-8 text-xs text-ink/50">
          <Link href="/blog" className="hover:text-brand transition-colors">
            المدونة
          </Link>
          <span className="mx-2">/</span>
          <span>{post.category}</span>
        </nav>

        <header className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs font-bold text-sand-deep">
            <span>{post.category}</span>
            <span className="font-normal text-ink/45">
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {toAr(readingMinutes(post))} دقائق قراءة
            </span>
          </div>
          <div className="mt-5 inline-block">
            <h1 className="text-3xl md:text-5xl font-black leading-[1.4] text-ink">
              {post.title}
            </h1>
            <SquiggleUnderline />
          </div>
          <p className="mt-6 text-lg leading-relaxed text-ink/60">{post.description}</p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="max-w-2xl">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="mt-12 mb-4 text-2xl font-black leading-snug text-ink first:mt-0">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="my-5 list-disc space-y-3 ps-6 leading-loose text-ink/70 marker:text-sand">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="my-5 text-[17px] leading-loose text-ink/70">
                  {block.text}
                </p>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-10 lg:self-start space-y-8">
            <BlogCta />
            <div>
              <h2 className="mb-3 text-sm font-black text-ink/50">الكلمات المفتاحية</h2>
              <ul className="flex flex-wrap gap-2">
                {post.keywords.map((k) => (
                  <li key={k} className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs text-ink/70">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      {/* مقالات أخرى */}
      <section className="container-x section">
        <h2 className="mb-6 text-xl font-black text-ink">اقرأ أيضاً</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group border-t-2 border-ink/15 pt-5 transition-colors duration-300 hover:border-sand"
            >
              <span className="text-xs font-bold text-sand-deep">{p.category}</span>
              <span className="mt-2 block text-lg font-black leading-[1.5] text-ink">{p.title}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand">
                اقرأ المقال
                <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}