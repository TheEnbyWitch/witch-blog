/** @type {import('tailwindcss').Config} */
module.exports = {
  //darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        "prose-screen": "65ch",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
