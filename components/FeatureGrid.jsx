// components/FeatureGrid.jsx  (لسه Server Component — مفيش "use client" هنا)
// Server Component → لازم نسخة الـ SSR من Phosphor (النسخة العادية بتستخدم Context)
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import FeatureModal from "./FeatureModal";

// ألوان معتمة بالكامل: الكروت بتتراكم فوق بعض فلازم ما يبانش اللي تحتها
const TONES = [
  { card: "bg-brand-dark text-white", sub: "text-white/75", link: "text-sand" },
  { card: "bg-sand text-brand-dark", sub: "text-brand-dark/80", link: "text-brand-dark" },
  { card: "bg-white text-ink ring-1 ring-ink/10", sub: "text-ink/65", link: "text-brand" },
  { card: "bg-brand text-white", sub: "text-white/75", link: "text-sand" },
  { card: "bg-brand-soft text-ink", sub: "text-ink/70", link: "text-brand" },
];

const CARD_W = 300; // عرض الكارت على الشاشات الكبيرة (px)
const MAX_TOTAL = 1120; // أقصى عرض للمروحة كلها

export default function FeatureGrid({ title, subtitle, items }) {
  const n = items.length;
  // المسافة بين بداية كل كارت والتاني: بتضيق لما العدد يزيد عشان المروحة تفضل جوه الصفحة
  const step =
    n > 1 ? Math.max(150, Math.min(230, (MAX_TOTAL - CARD_W) / (n - 1))) : 0;
  const overlap = CARD_W - step;

  return (
    <section className="container-x section">
      <div className="mb-12 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.2] text-ink md:text-6xl">
          {title}
        </h2>
        <p className="max-w-sm leading-loose text-ink/60">{subtitle}</p>
      </div>

      {/* مروحة كروت: على الموبايل بتتحول لكروت متراصة عادية */}
      <ul className="flex flex-col gap-4 md:flex-row md:justify-center md:overflow-x-clip md:pb-10 md:pt-12">
        {items.map(({ icon: Icon, title: t, text, details }, i) => {
          const tone = TONES[i % TONES.length];
          const k = i - (n - 1) / 2; // بُعد الكارت عن المنتصف
          return (
            <li
              key={t}
              style={{
                "--r": `${k * 5}deg`,
                "--y": `${Math.round(k * k * 7)}px`,
                "--ml": i === 0 ? "0px" : `-${overlap}px`,
              }}
              className={`group relative isolate overflow-hidden rounded-xl2 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] md:ms-[var(--ml)] md:h-[430px] md:w-[300px] md:shrink-0 md:origin-bottom md:[transform:rotate(var(--r))_translateY(var(--y))] md:hover:z-20 md:hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)] md:hover:[transform:rotate(0deg)_translateY(-30px)_scale(1.04)] md:focus-within:z-20 md:focus-within:[transform:rotate(0deg)_translateY(-30px)_scale(1.04)] ${tone.card}`}
            >
              {/* الأيقونة العملاقة: مقصوصة من الحافة كأنها علامة مائية */}
              <Icon
                aria-hidden="true"
                size={300}
                weight="duotone"
                className="pointer-events-none absolute -bottom-14 -start-14 opacity-[0.2] transition-transform duration-700 md:group-hover:rotate-6 md:group-hover:scale-110"
              />

              <div className="relative flex h-full min-h-[280px] flex-col justify-between gap-8 p-7">
                <div>
                  <Icon
                    aria-hidden="true"
                    size={52}
                    weight="duotone"
                    className={`mb-5 ${tone.link}`}
                  />
                  <h3 className="font-heading text-3xl font-extrabold leading-snug md:text-[2rem]">
                    {t}
                  </h3>
                </div>

                {/* على الشاشات الكبيرة: النص بيظهر عند المرور أو التركيز بالكيبورد */}
                <div className="transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                  <p className={`text-[15px] leading-loose ${tone.sub}`}>{text}</p>

                  {/* الرابط بيمتد على الكارت كله (stretched link) */}
                  <FeatureModal
                    title={t}
                    text={text}
                    details={details}
                    icon={<Icon size={28} weight="duotone" />}
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-black outline-none transition-all duration-300 after:absolute after:inset-0 after:content-[''] group-hover:gap-3 focus-visible:after:ring-2 focus-visible:after:ring-sand ${tone.link}`}
                  >
                    <span className="sr-only">{t}: </span>
                    اعرف أكتر
                    <ArrowLeft size={16} weight="bold" />
                  </FeatureModal>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}