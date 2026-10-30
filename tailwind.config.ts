import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'),
        'accent-fg': token('accent-fg'),
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.045em' },
      maxWidth: { container: '1280px' },
      keyframes: {
        'grid-pulse': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        blink: { '50%': { opacity: '0' } },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'dot-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgb(var(--accent) / 0.55)' },
          '100%': { boxShadow: '0 0 0 14px rgb(var(--accent) / 0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'spin-reverse': { to: { transform: 'rotate(-360deg)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        orbit: 'spin-slow 36s linear infinite',
        'orbit-reverse': 'spin-reverse 36s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'grid-pulse': 'grid-pulse 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        blink: 'blink 1s step-end infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
