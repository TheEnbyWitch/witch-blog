<script>
  /*
  ImageWithFigCaption

  This is to make a Cohost-style image with a caption using just Markdown syntax.
  It also supports giving the image proper alt text.

  The figcaption is the alt property but you can also specify alt text for
  just the image specifically by writing it like this:
   
     ![This will show up in the figcaption|This will be img's alt text](img.png)

  This component does not require interactivity at all and can be rendered at
  build-time.
  */
  export let alt;

  $: splitText = alt.split("|");

  $: imgAltDescription = splitText.length > 1 ? splitText[1] : alt;
  $: figCaption = splitText.length > 1 ? splitText[0] : alt;
</script>

<!--
  @component

  This is to make a Cohost-style image with a caption using just Markdown syntax.
  It also supports giving the image proper alt text.

  The figcaption is the alt property but you can also specify alt text for
  just the image specifically by writing it like this:
   
     `![This will show up in the figcaption|This will be img's alt text](img.png)`

  This component does not require interactivity at all and can be rendered at
  build-time.

-->

<figure class="flex flex-col w-full justify-center items-center">
  <img {...$$props} alt={imgAltDescription} />
  <figcaption class="text-center">{figCaption}</figcaption>
</figure>
