import type { Config } from "tailwindcss"

export default <Config>{
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT:     "hsl(var(--primary) / <alpha-value>)",
          foreground:  "hsl(var(--primary-foreground) / <alpha-value>)",
          hover:       "hsl(var(--color-primary-hover) / <alpha-value>)",
        },

        secondary: {
          DEFAULT:     "hsl(var(--secondary) / <alpha-value>)",
          foreground:  "hsl(var(--secondary-foreground) / <alpha-value>)",
          hover:       "hsl(var(--color-secondary-hover) / <alpha-value>)",
        },

        muted: {
          DEFAULT:     "hsl(var(--muted) / <alpha-value>)",
          foreground:  "hsl(var(--muted-foreground) / <alpha-value>)",
        },

        accent: {
          DEFAULT:     "hsl(var(--accent) / <alpha-value>)",
          foreground:  "hsl(var(--accent-foreground) / <alpha-value>)",
        },

        destructive: {
          DEFAULT:     "hsl(var(--destructive) / <alpha-value>)",
          foreground:  "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        border: "hsl(var(--border) / <alpha-value>)",
      },

      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },

      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
