# Blog of The Enby Witch

The code that powers my blog. Also has support for getting comments from Mastodon and can link to authors using ActivityPub.  
Runs with Astro.

## Mastodon comments

You can set the `mastodonPost` value in your markdown posts to a direct link to your Mastodon post. They will get loaded once the user scrolls down to the comment section, which is at the end of the post.

You can find the `PostComments.svelte` and `MastodonPost.svelte` in `src/components/mastodon/`.

Apart from just showing a profile picture, the poster's account handle and the contents of their post, it also supports custom emoji, pronoun badges (based on if the poster has a `pronouns` field in their profile) and it can also highlight if the poster is an author (or co-author) of the post.  

These resources were really helpful in getting this working:
- https://cassidyjames.com/blog/fediverse-blog-comments-mastodon/
- https://jan.wildeboer.net/2023/02/Jekyll-Mastodon-Comments/
- https://fietkau.blog/2023/another_blog_resurrection_fediverse_new_comment_system

## ActivityPub author badges

Each blog post has author badges at the top that link to their profiles and grab their name and profile picture at build-time.  
In markdown, you can give a post an array of `authors` with a link to each author's profile. It should work even if said author is on another ActivityPub-powered thing like Misskey, Akkoma, etc. (only tested with Bookwyrm so far though).

You can find `ActivityPubProfileBadge.astro` in `src/components/mastodon/`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Credit

- The Astro Blog template - https://github.com/withastro/astro/tree/latest/examples/blog
