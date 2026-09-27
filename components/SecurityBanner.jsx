import Image from "next/image";
import { Lock } from "lucide-react";

export default function SecurityBanner() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-6">
        <div className="relative rounded-xl2 overflow-hidden min-h-[320px] bg-gradient-to-b from-emerald-950 to-emerald-900">
          <Image
            src="/security.png"
            alt="مركز بيانات آمن"
            fill
            className="object-cover"
          />
          
        </div>

        <div className="rounded-xl2 bg-brand-dark text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-black mb-4">
            أمن بياناتك أولويتنا القصوى
          </h2>
          <p className="text-white/70 leading-relaxed max-w-xl mb-8">
            أنظمة حماية سيبرانية متقدمة تضمن سلامة أصولك الرقمية على مدار
            الساعة بمعايير عالمية.
          </p>
          <div>
            <button className="btn-white">
              طلب فحص أمني
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}