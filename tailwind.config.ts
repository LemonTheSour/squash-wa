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
        'shade':'#ebeae8'
      }
    }
  },
  plugins: [],
};
export default config;
