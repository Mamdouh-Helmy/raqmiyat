// lib/links.js
import { SITE_URL, SECURITY_URL, SOFTWARE_URL, ORIGINS } from "@/lib/site";

// لينك لصفحة في الموقع الرئيسي:
// - جوه الموقع الرئيسي: نسبي (تنقل سريع من غير reload)
// - من الـ subdomains: مطلق، لأن "/" هناك هو صفحة القسم مش الرئيسية
export const mainHref = (site, path) =>
  site === "main" ? path : `${SITE_URL}${path}`;

// رابط كل قسم (دايماً مطلق لأنه دومين مستقل)
export const SERVICE_URLS = {
  software: SOFTWARE_URL,
  security: SECURITY_URL,
};

const FAMILY_ORIGINS = Object.values(ORIGINS);

// الـ middleware بيحوّل /security و/software لدومين القسم
const SECTION_ORIGIN_BY_PATH = {
  "/security": ORIGINS.security,
  "/software": ORIGINS.software,
};

/**
 * لو الرابط هيودّي لدومين تاني تابع للموقع بيرجّع رابطه الكامل، غير كده null.
 * (تحميل كامل للصفحة، مش تنقل داخلي)
 */
export function resolveCrossDomainTarget(url, currentOrigin) {
  if (url.origin !== currentOrigin) {
    return FAMILY_ORIGINS.includes(url.origin) ? url.href : null;
  }

  const sectionOrigin = SECTION_ORIGIN_BY_PATH[url.pathname.replace(/\/$/, "")];
  if (!sectionOrigin || sectionOrigin === currentOrigin) return null;

  return new URL(`/${url.search}${url.hash}`, sectionOrigin).href;
}