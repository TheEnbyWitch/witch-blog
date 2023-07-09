<script>
  export let alt;
</script>

<figure class="flex flex-col w-full justify-center items-center">
  <img {alt} {...$$props} />
  <figcaption class="text-center">{alt}</figcaption>
</figure>
