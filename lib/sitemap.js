// app/sitemap.js
// كل دومين له sitemap بروابطه هو بس (جوجل بيتجاهل روابط دومين تاني جوه sitemap)
import { headers } from "next/headers";
import { SITE_URL, SECURITY_URL, SOFTWARE_URL, siteKeyFromHost } from "@/lib/site";
import { posts } from "@/lib/posts";

export default async function sitemap() {
  const key = siteKeyFromHost((await headers()).get("host") || "");

  if (key === "security") {
    return [{ url: SECURITY_URL, changeFrequency: "monthly", priority: 1 }];
  }
  if (key === "software") {
    return [{ url: SOFTWARE_URL, changeFrequency: "monthly", priority: 1 }];
  }

  // posts مرتبة الأحدث أولاً، فالمدونة بتتحدث بتاريخ آخر مقال
  const latest = posts[0].updated || posts[0].date;

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/works`, changeFrequency: "monthly", priority: 0.5 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updated || p.date,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}