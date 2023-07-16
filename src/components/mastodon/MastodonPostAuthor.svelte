<script>
  export let author;

  $: pronouns = author.fields.find((v) =>
    v.name.toLowerCase().includes("pronouns")
  )?.value;
</script>
