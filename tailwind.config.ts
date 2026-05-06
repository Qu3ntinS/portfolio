import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  prefix: '',
  theme: {
    extend: {
      keyframes: {
        expandFromNavbar: {
          '0%':   { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        collapseToNavbar: {
          '0%':   { transform: 'scaleY(1)', opacity: '1' },
          '100%': { transform: 'scaleY(0)', opacity: '0' },
        },
        fadeInUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
      },
      animation: {
        expandFromNavbar: 'expandFromNavbar 0.3s ease-out forwards',
        collapseToNavbar: 'collapseToNavbar 0.3s ease-in forwards',
        fadeInUp:         'fadeInUp 0.4s ease-out both',
      },
      colors: {
        text: {
          DEFAULT: '#F7FAFD',
          light: '#020508',
        },
        background: {
          DEFAULT: '#000000',
          light: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#00AEFF',
        },
        secondary: {
          DEFAULT: '#0F0F0F',
          light: '#F0F0F0',
        },
        accent: {
          DEFAULT: '#7091A4',
          light: '#5B7CBF',
        },
      },
    },
  },
  plugins: [
    function({ addVariant }: { addVariant: (name: string, definition: string) => void }) {
      addVariant('light', '.light &')
    }
  ],
};

export default config;
