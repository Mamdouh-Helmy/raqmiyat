"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";

const features = [
  "كاميرات عالية الدقة داخلية وخارجية",
  "رؤية ليلية وتسجيل مستمر",
  "مشاهدة مباشرة من الجوال",
  "صيانة وعقود دعم دورية",
];

export default function SecurityBanner() {
  const { openContactModal } = useContactModal();

  return (
    <section className="container-x section">
      <div className="grid overflow-hidden rounded-xl2 bg-sand text-brand-dark lg:grid-cols-2">
        {/* الصورة: من الحافة للحافة وبطول اللوح كله */}
        <div className="relative min-h-[300px] lg:min-h-[480px]">
          <Image
            src="/security.webp"
            alt="غرفة مراقبة بالكاميرات"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* النص */}
        <div className="flex flex-col justify-center px-6 py-12 md:px-14 md:py-16">
          <h2 className="font-heading text-3xl font-extrabold leading-[1.3] md:text-5xl">
            حماية منشأتك تبدأ من أنظمة مراقبة موثوقة
          </h2>

          <p className="mt-6 max-w-xl leading-loose text-brand-dark/75">
            نصمم ونركّب وندعم أنظمة كاميرات المراقبة وأجهزة التسجيل وأنظمة التحكم في الدخول، مع مراقبة
            مركزية ومتابعة عن بُعد من الجوال على مدار الساعة.
          </p>

          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm font-bold leading-relaxed md:text-base">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-dark text-sand">
                  <Check size={12} strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => openContactModal("فحص أمني")}
              className="inline-flex items-center justify-center rounded-full bg-brand-dark px-8 py-3.5 text-sm font-black text-white outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
            >
              اطلب معاينة واستشارة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}