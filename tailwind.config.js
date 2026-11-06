/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emerald-deep': '#005d4b',
        'fresh-mint': '#a2e4b8',
      },
      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}