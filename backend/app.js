const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const question = require('./db/question.js');
const { getQuestion } = require('./lib');
const { logError } = require('./lib/helpers');

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to OnionOrNot.',
}));

app.get('/api/onion-or-not', async (req, res) => {
  try {
    const theQuestion = await getQuestion();
    res.json({
      id: theQuestion.id,
      title: theQuestion.title,
    });
  } catch (err) {
    logError(err, 'Error getting question');
    res.status(500).send('Error getting question');
  }
});

app.post('/api/onion-or-not', async (req, res) => {
  try {
    const savedQuestion = await question.getById(req.body.id);
    savedQuestion.correct = req.body.theonion === savedQuestion.theonion;
    res.json(savedQuestion);
  } catch (err) {
    logError(err, 'Error during POST /api/onion-or-not');
    res.status(403).send('Error checking user\'s submission. The submitted id is not valid');
  }
});


module.exports = app;
