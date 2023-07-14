import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SHOW_DRAFTS } from "../consts";

export async function get(context) {
  const posts = await getCollection("blog");
  console.log(import.meta.env.DEV);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts
      .filter((v) => {
        // if DEV, show draft posts
        if (SHOW_DRAFTS) {
          return true;
        }
        return v.data.draft !== true;
      })
      .map((post) => ({
        ...post.data,
        link: `/blog/${post.slug}/`,
      })),
  });
}
