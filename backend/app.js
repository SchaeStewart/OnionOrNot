const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const question = require('./db/question.js')

// TODO: eslint or prettier
// TODO: Randomly use stored questions and new questions

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

const pickSub = () => (Math.floor(Math.random() * 10) % 2 === 0 ? 'TheOnion' : 'NotTheOnion')

const getPost = async (sub) => {
    const fullPost = await axios.get(`https://reddit.com/r/${sub}/random.json`)
    const post = fullPost.data[0].data.children[0].data
    return {
        'title': post.title,
        'permalink': post.permalink,
        'url': post.url,
        'theonion': (sub === 'TheOnion'),
    }
}

app.get('/api/onion-or-not', async (req, res) => {
    const post = await getPost(pickSub())
    const savedQuestionId = await question.save(post)
    if (savedQuestionId) {
        res.json({
            id: savedQuestionId,
            title: post.title,
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