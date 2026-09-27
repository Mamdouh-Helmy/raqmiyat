"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { validateContactForm, inputClass } from "@/lib/validate";

const emptyForm = { name: "", email: "", phone: "", message: "" };

export default function CTASection() {
  const [modal, setModal] = useState(null); // null | "استشارة مجانية" | "التحدث مع خبير تقني"
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") close();
    }
    if (modal) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modal]);

  function open(subject) {
    setModal(subject);
    setForm(emptyForm);
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  function close() {
    setModal(null);
    setStatus("idle");
  }

  function updateField(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validateContactForm(next));
    }
  }

  function blurField(field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateContactForm(form));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validateContactForm(form);
    setErrors(validation);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(validation).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: modal }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="container-x section">
      <div className="rounded-xl2 bg-brand-dark text-white text-center px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          لنبدأ في بناء مشروعك القادم
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-10">
          فريقنا التقني جاهز الآن لتحويل رؤيتك إلى واقع رقمي آمن ومبتكر يواكب
          تطلعاتك.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => open("استشارة مجانية")}
            className="border border-white/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
          >
            اطلب استشارة مجانية
          </button>
          <button
            onClick={() => open("التحدث مع خبير تقني")}
            className="bg-white text-ink px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors"
          >
            تحدث مع خبير تقني
          </button>
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fadeIn"
            onClick={close}
          />

          <div className="relative bg-white rounded-xl2 w-full max-w-md p-8 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={close}
              aria-label="إغلاق"
              className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center text-ink/40 hover:text-ink hover:bg-brand-soft transition-colors"
            >
              <X size={18} />
            </button>

            {status === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-brand-soft text-brand flex items-center justify-center mx-auto mb-5 text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-black text-ink mb-2">
                  تم إرسال طلبك بنجاح
                </h3>
                <p className="text-ink/60 text-sm mb-6">
                  سيتواصل معك فريقنا في أقرب وقت ممكن.
                </p>
                <button onClick={close} className="btn-primary">
                  تمام
                </button>
              </div>
            ) : (
              <>
                <span className="inline-block bg-brand-soft text-brand text-xs font-bold px-4 py-2 rounded-full mb-4">
                  {modal}
                </span>
                <h3 className="text-2xl font-black text-ink mb-2">
                  {modal === "استشارة مجانية"
                    ? "احجز استشارتك المجانية"
                    : "تحدث مع أحد خبرائنا"}
                </h3>
                <p className="text-ink/50 text-sm mb-6">
                  املأ بياناتك وسنعاود التواصل معك خلال 24 ساعة.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  <div>
                    <input
                      placeholder="الاسم الكامل"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      onBlur={() => blurField("name")}
                      className={inputClass(touched.name && errors.name)}
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      onBlur={() => blurField("email")}
                      className={inputClass(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <input
                      placeholder="رقم الهاتف (اختياري)"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      onBlur={() => blurField("phone")}
                      className={inputClass(touched.phone && errors.phone)}
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="أخبرنا عن مشروعك باختصار"
                      rows={3}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      onBlur={() => blurField("message")}
                      className={inputClass(touched.message && errors.message)}
                    />
                    {touched.message && errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "جارِ الإرسال..." : "إرسال الطلب"}
                  </button>
                  {status === "error" && (
                    <p className="text-red-600 text-sm text-center">
                      حدث خطأ، حاول مرة أخرى.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
