import React from 'react'
import { PropTypes } from 'prop-types'
import { Box, Heading } from 'grommet'

const CorrectOrIncorrect = ({ isCorrect }) => {
  return isCorrect ? (
    <Box background="status-ok">
      <Heading level={3}>You got it right!</Heading>
    </Box>
  ) : (
    <Box background="status-error">
      <Heading level={3}>You got it wrong</Heading>
    </Box>
  )
}

CorrectOrIncorrect.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
}

export default CorrectOrIncorrect
