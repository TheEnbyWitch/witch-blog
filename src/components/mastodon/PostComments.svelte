<script>
  export let src;

  import sanitizeHtml from "sanitize-html";
  import MastodonPost from "./MastodonPost.svelte";

  const postUrlRegex = /https:\/\/(\S+)\/(\S+)\/(\S+)/gm;

  const postCommentsUrlSubstitution = `https://$1/api/v1/statuses/$3/context`;
  const postDetailUrlSubstitution = `https://$1/api/v1/statuses/$3`;

  // Get API Urls for the post
  const postDetailsUrl = src.replace(postUrlRegex, postDetailUrlSubstitution);
  const postCommentsUrl = src.replace(
    postUrlRegex,
    postCommentsUrlSubstitution
  );

  async function getMastodonAPI(url) {
    const response = await fetch(url);
    const status = await response.status;
    if (status !== 200) {
      Promise.reject(
        `Error accessing the Mastodon API. Status code returned ${status}.`
      );
    }
    const jsonResponse = await response.json();

    return jsonResponse;
  }

  async function getPostDetails() {
    const post = await getMastodonAPI(postDetailsUrl);
    const comments = await getMastodonAPI(postCommentsUrl);

    const parentID = post.id;
    let threadedComments = [];

    let commentDict = {};
    comments.descendants.forEach((comment) => {
      if (comment["visibility"] != "public") return;
      comment["children"] = [];
      if (comment["in_reply_to_id"] == parentID) {
        threadedComments.push(comment);
      } else {
        commentDict[comment["in_reply_to_id"]].children.push(comment);
      }
      commentDict[comment["id"]] = comment;
    });

    return [post, threadedComments];
  }

  let postDetails = getPostDetails();
</script>

<!--
@component
    
Shows the stats for the post (favourites, boosts and replies)
and its replies

This component was made possible thanks to:
    - https://cassidyjames.com/blog/fediverse-blog-comments-mastodon/
    - https://jan.wildeboer.net/2023/02/Jekyll-Mastodon-Comments/
    - https://fietkau.blog/2023/another_blog_resurrection_fediverse_new_comment_system
    
-->

{#await postDetails}
  <p>Loading...</p>
{:then [post, comments]}
  {@debug post}
  {@debug comments}
  <p>
    {`💬 ${post.replies_count}`}
    {`❤️ ${post.favourites_count}`}
    {`🔁 ${post.reblogs_count}`}
  </p>

  {#each comments as post}
    <MastodonPost {post} />
  {/each}
{:catch error}
  <p class="prose prose-pink dark:prose-invert">
    There was an error grabbing post details. Don't sweat it, you can see the
    comments at <a href={src}>{src}</a>
  </p>
  <p>{error}</p>
{/await}
