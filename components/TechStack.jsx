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
    dark: false,
    badge: "border-[#c9a66b]/60 bg-white text-brand-dark",
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
    dark: false,
    badge: "border-[#c9a66b]/60 bg-white text-brand-dark",
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
    dark: true,
    badge: "border-[#c9a66b] bg-[#c9a66b] text-brand-dark",
    tools: [
      { name: "PostgreSQL", role: "قاعدة بيانات علائقية موثوقة" },
      { name: "MongoDB", role: "تخزين مرن لبياناتك" },
    ],
  },
];

// شبكة معيّنات السدو، بتظهر بس على طبقة البيانات الغامقة
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.16'/%3E%3C/svg%3E\")";

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

export default function TechStack() {
  const last = layers.length - 1;

  return (
    <section className="container-x section">
      <div className="grid grid-cols-1 lg:grid-cols-[0.5fr_1.5fr] gap-10 lg:gap-16 items-center">
        {/* الجانب الثابت */}
        <div className="lg:sticky lg:top-10 self-start lg:self-center">
          <div className="flex items-center gap-3 mb-5">
            <span className="size-2 rotate-45 bg-[#c9a66b]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest text-[#a98445]">
              أدواتنا
            </span>
          </div>

          <div className="inline-block mb-5">
            <h2 className="text-2xl md:text-4xl font-black text-ink leading-[1.3]">
              نختار الأداة للمشروع، لا العكس
            </h2>
            <SquiggleUnderline />
          </div>

          <p className="text-ink/60 leading-relaxed max-w-xs">
            هذه أدواتنا الأساسية. وإن احتاج مشروعك غيرها، نستخدمها.
          </p>

          {/* شريط معيّنات زخرفي */}
          <div className="mt-8 flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="size-3 rotate-45 border border-[#c9a66b]"
                style={{
                  backgroundColor: i === 0 ? "#c9a66b" : "transparent",
                  opacity: 1 - i * 0.17,
                }}
              />
            ))}
          </div>
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
                  className={`absolute left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-[#c9a66b]/60 ${
                    i === 0
                      ? "top-1/2 bottom-0"
                      : i === last
                      ? "-top-2.5 bottom-1/2"
                      : "-top-2.5 bottom-0"
                  }`}
                />
                {/* العقدة معيّن بدل الدايرة */}
                <span
                  className={`absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 transition-all duration-300 group-hover/row:rotate-[135deg] group-hover/row:border-[#c9a66b] group-hover/row:bg-[#c9a66b] ${
                    i === last
                      ? "border-brand-dark bg-brand-dark"
                      : "border-[#c9a66b] bg-paper"
                  }`}
                />
              </div>

              <div
                className={`relative isolate overflow-hidden flex flex-col gap-5 rounded-xl2 p-6 md:flex-row md:items-center md:gap-7 md:p-7 transition-shadow duration-300 group-hover/row:shadow-lg ${layer.plate}`}
              >
                {/* خط ذهبي علوي */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#c9a66b]/70 to-transparent"
                />

                {/* زخرفة السدو على الطبقة الغامقة بس */}
                {layer.dark && (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10"
                      style={{
                        backgroundImage: lattice,
                        backgroundSize: "56px 56px",
                        WebkitMaskImage:
                          "linear-gradient(to left, #000 0%, transparent 70%)",
                        maskImage:
                          "linear-gradient(to left, #000 0%, transparent 70%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -top-16 -right-16 -z-10 size-48 rounded-full bg-[#c9a66b]/15 blur-3xl"
                    />
                  </>
                )}

                {/* اسم الطبقة + رقمها في معيّن */}
                <div className="flex shrink-0 items-center gap-4 md:w-40">
                  <span className="relative grid size-10 shrink-0 place-items-center">
                    <span
                      className={`absolute size-7 rotate-45 rounded-[4px] border transition-transform duration-500 group-hover/row:rotate-[135deg] ${layer.badge}`}
                    />
                    <span
                      className={`relative font-heading text-sm leading-none ${
                        layer.dark ? "text-brand-dark" : "text-brand-dark"
                      }`}
                    >
                      {toAr(i + 1)}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-lg font-black">{layer.name}</h3>
                    <p className={`mt-1 text-xs ${layer.sub}`}>{layer.note}</p>
                  </div>
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