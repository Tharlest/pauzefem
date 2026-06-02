/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#070A0F',
          800: '#0B0F17',
          700: '#111726',
          600: '#1A2233',
        },
        neon: {
          green: '#39FF8B',
          greenDim: '#1FB866',
          amber: '#FFC857',
          orange: '#FF9F45',
          red: '#FF5C6C',
        },
        haze: '#9AA7BD',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 24px rgba(57,255,139,0.35)',
        'neon-soft': '0 8px 40px rgba(0,0,0,0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '60%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 0 rgba(57,255,139,0)' },
          '50%': { boxShadow: '0 0 22px rgba(57,255,139,0.5)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pop': 'pop 0.35s ease-out both',
        'pulse-glow': 'pulse-glow 1.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
