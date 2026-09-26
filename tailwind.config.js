/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FBF1E6",
        band: "#F3E3D3",
        ink: "#2B1A12",
        muted: "#7A6455",
        brown: "#6B3F2A",
        accent: "#F08A4B",
        line: "#E6D2BF",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Nunito Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
