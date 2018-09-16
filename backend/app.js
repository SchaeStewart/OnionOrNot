const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const question = require('./db/question.js')
const getQuestion = require('./lib/getQuestion')

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