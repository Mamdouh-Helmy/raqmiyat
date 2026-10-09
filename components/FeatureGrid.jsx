// components/FeatureGrid.jsx  (لسه Server Component — مفيش "use client" هنا)
// Server Component → لازم نسخة الـ SSR من Phosphor (النسخة العادية بتستخدم Context)
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import FeatureModal from "./FeatureModal";
import FanReveal from "./FanReveal";

// ألوان معتمة بالكامل: الكروت بتتراكم فوق بعض فلازم ما يبانش اللي تحتها
// btn   = دايرة السهم (بتتملي بلون الكارت عند الهوفر)
// focus = حلقة الفوكس بالكيبورد (لازم تختلف عن لون الكارت نفسه، وإلا مش هتبان)
const TONES = [
  {
    card: "bg-brand-dark text-white ring-white/10",
    sub: "text-white/75",
    link: "text-sand",
    btn: "border-white/25 text-white group-hover:border-sand group-hover:bg-sand group-hover:text-brand-dark",
    focus: "focus-visible:after:ring-sand",
  },
  {
    card: "bg-sand text-brand-dark ring-brand-dark/10",
    sub: "text-brand-dark/80",
    link: "text-brand-dark",
    btn: "border-brand-dark/30 text-brand-dark group-hover:border-brand-dark group-hover:bg-brand-dark group-hover:text-sand",
    focus: "focus-visible:after:ring-brand-dark",
  },
  {
    card: "bg-white text-ink ring-ink/10",
    sub: "text-ink/65",
    link: "text-brand",
    btn: "border-ink/20 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white",
    focus: "focus-visible:after:ring-brand",
  },
  {
    card: "bg-brand text-white ring-white/10",
    sub: "text-white/75",
    link: "text-sand",
    btn: "border-white/25 text-white group-hover:border-sand group-hover:bg-sand group-hover:text-brand-dark",
    focus: "focus-visible:after:ring-sand",
  },
  {
    card: "bg-brand-soft text-ink ring-ink/10",
    sub: "text-ink/70",
    link: "text-brand",
    btn: "border-ink/20 text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white",
    focus: "focus-visible:after:ring-brand",
  },
];

const CARD_W = 300; // عرض الكارت في وضع المروحة (px)
const MAX_TOTAL = 1120; // أقصى عرض للمروحة كلها (px)
const GUTTER = "4rem"; // مجموع الـ padding الجانبي بتاع container-x (عدّله لو مختلف)
const STAGGER = 80; // ms: الفرق بين الكروت وهي بتفتح (من النص لبره)

// وضع المروحة: شاشة ≥1024 + ماوس حقيقي. غير كده (موبايل/تابلت/تاتش) → كروت عادية والنص ظاهر
// الـ variants (fan / fan-before / fan-after) متعرّفة في tailwind.config.js
const FAN = [
  "fan:h-[430px] fan:w-[300px] fan:shrink-0 fan:origin-bottom",
  "fan:ms-[var(--ml)]",
  "fan:[transform:rotate(var(--r))_translate(var(--sx),var(--y))]",
  // الجيران بيوسّعوا مكان للكارت اللي عليه الهوفر/الفوكس (--d بيقلب الاتجاه في RTL)
  "fan:fan-before:[--sx:calc(var(--d)_*_-44px)]",
  "fan:fan-after:[--sx:calc(var(--d)_*_44px)]",
  "fan:hover:z-20 fan:hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)] fan:hover:[transform:rotate(0deg)_translateY(-34px)_scale(1.05)]",
  "fan:focus-within:z-20 fan:focus-within:[transform:rotate(0deg)_translateY(-34px)_scale(1.05)]",
  // فتح المروحة عند أول ظهور (بيتحكم فيه FanReveal)
  "fan:group-data-[fan=closed]/fan:ms-[var(--ml0)]",
  "fan:group-data-[fan=closed]/fan:[transform:rotate(0deg)_translateY(0px)]",
  "fan:group-data-[fan=revealing]/fan:duration-[900ms]",
  "fan:group-data-[fan=revealing]/fan:[transition-delay:var(--delay)]",
].join(" ");

// النص بيطلع من تحت عند الهوفر/الفوكس (على التاتش بيبقى ظاهر طول الوقت)
const REVEAL_UP =
  "transition-[opacity,transform] duration-300 fan:translate-y-3 fan:opacity-0 fan:group-hover:translate-y-0 fan:group-hover:opacity-100 fan:group-focus-within:translate-y-0 fan:group-focus-within:opacity-100";
const REVEAL_FADE =
  "transition-opacity duration-300 fan:opacity-0 fan:group-hover:opacity-100 fan:group-focus-within:opacity-100";

export default function FeatureGrid({ title, subtitle, items }) {
  const n = items.length;
  const gaps = Math.max(n - 1, 1);
  // وقت ما الحركة تخلص (بنستناه قبل ما نشيل الـ delay من الهوفر)
  const settleMs = Math.round(900 + ((n - 1) / 2) * STAGGER + 150);

  return (
    <section className="container-x section">
      <div className="mb-12 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.2] text-ink md:text-6xl">
          {title}
        </h2>
        <p className="max-w-sm leading-loose text-ink/60">{subtitle}</p>
      </div>

      {/* مروحة كروت: على الشاشات الكبيرة بالماوس. غير كده grid عادي (عمودين من sm) */}
      <FanReveal
        settleMs={settleMs}
        className="grid gap-4 [--d:1] rtl:[--d:-1] sm:grid-cols-2 fan:flex fan:justify-center fan:gap-0 fan:overflow-x-clip fan:pb-12 fan:pt-16"
        style={{
          "--gaps": gaps,
          // المسافة بين بداية كل كارت والتاني: بتضيق لوحدها (CSS) على حسب عرض الشاشة وعدد الكروت
          "--ml-all": `calc(clamp(150px, calc((min(100vw - ${GUTTER}, ${MAX_TOTAL}px) - ${CARD_W}px) / var(--gaps)), 230px) - ${CARD_W}px)`,
        }}
      >
        {items.map(({ icon: Icon, title: t, text, details }, i) => {
          const tone = TONES[i % TONES.length];
          const k = i - (n - 1) / 2; // بُعد الكارت عن المنتصف
          return (
            <li
              key={t}
              style={{
                "--r": `${(k * 5).toFixed(2)}deg`,
                "--y": `${Math.round(k * k * 7)}px`,
                "--ml": i === 0 ? "0px" : "var(--ml-all)",
                "--ml0": i === 0 ? "0px" : `-${CARD_W}px`,
                "--delay": `${Math.round(Math.abs(k) * STAGGER)}ms`,
              }}
              className={`group relative isolate overflow-hidden rounded-xl2 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] ring-1 ring-inset transition-[transform,box-shadow,margin-inline-start] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] [--sx:0px] motion-reduce:transition-none sm:last:odd:col-span-2 ${FAN} ${tone.card}`}
            >
              {/* الأيقونة العملاقة: مقصوصة من الحافة كأنها علامة مائية */}
              <Icon
                aria-hidden="true"
                size={300}
                weight="duotone"
                className="pointer-events-none absolute -bottom-14 -start-14 opacity-[0.2] transition-transform duration-700 fan:group-hover:rotate-6 fan:group-hover:scale-110"
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

                <div className="flex flex-col gap-6">
                  <p className={`text-[15px] leading-loose fan:line-clamp-5 ${tone.sub} ${REVEAL_UP}`}>
                    {text}
                  </p>

                  {/* الرابط بيمتد على الكارت كله (stretched link). الدايرة ظاهرة دايماً عشان تقول "اضغط" */}
                  <FeatureModal
                    title={t}
                    text={text}
                    details={details}
                    icon={<Icon size={28} weight="duotone" />}
                    className={`flex w-full items-center justify-between gap-4 text-sm font-black outline-none after:absolute after:inset-0 after:rounded-xl2 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset ${tone.focus} ${tone.link}`}
                  >
                    <span className="sr-only">{t}: </span>
                    <span className={REVEAL_FADE}>اعرف أكتر</span>
                    <span
                      aria-hidden="true"
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${tone.btn}`}
                    >
                      <ArrowLeft
                        size={18}
                        weight="bold"
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                      />
                    </span>
                  </FeatureModal>
                </div>
              </div>
            </li>
          );
        })}
      </FanReveal>
    </section>
  );
}