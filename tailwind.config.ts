import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInFloat: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        fadeInFloat: 'fadeInFloat 3s ease-in-out infinite alternate',
        slideIn: 'slideIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
export default config 