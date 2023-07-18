<script>
  export let post;
  export let blogPostAuthors;

  import sanitizeHtml from "sanitize-html";
  import { formatRelative } from "date-fns";

  $: emojis = post.emojis
    .map((emoji) => {
      try {
        const url = new URL(emoji.url);
        const shortcode = emoji.shortcode;
        return { shortcode, url };
      } catch (err) {
        const shortcode = emoji.shortcode;
        return { shortcode, url: undefined };
      }
    })
    .filter((e) => {
      return !!e.url;
    });

  $: sanitizedContent = sanitizeHtml(post.content);
  $: sanitizedContentWithEmoji = (() => {
    let result = sanitizedContent;
    emojis.forEach((emoji) => {
      result = result.replace(
        `:${emoji.shortcode}:`,
        // double defining the margins here because prose overrides it
        sanitizeHtml(
          `<img class="w-4 h-4 m-0 md:m-0 mx-1 md:mx-1 scale-150 inline-block" src="${emoji.url}"/>`,
          {
            allowedTags: ["img"],
            allowedAttributes: {
              img: ["class", "src"],
            },
          }
        )
      );
    });

    return result;
  })();

  $: pronouns = post.account.fields.find((v) =>
    v.name.toLowerCase().includes("pronouns")
  )?.value;

  $: dateCreated = Date.parse(post.created_at);
  $: dateCreatedRelative = formatRelative(dateCreated, new Date());

  $: isAuthor = blogPostAuthors?.find((author) => post.account.url == author);
</script>

<div
  class="flex flex-row gap-2 border border-black/10 bg-pink-50 dark:bg-pink-950 dark:border-white/10 rounded-md drop-shadow-md p-2"
>
  <img
    alt={`avatar for ${post.account.acct}`}
    src={post.account.avatar}
    class="w-12 h-12 rounded-sm border dark:border-white/10 border-black/25"
  />
  <div class="flex flex-col grow">
    <a class="md:text-lg" href={post.account.url}
      >{post.account.acct}
      {#if pronouns}<span
          class="md:text-base border inline-block bg-pink-100 border-black/10 dark:bg-pink-900 dark:border-white/10 px-2 rounded-full"
          >{pronouns}</span
        >{/if}
      {#if isAuthor}
        <span
          class="md:text-base text-shadow-pink-200 dark:text-shadow-pink-800 border inline-block bg-pink-300 border-black/10 dark:bg-pink-700 dark:border-white/10 px-2 rounded-full"
          >Author</span
        >{/if}</a
    >
    <div class="prose prose-sm md:prose-base prose-pink dark:prose-invert">
      {@html sanitizedContentWithEmoji}
    </div>
    <a href={post.url} class="text-sm opacity-50">{dateCreatedRelative}</a>
    {#each post.children as reply}
      <div class="mt-2 flex flex-col gap-2">
        <svelte:self post={reply} {blogPostAuthors} />
      </div>
    {/each}
  </div>
</div>
