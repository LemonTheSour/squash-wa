import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
      colors:{
        'gold': '#f0c200',
        'bright-gold': '#fad950',
        'dark-gold': '#d1a800',
        'shade':'#ebeae8'
      },
      borderWidth:{
        '1': '1px'
      }
    }
  },
  plugins: [],
};
export default config;
