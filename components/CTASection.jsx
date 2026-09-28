"use client";

import { useContactModal } from "./ContactModalProvider";

export default function CTASection() {
  const { openContactModal } = useContactModal();

  return (
    <section id="cta-section" className="container-x section">
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
            onClick={() => openContactModal("استشارة مجانية")}
            className="border border-white/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
          >
            اطلب استشارة مجانية
          </button>
          <button
            onClick={() => openContactModal("التحدث مع خبير تقني")}
            className="bg-white text-ink px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors"
          >
            تحدث مع خبير تقني
          </button>
        </div>
      </div>
    </section>
  );
}