"use client";

import { useState } from "react";

const link =
  "text-sm font-bold text-ink/60 outline-none transition-colors duration-300 hover:text-brand focus-visible:text-brand focus-visible:underline";

export default function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // لو الكليب بورد مش متاح، مفيش حاجة نعملها
    }
  }

  const text = encodeURIComponent(title);
  const href = encodeURIComponent(url);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="text-xs font-bold text-ink/45">شارك</span>
      <a
        href={`https://wa.me/?text=${text}%20${href}`}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        واتساب
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${href}`}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        لينكدإن
      </a>
      <button type="button" onClick={copy} className={link}>
        {copied ? "تم نسخ الرابط" : "انسخ الرابط"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "تم نسخ الرابط" : ""}
      </span>
    </div>
  );
}