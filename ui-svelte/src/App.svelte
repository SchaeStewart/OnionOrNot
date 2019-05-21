<script>
  import Question from "./Question.svelte";
  import Answer from "./Answer.svelte";
  import { score } from "./stores.js";

  // State
  let question = getQuestion();
  let answer = null;

  // Helpers
  async function getQuestion() {
    const URL =
      "https://dm10wkvq58.execute-api.us-east-1.amazonaws.com/dev/question";
    const res = await fetch(URL);
    const data = await res.json();

    if (res.ok) {
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
      if (answer.correct) {
        score.answerCorrect();
      } else {
        score.answerIncorrect();
      }
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
  <Question {question} />

  <button on:click={() => submitAnswer(true)} disabled={answer !== null}>
    Is r/TheOnion
  </button>
  <button on:click={() => submitAnswer(false)} disabled={answer !== null}>
    Is r/NotTheOnion
  </button>

  <Answer {answer} newRoundHandler={getNewRound} />

  <!-- Score counter -->
  <p>You've answered {$score.numCorrect} of {$score.numAsked} correctly</p>
</div>
