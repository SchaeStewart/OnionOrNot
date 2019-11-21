<script>
  import Question from "./Question.svelte";
  import Answer from "./Answer.svelte";
  import AnswerInput from "./AnswerInput.svelte";
  import ScoreCounter from "./ScoreCounter.svelte";
  import { score } from "./stores.js";

  // State
  let gettingQuestion = true;
  let question = getQuestion();
  let answer = null;
  document.title = "Onion or Not"

  // Helpers
  async function getQuestion() {
    const URL =
      "https://dm10wkvq58.execute-api.us-east-1.amazonaws.com/dev/question";
    try {
      gettingQuestion = true;
      const res = await fetch(URL);
      const data = await res.json();

      if (res.ok) {
        return JSON.parse(data.body);
      } else {
        throw new Error(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      gettingQuestion = false;
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

<div class="section">
  <div class="columns">
    <div class="column">
      <Question {question} />
    </div>
  </div>
</div>

<div class="section">
  <div class="container has-text-centered">
    <AnswerInput {answer} {submitAnswer} {gettingQuestion} />
  </div>

  <div class="container has-text-centered">
    <ScoreCounter />
  </div>
</div>

<div class="section">
  <div class="container has-text-centered">
    <Answer {answer} newRoundHandler={getNewRound} />
  </div>
</div>
