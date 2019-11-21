<script>
  export let answer;
  export let submitAnswer;
  export let gettingQuestion;
</script>

<button
  class="button is-primary "
  on:click={() => submitAnswer(true)}
  disabled={answer !== null || gettingQuestion === true}>
  Is r/TheOnion
</button>

<button
  class="button is-primary"
  on:click={() => submitAnswer(false)}
  disabled={answer !== null || gettingQuestion === true}>
  Is r/NotTheOnion
</button>
