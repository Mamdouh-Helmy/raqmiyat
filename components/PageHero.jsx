// components/PageHero.jsx
import Image from "next/image";
import { SquiggleUnderline } from "./SquiggleUnderline";
import { ArrowLeft } from "lucide-react";

export default function PageHero({ title, subtitle, screenshot }) {
  return (
    <section className="container-x pt-10 pb-6 md:pt-14 md:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <div className="inline-block mb-5">
            <h1 className="text-3xl md:text-[2.75rem] font-black leading-snug text-ink">
              {title}
            </h1>
            <SquiggleUnderline />
          </div>

          <p className="text-ink/60 leading-relaxed text-base md:text-lg max-w-lg mb-8">
            {subtitle}
          </p>

          <div className="flex gap-3">
            <button className="btn-primary">اطلب استشارة</button>
            <button className="inline-flex items-center gap-2 text-ink font-bold text-sm hover:text-brand transition-colors">
              شاهد أعمالنا
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>

        {screenshot && (
          <div className="relative rounded-xl2 overflow-hidden min-h-[280px] md:min-h-[380px]">
            <Image
              src={screenshot}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}