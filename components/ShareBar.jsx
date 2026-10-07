"use client";

import { useState } from "react";
import {
  Check,
  LinkSimple,
  LinkedinLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

const btn =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

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
  const link = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-2">
      <span className="me-1 text-xs font-bold text-ink/50">شارك المقال</span>
      <a
        href={`https://wa.me/?text=${text}%20${link}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="شارك عبر واتساب"
        className={btn}
      >
        <WhatsappLogo size={18} weight="fill" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${link}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="شارك عبر X"
        className={btn}
      >
        <XLogo size={16} weight="fill" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${link}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="شارك عبر لينكدإن"
        className={btn}
      >
        <LinkedinLogo size={18} weight="fill" />
      </a>
      <button type="button" onClick={copy} aria-label="انسخ رابط المقال" className={btn}>
        {copied ? <Check size={16} weight="bold" /> : <LinkSimple size={16} weight="bold" />}
      </button>
      <span role="status" className="text-xs font-bold text-brand">
        {copied ? "تم نسخ الرابط" : ""}
      </span>
    </div>
  );
}