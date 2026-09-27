// components/SecurityIntro.jsx
import Image from "next/image";

export default function SecurityIntro({ title, subtitle, image }) {
  return (
    <section className="container-x pt-10 pb-6 md:pt-14 md:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
        <div>
          <h1 className="text-3xl md:text-[2.75rem] font-black leading-snug text-ink mb-5">
            {title}
          </h1>
          <p className="text-ink/60 leading-relaxed text-base md:text-lg max-w-md mb-8">
            {subtitle}
          </p>
          <button className="btn-primary">اطلب استشارة</button>
        </div>

        <div className="relative rounded-xl2 overflow-hidden min-h-[280px] md:min-h-[420px]">
          <Image src={image} alt={title} fill className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}