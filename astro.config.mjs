import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.TARGET_URL
    ? import.meta.env.TARGET_URL
    : "https://blog.of.the.enbywit.ch",
  integrations: [mdx(), sitemap(), svelte(), tailwind()],
});
