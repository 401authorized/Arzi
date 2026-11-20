/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        municipal: {
          bg: '#F6F3EC',
          paper: '#FFFFFF',
          surface: '#EFECE4',
          'surface-subtle': '#FAF8F5',
          text: '#23211C',
          // High-contrast WCAG AA verified muted text (> 5.5:1 on warm off-white and white)
          'text-muted': '#4F4A42',
          'text-faint': '#565147',
          border: '#D8D1C5',
          'border-strong': '#8C8578',
          'border-light': '#E7E2D7',
          
          // Primary Deep Pine Green (Contrast 5.8:1 with white text)
          primary: '#2F5D50',
          'primary-hover': '#244A40',
          'primary-active': '#1C3A32',
          'primary-tint': '#E8EFEA',
          'primary-tint-border': '#CAD8D0',
          
          // Urgent / Reopened Muted Terracotta Accent (Used ONLY for urgent or reopened states, 4.9:1 with white)
          terracotta: '#A94B30',
          'terracotta-hover': '#8F3D25',
          'terracotta-tint': '#FAEEEA',
          'terracotta-border': '#E4C1B6',
          'terracotta-text': '#8F3D25',
          
          // Soft Sage for Success (4.7:1 with white)
          sage: '#3B6A56',
          'sage-hover': '#2F5444',
          'sage-tint': '#EBF2EE',
          'sage-border': '#C3D7CD',
          'sage-text': '#2A5040',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Public Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        base: ['17px', { lineHeight: '1.65' }],
        sm: ['15px', { lineHeight: '1.5' }],
        xs: ['13px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        civic: '4px',
        'civic-md': '6px',
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
    },
  },
  plugins: [],
};
