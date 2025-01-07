/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dblue":"#1c4670",
        "dyellow":"#ffa229",
        "dpurple":"#1d4771",
        "lgrey":"#fafafa",
        "lslate":"#2a303a",
        "lpink":"#e7d1c3",
        "lblue":"#c9ccd0"
      },
    },
  },
  plugins: [],
};
