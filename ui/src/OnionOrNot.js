import React, { Component } from 'react'
import { Box } from 'grommet'
import './App.css'
import QuestionContainer from './QuestionContainer'
import PostInformation from './presentational/PostInformation'
import ScoreCounter from './presentational/ScoreCounter'
import CorrectOrIncorrect from './presentational/CorrectOrIncorrect'

const scoreStorage = {
  saveScore: score => {},
  getScore: () => {},
}

// TODO: use redux handle this refactor

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
  _handleUserAnswer = isTheOnion => {
    this.setState({ isTheOnion: isTheOnion }, () => {
      this.submitAnswer()
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
    // this._getQuestion()
    this._getStoredScore()
  }

  render() {
    return (
      <div className="App">
        <Box align="center" width="medium">
          <QuestionContainer
            handlerAnswer={answer => {
              console.log(answer)
            }}
          />
        </Box>
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
