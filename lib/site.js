// lib/site.js
// مصدر واحد للدومينات واسم الموقع
// في التطوير بنغيّرهم من .env.local (شوف الشرح)، وفي الإنتاج بيستخدم القيم الافتراضية
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rqmyat.sa";
export const SECURITY_URL =
  process.env.NEXT_PUBLIC_SECURITY_URL || "https://security.rqmyat.sa";
export const SOFTWARE_URL =
  process.env.NEXT_PUBLIC_SOFTWARE_URL || "https://software.rqmyat.sa";
export const SITE_NAME = "رقميات";

export const ORIGINS = {
  main: SITE_URL,
  security: SECURITY_URL,
  software: SOFTWARE_URL,
};

// "security.rqmyat.sa" → "security" | "software.localhost:3000" → "software" | غير كده → "main"
export function siteKeyFromHost(host = "") {
  const m = host.toLowerCase().match(/^(security|software)\./);
  return m ? m[1] : "main";
}