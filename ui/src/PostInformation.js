import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { PropTypes } from 'prop-types'

const CorrectOrIncorrect = isCorrect =>
  isCorrect ? (
    <Alert bsStyle="success">
      <h3>You got it right!</h3>
    </Alert>
  ) : (
    <Alert bsStyle="danger">
      <h3>You got it wrong</h3>
    </Alert>
  )

const PostInformation = props => {
  const { permalink, url, correct } = props.answer
  const { getQuestion } = props

  return (
    <div>
      {Object.keys(props.answer).length ? (
        <div>
          <CorrectOrIncorrect isCorrect={correct} />
          <h4>
            <a href={`https://reddit.com${permalink}`} target="_blank">
              Reddit Permalink
            </a>
          </h4>
          <h4>
            <a href={url} target="_blank">
              Post URL
            </a>
          </h4>
          <Button bsStyle="primary" onClick={getQuestion}>
            Get a new question!
          </Button>
        </div>
      ) : null}
    </div>
  )
}

PostInformation.propTypes = {
  answer: PropTypes.object,
  getQuestion: PropTypes.func,
}

export default PostInformation
