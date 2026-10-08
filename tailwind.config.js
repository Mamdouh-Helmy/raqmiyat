/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1c3b2e",
          dark: "#132a20",
          light: "#3f6650",
          soft: "#eef2ee",
        },
        // اللون الدافئ الوحيد: للتفاصيل الصغيرة بس
        sand: {
          DEFAULT: "#c9a66b",
          deep: "#8a6a2f", // للنص (تباين أعلى على الخلفية الفاتحة)
        },
        ink: "#16241d",
        paper: "#f6f7f5",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "Tahoma", "Arial", "sans-serif"],
        heading: [
          "var(--font-arabic-heading)",
          "var(--font-arabic)",
          "Tahoma",
          "sans-serif",
        ],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        progress: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        fadeIn: "fadeIn 0.5s ease-out",
        progress: "progress 7s linear forwards",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};