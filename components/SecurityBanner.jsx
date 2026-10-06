"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { VideoCamera, MoonStars, DeviceMobile, Wrench } from "@phosphor-icons/react";
import { useContactModal } from "@/components/ContactModalProvider";
import { SquiggleUnderline } from "./najdi-icons";

const features = [
  { icon: VideoCamera, text: "كاميرات عالية الدقة داخلية وخارجية" },
  { icon: MoonStars, text: "رؤية ليلية وتسجيل مستمر" },
  { icon: DeviceMobile, text: "مشاهدة مباشرة من الجوال" },
  { icon: Wrench, text: "صيانة وعقود دعم دورية" },
];

// زوايا عدسة الكاميرا
const corners = [
  "top-3 left-3 border-t-2 border-l-2",
  "top-3 right-3 border-t-2 border-r-2",
  "bottom-3 left-3 border-b-2 border-l-2",
  "bottom-3 right-3 border-b-2 border-r-2",
];

export default function SecurityBanner() {
  const { openContactModal } = useContactModal();
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] bg-brand-dark text-paper rounded-xl overflow-hidden">
        {/* شاشة المراقبة: الصورة كاملة بنسبتها الطبيعية */}
        <div className="p-6 md:p-8 flex items-center">
          <div className="relative w-full overflow-hidden bg-black">
            <Image
              src="/security.png"
              alt="غرفة مراقبة بالكاميرات"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full h-auto block"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.14) 0 1px, transparent 1px 3px)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25" />

            {corners.map((c) => (
              <span key={c} aria-hidden="true" className={`absolute w-7 h-7 border-sand ${c}`} />
            ))}

            <div className="absolute top-7 right-8 flex items-center gap-2 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              مباشر
            </div>
            <div dir="ltr" className="absolute top-7 left-8 text-xs font-mono tabular-nums text-paper/80">
              {time}
            </div>
            <div className="absolute bottom-7 right-8 text-xs text-paper/80">كاميرا ٠١</div>
          </div>
        </div>

        {/* المحتوى */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="inline-block self-start mb-5">
            <h2 className="text-3xl md:text-4xl font-black leading-[1.35]">
              حماية منشأتك تبدأ من أنظمة مراقبة موثوقة
            </h2>
            <SquiggleUnderline color="%23c9a66b" />
          </div>
          <p className="text-paper/70 leading-loose max-w-xl mb-8">
            نصمم ونركّب وندعم أنظمة كاميرات المراقبة وأجهزة التسجيل وأنظمة
            التحكم في الدخول، مع مراقبة مركزية ومتابعة عن بُعد من الجوال على
            مدار الساعة.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-10">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 border-t border-paper/10 pt-4 text-sm text-paper/85">
                <Icon size={28} weight="duotone" className="text-sand shrink-0" />
                {text}
              </li>
            ))}
          </ul>

          <div>
            <button type="button" onClick={() => openContactModal("فحص أمني")} className="btn-white">
              اطلب معاينة واستشارة
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}