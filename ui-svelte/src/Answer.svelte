<script>
  export let answer;
  export let newRoundHandler;
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
  <p>{answer.correct ? 'You got it right!' : 'You got it wrong'}</p>
  <p>
    <a href={`https://old.reddit.com/${answer.permalink}`}>View Reddit Post</a>
  </p>
  <a href={answer.url}>View Article</a>
  <br />
  <button on:click={newRoundHandler}>Get a new question</button>
{/if}
