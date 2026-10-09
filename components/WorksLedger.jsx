"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpLeft,
  Camera,
  ChartBar,
  Cube,
  DeviceMobile,
  Globe,
  PlugsConnected,
} from "@phosphor-icons/react/dist/ssr";
import { useContactModal } from "@/components/ContactModalProvider";
import WorksFilterBar from "@/components/WorksFilterBar";
import { works, workTypes } from "@/lib/works";

const TYPE_ICONS = {
  web: Globe,
  mobile: DeviceMobile,
  security: Camera,
  erp: Cube,
  data: ChartBar,
  integration: PlugsConnected,
};

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
const pad = (n) => toAr(String(n).padStart(2, "0"));

// ارتفاع النافبار بعد النزول (py-3 + محتوى ٣٦px). لو ظهرت فجوة أو تغطية، عدّله
const STICKY_TOP = "top-[3.75rem]";

// ألوان الـ tailwind.config (للـ inline styles)
const SAND = "#c9a66b";
const BRAND = "#1c3b2e";
const BRAND_SOFT = "#eef2ee";

const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.1'/%3E%3C/svg%3E\")";

// حروف مفرغة بسيطة (للأحجام الصغيرة)
const outline = (color = "currentColor", w = "1.4px") => ({
  WebkitTextStroke: `${w} ${color}`,
  WebkitTextFillColor: "transparent",
});

// حروف مفرغة نضيفة: التعبئة بلون الخلفية، والـ stroke بيترسم تحتها،
// فالخطوط الداخلية عند تقاطع الحروف بتختفي. السمك الظاهر = نص القيمة.
const outlineClean = (stroke, fill, w = "3px") => ({
  WebkitTextStroke: `${w} ${stroke}`,
  WebkitTextFillColor: fill,
  paintOrder: "stroke fill",
});

// ───── ظهور مع السكرول ─────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
}

// from: "right" | "left" | "up"
// ملاحظة: translate-x الموجب بيحرّك العنصر لليمين فعلياً (حتى في RTL)
const HIDDEN = {
  right: "translate-x-10 md:translate-x-24",
  left: "-translate-x-10 md:-translate-x-24",
  up: "translate-y-8",
};

function Reveal({ children, className = "", delay = 0, from = "up" }) {
  const [ref, shown] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : `${HIDDEN[from]} opacity-0`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ───── صورة المشروع ─────
// المراقبة على الغلاف الخارجي، والقص على العنصر اللي جواه
// side: الجهة اللي الصورة فيها (بتتكشف منها)
function ProjectImage({ work, Icon, priority, side }) {
  const [ref, shown] = useInView(0.05);
  const [broken, setBroken] = useState(false);
  const showImage = work.image && !broken;

  const hiddenClip = side === "right" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

  return (
    <div ref={ref}>
      <div
        className="group relative aspect-[16/10] overflow-hidden rounded-xl2 bg-brand transition-[clip-path] duration-[1300ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
        style={{ clipPath: shown ? "inset(0 0 0 0)" : hiddenClip }}
      >
        {showImage ? (
          <Image
            src={work.image}
            alt={work.imageAlt || work.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 700px, 100vw"
            onError={() => setBroken(true)}
            className={`object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105 motion-reduce:transition-none ${
              shown ? "scale-100" : "scale-125"
            }`}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sand/60">
            <Icon size={96} weight="thin" />
          </span>
        )}
      </div>
    </div>
  );
}

// ───── مشروع واحد ─────
// الرقم والعنوان دايماً على اليمين. الصورة والمشكلة هما اللي بيتبدّلوا:
// الفردي: الصورة يمين. الزوجي: الصورة شمال.
function Project({ work, index }) {
  const Icon = TYPE_ICONS[work.type] || Globe;
  const typeLabel = workTypes.find((t) => t.value === work.type)?.label;

  const flip = index % 2 === 1;
  const imageSide = flip ? "left" : "right"; // جهة الصورة
  const textSide = flip ? "right" : "left"; // جهة النص

  const meta = [typeLabel, work.sector, work.year ? toAr(work.year) : null].filter(Boolean);

  return (
    <article className="relative border-t-2 border-brand pt-6 md:pt-8">
      {/* شريط رملي قصير فوق الخط (يمين دايماً) */}
      <span
        aria-hidden="true"
        className="absolute -top-[2px] right-0 h-[3px] w-28 bg-sand-deep md:w-40"
      />

      {/* الرقم + العنوان (ثابتين على اليمين) */}
      <Reveal from="right">
        <header className="grid items-end gap-x-10 gap-y-4 md:grid-cols-12">
          <span
            aria-hidden="true"
            className="select-none font-heading text-[7rem] leading-[0.8] tabular-nums text-brand-light md:col-span-4 md:text-[12rem] lg:text-[15rem]"
            style={outlineClean("#3f6650", BRAND_SOFT)}
          >
            {pad(index + 1)}
          </span>

          <div className="md:col-span-8">
            <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-brand/70 md:mb-8">
              <Icon size={18} weight="bold" aria-hidden="true" className="text-sand-deep" />
              {meta.map((m, i) => (
                <span key={m} className="flex items-center gap-3">
                  {i > 0 && <span className="h-3 w-px bg-brand/30" aria-hidden="true" />}
                  {m}
                </span>
              ))}
            </p>
            <h2 className="font-heading text-4xl leading-[1.3] text-brand md:text-6xl lg:text-7xl">
              {work.title}
            </h2>
          </div>
        </header>
      </Reveal>

      {/* الصورة + المشكلة جنبها (هنا التبديل) */}
      <div className="mt-8 grid items-center gap-8 md:mt-12 md:grid-cols-12 md:gap-12">
        <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <ProjectImage work={work} Icon={Icon} priority={index === 0} side={imageSide} />
        </div>

        <Reveal
          from={textSide}
          delay={150}
          className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}
        >
          <h3 className="mb-4 flex items-center gap-3 text-sm font-black text-sand-deep">
            <span className="h-px w-8 bg-sand-deep" aria-hidden="true" />
            المشكلة
          </h3>
          <p className="text-lg leading-loose text-brand/80 md:text-xl">{work.problem}</p>
        </Reveal>
      </div>

      {/* ما بنيناه */}
      {work.built?.length > 0 && (
        <Reveal className="mt-10 md:mt-14">
          <h3 className="mb-4 flex items-center gap-3 text-sm font-black text-sand-deep">
            <span className="h-px w-8 bg-sand-deep" aria-hidden="true" />
            ما بنيناه
          </h3>
          <ol className="group/list grid border-t border-brand/20 md:grid-cols-3 md:gap-x-10">
            {work.built.map((b, j) => (
              <li
                key={b}
                className="group/item border-b border-brand/20 py-5 transition-opacity duration-500 ease-out md:px-2 md:group-hover/list:opacity-35 md:hover:!opacity-100 motion-reduce:transition-none"
              >
                <span
                  aria-hidden="true"
                  className="mb-3 block font-heading text-4xl leading-none tabular-nums text-brand transition-transform duration-500 ease-out group-hover/item:-translate-y-1 motion-reduce:transition-none md:text-5xl"
                  style={outline("currentColor", "1px")}
                >
                  {pad(j + 1)}
                </span>

                {/* شرطة رملية صغيرة بتطول مع الهافر */}
                <span
                  aria-hidden="true"
                  className="mb-4 block h-px w-6 bg-sand-deep transition-[width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/item:w-14 motion-reduce:transition-none"
                />

                <span className="block leading-relaxed text-brand/90 md:text-lg">{b}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      )}

      {/* بعد الإطلاق */}
      {work.outcome && (
        <Reveal className="mt-10 md:mt-14">
          <div className="relative overflow-hidden rounded-xl2 bg-brand px-6 py-10 text-white md:px-14 md:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundImage: lattice, backgroundSize: "56px 56px" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-sand/80 to-transparent"
            />
            <div className="relative grid gap-5 md:grid-cols-12 md:gap-10">
              <h3 className="flex items-center gap-3 text-sm font-black text-sand md:col-span-3">
                <span className="size-2 rotate-45 bg-sand" aria-hidden="true" />
                بعد الإطلاق
              </h3>
              <p className="font-heading text-2xl leading-[1.6] md:col-span-9 md:text-4xl">
                {work.outcome}
              </p>
            </div>
          </div>
        </Reveal>
      )}

      {/* التقنيات */}
      {work.tags?.length > 0 && (
        <Reveal className="mt-8">
          <ul dir="ltr" className="flex flex-wrap gap-x-3 gap-y-2">
            {work.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-brand/30 px-4 py-1.5 text-xs font-bold text-brand transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </article>
  );
}

export default function WorksLedger() {
  const { openContactModal } = useContactModal();
  const [filter, setFilter] = useState("all");
  const listRef = useRef(null);

  const visible = useMemo(
    () => (filter === "all" ? works : works.filter((w) => w.type === filter)),
    [filter]
  );

  // نعرض في الفلتر بس الأنواع اللي فيها أعمال فعلاً
  const types = workTypes
    .map((t) => ({ ...t, count: works.filter((w) => w.type === t.value).length }))
    .filter((t) => t.count > 0);

  // تغيير الفلتر + الرجوع لأول القائمة لو المستخدم نازل تحتها
  function changeFilter(value) {
    setFilter(value);
    const el = listRef.current;
    if (!el || el.getBoundingClientRect().top >= 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  // إحصائيات من البيانات نفسها
  const years = works.map((w) => Number(w.year)).filter(Number.isFinite);
  const minY = years.length ? Math.min(...years) : null;
  const maxY = years.length ? Math.max(...years) : null;
  const stats = [
    { value: pad(works.length), label: "مشروع موثّق" },
    { value: pad(new Set(works.map((w) => w.type)).size), label: "مجال عمل" },
    ...(minY
      ? [{ value: minY === maxY ? toAr(minY) : `${toAr(minY)}–${toAr(maxY)}`, label: "الفترة" }]
      : []),
  ];

  return (
    <>
      {/* الهيدر (النافبار شفاف فوقه عند الصفر) */}
      <section className="relative isolate overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: lattice,
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(ellipse at top right, #000 0%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at top right, #000 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -start-20 -z-10 h-80 w-[32rem] max-w-full rounded-full bg-brand-light/40 blur-3xl"
        />

        <div className="container-x pt-28 pb-10 md:pt-40 md:pb-14">
          {/* العنوان + الوصف */}
          <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <h1 className="font-heading leading-[1.15] md:col-span-8">
              <span className="text-6xl md:text-8xl lg:text-[10rem]">سجل</span>{" "}
              <span
                className="inline-block text-6xl md:text-8xl lg:text-[10rem]"
                style={outlineClean(SAND, BRAND, "3px")}
              >
                أعمالنا
              </span>
            </h1>

            <p className="max-w-sm text-lg leading-loose text-white/70 md:col-span-4 md:justify-self-end md:pb-4">
              نوثّق كل مشروع بعد تسليمه: ما المشكلة التي بدأنا منها، وماذا بنينا، وما الذي تغيّر
              بعد الإطلاق.
            </p>
          </div>

          {/* الأرقام */}
          <dl className="mt-10 grid grid-cols-1 gap-y-5 border-t-2 border-sand/70 pt-6 sm:grid-cols-3 md:mt-14">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline gap-4 sm:border-s sm:border-white/15 sm:ps-8 sm:first:border-s-0 sm:first:ps-0"
              >
                <dd className="order-1 font-heading text-4xl leading-none tabular-nums text-sand md:text-6xl">
                  {s.value}
                </dd>
                <dt className="order-2 text-sm text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WorksFilterBar
        types={types}
        total={works.length}
        filter={filter}
        onChange={changeFilter}
        stickyTop={STICKY_TOP}
      />

      {/* المشاريع: overflow-hidden عشان الزحف الجانبي ما يعملش سكرول أفقي */}
      <section className="overflow-hidden bg-brand-soft">
        <div className="container-x pb-24 pt-10 md:pb-40 md:pt-16">
          <div
            ref={listRef}
            key={filter}
            className="scroll-mt-32 space-y-24 md:space-y-40"
          >
            {visible.map((w, i) => (
              <Project key={w.id} work={w} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* الدعوة */}
      <section className="relative isolate overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: lattice,
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(ellipse at top left, #000 0%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at top left, #000 0%, transparent 70%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-sand/80 to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-40 -end-20 -z-10 h-80 w-[32rem] max-w-full rounded-full bg-brand-light/40 blur-3xl"
        />

        <div className="container-x py-20 md:py-32">
          <h2 className="font-heading leading-[1.15]">
            <span className="block text-5xl md:text-8xl lg:text-9xl">عندك مشكلة</span>
            {/* علامة الاستفهام منفصلة ومليانة عشان تفاصيلها متتاكلش من الـ stroke */}
            <span className="block text-5xl md:text-8xl lg:text-9xl">
              <span style={outlineClean(SAND, BRAND, "3px")}>تشبه إحدى هذه</span>
              <span className="text-sand">؟</span>
            </span>
          </h2>

          <div className="mt-10 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md leading-loose text-white/70">
              احكِ لنا ما يعطّل عملك الآن، ونقترح عليك نقطة بداية واضحة قبل أي التزام.
            </p>
            <button
              type="button"
              onClick={() => openContactModal("مناقشة مشروع")}
              className="group inline-flex items-center justify-center gap-3 self-start rounded-full bg-sand px-10 py-5 text-base font-black text-brand outline-none transition-colors duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
            >
              ناقش مشروعك معنا
              <ArrowUpLeft
                size={20}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}