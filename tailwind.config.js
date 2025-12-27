/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0E0E0E',
        'stone-gray': '#2A2A2A',
        'concrete': '#3A3A3A',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'wide': '0.1em',
      }
    },
  },
  plugins: [],
}


