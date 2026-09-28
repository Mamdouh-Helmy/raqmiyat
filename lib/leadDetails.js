// lib/leadDetails.js
// دوال نقية (مفيهاش أي حاجة خاصة بالسيرفر) فينفع تتستخدم في الـ API وفي صفحة الأدمن.

const MAX_ITEMS = 15; // أقصى عدد أسئلة/اختيارات
const MAX_LABEL = 60; // طول نص السؤال
const MAX_VALUES = 10; // أقصى عدد اختيارات في السؤال الواحد
const MAX_VALUE = 200; // طول الاختيار الواحد

/**
 * بيستقبل من الـ client:
 *   [{ label: "نوع المشروع", value: "تطبيق ويب" },
 *    { label: "الميزات", value: ["تسجيل دخول", "لوحة تحكم"] }]
 * وبيرجّع:
 *   [{ label, values: [String] }]
 * أي حاجة مش نص أو فاضية بتتشال. السيرفر هو المرجع، مش الـ client.
 */
export function sanitizeDetails(raw) {
  if (!Array.isArray(raw)) return [];

  const out = [];
  for (const item of raw.slice(0, MAX_ITEMS)) {
    if (!item || typeof item !== "object") continue;

    const label =
      typeof item.label === "string" ? item.label.trim().slice(0, MAX_LABEL) : "";

    const list = Array.isArray(item.value) ? item.value : [item.value];
    const values = list
      .filter((v) => typeof v === "string" || typeof v === "number")
      .map((v) => String(v).trim().slice(0, MAX_VALUE))
      .filter(Boolean)
      .slice(0, MAX_VALUES);

    if (label && values.length) out.push({ label, values });
  }
  return out;
}

/** نص عادي من التفاصيل: "نوع المشروع: تطبيق ويب" سطر لكل سؤال */
export function summarizeDetails(details = []) {
  return details
    .map(({ label, values }) => `${label}: ${values.join("، ")}`)
    .join("\n");
}