"use client";

// components/CountUp.jsx
import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

// "+150" -> { prefix: "+", target: 150, suffix: "" } | "6+" -> { prefix: "", target: 6, suffix: "+" }
// القيم اللي فيها "/" زي "24/7" مش أرقام تتعد، فبتتعرض زي ما هي.
function parse(value) {
  const str = String(value);
  if (str.includes("/")) return null;
  const m = str.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  return {
    prefix: m[1],
    suffix: m[3],
    target: parseFloat(raw.replace(/,/g, "")),
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
    grouped: raw.includes(","),
  };
}

export default function CountUp({ value, duration = 1.8, className = "" }) {
  const parsed = parse(value);
  const target = parsed?.target;
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  // أول render بيعرض الرقم النهائي (للـ SSR وللي مفعّل reduced motion)
  const [n, setN] = useState(target ?? 0);

  useEffect(() => {
    if (target === undefined || reduceMotion || !ref.current) return;

    let controls = null;
    let played = false;

    const play = () => {
      played = true;
      controls = animate(0, target, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: setN,
      });
    };

    // يرجع للصفر بس لما العنصر يخرج من الشاشة تماماً، عشان يشتغل تاني عند الرجوع
    const reset = () => {
      controls?.stop();
      controls = null;
      played = false;
      setN(0);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) reset();
        else if (entry.intersectionRatio >= 0.5 && !played) play();
      },
      { threshold: [0, 0.5] }
    );

    io.observe(ref.current);
    return () => {
      io.disconnect();
      controls?.stop();
    };
  }, [target, reduceMotion, duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  const formatted = n.toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
    useGrouping: parsed.grouped,
  });

  return (
    <>
      <span ref={ref} aria-hidden="true" className={`tabular-nums ${className}`}>
        {parsed.prefix}
        {formatted}
        {parsed.suffix}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}