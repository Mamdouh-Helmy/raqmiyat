"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { validateContactForm, inputClass } from "@/lib/validate";

const info = [
  { icon: MapPin, text: "الرياض، المملكة العربية السعودية" },
  { icon: Phone, text: "+966501053303" },
  { icon: Mail, text: "raqmyat@raqmyat.com" },
];

const emptyForm = { name: "", email: "", phone: "", message: "" };

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

  return (
    <section id="contact" className="container-x section">
      <div className="text-center mb-10">
        <span className="inline-block bg-brand-soft text-ink/70 text-xs font-bold px-4 py-2 rounded-full mb-6">
          تواصل معنا
        </span>
        <h2 className="text-3xl font-black text-ink mb-3">
          نسعد بتواصلك معنا
        </h2>
        <p className="text-ink/60 max-w-xl mx-auto">
          سواء كان لديك سؤال عن خدماتنا أو مشروع تريد مناقشته، فريقنا جاهز
          للرد عليك في أقرب وقت.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
        <div className="rounded-xl2 bg-brand-dark text-white p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black mb-8">معلومات التواصل</h3>
            <ul className="space-y-6">
              {info.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <span className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon size={18} />
                  </span>
                  <span className="text-white/70 leading-relaxed text-sm pt-2">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="relative rounded-xl overflow-hidden min-h-[140px] mt-10 bg-gradient-to-br from-emerald-800 to-brand-dark border border-white/10">
        
          </div> */}
        </div>

        {status === "success" ? (
          <div className="card p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-brand-soft text-brand flex items-center justify-center mb-5 text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-black text-ink mb-2">
              تم إرسال رسالتك بنجاح
            </h3>
            <p className="text-ink/60 text-sm mb-6">
              سنتواصل معك في أقرب وقت ممكن.
            </p>
            <button onClick={() => setStatus("idle")} className="btn-outline">
              إرسال رسالة أخرى
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="card p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="mt-4">
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

            <div className="mt-4">
              <textarea
                placeholder="اكتب رسالتك هنا..."
                rows={5}
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
              className="btn-primary mt-6 w-full md:w-auto"
              disabled={status === "loading"}
            >
              {status === "loading" ? "جارِ الإرسال..." : "إرسال الرسالة"}
            </button>
            {status === "error" && (
              <p className="text-red-600 text-sm mt-3">
                حدث خطأ أثناء الإرسال، حاول مرة أخرى.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
