/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF7F1',
        blush: '#F4DEDA',
        champagne: '#EBDCC2',
        sand: '#F0E8DC',
        rose: '#B97F82',
        lilac: '#E6E0F0',
        gold: '#A9884A',
        plum: '#4B3A3F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      boxShadow: { soft: '0 18px 50px -24px rgba(75,58,63,0.35)' },
    },
  },
  plugins: [],
}
