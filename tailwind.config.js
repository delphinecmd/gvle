/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // optional: for dark mode switching
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",      // App Router
    "./src/pages/**/*.{js,ts,jsx,tsx}",    // Optional if you're mixing routing
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/landing/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
