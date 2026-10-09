// app/robots.js
import { headers } from "next/headers";
import { ORIGINS, siteKeyFromHost } from "@/lib/site";

export default async function robots() {
  const key = siteKeyFromHost((await headers()).get("host") || "");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ORIGINS[key]}/sitemap.xml`,
  };
}