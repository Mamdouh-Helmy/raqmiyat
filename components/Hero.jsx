import Image from "next/image";

function SquiggleUnderline() {
  return (
    <div
      className="w-full -mt-0.5"
      style={{
        height: "8px",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='8' viewBox='0 0 24 8'%3E%3Cpath d='M0 4 Q6 -1 12 4 T24 4' stroke='%231c3b2e' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 8px",
      }}
    />
  );
}

export default function Hero() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6">
        <div className="relative rounded-xl2 overflow-hidden min-h-[420px]">
          <Image
            src="/hero.png"
            alt="أفق الرياض"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />
        </div>

        <div className="card p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="inline-block self-start">
              <h1 className="font-arabic text-3xl lg:text-4xl font-black leading-snug text-ink">
                مستقبل البرمجيات
                <br />
                برؤية سعودية
              </h1>
              <SquiggleUnderline />
            </div>
            <p className="text-ink/60 leading-relaxed text-sm lg:text-base">
              نقدم حلولاً برمجية متطورة وخدمات أمنية متكاملة لدعم التحول
              الرقمي في المملكة.
            </p>
          </div>

          <div className="w-10 h-1 rounded-full bg-brand/30" />

          <div className="flex gap-3 mt-auto">
            <button className="btn-primary">ابدأ الآن</button>
            <button className="btn-outline">تعرف علينا</button>
          </div>
        </div>
      </div>
    </section>
  );
}