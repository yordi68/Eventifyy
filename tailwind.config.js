/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  darkMode: "class",
  theme: {
    screens: {
      xs: "321px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1080px",
      "2xl": "1281px",
      "3xl": "1536px",
      "4xl": "1649px",
      "4_2xl": "1880px",
      "5xl": "2048px",
    },

    extend: {
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#85f0ad",
          400: "#49df81",
          500: "#20c05c",
          600: "#15a44b",
          700: "#14813e",
          800: "#166535",
          900: "#14532d",
          950: "#052e16",
        },
        red: {
          50: "#fff0f0",
          100: "#ffdddd",
          200: "#ffc1c1",
          300: "#ff9595",
          400: "#ff5959",
          500: "#ff2525",
          600: "#ed0202",
          700: "#d50000",
          800: "#b00404",
          900: "#910b0b",
          950: "#500000",
        },
      },
    },
  },
  //   plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
