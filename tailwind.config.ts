import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#1d4ed8", // Example: Blue in light mode
          dark: "#3b82f6", // Example: Lighter blue in dark mode
        },
        secondary: "#ffed4a",
        background: {
          light: "#ffffff",
          dark: "#121212",
        },
        text: {
          light: "#111827",
          dark: "#f9fafb",
        },
        danger: "#e3342f",
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
