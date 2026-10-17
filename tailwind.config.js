/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sora"', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', '"Sora"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#04060d',
          900: '#070b16',
          800: '#0b1120',
          700: '#121a2e',
          600: '#1b2740',
        },
        brand: {
          DEFAULT: '#38bdf8',
          50: '#eff9ff',
          100: '#def2ff',
          200: '#b6e7ff',
          300: '#75d5ff',
          400: '#2cc0ff',
          500: '#06aaf1',
          600: '#0087ce',
          700: '#016ba6',
          800: '#075a89',
          900: '#0c4a71',
        },
        violet: {
          glow: '#7c5cff',
        },
        mint: '#38f8c8',
        amber: {
          glow: '#ffb45c',
        },
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.18), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(56,189,248,0.55)',
        'glow-violet': '0 0 45px -12px rgba(124,92,255,0.6)',
        card: '0 24px 60px -30px rgba(2,6,23,0.9)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-26px,0) scale(1.04)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(38px, -46px) scale(1.12)' },
          '66%': { transform: 'translate(-28px, 26px) scale(0.92)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        caret: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: 0.7 },
          '80%, 100%': { transform: 'scale(1.6)', opacity: 0 },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        caret: 'caret 1s step-end infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
    },
  },
  plugins: [],
}
