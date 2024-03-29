/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#161d2f",
        red: "#fc4747",
        BgBody: "#10141e",
        seeMore: "hsl(223 23% 46%/ 1)",
      },
    },
  },
  plugins: [],
};
