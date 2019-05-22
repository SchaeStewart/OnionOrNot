<script>
  export let answer;
  export let newRoundHandler;

  $: titleClass = `subtitle has-text-${
    answer && answer.correct ? "success" : "danger"
  }`;
</script>

{#if answer !== null}
  <div class="box">
    <p class={titleClass}> {answer.correct ? 'Correct!' : 'Wrong!'} </p>
    <p>
      <a href={`https://old.reddit.com/${answer.permalink}`}>
        View Reddit Post
      </a>
    </p>
    <a href={answer.url}>View Article</a>
    <br />
    <button class="button is-primary" on:click={newRoundHandler}>
      Get a new question
    </button>
  </div>
{/if}
