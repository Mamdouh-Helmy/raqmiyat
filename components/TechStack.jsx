// components/TechStack.jsx
const stack = [
  { name: "React", color: "bg-sky-400" },
  { name: "Next.js", color: "bg-neutral-800" },
  { name: "Node.js", color: "bg-emerald-500" },
  { name: "TypeScript", color: "bg-blue-500" },
  { name: "MongoDB", color: "bg-green-600" },
  { name: "Tailwind CSS", color: "bg-cyan-400" },
];

export default function TechStack() {
  return (
    <section className="container-x pb-4 md:pb-6">
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 py-6">
        <div className="flex items-center gap-3 shrink-0">
          <span className="w-8 h-0.5 bg-brand/30 hidden md:block" />
          <span className="text-ink/50 text-xs font-bold uppercase tracking-wide">
            نعمل بأحدث التقنيات
          </span>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
          {stack.map(({ name, color }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 text-xs font-bold text-ink/70 bg-white border border-ink/10 px-4 py-2 rounded-full hover:border-brand/30 hover:text-ink transition-colors"
            >
              <span className={`w-2 h-2 rounded-full ${color}`} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}