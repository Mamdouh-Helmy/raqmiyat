// components/TechStack.jsx  (Server Component — مفيش JS إضافي)
import { SquiggleUnderline } from "./SquiggleUnderline";

// الترتيب من فوق لتحت = من اللي المستخدم بيشوفه لحد البيانات.
// درجة اللون بتغمق كل ما نزلنا: أبيض ← فاتح ← غامق.
const layers = [
  {
    name: "الواجهة",
    note: "ما يراه المستخدم",
    plate: "bg-white text-ink border border-ink/10",
    sub: "text-ink/50",
    rule: "bg-ink/10",
    squiggle: "brand",
    tools: [
      { name: "React", role: "بناء الواجهات التفاعلية" },
      { name: "Next.js", role: "سرعة وظهور في محركات البحث" },
      { name: "Tailwind CSS", role: "تصميم متناسق ومتجاوب" },
      { name: "Flutter", role: "تطبيقات موبايل بكود واحد" },
    ],
  },
  {
    name: "الخادم",
    note: "المنطق والأمان",
    plate: "bg-brand-soft text-ink border border-transparent",
    sub: "text-ink/55",
    rule: "bg-ink/10",
    squiggle: "brand",
    tools: [
      { name: "Node.js", role: "تشغيل منطق النظام على الخادم" },
      { name: "Express.js", role: "واجهات API سريعة وواضحة" },
      { name: "TypeScript", role: "كود أدق وأخطاء أقل" },
    ],
  },
  {
    name: "البيانات",
    note: "التخزين والاستعلام",
    plate: "bg-brand-dark text-white border border-transparent",
    sub: "text-white/55",
    rule: "bg-white/15",
    squiggle: "white",
    tools: [
      { name: "PostgreSQL", role: "قاعدة بيانات علائقية موثوقة" },
      { name: "MongoDB", role: "تخزين مرن لبياناتك" },
    ],
  },
];

export default function TechStack() {
  const last = layers.length - 1;

  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr] gap-10 lg:gap-16 items-center">
        <div>
          <div className="inline-block mb-4">
            <h2 className="text-2xl md:text-3xl font-black text-ink leading-snug">
              نختار الأداة للمشروع، لا العكس
            </h2>
            <SquiggleUnderline />
          </div>
          <p className="text-ink/60 leading-relaxed max-w-xs">
            هذه أدواتنا الأساسية. وإن احتاج مشروعك غيرها، نستخدمها.
          </p>
        </div>

        <ol className="flex flex-col gap-2.5">
          {layers.map((layer, i) => (
            <li
              key={layer.name}
              className="group/row grid grid-cols-[1rem_1fr] gap-x-4 md:gap-x-5"
            >
              {/* مسار الطلب: من المستخدم لحد البيانات */}
              <div aria-hidden="true" className="relative">
                <span
                  className={`absolute left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-ink/25 ${
                    i === 0
                      ? "top-1/2 bottom-0"
                      : i === last
                      ? "-top-2.5 bottom-1/2"
                      : "-top-2.5 bottom-0"
                  }`}
                />
                <span
                  className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-200 group-hover/row:border-brand group-hover/row:bg-brand ${
                    i === last
                      ? "border-brand-dark bg-brand-dark"
                      : "border-ink/30 bg-paper"
                  }`}
                />
              </div>

              <div
                className={`flex flex-col gap-5 rounded-xl2 p-6 md:flex-row md:items-center md:gap-7 md:p-7 ${layer.plate}`}
              >
                <div className="shrink-0 md:w-28">
                  <h3 className="text-lg font-black">{layer.name}</h3>
                  <p className={`mt-1 text-xs ${layer.sub}`}>{layer.note}</p>
                </div>

                <span
                  aria-hidden="true"
                  className={`hidden w-px self-stretch md:block ${layer.rule}`}
                />

                <ul className="flex flex-wrap gap-x-7 gap-y-5">
                  {layer.tools.map((tool) => (
                    <li key={tool.name} className="group/tool max-w-[9rem]">
                      <span
                        dir="ltr"
                        className="relative inline-block text-xl font-black tracking-tight md:text-2xl"
                      >
                        {tool.name}
                        {/* الخط المتعرّج بتاع الموقع بيظهر تحت الأداة عند المرور */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 -bottom-2 opacity-0 transition-opacity duration-200 group-hover/tool:opacity-100"
                        >
                          <SquiggleUnderline color={layer.squiggle} />
                        </span>
                      </span>
                      <p className={`mt-2.5 text-xs leading-relaxed ${layer.sub}`}>
                        {tool.role}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}