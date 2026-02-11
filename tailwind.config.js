/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#32C36C",
        dark: "#1A2A36",
        light: "#F6F7F8",
      },
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        heading: ["Roboto", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 0 45px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [],
};
