const { getRedditPost } = require('./getRedditPost');
const question = require('../db/question');
// const { logError } = require('./index');

const SOURCES = {
  database: 0,
  reddit: 1,
};

const decideQuestionSource = (decisionRate = 40) => (
  (Math.floor(Math.random() * 100)) >= decisionRate
    ? SOURCES.database
    : SOURCES.reddit
);

function getQuestion() {
  // if (decideQuestionSource() === SOURCES.database) {
  // return question.getRandom()
  //   .then(post => ({ title: post.title, id: post.id }));
  // .catch(logError);
  // }
  return getRedditPost()
    .then(question.save);
    // .catch(logError);
}

module.exports = getQuestion;
