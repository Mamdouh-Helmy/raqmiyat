// middleware.js
import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { routeSubdomains } from "@/lib/subdomains";

const LOGIN_PATH = "/admin/login";

// كل /admin محمي ما عدا صفحة الدخول نفسها
const isProtected = (pathname) =>
  (pathname === "/admin" || pathname.startsWith("/admin/")) &&
  pathname !== LOGIN_PATH &&
  !pathname.startsWith(`${LOGIN_PATH}/`);

export async function middleware(req) {
  // 1) الـ subdomains الأول: rewrite/redirect حسب الدومين
  const routed = routeSubdomains(req);
  if (routed) return routed;

  // 2) حماية الأدمن (على الموقع الرئيسي بس، لأن أي /admin
  //    على subdomain اتحوّل فوق للموقع الرئيسي)
  if (isProtected(req.nextUrl.pathname)) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = LOGIN_PATH;
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// يستثني: _next والـ api وrobots/sitemap (بيقرأوا الـ host بنفسهم)
// وملفات الأصول الثابتة بامتداداتها. أي حاجة تانية (زي /blog/feed.xml) بتعدّي على routeSubdomains
// ⚠️ الـ api مستثناة هنا، فكل route للأدمن لازم يتحقق بنفسه (requireAdmin).
export const config = {
  matcher: [
    "/((?!_next|api|robots\\.txt$|sitemap\\.xml$|.*\\.(?:webp|png|jpe?g|gif|svg|ico|css|js|map|woff2?|ttf|otf|mp4|webm|pdf|webmanifest)$).*)",
  ],
};