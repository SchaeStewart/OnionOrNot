import React from 'react'
import { Box, Button, Heading } from 'grommet'
import { PropTypes } from 'prop-types'

const PostInformation = props => {
  const { permalink, url } = props.answer
  const { getQuestion } = props

  return (
    <Box>
      {Object.keys(props.answer).length ? (
        <React.Fragment>
          <Heading size="small" level={3}>
            <a href={`https://reddit.com${permalink}`} target="_blank">
              Reddit Permalink
            </a>
          </Heading>
          <Heading size="small" level={3}>
            <a href={url} target="_blank">
              Post URL
            </a>
          </Heading>
          <Button primary size="large" onClick={getQuestion}>
            Get a new question!
          </Button>
        </React.Fragment>
      ) : null}
    </Box>
  )
}

PostInformation.propTypes = {
  answer: PropTypes.object,
  getQuestion: PropTypes.func,
}

export default PostInformation
