"use client";

import Image from "next/image";
import {
  Code,
  Globe,
  DeviceMobile,
  TreeStructure,
  Check,
} from "@phosphor-icons/react";
import { useContactModal } from "@/components/ContactModalProvider";

const features = [
  {
    icon: Globe,
    title: "مواقع إلكترونية احترافية",
    description: "مواقع تعكس هوية شركتك وتساعدك على الوصول إلى عملائك.",
  },
  {
    icon: DeviceMobile,
    title: "تطبيقات الجوال",
    description: "تجارب رقمية سهلة تناسب احتياجات مشروعك ومستخدميك.",
  },
  {
    icon: TreeStructure,
    title: "أنظمة إدارية مخصصة",
    description: "حلول لتنظيم العمليات وإدارة البيانات وتقليل العمل اليدوي.",
  },
  {
    icon: Code,
    title: "تطوير وصيانة البرمجيات",
    description: "تطوير الأنظمة القائمة وتحسينها مع نمو احتياجات أعمالك.",
  },
];

const benefits = [
  "حلول مصممة وفق احتياجات منشأتك",
  "تجربة استخدام واضحة وسهلة",
  "قابلية للتطوير مع نمو أعمالك",
  "دعم فني وصيانة حسب الاتفاق",
];

export default function SoftwareBanner() {
  const { openContactModal } = useContactModal();

  return (
    <section
      className="container-x section"
      aria-labelledby="software-banner-title"
    >
      <div className="grid overflow-hidden rounded-xl2 bg-sand text-brand-dark lg:grid-cols-[0.8fr_1.2fr]">
        {/* الصورة */}
        <div className="p-2.5 lg:p-3">
          <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl bg-brand-dark lg:min-h-[400px]">
            <Image
              src="/software.webp"
              alt="تطوير البرمجيات والأنظمة الرقمية للأعمال"
              fill
              sizes="(min-width: 1024px) 38vw, calc(100vw - 2.5rem)"
              className="object-cover"
              quality={60}
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent"
            />

            <p className="absolute inset-x-4 bottom-5 max-w-xs text-lg font-extrabold leading-relaxed text-white md:inset-x-5 md:text-xl">
              تقنية تخدم طريقة عملك، وتساعدك على التطور.
            </p>
          </div>
        </div>

        {/* المحتوى */}
        <div className="flex flex-col justify-center px-5 py-7 md:px-9 md:py-9 lg:ps-8 lg:pe-10">
          <p className="mb-3 flex items-center gap-3 text-sm font-extrabold text-brand-dark/60">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-brand-dark/40"
            />
            حلول برمجية مصممة لأعمالك
          </p>

          <h2
            id="software-banner-title"
            className="font-heading text-2xl font-extrabold leading-[1.3] md:text-4xl"
          >
            حوّل تحديات عملك إلى حلول رقمية
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-brand-dark/75 md:text-base md:leading-8">
            نطوّر المواقع والتطبيقات والأنظمة البرمجية التي تساعد شركتك على
            تنظيم عملياتها، وتحسين تجربة عملائها، وتقليل المهام المتكررة.
            نبدأ بفهم احتياجاتك، ثم نعمل معك على بناء الحل المناسب لمشروعك.
          </p>

          {/* الخدمات */}
          <div className="mt-6 grid gap-x-7 gap-y-4 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 border-t border-brand-dark/15 pt-3.5"
                >
                  <Icon
                    size={26}
                    weight="duotone"
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />

                  <div>
                    <h3 className="text-sm font-extrabold leading-relaxed md:text-base">
                      {feature.title}
                    </h3>

                    <p className="mt-0.5 text-sm leading-relaxed text-brand-dark/65">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* مميزات العمل مع رقميات */}
          <ul className="mt-6 grid gap-x-6 gap-y-2 rounded-2xl bg-brand-dark px-5 py-4 text-sand sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-sm font-bold leading-relaxed"
              >
                <Check
                  size={15}
                  weight="bold"
                  className="mt-1 shrink-0"
                  aria-hidden="true"
                />

                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* التواصل */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              onClick={() => openContactModal("طلب مشروع برمجي")}
              className="inline-flex items-center justify-center rounded-full bg-brand-dark px-7 py-3 text-sm font-black text-white outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
            >
              ناقش مشروعك معنا
            </button>

            <span className="text-sm leading-relaxed text-brand-dark/60">
              اشرح لنا احتياجك، ولنبدأ من الحل المناسب.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}