const { getRedditPost } = require('./getRedditPost')
const question = require('../db/question')
module.exports = {
	getQuestion: async function() {
    const randomNumber = (Math.floor(Math.random() * 100))
    if(randomNumber >= 40) {
        const post = await question.getRandom()
        console.log(post)
        return {
            title: post.posttitle,
            id: post.id,
        }
    } else {
        const post = await getRedditPost()
        if(!post) return undefined
        const questionId = await question.save(post)
        return {
            title: post.title,
            id: questionId,
        }
    }
	}
}