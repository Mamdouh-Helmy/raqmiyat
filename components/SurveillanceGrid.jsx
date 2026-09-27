// components/SurveillanceGrid.jsx
import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";

const feeds = [
  { label: "المدخل الرئيسي", time: "08:45:02" },
  { label: "موقف السيارات", time: "08:45:02" },
  { label: "الردهة", time: "08:45:02" },
  { label: "المخازن", time: "08:45:02" },
];

function Feed({ src, label, time, className = "" }) {
  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <Image src={src} alt={label} fill className="object-cover" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-bold text-white/90 tracking-wide">
          REC
        </span>
      </div>

      <div
        dir="ltr"
        className="absolute bottom-3 left-3 text-[10px] font-mono text-white/80 bg-black/40 px-1.5 py-0.5 rounded"
      >
        {time}
      </div>

      <div className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/40 px-2 py-0.5 rounded">
        {label}
      </div>
    </div>
  );
}

export default function SurveillanceGrid({ images }) {
  return (
    <section className="container-x section">
      <div className="mb-10 max-w-lg">
        <div className="inline-block mb-4">
          <h2 className="text-3xl font-black text-ink">
            مراقبة حية، على مدار الساعة
          </h2>
          <SquiggleUnderline />
        </div>
        <p className="text-ink/60 leading-relaxed">
          نراقب منشآتك بكاميرات عالية الدقة وتحليل ذكي للأحداث، مع فريق
          بشري يتابع كل تنبيه لحظة بلحظة.
        </p>
      </div>

      <div className="bg-brand-dark rounded-xl2 p-3 md:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-3 lg:h-[520px]">
          <Feed
            src={images[0]}
            label={feeds[0].label}
            time={feeds[0].time}
            className="aspect-video lg:aspect-auto lg:col-span-2 lg:row-span-3"
          />
          {feeds.slice(1).map((f, i) => (
            <Feed
              key={f.label}
              src={images[i + 1]}
              label={f.label}
              time={f.time}
              className="aspect-video lg:aspect-auto lg:row-span-1"
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 px-2 py-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/70 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {feeds.length} كاميرات متصلة
          </div>
          <span className="text-white/40 text-xs font-mono" dir="ltr">
            تحديث تلقائي كل ٣ ثوانٍ
          </span>
        </div>
      </div>
    </section>
  );
}