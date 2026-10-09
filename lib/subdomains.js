// lib/subdomains.js
// منطق الـ subdomains. بيتنادى من أول الـ middleware.js الحالي (مش بديل عنه).
// بيرجّع Response لو في توجيه لازم يحصل، أو null لو الطلب يكمّل عادي.
import { NextResponse } from "next/server";
import { ORIGINS, SITE_URL, siteKeyFromHost } from "@/lib/site";

// الصفحة الداخلية اللي بتتعرض على جذر كل subdomain
const PAGES = { security: "/security", software: "/software" };

// 308 (دائم) في الإنتاج، و307 في التطوير عشان المتصفح ما يكاشيش التحويل عندك
const STATUS = process.env.NODE_ENV === "production" ? 308 : 307;

export function routeSubdomains(req) {
  const { pathname, search } = req.nextUrl;
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const current = siteKeyFromHost(req.headers.get("host") || "");

  // 1) /security أو /software على أي دومين (حتى على الـ subdomain نفسه)
  //    → الرابط الأساسي هو جذر الـ subdomain. كده مفيش محتوى مكرر ولا روابط قديمة بتضيع.
  for (const [key, page] of Object.entries(PAGES)) {
    if (path === page) {
      return NextResponse.redirect(new URL(`/${search}`, ORIGINS[key]), STATUS);
    }
  }

  // 2) جوه الـ subdomain
  if (current !== "main") {
    // الجذر: بنعرض صفحة القسم (rewrite = الرابط في المتصفح ما بيتغيرش)
    if (path === "/") {
      return NextResponse.rewrite(new URL(PAGES[current], req.url));
    }
    // أي صفحة تانية (/blog, /works, /admin...) تخص الموقع الرئيسي
    return NextResponse.redirect(
      new URL(`${pathname}${search}`, SITE_URL),
      STATUS
    );
  }

  return null;
}