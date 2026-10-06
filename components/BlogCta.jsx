"use client";

import { useContactModal } from "./ContactModalProvider";

export default function BlogCta({ subject = "استشارة مجانية" }) {
  const { openContactModal } = useContactModal();

  return (
    <div className="rounded-xl2 bg-brand-dark p-6 text-white">
      <p className="mb-2 text-lg font-black">عندك مشروع مشابه؟</p>
      <p className="mb-5 text-sm leading-relaxed text-white/65">
        احجز جلسة استشارة مجانية، ونحدد معك النطاق والمراحل قبل أي التزام.
      </p>
      <button
        type="button"
        onClick={() => openContactModal(subject)}
        className="rounded-xl bg-sand px-5 py-2.5 text-sm font-black text-brand-dark transition-colors hover:bg-white"
      >
        احجز استشارة مجانية
      </button>
    </div>
  );
}