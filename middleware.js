// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routeSubdomains } from "@/lib/subdomains";

const LOGIN_PATH = "/admin/login";

// نفس المسارين اللي كان الـ matcher القديم بيحميهم
const PROTECTED = ["/admin/leads", "/admin/admins"];

const isProtected = (pathname) =>
  PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`));

async function isValidSession(token) {
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req) {
  // 1) الـ subdomains الأول: rewrite/redirect حسب الدومين
  const routed = routeSubdomains(req);
  if (routed) return routed;

  // 2) حماية الأدمن (على الموقع الرئيسي بس، لأن أي /admin
  //    على subdomain اتحوّل فوق للموقع الرئيسي)
  if (isProtected(req.nextUrl.pathname)) {
    const token = req.cookies.get("admin_session")?.value;
    if (!(await isValidSession(token))) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = LOGIN_PATH;
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// يستثني: _next والـ api وrobots/sitemap (بيقرأوا الـ host بنفسهم)
// وملفات الأصول الثابتة بامتداداتها. أي حاجة تانية (زي /blog/feed.xml) بتعدّي على routeSubdomains
export const config = {
  matcher: [
    "/((?!_next|api|robots\\.txt$|sitemap\\.xml$|.*\\.(?:webp|png|jpe?g|gif|svg|ico|css|js|map|woff2?|ttf|otf|mp4|webm|pdf|webmanifest)$).*)",
  ],
};