import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1476px',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-red-hat-display)"]
      },
      colors: {
        primary: {
          50: '#f2f9f6',
          100: '#e0f1ea',
          200: '#c1e3d6',
          300: '#94ccb9',
          400: '#68b09a',
          500: '#4a9480',
          600: '#3b7868',
          700: '#336256',
          800: '#2c4f47',
          900: '#25413c',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#939393',
          600: '#6e6e6e',
          700: '#525252',
          800: '#393939',
          900: '#212121',
        },
      },
      borderRadius: {
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
