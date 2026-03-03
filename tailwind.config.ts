import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F0EB',
        ink: '#1C1C1B',
        forest: '#2A382E',
        clay: '#C9A690',
        stone: '#D0DCD9',
        highlight: '#D4E157',
      },
      fontFamily: {
        heading: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1C1C1B',
            '--tw-prose-headings': '#2A382E',
            '--tw-prose-links': '#2A382E',
            '--tw-prose-code': '#2A382E',
            maxWidth: 'none',
            h1: { fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: '600' },
            h2: { fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: '600' },
            h3: { fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: '600' },
            h4: { fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: '600' },
            code: {
              backgroundColor: '#F2F0EB',
              padding: '0.15rem 0.35rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: '#1C1C1B',
              color: '#F2F0EB',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
