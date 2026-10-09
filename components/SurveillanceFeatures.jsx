// components/SurveillanceFeatures.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

// ratio = عرض الصورة الأصلية / ارتفاعها (من أبعاد الملفات الفعلية)
// ارتفاع الشبكة بيتحسب من نسبة الصورة المفتوحة، فالقناة المفتوحة بتظهر صورتها كاملة من غير قص
const slides = [
  {
    title: "رؤية واضحة ليلاً ونهاراً",
    text: "كاميرات بدقة 4K مزودة بتقنية الرؤية الليلية، تلتقط كل تفصيلة بوضوح تام حتى في الظلام الدامس.",
    tag: "دقة 4K",
    image: "/security/feature-night-vision.webp",
    ratio: 1600 / 900,
  },
  {
    title: "كشف ذكي للحركة والأشخاص",
    text: "تحليل مدعوم بالذكاء الاصطناعي يميّز بين إنسان، سيارة، أو حيوان، ويرسل تنبيهاً فورياً عند أي نشاط غير معتاد.",
    tag: "AI Detection",
    image: "/security/feature-ai-detection.webp",
    ratio: 1600 / 901,
  },
  {
    title: "مراقبة من أي مكان",
    text: "تابع كاميراتك مباشرة من هاتفك أينما كنت، مع إشعارات لحظية وتسجيل مستمر بلا انقطاع.",
    tag: "تطبيق الجوال",
    image: "/security/feature-mobile-app.webp",
    ratio: 1145 / 1374,
  },
  {
    title: "تخزين سحابي آمن",
    text: "نسخ احتياطي تلقائي لكل التسجيلات على السحابة، بحيث لا تفقد أي لقطة حتى لو تعرضت الكاميرا للتلف أو السرقة.",
    tag: "Cloud Backup",
    image: "/security/feature-cloud-storage.webp",
    ratio: 1536 / 1024,
  },
];

const num = (i) => String(i + 1).padStart(2, "0").replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

// قناة واحدة من شاشة الـ DVR الرباعية
function Channel({ slide, index, isActive, onSelect }) {
  return (
    <article
      style={{ "--ar": slide.ratio }}
      className={`relative isolate min-h-0 min-w-0 overflow-hidden bg-brand-dark md:h-auto ${
        isActive ? "" : "h-16"
      }`}
    >
      {/* الصورة: رمادية ومعتمة وهي صغيرة، وبألوانها كاملة وهي الأساسية.
          موبايل: المفتوحة بتاخد نسبة صورتها والشرح بينزل تحتها. ديسكتوب: بتملا القناة */}
      <div
        className={`transition-[filter] duration-700 motion-reduce:transition-none md:absolute md:inset-0 md:[aspect-ratio:auto] ${
          isActive
            ? "relative [aspect-ratio:var(--ar)]"
            : "absolute inset-0 brightness-[0.4] grayscale"
        }`}
      >
        <Image
          src={slide.image}
          alt=""
          fill
          sizes="(min-width: 768px) 75vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className={`absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-700 motion-reduce:transition-none md:block ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* وهي صغيرة: رقم القناة + العنوان */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-5 inset-y-0 flex items-center gap-3 transition-opacity duration-500 motion-reduce:transition-none md:items-end md:pb-4 ${
          isActive ? "opacity-0" : "opacity-100 delay-300"
        }`}
      >
        <span className="font-heading text-xl text-sand">{num(index)}</span>
        <span className="text-sm font-bold leading-snug text-white md:text-base">
          {slide.title}
        </span>
      </div>

      {/* وهي الأساسية: عرض المحتوى ثابت عشان النص ميتحركش وهي بتكبر */}
      <div
        aria-hidden={!isActive}
        className={`relative px-5 py-5 transition-opacity duration-500 motion-reduce:transition-none md:pointer-events-none md:absolute md:bottom-8 md:start-8 md:w-[min(28rem,calc(100%-3rem))] md:p-0 ${
          isActive ? "opacity-100 delay-300" : "hidden opacity-0 md:block"
        }`}
      >
        <p className="mb-3 flex items-center gap-3 text-sm font-bold text-sand">
          <span className="font-heading text-2xl leading-none">{num(index)}</span>
          <span dir="auto">{slide.tag}</span>
        </p>
        <h3 className="font-heading text-2xl font-extrabold leading-snug text-white md:text-4xl md:leading-tight">
          {slide.title}
        </h3>
        <p className="mt-3 text-sm leading-loose text-white/80 md:text-base">{slide.text}</p>
      </div>

      <button
        type="button"
        aria-expanded={isActive}
        aria-label={slide.title}
        onClick={onSelect}
        className={`absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sand ${
          isActive ? "cursor-default" : "cursor-pointer"
        }`}
      />
    </article>
  );
}

export default function SurveillanceFeatures() {
  const [active, setActive] = useState(0);
  const current = slides[active];

  // ارتفاع الشبكة: عرض الشاشة ÷ نسبة الصورة، بحد أدنى ٣٠rem وأقصى ٨٨% من ارتفاع الشاشة
  // (الأقصى مهم للصورة الطولية عشان السيكشن ما يطولش بشكل مبالغ)
  const H = "max(30rem, min(calc(100vw / var(--ratio)), 88svh))";
  // عرض القناة المفتوحة = ٣/٤ الارتفاع × النسبة، فنسبتها = نسبة صورتها بالظبط
  const A = "calc(0.75 * var(--h) * var(--ratio))";
  const B = `calc(100% - ${A} - 2px)`;

  const col = active % 2;
  const row = Math.floor(active / 2);
  const cols = col === 0 ? `${A} ${B}` : `${B} ${A}`;
  const rows = row === 0 ? "3fr 1fr" : "1fr 3fr";

  return (
    <section className="section">
      <div className="container-x">
        <h2 className="mb-8 font-heading text-4xl font-extrabold leading-tight text-ink md:mb-10 md:text-5xl">
          مميزات نظام المراقبة
        </h2>
      </div>

      {/* شاشة DVR رباعية من حافة لحافة: اضغط على أي قناة تكبر */}
      <div
        className="grid grid-cols-1 gap-0.5 bg-ink transition-[grid-template-columns,grid-template-rows,height] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none md:h-[var(--h)] md:[grid-template-columns:var(--c)] md:[grid-template-rows:var(--r)]"
        style={{ "--ratio": current.ratio, "--h": H, "--c": cols, "--r": rows }}
      >
        {slides.map((s, i) => (
          <Channel
            key={s.title}
            slide={s}
            index={i}
            isActive={i === active}
            onSelect={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}