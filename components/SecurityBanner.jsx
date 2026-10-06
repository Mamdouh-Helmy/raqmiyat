"use client";

import Image from "next/image";
import { useContactModal } from "@/components/ContactModalProvider";

export default function SecurityBanner() {
  const { openContactModal } = useContactModal();

  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-6">
        <div className="relative rounded-xl2 overflow-hidden min-h-[320px] bg-gradient-to-b from-emerald-950 to-emerald-900">
          <Image
            src="/security.png"
            alt="غرفة مراقبة بالكاميرات"
            fill
            className="object-cover"
          />
        </div>

        <div className="rounded-xl2 bg-brand-dark text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-black mb-4">
            حماية منشأتك تبدأ من أنظمة مراقبة موثوقة
          </h2>
          <p className="text-white/70 leading-relaxed max-w-xl mb-6">
            نصمم ونركّب وندعم أنظمة كاميرات المراقبة وأجهزة التسجيل وأنظمة
            التحكم في الدخول، مع مراقبة مركزية ومتابعة عن بُعد من الجوال على
            مدار الساعة.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              كاميرات عالية الدقة داخلية وخارجية
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              رؤية ليلية وتسجيل مستمر
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              مشاهدة مباشرة من الجوال
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              صيانة وعقود دعم دورية
            </li>
          </ul>

          <div>
            <button
              type="button"
              onClick={() => openContactModal("فحص أمني")}
              className="btn-white"
            >
              اطلب معاينة واستشارة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}