/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0c111d', // Main background
        'sidebar': '#111827', // Sidebar and Header background
        'card': '#1c2436',     // Card background
        'border': '#334155',   // Border color
        'primary': '#3b82f6', // Blue
        'accent-violet': '#8b5cf6', // Violet/Purple
        'accent-yellow': '#f59e0b', // Amber/Yellow
        'accent-pink': '#ec4899', // Pink
        'accent-green': '#10b981', // Green
        'muted-foreground': '#94a3b8', // Slate 400 for text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};