/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{App,components,hooks,services,pages}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      keyframes: {
        pulse_slow: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '0.6', transform: 'scale(1)' },
        },
        pulse_fast: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'antenna-pulse': {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 1, filter: 'brightness(1.5)' },
        },
        'eye-blink': {
            '0%, 90%, 100%': { transform: 'scaleY(1)' },
            '95%': { transform: 'scaleY(0.1)' },
        },
        'head-tilt': {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(-3deg)' },
            '75%': { transform: 'rotate(3deg)' },
        },
        'error-shake': {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        'chest-pulse': {
            '0%, 100%': { opacity: 0.6 },
            '50%': { opacity: 1 },
        }
      },
      animation: {
        'pulse-slow': 'pulse_slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse_fast 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-fast': 'spin 1.5s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'antenna-pulse': 'antenna-pulse 2.5s ease-in-out infinite',
        'eye-blink': 'eye-blink 5s ease-in-out infinite',
        'head-tilt': 'head-tilt 2s ease-in-out infinite',
        'error-shake': 'error-shake 0.5s linear infinite',
        'chest-pulse': 'chest-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
