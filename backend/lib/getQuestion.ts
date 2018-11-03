import axios from 'axios'
import uuid from 'uuid';
import * as question from './question-lib';
import Post from './Post'

enum SOURCES {
  database = 0,
  reddit = 1,
};

const pickSub = () => (Math.floor(Math.random() * 10) % 2 === 0 ? 'TheOnion' : 'NotTheOnion');
async function getRedditPost() {
  const sub = pickSub();
  return axios.get(`https://reddit.com/r/${sub}/random.json`)
    .then(response => response.data[0].data.children[0].data)
    .then((post): Post => ({
      id: uuid.v1(),
      title: post.title,
      permalink: post.permalink,
      url: post.url,
      theOnion: (sub === 'TheOnion'),
      redditId: post.id,
    }))
    .catch((error) => {
        console.log(error)
    });
}

const decideQuestionSource = (decisionRate = 40) => (
  (Math.floor(Math.random() * 100)) >= decisionRate
    ? SOURCES.database
    : SOURCES.reddit
);

export default function getQuestion() {
  // if (decideQuestionSource() === SOURCES.database) {
    // Get question from db
    // return question.getRandom()
    //   .then(post => ({ title: post.posttitle, id: post.id }))
    //   .catch(logError);
  // }
  return getRedditPost()
    .then(question.save) // TODO: save question
    // .catch(logError);
}