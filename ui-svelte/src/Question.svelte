<script>
export let question
</script>

{#await question}
  <p>...Getting question</p>
{:then question}
  <p>{question.title}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
