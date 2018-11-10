import React, { Component } from 'react'
import { Box, Grid } from 'grommet'
import axios from 'axios'
import './App.css'
import Question from './Question'
import GuessSubreddit from './GuessSubreddit'
import PostInformation from './PostInformation'
import ScoreCounter from './ScoreCounter'
import CorrectOrIncorrect from './CorrectOrIncorrect'
import config from './config'
const URL = config.apiGateway.URL
/**
 * TODO: grommet here
 * Break into presentation vs function
 */

export default class OnionOrNot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
      isTheOnion: null,
      userAnswer: {},
      userAnswerSubmitted: false,
      answer: {},
      score: {
        numOfQuestions: 0,
        numCorrect: 0,
      },
    }
  }
  // eslint-disable-next-line
  _submitAnswer = async () => {
    try {
      const answer = await axios
        .post(`${URL}/answer`, {
          id: this.state.question.id,
          theOnion: this.state.isTheOnion,
        })
        .then(res => JSON.parse(res.data.body))
      this.setState(
        {
          answer,
          userAnswerSubmitted: true,
          score: {
            numCorrect: answer.correct
              ? this.state.score.numCorrect + 1
              : this.state.score.numCorrect,
            numOfQuestions: this.state.score.numOfQuestions + 1,
          },
        },
        () => {
          this._setStoredScore()
        }
      )
    } catch (e) {
      console.log(e, 'error submitting answer')
    }
  }

  _handleUserAnswer = isTheOnion => {
    this.setState({ isTheOnion: isTheOnion }, () => {
      this._submitAnswer()
    })
  }

  _getQuestion = async () => {
    const question = await axios.get(`${URL}/question`)
    // const question = await API.get("dev-onion-or-not", 'question')
    //TODO: error handling
    this.setState({
      question: JSON.parse(question.data.body),
    })
  }

  _resetGameState = callback => {
    this.setState(
      {
        question: null,
        isTheOnion: null,
        userAnswer: {},
        userAnswerSubmitted: false,
        answer: {},
      },
      callback
    )
  }

  _getNextQuestion = () => {
    this._resetGameState(this._getQuestion)
  }

  _getStoredScore = () => {
    const storedScore = JSON.parse(localStorage.getItem('score'))

    storedScore &&
      this.setState({
        score: {
          numOfQuestions: storedScore.numOfQuestions,
          numCorrect: storedScore.numCorrect,
        },
      })
  }

  _setStoredScore = () => {
    localStorage.setItem('score', JSON.stringify(this.state.score))
  }

  componentDidMount() {
    this._getQuestion()
    this._getStoredScore()
  }

  render() {
    return (
      <div className="App">
        <Box align="center" width="medium">
          <Question question={this.state.question} />
        </Box>
        {Object.keys(this.state.answer).length === 0 && (
          <Grid
            columns={{
              count: 2,
              size: 'auto',
            }}
            gap="large"
          >
            <Box>
              <GuessSubreddit
                btnText="r/theOnion"
                handleClick={() => {
                  this._handleUserAnswer(true)
                }}
              />
            </Box>
            <Box>
              <GuessSubreddit
                btnText="r/NotTheOnion"
                handleClick={() => {
                  this._handleUserAnswer(false)
                }}
              />
            </Box>
          </Grid>
        )}
        <Box>
          <ScoreCounter
            totalQuestions={this.state.score.numOfQuestions}
            totalCorrect={this.state.score.numCorrect}
          />
        </Box>
        <Box>
          {Object.keys(this.state.answer).length > 0 && (
            <CorrectOrIncorrect isCorrect={this.state.answer.correct} />
          )}
          <PostInformation
            answer={this.state.answer}
            getQuestion={this._getNextQuestion}
          />
        </Box>
      </div>
    )
  }
}
