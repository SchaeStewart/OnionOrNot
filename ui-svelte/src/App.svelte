<script>
  // State
  let question = getQuestion();
  let answer = null;
  let questionsAsked = 0;
  let questionsCorrect = 0;

  // Helpers
  async function getQuestion() {
    const URL =
      "https://dm10wkvq58.execute-api.us-east-1.amazonaws.com/dev/question";
    const res = await fetch(URL);
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      return JSON.parse(data.body);
    } else {
      throw new Error(data);
    }
  }

  async function submitAnswer(isTheOnion) {
    const URL =
      "https://dm10wkvq58.execute-api.us-east-1.amazonaws.com/dev/answer";

    try {
      const data = await fetch(URL, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: (await question).id,
          theOnion: isTheOnion
        })
      }).then(res => res.json());

      answer = JSON.parse(data.body);
      questionsCorrect = answer.correct
        ? questionsCorrect + 1
        : questionsCorrect;
      questionsAsked += 1;
    } catch (e) {
      console.log(e);
    }
  }

  // Handler
  async function getNewRound() {
    question = getQuestion();
    answer = null;
  }
</script>

<style>
  h1 {
    color: purple;
  }
  button {
    background: black;
  }
</style>

<div>
  {#await question}
    <p>...Getting question</p>
  {:then question}
    <p>{question.title}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

  <button on:click={() => submitAnswer(true)} disabled={answer !== null}>
    Is r/TheOnion
  </button>
  <button on:click={() => submitAnswer(false)} disabled={answer !== null}>
    Is r/NotTheOnion
  </button>

  <!-- Answer -->
  {#if answer !== null}
    <p>{answer.correct ? 'You got it right!' : 'You got it wrong'}</p>
    <p>
      <a href={`https://old.reddit.com/${answer.permalink}`}>
        View Reddit Post
      </a>
    </p>
    <a href={answer.url}>View Article</a>
    <br />
    <button on:click={getNewRound}>Get a new question</button>
  {/if}

  <!-- Score counter -->
  <p>You've answered {questionsCorrect} of {questionsAsked} correctly</p>
</div>
