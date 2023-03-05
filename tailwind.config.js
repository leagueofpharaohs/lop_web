/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ff6e2f",
        },
        secondary: {
          100: "#6c5dd3",
        },
        layout: {
          100: "#FFFFFF",
          200: "#fcfdfd",
          600: "#334155",
          700: "#0f172a",
          800: "#1e2128",
          900: "#000000",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        aclonica: ["Aclonica", "sans-serif"],
      },
      screens: {
        xs: {min: "360px", max: "639px"},
        xsm: {min: "450px", max: "639px"},
      },
    },
  },
  plugins: [require("tailwindcss-neumorphism")],
}
