/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redTheme: '#E60023',
        grayTheme: '#E6E6E6'
      }
    },
  },
  plugins: [],
}