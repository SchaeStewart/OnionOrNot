
const pickSub = () => (Math.floor(Math.random() * 10) % 2 === 0 ? 'TheOnion' : 'NotTheOnion')
module.exports = {
	getRedditPost: async function() {
    let result
    try {
        const fullPost = await axios.get(`https://reddit.com/r/${pickSub()}/random.json`)
        const post = fullPost.data[0].data.children[0].data
        result = {
            title: post.title,
            permalink: post.permalink,
            url: post.url,
            theonion: (sub === 'TheOnion'),
        }
    } catch (error) {
        console.log(error)
        result = undefined //TODO: should probably null
    }
    return result
	}
}