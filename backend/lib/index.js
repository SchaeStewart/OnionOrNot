const getRedditPost = require('./getRedditPost');
const getQuestion = require('./getQuestion');

module.exports = {
  getQuestion,
  getRedditPost,
  logError(error, message = '') {
    console.log(error, message); // eslint-disable-line no-console
  },
};
