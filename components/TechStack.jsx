// components/TechStack.jsx  (Server Component — مفيش JS إضافي)
import { SquiggleUnderline } from "./SquiggleUnderline";

// الترتيب من اللي المستخدم بيشوفه لحد البيانات والبنية
const layers = [
  {
    name: "الواجهة",
    note: "ما يراه المستخدم",
    tools: [
      { name: "React", role: "بناء الواجهات التفاعلية" },
      { name: "Next.js", role: "سرعة وظهور في محركات البحث" },
      { name: "Tailwind CSS", role: "تصميم متناسق ومتجاوب" },
      { name: "Flutter", role: "تطبيقات موبايل بكود واحد" },
      { name: "React Native", role: "تطبيقات أصلية لأندرويد وآيفون" },
      { name: "Framer Motion", role: "حركات وانتقالات سلسة" },
      { name: "Figma", role: "تصميم الواجهات قبل البرمجة" },
    ],
  },
  {
    name: "الخادم",
    note: "المنطق والأمان",
    tools: [
      { name: "Node.js", role: "تشغيل منطق النظام على الخادم" },
      { name: "Express.js", role: "واجهات API سريعة وواضحة" },
      { name: "NestJS", role: "هيكلة منظمة للأنظمة الكبيرة" },
      { name: ".NET", role: "أنظمة مؤسسية قوية وآمنة" },
      { name: "TypeScript", role: "كود أدق وأخطاء أقل" },
      { name: "Python", role: "أتمتة وذكاء اصطناعي وتحليل بيانات" },
      { name: "GraphQL", role: "جلب البيانات المطلوبة فقط" },
    ],
  },
  {
    name: "البيانات",
    note: "التخزين والاستعلام",
    tools: [
      { name: "PostgreSQL", role: "قاعدة بيانات علائقية موثوقة" },
      { name: "MongoDB", role: "تخزين مرن لبياناتك" },
      { name: "MySQL", role: "قاعدة بيانات مستقرة وواسعة الدعم" },
      { name: "Redis", role: "تخزين مؤقت لسرعة فائقة" },
      { name: "Prisma", role: "تعامل آمن ومنظم مع قاعدة البيانات" },
      { name: "Firebase", role: "بيانات لحظية وإشعارات فورية" },
    ],
  },
  {
    name: "البنية",
    note: "الاستضافة والنشر",
    tools: [
      { name: "Docker", role: "بيئة تشغيل موحدة وثابتة" },
      { name: "AWS", role: "استضافة سحابية قابلة للتوسع" },
      { name: "Vercel", role: "نشر فوري وسريع للواجهات" },
      { name: "Nginx", role: "توزيع الأحمال وحماية الخادم" },
      { name: "GitHub Actions", role: "نشر واختبار تلقائي مع كل تحديث" },
    ],
  },
];

// شبكة معيّنات خفيفة جداً للخلفية
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 4 52 28 28 52 4 28Z' fill='none' stroke='%23c9a66b' stroke-opacity='0.1'/%3E%3C/svg%3E\")";

const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const countLabel = (n) =>
  `${toAr(n)} ${n === 1 ? "أداة" : n === 2 ? "أداتان" : n <= 10 ? "أدوات" : "أداة"}`;

const outline = { WebkitTextStroke: "1.2px rgba(255,255,255,0.55)" };

export default function TechStack() {
  return (
    <section className="container-x section">
      <div className="relative isolate overflow-hidden rounded-xl2 bg-brand-dark px-6 py-14 text-white md:px-14 md:py-20">
        {/* الخلفية */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: lattice,
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(ellipse at top right, #000 0%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at top right, #000 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -start-20 -z-10 h-80 w-[32rem] max-w-full rounded-full bg-sand/15 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-sand/80 to-transparent"
        />

        {/* العنوان */}
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="size-2 rotate-45 bg-sand" aria-hidden="true" />
              <span className="text-xs font-bold tracking-widest text-sand">أدواتنا</span>
            </div>
            <div className="inline-block">
              <h2 className="text-3xl font-black leading-[1.3] md:text-5xl">
                نختار الأداة للمشروع، لا العكس
              </h2>
              <SquiggleUnderline color="white" />
            </div>
          </div>
          <p className="leading-loose text-white/60 md:col-span-4 md:border-s-2 md:border-sand/60 md:ps-6">
            هذه أدواتنا الأساسية. وإن احتاج مشروعك غيرها، نستخدمها.
          </p>
        </div>

        {/* الطبقات */}
        <ol>
          {layers.map((layer, i) => (
            <li
              key={layer.name}
              className="group/layer relative grid gap-6 border-t border-white/15 py-9 md:grid-cols-[11rem_1fr] md:gap-10 md:py-12"
            >
              {/* خط ذهبي بيترسم فوق الصف */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-px origin-right scale-x-0 bg-gradient-to-l from-sand via-sand/60 to-transparent transition-transform duration-1000 ease-out group-hover/layer:scale-x-100 motion-reduce:transition-none"
              />

              {/* بطاقة الطبقة */}
              <div className="flex items-start gap-4 md:flex-col md:gap-3">
                <span
                  aria-hidden="true"
                  className="select-none font-heading text-5xl leading-none text-transparent opacity-60 transition-opacity duration-500 group-hover/layer:opacity-100 md:text-6xl"
                  style={{ WebkitTextStroke: "1px rgba(201,166,107,0.8)" }}
                >
                  {toAr(String(i + 1).padStart(2, "0"))}
                </span>
                <div>
                  <h3 className="text-xl font-black text-sand">{layer.name}</h3>
                  <p className="mt-1 text-xs text-white/50">{layer.note}</p>
                  <p className="mt-3 text-[11px] font-bold tracking-wider text-white/30">
                    {countLabel(layer.tools.length)}
                  </p>
                </div>
              </div>

              {/* الأدوات */}
              <ul className="flex flex-wrap gap-x-12 gap-y-6 md:gap-x-16 md:gap-y-8 [&:hover>li:not(:hover)]:opacity-40">
                {layer.tools.map((tool, j) => (
                  <li
                    key={tool.name}
                    className="group/tool relative max-w-full pb-4 pt-5 transition-opacity duration-500 motion-reduce:transition-none"
                  >
                    {/* رقم الأداة */}
                    <span
                      aria-hidden="true"
                      className="absolute end-0 top-0 text-[10px] font-bold tracking-widest text-white/25 transition-colors duration-500 group-hover/tool:text-sand"
                    >
                      {toAr(String(j + 1).padStart(2, "0"))}
                    </span>

                    {/* الاسم: مفرغ، وتعبئة ذهبية بتمسح من الشمال لليمين */}
                    <span
                      dir="ltr"
                      className="block cursor-default bg-gradient-to-r from-sand via-[#e8cf9d] to-sand bg-left bg-no-repeat bg-clip-text text-4xl font-black leading-none tracking-tight text-transparent transition-[background-size] duration-700 ease-out [background-size:0%_100%] group-hover/tool:[background-size:100%_100%] sm:text-5xl md:text-6xl lg:text-7xl [@media(hover:none)]:text-white/90 motion-reduce:transition-none"
                      style={outline}
                    >
                      {tool.name}
                    </span>

                    <p className="mt-4 flex max-w-[17rem] items-start gap-2 text-sm leading-relaxed text-white/45 transition-all duration-500 group-hover/tool:translate-x-[-6px] group-hover/tool:text-white motion-reduce:transition-none">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] size-1 shrink-0 rotate-45 bg-sand/50 transition-colors duration-500 group-hover/tool:bg-sand"
                      />
                      {tool.role}
                    </p>

                    {/* خط ذهبي بيتمدّد تحت الأداة */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-sand transition-transform duration-700 ease-out group-hover/tool:scale-x-100 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[3px] end-0 size-1.5 rotate-45 scale-0 bg-sand transition-transform duration-500 group-hover/tool:scale-100 motion-reduce:transition-none"
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div aria-hidden="true" className="border-t border-white/15" />
      </div>
    </section>
  );
}