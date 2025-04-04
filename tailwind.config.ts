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
