/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    theme: {
      extend: {
        spacing: {
          30: "5.625rem",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
