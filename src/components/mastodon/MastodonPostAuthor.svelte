<script>
  export let author;

  $: pronouns = author.fields.find((v) =>
    v.name.toLowerCase().includes("pronouns")
  )?.value;
</script>

<div>
  <span
    >{author.acct}
    {#if pronouns}<span>{pronouns}</span>{/if}</span
  >
</div>
