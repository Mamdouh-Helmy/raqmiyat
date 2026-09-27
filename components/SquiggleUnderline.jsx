// components/SquiggleUnderline.jsx
export function SquiggleUnderline({ color = "brand" }) {
  const fill = color === "white" ? "%23ffffff" : "%231c3b2e";
  return (
    <div
      className="w-full -mt-0.5"
      style={{
        height: "8px",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='8' viewBox='0 0 24 8'%3E%3Cpath d='M0 4 Q6 -1 12 4 T24 4' stroke='${fill}' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "24px 8px",
        opacity: color === "white" ? 0.8 : 1,
      }}
    />
  );
}