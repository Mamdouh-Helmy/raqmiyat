// components/TechStack.jsx
const layers = [
  {
    name: "الواجهة",
    note: "ما يراه المستخدم",
    tools: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    name: "الخادم",
    note: "المنطق والأمان",
    tools: ["Node.js", "TypeScript"],
  },
  {
    name: "البيانات",
    note: "التخزين والاستعلام",
    tools: ["MongoDB"],
  },
];

export default function TechStack() {
  return (
    <section className="container-x pb-4 md:pb-8">
      <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-6 md:gap-16 items-center py-8">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-ink leading-snug mb-2">
            نختار الأداة للمشروع، لا العكس
          </h2>
          <p className="text-ink/50 text-sm leading-relaxed max-w-xs">
            هذه أدواتنا الأساسية. وإن احتاج مشروعك غيرها، نستخدمها.
          </p>
        </div>

        <div className="border-t border-ink/10">
          {layers.map(({ name, note, tools }) => (
            <div
              key={name}
              className="group flex items-baseline gap-4 py-5 border-b border-ink/10"
            >
              <div className="w-28 shrink-0">
                <div className="font-black text-ink text-sm">{name}</div>
                <div className="text-ink/40 text-[11px] mt-0.5">{note}</div>
              </div>

              <span
                aria-hidden
                className="flex-1 border-b border-dashed border-ink/15 -translate-y-1"
              />

              <div
                dir="ltr"
                className="flex flex-wrap items-center gap-x-3 text-lg md:text-xl font-bold text-ink"
              >
                {tools.map((tool, i) => (
                  <span key={tool} className="flex items-center gap-3">
                    {i > 0 && <span className="text-brand/40">/</span>}
                    <span className="transition-colors duration-200 group-hover:text-brand">
                      {tool}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}