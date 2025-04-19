/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',
        secondary: '#8A4FFF',
        accent: '#00E0FF',
        dark: '#121212',
        light: '#F5F5F5',
      },
      // Add this for gradient support
      backgroundImage: {
        'gradient-dark-to-black': 'linear-gradient(to bottom, #121212, #000000)',
      }
    },
  },
  plugins: [],
}