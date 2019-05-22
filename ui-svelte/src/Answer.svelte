<script>
  export let answer;
  export let newRoundHandler;

  $: titleClass = `title has-text-${
    answer && answer.correct ? "success" : "danger"
  }`;
</script>

<style>
  h1 {
    color: purple;
  }
  button {
    background: black;
  }
</style>

{#if answer !== null}
  <p class={titleClass}> {answer.correct ? 'Correct!' : 'Wrong!'} </p>
  <p>
    <a href={`https://old.reddit.com/${answer.permalink}`}>View Reddit Post</a>
  </p>
  <a href={answer.url}>View Article</a>
  <br />
  <button class="button is-primary" on:click={newRoundHandler}>
    Get a new question
  </button>
{/if}
