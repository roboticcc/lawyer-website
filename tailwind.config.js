/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2efe8',
          100: '#e7dfd2',
          200: '#d5c7b5',
          300: '#c2ae95',
          400: '#b39d81',
          500: '#ac987e',
          600: '#8f795e',
          700: '#735f48',
          800: '#5a4a39',
          900: '#44372c',
        },
        secondary: {
          500: '#ac987e',
          600: '#8f795e',
        },
        tertiary: {
          500: '#f2efe8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Iowan Old Style', 'Baskerville', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
}
