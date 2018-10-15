const axios = require('axios');
const { logError } = require('./helpers');

const pickSub = () => (Math.floor(Math.random() * 10) % 2 === 0 ? 'TheOnion' : 'NotTheOnion');
module.exports = {
  async getRedditPost() {
    const sub = pickSub();
    return axios.get(`https://reddit.com/r/${sub}/random.json`)
      .then(response => response.data[0].data.children[0].data)
      .then(post => ({
        title: post.title,
        permalink: post.permalink,
        url: post.url,
        theonion: (sub === 'TheOnion'),
        redditId: post.id,
      }))
      .catch(logError);
  },
};
