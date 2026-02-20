import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          gold: "#C5A059",
          black: "#1A1A1A",
          cream: "#FAFAFA",
          silver: "#A3A3A3",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Montserrat", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.3em",
        luxe: "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
