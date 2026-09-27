import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const LOGIN_PATH = "/admin/login";

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
  const token = req.cookies.get("admin_session")?.value;
  const valid = await isValidSession(token);

  if (!valid) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Protects every page under the dashboard group (/admin/leads, /admin/admins, ...).
// /admin/login stays outside this matcher on purpose, or nobody could reach it.
export const config = {
  matcher: ["/admin/leads/:path*", "/admin/admins/:path*"],
};