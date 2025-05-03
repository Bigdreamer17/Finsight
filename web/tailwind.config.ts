import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "bottom-left": "-6px 6px 15px rgba(0, 0, 0, 0.2)", // Shifted left (-X) and down (+Y)
        "bottom-left-lg": "-10px 10px 30px rgba(0, 0, 0, 0.3)", // More pronounced bottom-left shadow
      },
      colors: {
        surface: "var(--surface)",
        surfaceHigher: "var(--surface-higher)",
        surfaceHigherHover: "var(--surface-higher-hover)",
        onSurfaceDimmed: "var(--on-surface-dimmed)",
        customGray: "var(--custom-gray)",
        customBlue: "var(--custom-blue)",
        customRed: "var(--custom-red)",
        markBg: "var(--mark-bg)",
        paragraphBg: "var(--paragraph-bg)",
        surfaceBase: "var(--surface-base)",
        surfaceBaseLighter: "var(--surface-base-lighter)",
        surfaceBorder: "var(--surface-border)",
        surfaceBorderFocus: "var(--surface-border-focus)",
        surfacePrimary: "var(--surface-primary)",
        surfaceGreen: "var(--surface-green)",
        surfaceGreenHover: "var(--surface-green-hover)",
        surfaceGreenSecondary: "var(--surface-green-secondary)",
        badgeGreen: "var(--badgeGreen)",
        badgeYellow: "var(--badgeYellow)",
        badgeRed: "var(--badgeRed)",
      },
    },
  },
  plugins: [lineClamp],
} satisfies Config;

export default config;
