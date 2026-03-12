/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF5F5",
          100: "#FFE3E3",
          200: "#FFC9C9",
          300: "#FFA8A8",
          400: "#FF8787",
          500: "#FF6B6B",
          600: "#FA5252",
          700: "#F03E3E",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans JP",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,.06)",
        "card-hover": "0 8px 24px rgba(0,0,0,.1)",
        float: "0 4px 16px rgba(0,0,0,.08)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
