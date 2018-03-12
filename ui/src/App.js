import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'
import Question from './Question'
import UserAnswer from './UserAnswer'
import Answer from './Answer'
import ScoreCounter from './ScoreCounter';

const url = 'http://localhost:8000'; //TODO: set via env
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
        totalQuestions: 0,
        totalCorrect: 0,
      }
    }

  _submitAnswer = async () => {
    const answer = await axios.post(`${url}/api/onion-or-not`, {
      id: this.state.question.id,
      theonion: this.state.isTheOnion
    })
    this.setState({
      answer: answer.data,
      userAnswerSubmitted: true,
      totalCorrect: answer.data.correct ? this.state.totalCorrect + 1 : this.state.totalCorrect,
      totalQuestions: this.state.totalQuestions + 1
    })
  }
  
  _handleUserAnswer = (isTheOnion) => { 
    this.setState({isTheOnion: isTheOnion}, () => { 
      this._submitAnswer()
    })
  }

  _getQuestion = async () => {
      const question = await axios.get(`http://localhost:8000/api/onion-or-not`)
      //TODO: error handling
      this.setState({ 
        question: question.data,
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
    
  componentDidMount() {
    this._getQuestion();
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
          { Object.keys(this.state.answer) == 0 &&
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
              <ScoreCounter totalQuestions={this.state.totalQuestions} totalCorrect={this.state.totalCorrect}/>
            </Col>
          </Row>
          <Row>
            <Col md={4} mdOffset={4}>
              <Answer answer={this.state.answer} getQuestion={this._getNextQuestion} />
            </Col>
          </Row>
          
      </div>
    )
  }
}

export default App;