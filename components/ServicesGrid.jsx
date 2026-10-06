import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6">
        {/* الحلول البرمجية */}
        <Link
          href="/software"
          className="card group p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="relative rounded-xl overflow-hidden min-h-[280px] bg-brand-dark">
            <Image
              src="/services/software.png"
              alt="الحلول البرمجية"
              fill
              sizes="(min-width: 1024px) 340px, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-black text-ink mb-4 leading-snug">
              الحلول البرمجية
            </h3>
            <p className="text-ink/60 leading-relaxed mb-6">
              نطوّر مواقع الويب وتطبيقات الجوال وأنظمة ERP وLMS مخصصة لاحتياج
              منشأتك، من تحليل المتطلبات حتى التشغيل والدعم الفني المستمر.
            </p>
            <span className="inline-flex items-center gap-2 text-brand font-bold text-sm">
              اكتشف الخدمة
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </span>
          </div>
        </Link>

        {/* أنظمة المراقبة */}
        <Link
          href="/security"
          className="group rounded-xl2 bg-brand-dark text-white p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-brand"
        >
          {/* المعيّن: العنصر الوحيد اللي شايل الهوية هنا */}
          <div className="relative grid place-items-center size-16 mb-16">
            <span className="absolute size-12 rotate-45 rounded-lg border border-[#c9a66b]/70 transition-transform duration-500 group-hover:rotate-[135deg]" />
            <ShieldCheck size={24} className="relative text-[#c9a66b]" />
          </div>

          <div>
            <h3 className="text-2xl font-black mb-3 leading-snug">
              أنظمة المراقبة والحماية
            </h3>
            <p className="text-white/60 leading-relaxed mb-6">
              تصميم وتركيب وصيانة كاميرات المراقبة وأنظمة التحكم في الدخول،
              مع متابعة مركزية وعن بُعد على مدار الساعة.
            </p>
            <span className="inline-flex items-center gap-2 text-white font-bold text-sm">
              اكتشف الخدمة
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}