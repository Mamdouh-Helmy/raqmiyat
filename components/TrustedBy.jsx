import { SquiggleUnderline } from "./najdi-icons";

// بنستخدم الخطوط المحمّلة أصلاً في الموقع (El Messiri و Rakkas)
// بدل تحميل 5 خطوط إضافية. التنوع بالوزن والحجم والمسافات.
const partners = [
  { name: "مؤسسة نجد", cls: "font-arabic font-black text-3xl" },
  { name: "وزارة التقنية", cls: "font-arabic font-medium text-2xl tracking-wide" },
  { name: "صناعات مكة", cls: "font-heading text-3xl" },
  { name: "أعمال الرياض", cls: "font-arabic font-bold text-3xl" },
  { name: "شركة جدة", cls: "font-heading text-2xl tracking-wide" },
];

const stats = [
  { n: "١٥٠", plus: true, label: "مشروع تم تسليمه" },
  { n: "٤٥", plus: true, label: "جهة حكومية وخاصة" },
  { n: "٩٩٫٩٪", plus: false, label: "جاهزية الأنظمة" },
];

// مجموعة واحدة مكررة مرتين عشان تملا عرض الشاشة
function PartnerSet({ hidden = false }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {[...partners, ...partners].map((p, i) => (
        <div
          key={`${p.name}-${i}`}
          className="h-28 px-12 md:px-16 flex items-center justify-center shrink-0 whitespace-nowrap border-l border-ink/15 text-ink/70"
        >
          <span dir="rtl" className={p.cls}>{p.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="container-x section">
      <p className="text-ink/60 mb-6 text-sm">
        نحوز على ثقة كبرى الجهات والشركات في المملكة
      </p>

      {/* شريط الشركاء: لوب مستمر، بيقف لما تقف عليه بالماوس */}
      <div
        dir="ltr"
        className="overflow-hidden border-y border-ink/15 [mask-image:linear-gradient(to_left,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <PartnerSet />
          <PartnerSet hidden />
        </div>
      </div>

      <div className="my-14 opacity-30">
        <SquiggleUnderline />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-black text-brand leading-none text-[88px] md:text-[132px] tracking-tight">
              {s.plus && <span className="text-sand">+</span>}
              {s.n}
            </div>
            <p className="mt-3 text-ink/60 pr-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}