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

export default function WhyDifferent() {
  return (
    <section className="bg-brand-dark text-paper overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* نص الكارد */}
        <div className="px-6 md:px-12 lg:px-16 py-14 md:py-16 flex flex-col justify-center">
          <p className="text-sm font-bold text-sand mb-4">لماذا نختلف عن الآخرين؟</p>
          <div className="inline-block self-start">
            <h2 className="text-4xl md:text-6xl font-black leading-[1.25]">
              نجمع بين عمق التراث وسرعة المستقبل الرقمي
            </h2>
            <SquiggleUnderline color="%23c9a66b" />
          </div>
          <p className="text-paper/70 leading-loose mt-5 max-w-xl">
            في رقميات، لا نقدم مجرد كود ونبرمج، بل نبني حلولاً استراتيجية تعزز من مكانة أعمالك في السوق السعودي المتنامي.
          </p>

          <div className="mt-10 space-y-7">
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

        {/* الصورة: ملزوقة في الحواف الأربعة، بطول السكشن كله */}
        <div className="relative h-[380px] lg:h-auto">
          <Image
            src="/why-different.png"
            alt="أمن سيبراني وهوية رقمية سعودية"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}