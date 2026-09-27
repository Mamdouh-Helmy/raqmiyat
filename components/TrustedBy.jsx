import { Building2, Landmark, Factory, Briefcase, ShieldCheck } from "lucide-react";

const partners = [
  { name: "مؤسسة نجد", icon: Building2 },
  { name: "وزارة التقنية", icon: Landmark },
  { name: "صناعات مكة", icon: Factory },
  { name: "أعمال الرياض", icon: Briefcase },
  { name: "شركة جدة", icon: ShieldCheck },
];

const repeatedPartners = [...partners, ...partners, ...partners];

function LogoRow() {
  return (
    <>
      {repeatedPartners.map(({ name, icon: Icon }, i) => (
        <div
          key={`${name}-${i}`}
          className="flex items-center gap-2 text-sm font-bold text-ink/50 shrink-0 px-8"
        >
          <Icon size={20} />
          {name}
        </div>
      ))}
    </>
  );
}

export default function TrustedBy() {
  return (
    <section className="container-x section">
      <div className="card p-10 text-center overflow-hidden">
        <p className="text-ink/50 mb-8">
          نحوز على ثقة كبرى الجهات والشركات في المملكة
        </p>
        <div
          dir="ltr"
          className="marquee-wrap relative w-full overflow-hidden [mask-image:linear-gradient(to_left,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="marquee-track">
            <LogoRow />
            <LogoRow />
          </div>
        </div>
      </div>
    </section>
  );
}