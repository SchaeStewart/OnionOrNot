import React from 'react'
import axios from 'axios'
import Question from './presentational/Question'
import config from './config'
import GuessSubredditContainer from './GuessSubredditContainer'
const URL = config.apiGateway.URL

export default class QuestionContainer extends React.Component {
  constructor({ handleAnswer }) {
    super()
    this.state = {
      question: {},
    }
    this.handleAnswer = handleAnswer
  }

  componentDidMount() {
    this.getQuestion().then(question => {
      this.setState({ question })
    })
  }

  getQuestion() {
    return axios.get(`${URL}/question`).then(res => JSON.parse(res.data.body))
  }

  postAnswer(id, isTheOnion) {
    return axios
      .post(`${URL}/answer`, {
        id,
        isTheOnion,
      })
      .then(res => JSON.parse(res.data.body))
      .then(this.handleAnswer)
  }

  render() {
    return (
      <React.Fragment>
        <Question question={this.state.question} />
        <GuessSubredditContainer
          handleGuess={isTheOnion => {
            this.postAnswer(this.state.question.id, isTheOnion)
          }}
        />
      </React.Fragment>
    )
  }
}
