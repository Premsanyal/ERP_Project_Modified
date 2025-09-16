/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0c111d',
        primary: {
          DEFAULT: '#3b82f6', // Blue 500
          foreground: '#ffffff',
        },
        card: '#171e2c',
        'muted-foreground': '#94a3b8', // Slate 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}