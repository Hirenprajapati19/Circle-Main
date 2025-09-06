/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'el-blue': {
          50: '#e6f9ff',
          100: '#b3f0ff',
          200: '#80e7ff',
          300: '#4ddeff',
          400: '#1ad5ff',
          500: '#00AEEF', // Primary
          600: '#0098d4',
          700: '#0082b8',
          800: '#006c9c',
          900: '#005680',
        },
      },
      boxShadow: {
        'el-glow': '0 0 20px rgba(0, 174, 239, 0.3)',
        'el-glow-lg': '0 0 40px rgba(0, 174, 239, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      lineHeight: {
        'body': '1.5',
        'heading': '1.2',
      },
    },
  },
  plugins: [],
}