import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6">
        <Link
          href="/software"
          className="card p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center group"
        >
          <div className="relative rounded-xl overflow-hidden min-h-[280px]">
            <Image
              src="/services/software.png"
              alt="الحلول البرمجية"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h3 className="text-2xl font-black text-ink mb-3">الحلول البرمجية</h3>
            <p className="text-ink/60 leading-relaxed mb-5">
              تطوير تطبيقات ويب وموبايل مخصصة تلبي احتياجات عملك بدقة وكفاءة
              عالية، مع ضمان تجربة مستخدم استثنائية.
            </p>
            <span className="inline-flex items-center gap-2 text-brand font-bold text-sm">
              اكتشف الخدمة
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

        <Link
          href="/security"
          className="rounded-xl2 bg-brand-dark text-white p-8 flex flex-col justify-between hover:bg-brand transition-colors group"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-16">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-3">الأمن السيبراني</h3>
            <p className="text-white/60 leading-relaxed mb-5">
              حماية شاملة لبياناتك وأنظمتك من التهديدات الرقمية المتطورة
              بمعايير أمنية عالمية.
            </p>
            <span className="inline-flex items-center gap-2 text-white font-bold text-sm">
              اكتشف الخدمة
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}