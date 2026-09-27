import Image from "next/image";
import { Cpu, ShieldCheck } from "lucide-react";

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

const points = [
  {
    icon: Cpu,
    title: "تقنيات سيادية",
    text: "نطور برمجياتنا محلياً لضمان السيادة الرقمية وأمان البيانات الوطنية وفق رؤية المملكة.",
  },
  {
    icon: ShieldCheck,
    title: "معايير أمنية صارمة",
    text: "نطبق أعلى بروتوكولات التشفير والأمان المتبعة عالمياً في كافة أنظمتنا لضمان الخصوصية.",
  },
];

export default function WhyDifferent() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-brand-soft text-ink/70 text-xs font-bold px-4 py-2 rounded-full mb-6">
            لماذا نختلف عن الآخرين؟
          </span>

          <div className="inline-block mb-6">
            <h2 className="text-3xl font-black text-ink leading-tight">
              نجمع بين عمق التراث وسرعة المستقبل الرقمي
            </h2>
            <SquiggleUnderline />
          </div>

          <p className="text-ink/60 leading-relaxed mb-10">
            في رقميات، لا نقدم مجرد كود ونبرمج، بل نبني حلولاً استراتيجية تعزز
            من مكانة أعمالك في السوق السعودي المتنامي.
          </p>
          <div className="space-y-8">
            {points.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-dark text-white flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-black text-ink mb-1">{title}</h4>
                  <p className="text-ink/60 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-xl2 overflow-hidden min-h-[420px]">
          <Image
            src="/why-different.png"
            alt="أمن سيبراني وهوية رقمية سعودية"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-brand-dark/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}