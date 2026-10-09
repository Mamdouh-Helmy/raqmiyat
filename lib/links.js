// lib/links.js
import { SITE_URL, SECURITY_URL, SOFTWARE_URL } from "@/lib/site";

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