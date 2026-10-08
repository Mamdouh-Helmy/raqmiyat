"use client";

// components/FeatureModal.jsx
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { X } from "@phosphor-icons/react";

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * الزرار (children) هو اللي بيفتح الـ modal.
 * لو مفيش children بيتعمل زرار فاضي بيتمدد فوق الكارت كله (لازم الكارت يكون relative).
 * الـ icon بييجي كـ element جاهز من السيرفر عشان يفضل FeatureGrid Server Component.
 */
export default function FeatureModal({
  title,
  text,
  icon,
  details = {},
  className = "",
  children,
}) {
  const { deliverables = [], tech = [], duration } = details;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const nodes = panelRef.current.querySelectorAll(FOCUSABLE);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={children ? undefined : `تفاصيل ${title}`}
        className={className}
      >
        {children}
      </button>

      {/* Portal: الكروت عليها overflow-hidden و transform، فالـ fixed جواها مش هيغطي الشاشة */}
      {mounted &&
        createPortal(
          <MotionConfig reducedMotion="user">
            <AnimatePresence>
              {open && (
                <motion.div
                  key="feature-modal"
                  className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="absolute inset-0 bg-ink/60"
                    onClick={close}
                    aria-hidden="true"
                  />

                  <motion.div
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    initial={{ y: 40, scale: 0.98 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 24, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-t-2xl bg-paper shadow-2xl sm:max-w-3xl sm:rounded-xl2 md:grid md:grid-cols-[17rem_1fr]"
                  >
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      aria-label="إغلاق"
                      className="absolute end-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark md:text-ink/50 md:hover:bg-ink/5 md:hover:text-ink"
                    >
                      <X size={20} weight="bold" />
                    </button>

                    {/* الجانب الغامق: نفس لغة الكارت المميز */}
                    <div className="flex flex-col bg-brand-dark p-6 text-white sm:p-8">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                        {icon}
                      </div>
                      <h2 id={titleId} className="mb-3 pe-10 text-2xl font-black md:pe-0">
                        {title}
                      </h2>
                      <p className="text-sm leading-relaxed text-white/70">{text}</p>

                      {duration && (
                        <dl className="mt-8 border-t border-white/15 pt-5 text-sm md:mt-auto">
                          <dt className="mb-1 text-white/50">مدة التنفيذ التقريبية</dt>
                          <dd className="font-bold">{duration}</dd>
                        </dl>
                      )}
                    </div>

                    <div className="p-6 sm:p-8">
                      {deliverables.length > 0 && (
                        <>
                          <h3 className="mb-3 font-black text-ink">ما ستحصل عليه</h3>
                          <ul className="mb-8 space-y-3">
                            {deliverables.map((d) => (
                              <li
                                key={d}
                                className="flex gap-3 text-sm leading-relaxed text-ink/80"
                              >
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-dark"
                                  aria-hidden="true"
                                />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {tech.length > 0 && (
                        <>
                          <h3 className="mb-2 font-black text-ink">التقنيات التي نعمل بها</h3>
                          <p className="mb-8 text-sm text-ink/60">{tech.join("، ")}</p>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={close}
                        className="rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink/70 transition-colors hover:border-ink/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                      >
                        إغلاق
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionConfig>,
          document.body
        )}
    </>
  );
}