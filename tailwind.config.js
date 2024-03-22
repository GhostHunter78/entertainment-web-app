/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { blue: "#161d2f", red: "#fc4747", BgBody: "#10141e" },
    },
  },
  plugins: [],
};
