/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Theme toggle drives `data-theme`, so dark: variants follow the app theme.
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      boxShadow: {
        lux: '0 10px 30px -10px rgba(20, 20, 19, 0.05), 0 2px 6px -1px rgba(20, 20, 19, 0.02)',
        'lux-lg': '0 24px 50px -12px rgba(20, 20, 19, 0.09), 0 8px 16px -4px rgba(20, 20, 19, 0.03)'
      },
      colors: {
        canvas: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          subtle: 'var(--surface-subtle)'
        },
        line: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border-subtle)'
        },
        ink: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          secondary: 'var(--accent-secondary)',
          contrast: 'var(--accent-contrast)'
        }
      },
      fontFamily: {
        display: ['Archivo Black', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      letterSpacing: {
        editorial: '0.18em'
      }
    }
  },
  plugins: []
};
