import Image from "next/image";
import { Cpu, LockKey, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { SquiggleUnderline } from "./najdi-icons";

const IconChip = (p) => <Cpu weight="duotone" {...p} />;
const IconLock = (p) => <LockKey weight="duotone" {...p} />;
const IconTeam = (p) => <UsersThree weight="duotone" {...p} />;

const points = [
  { icon: IconChip, title: "تقنيات سيادية", text: "نطور برمجياتنا محلياً لضمان السيادة الرقمية وأمان البيانات الوطنية وفق رؤية المملكة." },
  { icon: IconLock, title: "معايير أمنية صارمة", text: "نطبق أعلى بروتوكولات التشفير والأمان المتبعة عالمياً في كافة أنظمتنا لضمان الخصوصية." },
  { icon: IconTeam, title: "فريق سعودي متخصص", text: "خبرات محلية تفهم السوق السعودي واحتياجاته." },
];

// زوايا مدرّجة (درج نجدي): خطوتين في كل ركن، بالبكسل عشان تثبت مهما كان حجم الصورة
const S = 14; // حجم الخطوة
const clip = `polygon(
  0 ${S * 2}px, ${S}px ${S * 2}px, ${S}px ${S}px, ${S * 2}px ${S}px, ${S * 2}px 0,
  calc(100% - ${S * 2}px) 0, calc(100% - ${S * 2}px) ${S}px, calc(100% - ${S}px) ${S}px, calc(100% - ${S}px) ${S * 2}px, 100% ${S * 2}px,
  100% calc(100% - ${S * 2}px), calc(100% - ${S}px) calc(100% - ${S * 2}px), calc(100% - ${S}px) calc(100% - ${S}px), calc(100% - ${S * 2}px) calc(100% - ${S}px), calc(100% - ${S * 2}px) 100%,
  ${S * 2}px 100%, ${S * 2}px calc(100% - ${S}px), ${S}px calc(100% - ${S}px), ${S}px calc(100% - ${S * 2}px), 0 calc(100% - ${S * 2}px)
)`;

// صف النوافذ المثلثة اللي بتتكرر على عرض الصورة
function TriangleWindows() {
  return (
    <svg aria-hidden="true" width="100%" height="44" className="absolute inset-x-0 bottom-3 block">
      <defs>
        <pattern id="najdi-windows" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M22 6 36 38H8Z" fill="none" stroke="#c9a66b" strokeWidth="1.5" />
          <path d="M22 20 27 32H17Z" fill="#c9a66b" />
        </pattern>
      </defs>
      <rect width="100%" height="44" fill="url(#najdi-windows)" />
    </svg>
  );
}

export default function WhyDifferent() {
  return (
    <section className="bg-brand-dark text-paper overflow-hidden">
      <div className="container-x py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-bold text-sand mb-4">لماذا نختلف عن الآخرين؟</p>
            <div className="inline-block">
              <h2 className="text-4xl md:text-6xl font-black leading-[1.25]">
                نجمع بين عمق التراث وسرعة المستقبل الرقمي
              </h2>
              <SquiggleUnderline color="%23c9a66b" />
            </div>
            <p className="text-paper/70 leading-loose mt-6 max-w-xl">
              في رقميات، لا نقدم مجرد كود ونبرمج، بل نبني حلولاً استراتيجية تعزز من مكانة أعمالك في السوق السعودي المتنامي.
            </p>

            <div className="mt-12 space-y-9">
              {points.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-6">
                  <Icon className="w-12 h-12 shrink-0 text-sand mt-0.5" />
                  <div className="border-r border-sand/40 pr-6">
                    <h4 className="font-black text-xl mb-2">{title}</h4>
                    <p className="text-paper/65 text-sm leading-relaxed max-w-md">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative p-4 max-w-[520px] mx-auto lg:mx-0">
              {/* الطبقة الخلفية: جدار تاني مزاح */}
              <div
                aria-hidden="true"
                className="absolute inset-4 -translate-x-4 translate-y-4 bg-sand/25"
                style={{ clipPath: clip }}
              />

              {/* الإطار: خيط رملي 2px حوالين الشكل المدرّج */}
              <div className="relative bg-sand" style={{ clipPath: clip }}>
                <div className="relative m-[2px] bg-brand-dark" style={{ clipPath: clip }}>
                  <Image
                    src="/why-different.png"
                    alt="أمن سيبراني وهوية رقمية سعودية"
                    width={1200}
                    height={1200}
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="w-full h-auto block"
                  />
                  {/* الصورة بتدوب في لون الخلفية فوق صف النوافذ */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
                  <TriangleWindows />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}