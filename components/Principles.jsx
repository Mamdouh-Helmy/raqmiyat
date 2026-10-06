// components/Principles.jsx
import { SquiggleUnderline } from "./SquiggleUnderline";

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

export default function Principles() {
  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">
        {/* الجانب الثابت */}
        <div className="lg:sticky lg:top-10 self-start">
          <div className="flex items-center gap-3 mb-6">
            <span className="size-2 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest text-[#a98445]">
              مبادئنا
            </span>
          </div>

          <div className="inline-block mb-6">
            <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.3]">
              كيف نفكر قبل أن نكتب أول سطر
            </h2>
            <SquiggleUnderline />
          </div>

          <p className="text-ink/60 leading-relaxed max-w-sm">
            خمس قناعات نلتزم بها في كل مشروع، صغيراً كان أو كبيراً.
          </p>

          {/* شريط معيّنات زخرفي */}
          <div className="mt-10 flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="size-3 rotate-45 border border-[#c9a66b]"
                style={{ backgroundColor: i === 0 ? "#c9a66b" : "transparent", opacity: 1 - i * 0.17 }}
              />
            ))}
          </div>
        </div>

        {/* القائمة */}
        <ol className="relative">
          {/* الخط الرأسي اللي بيربط المعيّنات */}
          <span
            aria-hidden="true"
            className="absolute right-8 top-10 bottom-10 w-px bg-gradient-to-b from-[#c9a66b]/60 via-[#c9a66b]/25 to-transparent"
          />

          {principles.map(({ n, title, text }) => (
            <li
              key={n}
              className="group relative grid grid-cols-[4rem_1fr] gap-5 py-7 md:py-8 rounded-xl2 transition-colors duration-300 hover:bg-brand-dark/[0.035]"
            >
              {/* المعيّن + الرقم */}
              <div className="relative grid place-items-center size-16 self-start">
                <span className="absolute size-10 rotate-45 rounded-[5px] border border-[#c9a66b]/50 bg-white shadow-sm transition-all duration-500 group-hover:rotate-[135deg] group-hover:scale-110 group-hover:border-brand-dark group-hover:bg-brand-dark" />
                <span className="relative font-heading text-xl leading-none text-brand-dark transition-colors duration-300 group-hover:text-[#c9a66b]">
                  {n}
                </span>
              </div>

              {/* النص */}
              <div className="pl-4 pt-2 transition-transform duration-500 group-hover:-translate-x-1">
                <h3 className="font-black text-ink text-lg md:text-xl mb-2">
                  {title}
                </h3>
                <span className="block h-px w-8 bg-[#c9a66b] mb-3 transition-all duration-500 group-hover:w-20" />
                <p className="text-ink/60 leading-relaxed text-[15px] max-w-xl">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}