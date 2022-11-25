/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
      },
      boxShadow: {
        "inner-md": "inset 1px 4px 6px 0 rgb(0 0 0 / 0.1)",
        "inner-md-2": "inset 2px 2px 6px 0 rgb(0 0 0 / 0.15)",
        "inner-md-3": "inset 2px 4px 6px 0 rgb(0 0 0 / 0.21)",
        "inner-md-4": "inset 2px 4px 10px 0 rgb(0 0 0 / 0.28)",
        "inner-lg": "inset 4px 5px 7px 0 rgb(0 0 0 / 0.2)",
        "inner-xl": "inset 4px 9px 9px 0 rgb(0 0 0 / 0.3)",
        "inner-2xl": "inset 4px 11px 12px 0 rgb(0 0 0 / 0.3)",
      },
      fontFamily: {
        opensans: ['"Open Sans"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        mono: ['"Roboto Mono"', "monospace"],
        raleway: ['"Raleway"', "sans-serif"],
        roboto: ['"Roboto"'],
      },
    },
  },
  plugins: [],
};
