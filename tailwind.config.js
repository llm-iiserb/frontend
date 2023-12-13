/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif' : ["Roboto Slab", "Georgia"],
        'sans' : ["Noto Sans", "Arial"]
      }
    },
  },
  plugins: [],
}

