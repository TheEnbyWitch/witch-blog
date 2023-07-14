<script>
  /*
  Collapsible

  Makes the children collapsible with a fancy slide animation thanks to Svelte.
  Should work even if JavaScript is disabled or component is fully rendered on build-time.
  */

  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  export let name = null;

  let loaded = false;
  onMount(() => {
    // Will replace the NoJS version with our fancy one
    loaded = true;
  });

  let visible = false;
</script>

<!--
  @component
  
  Makes the children collapsible with a fancy slide animation thanks to Svelte.
  Should work even if JavaScript is disabled or component is fully rendered on build-time.
  
-->

{#if loaded}
  <div
    class="m-0 p-0 flex flex-col dark:bg-gray-800/25 border border-black/25 rounded-md"
  >
    <button on:click={() => (visible = !visible)}
      >{`${visible ? "Hide" : "Show"} ${name ? name : "content"}`}</button
    >
    {#if visible}
      <div class="m-0 p-4" transition:slide|global>
        <slot />
      </div>
    {/if}
  </div>
{:else}
  <details>
    <summary>
      {name ? name : ""}
    </summary>
    <slot />
  </details>
{/if}
