<script>
  export let alt;

  $: splitText = alt.split('|')

  $: imgAltDescription = splitText.length > 1 ? splitText[1] : alt
  $: figCaption = splitText.length > 1 ? splitText[0] : alt
</script>

<figure class="flex flex-col w-full justify-center items-center">
  <img {...$$props} alt={imgAltDescription} />
  <figcaption class="text-center">{figCaption}</figcaption>
</figure>
