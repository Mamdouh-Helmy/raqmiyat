//app/sitemap.js
import { SITE_URL } from "@/lib/site";
import { posts } from "@/lib/posts";

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/software`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/security`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/works`, changeFrequency: "monthly", priority: 0.5 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}