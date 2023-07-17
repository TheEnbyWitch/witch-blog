/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;
const { parseColor } = require("tailwindcss/lib/util/color");

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
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => {
            const { mode, color, alpha } = parseColor(value);

            return {
              textShadow: `0 1px 1px rgb(${color[0]} ${color[1]} ${color[2]})`,
            };
          },
        },
        { values: flattenColorPalette(theme("colors")), type: "color" }
      );
    }),
  ],
};
