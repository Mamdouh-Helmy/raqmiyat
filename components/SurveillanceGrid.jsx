// components/SurveillanceGrid.jsx
import Image from "next/image";

const feeds = [
  { label: "المدخل الرئيسي", status: "نشط" },
  { label: "موقف السيارات", status: "نشط" },
  { label: "الردهة", status: "نشط" },
  { label: "المخازن", status: "نشط" },
];

export default function SurveillanceGrid({ image }) {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-center">
        <div>
          <h2 className="text-3xl font-black text-ink mb-4">
            مراقبة حية، على مدار الساعة
          </h2>
          <p className="text-ink/60 leading-relaxed mb-6 max-w-md">
            نراقب منشآتك بكاميرات عالية الدقة وتحليل ذكي للأحداث، مع فريق
            بشري يتابع كل تنبيه لحظة بلحظة.
          </p>
          <ul className="space-y-3">
            {feeds.map((f) => (
              <li
                key={f.label}
                className="flex items-center justify-between border-b border-ink/10 pb-3 text-sm"
              >
                <span className="text-ink font-bold">{f.label}</span>
                <span className="flex items-center gap-2 text-ink/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {f.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden aspect-video"
            >
              <Image
                src={image}
                alt="كاميرا مراقبة"
                fill
                className="object-cover"
              />
              <span className="absolute top-2 right-2 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                CAM {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}