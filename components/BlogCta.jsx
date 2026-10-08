"use client";

import { useContactModal } from "./ContactModalProvider";

// wide: لوح بعرض الصفحة (صفحة المدونة) — الافتراضي: كارت جانبي (صفحة المقال)
export default function BlogCta({ subject = "استشارة مجانية", wide = false }) {
  const { openContactModal } = useContactModal();

  if (wide) {
    return (
      <div className="flex flex-col gap-6 rounded-xl2 bg-sand px-6 py-10 text-brand-dark md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <div className="max-w-xl">
          <h2 className="font-heading text-2xl font-extrabold leading-snug md:text-4xl">
            عندك مشروع مشابه؟
          </h2>
          <p className="mt-3 leading-loose text-brand-dark/75">
            احجز جلسة استشارة مجانية، ونحدد معك النطاق والمراحل قبل أي التزام.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openContactModal(subject)}
          className="shrink-0 self-start rounded-full bg-brand-dark px-8 py-3.5 text-sm font-black text-white outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-sand md:self-auto"
        >
          احجز استشارة مجانية
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 bg-brand-dark p-6 text-white">
      <p className="mb-2 font-heading text-xl font-extrabold">عندك مشروع مشابه؟</p>
      <p className="mb-5 text-sm leading-loose text-white/65">
        احجز جلسة استشارة مجانية، ونحدد معك النطاق والمراحل قبل أي التزام.
      </p>
      <button
        type="button"
        onClick={() => openContactModal(subject)}
        className="rounded-full bg-sand px-6 py-3 text-sm font-black text-brand-dark outline-none transition-colors duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
      >
        احجز استشارة مجانية
      </button>
    </div>
  );
}