/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          100: "hsla(0, 0%, 100%, 1)",
        },
      },
    },
  },
  plugins: [],
};
