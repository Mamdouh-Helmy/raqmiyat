// أيقونات مرسومة على شبكة مثلثات ومعينات (زخرفة نجدية / سدو)
// stroke مربّع + زوايا حادة + عنصر واحد بلون الرمل في كل أيقونة
const SAND = "#c9a66b";

const Svg = ({ children, ...p }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    aria-hidden="true"
    {...p}
  >
    {children}
  </svg>
);

export const IconPlan = (p) => (
  <Svg {...p}>
    <path d="M16 3 29 16 16 29 3 16Z" />
    <path d="M16 10 22 20H10Z" />
    <path d="M16 22l2 2-2 2-2-2Z" fill={SAND} stroke="none" />
  </Svg>
);

export const IconCode = (p) => (
  <Svg {...p}>
    <path d="M11 8 3 16l8 8M21 8l8 8-8 8" />
    <path d="M18.5 7 13.5 25" stroke={SAND} />
  </Svg>
);

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M16 3 27 7v9c0 6-5 10-11 13C10 26 5 22 5 16V7Z" />
    <path d="M16 11l4.5 9h-9Z" fill={SAND} stroke="none" />
  </Svg>
);

export const IconSupport = (p) => (
  <Svg {...p}>
    <path d="M5 19v-5l4-9h14l4 9v5" />
    <path d="M5 17h4v8H5ZM23 17h4v8h-4Z" />
    <path d="M12 28h8" stroke={SAND} />
  </Svg>
);

export const IconChip = (p) => (
  <Svg {...p}>
    <path d="M8 8h16v16H8Z" />
    <path d="M12 3v5M20 3v5M12 24v5M20 24v5M3 12h5M3 20h5M24 12h5M24 20h5" />
    <path d="M16 12.5 19.5 16 16 19.5 12.5 16Z" fill={SAND} stroke="none" />
  </Svg>
);

export const IconLock = (p) => (
  <Svg {...p}>
    <path d="M6 14h20v14H6Z" />
    <path d="M10 14V9l6-5 6 5v5" />
    <path d="M14.5 19h3v4h-3Z" fill={SAND} stroke="none" />
  </Svg>
);

export const IconTeam = (p) => (
  <Svg {...p}>
    <path d="M16 3l5 5-5 5-5-5Z" />
    <path d="M4 28v-3l6-5 6 5 6-5 6 5v3Z" />
    <path d="M16 6.5 17.5 8 16 9.5 14.5 8Z" fill={SAND} stroke="none" />
  </Svg>
);

// شريط سدو: زجزاج مثلثات متكرر، يُستخدم كفاصل
export function SaduBand({ className = "", color = "%231c3b2e" }) {
  const svg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12'%3E%3Cpath d='M0 11 6 1 12 11 18 1 24 11' stroke='${color}' stroke-width='2' fill='none' stroke-linecap='square'/%3E%3C/svg%3E")`;
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height: "12px",
        backgroundImage: svg,
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 12px",
      }}
    />
  );
}

// الخط المتعرج الأصلي بتاعك: color بيتحط بصيغة URL-encoded (%23 بدل #)
export function SquiggleUnderline({ color = "%231c3b2e" }) {
  return (
    <div
      className="w-full -mt-0.5"
      style={{
        height: "8px",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='8' viewBox='0 0 24 8'%3E%3Cpath d='M0 4 Q6 -1 12 4 T24 4' stroke='${color}' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 8px",
      }}
    />
  );
}

// قص بزوايا مدرّجة (درج نجدي): خطوتين في كل ركن، بالبكسل عشان يثبت مهما كان الحجم
export const steppedClip = (S = 14) => `polygon(
  0 ${S * 2}px, ${S}px ${S * 2}px, ${S}px ${S}px, ${S * 2}px ${S}px, ${S * 2}px 0,
  calc(100% - ${S * 2}px) 0, calc(100% - ${S * 2}px) ${S}px, calc(100% - ${S}px) ${S}px, calc(100% - ${S}px) ${S * 2}px, 100% ${S * 2}px,
  100% calc(100% - ${S * 2}px), calc(100% - ${S}px) calc(100% - ${S * 2}px), calc(100% - ${S}px) calc(100% - ${S}px), calc(100% - ${S * 2}px) calc(100% - ${S}px), calc(100% - ${S * 2}px) 100%,
  ${S * 2}px 100%, ${S * 2}px calc(100% - ${S}px), ${S}px calc(100% - ${S}px), ${S}px calc(100% - ${S * 2}px), 0 calc(100% - ${S * 2}px)
)`;