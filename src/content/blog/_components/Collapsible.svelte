<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let loaded = false;

  onMount(() => {
    loaded = true;
  });

  let visible = false;
</script>

{#if loaded}
  <div
    class="m-0 p-0 flex flex-col dark:bg-gray-800/25 border border-black/25 rounded-md"
  >
    <button on:click={() => (visible = !visible)}
      >{visible ? "Hide" : "Show"}</button
    >
    {#if visible}
      <div class="m-0 p-4" transition:slide|global>
        <slot />
      </div>
    {/if}
  </div>
{:else}
  <details>
    <summary />
    <slot />
  </details>
{/if}
