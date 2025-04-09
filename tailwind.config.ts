import type { Config } from "tailwindcss";

const palette = require("./palette.json");

export default {
  content: [
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
          primary: palette.colors.primary,  // Use as: bg-primary-light and dark:bg-primary-dark, etc.
          secondary: palette.colors.secondary,
          background: palette.colors.background,
          text: palette.colors.text,
          danger: palette.colors.danger,
          white: palette.colors.white,
          black: palette.colors.black,
          highlight: palette.colors.highlight,
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // preflight: false,
  },
} satisfies Config;
