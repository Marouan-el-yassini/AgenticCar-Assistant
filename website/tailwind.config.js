/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0E14',
        surface: 'rgba(11, 14, 20, 0.7)',
        primary: '#10b981', // emerald-500
        secondary: '#059669', // emerald-600
        accent: '#34d399', // emerald-400
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #10b98155 0deg, #0B0E14 180deg, #10b98155 360deg)',
      },
    },
  },
  plugins: [],
}
