import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import './App.css'
import Question from './Question'
import UserAnswer from './UserAnswer'
import Answer from './Answer'
import ScoreCounter from './ScoreCounter';
import config from './config';
const URL = config.apiGateway.URL

/* TODO: Styling */

class App extends Component {
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
        }
      }
    }
  // eslint-disable-next-line
  _submitAnswer = async () => {
    try {
      const answer = await axios.post(`${URL}/answer`, {
        id: this.state.question.id,
        theOnion: this.state.isTheOnion
      })
      .then((res) => JSON.parse(res.data.body))
      console.log(answer)
      this.setState({
        answer,
        userAnswerSubmitted: true,
        score: {
          numCorrect: answer.correct ? this.state.score.numCorrect + 1 : this.state.score.numCorrect,
          numOfQuestions: this.state.score.numOfQuestions + 1
        }
        
      }, () => {
        this._setStoredScore()
      })
    } catch (e) {
      console.log(e, 'error submitting answer')
    }
  }
  
  _handleUserAnswer = (isTheOnion) => { 
    this.setState({isTheOnion: isTheOnion}, () => { 
      this._submitAnswer()
    })
  }

  _getQuestion = async () => {
    const question = await axios.get(`${URL}/question`)
    // const question = await API.get("dev-onion-or-not", 'question')
    console.log(question)
    //TODO: error handling
    this.setState({ 
      question: JSON.parse(question.data.body)
    })
  }

  _resetGameState = (callback) => {
    this.setState({
      question: null,
      isTheOnion: null,
      userAnswer: {},
      userAnswerSubmitted: false,
      answer: {} 
     }, callback)
   }

   _getNextQuestion = () => {
     this._resetGameState(this._getQuestion)
   }

   _getStoredScore = () => {
     const storedScore = JSON.parse(localStorage.getItem('score'))

     storedScore && this.setState({
       score: {
        numOfQuestions: storedScore.numOfQuestions,
        numCorrect: storedScore.numCorrect,
       }
     })
   }

   _setStoredScore = () => {
     localStorage.setItem('score', JSON.stringify(this.state.score))
   }
    
  componentDidMount() {
    this._getQuestion();
    this._getStoredScore()
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome to Onion or Not!</h1>
        </header>
        <Row>
          <Col md={6} mdOffset={3}>
            <Question question={this.state.question} />
          </Col>
        </Row>
        { Object.keys(this.state.answer).length === 0 &&
          <Row>
            <Col md={6}>
              <UserAnswer handleClick={() => { this._handleUserAnswer(true) }}>r/TheOnion</UserAnswer>
            </Col>
            <Col md={6}>
              <UserAnswer handleClick={() => { this._handleUserAnswer(false) }}>r/NotTheOnion</UserAnswer>
            </Col>
          </Row>
        }
        <Row>
          <Col md={4} mdOffset={4}>
            <ScoreCounter
              totalQuestions={this.state.score.numOfQuestions}
              totalCorrect={this.state.score.numCorrect}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} mdOffset={4}>
            <Answer
              answer={this.state.answer}
              getQuestion={this._getNextQuestion}
            />
          </Col>
        </Row>
          
      </div>
    )
  }
}

export default App;