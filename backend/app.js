const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const question = require('./db/question.js')

const pickSub = () => (Math.floor(Math.random() * 10) % 2 === 0 ? 'TheOnion' : 'NotTheOnion')

const getPostFromReddit = async (sub) => {
    let result
    try {
        const fullPost = await axios.get(`https://reddit.com/r/${sub}/random.json`)
        const post = fullPost.data[0].data.children[0].data
        result = {
            title: post.title,
            permalink: post.permalink,
            url: post.url,
            theonion: (sub === 'TheOnion'),
        }
    } catch (error) {
        console.log(error)
        result = undefined
    }
    return result
}

getQuestion = async () => {
    const randomNumber = (Math.floor(Math.random() * 100))
    if(randomNumber >= 40) {
        const post = await question.getRandom()
        console.log(post)
        return {
            title: post.posttitle,
            id: post.id,
        }
    } else {
        const post = await getPostFromReddit(pickSub())
        if(!post) return undefined
        const questionId = await question.save(post)
        return {
            title: post.title,
            id: questionId,
        }
    }
}

const app = express()

app.use(logger('dev'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to OnionOrNot.',
}))


app.get('/api/onion-or-not', async (req, res) => {
    const question = await getQuestion()
    if (question) {
        res.json({
            id: question.id,
            title: question.title,
        })
    } else {
        res.status(500).send('Something broke!')
    }
})

app.post('/api/onion-or-not', async (req, res) => {
    userGuess = {
        id: req.body.id,
        theonion: req.body.theonion
    }

    let savedQuestion = await question.getById(userGuess.id)
    savedQuestion.correct = userGuess.theonion === savedQuestion.theonion

    res.json(savedQuestion)
})


module.exports = app