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
      <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <div className="lg:sticky lg:top-10 self-start">
          <div className="inline-block mb-5">
            <h2 className="text-3xl md:text-4xl font-black text-ink leading-snug">
              كيف نفكر قبل أن نكتب أول سطر
            </h2>
            <SquiggleUnderline />
          </div>
          <p className="text-ink/60 leading-relaxed max-w-sm">
            خمس قناعات نلتزم بها في كل مشروع، صغيراً كان أو كبيراً.
          </p>
        </div>

        <ol>
          {principles.map(({ n, title, text }) => (
            <li
              key={n}
              className="group grid grid-cols-[3.5rem_1fr] gap-4 py-7 border-t border-ink/10 last:border-b"
            >
              <span className="font-heading text-4xl leading-none text-brand/25 transition-colors duration-300 group-hover:text-brand">
                {n}
              </span>
              <div>
                <h3 className="font-black text-ink text-lg mb-2">{title}</h3>
                <p className="text-ink/60 leading-relaxed text-[15px]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}