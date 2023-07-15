import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION, SHOW_DRAFTS } from "../consts";

export async function get(context) {
  const posts = await getCollection("blog");
  console.log("!NO_DRAFTS = ", SHOW_DRAFTS);
  console.log("context.site", context.site);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    drafts: SHOW_DRAFTS,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
