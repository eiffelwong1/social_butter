import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-yellow': '#FFD700',
        'sec-yellow': '#E57300',
        'accent': '#FF5733',
        'bg': '#F5F5F5',
        'text': '#333',
        'neutral': '#CCC',
        'neutral-dark': '#666'
      }
    }
  },
  plugins: []
} satisfies Config
