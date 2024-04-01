import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
		colors: {
			"lovely-yellow": "#fdca5d",
			"contact-dark-blue": "#14161e",
		},
      backgroundImage: {
		/* "contact-pattern": "url('/images/logo.svg)" */
      },
    },
  },
  plugins: [],
};
export default config;
