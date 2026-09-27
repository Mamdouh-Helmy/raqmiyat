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
        ink: "#16241d",
        paper: "#f6f7f5",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "sans-serif"],
        heading: ["var(--font-arabic-heading)", "sans-serif"],
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
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        fadeIn: "fadeIn 0.5s ease-out",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};