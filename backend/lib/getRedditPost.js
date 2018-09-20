const axios = require('axios');
const logError = require('./index');

console.log(logError, 'what the require object is');

const pickSub = () => (Math.floor(Math.random() * 10) % 2 === 0 ? 'TheOnion' : 'NotTheOnion');
module.exports = {
  async getRedditPost() {
    const sub = pickSub();
    try {
      const post = (await axios.get(`https://reddit.com/r/${sub}/random.json`)).fullPost.data[0].data.children[0].data;
      return {
        title: post.title,
        permalink: post.permalink,
        url: post.url,
        theonion: (sub === 'TheOnion'),
      };
    } catch (error) {
      logError(error, 'Error getting post from reddit');
      return null;
    }
  },
};
