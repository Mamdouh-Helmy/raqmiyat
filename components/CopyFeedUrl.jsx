// components/CopyFeedUrl.jsx
"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyFeedUrl({ url }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* المتصفح منع النسخ: المستخدم يقدر ينسخ الرابط يدوياً من الحقل */
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        readOnly
        dir="ltr"
        value={url}
        onFocus={(e) => e.target.select()}
        aria-label="رابط الـ RSS"
        className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white/90 outline-none focus:border-sand"
      />
      <button
        type="button"
        onClick={copy}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-sand px-6 py-3 text-sm font-black text-brand-dark transition-colors hover:bg-white"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "تم النسخ" : "انسخ الرابط"}
      </button>
    </div>
  );
}