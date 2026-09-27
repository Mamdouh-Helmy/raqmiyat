//lib/validate.js
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d+\-\s()]{7,18}$/;

/**
 * Validates a contact-style form. `phone` can be "optional", "required",
 * or "off" (field not shown at all).
 * Used on both the client (live field errors) and the server (source of truth).
 */
export function validateContactForm(form, { phone = "optional" } = {}) {
  const errors = {};

  if (!form.name || !form.name.trim()) {
    errors.name = "من فضلك أدخل الاسم";
  } else if (form.name.trim().length < 3) {
    errors.name = "الاسم لازم يكون 3 أحرف على الأقل";
  }

  if (!form.email || !form.email.trim()) {
    errors.email = "من فضلك أدخل البريد الإلكتروني";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة";
  }

  if (phone === "required" && (!form.phone || !form.phone.trim())) {
    errors.phone = "من فضلك أدخل رقم الهاتف";
  } else if (form.phone && form.phone.trim() && !PHONE_RE.test(form.phone.trim())) {
    errors.phone = "رقم الهاتف غير صحيح";
  }

  if (!form.message || !form.message.trim()) {
    errors.message = "من فضلك اكتب رسالتك";
  } else if (form.message.trim().length < 10) {
    errors.message = "الرسالة لازم تكون 10 أحرف على الأقل";
  }

  return errors;
}

export const inputClass = (hasError) =>
  `w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors ${
    hasError
      ? "border-red-400 focus:ring-red-200"
      : "border-ink/10 focus:ring-brand/30"
  }`;
