<script>
  import { onMount } from "svelte";

  let darkModeOn = true;
  let visible = false;

  onMount(() => {
    visible = true;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // if true, set the site to Dark Mode
      darkModeOn = true;
    } else {
      darkModeOn = false;
    }
  });

  $: if (visible) {
    document.documentElement.classList.toggle("dark", darkModeOn);
  }
</script>

<button
  on:click={(e) => {
    darkModeOn = !darkModeOn;
  }}

  {...$$props}
>
  {darkModeOn ? "Dark" : "Light"}
</button>
