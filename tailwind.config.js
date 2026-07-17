/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#141018',
          soft: '#2b2733',
        },
        parchment: {
          DEFAULT: '#f7f4ee',
          dark: '#ece7dc',
        },
        brass: {
          DEFAULT: '#b08d57',
          dark: '#8a6d3f',
        },
        cosmos: {
          DEFAULT: '#1a1830',
          light: '#2d2a4a',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        exhibit: '72rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}