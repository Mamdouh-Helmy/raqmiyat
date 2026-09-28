"use client";

// components/ContactModalProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { validateContactForm, inputClass } from "@/lib/validate";

const emptyForm = { name: "", email: "", phone: "", message: "" };

const ContactModalContext = createContext(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal لازم يتستخدم جوه ContactModalProvider");
  }
  return ctx;
}

function modalTitle(subject) {
  if (subject === "استشارة مجانية") return "احجز استشارتك المجانية";
  if (subject === "مناقشة مشروع") return "ناقش مشروعك معنا";
  if (subject === "فحص أمني") return "اطلب معاينة واستشارة";
  return "تحدث مع أحد خبرائنا";
}

export function ContactModalProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useState(null); // null | "استشارة مجانية" | "مناقشة مشروع" | "فحص أمني" | ...
  const [details, setDetails] = useState([]); // اختيارات الزائر من الـ planner: [{ label, value }]
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // لازم نعرف إننا بقينا على الكلينت عشان نقدر نعمل createPortal لـ document.body بأمان
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // الاستخدام القديم بيشتغل زي ما هو: openContactModal("استشارة مجانية")
  // والجديد: openContactModal("مناقشة مشروع", { details: [{ label, value }] })
  function openContactModal(subject, extra = {}) {
    setModal(subject);
    setDetails(Array.isArray(extra.details) ? extra.details : []);
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
        body: JSON.stringify({ ...form, subject: modal, details }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const modalNode = modal && (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ overflowAnchor: "none" }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fadeIn"
        onClick={close}
      />

      {/* no-scrollbar: التمرير شغال بس الشريط مخفي */}
      <div className="no-scrollbar relative bg-white rounded-xl2 w-full max-w-2xl p-8 md:p-12 shadow-2xl animate-fadeIn max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={close}
          aria-label="إغلاق"
          className="absolute top-5 left-5 w-10 h-10 rounded-full flex items-center justify-center text-ink/40 hover:text-ink hover:bg-brand-soft transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 rounded-full bg-brand-soft text-brand flex items-center justify-center mx-auto mb-6 text-3xl">
              ✓
            </div>
            <h3 className="text-2xl font-black text-ink mb-2">
              تم إرسال طلبك بنجاح
            </h3>
            <p className="text-ink/60 mb-8">
              سيتواصل معك فريقنا في أقرب وقت ممكن.
            </p>
            <button type="button" onClick={close} className="btn-primary">
              تمام
            </button>
          </div>
        ) : (
          <>
            <span className="inline-block bg-brand-soft text-brand text-xs font-bold px-4 py-2 rounded-full mb-4">
              {modal}
            </span>
            <h3 className="text-3xl font-black text-ink mb-2">
              {modalTitle(modal)}
            </h3>
            <p className="text-ink/50 mb-8">
              املأ بياناتك وسنعاود التواصل معك خلال 24 ساعة.
            </p>

            {/* اللي اختاره الزائر في الـ planner، بيتعرض له وبيتبعت معاه */}
            {details.length > 0 && (
              <dl className="mb-6 space-y-3 rounded-xl border border-ink/10 bg-paper p-5">
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <dt className="shrink-0 text-xs font-bold text-ink/50">
                      {d.label}
                    </dt>
                    <dd className="font-bold text-ink text-end">
                      {Array.isArray(d.value) ? d.value.join("، ") : d.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                  placeholder="أخبرنا عن احتياجك باختصار"
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
  );

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      {mounted && modalNode ? createPortal(modalNode, document.body) : null}
    </ContactModalContext.Provider>
  );
}