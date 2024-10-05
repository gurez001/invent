import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");
const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',   // Small devices (portrait phones)
        'md': '768px',   // Medium devices (landscape tablets)
        'lg': '1024px',  // Large devices (desktops)
        'xl': '1280px',  // Extra large devices (large desktops)
        '2xl': '1536px', // 2x extra large devices (very large desktops)
        '900px': '900px', // Custom breakpoint at 900px
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark_color: "#ef4444",
        light_color: "#1f1228",
        dark50:'#27272a' // page header
      },
      fontSize: {
        'xxs': '0.625rem',  // Custom size: 10px
        'xs': '0.75rem',    // Tailwind default: 12px
        'sm': '0.875rem',   // Tailwind default: 14px
        'base': '1rem',     // Tailwind default: 16px
        'lg': '1.125rem',   // Tailwind default: 18px
        'xl': '1.25rem',    // Tailwind default: 20px
        '2xl': '1.5rem',    // Tailwind default: 24px
        '3xl': '1.875rem',  // Tailwind default: 30px
        'custom-lg': '2.5rem', // Custom large size
      },
      borderColor: {
        light_color: "#000",  // Custom border color for light mode
        dark_color: "#ef4444",   // Custom border color for dark mode
      
      },
    },
  },
  darkMode: "class",
  plugins: [ nextui({
    layout: {
      disabledOpacity: "0.3",
      radius: {
        small: "2px",
        medium: "4px",
        large: "6px",
      },
      borderWidth: {
        small: "1px",
        medium: "1px",
        large: "2px",
      },
    },
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        },
      },
      dark: {
        colors: {
          background: "#1f1228",
          foreground: "#ECEDEE",
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#006FEE",
          },
        },
      },
      mytheme: {
        extend: "dark",
        colors: {
          primary: {
            DEFAULT: "#BEF264",
            foreground: "#000000",
          },
          focus: "#BEF264",
        },
      },
    },
  }),],
};
export default config;
