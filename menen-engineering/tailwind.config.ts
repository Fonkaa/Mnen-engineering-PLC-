import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Luxury Palette Tokens (Mapped via CSS Variables)
        luxury: {
          bg: "var(--theme-bg)",
          surface: "var(--theme-surface)",
          card: "var(--theme-card)",
          border: "var(--theme-border)",
          accent: "var(--theme-accent)",
          accentHover: "var(--theme-accent-hover)",
          gold: "#D4AF37",
          bronze: "#CD7F32",
          text: {
            primary: "var(--theme-text-primary)",
            secondary: "var(--theme-text-secondary)",
            muted: "var(--theme-text-muted)",
          }
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;