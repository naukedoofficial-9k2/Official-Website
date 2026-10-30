import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    // Stops hover styles sticking after a tap on touch screens
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D70406",
          "red-hover": "#B50305",
          ink: "#141414",
          cream: "#FAF5EE",
          white: "#FFFFFF",
          warmgrey: "#6B635D",
          border: "#E8E1D7",
          "border-dark": "#262626",
          surface: "#F4ECE1",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      borderRadius: {
        "20": "20px",
        "brand": "20px",
      },
      boxShadow: {
        sticker: "0 4px 14px rgba(215, 4, 6, 0.25)",
        card: "0 10px 30px -10px rgba(20, 20, 20, 0.08)",
        "card-hover": "0 20px 40px -12px rgba(20, 20, 20, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
