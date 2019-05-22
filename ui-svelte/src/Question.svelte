<script>
  export let question;
</script>

<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .fa-spinner {
    animation: spinner 1.5s linear infinite;
  }
</style>

{#await question}
  <h1 class="title has-text-centered">
    <span class="icon ">
      <i class="fas fa-spinner" />
    </span>
    Getting question
  </h1>
{:then question}
  <h1 class="title has-text-centered"> {question.title}</h1>
{:catch error}
  <h1 class="title has-text-danger has-text-centered">{error.message}</h1>
{/await}
