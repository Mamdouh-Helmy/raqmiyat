"use client";

import { useEffect, useState } from "react";

// شريط تقدم القراءة: بيكبر من اليمين (RTL) على حسب موقعك جوه #post-body
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById("post-body");
    if (!el) return;

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const value = total > 0 ? -rect.top / total : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
    >
      <div
        className="h-full origin-right bg-sand"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}