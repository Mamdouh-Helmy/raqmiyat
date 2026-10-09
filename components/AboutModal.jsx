//components/AboutModal.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Camera, Code2, Globe, Smartphone, Building2, GraduationCap } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "أنظمة المراقبة والحماية",
    text: "تصميم وتركيب وصيانة كاميرات المراقبة وأنظمة التحكم في الدخول وغرف المراقبة المركزية.",
  },
  {
    icon: Code2,
    title: "تطوير البرمجيات",
    text: "برمجيات مخصصة تُبنى حسب احتياج المنشأة وتتكامل مع أنظمتها القائمة.",
  },
  {
    icon: Globe,
    title: "مواقع الويب",
    text: "مواقع ومتاجر إلكترونية سريعة وآمنة ومتوافقة مع محركات البحث.",
  },
  {
    icon: Smartphone,
    title: "تطبيقات الجوال",
    text: "تطبيقات iOS وAndroid بتجربة استخدام واضحة وأداء موثوق.",
  },
  {
    icon: Building2,
    title: "أنظمة ERP",
    text: "أنظمة تخطيط موارد المؤسسات لإدارة المالية والمخزون والموارد البشرية والمبيعات.",
  },
  {
    icon: GraduationCap,
    title: "أنظمة LMS",
    text: "منصات إدارة التعلم والتدريب عن بُعد مع الاختبارات والشهادات وتتبع التقدم.",
  },
];

export default function AboutModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
    >
      <div
        className="no-scrollbar relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-xl2 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button
          onClick={onClose}
          aria-label="إغلاق"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-brand-soft text-ink flex items-center justify-center hover:bg-brand/20 transition"
        >
          <X size={18} />
        </button>

        <div className="p-8 md:p-12">
          <span className="inline-block bg-brand-soft text-ink/70 text-xs font-bold px-4 py-2 rounded-full mb-5">
            من نحن
          </span>
          <h2 id="about-title" className="text-2xl md:text-4xl font-black text-ink mb-4">
            رقميات لتقنية المعلومات
          </h2>
          <p className="text-ink/60 leading-relaxed mb-10 max-w-3xl">
            شركة سعودية متخصصة في حلول تقنية المعلومات وأنظمة الأمن والمراقبة.
            نجمع بين الخبرة الهندسية في أنظمة الكاميرات والحماية، والخبرة
            البرمجية في بناء الأنظمة والتطبيقات، لنقدم لعملائنا حلاً متكاملاً
            من مصدر واحد، من التصميم حتى التشغيل والدعم.
          </p>

          <h3 className="text-lg font-black text-ink mb-4">ماذا نقدم؟</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {services.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-ink/10 p-5">
                <span className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center mb-3">
                  <Icon size={20} />
                </span>
                <h4 className="font-black text-ink mb-1">{title}</h4>
                <p className="text-ink/60 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              onClick={onClose}
              className="btn-primary inline-flex items-center justify-center"
            >
              تواصل معنا
            </Link>
            <button onClick={onClose} className="btn-outline">
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}