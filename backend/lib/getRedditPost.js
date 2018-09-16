const axios = require('axios');

const pickSub = () => (Math.floor(Math.random() * 10) % 2 === 0 ? 'TheOnion' : 'NotTheOnion');
module.exports = {
  async getRedditPost() {
    const sub = pickSub();
    try {
      const fullPost = await axios.get(`https://reddit.com/r/${sub}/random.json`);
      const post = fullPost.data[0].data.children[0].data;
      return {
        title: post.title,
        permalink: post.permalink,
        url: post.url,
        theonion: (sub === 'TheOnion'),
      };
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      return null;
    }
  },
};
