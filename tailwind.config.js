/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FDFCF7',
          100: '#FAF8F2',
          200: '#F4EFE6',
          300: '#E9E0D1',
          400: '#D5C4AC',
          900: '#2A251D',
        },
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          600: '#203A43',
          700: '#152A38',
          800: '#0F1E2E',
          900: '#0B192C',
          950: '#050D17',
        },
        electric: {
          DEFAULT: '#FFD200',
          50: '#FFFBEA',
          100: '#FFF4C5',
          200: '#FFE785',
          300: '#FFD946',
          400: '#FFD200',
          500: '#F59E0B',
          600: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
