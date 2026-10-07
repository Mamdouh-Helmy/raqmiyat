//app/blog/feed.xml/route.js
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { posts } from "@/lib/posts";

export const dynamic = "force-static";

const ESC = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" };
const esc = (s) => String(s).replace(/[<>&'"]/g, (c) => ESC[c]);

export function GET() {
  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/blog/${p.slug}`;
      return `
    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.updated || p.date).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)} | المدونة التقنية</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>مقالات عملية عن السوق التقني السعودي والذكاء الاصطناعي والاتجاهات العالمية.</description>
    <language>ar</language>
    <lastBuildDate>${new Date(posts[0].updated || posts[0].date).toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}