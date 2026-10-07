// components/Principles.jsx  (Server Component — الحركة CSS بس: sticky)

const principles = [
  {
    n: "١",
    title: "نبدأ بأصغر نسخة تعمل",
    text: "نسلّمك نسخة أولى صغيرة تعمل خلال أسابيع، ثم نبني فوقها بناءً على استخدام حقيقي، لا على تخمين.",
  },
  {
    n: "٢",
    title: "الكود ملكك من اليوم الأول",
    text: "المستودع والخوادم والنطاقات تُفتح باسمك. لا شيء محتجز عندنا، ولا تحتاجنا لتشغيل ما بنيناه.",
  },
  {
    n: "٣",
    title: "نقول لك عن التعقيد قبل أن تطلبه",
    text: "إن كانت ميزة ستضاعف الوقت أو التكلفة، نوضح ذلك لك مسبقاً ونقترح بديلاً أبسط.",
  },
  {
    n: "٤",
    title: "نكتب لمن سيأتي بعدنا",
    text: "كود مقروء وتوثيق واضح، بحيث يستطيع أي مطوّر آخر متابعة العمل إن احتجت ذلك يوماً.",
  },
  {
    n: "٥",
    title: "الإطلاق بداية القياس",
    text: "بعد الإطلاق نراقب سرعة التحميل والأخطاء وسلوك المستخدمين، ونعدّل على ما نراه لا على ما نتوقعه.",
  },
];

// الكروت بتغمق كل ما اتراكمت فوق بعض
const tones = [
  { card: "bg-white text-ink ring-1 ring-ink/10", sub: "text-ink/65", num: "text-sand", dark: false },
  { card: "bg-sand/25 text-ink", sub: "text-ink/70", num: "text-sand", dark: false },
  { card: "bg-sand/60 text-ink", sub: "text-ink/75", num: "text-brand-dark/30", dark: false },
  { card: "bg-brand text-white", sub: "text-white/70", num: "text-sand", dark: true },
  { card: "bg-brand-dark text-white", sub: "text-white/65", num: "text-sand", dark: true },
];

const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23b8934a' stroke-opacity='0.2'/%3E%3C/svg%3E\")";

export default function Principles() {
  return (
    <section className="container-x section">
      <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.2] text-ink md:text-6xl">
          كيف نفكر قبل أن نكتب أول سطر
        </h2>
        <p className="max-w-xs leading-loose text-ink/60">
          خمس قناعات نلتزم بها في كل مشروع، صغيراً كان أو كبيراً.
        </p>
      </div>

      {/* كروت بتتراكم فوق بعض مع السكرول */}
      <ol className="flex flex-col gap-10 pb-6 md:gap-24">
        {principles.map(({ n, title, text }, i) => {
          const t = tones[i];
          return (
            <li
              key={n}
              className="sticky"
              style={{ top: `calc(5.5rem + ${i * 1.1}rem)` }}
            >
              {/* قاعدة معتمة تحت الكارت: الألوان الشفافة (sand/25, sand/60) كانت بتظهر اللي تحتها */}
              <div className="rounded-xl2 bg-paper">
              <div
                className={`relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-xl2 p-7 shadow-[0_-12px_30px_-18px_rgba(0,0,0,0.35)] md:min-h-[360px] md:flex-row md:items-center md:gap-14 md:p-12 ${t.card}`}
              >
                {t.dark && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{
                      backgroundImage: lattice,
                      backgroundSize: "56px 56px",
                      WebkitMaskImage:
                        "linear-gradient(to left, #000 0%, transparent 70%)",
                      maskImage: "linear-gradient(to left, #000 0%, transparent 70%)",
                    }}
                  />
                )}

                <span
                  aria-hidden="true"
                  className={`mb-4 block font-heading text-8xl font-extrabold leading-none md:mb-0 md:w-[260px] md:shrink-0 md:text-center md:text-[14rem] ${t.num}`}
                >
                  {n}
                </span>

                <div>
                  <h3 className="font-heading text-2xl font-extrabold leading-snug md:text-4xl">
                    {title}
                  </h3>
                  <p className={`mt-4 max-w-xl text-base leading-loose md:text-lg ${t.sub}`}>
                    {text}
                  </p>
                </div>
              </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}