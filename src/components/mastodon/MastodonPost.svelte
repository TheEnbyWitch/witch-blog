<script>
  import sanitizeHtml from "sanitize-html";
  import MastodonPostAuthor from "./MastodonPostAuthor.svelte";
  export let post;

  $: sanitizedContent = post.content;
  $: pronouns = post.account.fields.find((v) =>
    v.name.toLowerCase().includes("pronouns")
  )?.value;
</script>

<div class="flex flex-row">
  <img
    alt={`avatar for ${post.account.acct}`}
    src={post.account.avatar}
    class="w-12 h-12"
  />
  <div class="flex flex-col">
    <div>
      <span
        >{post.account.acct}
        {#if pronouns}<span class="text-black bg-white px-2 rounded-full"
            >{pronouns}</span
          >{/if}</span
      >
    </div>
    <div class="prose prose-sm prose-pink dark:prose-invert">
      {@html sanitizedContent}
    </div>
    {#each post.children as reply}
      <svelte:self post={reply} />
    {/each}
  </div>
</div>
