/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: '#05010F',
        nebula: '#7B2FBE',
        cyan: '#00D4FF',
        glow: '#00FFF0',
        violet: '#9B5FE3',
        hero: '#C77DFF',
        gold: '#FFD700',
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
