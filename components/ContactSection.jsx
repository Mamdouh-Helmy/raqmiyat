"use client";

import { useState } from "react";
import { validateContactForm } from "@/lib/validate";

const emptyForm = { name: "", email: "", phone: "", message: "" };

const base =
  "w-full border-0 border-b bg-transparent px-0 py-2.5 text-base text-white outline-none transition-colors duration-300 placeholder:text-white/30";
const fieldClass = (hasError) =>
  `${base} ${hasError ? "border-red-300" : "border-white/25 focus:border-sand"}`;

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-white/55">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

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
        body: JSON.stringify({ ...form, subject: "عام" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(emptyForm);
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const err = (f) => touched[f] && errors[f];

  return (
    <section id="contact" className="container-x section">
      <div className="rounded-xl2 bg-brand-dark px-6 py-10 text-white md:px-12 md:py-12">
        {/* العنوان */}
        <h2 className="max-w-4xl font-heading text-4xl font-extrabold leading-[1.15] md:text-6xl">
          نسعد بتواصلك معنا
        </h2>
        <p className="mt-4 max-w-xl leading-loose text-white/60">
          سواء كان لديك سؤال عن خدماتنا أو مشروع تريد مناقشته، فريقنا جاهز للرد عليك في أقرب وقت.
        </p>

        <div className="mt-8 grid gap-10 border-t border-white/15 pt-8 md:mt-10 md:pt-10 lg:grid-cols-12 lg:gap-14">
          {/* بيانات التواصل */}
          <div className="flex flex-col gap-7 lg:col-span-5">
            <div>
              <p className="mb-2 text-xs font-bold text-white/50">اتصل بنا</p>
              <a
                href="tel:+966501053303"
                dir="ltr"
                className="inline-block text-right text-2xl font-black tabular-nums outline-none transition-colors duration-300 hover:text-sand focus-visible:text-sand md:text-3xl"
              >
                +966 50 105 3303
              </a>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-white/50">راسلنا</p>
              <a
                href="mailto:raqmyat@raqmyat.com"
                dir="ltr"
                className="inline-block break-all text-right text-xl font-black outline-none transition-colors duration-300 hover:text-sand focus-visible:text-sand md:text-2xl"
              >
                raqmyat@raqmyat.com
              </a>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold text-white/50">المقر</p>
              <p className="text-lg font-bold text-white/90">الرياض، المملكة العربية السعودية</p>
            </div>
          </div>

          {/* النموذج */}
          <div className="lg:col-span-7">
            {status === "success" ? (
              <div className="flex h-full flex-col items-start justify-center gap-3">
                <h3 className="font-heading text-3xl font-extrabold text-sand">
                  تم إرسال رسالتك بنجاح
                </h3>
                <p className="leading-loose text-white/65">سنتواصل معك في أقرب وقت ممكن.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold outline-none transition-colors duration-300 hover:border-sand hover:text-sand focus-visible:ring-2 focus-visible:ring-sand"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="الاسم الكامل" error={err("name")}>
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      onBlur={() => blurField("name")}
                      className={fieldClass(err("name"))}
                    />
                  </Field>
                  <Field label="البريد الإلكتروني" error={err("email")}>
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      onBlur={() => blurField("email")}
                      className={`${fieldClass(err("email"))} text-right`}
                    />
                  </Field>
                </div>

                <Field label="رقم الهاتف (اختياري)" error={err("phone")}>
                  <input
                    type="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onBlur={() => blurField("phone")}
                    className={`${fieldClass(err("phone"))} text-right`}
                  />
                </Field>

                <Field label="رسالتك" error={err("message")}>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    onBlur={() => blurField("message")}
                    className={`${fieldClass(err("message"))} resize-none`}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center rounded-full bg-sand px-9 py-3 text-sm font-black text-brand-dark outline-none transition-colors duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
                  >
                    {status === "loading" ? "جارِ الإرسال..." : "إرسال الرسالة"}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-red-300">حدث خطأ أثناء الإرسال، حاول مرة أخرى.</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}