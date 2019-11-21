import { writable } from "svelte/store";

function createScore() {
  const localStorageGetNumber = key => {
    const item = localStorage.getItem(key);
    return item ? parseInt(item) : 0;
  };

  const numCorrect = localStorageGetNumber("numCorrect");
  const numAsked = localStorageGetNumber("numAsked");
  const { subscribe, set, update } = writable({ numCorrect, numAsked });

  const answerCorrect = () =>
    update(({ numCorrect, numAsked }) => {
      localStorage.setItem("numCorrect", numCorrect + 1);
      localStorage.setItem("numAsked", numAsked + 1);
      return {
        numCorrect: numCorrect + 1,
        numAsked: numAsked + 1
      };
    });

  const answerIncorrect = () =>
    update(({ numCorrect, numAsked }) => {
      localStorage.setItem("numAsked", numAsked + 1);
      return {
        numCorrect,
        numAsked: numAsked + 1
      };
    });

  return { subscribe, answerCorrect, answerIncorrect };
}

export const score = createScore();
