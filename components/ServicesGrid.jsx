// components/ServicesGrid.jsx  (Server Component — الحركة CSS بس)
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* الحلول البرمجية */}
        <Link
          href="/software"
          className="group grid overflow-hidden rounded-xl2 bg-sand text-brand-dark outline-none transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-dark md:grid-cols-2"
        >
          {/* الصورة: من الحافة للحافة وبطول الكارت كله */}
          <div className="relative min-h-[260px] md:min-h-full">
            <Image
              src="/services/software.webp"
              alt="الحلول البرمجية"
              fill
              sizes="(min-width: 1024px) 340px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center p-8 md:p-10">
            <h3 className="mb-4 font-heading text-3xl font-extrabold leading-snug md:text-4xl">
              الحلول البرمجية
            </h3>
            <p className="mb-8 leading-loose text-brand-dark/75">
              نطوّر مواقع الويب وتطبيقات الجوال وأنظمة ERP وLMS مخصصة لاحتياج منشأتك، من تحليل
              المتطلبات حتى التشغيل والدعم الفني المستمر.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-black transition-all duration-300 group-hover:gap-3">
              اكتشف الخدمة
              <ArrowLeft size={16} />
            </span>
          </div>
        </Link>

        {/* أنظمة المراقبة */}
        <Link
          href="/security"
          className="group flex flex-col justify-end rounded-xl2 bg-brand-dark p-8 text-white outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-sand md:p-10"
        >
          <h3 className="mb-3 font-heading text-2xl font-extrabold leading-snug md:text-3xl">
            أنظمة المراقبة والحماية
          </h3>
          <p className="mb-8 leading-loose text-white/70">
            تصميم وتركيب وصيانة كاميرات المراقبة وأنظمة التحكم في الدخول، مع متابعة مركزية وعن بُعد
            على مدار الساعة.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-black text-sand transition-all duration-300 group-hover:gap-3">
            اكتشف الخدمة
            <ArrowLeft size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}